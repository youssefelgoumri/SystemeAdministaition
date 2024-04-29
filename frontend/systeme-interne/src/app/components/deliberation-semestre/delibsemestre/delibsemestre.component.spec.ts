import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelibsemestreComponent } from './delibsemestre.component';

describe('DelibsemestreComponent', () => {
  let component: DelibsemestreComponent;
  let fixture: ComponentFixture<DelibsemestreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelibsemestreComponent]
    });
    fixture = TestBed.createComponent(DelibsemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
