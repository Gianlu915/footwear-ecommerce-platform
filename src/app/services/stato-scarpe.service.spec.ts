import { TestBed } from '@angular/core/testing';

import { StatoScarpeService } from './stato-scarpe.service';

describe('StatoScarpeService', () => {
  let service: StatoScarpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatoScarpeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
