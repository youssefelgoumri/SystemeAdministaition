import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpvComponent } from './addpv.component';

describe('AddpvComponent', () => {
  let component: AddpvComponent;
  let fixture: ComponentFixture<AddpvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpvComponent]
    });
    fixture = TestBed.createComponent(AddpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
