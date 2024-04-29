import { TestBed } from '@angular/core/testing';

import { SalleserviceService } from './salleservice.service';

describe('SalleserviceService', () => {
  let service: SalleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
