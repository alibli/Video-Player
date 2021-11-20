import './TimeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class TimeComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentTime: 0
        }

        this.timeObserver = e => {
            this.setState({ currentTime: Math.trunc(e.time.current) });
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
        const { currentTime } = this.state;

        return (
            <div className="current-time">
                <p>
                    {currentTime}
                </p>
            </div>
        );
    }
}

export default TimeComponent;