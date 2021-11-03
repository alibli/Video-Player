import { Component } from 'react';
import { player } from '../../Service/PlayerService';


class ProgressbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentProgress: 0
        }

        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        player.timerSubject.subscribe(e => {
            this.setState({ currentProgress: e.time.progress })
        })
    }

    render() {
        const { currentProgress } = this.state

        return (
            <>
                <div
                    style={{
                        'width': '100%'
                    }}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            display: 'inline-block',
                            height: '5px',
                            width: currentProgress + '%'
                        }}>
                    </div>
                </div>
            </>
        );
    }
}

export default ProgressbarComponent;