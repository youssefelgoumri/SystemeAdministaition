import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionAdministrativeComponent } from './inscription-administrative.component';

describe('InscriptionAdministrativeComponent', () => {
  let component: InscriptionAdministrativeComponent;
  let fixture: ComponentFixture<InscriptionAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionAdministrativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
