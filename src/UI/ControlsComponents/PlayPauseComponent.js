import './PlayPauseComponent.css';
import { Component } from 'react';
import PlayIcon from '../../assets/icons/Play.png';
import PauseIcon from '../../assets/icons/Pause.png';
import { playerService } from '../../Service/PlayerService';

class PlayVideo extends Component {
    constructor() {
        super()
        this.state = {
            isPlaying: null,
        }

        this.observer = e => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({ isPlaying: playerService.getCurrentVideoStates('isPlaying') })
                    break;

                case 'PLAY':
                    this.setState({ isPlaying: true });
                    break;

                case 'PAUSE':
                    this.setState({ isPlaying: false })
                    break;

                default:
                    break;
            }
        };

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.observer);

    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.observer);
    }

    onClickPlayPause() {
        playerService.playPauseVideo();
    }

    render() {
        return (
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
        );
    }
}

export default PlayVideo;