import './PlayerContainerComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class PlayerContainerComponent extends Component {

    componentDidMount() {
        if (this.props.videoList.length !== 0) {
            playerService.setVideoList(this.props.videoList);
            playerService.start();
        }
    }

    componentDidUpdate() {
        if (this.props.videoList.length !== 0) {
            playerService.setVideoList(this.props.videoList);
            playerService.start();
        }
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