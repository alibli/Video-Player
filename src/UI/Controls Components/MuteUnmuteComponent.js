import './MuteUnmuteComponent.css';
import { Component } from 'react';
import MuteIcon from '../../assets/icons/Mute.png';
import UnmuteIcon from '../../assets/icons/Unmute.png';
import { player } from '../../Service/PlayerService';

class Mute extends Component {
    constructor() {
        super()
        this.state = {
            isMute: null
        }

        this.observer = e => {
            switch(e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({ isMute: player.getVolumeStates('isMute') })
                    break;

                case 'MUTE':
                    this.setState({isMute: true});
                    break;

                case 'UNMUTE':
                    this.setState({isMute: false});
                    break;
                
                default:
                    break;
            }
        };

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        player.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        player.actionSubject.unsubscribe(this.observer);
    }
    
    onClickMuteUnmute() {
        player.muteUnmuteVideo()
    }

    render() {
        return (
            <button
                id="mute-unmute"
                onClick={this.onClickMuteUnmute}>
                <img
                    className="mute-unmute"
                    src={
                        this.state.isMute
                            ? MuteIcon
                            : UnmuteIcon}
                    alt="mute unmute" />
            </button>
        );
    }
}

export default Mute;