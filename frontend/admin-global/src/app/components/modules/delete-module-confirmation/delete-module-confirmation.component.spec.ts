import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModuleConfirmationComponent } from './delete-module-confirmation.component';

describe('DeleteModuleConfirmationComponent', () => {
  let component: DeleteModuleConfirmationComponent;
  let fixture: ComponentFixture<DeleteModuleConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModuleConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModuleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
