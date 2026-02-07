import type { CarouselWithProducts, SlimBanner } from './api';

/**
 * Type discriminator for home page sections
 */
export type HomeSectionType = 'carousel' | 'slim_banner';

/**
 * Base interface for all home sections
 */
interface BaseHomeSection {
  id: string;
  type: HomeSectionType;
  sortOrder: number;
}

/**
 * Carousel section in the home page
 */
export interface CarouselSection extends BaseHomeSection {
  type: 'carousel';
  data: CarouselWithProducts;
}

/**
 * Slim banner section in the home page
 */
export interface SlimBannerSection extends BaseHomeSection {
  type: 'slim_banner';
  data: SlimBanner;
}

/**
 * Union type for all possible home sections
 */
export type HomeSection = CarouselSection | SlimBannerSection;

/**
 * Type guard to check if a section is a carousel
 */
export function isCarouselSection(section: HomeSection): section is CarouselSection {
  return section.type === 'carousel';
}

/**
 * Type guard to check if a section is a slim banner
 */
export function isSlimBannerSection(section: HomeSection): section is SlimBannerSection {
  return section.type === 'slim_banner';
}
