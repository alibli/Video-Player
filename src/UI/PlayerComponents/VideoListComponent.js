import './VideoListComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class VideoListComponent extends Component {
    constructor() {
        super();
        this.state = {
            videoList: [],
            videosStates: {},
            currentVideo: null
        }

        this.loadObserver = e => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({
                        videoList: playerService.getVideoList(),
                        videosStates: playerService.getVideosStates(),
                        currentVideo: playerService.getCurrentVideo()
                    });
                    break;

                default:
                    break;
            }
        }

        this.actionObserver = e => {
            switch (e.action) {
                case 'PLAY':
                case 'PAUSE':
                    this.setState({
                        videosStates: playerService.getVideosStates(),
                        currentVideo: e.video
                    });
                    break;

                default:
                    break;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.loadSubject.subscribe(this.loadObserver);
        playerService.actionSubject.subscribe(this.actionObserver);
    }

    componentWillUnmount() {
        playerService.loadSubject.unsubscribe(this.loadObserver);
        playerService.actionSubject.unsubscribe(this.actionObserver);
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