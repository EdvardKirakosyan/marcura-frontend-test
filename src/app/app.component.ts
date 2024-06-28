import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClient],
  imports: [
    RouterOutlet,
    LeafletModule,
    MapComponent,
    RoutePickerComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild('mapComponent') mapComponent!: MapComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  onRouteChange(route: any): void {
    this.mapComponent.showRoute(route.points);
  }
}
