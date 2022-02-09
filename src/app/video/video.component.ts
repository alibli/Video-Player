import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from "../player.service";
import { VideoActionEventArg, VideoActionType, VideoInfo } from '../models/video.model';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [PlayerService]
})
export class VideoComponent implements OnInit {

  videosList: VideoInfo[] = [
    { id: 0, path: 'forza5.mp4', duration: 113, poster: 'forzaPic.png', title: 'forza5 Trailer' },
    { id: 1, path: 'battlefield.mp4', duration: 74, poster: 'battlefieldPic.png', title: 'battlefield Trailer' },
    { id: 2, path: 'flash.mp4', duration: 88, poster: 'flashPic.png', title: 'flash Trailer' },
    { id: 3, path: 'sooriland-footbalist ha.mp4', duration: 153, poster: 'sooriLandPic.png', title: 'فوتبالیست ها' },
    { id: 4, path: 'ghost.mp4', duration: 91, poster: 'ghostPic.png', title: 'ghost Trailer' },
    { id: 5, path: 'gta.mp4', duration: 58, poster: 'gtaPic.png', title: 'GTA Trailer' },
    { id: 6, path: 'jurassic.mp4', duration: 28, poster: 'jurassicPic.png', title: 'jurrasic park Trailer' },
    { id: 7, path: 'mrbeen.mp4', duration: 233, poster: 'mrBeenPic.png', title: 'Mr.Been' },
    { id: 8, path: 'soulStealer.mp4', duration: 60, poster: 'soulPic.png', title: 'soul' },
    { id: 9, path: 'squidgame.mp4', duration: 139, poster: 'squidGamePic.png', title: 'squid game' },
  ];

  constructor(private playerService: PlayerService) {
    // this.video = {} as ElementRef;
    // this.currentTime = 0;
  }

  currentVideoInfo!: VideoInfo;
  // duration?: number;
  // currentTime: number;
  // title?: string;

  ngOnInit(): void {

    // this.title = this.currentVideoInfo.title;
    // console.log(this.title);


    // this.playerService.onVideoTimeChanged().subscribe(data => {
    //   this.currentTime = Math.round(data.time.current);
    //   if (data.time.duration) {
    //     this.duration = Math.round(data.time.duration);
    //   }
    // });
    // this.playerService.onVideoActionChanged().subscribe(this.videoActionChanged);
    // this.duration = this.currentVideoInfo.duration;
    // console.log(this.duration);

  }

  // videoActionChanged = (data: VideoActionEventArg) => {
  //   switch (data.action) {
  //     case VideoActionType.Play:
  //     case VideoActionType.Select:
  //       this.title = data.video.title;
  //       this.duration = data.video.duration;
  //       break;
  //   }
  // }


  logGetSuggestionByVideoId() {
    console.log(this.playerService.getSuggestionByVideoId(this.currentVideoInfo.id!));

  }

}