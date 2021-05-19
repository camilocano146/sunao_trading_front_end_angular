import { TestBed } from '@angular/core/testing';

import { AccessLobbyGuard } from './access-lobby.guard';

describe('AccessLobbyGuard', () => {
  let guard: AccessLobbyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessLobbyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
