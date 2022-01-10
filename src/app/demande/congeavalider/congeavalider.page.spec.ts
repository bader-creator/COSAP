import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeavaliderPage } from './congeavalider.page';

describe('CongeavaliderPage', () => {
  let component: CongeavaliderPage;
  let fixture: ComponentFixture<CongeavaliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeavaliderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeavaliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
