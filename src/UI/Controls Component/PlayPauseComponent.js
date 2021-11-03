import './PlayPauseComponent.css';
import PlayIcon from '../../assets/icons/Play.png';
import PauseIcon from '../../assets/icons/Pause.png';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class PlayVideo extends Component {
    constructor() {
        super()
        this.state = {
            isPlaying: true
        }

        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        player.actionSubject.subscribe(e => {
            switch (e.action) {
                case 'PLAY':
                    this.setState({ isPlaying: true });
                    break;

                case 'PAUSE':
                    this.setState({ isPlaying: false })
                    break;

                default:
                    break;
            }
        })
    }

    onClickPlayPause() {
        player.playPauseVideo()
    }

    render() {
        return (
            <>
                <button
                    id="play-pause"
                    onClick={this.onClickPlayPause}>
                    <img
                        className="play-pause"
                        src={
                            this.state.isPlaying
                                ? PauseIcon
                                : PlayIcon}
                        alt="play pause" />
                </button>
            </>
        );
    }
}

export default PlayVideo;