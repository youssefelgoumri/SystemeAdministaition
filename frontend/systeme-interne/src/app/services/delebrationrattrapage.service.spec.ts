import { TestBed } from '@angular/core/testing';

import { DelebrationrattrapageService } from './delebrationrattrapage.service';

describe('DelebrationrattrapageService', () => {
  let service: DelebrationrattrapageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelebrationrattrapageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
