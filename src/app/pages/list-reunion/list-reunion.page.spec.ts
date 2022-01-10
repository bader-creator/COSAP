import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReunionPage } from './list-reunion.page';

describe('ListReunionPage', () => {
  let component: ListReunionPage;
  let fixture: ComponentFixture<ListReunionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReunionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReunionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
