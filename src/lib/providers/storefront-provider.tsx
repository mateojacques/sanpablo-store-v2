'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStorefrontConfig } from '@/hooks';
import type { StorefrontConfig } from '@/types';

interface StorefrontContextValue {
  config: StorefrontConfig | undefined;
  isLoading: boolean;
  error: Error | null;
}

const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

interface StorefrontProviderProps {
  children: ReactNode;
}

export function StorefrontProvider({ children }: StorefrontProviderProps) {
  const { data, isLoading, error } = useStorefrontConfig();

  const value: StorefrontContextValue = {
    config: data?.data,
    isLoading,
    error: error as Error | null,
  };

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (context === undefined) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return context;
}

// Convenience hooks for specific sections
export function useBranding() {
  const { config, isLoading, error } = useStorefront();
  return { branding: config?.branding, isLoading, error };
}

export function useColors() {
  const { config, isLoading, error } = useStorefront();
  return { colors: config?.colors, isLoading, error };
}

export function useBanners() {
  const { config, isLoading, error } = useStorefront();
  return { banners: config?.banners, isLoading, error };
}

export function useFaq() {
  const { config, isLoading, error } = useStorefront();
  return { faq: config?.faq, isLoading, error };
}

export function useContact() {
  const { config, isLoading, error } = useStorefront();
  return { contact: config?.contact, isLoading, error };
}

export function useSeo() {
  const { config, isLoading, error } = useStorefront();
  return { seo: config?.seo, isLoading, error };
}
