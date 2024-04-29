import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSallesComponent } from './free-salles.component';

describe('FreeSallesComponent', () => {
  let component: FreeSallesComponent;
  let fixture: ComponentFixture<FreeSallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeSallesComponent]
    });
    fixture = TestBed.createComponent(FreeSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
