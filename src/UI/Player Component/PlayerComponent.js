import './PlayerComponent.css';
import PlayPause from '../Controls Component/PlayPauseComponent';
import TimeComponent from '../Controls Component/TimeComponent';
import ProgressbarComponent from '../Controls Component/ProgressbarComponent';
import { Component, createRef } from 'react';
import { player } from '../../Service/PlayerService';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);

        this.videoRef = createRef()
    }

    componentDidMount() {
        player.registerVideoElement(this.videoRef.current)
        player.start()
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
                        <TimeComponent />

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;