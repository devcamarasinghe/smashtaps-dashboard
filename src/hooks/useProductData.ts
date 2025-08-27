import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/productService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ProductService.getCategories,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (category: string | null) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => ProductService.getProductsByCategory(category!),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['allProducts'],
    queryFn: ProductService.getAllProducts,
    staleTime: 5 * 60 * 1000,
  });
};
