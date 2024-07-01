import { TestBed } from '@angular/core/testing';

import { ShipRoutesService } from './ship-routes.service';

describe('ParseCsvService', () => {
  let service: ShipRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
