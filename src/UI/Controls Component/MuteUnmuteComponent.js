import './MuteUnmute.css';
import MuteIcon from '../../../assets/icons/Mute.png';
import UnmuteIcon from '../../../assets/icons/Unmute.png';
import { Component } from 'react';
import { videoPlayer } from '../../../Service/VideoPlayer';
import Observer from '../../../Service/observer/Observer';

const muteUnmuteObs = new Observer()

class Mute extends Component {
    constructor() {
        super()
        this.state = {
            isMute: videoPlayer.playerSubject.getState('isMute')
        }
    }

    componentDidMount() {
        videoPlayer.playerSubject.subscribe(muteUnmuteObs)
        muteUnmuteObs.update = (action) => {
            if (action === 'TOGGLE_MUTE') {
                this.setState({ isMute: videoPlayer.playerSubject.getState('isMute') })
            }
        }

        this.setState = this.setState.bind(this)
    }

    componentWillUnmount() {
        videoPlayer.playerSubject.unsubscribe(muteUnmuteObs)
    }

    onClickMuteUnmute() {
        videoPlayer.playerSubject.updateState('TOGGLE_MUTE')
    }

    render() {
        const { isMute } = this.state

        return (
            <button
                id="mute-unmute"
                onClick={this.onClickMuteUnmute}>
                <img
                    className="mute-unmute"
                    src={
                        isMute
                            ? MuteIcon
                            : UnmuteIcon}
                    alt="mute" />
            </button>
        );
    }
}

export default Mute;