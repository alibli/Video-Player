import './NextComponent.css';
import NextSrc from '../../assets/icons/Next.png';
import { player } from '../../Service/PlayerService';

function NextComponent() {
    function onClickNextVideo() {
        player.nextVideo();
    }

    return (
        <button
            id="next-video"
            onClick={onClickNextVideo}>
            <img
                className="next-video"
                src={NextSrc}
                alt="next video" />
        </button>
    );
}

export default NextComponent;