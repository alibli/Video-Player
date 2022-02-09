import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']

})
export class ProgressBarComponent implements OnInit {

  progressPercent: number;
  

  constructor(private playerService: PlayerService) {
    this.progressPercent = 0;
    
    // this.progressXduration = 0;
  }

  ngOnInit(): void {
    this.playerService.onVideoTimeChanged().subscribe(data => {
      if(data.time.progress || 0){
        this.progressPercent = data.time.progress;
      }
    }); 

    this.playerService.onVideoActionChanged().subscribe(data => {
      if(data.action == VideoActionType.Select){
        this.progressPercent = 0;
      }

    });

  }

  onProgressChange(e: number){
    this.playerService.setNewCurrentTime(e);
  }


}
