import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { MAP_OPTIONS } from '../../constants/map-options.constants';
import { IRoutePoint } from '../../interfaces/IRoutePoint.interface';
import IShipRoute from '../../interfaces/IShipRoute.interface';
import { NumberTuple } from '../../interfaces/CustomTypes';
import { Colors } from '../../constants/colors.enum';
import { Speed } from '../../constants/speed.enum';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map?: L.Map;
  private routeLayer?: L.LayerGroup;

  @Input() selectedRoute?: IShipRoute;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.map = L.map('map', MAP_OPTIONS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoute'] && this.selectedRoute) {
      this.showRouteOnMap(this.selectedRoute);
    }
  }

  private convertRoutePoints(route: IShipRoute): NumberTuple[] {
    return route.points.map((point: IRoutePoint) => [
      point[1],
      point[0],
      point[3],
    ]);
  }

  private createPolylineSegments(points: NumberTuple[]): void {
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const speed = start[2];
      const color =
        speed < Speed.LOW_SPEED
          ? Colors.RED
          : speed < Speed.HIGH_SPEED
          ? Colors.YELLOW
          : Colors.GREEN;
      L.polyline([L.latLng(start[0], start[1]), L.latLng(end[0], end[1])], {
        color,
      }).addTo(this.routeLayer!);
    }
  }

  private showRouteOnMap(route: IShipRoute): void {
    if (!this.map) {
      return;
    }

    if (this.routeLayer) {
      this.map?.removeLayer(this.routeLayer);
    }

    this.routeLayer = L.layerGroup().addTo(this.map);
    const points = this.convertRoutePoints(route);
    this.createPolylineSegments(points);
    const bounds = L.latLngBounds([]);

    this.routeLayer.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        bounds.extend(layer.getBounds());
      }
    });
    this.map.fitBounds(bounds);
    this.cdr.markForCheck();
  }
}
