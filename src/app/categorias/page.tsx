'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { useCategories } from '@/hooks';
import { Skeleton } from '@/components/ui';
import type { CategoryTree } from '@/types';

// Category card component
function CategoryCard({ category }: { category: CategoryTree }) {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all duration-200"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <FolderOpen className="h-16 w-16 text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {category.description}
          </p>
        )}
        {hasChildren && (
          <p className="mt-2 text-xs text-gray-400">
            {category.children.length} subcategoria{category.children.length !== 1 ? 's' : ''}
          </p>
        )}
        <div className="mt-3 flex items-center text-sm text-[var(--color-primary)] font-medium">
          Ver productos
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// Category skeleton for loading state
function CategorySkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function CategoriasPage() {
  const { data, isLoading, error } = useCategories();
  const categories = data?.data || [];

  // Filter only root categories (parentId is null)
  const rootCategories = categories.filter((cat) => !cat.parentId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Categorias
        </h1>
        <p className="mt-2 text-gray-600">
          Explora nuestras categorias de productos
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Error al cargar las categorias</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && !error && (
        <>
          {rootCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rootCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No hay categorias
              </h3>
              <p className="mt-2 text-gray-500">
                Aun no se han creado categorias en la tienda.
              </p>
            </div>
          )}
        </>
      )}

      {/* All Categories Tree View */}
      {!isLoading && !error && categories.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Todas las Categorias
          </h2>
          <div className="bg-white rounded-lg border divide-y">
            {categories.map((category) => (
              <CategoryTreeItem key={category.id} category={category} level={0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Tree view item component
function CategoryTreeItem({ category, level }: { category: CategoryTree; level: number }) {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <>
      <Link
        href={`/categorias/${category.slug}`}
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: `${16 + level * 24}px` }}
      >
        <div className="flex items-center gap-3">
          <FolderOpen className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-900">{category.name}</span>
          {hasChildren && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {category.children.length}
            </span>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </Link>
      {hasChildren &&
        category.children.map((child) => (
          <CategoryTreeItem key={child.id} category={child} level={level + 1} />
        ))}
    </>
  );
}
