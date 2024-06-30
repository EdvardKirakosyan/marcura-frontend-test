import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ParseCsvService } from '../services/parse-csv.service';
import RouteObjectFromCsv from '../interfaces/route-object-from-csv.interface';
import { ROUTE_NOT_FOUND_ERROR } from '../constants/error-messages.constant';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePickerComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routes: any[] = [];

  @Output() routeChange = new EventEmitter<RouteObjectFromCsv>();

  constructor(
    private parseCsvService: ParseCsvService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initializing component data (using parsing service)
    this.parseCsvService.getCsvData().subscribe((data) => {
      this.routes = data;
      this.cdr.markForCheck();
    });
  }

  // Handling route selection changes
  onRouteChange(event: Event): void {
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
