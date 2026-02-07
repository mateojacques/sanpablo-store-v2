import { useQuery } from '@tanstack/react-query';
import { carouselsApi } from '@/lib/api';

/**
 * Hook to fetch all active carousels with products for the storefront
 * Uses the /carousels/storefront endpoint
 */
export function useStorefrontCarousels() {
  return useQuery({
    queryKey: ['carousels', 'storefront'],
    queryFn: () => carouselsApi.getStorefront(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch a carousel by slug
 */
export function useCarouselBySlug(slug: string) {
  return useQuery({
    queryKey: ['carousel', 'slug', slug],
    queryFn: () => carouselsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook to fetch a carousel by ID
 */
export function useCarouselById(id: string) {
  return useQuery({
    queryKey: ['carousel', 'id', id],
    queryFn: () => carouselsApi.getById(id),
    enabled: !!id,
  });
}
