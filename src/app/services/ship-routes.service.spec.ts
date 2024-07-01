import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShipRoutesService } from './ship-routes.service';

describe('ParseCsvService', () => {
  let service: ShipRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipRoutesService],
    });
    service = TestBed.inject(ShipRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
