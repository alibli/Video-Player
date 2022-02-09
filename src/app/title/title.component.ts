import { Component, OnInit } from '@angular/core';
import { VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  title: string = '';

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.onVideoSourceLoadChanged().subscribe(data => {
      if(data.load == true){
        this.title  = this.playerService.getCurrentVideoObj().title!;
      }
    })

    this.playerService.onVideoActionChanged().subscribe(data => {
      if(data.action == VideoActionType.Select){
        this.title = data.video.title!;
      }
    });
  }
   

}
