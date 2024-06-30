import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';
import RouteObjectFromCsv from '../interfaces/route-object-from-csv.interface';

@Injectable({
  providedIn: 'root',
})
export class ParseCsvService {
  constructor(private http: HttpClient) {}

  // Grabing and parsing data from csv
  getCsvData(): Observable<RouteObjectFromCsv[]> {
    return this.http
      .get('/assets/web_challenge.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          const parsedData = Papa.parse(data, { header: true });
          return parsedData.data as RouteObjectFromCsv[];
        })
      );
  }
}
