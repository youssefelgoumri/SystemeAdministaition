import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchooseComponent } from './addchoose.component';

describe('AddchooseComponent', () => {
  let component: AddchooseComponent;
  let fixture: ComponentFixture<AddchooseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddchooseComponent]
    });
    fixture = TestBed.createComponent(AddchooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
