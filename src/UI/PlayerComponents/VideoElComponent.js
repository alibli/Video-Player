import { Component, createRef } from 'react';
import { playerService } from '../../Service/PlayerService';

class VideoElComponent extends Component {
    constructor() {
        super();
        
        this.videoRef = createRef();
    }

    componentDidMount() {
        playerService.registerVideoEl(this.videoRef.current);
    }

    render() {
        return (
            <video
                autoPlay
                muted
                ref={this.videoRef} >
            </video>
        );
    }
}

export default VideoElComponent;