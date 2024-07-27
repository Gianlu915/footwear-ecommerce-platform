import { TestBed } from '@angular/core/testing';

import { AggiungiService } from './aggiungi.service';

describe('AggiungiService', () => {
  let service: AggiungiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggiungiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
