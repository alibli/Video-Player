import './PlayerComponent.css';
import { Component, createRef } from 'react';
import PreNextComponent from '../Controls Component/PreNextComponent';
import PlayPauseComponent from '../Controls Component/PlayPauseComponent';
import TimeComponent from '../Controls Component/TimeComponent';
import MuteUnmuteComponent from '../Controls Component/MuteUnmuteComponent';
import ProgressbarComponent from '../Controls Component/ProgressbarComponent';
import VideoInfoComponent from './VideoInfoComponent';
import { player } from '../../Service/PlayerService';
import VideoListComponent from './VideoListComponent';
import SuggestListComponent from './SuggestListComponent';
import VideoContainerComponent from './VideoContainerComponent';

class VideoPlayer extends Component {
    constructor() {
        super();

        this.videoRef = createRef();

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        player.registerVideoElement(this.videoRef.current);
        player.start();
    }

    render() {
        return (
            <VideoContainerComponent>

                <div className="player">

                    <div className="video">
                        <video
                            autoPlay
                            muted
                            ref={this.videoRef}>
                        </video>

                        <PreNextComponent />

                        <div className="controls">
                            <ProgressbarComponent />

                            <div className="progress-bottom">
                                <PlayPauseComponent />

                                <TimeComponent />

                                <MuteUnmuteComponent />
                            </div>
                        </div>

                        <SuggestListComponent />
                    </div>

                    <VideoInfoComponent />

                </div>

                <VideoListComponent />

            </VideoContainerComponent>
        );
    }
}

export default VideoPlayer;