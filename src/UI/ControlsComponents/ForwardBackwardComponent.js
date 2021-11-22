import './ForwardBackwardComponent.css';
import { Component } from 'react';
import backwardIconSrc from '../../assets/icons/secondsBackward.png';
import forwardIconSrc from '../../assets/icons/secondsForward.png';
import { playerService } from '../../Service/PlayerService';

class ForwardBackwardComponent extends Component {

    onClickForward() {
        playerService.forwardVideo();
    }

    onClickBackward() {
        playerService.backwardVideo();
    }


    render() {
        return (
            <div className="forward-backward-sec">
                <button
                    className="forward-backward-but"
                    onClick={this.onClickBackward}
                    >
                        <img
                            className="forward-backward-icon"
                            src={backwardIconSrc}
                            alt="10 seconds backward" />
                </button>
                <button
                    className="forward-backward-but"
                    onClick={this.onClickForward} 
                    >
                        <img
                            className="forward-backward-icon"
                            src={forwardIconSrc}
                            alt="10 seconds forward" />
                </button>
            </div>
        );
    }

}

export default ForwardBackwardComponent;