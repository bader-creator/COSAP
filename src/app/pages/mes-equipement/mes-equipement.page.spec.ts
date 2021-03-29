import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEquipementPage } from './mes-equipement.page';

describe('MesEquipementPage', () => {
  let component: MesEquipementPage;
  let fixture: ComponentFixture<MesEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
