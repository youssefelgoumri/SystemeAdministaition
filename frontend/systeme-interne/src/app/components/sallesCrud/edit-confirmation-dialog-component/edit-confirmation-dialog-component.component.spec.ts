import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationDialogComponentComponent } from './edit-confirmation-dialog-component.component';

describe('EditConfirmationDialogComponentComponent', () => {
  let component: EditConfirmationDialogComponentComponent;
  let fixture: ComponentFixture<EditConfirmationDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditConfirmationDialogComponentComponent]
    });
    fixture = TestBed.createComponent(EditConfirmationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
