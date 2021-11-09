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

        this.volumeStates = {
            isMute: true,
            volumeValue: 50
        };

        this.videosStates = {
            '1': {
                isPlaying: false,
                isEnded: false
            },
            '2': {
                isPlaying: false,
                isEnded: false
            },
            '3': {
                isPlaying: false,
                isEnded: false
            },
            '4': {
                isPlaying: false,
                isEnded: false
            },
            '5': {
                isPlaying: false,
                isEnded: false
            }
        };

        this.videoList = [
            {
                id: '1',
                src: SoulSrc,
                title: "Soul 2020 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named the film as one of the top 10 films of 2020.",
                thumbnail: SoulPic
            },
            {
                id: '2',
                src: InsideOutSrc,
                title: "Inside Out 2015 Offical Trailer",
                description: "Produced by Pixar Animation Studios. Organizations like the National Board of Review and American Film Institute named Inside Out as one of the top 10 films of 2015.",
                thumbnail: InsideOutPic
            },
            {
                id: '3',
                src: LucaSrc,
                title: "Luca 2021 Offical Trailer",
                description: "Produced by Pixar Animation Studios. The film received generally positive reviews from critics, with praise for its visuals, voice acting, and nostalgic feel.",
                thumbnail: LucaPic
            },
            {
                id: '4',
                src: CocoSrc,
                type: "video/mp4",
                title: "Coco 2017 Offical Trailer",
                description: "Produced by Pixar Animation Studios. The film was praised for its animation, voice acting, music, visuals, emotional story, and respect for Mexican culture.",
                thumbnail: CocoPic
            },
            {
                id: '5',
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

    isPlaying(videoId) {
        return this.getVideoStatesById(videoId, 'isPlaying');
    }

    getVideoStatesById(id, state) {
        if (!this.videosStates[id]) {
            return;
        }

        return this.videosStates[id][state];
    }

    getCurrentVideoStates(state) {
        this.getVideoStatesById(this.getCurrentVideo().id, state);
    }

    getVideoList() {
        if (!this.videoList) {
            return;
        }

        return this.videoList;
    }

    getVideosStates() {
        if (!this.videosStates) {
            return;
        }

        return this.videosStates;
    }

    getVolumeStates(state) {
        return this.volumeStates[state];
    }

    //setters
    setVideoStates(id, state) {
        for (let key in state) {
            this.videosStates[id][key] = state[key];
        }
    }

    setVolumeStates(state) {
        for (let key in state) {
            this.volumeStates[key] = state[key];
        }
    }

    //private methods
    loadVideo(id) {
        if (!this.videoEl) {
            return;
        }

        if (this.currentVideo) {
            this.setVideoStates(this.currentVideo.id, { isPlaying: false });
        } 

        let videoObj = this.videoList.find(video => video.id === id);
        this.currentVideo = videoObj;
        this.videoEl.src = videoObj.src;
        this.videoEl.poster = videoObj.thumbnail;

        this.videoEl.onloadeddata = () => {
            this.videoEl.currentTime = 130;
            this.videoEl.play();
            this.setVideoStates(id, { isPlaying: true })

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PLAY'
            });
        }
    }

    //public methods
    start() {
        let currentVideo = this.getCurrentVideo();
        this.loadVideo(currentVideo.id);
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
            this.setVideoStates(this.getCurrentVideo().id, { isPlaying: false });

            this.setVideoStates('isEnded', true);
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'END'
            });

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });
        }
    }

    playPauseVideo() {
        const isPlaying = this.getVideoStatesById(this.currentVideo.id, 'isPlaying');

        if (isPlaying) {
            this.videoEl.pause();
            this.setVideoStates(this.currentVideo.id, { isPlaying: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });
        } else if (!isPlaying) {
            this.videoEl.play();
            if (!this.videoEl.paused) {
                this.setVideoStates(this.currentVideo.id, { isPlaying: true });
                this.actionSubject.notify({
                    video: this.currentVideo,
                    action: 'PLAY'
                });
            }
        }
    }

    muteUnmuteVideo() {
        const isMute = this.getVolumeStates('isMute');

        if (isMute) {
            this.videoEl.muted = false;
            this.setVolumeStates({ isMute: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'UNMUTE'
            });
        } else if (!isMute) {
            this.videoEl.muted = true;
            this.setVolumeStates({ isMute: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'MUTE'
            });
        }
    }

    nextVideo() {
        let currentVideo = this.getCurrentVideo();
        let videoList = this.getVideoList();
        let nextVideoId = parseInt(currentVideo.id) + 1;
        let nextVideo = videoList.find(video => video.id === nextVideoId.toString());
        if (!nextVideo) {
            return;
        }
        this.loadVideo(nextVideoId.toString());
    }

    previousVideo() {
        let currentVideo = this.getCurrentVideo();
        let videoList = this.getVideoList();
        let preVideoId = parseInt(currentVideo.id) - 1;
        let preVideo = videoList.find(video => video.id === preVideoId.toString());
        if (!preVideo) {
            return;
        }
        this.loadVideo(preVideoId.toString());
    }

    isLastVideo() {
        let currentVideo = this.getCurrentVideo();
        let videoList = this.getVideoList();
        if (currentVideo.id === videoList[videoList.length - 1].id) {
            return true;
        } else {
            return false;
        }
    }

    isfirstVideo() {
        let currentVideo = this.getCurrentVideo();
        let videoList = this.getVideoList();
        if (currentVideo.id === videoList[0].id) {
            return true;
        } else {
            return false;
        }
    }

    selectVideo(id) {
        let videoList = this.getVideoList();
        let selectedVideo = videoList.find(video => video.id === id);
        if (!selectedVideo) {
            return;
        }
        this.loadVideo(id);
    }

    suggestListById(id) {
        const peekCount = 2;
        let videoList = this.getVideoList();
        var myList = videoList.filter(video => video.id !== id);
        const suggestions = [];
        for (let i = 0; i < peekCount; i++) {
            const index = Math.floor(Math.random() * (myList.length - 1));
            suggestions.push(myList[index]);
            myList.splice(index, 1);
        }
        return suggestions;
    }
}

const player = new PlayerService();

export { player };