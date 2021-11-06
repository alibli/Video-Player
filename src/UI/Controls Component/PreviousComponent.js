import './PreviousComponent.css';
import PreviousSrc from '../../assets/icons/Previous.png';
import { player } from '../../Service/PlayerService';

function PreviousComponent() {
    function onClickPreviousVideo() {
        player.previousVideo();
    }

    return (
        <button
            id="previous-video"
            onClick={onClickPreviousVideo}>
            <img
                className="previous-video"
                src={PreviousSrc}
                alt="previous video" />
        </button>

    );
}

export default PreviousComponent;