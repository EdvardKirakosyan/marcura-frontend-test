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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedRoute: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routePoints?: any[];

  constructor(private cdr: ChangeDetectorRef) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRouteChange(route: any): void {
    this.selectedRoute = route;
    this.routePoints = route.points;
    this.cdr.markForCheck();
  }
}
