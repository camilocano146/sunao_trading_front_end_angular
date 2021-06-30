import { TestBed } from '@angular/core/testing';

import { IvaService } from './iva.service';

describe('IvaService', () => {
  let service: IvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
