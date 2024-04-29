import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportpvComponent } from './exportpv.component';

describe('ExportpvComponent', () => {
  let component: ExportpvComponent;
  let fixture: ComponentFixture<ExportpvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportpvComponent]
    });
    fixture = TestBed.createComponent(ExportpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
