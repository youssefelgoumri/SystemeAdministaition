import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowresultatelementComponent } from './showresultatelement.component';

describe('ShowresultatelementComponent', () => {
  let component: ShowresultatelementComponent;
  let fixture: ComponentFixture<ShowresultatelementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowresultatelementComponent]
    });
    fixture = TestBed.createComponent(ShowresultatelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
