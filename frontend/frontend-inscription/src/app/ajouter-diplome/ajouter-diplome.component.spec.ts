import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDiplomeComponent } from './ajouter-diplome.component';

describe('AjouterDiplomeComponent', () => {
  let component: AjouterDiplomeComponent;
  let fixture: ComponentFixture<AjouterDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterDiplomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
