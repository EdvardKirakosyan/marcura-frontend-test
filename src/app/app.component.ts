import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClient],
  imports: [RouterOutlet, LeafletModule, MapComponent, RoutePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedRoute: any;

  constructor(private cdr: ChangeDetectorRef) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRouteChange(route: any): void {
    this.selectedRoute = route;
    this.cdr.markForCheck();
  }
}
