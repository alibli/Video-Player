import './VideoInfoComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class VideoInfoComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: player.getCurrentVideo().title,
            description: player.getCurrentVideo().description
        };

        this.observer = e => {
            if (e.action === 'NEXT' || e.action === 'PREVIOUS' || e.action === 'VIDEO_SELECTED') {
                this.setState({
                    title: e.video.title,
                    description: e.video.description
                });
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
            <div className="video-info">
                <h3>
                    {this.state.title}
                </h3>
                <p>
                    {this.state.description}
                </p>
            </div>

        );
    }
}

export default VideoInfoComponent;