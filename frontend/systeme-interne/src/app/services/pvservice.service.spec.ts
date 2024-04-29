import { TestBed } from '@angular/core/testing';

import { PvserviceService } from './pvservice.service';

describe('PvserviceService', () => {
  let service: PvserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PvserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
