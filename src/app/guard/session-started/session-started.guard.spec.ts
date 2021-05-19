import { TestBed } from '@angular/core/testing';

import { SessionStartedGuard } from './session-started-guard.service';

describe('SessionStartedGuard', () => {
  let guard: SessionStartedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionStartedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
