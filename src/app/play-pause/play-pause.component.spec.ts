import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPauseComponent } from './play-pause.component';

describe('PlayPauseComponent', () => {
  let component: PlayPauseComponent;
  let fixture: ComponentFixture<PlayPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayPauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
