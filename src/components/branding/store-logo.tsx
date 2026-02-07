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
    return <Skeleton className={`h-8 w-32 ${className}`} />;
  }

  const content = logoUrl ? (
    <Image
      src={logoUrl}
      alt={storeName}
      width={variant === 'header' ? 140 : 160}
      height={variant === 'header' ? 32 : 40}
      className="h-auto w-auto object-contain"
      priority={variant === 'header'}
    />
  ) : (
    <span 
      className={`font-bold ${
        variant === 'header' 
          ? 'text-xl text-[var(--color-primary)]' 
          : 'text-2xl text-white'
      } ${className}`}
    >
      {storeName}
    </span>
  );

  return (
    <Link href="/" className="flex items-center gap-2 h-10 w-50">
      {content}
    </Link>
  );
}
