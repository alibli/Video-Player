import { Component } from 'react';
import { player } from '../../Service/PlayerService';

class ProgressbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentProgress: 0
        }

        this.observer = e => {
            this.setState({ currentProgress: e.time.progress })
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        player.timerSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        player.timerSubject.unsubscribe(this.observer);
    }

    render() {
        const { currentProgress } = this.state;

        return (
                <div
                    style={{
                        width: '100%'
                    }}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            display: 'inline-block',
                            height: '3px',
                            width: currentProgress + '%'
                        }}>
                    </div>
                </div>
        );
    }
}

export default ProgressbarComponent;