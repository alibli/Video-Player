import Subject from "./Subject";
import SoulSrc from "../assets/videos/Soul.mp4";
import InsideOutSrc from "../assets/videos/Inside Out.mp4";
import LucaSrc from "../assets/videos/Luca.mp4";
import CocoSrc from "../assets/videos/Coco.mp4";
import UpSrc from "../assets/videos/Up.mp4";
import SoulPic from "../assets/pics/SoulPic.jpg";
import InsideOutPic from "../assets/pics/Inside Out Pic.jpg";
import LucaPic from "../assets/pics/Luca Pic.jpg";
import CocoPic from "../assets/pics/Coco Pic.jpg";
import UpPic from "../assets/pics/Up Pic.jpg";

class PlayerService {
    constructor() {
        this.videoEl = null;

        this.currentVideo = null;

        this.videoStates = {
            isPlaying: true,
            isMute: true,
            isEnded: false
        };

        this.videoList = [
            {
                id: 1,
                src: SoulSrc,
                title: "Soul 2020 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named the film as one of the top 10 films of 2020.",
                thumbnail: SoulPic
            },
            {
                id: 2,
                src: InsideOutSrc,
                title: "Inside Out 2015 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named Inside Out as one of the top 10 films of 2015.",
                thumbnail: InsideOutPic
            },
            {
                id: 3,
                src: LucaSrc,
                title: "Luca 2021 Offical Trailer",
                description: "Produced by Pixar Animation Studios. The film received generally positive reviews from critics, with praise for its visuals, voice acting, and nostalgic feel.",
                thumbnail: LucaPic
            },
            {
                id: 4,
                src: CocoSrc,
                type: "video/mp4",
                title: "Coco 2017 Offical Trailer",
                description: "Produced by Pixar Animation Studios. The film was praised for its animation, voice acting, music, visuals, emotional story, and respect for Mexican culture.",
                thumbnail: CocoPic
            },
            {
                id: 5,
                src: UpSrc,
                title: "Up 2009 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named Up as one of the top 10 films of 2009.",
                thumbnail: UpPic
            }
        ];

        this.timerSubject = new Subject();

        this.actionSubject = new Subject();
    }

    //getters
    getCurrentVideo() {
        if (!this.currentVideo) {
            this.currentVideo = this.videoList[0];
        }

        return this.currentVideo;
    }

    getVideoStates(state) {
        if (this.videoStates[state]) {
            return this.videoStates[state];
        }
    }

    //setters
    setVideoStates(state, value) {
        this.videoStates[state] = value;
    }

    //private methods
    loadVideo(id) {
        if (!this.videoEl) {
            return;
        }
        let videoObj = this.videoList.find(video => video.id === id);
        this.currentVideo = videoObj;
        this.videoEl.src = videoObj.src;
        this.videoEl.loadedMetadata = () => {
            this.videoEl.play();
        }
    }

    //public methods
    start() {
        var id = this.getCurrentVideo().id;
        this.loadVideo(id);
    }

    registerVideoElement(videoEl) {
        if (!videoEl) {
            return;
        }
        this.videoEl = videoEl;

        videoEl.ontimeupdate = e => {
            this.timerSubject.notify({
                video: this.currentVideo,
                time: {
                    current: this.videoEl.currentTime,
                    duration: this.videoEl.duration,
                    progress: this.videoEl.currentTime / this.videoEl.duration * 100
                }
            });
        };

        videoEl.onended = e => {
            this.setVideoStates('isEnded', true);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'END'
            });
        }
    }

    playPauseVideo() {
        if (this.getVideoStates('isPlaying')) {
            this.videoEl.pause();
            this.setVideoStates('isPlaying', false);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });
        } else if (!this.getVideoStates('isPlaying')) {
            this.videoEl.play();
            this.setVideoStates('isPlaying', true);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PLAY'
            });
        }
    }

    muteUnmuteVideo() {
        if (this.getVideoStates('isMute')) {
            this.videoEl.muted = false;
            this.setVideoStates('isMute', false);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'UNMUTE'
            });
        } else if (!this.getVideoStates('isMute')) {
            this.videoEl.muted = true;
            this.setVideoStates('isMute', true);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'MUTE'
            });
        }
    }

    nextVideo() {
        let nextVideo = this.videoList.find(video => video.id === this.currentVideo.id + 1);
        if (!nextVideo) {
            return;
        }
        this.loadVideo(this.currentVideo.id + 1);
        this.actionSubject.notify({
            video: this.currentVideo,
            action: 'NEXT'
        });
    }

    previousVideo() {
        let preVideo = this.videoList.find(video => video.id === this.currentVideo.id - 1);
        if (!preVideo) {
            return;
        }
        this.loadVideo(this.currentVideo.id - 1);
        this.actionSubject.notify({
            video: this.currentVideo,
            action: 'PREVIOUS'
        });
    }

    getFilteredVideoList() {
        if (!this.currentVideo) {
            return;
        }

        return this.videoList.filter(video => video.id !== this.currentVideo.id);
    }

    selectVideo(id) {
        let selectedVideo = this.videoList.find(video => video.id === id);
        if (!selectedVideo) {
            return;
        }
        this.loadVideo(id);
        this.actionSubject.notify({
            video: this.currentVideo,
            action: 'SELECT'
        });
    }
}

const player = new PlayerService();

export { player };