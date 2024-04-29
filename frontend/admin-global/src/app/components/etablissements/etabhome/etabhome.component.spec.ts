import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtabhomeComponent } from './etabhome.component';

describe('EtablissementComponent', () => {
  let component: EtabhomeComponent;
  let fixture: ComponentFixture<EtabhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtabhomeComponent]
    });
    fixture = TestBed.createComponent(EtabhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
