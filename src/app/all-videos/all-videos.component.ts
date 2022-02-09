import { Component, OnInit } from '@angular/core';
import { VideoActionType, VideoInfo } from '../models/video.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent implements OnInit {

  allVideos: VideoInfo[] = [];
  currentVideoId?: number = 0;
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.onVideoSourceLoadChanged().subscribe(data =>{
      if(data.load == true){
        this.allVideos = this.playerService.getAllVideos()!;
      }
    });
    
    this.playerService.onVideoActionChanged().subscribe(data => {
      if(data.action == VideoActionType.Select){
        this.allVideos = this.playerService.getAllVideos()!;
        this.currentVideoId = data.video.id;
      }
    });

  }

  change(vid: VideoInfo){
    this.playerService.changeCurrentVideo(vid);
  }

}
