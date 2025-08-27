import React, { useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

import { useProductsByCategory } from '../../hooks/useProductData';
import { useFilterStore } from '../../store/filterStore';

const ProductFilter: React.FC = () => {
  const { selectedCategory, selectedProducts, setSelectedProducts } = useFilterStore();
  const { data: products, isLoading, error } = useProductsByCategory(selectedCategory);

  const handleChange = useCallback((event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;
    setSelectedProducts(typeof value === 'string' ? [] : value);
  }, [setSelectedProducts]);

  if (!selectedCategory) {
    return null;
  }

  if (isLoading) {
    return (
      <FormControl fullWidth>
        <CircularProgress size={24} />
      </FormControl>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load products</Alert>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Products</InputLabel>
      <Select
        multiple
        value={selectedProducts}
        onChange={handleChange}
        label="Products"
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((productId) => {
              const product = products?.find(p => p.id === productId);
              return (
                <Chip
                  key={productId}
                  label={product?.title || `Product ${productId}`}
                  size="small"
                />
              );
            })}
          </Box>
        )}
      >
        {products?.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.title} - ${product.price}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductFilter;
