import './PlayerComponent.css';
import { Component, createRef } from 'react';
import PlayPause from '../Controls Component/PlayPauseComponent';
import Time from '../Controls Component/TimeComponent';
import MuteUnmute from '../Controls Component/MuteUnmuteComponent';
import ProgressbarComponent from '../Controls Component/ProgressbarComponent';
import { player } from '../../Service/PlayerService';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);

        this.videoRef = createRef();
    }

    componentDidMount() {
        player.registerVideoElement(this.videoRef.current);
        player.start();
    }

    render() {
        return (
            <div className="videoplayer">
                <video autoPlay muted ref={this.videoRef}>
                </video>
                <div className="controls">
                    <div className="progressbar">
                        <ProgressbarComponent />
                    </div>
                    <div className="progress-bottom">
                        <PlayPause />
                        <Time />
                        <MuteUnmute />
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;