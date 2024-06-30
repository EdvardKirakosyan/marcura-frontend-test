import { ChartConfiguration } from 'chart.js';

export const LINE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      label: 'Speed (knots)',
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.3)',
      fill: true,
      hidden: false,
    },
  ],
  labels: [],
};
