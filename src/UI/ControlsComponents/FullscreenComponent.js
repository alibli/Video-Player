import './FullscreenComponent.css';
import { Component } from 'react';
import fullscreenIcon from '../../assets/icons/fullscreen.png';
import { playerService } from '../../Service/PlayerService';

class FullscreenComponent extends Component {
    onClickFullscreen() {
        playerService.fullscreenVideo();
    }

    render() {
        return (
            <button
                id="fullscreen-button"
            onClick={this.onClickFullscreen}
            >
                <img
                    className="fullscreen-icon"
                    src={fullscreenIcon}
                    alt="fullscreen" />
            </button>
        );
    }
}

export default FullscreenComponent;