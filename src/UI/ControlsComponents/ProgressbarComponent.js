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

        this.dragButtonMoving = false;

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

        document.addEventListener('mousemove', (e) => {
            if (this.dragButtonMoving) {
                this.progressbarHandler(e);
            }
        })

        document.addEventListener('mouseup', (e) => {
                this.dragButtonMoving = false;
        })

        return (
            <div
                ref={this.progressbarRef}
                className="progressbar-section"
                style={{
                    width: '100%',
                    height: '20px'
                }}
                onMouseDown={(e) => {
                    this.dragButtonMoving = true;
                    this.progressbarHandler(e);
                }}>
                <div
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                        height: '3px',
                        width: currentProgress + '%'
                    }}>
                </div>
                <div id="drag-button">
                </div>
            </div>
        );
    }
}

export default ProgressbarComponent;