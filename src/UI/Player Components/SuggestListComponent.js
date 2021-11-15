import './SuggestListComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class SuggestListComponent extends Component {
    constructor() {
        super();

        this.state = {
            suggestedList: [],
            isEnded: player.getCurrentVideoStates('isEnded')
        }

        this.observer = e => {
            switch (e.action) {
                case 'END':
                    if (e.video) {
                        this.setState({
                            suggestedList: player.suggestListById(e.video.id)
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
        player.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        player.actionSubject.unsubscribe(this.observer);
    }

    onSelectVideo(id) {
        player.selectVideo(id);
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