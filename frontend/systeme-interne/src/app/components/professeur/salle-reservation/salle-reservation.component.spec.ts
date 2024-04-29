import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleReservationComponent } from './salle-reservation.component';

describe('SalleReservationComponent', () => {
  let component: SalleReservationComponent;
  let fixture: ComponentFixture<SalleReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalleReservationComponent]
    });
    fixture = TestBed.createComponent(SalleReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
