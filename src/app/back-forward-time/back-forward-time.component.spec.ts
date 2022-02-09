import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackForwardTimeComponent } from './back-forward-time.component';

describe('BackForwardTimeComponent', () => {
  let component: BackForwardTimeComponent;
  let fixture: ComponentFixture<BackForwardTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackForwardTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackForwardTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
