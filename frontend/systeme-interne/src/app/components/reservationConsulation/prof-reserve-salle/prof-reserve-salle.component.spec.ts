import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfReserveSalleComponent } from './prof-reserve-salle.component';

describe('ProfReserveSalleComponent', () => {
  let component: ProfReserveSalleComponent;
  let fixture: ComponentFixture<ProfReserveSalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfReserveSalleComponent]
    });
    fixture = TestBed.createComponent(ProfReserveSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
