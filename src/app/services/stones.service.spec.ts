import { TestBed, inject } from '@angular/core/testing';

import { StonesService } from './stones.service';

describe('StonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StonesService]
    });
  });

  it('should be created', inject([StonesService], (service: StonesService) => {
    expect(service).toBeTruthy();
  }));
});
