// src/components/charts/BarChart.tsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BAR_CHART_CONFIG } from '../../constants/chartConfig';
import type { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData[];
  loading?: boolean;
  title?: string;
}

import { useFilterStore } from '../../store/filterStore';

const BarChart: React.FC<BarChartProps> = ({ data, loading, title }) => {
  const selectedCategory = useFilterStore(state => state.selectedCategory);
  const chartOptions = {
    ...BAR_CHART_CONFIG,
    title: {
      text: title || '',
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      ...BAR_CHART_CONFIG.yAxis,
      title: {
        text: selectedCategory || 'Category',
      },
    },
    series: [{
      name: selectedCategory || 'Category',
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
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={40} height={20} />
          ))}
        </Box>
      </Box>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChart;
