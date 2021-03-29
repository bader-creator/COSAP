import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfmCamerounPresencePage } from './sfm-cameroun-presence.page';

describe('SfmCamerounPresencePage', () => {
  let component: SfmCamerounPresencePage;
  let fixture: ComponentFixture<SfmCamerounPresencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfmCamerounPresencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfmCamerounPresencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
