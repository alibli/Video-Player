import { Component, OnInit } from '@angular/core';
import { VideoActionType, VideoInfo } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  suggestedVideoList: VideoInfo[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.onVideoActionChanged().subscribe(data => {   //it doesn't work :((
      if(data.action == VideoActionType.End){
        this.suggestedVideoList = this.playerService.createSuggestedVideoList();
        console.log('hello from End suggested!');   
      }   
      if(data.action == VideoActionType.Select){    // to destroy suggested videos when we change current video
        this.suggestedVideoList = [];
        console.log('GoodBye from Select suggested!');
      }

    });

  }

  change(vid: VideoInfo){
    this.playerService.changeCurrentVideo(vid);
  }

}
