import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteReservationComponent } from './dialog-delete-reservation.component';

describe('DialogDeleteReservationComponent', () => {
  let component: DialogDeleteReservationComponent;
  let fixture: ComponentFixture<DialogDeleteReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteReservationComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
