import { Component } from 'react';
import SliderComponent from './SliderComponent';
import { playerService } from '../../Service/PlayerService';

class ProgressbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            timeProgress: 0,
        }

        this.timeObserver = e => {
            this.setState({ timeProgress: e.time.progress })
        }


        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.timerSubject.subscribe(this.timeObserver);
    }

    componentWillUnmount() {
        playerService.timerSubject.unsubscribe(this.timeObserver);
    }

    onMoveSlider(timePercent) {
        playerService.setCurrentTime(timePercent);
    }

    render() {
        const { timeProgress } = this.state;

        return (
            <div
                ref={this.progressbarRef}
                className="progressbar-section">
                <SliderComponent
                    currentProgress={timeProgress}
                    onMoveSlider={this.onMoveSlider} />
            </div>
        );
    }
}

export default ProgressbarComponent;