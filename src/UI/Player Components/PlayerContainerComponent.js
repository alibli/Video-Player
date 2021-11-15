import './PlayerContainerComponent.css'
import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class PlayerContainerComponent extends Component {

    componentDidMount() {
        player.setVideoList(this.props.videoList);
        player.start();
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