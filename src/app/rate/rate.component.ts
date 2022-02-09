import { Component, OnInit } from '@angular/core';
import { VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  rate?: number = 1;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.onVideoActionChanged().subscribe(data => {
      // this.volume = data.time.volume;
      if(data.action == VideoActionType.RateChange){
        this.rate = this.playerService.getRate();
      }
      if(data.action == VideoActionType.Select){
        this.rate = 1;
      }      
    });

  }

  onChanged(e: any){
    this.playerService.setRate(e.target.value);
  }

}
