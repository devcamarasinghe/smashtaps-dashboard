// src/types/index.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface FilterState {
  selectedCategory: string | null;
  selectedProducts: number[];
  hasFiltersChanged: boolean;
  isReportGenerated: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export type ChartType = 'pie' | 'bar';

export interface ChartConfig {
  type: ChartType;
  data: ChartData[];
  loading: boolean;
  error: string | null;
}
