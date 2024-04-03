import { TestBed } from '@angular/core/testing';

import { ForgorService } from './forgor.service';

describe('ForgorService', () => {
  let service: ForgorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
