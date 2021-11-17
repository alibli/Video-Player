import './TimeComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';

class TimeComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentTime: 0
        }

        this.observer = e => {
            this.setState({ currentTime: Math.trunc(e.time.current) });
        }

        this.setState = this.setState.bind(this);
    }


    componentDidMount() {
        playerService.timerSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        playerService.timerSubject.unsubscribe(this.observer);
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