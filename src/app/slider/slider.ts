import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class SliderComponent implements OnInit {

  @Input() progressBar!: ProgressBarComponent;
  @Input() progressPercent: number = 0;

  @Output()
  onChange = new EventEmitter<number>();

  // progressPercent: number = 0;
  mouseWidth: number;
  width: number;
  moving: boolean = false;

  constructor( private playerService: PlayerService) { 
    this.mouseWidth = 0;
    this.width = 0;
  }

  ngOnInit(): void {
    this.progressPercent = this.progressBar.progressPercent; 
  }
  
  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    if(this.moving){
      this.moving = false;
    }

  }

  onMouseDown(e: any){
    this.calculateMouseX(e);
    this.onChange.next(this.progressPercent);
    this.moving = true;   
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: any){
    if(this.moving){
      this.calculateMouseX(e);
      this.onChange.next(this.progressPercent);
    }
  }

  calculateMouseX(e: any){
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX;
    this.width = rect.width;
    let left = rect.left;
    this.mouseWidth = Math.floor(mouseX - left);   
    this.progressPercent = this.mouseWidth / this.width * 100;
  }


}
