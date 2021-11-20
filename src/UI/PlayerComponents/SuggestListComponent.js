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
        }

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
        }

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
                        <h2 >
                            Suggestions
                        </h2>
                    </div>
                    <div>
                        {this.state.suggestedList.map((video, index) => {
                            return (
                                <VideoItemComponent
                                    key={index}
                                    video={video} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default SuggestListComponent;