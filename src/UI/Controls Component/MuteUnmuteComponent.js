import './MuteUnmuteComponent.css';
import { Component } from 'react';
import MuteIcon from '../../assets/icons/Mute.png';
import UnmuteIcon from '../../assets/icons/Unmute.png';
import { player } from '../../Service/PlayerService';

class Mute extends Component {
    constructor() {
        super()
        this.state = {
            isMute: player.getCurrentInfo('isMute')
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        player.actionSubject.subscribe(e => {
            switch(e.action) {
                case 'MUTE':
                    this.setState({isMute: true});
                    break;

                case 'UNMUTE':
                    this.setState({isMute: false});
                    break;
                
                default:
                    break;
            }
        })    
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