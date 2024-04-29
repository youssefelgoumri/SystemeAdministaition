import { TestBed } from '@angular/core/testing';

import { DelibSemestreService } from './delib-semestre.service';

describe('DelibSemestreService', () => {
  let service: DelibSemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelibSemestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
