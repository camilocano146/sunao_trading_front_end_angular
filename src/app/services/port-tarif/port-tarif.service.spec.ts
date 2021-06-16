import { TestBed } from '@angular/core/testing';

import { PortTarifService } from './port-tarif.service';

describe('PortTarifService', () => {
  let service: PortTarifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortTarifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
