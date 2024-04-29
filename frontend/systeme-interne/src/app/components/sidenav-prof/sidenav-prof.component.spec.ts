import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavProfComponent } from './sidenav-prof.component';

describe('SidenavProfComponent', () => {
  let component: SidenavProfComponent;
  let fixture: ComponentFixture<SidenavProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavProfComponent]
    });
    fixture = TestBed.createComponent(SidenavProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
