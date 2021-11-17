import './VideoListComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class VideoListComponent extends Component {
    constructor() {
        super();
        this.state = {
            videoList: [],
            videosStates: playerService.getVideosStates(),
            currentVideo: null
        }

        this.observer = e => {
            if (e.action === 'SET_VIDEOLIST') {
                this.setState({
                    videoList: playerService.getVideoList(),
                    currentVideo: playerService.getCurrentVideo()
                })
            }
            if (e.action === 'PLAY' ||
                e.action === 'PAUSE') {
                this.setState({
                    videosStates: playerService.getVideosStates(),
                    currentVideo: e.video
                });
            } else {
                return;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.observer);
    }

    render() {
        return (
            <div className="videolist">
                <div className="videolist-title">
                    <h2>
                        Play List
                    </h2>
                </div>
                <div className="videolist-items">
                    {this.state.videoList.map((video, index) => {
                        return (
                            <VideoItemComponent
                                key={index}
                                video={video}
                                isActive={video.id === this.state.currentVideo.id} />
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default VideoListComponent;