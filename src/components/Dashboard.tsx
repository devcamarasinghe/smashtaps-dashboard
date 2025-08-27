import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
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

    const { isLoading: categoriesLoading } = useCategories();
    const { isLoading: productsLoading } = useProductsByCategory(selectedCategory);

    const shouldShowPieChart = !isReportGenerated;
    const shouldShowBarChart = selectedCategory && isReportGenerated;

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
                    <Box sx={{ height: '580px' }}>
                        <FilterControls />
                    </Box>
                </Grid>

                {/* Chart Section */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box sx={{ height: '580px' }}>
                        <Card sx={{ height: '100%' }}> {/* Add height: '100%' to Card */}
                            <CardContent sx={{ height: '100%' }}> {/* Add height: '100%' to CardContent */}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                        color: '#2c3e50',
                                        textAlign: 'left',
                                    }}
                                >
                                    {shouldShowBarChart ? getBarChartTitle() : 'Product Categories Distribution'}
                                </Typography>
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
                                        title=''
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
