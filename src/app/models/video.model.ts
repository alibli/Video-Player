export class VideoTime {
    duration!: number;
    current!: number;
    progress!: number;
    // volume!: number;    //17aban
}
export class VideoInfo {
    id?: number;
    path?: string;
    duration?: number;
    poster?: string;
    title?: string
}
export enum VideoActionType{
    Play,
    Pause,
    End,
    Mute,
    Unmute,
    Select,   //19Aban
    VolumeChange,
    RateChange
}
export class VideoActionEventArg {
    action!: VideoActionType;
    video!: VideoInfo;
}
export class VideoTimeEventArg {
    video!: VideoInfo;
    time!: VideoTime;
}

export class VideoSourceArg{
    load?: boolean
}
