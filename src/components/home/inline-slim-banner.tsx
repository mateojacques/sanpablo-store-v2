'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { SlimBanner } from '@/types';
import { Skeleton } from '@/components/ui';

interface InlineSlimBannerProps {
  banner: SlimBanner;
  className?: string;
}

/**
 * Inline slim banner component for displaying promotional messages
 * within the home page content flow (between carousels).
 * Different from SlimBanner which is displayed above the header.
 */
export function InlineSlimBanner({ banner, className = '' }: InlineSlimBannerProps) {
  const content = (
    <span className="relative block w-full overflow-hidden rounded-xl bg-gray-100 aspect-[1600/340]">
      <Image
        src={banner.imageUrl}
        alt="Promocion"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1280px"
      />
    </span>
  );

  return (
    <section className={`py-6 md:py-8 ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        {banner.link ? (
          <Link href={banner.link} className="block" aria-label="Abrir promocion">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

/**
 * Skeleton component for loading state
 */
export function InlineSlimBannerSkeleton() {
  return (
    <section className="py-6 md:py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <Skeleton className="w-full rounded-xl aspect-[1600/340]" />
      </div>
    </section>
  );
}
