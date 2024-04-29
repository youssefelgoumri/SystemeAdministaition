import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddanneeunivComponent } from './addanneeuniv.component';

describe('AddanneeunivComponent', () => {
  let component: AddanneeunivComponent;
  let fixture: ComponentFixture<AddanneeunivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddanneeunivComponent]
    });
    fixture = TestBed.createComponent(AddanneeunivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
