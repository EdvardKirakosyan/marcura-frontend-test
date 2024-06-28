import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ParseCsvService } from '../services/parse-csv.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  providers: [HttpClient],
  imports: [CommonModule],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePickerComponent implements OnInit {
  routes: unknown[] = [];

  @Output() routeChange = new EventEmitter<unknown>();

  constructor(
    private parseCsvService: ParseCsvService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.parseCsvService.getCsvData().subscribe((data) => {
      this.routes = data;
      console.log(this.routes);
      this.cdr.detectChanges();
    });
  }

  onRouteChange(event: Event): void {
    const selectedRoute = JSON.parse((event.target as HTMLSelectElement).value);
    this.routeChange.emit(selectedRoute);

    // const selectedRouteId = (event.target as HTMLSelectElement).value;
    // const selectedRoute = this.routes.find(
    //   (route) => route.route_id === selectedRouteId
    // );
    // if (selectedRoute) {
    //   this.routeChange.emit(selectedRoute);
    // } else {
    //   console.error('Selected route not found');
    // }
  }
}
