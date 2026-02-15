'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBranding } from '@/lib/providers';
import { storefrontDefaults } from '@/lib/defaults/storefront-defaults';
import { Skeleton } from '@/components/ui';

interface StoreLogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export function StoreLogo({ variant = 'header', className = '' }: StoreLogoProps) {
  const { branding, isLoading } = useBranding();
  
  const logoUrl = variant === 'header' 
    ? branding?.headerLogoUrl 
    : branding?.footerLogoUrl;
  
  const storeName = branding?.storeName ?? storefrontDefaults.branding.storeName;

  if (isLoading) {
    const skeletonClassName = variant === 'header' ? 'h-8 w-[140px]' : 'h-10 w-[160px]';
    return <Skeleton className={`${skeletonClassName} ${className}`} />;
  }

  const logoBoxClassName = variant === 'header' ? 'h-8 w-[140px]' : 'h-10 w-[160px]';

  const content = logoUrl ? (
    <span className={`relative block ${logoBoxClassName} overflow-hidden ${className}`}>
      <Image
        src={logoUrl}
        alt={storeName}
        fill
        sizes="160px"
        className="object-cover object-center"
        priority={variant === 'header'}
      />
    </span>
  ) : (
    <span 
      className={`font-bold ${
        variant === 'header' 
          ? 'text-xl text-[var(--color-primary)]' 
          : 'text-2xl text-white'
      } ${logoBoxClassName} ${className} overflow-hidden whitespace-nowrap text-ellipsis`}
    >
      {storeName}
    </span>
  );

  return (
    <Link
      href="/"
      aria-label={storeName}
      className={`inline-flex items-center ${variant === 'header' ? 'h-8' : 'h-10'} shrink-0`}
    >
      {content}
    </Link>
  );
}
