import Subject from "./Subject";

class PlayerService {
    constructor() {
        this.videoEl = null;

        this.currentVideo = null;

        this.volumeStates = {
            isMute: true,
            volumeValue: 50
        };

        this.videosStates = {};

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

    getVideoEl() {
        if (!this.videoEl) {
            console.log('videoEl is empty (getVideoEl in PlayerService');
            return;
        }

        return this.videoEl;
    }

    getVideoList() {
        if (this.videoList.length === 0) {
            console.log('videoList is empty(getVideoList in PlayerService).');
            return;
        }

        return this.videoList;
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

    //setters
    setCurrentVideoById(id) {
        let videoList = this.getVideoList();
        let videoObj = videoList.find(video => video.id === id);

        this.currentVideo = videoObj;
    }

    setVideoElAttrsByVideoId(id, attrs) {
        let videoEl = this.getVideoEl();
        if (!videoEl) {
            console.log("videoEl doesn't exist (setVideoElAttr in PlayerService).")
        }

        let videoList = this.getVideoList();
        let videoObj = videoList.find(video => video.id === id);

        for (let attr of attrs) {
            videoEl[attr] = videoObj[attr]
        }
    }

    setVideoList(videoList) {
        if (videoList.length === 0) {
            console.log('videoList is empty as argument in setVideoList in PlayerService.');
            return;
        }

        this.videoList = videoList;
        this.initialVideosStates();

        this.actionSubject.notify({
            action: 'SET_VIDEOLIST'
        });
    }

    setVolumeStates(state) {
        for (let key in state) {
            this.volumeStates[key] = state[key];
        }
    }

    setVideoStatesById(id, state) {
        this.videosStates[id] = { ...this.videosStates[id], ...state };
    }

    initialVideosStates() {
        let vidoeList = this.getVideoList();
        let initialStates = {
            isPlaying: false, isEnded: false
        }

        vidoeList.forEach(video => {
            this.setVideoStatesById(video.id, initialStates)
        })
    }

    //public methods
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
    }

    loadVideo(id) {
        if (!this.videoEl) {
            console.log("videoEl doesn't exist (loadVideo in PlayerService).");
            return;
        }

        let videoEl = this.getVideoEl();

        //setting isPlaying false for currentVideo
        let currentVideo = this.getCurrentVideo();
        this.setVideoStatesById(currentVideo.id, { isPlaying: false });

        this.setCurrentVideoById(id);

        this.setVideoElAttrsByVideoId(id, ['src', 'poster']);

        videoEl.onloadeddata = () => {
            videoEl.play();

            this.setVideoStatesById(id, { isPlaying: true })

            this.actionSubject.notify({
                video: this.currentVideo,
                action: 'PLAY'
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
        
        this.loadVideo(currentVideo.id + 1);
    }

    previousVideo() {
        let currentVideo = this.getCurrentVideo();
        
        this.loadVideo(currentVideo.id - 1);
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

    suggestListById(peekCount) {
        let currentVideo = this.getCurrentVideo();
        let videoList = this.getVideoList();
        var myList = videoList.filter(video => video.id !== currentVideo.id);
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
console.log(newCurrentTime)
        this.timerSubject.notify({
            video: this.currentVideo,
            time: {
                current: this.videoEl.currentTime,
                duration: this.videoEl.duration,
                progress: this.videoEl.currentTime / this.videoEl.duration * 100
            }
        });
    }
}

const playerService = new PlayerService();

export { playerService };