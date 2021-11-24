import Subject from "./Subject";

class PlayerService {
    constructor() {
        this.videoEl = null;

        this.currentVideo = null;

        this.volumeStates = {
            isMute: true,
            volume: 0.5
        };

        this.videosStates = {};

        this.videoList = [];

        this.timerSubject = new Subject();

        this.actionSubject = new Subject();

        this.listLoadSubject = new Subject();
    }

    //public getters
    getCurrentVideo() {
        if (!this.currentVideo) {
            this.currentVideo = this.videoList[0];
        }

        return this.currentVideo;
    }

    getVolumeStates(state) {
        return this.volumeStates[state];
    }

    getVideosStates() {
        return this.videosStates;
    }

    getVideoStatesById(id, state) {
        return this.videosStates[id][state];
    }

    getCurrentVideoStates(state) {
        let currentVideo = this.getCurrentVideo();
        this.getVideoStatesById(currentVideo.id, state);
    }

    getIsPlayingStateById(videoId) {
        return this.getVideoStatesById(videoId, 'isPlaying');
    }

    //public setters
    setVideoList(videoList) {
        this.videoList = videoList;
        this.initialVideosStates();

        this.listLoadSubject.notify({
            action: 'SET_VIDEOLIST'
        });
    }

    //public methods
    registerVideoEl(videoEl) {
        if (!videoEl) {
            console.log("videoEl doesn't exist as argument in registerVideoEl in playerService.");
            return;
        }

        this.videoEl = videoEl;

        videoEl.ontimeupdate = () => {
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

            this.setVideoStatesById(currentVideo.id, { isPlaying: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });

            this.setVideoStatesById(currentVideo.id, { isEnded: true });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'END'
            });
        }

        videoEl.onvolumechange = e => {
            const isMute = this.getVolumeStates('isMute');
            const newMuteState = e.target.muted;
            const newVolume = e.target.volume;

            if ((isMute && !newMuteState) ||
                (isMute && newVolume > 0)) {

                this.videoEl.muted = false;
                this.setVolumeStates({ isMute: false });
                this.actionSubject.notify({
                    video: this.currentVideo,
                    action: 'UNMUTE'
                });

            } else if ((!isMute && newMuteState) ||
                (!isMute && newVolume === 0)) {

                this.setVolumeStates({ isMute: true });
                this.actionSubject.notify({
                    video: this.currentVideo,
                    action: 'MUTE'
                });

            }

            this.setVolumeStates({ volume: newVolume });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'VOLUME_CHANGE'
            });


        }
    }

    start() {
        let currentVideo = this.getCurrentVideo();
        this.loadVideo(currentVideo.id);
    }

    playPauseVideo() {
        const isPlaying = this.getVideoStatesById(this.currentVideo.id, 'isPlaying');

        if (isPlaying) {

            this.videoEl.pause();
            this.setVideoStatesById(this.currentVideo.id, { isPlaying: false });
            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PAUSE'
            });

        } else if (!isPlaying) {

            this.videoEl.play();
            if (!this.videoEl.paused) {
                this.setVideoStatesById(this.currentVideo.id, { isPlaying: true });
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
        } else if (!isMute) {
            this.videoEl.muted = true;
        }
    }

    setVolume(vlm) {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (setVolume in PlayerService).");
            return;
        }

        this.videoEl.volume = vlm;
    }

    nextVideo() {
        let currentVideo = this.getCurrentVideo();

        this.loadVideo(currentVideo.id + 1);
    }

    previousVideo() {
        let currentVideo = this.getCurrentVideo();

        this.loadVideo(currentVideo.id - 1);
    }

    isLastVideo() {
        let currentVideo = this.getCurrentVideo();

        if (currentVideo.id === this.videoList[this.videoList.length - 1].id) {
            return true;
        } else {
            return false;
        }
    }

    isfirstVideo() {
        let currentVideo = this.getCurrentVideo();

        if (currentVideo.id === this.videoList[0].id) {
            return true;
        } else {
            return false;
        }
    }

    selectVideo(videoId) {
        if (!this.videoList.find(video => video.id === videoId)) {
            console.log('There is no video with id of', videoId, 'in video list (selectVideo in PlayerService).');
            return;
        }

        this.loadVideo(videoId);
    }

    suggestListById(peekCount) {
        let currentVideo = this.getCurrentVideo();
        var myList = this.videoList.filter(video => video.id !== currentVideo.id);
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
        this.videoEl.currentTime = newCurrentTime;
    }

    forwardVideo() {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (forwardVideo in PlayerService).");
            return;
        }

        this.videoEl.currentTime += 10;
    }

    backwardVideo() {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (forwardVideo in PlayerService).");
            return;
        }

        this.videoEl.currentTime -= 10;
    }

    fullscreenVideo() {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (fullscreenVideo in PlayerService).");
            return;
        }

        this.videoEl.requestFullscreen();
    }
    //private getters
    getVideoList() {
        return this.videoList;
    }

    //private setters
    setCurrentVideoById(videoId) {
        let videoObj = this.videoList.find(video => video.id === videoId);

        if (!videoObj) {
            console.log('There is no video with id of', videoId, 'in video list (setCurrentVideoById in PlayerService).');
            return;
        }

        this.currentVideo = videoObj;
    }

    setVolumeStates(state) {
        for (let key in state) {
            this.volumeStates[key] = state[key];
        }
    }

    setVideoStatesById(id, state) {
        this.videosStates[id] = { ...this.videosStates[id], ...state };
    }

    //private methods
    initialVideosStates() {
        let initialStates = {
            isPlaying: false,
            isEnded: false
        }

        this.videoList.forEach(video => {
            this.setVideoStatesById(video.id, initialStates)
        })
    }

    loadVideo(videoId) {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (loadVideo in PlayerService).");
            return;
        }

        let currentVideo = this.getCurrentVideo();

        //setting isPlaying false for currentVideo
        this.setVideoStatesById(currentVideo.id, { isPlaying: false });

        //setting an new video with videoId as currentVideo
        let videoObj = this.videoList.find(video => video.id === videoId);
        this.setCurrentVideoById(videoId);

        this.videoEl.src = videoObj.src;
        this.videoEl.poster = videoObj.poster;

        this.videoEl.onloadeddata = () => {
            this.videoEl.play();

            this.setVideoStatesById(videoId, { isPlaying: true })

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PLAY'
            });
        }
    }


}

const playerService = new PlayerService();

export { playerService };