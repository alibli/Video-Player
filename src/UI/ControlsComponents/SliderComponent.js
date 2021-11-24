import './SliderComponent.css';
import { Component, createRef } from 'react';

class SliderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: 0
        }

        this.dragButtonMoving = false;

        this.sliderRef = createRef();

        this.dragButtonRef = createRef();

        this.setState = this.setState.bind(this);
    }

    mouseMoveHandler = (e) => {
        if (this.dragButtonMoving) {
            this.sliderHandler(e);
        }
    }

    mouseUpHandler = (e) => {
        this.dragButtonMoving = false;
        this.props.onMoveSlider(this.state.currentPosition);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mousemove', this.mouseUpHandler);
    }

    sliderHandler = (e) => {
        const dragButtonSize = this.dragButtonRef.current.getBoundingClientRect();
        const sliderSize = this.sliderRef.current.getBoundingClientRect();

        const mousePos = Math.min( Math.max(e.clientX, sliderSize.left) - sliderSize.left, sliderSize.width - dragButtonSize.width);

        this.setState({ currentPosition: (mousePos / (sliderSize.width - dragButtonSize.width)) * 100 });
    }

    render() {
        const pos = this.dragButtonMoving ? this.state.currentPosition : this.props.currentProgress;

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
                        width: pos + '%'
                    }}>
                </div>
                <div
                    ref={this.dragButtonRef}
                    id="drag-button">
                </div>
            </div>
        );
    }
}

export default SliderComponent;