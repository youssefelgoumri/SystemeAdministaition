import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpvmoduleComponent } from './addpvmodule.component';

describe('AddpvmoduleComponent', () => {
  let component: AddpvmoduleComponent;
  let fixture: ComponentFixture<AddpvmoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpvmoduleComponent]
    });
    fixture = TestBed.createComponent(AddpvmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
