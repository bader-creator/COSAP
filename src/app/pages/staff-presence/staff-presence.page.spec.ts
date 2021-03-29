import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPresencePage } from './staff-presence.page';

describe('StaffPresencePage', () => {
  let component: StaffPresencePage;
  let fixture: ComponentFixture<StaffPresencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPresencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPresencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
