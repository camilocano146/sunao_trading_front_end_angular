import { TestBed } from '@angular/core/testing';

import { AccessChooseOrganizationGuard } from './access-organization-guard.service';

describe('AccessLobbyGuard', () => {
  let guard: AccessChooseOrganizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessChooseOrganizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
