import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifieDisponibilitePage } from './verifie-disponibilite.page';

describe('VerifieDisponibilitePage', () => {
  let component: VerifieDisponibilitePage;
  let fixture: ComponentFixture<VerifieDisponibilitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifieDisponibilitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifieDisponibilitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
