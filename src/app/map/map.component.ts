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
import { MAP_OPTIONS } from '../constants/map-options.constants';
import { IRoutePoint } from '../interfaces/IRoutePoint.interface';
import IShipRoute from '../interfaces/IShipRoute.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnChanges {
  public map?: L.Map;
  public routeLayer?: L.LayerGroup;

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

  public showRouteOnMap(route): void {
    // Ensuring that map is ready
    if (!this.map) return;

    // Clear existing route layer
    if (this.routeLayer) {
      this.map?.removeLayer(this.routeLayer);
    }

    // Converting route points to LatLng objects with speed
    const points = route.points.map((point: IRoutePoint[]) => [
      point[1],
      point[0],
      point[3],
    ]);

    // Adding rout layer to map
    this.routeLayer = L.layerGroup().addTo(this.map);

    // Creating polyline segments with different colors based on speed
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const speed = start[2];

      // Changing color according to speed
      const color = speed < 10 ? 'red' : speed < 15 ? 'yellow' : 'green';
      L.polyline([L.latLng(start[0], start[1]), L.latLng(end[0], end[1])], {
        color,
      }).addTo(this.routeLayer);
    }

    // Calculating bounds of the route and fitting it
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
