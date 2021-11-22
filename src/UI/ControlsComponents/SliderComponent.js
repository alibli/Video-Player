import './SliderComponent.css';
import { Component, createRef } from 'react';
import { playerService } from '../../Service/PlayerService';

class SliderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProgress: 0,
        }

        this.dragButtonMoving = false;

        this.sliderRef = createRef();
        
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            if (this.dragButtonMoving) {
                this.sliderHandler(e);
            }
        })

        document.addEventListener('mouseup', (e) => {
                this.dragButtonMoving = false;
        })
    }

    sliderHandler = (e) => {
        const slider = this.sliderRef.current;
        let sliderSize = slider.getBoundingClientRect();
        this.difRate = (e.clientX - sliderSize.left) / sliderSize.width;
        this.props.onMoveSlider(this.difRate);
    }

    render() {
        const { current } = this.props;

        return (
            <div
                ref={this.sliderRef}
                className="slider-section"
                style={{
                    width: '100%'
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    this.dragButtonMoving = true;
                    this.sliderHandler(e);
                }}>
                <div
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                        height: '3px',
                        width: current + '%'
                    }}>
                </div>
                <div id="drag-button">
                </div>
            </div>
        );
    }
}

export default SliderComponent;