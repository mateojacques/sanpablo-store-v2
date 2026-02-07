import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/lib/api';
import type { Cart, ApiResponse, AddToCartInput } from '@/types';
import { getOrCreateSessionId } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

// Ensure session ID exists for guest users
function ensureSessionId() {
  if (typeof window !== 'undefined') {
    getOrCreateSessionId();
  }
}

/**
 * Hook to fetch the current cart
 */
export function useCart() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      ensureSessionId();
      return cartApi.get();
    },
    staleTime: 30 * 1000, // 30 seconds
    enabled: typeof window !== 'undefined',
  });
}

/**
 * Hook to add an item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartInput) => {
      ensureSessionId();
      return cartApi.addItem(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

/**
 * Hook to update cart item quantity
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return cartApi.updateItem(itemId, { quantity });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

/**
 * Hook to remove item from cart
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => {
      return cartApi.removeItem(itemId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

/**
 * Hook to clear the cart
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

/**
 * Hook to merge guest cart with user cart after login
 */
export function useMergeCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => cartApi.merge({ sessionId }),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}
