import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpvComponent } from './editpv.component';

describe('EditpvComponent', () => {
  let component: EditpvComponent;
  let fixture: ComponentFixture<EditpvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpvComponent]
    });
    fixture = TestBed.createComponent(EditpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
