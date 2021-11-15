import './VideoContainerComponent.css'
import { Component } from 'react';

class VideoContainerComponent extends Component {
    render() {
        return (
            <div className="videoplayer-container">
                {this.props.children}
            </div>
        );
    }

}

export default VideoContainerComponent;