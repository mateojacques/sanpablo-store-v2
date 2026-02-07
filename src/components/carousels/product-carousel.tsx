'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart, Package, ArrowRight } from 'lucide-react';
import type { CarouselWithProducts, Product } from '@/types';
import { Button, Badge, Skeleton } from '@/components/ui';
import { formatPrice, isOnSale, getDiscountPercentage, getEffectivePrice, cn } from '@/lib/utils';
import { useAddToCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/toast';

interface ProductCarouselProps {
  carousel: CarouselWithProducts;
}

function CarouselProductCard({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const { success, error } = useToast();
  
  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);
  const effectivePrice = getEffectivePrice(product);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1 });
      success('Producto agregado', `${product.name} se agrego al carrito`);
    } catch (err) {
      error('Error', 'No se pudo agregar el producto al carrito');
    }
  };

  return (
    <div className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] group bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      {/* Image Container */}
      <Link href={`/productos/${product.sku}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-12 w-12 text-gray-300" />
          </div>
        )}
        
        {/* Sale Badge */}
        {onSale && (
          <div className="absolute top-2 left-2">
            <Badge variant="danger" size="sm">-{discount}%</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link href={`/productos/${product.sku}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[var(--color-primary)] transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-[var(--color-primary)]">
            {formatPrice(effectivePrice)}
          </span>
          {onSale && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          isLoading={addToCart.isPending}
          disabled={!product.isActive}
          className="mt-2 w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </div>
    </div>
  );
}

export function ProductCarousel({ carousel }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [carousel.products]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!carousel.products || carousel.products.length === 0) {
    return null;
  }

  // Determine the link for "Ver todos"
  const viewAllLink = carousel.type === 'category' && carousel.categoryId
    ? `/productos?categoryId=${carousel.categoryId}`
    : `/productos`;

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {carousel.name}
          </h2>
          {carousel.description && (
            <p className="mt-1 text-sm text-gray-500">{carousel.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'p-2 rounded-full border transition-colors',
                canScrollLeft
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'p-2 rounded-full border transition-colors',
                canScrollRight
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* View All Link */}
          <Link
            href={viewAllLink}
            className="hidden sm:flex items-center text-sm font-medium text-[var(--color-primary)] hover:opacity-80 transition-opacity"
          >
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {carousel.products.map((product) => (
            <CarouselProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* View All - Mobile */}
      <div className="sm:hidden px-4 mt-4">
        <Link href={viewAllLink}>
          <Button variant="outline" className="w-full">
            Ver todos los productos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// Skeleton component for loading state
export function ProductCarouselSkeleton() {
  return (
    <section className="py-8">
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-64 mt-2" />
      </div>
      <div className="flex gap-4 overflow-hidden px-4 sm:px-6 lg:px-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px]"
          >
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-3/4 mt-3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
            <Skeleton className="h-9 w-full mt-3" />
          </div>
        ))}
      </div>
    </section>
  );
}
