import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceReunionPage } from './presence-reunion.page';

describe('PresenceReunionPage', () => {
  let component: PresenceReunionPage;
  let fixture: ComponentFixture<PresenceReunionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceReunionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceReunionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
