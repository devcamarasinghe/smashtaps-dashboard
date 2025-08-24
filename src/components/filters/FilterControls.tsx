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
import { PlayArrow, Clear } from '@mui/icons-material';
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
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Stack spacing={3}>
          <CategoryFilter />
          <ProductFilter />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleRunReport}
              disabled={isRunReportDisabled}
              fullWidth
            >
              Run Report
            </Button>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClear}
              fullWidth
            >
              Clear
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FilterControls;
