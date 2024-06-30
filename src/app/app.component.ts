import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { BaseChartDirective } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';
import { SpeedChartComponent } from './speed-chart/speed-chart.component';
import RouteObjectFromCsv from './interfaces/route-object-from-csv.interface';
import { RoutePoint } from './interfaces/route-point.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LeafletModule,
    BaseChartDirective,
    MapComponent,
    RoutePickerComponent,
    SpeedChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  selectedRoute?: RouteObjectFromCsv;
  routePoints?: RoutePoint[];

  constructor(private cdr: ChangeDetectorRef) {}

  onRouteChange(route?: RouteObjectFromCsv): void {
    this.selectedRoute = route;
    this.routePoints = route?.points;
    this.cdr.markForCheck();
  }
}
