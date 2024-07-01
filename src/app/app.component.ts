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
import { IRoutePoint } from './interfaces/IRoutePoint.interface';
import IShipRoute from './interfaces/IShipRoute.interface';

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
  public selectedRoute?: IShipRoute;
  public routePoints?: IRoutePoint[];

  constructor(private cdr: ChangeDetectorRef) {}

  public onRouteChange(route?: IShipRoute): void {
    this.selectedRoute = route;
    this.routePoints = route?.points;
    this.cdr.markForCheck();
  }
}
