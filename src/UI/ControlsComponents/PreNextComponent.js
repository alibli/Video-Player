import './PreNextComponent.css';
import { Component } from 'react';
import PreviousSrc from '../../assets/icons/Previous.png';
import NextSrc from '../../assets/icons/Next.png';
import { playerService } from '../../Service/PlayerService';

class PreviousComponent extends Component {
    constructor() {
        super();

        this.state = {
            isFirstVideo: null,
            isLastVideo: null
        }

        this.actionObserver = e => {
            switch (e.action) {
                case 'PLAY':
                    this.setState({
                        isFirstVideo: playerService.isfirstVideo(),
                        isLastVideo: playerService.isLastVideo()
                    });
                    break;

                default:
                    break;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.actionObserver);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.actionObserver);
    }

    onClickPreviousVideo() {
        playerService.previousVideo();
    }

    onClickNextVideo() {
        playerService.nextVideo();
    }

    render() {
        return (
            <div className="pre-next-section">
                <button
                    className="pre-next-button"
                    onClick={this.onClickPreviousVideo}>
                    {
                        !this.state.isFirstVideo &&
                        <img
                            className="pre-next-icon"
                            src={PreviousSrc}
                            alt="previous video" />
                    }
                </button>
                <button
                    className="pre-next-button"
                    onClick={this.onClickNextVideo} >
                    {
                        !this.state.isLastVideo &&
                        <img
                            className="pre-next-icon"
                            src={NextSrc}
                            alt="next video" />
                    }
                </button>
            </div>
        );
    }

}

export default PreviousComponent;