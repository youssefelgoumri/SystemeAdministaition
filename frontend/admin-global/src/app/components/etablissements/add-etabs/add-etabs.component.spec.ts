import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtabsComponent } from './add-etabs.component';

describe('AddEtabsComponent', () => {
  let component: AddEtabsComponent;
  let fixture: ComponentFixture<AddEtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEtabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
