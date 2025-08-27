// src/components/filters/FilterControls.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import CategoryFilter from './CategoryFilter';
import ProductFilter from './ProductFilter';
import { useFilterStore } from '../../store/filterStore';

const FilterControls: React.FC = () => {
  const {
    selectedCategory,
    hasFiltersChanged,
    isReportGenerated,
    clearFilters,
    markReportGenerated,
  } = useFilterStore();

  const handleRunReport = () => {
    markReportGenerated();
  };

  const handleClear = () => {
    clearFilters();
  };

  const isRunReportDisabled = !selectedCategory || (!hasFiltersChanged && isReportGenerated);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Top Row: Filters title + Clear button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Filters
          </Typography>
          <Button
            variant="text"
            onClick={handleClear}
            size="small"
            sx={{
              color: '#1976d2',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              p: 0,
              minWidth: 'auto',
            }}
          >
            Clear
          </Button>
        </Box>

        {/* Middle: Dropdowns */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Stack spacing={2} mb={3}>
            <CategoryFilter />
            <ProductFilter />
          </Stack>
        </Box>

        {/* Bottom: Run Report button - fixed at bottom */}
        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={handleRunReport}
            disabled={isRunReportDisabled}
            fullWidth
          >
            Run Report
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterControls;