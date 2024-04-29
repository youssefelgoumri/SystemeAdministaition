import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallpvComponent } from './showallpv.component';

describe('ShowallpvComponent', () => {
  let component: ShowallpvComponent;
  let fixture: ComponentFixture<ShowallpvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowallpvComponent]
    });
    fixture = TestBed.createComponent(ShowallpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
