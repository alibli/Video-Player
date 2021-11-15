import './PreNextComponent.css';
import { Component } from 'react';
import PreviousSrc from '../../assets/icons/Previous.png';
import NextSrc from '../../assets/icons/Next.png';
import { player } from '../../Service/PlayerService';

class PreviousComponent extends Component {
    constructor() {
        super();

        this.state = {
            isFirstVideo: null,
            isLastVideo: null
        }

        this.observer = e => {
            switch (e.action) {
                case 'PLAY':
                    this.setState({
                        isFirstVideo: player.isfirstVideo(),
                        isLastVideo: player.isLastVideo()
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

    onClickNextVideo() {
        player.nextVideo();
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