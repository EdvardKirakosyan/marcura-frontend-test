import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'chart.js';

export const LINE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      label: 'Speed',
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.3)',
      fill: true,
      hidden: false,
    },
  ],
};

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

export const LINE_CHART_TYPE: ChartType = 'line';
