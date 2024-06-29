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

    // Converting route points to LatLng objects
    const latLngs = route.points.map((point: RoutePoint[]) => [
      point[1],
      point[0],
    ]);
    // Creating a polyline for the route
    const polyline = L.polyline(latLngs, { color: 'blue' });
    // Adding the polyline to a new layer group
    this.routeLayer = L.layerGroup([polyline]).addTo(this.map);
    // Fiting the map bounds to the polyline
    this.map.fitBounds(polyline.getBounds());
  }
}
