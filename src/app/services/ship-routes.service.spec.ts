import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ShipRoutesService } from './ship-routes.service';
import IShipRoute from '../interfaces/IShipRoute.interface';

describe('ShipRoutesService', () => {
  let service: ShipRoutesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipRoutesService],
    });
    service = TestBed.inject(ShipRoutesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse CSV data correctly', () => {
    const mockCsvData = `from_port,leg_duration,points,route_id,to_port
                          Port A,5,[],route1,Port B
                          Port C,3,[],route2,Port D`;
    const expectedData: IShipRoute[] = [
      {
        from_port: 'Port A',
        leg_duration: '5',
        points: [],
        route_id: 'route1',
        to_port: 'Port B',
      },
      {
        from_port: 'Port C',
        leg_duration: '3',
        points: [],
        route_id: 'route2',
        to_port: 'Port D',
      },
    ];

    service.getCsvData().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('/assets/web_challenge.csv');
    expect(req.request.method).toBe('GET');
    req.flush(mockCsvData);
  });

  it('should handle empty CSV data', () => {
    const mockCsvData = '';
    const expectedData: IShipRoute[] = [];

    service.getCsvData().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('/assets/web_challenge.csv');
    expect(req.request.method).toBe('GET');
    req.flush(mockCsvData);
  });

  it('should handle CSV data with header only', () => {
    const mockCsvData = 'from_port,leg_duration,points,route_id,to_port\n';
    const expectedData: IShipRoute[] = [];

    service.getCsvData().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('/assets/web_challenge.csv');
    expect(req.request.method).toBe('GET');
    req.flush(mockCsvData);
  });
});
