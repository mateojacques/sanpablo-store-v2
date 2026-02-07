import { apiClient } from './client';
import type { 
  ApiResponse, 
  CarouselWithProducts
} from '@/types';

/**
 * Carousels API client
 * Handles fetching product carousels for the storefront
 */
export const carouselsApi = {
  /**
   * Get all active carousels with their products for the storefront
   * This is the main endpoint for displaying carousels on the home page
   */
  async getStorefront(): Promise<ApiResponse<CarouselWithProducts[]>> {
    return apiClient.get<ApiResponse<CarouselWithProducts[]>>('/api/carousels/storefront');
  },

  /**
   * Get a single carousel by slug
   * @param slug - Carousel slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<CarouselWithProducts>> {
    return apiClient.get<ApiResponse<CarouselWithProducts>>(`/api/carousels/slug/${slug}`);
  },

  /**
   * Get a single carousel by ID
   * @param id - Carousel ID
   */
  async getById(id: string): Promise<ApiResponse<CarouselWithProducts>> {
    return apiClient.get<ApiResponse<CarouselWithProducts>>(`/api/carousels/${id}`);
  },
};
