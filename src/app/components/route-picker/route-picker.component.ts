import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShipRoutesService } from '../../services/ship-routes.service';
import { ROUTE_NOT_FOUND_ERROR } from '../../constants/error-messages.constant';
import IShipRoute from '../../interfaces/IShipRoute.interface';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePickerComponent implements OnInit {
  public routes: IShipRoute[] = [];

  @Output() routeChange = new EventEmitter<IShipRoute>();

  constructor(
    private shipRoutesService: ShipRoutesService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.shipRoutesService
      .getCsvData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.routes = data;
        this.cdr.markForCheck();
      });
  }

  public onRouteChange(event: MatSelectChange): void {
    const selectedRouteId = event.value;
    const selectedRoute = this.routes.find(
      (route) => route.route_id === selectedRouteId
    );

    if (selectedRoute) {
      this.routeChange.emit(selectedRoute);
    } else {
      throw new Error(ROUTE_NOT_FOUND_ERROR);
    }
  }
}
