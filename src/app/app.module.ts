import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { PlayPauseComponent } from './play-pause/play-pause.component';
import { MuteUnmuteComponent } from './mute-unmute/mute-unmute.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { VolumeComponent } from './volume/volume.component';
import { PrevNextComponent } from './prev-next/prev-next.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { RateComponent } from './rate/rate.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { PlayerContainerComponent } from './player-container.directive';
import { VideoElementComponent } from './video-element/video-element.component';
import { TitleComponent } from './title/title.component';
import { TimeComponent } from './time/time.component';
import { BackForwardTimeComponent } from './back-forward-time/back-forward-time.component';
import { SliderComponent } from './slider/slider';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    PlayPauseComponent,
    MuteUnmuteComponent,
    ProgressBarComponent,
    VolumeComponent,
    PrevNextComponent,
    VideosListComponent,
    AllVideosComponent,
    RateComponent,
    CardComponent,
    PlayerContainerComponent,
    VideoElementComponent,
    TitleComponent,
    TimeComponent,
    BackForwardTimeComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
