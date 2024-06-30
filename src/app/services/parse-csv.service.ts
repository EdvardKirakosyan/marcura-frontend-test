import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class ParseCsvService {
  constructor(private http: HttpClient) {}

  // Grabing and parsing data from csv
  getCsvData(): Observable<unknown[]> {
    return this.http
      .get('/assets/web_challenge.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          const parsedData = Papa.parse(data, { header: true });
          return parsedData.data;
        })
      );
  }
}
