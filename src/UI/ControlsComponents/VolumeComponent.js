import './VolumeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class VolumeComponent extends Component {
    constructor() {
        super();

        this.state = {}

        this.loadObserver = (e) => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({ volume: playerService.getVolumeStates('volume') });
                    break;

                default:
                    break;
            }
        };

        this.actionObserver = (e) => {
            switch (e.action) {
                case 'VOLUME_CHANGE':
                    this.setState({ volume: e.video.volume });
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

    selectVolume(e) {
        playerService.setVolume(e.target.value);
    }

    render() {
        const { volume } = this.state;
        return (
            <select
                className="volume-select"
                value={volume}
                onChange={this.selectVolume}>
                <option value="0">
                    0
                </option>
                <option value="0.2">
                    20
                </option>
                <option value="0.4">
                    40
                </option>
                <option value="0.6">
                    60
                </option>
                <option value="0.8">
                    80
                </option>
                <option value="1">
                    100
                </option>
            </select>
        );
    }
}

export default VolumeComponent;