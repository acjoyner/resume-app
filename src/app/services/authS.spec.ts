import { TestBed } from '@angular/core/testing';

import { AuthS } from './authS';

describe('Auth', () => {
  let service: AuthS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
