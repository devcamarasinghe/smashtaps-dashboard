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
        {/* Top Row: Filters title + Clear button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Filters
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClear}
            size="small"
          >
            Clear
          </Button>
        </Box>

        {/* Middle: Dropdowns */}
        <Stack spacing={2} mb={3}>
          <CategoryFilter />
          <ProductFilter />
        </Stack>

        {/* Bottom: Run Report button */}
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={handleRunReport}
          disabled={isRunReportDisabled}
          fullWidth
        >
          Run Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterControls;