import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEquipementPage } from './detail-equipement.page';

describe('DetailEquipementPage', () => {
  let component: DetailEquipementPage;
  let fixture: ComponentFixture<DetailEquipementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEquipementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
