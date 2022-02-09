import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoActionType } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  constructor(private playerService: PlayerService) { 
    // this.mySelect = {} as ElementRef;
  }

  volume? :number = 1;

  // @ViewChild('select') mySelect : HTMLSelectElement; 

  ngOnInit(): void {

    this.playerService.onVideoActionChanged().subscribe(data => {
      // this.volume = data.time.volume;
      if(data.action == VideoActionType.VolumeChange){
        this.volume = this.playerService.getVolume();
      }
      // if(data.action == VideoActionType.Select){
      //   this.playerService.setVolume(1);     
      //   // this.mySelect.value = 1;
      // }
    });

  }

  onChanged(e: any){
    this.playerService.setVolume(e.target.value);
  }

}
