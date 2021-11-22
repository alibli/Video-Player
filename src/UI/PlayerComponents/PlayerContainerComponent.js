import './PlayerContainerComponent.css'
import { Component } from 'react';
import { playerService  } from '../../Service/PlayerService';

class PlayerContainerComponent extends Component {

    componentDidMount() {
        playerService.setVideoList(this.props.videoList);
        playerService.start();
    }

    componentDidUpdate() {
        playerService.setVideoList(this.props.videoList);
        playerService.start();
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