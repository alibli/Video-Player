import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { VideoInfo } from './models/video.model';
import { PlayerService } from './player.service';

@Directive({
    selector: '[player-container]'
})
export class PlayerContainerComponent implements OnInit {


    @Input()
    source: VideoInfo[] = [];

    constructor(private playerService: PlayerService) {

    }

    ngOnInit(): void {
        setTimeout(() => {
            this.playerService.setDataSource(this.source);
            console.log(this.source);
            this.playerService.start();
        }, 0);
            
        // this.playerService.setDataSource(this.source);
        // console.log(this.source);
        // this.playerService.start();

    }





}