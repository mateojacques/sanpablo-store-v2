import { apiClient } from './client';
import type {
  Category,
  CategoryTree,
  ApiResponse,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/types';

export const categoriesApi = {
  /**
   * Get all categories as tree structure
   */
  getTree: () =>
    apiClient.get<ApiResponse<CategoryTree[]>>('/api/categories'),

  /**
   * Get all categories as flat list
   */
  getFlat: () =>
    apiClient.get<ApiResponse<Category[]>>('/api/categories/flat'),

  /**
   * Get category by ID
   */
  getById: (id: string) =>
    apiClient.get<ApiResponse<Category>>(`/api/categories/${id}`),

  /**
   * Get category by slug
   */
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Category>>(`/api/categories/slug/${slug}`),

  /**
   * Create a new category (admin)
   */
  create: (data: CreateCategoryInput) =>
    apiClient.post<ApiResponse<Category>>('/api/categories', data),

  /**
   * Update a category (admin)
   */
  update: (id: string, data: UpdateCategoryInput) =>
    apiClient.put<ApiResponse<Category>>(`/api/categories/${id}`, data),

  /**
   * Delete a category (admin)
   */
  delete: (id: string) =>
    apiClient.delete<void>(`/api/categories/${id}`),

  /**
   * Reorder categories (admin)
   */
  reorder: (categories: Array<{ id: string; parentId?: string | null; sortOrder: number }>) =>
    apiClient.put<ApiResponse<CategoryTree[]>>('/api/categories/reorder', { categories }),
};
