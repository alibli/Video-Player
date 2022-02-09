import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteUnmuteComponent } from './mute-unmute.component';

describe('MuteUnmuteComponent', () => {
  let component: MuteUnmuteComponent;
  let fixture: ComponentFixture<MuteUnmuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuteUnmuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuteUnmuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
