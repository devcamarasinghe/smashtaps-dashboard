// src/hooks/useChartData.ts
import { useMemo } from 'react';
import { useCategories, useProductsByCategory, useAllProducts } from './useProductData';
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
  const { data: allProducts } = useAllProducts();

  const pieChartData: ChartData[] = useMemo(() => {
    if (!categories || !allProducts) return [];
    
    // Count products per category
    const categoryProductCounts: Record<string, number> = {};
    allProducts.forEach(product => {
      if (product.category) {
        categoryProductCounts[product.category] = (categoryProductCounts[product.category] || 0) + 1;
      }
    });
    
    const totalProductCount = allProducts.length;
    return categories.map((category) => {
      const count = categoryProductCounts[category.slug] || 0;
      return {
        name: category.name,
        value: totalProductCount > 0 ? (count / totalProductCount) * 100 : 0,
      };
    });
  }, [categories, allProducts]);

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
