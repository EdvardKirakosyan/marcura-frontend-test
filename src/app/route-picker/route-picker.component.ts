import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ShipRoutesService } from '../services/ship-routes.service';
import { ROUTE_NOT_FOUND_ERROR } from '../constants/error-messages.constant';
import IShipRoute from '../interfaces/IShipRoute.interface';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePickerComponent implements OnInit {
  public routes;

  @Output() routeChange = new EventEmitter<IShipRoute>();

  constructor(
    private shipRoutesService: ShipRoutesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initializing component data (using parsing service)
    this.shipRoutesService.getCsvData().subscribe((data) => {
      this.routes = data;
      this.cdr.markForCheck();
    });
  }

  // Handling route selection changes
  public onRouteChange(event: Event): void {
    const selectedRouteId = (event.target as HTMLSelectElement).value;
    const selectedRoute = this.routes.find(
      (route) => route.route_id === selectedRouteId
    );

    if (selectedRoute) {
      selectedRoute.points = JSON.parse(selectedRoute.points);
      this.routeChange.emit(selectedRoute);
    } else {
      throw new Error(ROUTE_NOT_FOUND_ERROR);
    }
  }
}
