import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAbsenceDialogComponent } from './update-absence-dialog.component';

describe('UpdateAbsenceDialogComponent', () => {
  let component: UpdateAbsenceDialogComponent;
  let fixture: ComponentFixture<UpdateAbsenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAbsenceDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
