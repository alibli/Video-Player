import Subject from "./Subject";

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

        this.videoList = [];

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
            console.log("videoStates object of id number", id, "doesn't exist.");
            return;
        }

        return this.videosStates[id][state];
    }

    getCurrentVideoStates(state) {
        let currentVideo = this.getCurrentVideo();
        if (!currentVideo) {
            return;
        }
        this.getVideoStatesById(currentVideo.id, state);
    }

    getVideoList() {
        return this.videoList;
    }

    getVideosStates() {
        if (!this.videosStates) {
            console.log("videosStates object is empty.");
            return;
        }

        return this.videosStates;
    }

    getVolumeStates(state) {
        if (!this.volumeStates[state]) {
            console.log(state, "doesn't exist in volumeStates object.");
            return;
        }
        return this.volumeStates[state];
    }

    //setters
    setVideoList(videoList) {
        if (videoList.length === 0) {
            console.log('videoList is empty as argument in setVideoList in PlayerService.');
            return;
        }

        this.videoList = videoList;

        this.actionSubject.notify({
            action: 'SET_VIDEOLIST'
        });
    }

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
            console.log("videoEl doesn't exist (loadVideo in PlayerService).");
            return;
        }

        let currentVideo = this.getCurrentVideo()

        this.setVideoStates(currentVideo.id, { isPlaying: false });

        let videoObj = this.videoList.find(video => video.id === id);
        this.currentVideo = videoObj;
        this.videoEl.src = videoObj.src;
        this.videoEl.poster = videoObj.thumbnail;

        this.videoEl.onloadeddata = () => {
            //this.videoEl.currentTime = 130;
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

    registerVideoEl(videoEl) {
        if (!videoEl) {
            console.log("videoEl doesn't exist as argument in registerVideoEl in playerService.");
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
            let currentVideo = this.getCurrentVideo();

            this.setVideoStates(currentVideo.id, { isPlaying: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });

            this.setVideoStates(currentVideo.id, { isEnded: true });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'END'
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
            this.setVolumeStates({ isMute: true });
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

    setCurrentTime(difRate) {
        let videoDur = this.videoEl.duration;

        let newCurrentTime = difRate * videoDur;
        console.log(newCurrentTime)

        this.videoEl.currentTime = newCurrentTime;

        this.timerSubject.notify({
            video: this.currentVideo,
            time: {
                current: newCurrentTime,
                duration: videoDur,
                progress: newCurrentTime / videoDur * 100
            }
        });
    }
}

const player = new PlayerService();

export { player };