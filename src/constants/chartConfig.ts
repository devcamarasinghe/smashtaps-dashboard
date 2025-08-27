export const PIE_CHART_CONFIG = {
  chart: {
    type: 'pie',
    height: 400,
  },
  title: {
    text: '',
  },
  tooltip: {
    pointFormat: '<b>{point.name}</b>: {point.percentage:.1f}%',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  accessibility: {
    enabled: false,
  },
};

export const BAR_CHART_CONFIG = {
  chart: {
    type: 'column',
    height: 400,
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
    },
  },
  yAxis: {
    title: {
      text: 'Price ($)',
    },
  },
  tooltip: {
    pointFormat: '<b>${point.y:.2f}</b>',
  },
  accessibility: {
    enabled: false,
  },
};
