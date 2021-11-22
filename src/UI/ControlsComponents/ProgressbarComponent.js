import { Component } from 'react';
import SliderComponent from './SliderComponent';
import { playerService } from '../../Service/PlayerService';

class ProgressbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentProgress: 0,
        }

        this.timeObserver = e => {
            this.setState({ currentProgress: e.time.progress })
        }

        
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.timerSubject.subscribe(this.timeObserver);
    }

    componentWillUnmount() {
        playerService.timerSubject.unsubscribe(this.timeObserver);
    }

    onMoveSlider(rate) {
        playerService.setCurrentTime(rate);
    }

    render() {
        const { currentProgress } = this.state;

        return (
            <div
                ref={this.progressbarRef}
                className="progressbar-section">
                <SliderComponent
                current={currentProgress}
                onMoveSlider={this.onMoveSlider} />
            </div>
        );
    }
}

export default ProgressbarComponent;