import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportpvfileComponent } from './importpvfile.component';

describe('ImportpvfileComponent', () => {
  let component: ImportpvfileComponent;
  let fixture: ComponentFixture<ImportpvfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportpvfileComponent]
    });
    fixture = TestBed.createComponent(ImportpvfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
