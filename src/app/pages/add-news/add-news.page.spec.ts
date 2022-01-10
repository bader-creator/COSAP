import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsPage } from './add-news.page';

describe('AddNewsPage', () => {
  let component: AddNewsPage;
  let fixture: ComponentFixture<AddNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
