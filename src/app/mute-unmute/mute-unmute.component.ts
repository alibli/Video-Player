import { Component, OnInit } from '@angular/core';
import { VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-mute-unmute',
  templateUrl: './mute-unmute.component.html',
  styleUrls: ['./mute-unmute.component.css']
})
export class MuteUnmuteComponent implements OnInit {

  mute? : boolean;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.onVideoActionChanged().subscribe(data => {
      if(data.action == VideoActionType.Mute){
        this.mute = true;
      }
      else if(data.action == VideoActionType.Unmute)
        this.mute = false;
        
      if(data.action == VideoActionType.Select){
          this.mute = false;
        }

    });
    
  }

  toggleMute(): void{
    this.playerService.muteUnmute();
  }

}
