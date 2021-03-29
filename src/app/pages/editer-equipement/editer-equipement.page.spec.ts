import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerEquipementPage } from './editer-equipement.page';

describe('EditerEquipementPage', () => {
  let component: EditerEquipementPage;
  let fixture: ComponentFixture<EditerEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
