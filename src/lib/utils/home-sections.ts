import type {
  CarouselWithProducts,
  SlimBanner,
  HomeSection,
  CarouselSection,
  SlimBannerSection,
} from '@/types';

/**
 * Converts a carousel to a HomeSection
 */
function carouselToSection(carousel: CarouselWithProducts, index: number): CarouselSection {
  return {
    id: carousel.id,
    type: 'carousel',
    sortOrder: carousel.sortOrder ?? index,
    data: carousel,
  };
}

/**
 * Converts a slim banner to a HomeSection
 */
function slimBannerToSection(banner: SlimBanner, index: number): SlimBannerSection {
  return {
    id: banner.id,
    type: 'slim_banner',
    sortOrder: banner.sortOrder ?? index,
    data: banner,
  };
}

/**
 * Interleaves slim banners between carousels.
 * Pattern: carousel, slim_banner, carousel, slim_banner, ...
 * 
 * If there are more carousels than banners, remaining carousels are appended.
 * If there are more banners than carousels, remaining banners are appended.
 * 
 * @param carousels - Array of carousels with products
 * @param slimBanners - Array of slim banners
 * @returns Interleaved array of home sections
 */
export function interleaveHomeSections(
  carousels: CarouselWithProducts[],
  slimBanners: SlimBanner[]
): HomeSection[] {
  // Filter and sort carousels (only those with products)
  const validCarousels = carousels
    .filter((c) => c.products && c.products.length > 0 && c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Filter and sort slim banners (only active ones)
  const activeSlimBanners = slimBanners
    .filter((b) => b.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const sections: HomeSection[] = [];
  let carouselIndex = 0;
  let bannerIndex = 0;

  // Interleave: carousel first, then banner
  while (carouselIndex < validCarousels.length || bannerIndex < activeSlimBanners.length) {
    // Add a carousel if available
    if (carouselIndex < validCarousels.length) {
      sections.push(carouselToSection(validCarousels[carouselIndex], sections.length));
      carouselIndex++;
    }

    // Add a slim banner if available
    if (bannerIndex < activeSlimBanners.length) {
      sections.push(slimBannerToSection(activeSlimBanners[bannerIndex], sections.length));
      bannerIndex++;
    }
  }

  return sections;
}

/**
 * Creates an interleaved section list with a specific pattern.
 * Allows customizing how many carousels appear before each banner.
 * 
 * @param carousels - Array of carousels with products
 * @param slimBanners - Array of slim banners
 * @param carouselsPerBanner - Number of carousels to show before each banner (default: 1)
 * @returns Interleaved array of home sections
 */
export function interleaveHomeSectionsCustom(
  carousels: CarouselWithProducts[],
  slimBanners: SlimBanner[],
  carouselsPerBanner: number = 1
): HomeSection[] {
  // Filter and sort carousels (only those with products)
  const validCarousels = carousels
    .filter((c) => c.products && c.products.length > 0 && c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Filter and sort slim banners (only active ones)
  const activeSlimBanners = slimBanners
    .filter((b) => b.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const sections: HomeSection[] = [];
  let carouselIndex = 0;
  let bannerIndex = 0;

  while (carouselIndex < validCarousels.length) {
    // Add N carousels
    for (let i = 0; i < carouselsPerBanner && carouselIndex < validCarousels.length; i++) {
      sections.push(carouselToSection(validCarousels[carouselIndex], sections.length));
      carouselIndex++;
    }

    // Add a slim banner if available
    if (bannerIndex < activeSlimBanners.length) {
      sections.push(slimBannerToSection(activeSlimBanners[bannerIndex], sections.length));
      bannerIndex++;
    }
  }

  // Add any remaining banners at the end
  while (bannerIndex < activeSlimBanners.length) {
    sections.push(slimBannerToSection(activeSlimBanners[bannerIndex], sections.length));
    bannerIndex++;
  }

  return sections;
}
