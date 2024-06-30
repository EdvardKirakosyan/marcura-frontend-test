import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { LINE_CHART_DATA } from '../constants/chart-data-config.constant';
import { LINE_CHART_OPTIONS } from '../constants/chart-options-config.constant';
import { LINE_CHART_TYPE } from '../constants/chart-type-config.constant';
import { RoutePoint } from '../interfaces/route-point.interface';

@Component({
  selector: 'app-speed-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedChartComponent implements OnChanges {
  lineChartData = LINE_CHART_DATA;
  lineChartOptions = LINE_CHART_OPTIONS;
  lineChartType = LINE_CHART_TYPE;

  @Input() routePoints?: RoutePoint[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Tracking rout change
    if (changes['routePoints'] && this.routePoints) this.updateChart();
    this.chart?.update();
  }

  // Updating chart data according to selected route
  updateChart(): void {
    // Ensuring route readines
    if (!this.routePoints) return;

    // Transform routePoints into chart data format and update chart dataset and labels
    const data = this.routePoints.map((point) => ({
      x: new Date(point[2]).getTime(),
      y: point[3],
    }));
    this.lineChartData.datasets[0].data = data;
    this.lineChartData.labels = data.map((point) => new Date(point.x));

    this.cdr.markForCheck();
  }
}
