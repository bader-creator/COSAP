import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistroiqueActionPage } from './histroique-action.page';

describe('HistroiqueActionPage', () => {
  let component: HistroiqueActionPage;
  let fixture: ComponentFixture<HistroiqueActionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistroiqueActionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistroiqueActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
