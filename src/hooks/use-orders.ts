import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import type { OrderFilters } from '@/types';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook to fetch user orders
 */
export function useOrders(filters?: OrderFilters) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => ordersApi.list(filters),
    enabled: isAuthenticated,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch a single order by ID
 */
export function useOrderById(id: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['order', 'id', id],
    queryFn: () => ordersApi.getById(id),
    enabled: isAuthenticated && !!id,
  });
}

/**
 * Hook to fetch a single order by order number
 */
export function useOrderByNumber(orderNumber: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['order', 'number', orderNumber],
    queryFn: () => ordersApi.getByNumber(orderNumber),
    enabled: isAuthenticated && !!orderNumber,
  });
}
