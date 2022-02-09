import { Subject } from "rxjs";

export class MyPlayer {

    private currentVideo: any;
    private onChangedTime = new Subject<any>();

    videoEl: any = null;

    constructor() {

    }

    registerVideoElement(videoEl: any) {
        this.videoEl = videoEl;
        // this.videoEl.durationchange(e => {
        //     this.onChangedTime.next({
        //         time: e.time,
        //         video: this.currentVideo
        //     });
        // })
    }

    getVideoTimer() {
        return this.onChangedTime;
    }

    setDataSource(videoList: any[]) {
        // this.videoList = videoList;
    }

    togglePlay(play: boolean) {
        if (!this.videoEl) {
            return;
        }
        if (play) {
            this.videoEl.play();
        }
        else {
            this.videoEl.pause();
        }
    }
}
