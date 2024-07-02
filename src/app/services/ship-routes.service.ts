import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';
import IShipRoute from '../interfaces/IShipRoute.interface';
import ISerializedShipRoute from '../interfaces/ISerializedShipRoute.interface';
import { IRoutePoint } from '../interfaces/IRoutePoint.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipRoutesService {
  constructor(private http: HttpClient) {}

  public getCsvData(): Observable<IShipRoute[]> {
    return this.http
      .get('/assets/web_challenge.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          const parsedData = Papa.parse<ISerializedShipRoute>(data, {
            header: true,
          });
          const transformedData: IShipRoute[] = parsedData.data
            .filter(
              (route: ISerializedShipRoute) =>
                route.route_id && route.from_port && route.to_port
            )
            .map((route: ISerializedShipRoute) => {
              const parsedPoints: IRoutePoint[] = JSON.parse(route.points);
              return {
                from_port: route.from_port,
                leg_duration: route.leg_duration,
                points: parsedPoints,
                route_id: route.route_id,
                to_port: route.to_port,
              };
            });
          return transformedData;
        })
      );
  }
}
