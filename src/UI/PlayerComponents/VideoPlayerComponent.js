import './VideoPlayerComponent.css';
import { Component, createRef } from 'react';
import PreNextComponent from '../ControlsComponents/PreNextComponent';
import PlayPauseComponent from '../ControlsComponents/PlayPauseComponent';
import TimeComponent from '../ControlsComponents/TimeComponent';
import MuteUnmuteComponent from '../ControlsComponents/MuteUnmuteComponent';
import ProgressbarComponent from '../ControlsComponents/ProgressbarComponent';
import VideoInfoComponent from './VideoInfoComponent';
import VideoElComponent from './VideoElComponent';
import VideoListComponent from './VideoListComponent';
import SuggestListComponent from './SuggestListComponent';
import PlayerContainerComponent from './PlayerContainerComponent';

//video list sources
import SoulSrc from "../../assets/videos/Soul.mp4";
import InsideOutSrc from "../../assets/videos/Inside Out.mp4";
import LucaSrc from "../../assets/videos/Luca.mp4";
import CocoSrc from "../../assets/videos/Coco.mp4";
import UpSrc from "../../assets/videos/Up.mp4";
import SoulPic from "../../assets/pics/SoulPic.jpg";
import InsideOutPic from "../../assets/pics/Inside Out Pic.jpg";
import LucaPic from "../../assets/pics/Luca Pic.jpg";
import CocoPic from "../../assets/pics/Coco Pic.jpg";
import UpPic from "../../assets/pics/Up Pic.jpg";
import VolumeComponent from '../ControlsComponents/VolumeComponent';
import ForwardBackwardComponent from '../ControlsComponents/ForwardBackwardComponent';
import FullscreenComponent from '../ControlsComponents/FullscreenComponent';

class VideoPlayer extends Component {
    constructor() {
        super();

        this.videoRef = createRef();

        this.state = {
            videoList: [
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
            ]

        }

    }

    render() {
        return (
            <PlayerContainerComponent
                videoList={this.state.videoList}>

                <div className="player">

                    <div className="video">
                        <VideoElComponent />

                        <PreNextComponent />

                        <div className="controls">
                            <ProgressbarComponent />

                            <div className="progress-bottom">
                                <PlayPauseComponent />

                                <TimeComponent />

                                <MuteUnmuteComponent />

                                <VolumeComponent />

                                <ForwardBackwardComponent />

                                <FullscreenComponent />
                            </div>
                        </div>

                        <SuggestListComponent />
                    </div>

                    <VideoInfoComponent />

                </div>

                <VideoListComponent />

            </PlayerContainerComponent>
        );
    }
}

export default VideoPlayer;