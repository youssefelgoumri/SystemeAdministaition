import { TestBed } from '@angular/core/testing';

import { ReservationsalleService } from './reservationsalle.service';

describe('ReservationsalleService', () => {
  let service: ReservationsalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
