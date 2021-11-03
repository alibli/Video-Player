import { Component } from 'react';
import { player } from '../../Service/PlayerService';


class TimeComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentTime: 0
        }

        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        player.timerSubject.subscribe(e=>{
            this.setState({currentTime: e.time.current})
        })
    }

    render() {
        const { currentTime } = this.state

        return (
            <>
                <p>{currentTime}</p>
            </>
        );
    }
}

export default TimeComponent;