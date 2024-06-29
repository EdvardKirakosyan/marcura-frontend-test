import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MAP_OPTIONS } from '../constants/map-options.constants';
import { RoutePoint } from '../interfaces/route-point.interface';
import RouteObjectFromCsv from '../interfaces/route-object-from-csv.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  providers: [HttpClient],
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnChanges {
  map?: L.Map;
  routeLayer?: L.LayerGroup;

  @Input() selectedRoute?: RouteObjectFromCsv;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.map = L.map('map', MAP_OPTIONS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoute'] && this.selectedRoute) {
      this.showRouteOnMap(this.selectedRoute);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showRouteOnMap(route: any): void {
    if (!this.map) return;

    // Clear existing route layer
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
    }

    // Converting route points to LatLng objects with speed
    const points = route.points.map((point: RoutePoint[]) => [
      point[1],
      point[0],
      point[3],
    ]);

    this.routeLayer = L.layerGroup();

    // Create polyline segments with different colors based on speed
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const speed = start[2];

      // Changing color according to speed
      const color = speed < 10 ? 'red' : speed < 15 ? 'yellow' : 'green';

      const segment = L.polyline(
        [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
        { color }
      );
      segment.addTo(this.routeLayer);
    }

    this.routeLayer.addTo(this.map);

    // Calculat bounds of the route
    const bounds = L.latLngBounds([]);
    this.routeLayer.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        bounds.extend(layer.getBounds());
      }
    });

    // Fitting bounds
    this.map.fitBounds(bounds);
    this.cdr.markForCheck();
  }
}
