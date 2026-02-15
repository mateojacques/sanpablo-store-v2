'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { useBanners } from '@/lib/providers';
import type { HeroBanner as HeroBannerType } from '@/types';

interface HeroBannerProps {
  className?: string;
}

/**
 * Fallback hero when no banners are configured
 */
function HeroBannerFallback() {
  return (
    <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Tu tienda de arte y libreria favorita
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-90">
            Descubre nuestra coleccion de productos para artistas, estudiantes y creativos. 
            Calidad garantizada y los mejores precios.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/productos">
              <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 w-full sm:w-auto">
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/categorias">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Explorar Categorias
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Banner slide content (images + overlay text)
 */
function BannerSlideContent({ banner }: { banner: HeroBannerType }) {
  const altText = banner.altText || banner.title || 'Banner promocional';

  return (
    <div className="relative w-full h-[400px]">
      {/* Desktop Image */}
      <Image
        src={banner.imageUrl}
        alt={altText}
        fill
        className="object-cover hidden md:block"
        priority
      />
      {/* Mobile Image */}
      <Image
        src={banner.mobileImageUrl || banner.imageUrl}
        alt={altText}
        fill
        className="object-cover md:hidden"
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            {banner.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {banner.title}
              </h2>
            )}
            {banner.subtitle && (
              <p className="mt-4 text-lg md:text-xl opacity-90">
                {banner.subtitle}
              </p>
            )}
            {banner.ctaText && banner.ctaLink && (
              <div className="mt-8">
                <Link href={banner.ctaLink}>
                  <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
                    {banner.ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Determines if ctaLink should wrap the entire banner.
 * Wraps when ctaLink exists but ctaText does not (no CTA button visible).
 */
function isFullBannerLink(banner: HeroBannerType): boolean {
  return Boolean(banner.ctaLink) && !banner.ctaText;
}

/**
 * Single banner slide — wraps in a link when ctaLink exists without ctaText
 */
function BannerSlide({ banner }: { banner: HeroBannerType }) {
  if (isFullBannerLink(banner)) {
    return (
      <Link href={banner.ctaLink!} className="block">
        <BannerSlideContent banner={banner} />
      </Link>
    );
  }

  return <BannerSlideContent banner={banner} />;
}

/**
 * Loading skeleton for hero banner
 */
function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200">
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-40 mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroBanner({ className = '' }: HeroBannerProps) {
  const { banners, isLoading } = useBanners();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroBanners = banners?.hero ?? [];
  const sortedBanners = [...heroBanners].sort((a, b) => a.sortOrder - b.sortOrder);

  // Auto-advance carousel
  useEffect(() => {
    if (sortedBanners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sortedBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sortedBanners.length]);

  if (isLoading) {
    return <HeroBannerSkeleton />;
  }

  // Use fallback if no banners configured
  if (sortedBanners.length === 0) {
    return <HeroBannerFallback />;
  }

  // Single banner - no carousel needed
  if (sortedBanners.length === 1) {
    return (
      <section className={className}>
        <BannerSlide banner={sortedBanners[0]} />
      </section>
    );
  }

  // Multiple banners - carousel
  return (
    <section className={`relative ${className}`}>
      {/* Slides */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sortedBanners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <BannerSlide banner={banner} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + sortedBanners.length) % sortedBanners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % sortedBanners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sortedBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
