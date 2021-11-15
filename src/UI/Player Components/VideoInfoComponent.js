import './VideoInfoComponent.css';
import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class VideoInfoComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        };

        this.observer = e => {
            if (e.action === 'PLAY' || e.action === 'PAUSE') {
                this.setState({
                    title: e.video.title,
                    description: e.video.description
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
            <div className="info">
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