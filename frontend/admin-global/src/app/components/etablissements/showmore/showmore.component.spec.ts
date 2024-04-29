import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmoreComponent } from './showmore.component';

describe('ShowmoreComponent', () => {
  let component: ShowmoreComponent;
  let fixture: ComponentFixture<ShowmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowmoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
