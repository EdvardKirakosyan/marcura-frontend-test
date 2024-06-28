import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafletModule, MapComponent, RoutePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
