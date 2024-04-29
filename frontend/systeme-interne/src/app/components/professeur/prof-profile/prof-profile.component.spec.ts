import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfProfileComponent } from './prof-profile.component';

describe('ProfProfileComponent', () => {
  let component: ProfProfileComponent;
  let fixture: ComponentFixture<ProfProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfProfileComponent]
    });
    fixture = TestBed.createComponent(ProfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
