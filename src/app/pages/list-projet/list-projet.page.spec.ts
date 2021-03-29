import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetPage } from './list-projet.page';

describe('ListProjetPage', () => {
  let component: ListProjetPage;
  let fixture: ComponentFixture<ListProjetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
