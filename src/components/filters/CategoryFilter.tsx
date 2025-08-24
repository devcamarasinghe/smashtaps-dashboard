// src/components/filters/CategoryFilter.tsx
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

import { useCategories } from '../../hooks/useProductData';
import { useFilterStore } from '../../store/filterStore';

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useFilterStore();
  const { data: categories, isLoading, error } = useCategories();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedCategory(value || null);
  };

  if (isLoading) {
    return (
      <FormControl fullWidth>
        <CircularProgress size={24} />
      </FormControl>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load categories</Alert>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory || ''}
        onChange={handleChange}
        label="Category"
      >
        {categories?.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
