import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuelComponent } from './manuel.component';

describe('ManuelComponent', () => {
  let component: ManuelComponent;
  let fixture: ComponentFixture<ManuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManuelComponent]
    });
    fixture = TestBed.createComponent(ManuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
