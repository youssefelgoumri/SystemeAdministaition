import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeConfirmationDialogComponentComponent } from './edite-confirmation-dialog-component.component';

describe('EditeConfirmationDialogComponentComponent', () => {
  let component: EditeConfirmationDialogComponentComponent;
  let fixture: ComponentFixture<EditeConfirmationDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeConfirmationDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditeConfirmationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
