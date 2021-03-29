import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDestinataireEquipementPage } from './list-destinataire-equipement.page';

describe('ListDestinataireEquipementPage', () => {
  let component: ListDestinataireEquipementPage;
  let fixture: ComponentFixture<ListDestinataireEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDestinataireEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDestinataireEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
