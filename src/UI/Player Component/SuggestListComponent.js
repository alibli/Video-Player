import './SuggestListComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';
import VideoItemComponent from './VideoItemComponent';

class SuggestListComponent extends Component {
    constructor() {
        super();

        this.state = {
            suggestedList: [],
        }

        this.observer = e => {
            switch (e.action) {
                case 'END':
                    const current = player.getCurrentVideo();
                    if (current) {
                        this.setState({
                            suggestedList: player.suggestListById(current.id)
                        });
                    }
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
            <div className="suggestlist-section">
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