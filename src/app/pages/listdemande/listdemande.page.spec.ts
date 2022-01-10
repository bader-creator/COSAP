import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdemandePage } from './listdemande.page';

describe('ListdemandePage', () => {
  let component: ListdemandePage;
  let fixture: ComponentFixture<ListdemandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdemandePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdemandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
