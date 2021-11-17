import './VideoItemComponent.css';
import { Component } from 'react';
import { playerService } from '../../Service/PlayerService';
import PlayIcon from '../../assets/icons/Play.png';
import PauseIcon from '../../assets/icons/Pause.png';

class VideoItemComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: playerService.getIsPlayingStateById(this.props.video.id)
        }


        this.observer = e => {
            if (e.action === 'PLAY' ||
                e.action === 'PAUSE') {
                if (e.video.id !== this.props.video.id && !this.state.playing) {
                    return;
                }
                this.setState({
                    playing: playerService.getIsPlayingStateById(this.props.video.id),
                });
            } else {
                return;
            }
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.observer);
    }

    onSelectVideo(id) {
        playerService.loadVideo(id);
    }

    render() {
        const { video, isActive } = this.props;

        return (

            <button
                style={{
                    border: isActive
                        ? 'solid 2px'
                        : 'none'
                }}
                className="videoitem-button"
                onClick={() => { this.onSelectVideo(video.id) }}>
                <h4 className="vidoelist-title">
                    {video.title}
                </h4>
                <div className="videoitem-main">
                    <img
                        className="videoitem-img"
                        src={video.thumbnail}
                        alt={video.title} />
                    <img
                        className="videoitem-playpause"
                        src={
                            this.state.playing
                                ? PauseIcon
                                : PlayIcon}
                        alt="play pause" />
                </div>
            </button>

        );
    }

}

export default VideoItemComponent;