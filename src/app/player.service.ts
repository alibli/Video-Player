import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VideoActionEventArg, VideoActionType, VideoInfo, VideoSourceArg, VideoTimeEventArg } from './models/video.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  //Properties
  private basicPath = '/assets/Clips/';
  private videoEl: HTMLMediaElement = {} as HTMLMediaElement;

  private videoActions = new Subject<VideoActionEventArg>();
  private curTimeSub = new Subject<VideoTimeEventArg>();
  private sourceSubject = new Subject<VideoSourceArg>();

  private videosList: VideoInfo[] = [];

  private currentVideo!: VideoInfo;

  private length = this.videosList.length;

  // Events

  setDataSource(source: VideoInfo[]) {
    this.videosList = source;
    this.currentVideo = source[0];
    this.sourceSubject.next({
      load: true
    }
    )
  }

  start() {
    this.currentVideo = this.getCurrentVideo();
    if (true) {
      this.loadPoster(this.currentVideo);   //17Aban
      this.loadVideo(this.currentVideo);
    }
  }


  setVideo(vid: HTMLMediaElement) {
    this.videoEl = vid;
    if (this.videoEl) {
      this.videoEl.onloadeddata = () => {
        this.currentVideo.duration = this.videoEl.duration;
      }

      this.videoEl.ontimeupdate = (e) => {
        this.curTimeSub.next(
          {
            video: this.currentVideo,
            time: {
              duration: this.currentVideo.duration!,
              current: this.videoEl.currentTime,
              progress: Math.round(this.videoEl.currentTime / this.videoEl.duration * 100) || 0,
            }
          }
        );
      }

      this.videoEl.onended = () => {
        this.videoActions.next({
          action: VideoActionType.End,
          video: this.getCurrentVideo()
        });
      }

      this.videoEl.onchange = () => {
        this.videoActions.next({
          action: VideoActionType.Select,
          video: this.getCurrentVideo()
        })
      }

      this.videoEl.onratechange = () => {
        this.videoActions.next({
          action: VideoActionType.RateChange,
          video: this.getCurrentVideo()
        })
      }

      this.videoEl.onvolumechange = () => {
        this.setVolume(this.videoEl.volume)

      }

    }
  }

  setBasicPath() {
    return this.basicPath;
  }

  getCurrentVideoObj() {

    // this.sourceSubject.subscribe(data => {
    //   if(data.load == true){
    //     return this.currentVideo;
    //   }
    // });
    return this.currentVideo;
  }

  //Methods

  playPause(): void {
    if (this.videoEl.paused) {
      this.videoEl.play();
      this.videoActions.next({                          //17Aban
        action: VideoActionType.Play,
        video: this.getCurrentVideo()
      });
    }
    else if (this.videoEl.played) {
      this.videoEl.pause();
      this.videoActions.next({                  //17Aban
        action: VideoActionType.Pause,
        video: this.getCurrentVideo()
      });
    }

  }

  muteUnmute(): void {
    if (this.videoEl.muted) {
      this.videoEl.muted = false;
      this.videoActions.next({
        action: VideoActionType.Unmute,
        video: this.getCurrentVideo()
      });
    }
    else {
      this.videoEl.muted = true;
      this.videoActions.next({
        action: VideoActionType.Mute,
        video: this.getCurrentVideo()
      });
    }
  }

  setVolume(e: any) {
    this.videoEl.volume = e;
    this.videoActions.next({
      action: VideoActionType.VolumeChange,
      video: this.getCurrentVideo()
    })
  }
  getVolume() {
    return this.videoEl.volume;
  }

  setRate(e: any) {
    this.videoEl.playbackRate = e;
  }

  getRate() {
    return this.videoEl.playbackRate;
  }

  setNewCurrentTime(progressPercent: number) {
    this.videoEl.currentTime = progressPercent * this.videoEl.duration / 100;    // ** **  **
    // this.videoEl.currentTime = progressXduration;
    
  }

  playNext() {
    let id = this.currentVideo.id;
    if (id == length - 1) {
      this.currentVideo = this.videosList[0];
    }
    else {
      this.currentVideo = this.videosList[id! + 1];
    }
    this.videoActions.next({
      action: VideoActionType.Select,
      video: this.getCurrentVideo()
    });
    this.start();
  }

  playPrev() {
    let id = this.currentVideo.id;
    if (id == 0)
      this.currentVideo = this.videosList[this.length - 1];
    else
      this.currentVideo = this.videosList[id! - 1];

    this.videoActions.next({
      action: VideoActionType.Select,
      video: this.getCurrentVideo()
    });
    this.start();

  }

  onVideoTimeChanged() {
    return this.curTimeSub.asObservable();
  }

  onVideoActionChanged() {
    return this.videoActions.asObservable();
  }

  onVideoSourceLoadChanged() {
    return this.sourceSubject.asObservable();
  }

  createSuggestedVideoList() {
    let id: number = this.currentVideo.id!;
    let list = this.videosList;
    let suggestedList: VideoInfo[] = [];
    let counter = 0;

    if (id == 0) {
      for (counter; counter < 4; counter++)
        suggestedList.push(list[id + 1 + counter]);
    }
    else if (id == 1) {
      suggestedList.push(list[0])
      for (counter; counter < 3; counter++)
        suggestedList.push(list[id + counter + 2]);
    }
    else if (id == list.length - 2) {
      for (counter; counter < 3; counter++)
        suggestedList.push(list[id + counter - 3])
      suggestedList.push(list[id + 1]);
    }
    else if (id == list.length - 1) {
      for (counter; counter < 4; counter++)
        suggestedList.push(this.videosList[id + counter - 4]);
    }
    else {
      suggestedList.push(this.videosList[id - 2]);
      suggestedList.push(this.videosList[id - 1]);
      suggestedList.push(this.videosList[id + 1]);
      suggestedList.push(this.videosList[id + 2]);
    }

    return suggestedList;
  }

  getSuggestionByVideoId(videoId: number) {
    const id = this.currentVideo.id;
    // const index = this.videosList.findIndex(x => x.id == videoId);
    const peekCount = 5;
    const suggesstions = [];
    // const from = Math.max(0, index - Math.floor(peekCount / 2));
    // const to = Math.min(from + peekCount + 1, length - 1);
    // for (let i = from; i < to; i++) {
    //   if (i == index) {
    //     continue;
    //   }
    //   suggesstions.push(this.videosList[i]);
    // }
    // return suggesstions;

    for (let i = 1; i < peekCount; i++) {
      if (id! - i > 0 && id! + i < this.length && peekCount - i > 1) {
        suggesstions.push(this.videosList[id! + i]);
        suggesstions.push(this.videosList[id! - i]);
        i += 1;
      }
      else if (id! - i < 0 && id! + i < this.length) {
        suggesstions.push(this.videosList[id! + i]);
      }
      else if (id! - i > 0 && id! + i >= this.length) {
        suggesstions.push(this.videosList[id! - i]);
      }
    }

    return suggesstions;
  }


  createSecondVideoList() {
    let curr: VideoInfo = this.getCurrentVideo();
    let list = this.videosList;
    let secondList = list.filter(e => e.id != curr.id);
    return secondList;
  }

  changeCurrentVideo(vid: VideoInfo) {
    this.currentVideo = vid;
    this.videoActions.next({
      action: VideoActionType.Select,
      video: this.getCurrentVideo()
    })
    this.start();
  }


  loadVideoById(videoId: number) {
    const video = this.findVideo(videoId)
    if (!video) {
      return;
    }
    this.loadVideo(video);
  }

  getAllVideos() {
    return this.videosList;
  }

  //1 Azar
  goForward(){
    this.videoEl.currentTime += 10;
    // this.sourceSubject.subscribe(data =>{
    //   if(data.load == true){
      
    //   }
    // })
  }
  comeBack(){
    this.videoEl.currentTime -=10;
  }

  fullScreen(){
    if(!this.videoEl){
      return;
    }
    this.videoEl.requestFullscreen();
  }
  

  private loadVideo(video: VideoInfo) {
    if (!this.videoEl || !video) {
      return;
    }
    this.videoEl.src = this.basicPath + video.path;
    this.videoEl.load();
  }

  private loadPoster(video: VideoInfo) {
    if (!this.videoEl || !video) {
      return;
    }
    // this.videoEl.poster = this.basicPath+video.poster;
    this.videoEl.setAttribute('poster', this.basicPath + video.poster);
  }

  private getCurrentVideo() {
    if (!this.currentVideo) {
      this.currentVideo = this.videosList[0];
    }
    return this.currentVideo;
  }

  private findVideo(videoId: number) {
    return this.videosList.find(x => x.id == videoId);
  }

  constructor() { }

}
