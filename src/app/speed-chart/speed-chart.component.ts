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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() routePoints?: any[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routePoints'] && this.routePoints) {
      this.updateChart();
    }
  }

  // Updating chart data according to selected route
  updateChart(): void {
    if (!this.routePoints) {
      return;
    }

    const data = this.routePoints.map((point) => ({
      x: new Date(point[2]).getTime(),
      y: point[3],
    }));

    this.lineChartData.datasets[0].data = data;
    this.lineChartData.labels = data.map((point) => new Date(point.x));

    if (this.chart) {
      this.chart.update();
    }

    this.cdr.markForCheck();
  }
}
