import './ProgressbarComponent.css';
import { Component, createRef } from 'react';
import { player } from '../../Service/PlayerService';

class ProgressbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentProgress: 0,

        }

        this.observer = e => {
            this.setState({ currentProgress: e.time.progress })
        }

        this.dragButtonMoving = false;

        this.dragButtonStart = null;

        this.difRate = null;

        this.dragButtonRef = createRef();

        this.progressbarRef = createRef();

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

        document.addEventListener('mousemove', (e) => {
            if (this.dragButtonMoving) {
                let dif = e.clientX - this.dragButtonStart;
                let progressbarSize = this.progressbarRef.current.getBoundingClientRect();
                this.difRate = dif / progressbarSize.width

                this.dragButtonRef.current.style.left = dif + 'px'
            }
        })

        document.addEventListener('mouseup', (e) => {
                this.dragButtonMoving = false;
                player.setCurrentTime(this.difRate)
        })


        return (
            <div
                ref={this.progressbarRef}
                className="progressbar-section"
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
                <div
                    id="drag-button"
                    ref={this.dragButtonRef}
                    onMouseDown={(e) => {
                        this.dragButtonMoving = true;
                        this.dragButtonStart = e.clientX;
                    }}
                >
                </div>
            </div>
        );
    }
}

export default ProgressbarComponent;