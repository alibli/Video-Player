import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('LoadVideosService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
