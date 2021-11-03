import Subject from "./Subject";
import SoulSrc from "/home/pc14/Documents/Video-Player/src/assets/videos/Soul.mp4";
import InsideOutSrc from "/home/pc14/Documents/Video-Player/src/assets/videos/Inside Out.mp4";
import LucaSrc from "/home/pc14/Documents/Video-Player/src/assets/videos/Luca.mp4";
import CocoSrc from "/home/pc14/Documents/Video-Player/src/assets/videos/Coco.mp4";
import UpSrc from "/home/pc14/Documents/Video-Player/src/assets/videos/Up.mp4";
import SoulPic from "/home/pc14/Documents/Video-Player/src/assets/pics/SoulPic.jpg";
import InsideOutPic from "/home/pc14/Documents/Video-Player/src/assets/pics/Inside Out Pic.jpg";
import LucaPic from "/home/pc14/Documents/Video-Player/src/assets/pics/Luca Pic.jpg";
import CocoPic from "/home/pc14/Documents/Video-Player/src/assets/pics/Coco Pic.jpg";
import UpPic from "/home/pc14/Documents/Video-Player/src/assets/pics/Up Pic.jpg";

class PlayerService {
    constructor() {
        this.videoEl = null;

        this.currentVideo = null;

        this.isPlaying = true;

        this.isMute = false;

        this.videoList = [
            {
                id: 1,
                src: SoulSrc,
                type: "video/mp4",
                title: "Soul 2020 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named the film as one of the top 10 films of 2020.",
                thumbnail: SoulPic
            },
            {
                id: 2,
                src: InsideOutSrc,
                type: "video/mp4",
                title: "Inside Out 2015 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named Inside Out as one of the top 10 films of 2015.",
                thumbnail: InsideOutPic
            },
            {
                id: 3,
                src: LucaSrc,
                type: "video/mp4",
                title: "Luca 2021 Offical Trailer",
                description: "Produced by Pixar Animation Studios. The film received generally positive reviews from critics, with praise for its visuals, voice acting, and nostalgic feel.",
                thumbnail: LucaPic
            },
            {
                id: 4,
                src: CocoSrc,
                type: "video/mp4",
                title: "Coco 2017 Offical Trailer",
                description: "Produced by Pixar Animation Studios. he film was praised for its animation, voice acting, music, visuals, emotional story, and respect for Mexican culture.",
                thumbnail: CocoPic
            },
            {
                id: 5,
                src: UpSrc,
                type: "video/mp4",
                title: "Up 2009 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named Up as one of the top 10 films of 2009.",
                thumbnail: UpPic
            }
        ];

        this.timerSubject = new Subject();

        this.actionSubject = new Subject();
    }

    start() {
        var video = this.getCurrentVideo();
        this.loadVideo(video);
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
    }

    playPauseVideo() {
        if(this.isPlaying) {
            this.videoEl.pause();

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });

        } else if (!this.isPlaying) {
            this.videoEl.play();

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PLAY'
            });

        }

        this.isPlaying = !this.isPlaying;
    }

    //private
    getCurrentVideo() {
        if (!this.currentVideo) {
            this.currentVideo = this.videoList[0];
        }

        return this.currentVideo;
    }

    loadVideo(videoObj) {
        if (!this.videoEl || !videoObj) {
            return;
        }
        this.videoEl.src = videoObj.src;
        this.videoEl.load();
        this.videoEl.play();
    }
}

const player = new PlayerService();

export { player };