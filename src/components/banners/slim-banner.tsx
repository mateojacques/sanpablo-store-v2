'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useBanners } from '@/lib/providers';
import type { SlimBanner as SlimBannerType } from '@/types';

const DISMISSED_KEY = 'slim-banner-dismissed';

interface SlimBannerProps {
  className?: string;
}

/**
 * Slim banner component for promotional messages
 * Displays above the header
 */
export function SlimBanner({ className = '' }: SlimBannerProps) {
  const { banners, isLoading } = useBanners();
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to avoid flash

  const slimBanners = banners?.slim ?? [];
  const activeBanners = slimBanners
    .filter((b) => b.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  
  const currentBanner = activeBanners[0] as SlimBannerType | undefined;

  // Check localStorage on mount
  useEffect(() => {
    if (!currentBanner) return;
    
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const dismissedData = JSON.parse(dismissed);
      // If dismissed banner ID matches current banner, keep it hidden
      // Otherwise, show the new banner
      setIsDismissed(dismissedData.id === currentBanner.id);
    } else {
      setIsDismissed(false);
    }
  }, [currentBanner]);

  const handleDismiss = () => {
    if (currentBanner) {
      localStorage.setItem(
        DISMISSED_KEY,
        JSON.stringify({ id: currentBanner.id, timestamp: Date.now() })
      );
    }
    setIsDismissed(true);
  };

  // Don't render if loading, no banner, or dismissed
  if (isLoading || !currentBanner || isDismissed) {
    return null;
  }

  const backgroundColor = currentBanner.backgroundColor || 'var(--color-primary)';
  const textColor = currentBanner.textColor || '#ffffff';

  const content = (
    <span className="text-sm font-medium">{currentBanner.text}</span>
  );

  return (
    <div
      className={`relative py-2 px-4 text-center ${className}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-center">
        {currentBanner.link ? (
          <Link href={currentBanner.link} className="hover:underline">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
      
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Cerrar banner"
        style={{ color: textColor }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
