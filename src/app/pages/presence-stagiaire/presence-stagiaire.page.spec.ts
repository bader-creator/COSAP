import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceStagiairePage } from './presence-stagiaire.page';

describe('PresenceStagiairePage', () => {
  let component: PresenceStagiairePage;
  let fixture: ComponentFixture<PresenceStagiairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceStagiairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceStagiairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
