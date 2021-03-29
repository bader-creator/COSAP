import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracabilitePage } from './tracabilite.page';

describe('TracabilitePage', () => {
  let component: TracabilitePage;
  let fixture: ComponentFixture<TracabilitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracabilitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracabilitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
