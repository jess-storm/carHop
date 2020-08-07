import { TestBed } from '@angular/core/testing';

import { RequestedRidesService } from './requested-rides.service';

describe('RequestedRidesService', () => {
  let service: RequestedRidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestedRidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
