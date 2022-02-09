import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-video-element',
  templateUrl: './video-element.component.html',
  styleUrls: ['./video-element.component.css']
})
export class VideoElementComponent implements OnInit {


  @ViewChild('sampleVid', { static: true }) video: ElementRef<HTMLMediaElement>;
  @ViewChild('compress', { static: true }) compressBtn: ElementRef<HTMLElement>;

  elem: any;
  isFullscreen: boolean = false;

  constructor(private playerService: PlayerService  , private renderer: Renderer2) { 
    this.video = { } as ElementRef;
    this.compressBtn = {} as ElementRef;
  }

  ngOnInit(): void {
      this.playerService.setVideo(this.video.nativeElement);
      this.elem = document.documentElement;
  }

  openFullscreen() {
    // if (this.elem.requestFullscreen) {
    //   this.elem.requestFullscreen();
    // } else if (this.elem.mozRequestFullScreen) {
    //   /* Firefox */
    //   this.elem.mozRequestFullScreen();
    // } else if (this.elem.webkitRequestFullscreen) {
    //   /* Chrome, Safari and Opera */
    //   this.elem.webkitRequestFullscreen();
    // } else if (this.elem.msRequestFullscreen) {
    //   /* IE/Edge */
    //   this.elem.msRequestFullscreen();
    // }
    

  //   if(!this.isFullscreen){
  //     this.renderer.setStyle(this.video.nativeElement , 'position' , 'fixed');
  //     this.renderer.setStyle(this.video.nativeElement , 'min-width' , '100%');
  //     this.renderer.setStyle(this.video.nativeElement , 'min-height' , '100%');
      
  //     this.renderer.setStyle(this.video.nativeElement , 'bottom' , '0');
  //     this.renderer.setStyle(this.video.nativeElement , 'right' , '0');
      
  //     this.renderer.setStyle(this.video.nativeElement , 'z-index' , '-1');
      
  //     this.renderer.setStyle(this.compressBtn.nativeElement , 'position' , 'fixed');
      

  //     this.renderer.setStyle(this.compressBtn.nativeElement , 'bottom' , '0');
  //     this.renderer.setStyle(this.compressBtn.nativeElement , 'right' , '0');
  // //     bottom: 0;
  // // right: 0;      
  //   }

    this.playerService.fullScreen();

    this.isFullscreen = true;
  }

  closeFullscreen(){
    if(this.isFullscreen){
      this.renderer.removeStyle(this.video.nativeElement , 'position' );
      this.renderer.removeStyle(this.video.nativeElement , 'min-width');
      this.renderer.removeStyle(this.video.nativeElement , 'min-height');
      this.renderer.removeStyle(this.video.nativeElement , 'bottom');
      this.renderer.removeStyle(this.video.nativeElement , 'right');

      this.renderer.removeStyle(this.video.nativeElement , 'z-index');

      // this.renderer.removeStyle(this.compressBtn.nativeElement , 'top');
      
    }
    this.isFullscreen = false;
  }

}
