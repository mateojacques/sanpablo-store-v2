'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './product-card';
import { ProductGridSkeleton } from '@/components/ui';
import type { ProductFilters } from '@/types';

interface ProductGridProps {
  filters?: ProductFilters;
  limit?: number;
  emptyMessage?: string;
}

export function ProductGrid({ filters, limit, emptyMessage }: ProductGridProps) {
  const { data, isLoading, error } = useProducts({
    ...filters,
    limit: limit || filters?.limit || 20,
    isActive: true,
  });

  if (isLoading) {
    return <ProductGridSkeleton count={limit || 8} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar los productos</p>
        <p className="text-sm text-gray-500 mt-1">Por favor intenta de nuevo</p>
      </div>
    );
  }

  const products = data?.data || [];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-900 font-medium">{emptyMessage || 'No se encontraron productos'}</p>
        <p className="text-sm text-gray-500 mt-1">Intenta con otros filtros</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
