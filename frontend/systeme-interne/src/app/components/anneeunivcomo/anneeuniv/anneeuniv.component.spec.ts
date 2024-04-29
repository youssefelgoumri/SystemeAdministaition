import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeunivComponent } from './anneeuniv.component';

describe('AnneeunivComponent', () => {
  let component: AnneeunivComponent;
  let fixture: ComponentFixture<AnneeunivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnneeunivComponent]
    });
    fixture = TestBed.createComponent(AnneeunivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
