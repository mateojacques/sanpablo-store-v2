'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Button, Input, Select, Skeleton } from '@/components/ui';
import { ProductGrid } from '@/components/features/products';
import { useProducts, useFlatCategories } from '@/hooks';
import { Pagination } from '@/components/features/products/pagination';
import type { ProductFilters } from '@/types';

const sortOptions = [
  { value: 'createdAt-desc', label: 'Mas recientes' },
  { value: 'createdAt-asc', label: 'Mas antiguos' },
  { value: 'name-asc', label: 'Nombre A-Z' },
  { value: 'name-desc', label: 'Nombre Z-A' },
  { value: 'price-asc', label: 'Precio menor a mayor' },
  { value: 'price-desc', label: 'Precio mayor a menor' },
];

function ProductosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse URL params
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortParam = searchParams.get('sort') || 'createdAt-desc';
  const [sortBy, sortOrder] = sortParam.split('-') as [ProductFilters['sortBy'], ProductFilters['sortOrder']];

  // Local state for inputs
  const [searchInput, setSearchInput] = useState(search);
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

  // Fetch categories
  const { data: categoriesData } = useFlatCategories();
  const categories = categoriesData?.data || [];

  // Build filters
  const filters: ProductFilters = {
    page,
    limit: 12,
    search: search || undefined,
    categoryId: categoryId || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sortBy: sortBy || 'createdAt',
    sortOrder: sortOrder || 'desc',
    isActive: true,
  };

  // Fetch products
  const { data } = useProducts(filters);
  const products = data?.data || [];
  const meta = data?.meta;

  // Update URL params
  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset page when filters change
    if (!updates.hasOwnProperty('page')) {
      params.set('page', '1');
    }

    router.push(`/productos?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput || undefined });
  };

  const handlePriceFilter = () => {
    updateParams({
      minPrice: minPriceInput || undefined,
      maxPrice: maxPriceInput || undefined,
    });
  };

  const clearFilters = () => {
    setSearchInput('');
    setMinPriceInput('');
    setMaxPriceInput('');
    router.push('/productos');
  };

  const hasActiveFilters = search || categoryId || minPrice || maxPrice;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateParams({ categoryId: undefined })}
            className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
              !categoryId ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todas las categorias
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams({ categoryId: cat.id })}
              className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
                categoryId === cat.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Rango de Precio</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            className="w-20"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            className="w-20"
          />
          <Button size="sm" onClick={handlePriceFilter}>
            Aplicar
          </Button>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Productos</h1>
          {meta && (
            <p className="mt-1 text-sm text-gray-500">
              Mostrando {products.length} de {meta.total} productos
            </p>
          )}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button type="submit">Buscar</Button>
          </form>

          <Select
            options={sortOptions}
            value={sortParam}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-lg border p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
            <FiltersContent />
          </div>
        </aside>

        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-2 bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full">
                Activos
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Filters Drawer */}
        {mobileFiltersOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 p-4 overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FiltersContent />
            </div>
          </>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid filters={filters} />

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={(newPage: number) => updateParams({ page: String(newPage) })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProductosFallback() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-1 h-5 w-64" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </>
  );
}

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<ProductosFallback />}>
        <ProductosContent />
      </Suspense>
    </div>
  );
}
