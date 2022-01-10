import { TestBed } from '@angular/core/testing';

import { AuthtificationtokenService } from './authtificationtoken.service';

describe('AuthtificationtokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthtificationtokenService = TestBed.get(AuthtificationtokenService);
    expect(service).toBeTruthy();
  });
});
