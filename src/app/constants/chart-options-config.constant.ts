import { ChartConfiguration } from 'chart.js';

export const LINE_CHART_OPTIONS: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',
      },
      title: {
        display: true,
        text: 'Time',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Speed (knots)',
      },
    },
  },
};
