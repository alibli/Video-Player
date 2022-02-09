import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.css']
})
export class PrevNextComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    
  }

  goNext(){
    this.playerService.playNext();
  }
  goPrev(){
    this.playerService.playPrev();
  }

}
