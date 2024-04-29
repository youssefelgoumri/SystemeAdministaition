import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherElementsComponent } from './afficher-elements.component';

describe('AfficherElementsComponent', () => {
  let component: AfficherElementsComponent;
  let fixture: ComponentFixture<AfficherElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
