import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTaskPage } from './detail-task.page';

describe('DetailTaskPage', () => {
  let component: DetailTaskPage;
  let fixture: ComponentFixture<DetailTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
