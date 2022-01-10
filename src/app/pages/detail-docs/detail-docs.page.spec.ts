import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDocsPage } from './detail-docs.page';

describe('DetailDocsPage', () => {
  let component: DetailDocsPage;
  let fixture: ComponentFixture<DetailDocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDocsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
