import './VolumeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import SliderComponent from './SliderComponent';

class VolumeComponent extends Component {
    constructor() {
        super();

        this.state = {
            volumeProgress: 0
        };

        this.loadObserver = (e) => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    let newVolume = playerService.getVolumeStates('volume');
                    this.setState({ volumeProgress: newVolume * 100 });
                    break;

                default:
                    break;
            }
        };

        this.actionObserver = (e) => {
            switch (e.action) {
                case 'VOLUME_CHANGE':
                    let newVolume = playerService.getVolumeStates('volume');
                    this.setState({ volumeProgress: newVolume * 100 });
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

    onMoveSlider(value) {
        if (value >= 0 && value <= 1) {
            playerService.setVolume(value);
        } else {
            return;
        }
    }

    render() {
        const { volumeProgress } = this.state;
        return (
            <div className="volume-slider">
                <SliderComponent
                    currentProgress={volumeProgress}
                    onMoveSlider={this.onMoveSlider} />
            </div>

        );
    }
}

export default VolumeComponent;