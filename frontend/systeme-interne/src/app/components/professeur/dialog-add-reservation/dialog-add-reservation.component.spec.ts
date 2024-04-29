import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReservationComponent } from './dialog-add-reservation.component';

describe('DialogAddReservationComponent', () => {
  let component: DialogAddReservationComponent;
  let fixture: ComponentFixture<DialogAddReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddReservationComponent]
    });
    fixture = TestBed.createComponent(DialogAddReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
