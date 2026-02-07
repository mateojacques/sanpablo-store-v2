'use client';

import { use } from 'react';
import Link from 'next/link';
import { ChevronRight, FolderOpen, ArrowLeft } from 'lucide-react';
import { useCategoryBySlug, useProducts, useCategories } from '@/hooks';
import { ProductGrid } from '@/components/features/products';
import { Pagination } from '@/components/features/products/pagination';
import { Button, Skeleton } from '@/components/ui';
import type { CategoryTree, ProductFilters } from '@/types';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { data: categoryData, isLoading: loadingCategory, error: categoryError } = useCategoryBySlug(slug);
  const { data: categoriesTree } = useCategories();
  
  const category = categoryData?.data;
  
  // Find subcategories from the tree
  const findCategory = (categories: CategoryTree[], targetId: string): CategoryTree | null => {
    for (const cat of categories) {
      if (cat.id === targetId) return cat;
      if (cat.children) {
        const found = findCategory(cat.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };
  
  const categoryWithChildren = category && categoriesTree?.data 
    ? findCategory(categoriesTree.data, category.id) 
    : null;
  
  const subcategories = categoryWithChildren?.children || [];

  // Products filter by category
  const filters: ProductFilters = {
    categoryId: category?.id,
    limit: 12,
    isActive: true,
  };

  // Breadcrumb helper - find parent categories
  const findParentPath = (categories: CategoryTree[], targetId: string, path: CategoryTree[] = []): CategoryTree[] | null => {
    for (const cat of categories) {
      if (cat.id === targetId) {
        return path;
      }
      if (cat.children) {
        const found = findParentPath(cat.children, targetId, [...path, cat]);
        if (found) return found;
      }
    }
    return null;
  };

  const parentPath = category && categoriesTree?.data 
    ? findParentPath(categoriesTree.data, category.id) || []
    : [];

  if (loadingCategory) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-6 w-96 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Categoria no encontrada
          </h2>
          <p className="mt-2 text-gray-500">
            La categoria que buscas no existe o fue eliminada.
          </p>
          <Link href="/categorias" className="mt-6 inline-block">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a categorias
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/categorias" className="hover:text-[var(--color-primary)]">
          Categorias
        </Link>
        {parentPath.map((parent) => (
          <span key={parent.id} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            <Link href={`/categorias/${parent.slug}`} className="hover:text-[var(--color-primary)]">
              {parent.name}
            </Link>
          </span>
        ))}
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Subcategorias
          </h2>
          <div className="flex flex-wrap gap-3">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/categorias/${sub.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 transition-colors"
              >
                <FolderOpen className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{sub.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Productos en {category.name}
        </h2>
        <ProductGrid filters={filters} emptyMessage={`No hay productos en la categoria "${category.name}"`} />
      </div>

      {/* Link to all products with this category filter */}
      <div className="mt-8 text-center">
        <Link href={`/productos?categoryId=${category.id}`}>
          <Button variant="outline">
            Ver todos los productos de {category.name}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
