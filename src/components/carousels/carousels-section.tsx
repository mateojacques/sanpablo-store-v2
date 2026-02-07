'use client';

import { useStorefrontCarousels } from '@/hooks';
import { ProductCarousel, ProductCarouselSkeleton } from './product-carousel';

interface CarouselsSectionProps {
  /** Maximum number of carousels to display */
  maxCarousels?: number;
}

/**
 * Renders all active product carousels from the API
 * Uses the /carousels/storefront endpoint which returns carousels with products
 */
export function CarouselsSection({ maxCarousels }: CarouselsSectionProps) {
  const { data, isLoading, error } = useStorefrontCarousels();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <ProductCarouselSkeleton />
        <ProductCarouselSkeleton />
      </div>
    );
  }

  if (error || !data?.data) {
    // Silently fail - don't show error to users for optional content
    return null;
  }

  // Filter to only carousels with products and sort by sortOrder
  let carousels = data.data
    .filter((carousel) => carousel.products && carousel.products.length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Limit number of carousels if specified
  if (maxCarousels && maxCarousels > 0) {
    carousels = carousels.slice(0, maxCarousels);
  }

  if (carousels.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {carousels.map((carousel) => (
        <ProductCarousel key={carousel.id} carousel={carousel} />
      ))}
    </div>
  );
}
