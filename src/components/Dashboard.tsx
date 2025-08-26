// src/components/Dashboard.tsx
import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import FilterControls from './filters/FilterControls';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import { useFilterStore } from '../store/filterStore';
import { useChartData } from '../hooks/useChartData';
import { useCategories, useProductsByCategory } from '../hooks/useProductData';

const Dashboard: React.FC = () => {
  const {
    selectedCategory,
    selectedProducts,
    isReportGenerated,
  } = useFilterStore();

  const { pieChartData, barChartData } = useChartData();
  
  // Get loading states
  const { isLoading: categoriesLoading } = useCategories();
  const { isLoading: productsLoading } = useProductsByCategory(selectedCategory);

    // Chart display logic - pie chart remains until Run Report is clicked
    const shouldShowPieChart = !isReportGenerated;
    const shouldShowBarChart = selectedCategory && isReportGenerated;

  // Determine chart title for bar chart
  const getBarChartTitle = () => {
    if (selectedProducts.length > 0) {
      return 'Products in selected Category';
    }
    return `All Products in ${selectedCategory}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterControls />
        </Grid>

        {/* Chart Section */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <CardContent>
              {shouldShowPieChart && (
                <PieChart 
                  data={pieChartData} 
                  loading={categoriesLoading}
                />
              )}
              
              {shouldShowBarChart && (
                <BarChart
                  data={barChartData}
                  loading={productsLoading}
                  title={getBarChartTitle()}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
