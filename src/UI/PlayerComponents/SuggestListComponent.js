import './SuggestListComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class SuggestListComponent extends Component {
    constructor() {
        super();

        this.state = {
            suggestedList: [],
            isEnded: null
        };

        this.loadObserver = e => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({
                        isEnded: playerService.getCurrentVideoStates('isEnded')
                    });
                    break;

                default:
                    break;
            }
        };

        this.actionObserver = e => {
            switch (e.action) {
                case 'END':
                    if (e.video) {
                        this.setState({
                            suggestedList: playerService.suggestListById(2)
                        });
                    }

                    this.setState({
                        isEnded: true
                    })
                    break;

                case 'PLAY':
                    this.setState({
                        isEnded: false
                    })
                    break;

                default:
                    break;
            }
        };

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.listLoadSubject.subscribe(this.loadObserver);
        playerService.actionSubject.subscribe(this.actionObserver);
    }

    componentWillUnmount() {
        playerService.listLoadSubject.unsubscribe(this.loadObserver);
        playerService.actionSubject.unsubscribe(this.actionObserver);
    }

    onSelectVideo(id) {
        playerService.selectVideo(id);
    }

    render() {
        return (
            <div
                className="suggestlist-section"
                style={{
                    display: this.state.isEnded
                        ? 'block'
                        : 'none'
                }}>
                <div className="suggestlist">
                    <div className="suggestlist-title">
                        <h1 >
                            Suggestions
                        </h1>
                    </div>
                    <div className="suggestlist-videos">
                        {this.state.suggestedList.map((video, index) => {
                            return (
                                <div 
                                key={index}
                                className="suggestlist-video-item">
                                    <VideoItemComponent
                                        video={video} />
                                    <h2 className="suggestlist-video-title">
                                        {video.title}
                                    </h2>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default SuggestListComponent;