import './VideoListComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class VideoListComponent extends Component {
    constructor() {
        super();
        this.state = {
            videoList: player.getVideoList(),
            videosStates: player.getVideosStates(),
            currentVideo: player.getCurrentVideo()
        }

        this.observer = e => {
            if (e.action === 'PLAY' ||
                e.action === 'PAUSE') {
                this.setState({
                    videosStates: player.getVideosStates(),
                    currentVideo: e.video
                });
            } else {
                return;
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