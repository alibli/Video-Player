import './VideoListComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class VideoListComponent extends Component {
    constructor() {
        super();
        this.state = {
            filteredVideoList: []
        }

        this.observer = e => {
            if (e.action === 'END') {
                this.setState({
                    filteredVidList: player.getFilteredVideoList()
                });
            }

            return;
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
            <div className="selection-list">
                {this.state.filteredVideoList.map((video, index) => {
                    return (
                        <button
                            className="item-button"
                            key={index}
                            onClick={this.onSelectVideo(video.id)}>
                            <h3>
                                {video.title}
                            </h3>
                            <img
                                className="item-img"
                                src={video.thumbnail}
                                alt={video.title} />
                        </button>
                    );
                })}
            </div>
        );
    }
}

export default VideoListComponent;