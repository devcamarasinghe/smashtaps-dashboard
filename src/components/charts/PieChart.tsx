// src/components/charts/PieChart.tsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PIE_CHART_CONFIG } from '../../constants/chartConfig';
import type { ChartData } from '../../types';

interface PieChartProps {
  data: ChartData[];
  loading?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ data, loading }) => {
  const chartOptions = {
    ...PIE_CHART_CONFIG,
    series: [{
      name: 'Categories',
      colorByPoint: true,
      data: data.map(item => ({
        name: item.name,
        y: item.value,
      })),
    }],
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: 400 }}>
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="circular" width={300} height={300} sx={{ mx: 'auto' }} />
      </Box>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PieChart;
