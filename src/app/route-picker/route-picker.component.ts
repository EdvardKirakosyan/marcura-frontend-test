import { Component } from '@angular/core';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  imports: [],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss',
})
export class RoutePickerComponent {
  routes: any[] = [];

  ngOnInit(): void {
    this.loadRoutes();
  }

  private loadRoutes(): void {}

  onRouteSelect(route: any): void {}
}
