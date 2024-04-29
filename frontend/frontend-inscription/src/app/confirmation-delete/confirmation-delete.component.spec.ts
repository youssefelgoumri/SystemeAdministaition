import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteComponent } from './confirmation-delete.component';

describe('ConfirmationDeleteComponent', () => {
  let component: ConfirmationDeleteComponent;
  let fixture: ComponentFixture<ConfirmationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
