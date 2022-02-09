import { Component, OnInit } from '@angular/core';
import { VideoActionEventArg, VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-play-pause',
  templateUrl: './play-pause.component.html',
  styleUrls: ['./play-pause.component.css']
})
export class PlayPauseComponent implements OnInit {


  play?: boolean;


  constructor(private playerService: PlayerService) { }


  ngOnInit(): void {
    this.playerService.onVideoActionChanged().subscribe(this.videoActionChanged);
  }

  videoActionChanged = (data: VideoActionEventArg) => {
    switch (data.action) {
      case VideoActionType.Play:
        this.play = true;
        break;

      case VideoActionType.Pause:
      case VideoActionType.Select:
        this.play = false;
        break;
    }
  }


  togglePlay() {
    this.playerService.playPause();
  }

}
