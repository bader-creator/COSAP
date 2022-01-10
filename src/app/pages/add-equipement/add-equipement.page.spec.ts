import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipementPage } from './add-equipement.page';

describe('AddEquipementPage', () => {
  let component: AddEquipementPage;
  let fixture: ComponentFixture<AddEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
