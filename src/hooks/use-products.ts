import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '@/lib/api';
import type { ProductFilters } from '@/types';

/**
 * Hook to fetch products with filters
 */
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch a single product by SKU
 */
export function useProductBySku(sku: string) {
  return useQuery({
    queryKey: ['product', 'sku', sku],
    queryFn: () => productsApi.getBySku(sku),
    enabled: !!sku,
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProductById(id: string) {
  return useQuery({
    queryKey: ['product', 'id', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch categories tree
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => categoriesApi.getTree(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch flat categories list
 */
export function useFlatCategories() {
  return useQuery({
    queryKey: ['categories', 'flat'],
    queryFn: () => categoriesApi.getFlat(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch category by slug
 */
export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category', 'slug', slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
  });
}
