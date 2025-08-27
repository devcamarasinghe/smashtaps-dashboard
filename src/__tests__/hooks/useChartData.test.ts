import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useChartData } from '../../hooks/useChartData'

// Mock the hooks
vi.mock('../../hooks/useProductData', () => ({
  useCategories: vi.fn(),
  useProductsByCategory: vi.fn(),
}))

vi.mock('../../store/filterStore', () => ({
  useFilterStore: vi.fn(),
}))

import { useCategories, useProductsByCategory } from '../../hooks/useProductData'
import { useFilterStore } from '../../store/filterStore'

describe('useChartData', () => {
  const mockCategories = [
    { slug: 'electronics', name: 'Electronics', url: '/electronics' },
    { slug: 'clothing', name: 'Clothing', url: '/clothing' },
    { slug: 'books', name: 'Books', url: '/books' }
  ]

  const mockProducts = [
    { id: 1, title: 'iPhone', price: 999, category: 'electronics' },
    { id: 2, title: 'MacBook', price: 1999, category: 'electronics' },
    { id: 3, title: 'T-Shirt', price: 29, category: 'clothing' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('pieChartData', () => {
    it('should return equal distribution for all categories', () => {
      // Setup mocks
      vi.mocked(useCategories).mockReturnValue({ 
        data: mockCategories 
      } as any)
      
      vi.mocked(useProductsByCategory).mockReturnValue({ 
        data: null 
      } as any)
      
      vi.mocked(useFilterStore).mockReturnValue({
        selectedCategory: null,
        selectedProducts: [],
        isReportGenerated: false
      } as any)

      const { result } = renderHook(() => useChartData())

      // Each category should have equal share (100/3 = 33.33%)
      expect(result.current.pieChartData).toHaveLength(3)
      expect(result.current.pieChartData[0]).toEqual({
        name: 'Electronics',
        value: 33.333333333333336
      })
      expect(result.current.pieChartData[1]).toEqual({
        name: 'Clothing', 
        value: 33.333333333333336
      })
      expect(result.current.pieChartData[2]).toEqual({
        name: 'Books',
        value: 33.333333333333336
      })
    })

    it('should return empty array when no categories', () => {
      vi.mocked(useCategories).mockReturnValue({ 
        data: null 
      } as any)
      
      vi.mocked(useProductsByCategory).mockReturnValue({ 
        data: null 
      } as any)
      
      vi.mocked(useFilterStore).mockReturnValue({
        selectedCategory: null,
        selectedProducts: [],
        isReportGenerated: false
      } as any)

      const { result } = renderHook(() => useChartData())

      expect(result.current.pieChartData).toEqual([])
    })
  })

  describe('barChartData', () => {
    it('should return empty array when report not generated', () => {
      vi.mocked(useCategories).mockReturnValue({ 
        data: mockCategories 
      } as any)
      
      vi.mocked(useProductsByCategory).mockReturnValue({ 
        data: mockProducts 
      } as any)
      
      vi.mocked(useFilterStore).mockReturnValue({
        selectedCategory: 'electronics',
        selectedProducts: [],
        isReportGenerated: false
      } as any)

      const { result } = renderHook(() => useChartData())

      expect(result.current.barChartData).toEqual([])
    })

    it('should return all products when report generated and no products selected', () => {
      vi.mocked(useCategories).mockReturnValue({ 
        data: mockCategories 
      } as any)
      
      vi.mocked(useProductsByCategory).mockReturnValue({ 
        data: mockProducts 
      } as any)
      
      vi.mocked(useFilterStore).mockReturnValue({
        selectedCategory: 'electronics',
        selectedProducts: [],
        isReportGenerated: true
      } as any)

      const { result } = renderHook(() => useChartData())

      expect(result.current.barChartData).toHaveLength(3)
      expect(result.current.barChartData[0]).toEqual({
        name: 'iPhone',
        value: 999
      })
      expect(result.current.barChartData[1]).toEqual({
        name: 'MacBook',
        value: 1999
      })
    })

    it('should return only selected products when specific products chosen', () => {
      vi.mocked(useCategories).mockReturnValue({ 
        data: mockCategories 
      } as any)
      
      vi.mocked(useProductsByCategory).mockReturnValue({ 
        data: mockProducts 
      } as any)
      
      vi.mocked(useFilterStore).mockReturnValue({
        selectedCategory: 'electronics',
        selectedProducts: [1], // Only iPhone
        isReportGenerated: true
      } as any)

      const { result } = renderHook(() => useChartData())

      expect(result.current.barChartData).toHaveLength(1)
      expect(result.current.barChartData[0]).toEqual({
        name: 'iPhone',
        value: 999
      })
    })
  })
})
