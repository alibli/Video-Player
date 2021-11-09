import './PlayerComponent.css';
import { Component, createRef } from 'react';
import PlayPauseComponent from '../Controls Component/PlayPauseComponent';
import TimeComponent from '../Controls Component/TimeComponent';
import MuteUnmuteComponent from '../Controls Component/MuteUnmuteComponent';
import ProgressbarComponent from '../Controls Component/ProgressbarComponent';
import NextComponent from '../Controls Component/NextComponent';
import PreviousComponent from '../Controls Component/PreviousComponent';
import VideoInfoComponent from './VideoInfoComponent';
import { player } from '../../Service/PlayerService';
import VideoListComponent from './VideoListComponent';
import SuggestListComponent from './SuggestListComponent';

class VideoPlayer extends Component {
    constructor() {
        super();

        this.videoRef = createRef();
    }

    componentDidMount() {
        player.registerVideoElement(this.videoRef.current);
        player.start();
    }

    render() {
        return (
            <>
                <div className="player">
                    <h1 className="main-title">
                        Best of Pixar Animation Studios Trailers
                    </h1>
                    <div className="video">
                        <video
                            autoPlay
                            muted
                            ref={this.videoRef}>
                        </video>
                        <div className="pre-next">
                            <PreviousComponent />
                            <NextComponent />
                        </div>
                        <div className="controls">
                            <div className="progressbar">
                                <ProgressbarComponent />
                            </div>
                            <div className="progress-bottom">
                                <PlayPauseComponent />
                                <TimeComponent />
                                <MuteUnmuteComponent />
                            </div>
                        </div>
                        <div c
                            lassName="suggestlist-section"
                            style={{
                                display: 'none'
                            }}>
                            <SuggestListComponent />
                        </div>
                    </div>
                    <div className="video-info">
                        <VideoInfoComponent />
                    </div>

                </div>
                <div className="videolist-section">
                    <VideoListComponent />
                </div>
            </>
        );
    }
}

export default VideoPlayer;