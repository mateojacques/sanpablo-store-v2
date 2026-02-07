import { apiClient } from './client';
import type {
  Cart,
  ApiResponse,
  AddToCartInput,
  UpdateCartItemInput,
  MergeCartInput,
} from '@/types';

export const cartApi = {
  /**
   * Get current cart
   */
  get: () =>
    apiClient.get<ApiResponse<Cart>>('/api/cart'),

  /**
   * Add item to cart
   */
  addItem: (data: AddToCartInput) =>
    apiClient.post<ApiResponse<Cart>>('/api/cart/items', data),

  /**
   * Update item quantity
   */
  updateItem: (itemId: string, data: UpdateCartItemInput) =>
    apiClient.put<ApiResponse<Cart>>(`/api/cart/items/${itemId}`, data),

  /**
   * Remove item from cart
   */
  removeItem: (itemId: string) =>
    apiClient.delete<ApiResponse<Cart>>(`/api/cart/items/${itemId}`),

  /**
   * Clear cart
   */
  clear: () =>
    apiClient.delete<ApiResponse<Cart>>('/api/cart'),

  /**
   * Merge guest cart to user cart
   */
  merge: (data: MergeCartInput) =>
    apiClient.post<ApiResponse<Cart>>('/api/cart/merge', data),
};
