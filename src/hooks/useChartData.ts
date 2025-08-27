// src/hooks/useChartData.ts
import { useMemo } from 'react';
import { useCategories, useProductsByCategory } from './useProductData';
import { useFilterStore } from '../store/filterStore';
import type { ChartData } from '../types';

export const useChartData = () => {
  const {
    selectedCategory,
    selectedProducts,
    isReportGenerated,
  } = useFilterStore();

  const { data: categories } = useCategories();
  const { data: products } = useProductsByCategory(selectedCategory);

  const pieChartData: ChartData[] = useMemo(() => {
    if (!categories) return [];
    
    // Equally divide the pie chart among all categories
    const totalCategories = categories.length;
    const equalValue = totalCategories > 0 ? 100 / totalCategories : 0;
    
    return categories.map((category) => ({
      name: category.name,
      value: equalValue,
    }));
  }, [categories]);

  const barChartData: ChartData[] = useMemo(() => {
    if (!products || !isReportGenerated) return [];
    
    const filteredProducts = selectedProducts.length > 0
      ? products.filter(p => selectedProducts.includes(p.id))
      : products;
      
    return filteredProducts.map(product => ({
      name: product.title,
      value: product.price,
    }));
  }, [products, selectedProducts, isReportGenerated]);

  return {
    pieChartData,
    barChartData,
  };
};
