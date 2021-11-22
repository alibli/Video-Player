import './ProgressbarComponent.css';
import { Component, createRef } from 'react';
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

        // this.dragButtonMoving = false;

        this.progressbarRef = createRef();
        
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.timerSubject.subscribe(this.timeObserver);
    }

    componentWillUnmount() {
        playerService.timerSubject.unsubscribe(this.observer);
    }

    progressbarHandler = (e) => {
        const progressbar = this.progressbarRef.current;
        let progressbarSize = progressbar.getBoundingClientRect();
        this.difRate = (e.clientX - progressbarSize.left) / progressbarSize.width
        playerService.setCurrentTime(this.difRate)
    }

    render() {
        const { currentProgress } = this.state;

        // document.addEventListener('mousemove', (e) => {
        //     if (this.dragButtonMoving) {
        //         let dif = e.clientX - this.dragButtonStart;
        //         let progressbarSize = this.progressbarRef.current.getBoundingClientRect();
        //         this.difRate = dif / progressbarSize.width

        //         this.dragButtonRef.current.style.left = dif + 'px'
        //     }
        // })

        // document.addEventListener('mouseup', (e) => {
        //         this.dragButtonMoving = false;
        //         player.setCurrentTime(this.difRate)
        // })

        return (
            <div
                ref={this.progressbarRef}
                className="progressbar-section"
                style={{
                    width: '100%',
                    height: '20px'
                }}
                onMouseDown={this.progressbarHandler}>
                <div
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                        height: '3px',
                        width: currentProgress + '%'
                    }}>
                </div>
                {/* <div
                    id="drag-button"
                >
                </div> */}
            </div>
        );
    }
}

export default ProgressbarComponent;