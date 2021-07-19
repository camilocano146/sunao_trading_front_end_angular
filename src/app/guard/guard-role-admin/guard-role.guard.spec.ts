import { TestBed } from '@angular/core/testing';

import { GuardRoleGuard } from './guard-role.guard';

describe('GuardRoleGuard', () => {
  let guard: GuardRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
