import { TestBed } from '@angular/core/testing';

import { AnneeunivService } from './anneeuniv.service';

describe('AnneeunivService', () => {
  let service: AnneeunivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeunivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
