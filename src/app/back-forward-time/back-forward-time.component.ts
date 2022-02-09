import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-back-forward-time',
  templateUrl: './back-forward-time.component.html',
  styleUrls: ['./back-forward-time.component.css']
})
export class BackForwardTimeComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  goForward(){
    this.playerService.goForward();
  }
  comeBack(){
    this.playerService.comeBack();
  }

}
