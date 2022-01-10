import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTeletravailPage } from './detail-teletravail.page';

describe('DetailTeletravailPage', () => {
  let component: DetailTeletravailPage;
  let fixture: ComponentFixture<DetailTeletravailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTeletravailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTeletravailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
