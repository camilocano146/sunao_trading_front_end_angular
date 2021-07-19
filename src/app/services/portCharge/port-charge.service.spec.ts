import { TestBed } from '@angular/core/testing';

import { PortChargeService } from './port-charge.service';

describe('PortChargeService', () => {
  let service: PortChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
