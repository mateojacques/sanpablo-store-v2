import { apiClient } from './client';
import type {
  CheckoutContactInput,
  CheckoutReview,
  CheckoutConfirmation,
  ApiResponse,
} from '@/types';

export const checkoutApi = {
  /**
   * Step 1 - Save contact information
   */
  saveContact: (data: CheckoutContactInput) =>
    apiClient.post<ApiResponse<{ message: string }>>('/api/checkout/contact', data),

  /**
   * Step 2 - Review order
   */
  review: () =>
    apiClient.get<ApiResponse<CheckoutReview>>('/api/checkout/review'),

  /**
   * Step 3 - Confirm order
   */
  confirm: () =>
    apiClient.post<ApiResponse<CheckoutConfirmation>>('/api/checkout/confirm'),
};
