import axios from 'axios';
import type { Product, Category } from '../types';

const BASE_URL = 'https://dummyjson.com';

class ProductService {
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${BASE_URL}/products/categories`);
      return response.data.map((cat: any) => ({
        slug: cat.slug,
        name: cat.name,
        url: cat.url
      }));
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${BASE_URL}/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }
  }

  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${BASE_URL}/products?limit=100`);
      return response.data.products;
    } catch (error) {
      throw new Error('Failed to fetch all products');
    }
  }
}

export default ProductService;
