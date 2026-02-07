import { apiClient } from './client';
import type {
  Order,
  OrderFilters,
  ApiResponse,
  PaginatedResponse,
  UpdateOrderStatusInput,
} from '@/types';

export const ordersApi = {
  /**
   * List orders (users see their own, admins see all)
   */
  list: (filters?: OrderFilters) =>
    apiClient.get<PaginatedResponse<Order>>('/api/orders', filters as Record<string, unknown>),

  /**
   * Get order by ID
   */
  getById: (id: string) =>
    apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`),

  /**
   * Get order by order number
   */
  getByNumber: (orderNumber: string) =>
    apiClient.get<ApiResponse<Order>>(`/api/orders/number/${orderNumber}`),

  /**
   * Update order status (admin only)
   */
  updateStatus: (id: string, data: UpdateOrderStatusInput) =>
    apiClient.put<ApiResponse<Order>>(`/api/orders/${id}/status`, data),

  /**
   * Delete order (admin only)
   */
  delete: (id: string) =>
    apiClient.delete<void>(`/api/orders/${id}`),
};
