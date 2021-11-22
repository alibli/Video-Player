import './VolumeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import SliderComponent from './SliderComponent';

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

    onMoveSlider(e) {
        playerService.setVolume(e.target.value);
    }

    render() {
        const { volume } = this.state;
        return (
            <div className="volume-slider">
                <SliderComponent
                    current={volume}
                    onMoveSlider={this.onMoveSlider} />
            </div>

        );
    }
}

export default VolumeComponent;