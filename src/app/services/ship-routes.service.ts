import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';
import IShipRoute from '../interfaces/IShipRoute.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipRoutesService {
  constructor(private http: HttpClient) {}

  // Grabbing and parsing data from CSV
  public getCsvData(): Observable<IShipRoute[]> {
    return this.http
      .get('/assets/web_challenge.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          const parsedData = Papa.parse(data, { header: true });
          return parsedData.data as IShipRoute[];
        })
      );
  }
}
