import { Component } from 'react';

class VideoContainerComponent extends Component {
    render() {
        return (
            <div className="video-container">
                {this.props.children}
            </div>
        );
    }

}

export default VideoContainerComponent;