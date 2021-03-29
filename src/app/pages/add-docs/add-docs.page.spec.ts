import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocsPage } from './add-docs.page';

describe('AddDocsPage', () => {
  let component: AddDocsPage;
  let fixture: ComponentFixture<AddDocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
