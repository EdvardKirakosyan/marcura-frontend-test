import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { circle, latLng, polygon, tileLayer } from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  standalone: true,
  providers: [HttpClient],
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  map?: L.Map;

  // Base tile layer options from OpenStreetMap, sets the maximum zoom level, attribution text, initial zoom level, and the map's initial center coordinates.
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

  // Layers Control
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': tileLayer(
        'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=1c1d79578a054518a630a69693372af4',
        { maxZoom: 18, attribution: '...' }
      ),
    },
    overlays: {
      'Big Circle': circle([50.879966, 0], { radius: 90000 }),
      'Big Square': polygon([
        [60, 0],
        [59, 0],
        [58, 1],
        [57, 4],
      ]),
    },
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initMap();
  }

  // ngOnDestroy() {
  //   if (this.map) {
  //     this.map.off();
  //     this.map.remove();
  //     this.map = undefined;
  //   }
  // }

  // Initializes the map with predefined options
  initMap(): void {
    // if (this.map) {
    //   return;
    // }

    this.map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.control
      .layers(this.layersControl.baseLayers, this.layersControl.overlays)
      .addTo(this.map);
  }
}
