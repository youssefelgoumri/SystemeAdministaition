import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmorefiliereComponent } from './showmorefiliere.component';

describe('ShowmorefiliereComponent', () => {
  let component: ShowmorefiliereComponent;
  let fixture: ComponentFixture<ShowmorefiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowmorefiliereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowmorefiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
