import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppchooseComponent } from './appchoose.component';

describe('AppchooseComponent', () => {
  let component: AppchooseComponent;
  let fixture: ComponentFixture<AppchooseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppchooseComponent]
    });
    fixture = TestBed.createComponent(AppchooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
