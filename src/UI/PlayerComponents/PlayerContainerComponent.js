import './PlayerContainerComponent.css'
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class PlayerContainerComponent extends Component {
    constructor() {
        super();

        this.loadObserver = (e) => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    playerService.start();
                    break;

                default:
                    break;
            }
        }
    }

    componentDidMount() {
        playerService.listLoadSubject.subscribe(this.loadObserver);
        playerService.setVideoList(this.props.videoList);
    }

    componentDidUpdate() {
        playerService.setVideoList(this.props.videoList);
    }

    componentWillUnmount() {
        playerService.listLoadSubject.unsubscribe(this.loadObserver);
    }

    render() {
        return (
            <div className="videoplayer-container">
                {this.props.children}
            </div>
        );
    }

}

export default PlayerContainerComponent;