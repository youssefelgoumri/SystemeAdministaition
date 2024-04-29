import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalleDialogComponent } from './add-salle-dialog.component';

describe('AddSalleDialogComponent', () => {
  let component: AddSalleDialogComponent;
  let fixture: ComponentFixture<AddSalleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSalleDialogComponent]
    });
    fixture = TestBed.createComponent(AddSalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
