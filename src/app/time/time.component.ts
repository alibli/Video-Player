import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  currentTime : number = 0;
  duration: number = 0;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    
    this.playerService.onVideoSourceLoadChanged().subscribe(data => {
      // if(data.load == true){
      //   let vid = this.playerService.getCurrentVideoObj();
      //   this.duration = vid.duration!; 
      // }
    });

    this.playerService.onVideoTimeChanged().subscribe(data => {
      this.currentTime = Math.round(data.time.current); 
      if (data.time.duration) {
        this.duration = Math.round(data.time.duration);
      }
    });

    
  }

}
