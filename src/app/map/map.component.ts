import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  providers: [HttpClient],
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map?: L.Map;
  routeLayer: L.LayerGroup = L.layerGroup();

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Output() mapReady = new EventEmitter<L.Map>();

  constructor(private cdr: ChangeDetectorRef) {}

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 2,
    center: latLng(50.879966, 0),
  };

  // ngAfterViewInit(): void {
  //   this.initMap();
  // }

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([20, 0], 2);

    // console.log(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.routeLayer.addTo(this.map);

    this.mapReady.emit(this.map);
  }

  showRoute(points: any[]): void {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }

    this.routeLayer.clearLayers();

    const latLngs = points.map((point) => [point[1], point[0]]);
    L.polyline(latLngs, { color: 'blue' }).addTo(this.map!);
  }
}
