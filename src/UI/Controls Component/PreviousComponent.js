import './PreviousComponent.css';
import { Component } from 'react';
import PreviousSrc from '../../assets/icons/Previous.png';
import { player } from '../../Service/PlayerService';

class PreviousComponent extends Component {
    constructor() {
        super();

        this.state = {
            isFirstVideo: null,
        }

        this.observer = e => {
            switch(e.action) {
                case 'PLAY':
                    this.setState({
                        isFirstVideo: player.isfirstVideo()
                    });
                    break;
                
                default:
                    break;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        player.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        player.actionSubject.unsubscribe(this.observer);
    }

    onClickPreviousVideo() {
        player.previousVideo();
    }

    render() {
        if (!this.state.isFirstVideo) {
            return (
                <button
                    id="previous-video"
                    onClick={this.onClickPreviousVideo}>
                    <img
                        className="previous-video"
                        src={PreviousSrc}
                        alt="previous video" />
                </button>
            );
        } else if (this.state.isFirstVideo) {
            return (
                <button id="previous-video">
                </button>
            );
        }
    }
    
}

export default PreviousComponent;