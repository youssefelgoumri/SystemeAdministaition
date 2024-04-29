import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogupdateReservationComponent } from './dialogupdate-reservation.component';

describe('DialogupdateReservationComponent', () => {
  let component: DialogupdateReservationComponent;
  let fixture: ComponentFixture<DialogupdateReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogupdateReservationComponent]
    });
    fixture = TestBed.createComponent(DialogupdateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
