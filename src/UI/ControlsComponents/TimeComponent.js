import './TimeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class TimeComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentTime: 0,
            duration: null
        }

        this.timeObserver = e => {
            this.setState({ 
                currentTime: Math.trunc(e.time.current),
                duration: Math.trunc(e.time.duration) });
        }

        this.setState = this.setState.bind(this);
    }


    componentDidMount() {
        playerService.timerSubject.subscribe(this.timeObserver);
    }

    componentWillUnmount() {
        playerService.timerSubject.unsubscribe(this.timeObserver);
    }

    render() {
        const { currentTime, duration } = this.state;

        return (
            <div className="current-time">
                <p>
                    {currentTime} / {duration}
                </p>
            </div>
        );
    }
}

export default TimeComponent;