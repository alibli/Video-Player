import './NextComponent.css';
import { Component } from 'react';
import NextSrc from '../../assets/icons/Next.png';
import { player } from '../../Service/PlayerService';

class NextComponent extends Component {
    constructor() {
        super();
        this.state = {
            isLastVideo: null
        }

        this.observer = e => {
            switch (e.action) {
                case 'PLAY':
                    this.setState({
                        isLastVideo: player.isLastVideo()
                    });
                    break;

                default:
                    break
            }
        }

        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        player.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        player.actionSubject.unsubscribe(this.observer);
    }

    onClickNextVideo() {
        player.nextVideo();
    }

    render() {
        if (!this.state.isLastVideo) {
            return (
                <button
                    id="next-video"
                    onClick={this.onClickNextVideo} >
                    <img
                        className="next-video"
                        src={NextSrc}
                        alt="next video" />
                </button>
            );
        } else if(this.state.isLastVideo){
            return (
                <button id="next-video">
                </button>
            );
        }
    }
}

export default NextComponent;