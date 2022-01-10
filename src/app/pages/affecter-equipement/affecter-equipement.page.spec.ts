import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterEquipementPage } from './affecter-equipement.page';

describe('AffecterEquipementPage', () => {
  let component: AffecterEquipementPage;
  let fixture: ComponentFixture<AffecterEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
