// src/store/filterStore.ts
import { create } from 'zustand';
import type { FilterState } from '../types';

interface FilterStore extends FilterState {
  setSelectedCategory: (category: string | null) => void;
  setSelectedProducts: (products: number[]) => void;
  clearFilters: () => void;
  markReportGenerated: () => void;
  resetReportState: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: null,
  selectedProducts: [],
  hasFiltersChanged: false,
  isReportGenerated: false,
  
  setSelectedCategory: (category) =>
    set(() => ({
      selectedCategory: category,
      selectedProducts: [], // Reset products when category changes
      hasFiltersChanged: true,
      isReportGenerated: false,
    })),
    
  setSelectedProducts: (products) =>
    set(() => ({
      selectedProducts: products,
      hasFiltersChanged: true,
      isReportGenerated: false,
    })),
    
  clearFilters: () =>
    set(() => ({
      selectedCategory: null,
      selectedProducts: [],
      hasFiltersChanged: false,
      isReportGenerated: false,
    })),
    
  markReportGenerated: () =>
    set(() => ({
      isReportGenerated: true,
      hasFiltersChanged: false,
    })),
    
  resetReportState: () =>
    set(() => ({
      isReportGenerated: false,
    })),
}));
