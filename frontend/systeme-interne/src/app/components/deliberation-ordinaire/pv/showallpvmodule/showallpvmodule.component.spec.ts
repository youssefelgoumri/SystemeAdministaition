import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallpvmoduleComponent } from './showallpvmodule.component';

describe('ShowallpvmoduleComponent', () => {
  let component: ShowallpvmoduleComponent;
  let fixture: ComponentFixture<ShowallpvmoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowallpvmoduleComponent]
    });
    fixture = TestBed.createComponent(ShowallpvmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
