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

        this.actionObserver = e => {
            switch(e.action) {
                case 'PLAY':
                case 'PAUSE':
                    this.setState({
                        title: e.video.title,
                        description: e.video.description
                    });
                    break;

                default:
                    break;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.actionObserver);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.actionObserver);
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