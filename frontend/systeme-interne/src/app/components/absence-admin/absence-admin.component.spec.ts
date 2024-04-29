import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceAdminComponent } from './absence-admin.component';

describe('AbsenceAdminComponent', () => {
  let component: AbsenceAdminComponent;
  let fixture: ComponentFixture<AbsenceAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceAdminComponent]
    });
    fixture = TestBed.createComponent(AbsenceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
