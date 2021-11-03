import './Controls.css';
import PlayPause from './controls components/PlayPause';
import MuteUnmute from './controls components/MuteUnmute';

function Controls() {
    return (
        <div className="controls">
            <PlayPause />
            <MuteUnmute />
        </div>
    );
}


export default Controls;