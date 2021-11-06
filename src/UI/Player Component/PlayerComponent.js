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
import VideoListComponent from '../Controls Component/VideoListComponent';

class VideoPlayer extends Component {
    constructor() {
        super();

        this.state = {
            isEnded: player.getVideoStates('isEnded')
        }

        this.observer = e => {
            switch (e.action) {
                case 'END':
                    this.setState({ isEnded: true });
                    break;

                case 'SELECT':
                    this.setState({ isEnded: false });
                    break;

                default:
                    break;
            }
        }

        this.videoRef = createRef();
    }

    componentDidMount() {
        player.registerVideoElement(this.videoRef.current);
        player.actionSubject.subscribe(this.observer);
        player.start();
    }

    componentWillUnmount() {
        player.actionSubject.unsubscribe(this.observer);
    }

    render() {
        return (
            <div className="videoplayer">
                {
                    !this.state.isEnded &&
                    <>
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
                        <VideoInfoComponent />
                    </>
                }
                {
                    this.state.isEnded &&
                    <VideoListComponent />
                }
            </div>
        );
    }
}

export default VideoPlayer;