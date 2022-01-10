import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnCopieByDatePage } from './en-copie-by-date.page';

describe('EnCopieByDatePage', () => {
  let component: EnCopieByDatePage;
  let fixture: ComponentFixture<EnCopieByDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnCopieByDatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnCopieByDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
