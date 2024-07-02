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
import { IRoutePoint } from '../../interfaces/IRoutePoint.interface';
import {
  LINE_CHART_DATA,
  LINE_CHART_OPTIONS,
  LINE_CHART_TYPE,
} from '../../constants/chart-data-config.constant';

@Component({
  selector: 'app-speed-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedChartComponent implements OnChanges {
  public lineChartData = LINE_CHART_DATA;
  public lineChartOptions = LINE_CHART_OPTIONS;
  public lineChartType = LINE_CHART_TYPE;

  @Input() routePoints?: IRoutePoint[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Tracking rout change
    if (changes['routePoints'] && this.routePoints) {
      this.updateChart();
    }
    this.chart?.update();
  }
  // Updating chart data according to the selected route
  public updateChart(): void {
    // Ensuring route readiness
    if (!this.routePoints) {
      return;
    }
    // Transform routePoints into a chart data format and update chart datasets and labels
    const data = this.routePoints.map((point) => ({
      x: new Date(point[2]).getTime(),
      y: point[3],
    }));
    this.lineChartData.datasets[0].data = data;
    this.lineChartData.labels = data.map((point) => new Date(point.x));
    this.cdr.markForCheck();
  }
}
