import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatrattComponent } from './resultatratt.component';

describe('ResultatrattComponent', () => {
  let component: ResultatrattComponent;
  let fixture: ComponentFixture<ResultatrattComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatrattComponent]
    });
    fixture = TestBed.createComponent(ResultatrattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
