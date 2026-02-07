'use client';

import type { ReactNode } from 'react';
import type { HomeSection, CarouselSection, SlimBannerSection } from '@/types';
import { isCarouselSection, isSlimBannerSection } from '@/types';
import { ProductCarousel, ProductCarouselSkeleton } from '@/components/carousels';
import { InlineSlimBanner, InlineSlimBannerSkeleton } from './inline-slim-banner';

/**
 * Strategy interface for rendering home sections
 */
interface SectionRenderStrategy<T extends HomeSection> {
  render: (section: T) => ReactNode;
  renderSkeleton: () => ReactNode;
}

/**
 * Strategy for rendering carousel sections
 */
const carouselStrategy: SectionRenderStrategy<CarouselSection> = {
  render: (section) => (
    <ProductCarousel key={section.id} carousel={section.data} />
  ),
  renderSkeleton: () => <ProductCarouselSkeleton />,
};

/**
 * Strategy for rendering slim banner sections
 */
const slimBannerStrategy: SectionRenderStrategy<SlimBannerSection> = {
  render: (section) => (
    <InlineSlimBanner key={section.id} banner={section.data} />
  ),
  renderSkeleton: () => <InlineSlimBannerSkeleton />,
};

/**
 * Registry mapping section types to their render strategies
 */
const sectionStrategies = {
  carousel: carouselStrategy,
  slim_banner: slimBannerStrategy,
} as const;

/**
 * Renders a single home section using the appropriate strategy
 */
export function renderHomeSection(section: HomeSection): ReactNode {
  if (isCarouselSection(section)) {
    return sectionStrategies.carousel.render(section);
  }
  if (isSlimBannerSection(section)) {
    return sectionStrategies.slim_banner.render(section);
  }
  // Exhaustive check - TypeScript will error if we miss a case
  const _exhaustiveCheck: never = section;
  return null;
}

/**
 * Props for the HomeSectionsRenderer component
 */
interface HomeSectionsRendererProps {
  sections: HomeSection[];
  isLoading?: boolean;
  skeletonCount?: number;
}

/**
 * Component that renders all home sections using the Strategy pattern.
 * This component is responsible for iterating over sections and delegating
 * rendering to the appropriate strategy based on section type.
 */
export function HomeSectionsRenderer({
  sections,
  isLoading = false,
  skeletonCount = 4,
}: HomeSectionsRendererProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={`skeleton-${index}`}>
            {index % 2 === 0 ? (
              sectionStrategies.carousel.renderSkeleton()
            ) : (
              sectionStrategies.slim_banner.renderSkeleton()
            )}
          </div>
        ))}
      </div>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => renderHomeSection(section))}
    </div>
  );
}
