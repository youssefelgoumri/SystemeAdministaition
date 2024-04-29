import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedSallesComponent } from './reserved-salles.component';

describe('ReservedSallesComponent', () => {
  let component: ReservedSallesComponent;
  let fixture: ComponentFixture<ReservedSallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedSallesComponent]
    });
    fixture = TestBed.createComponent(ReservedSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
