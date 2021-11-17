import './VideoInfoComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

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
        playerService.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.observer);
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