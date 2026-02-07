import { useMemo } from 'react';
import { useStorefrontCarousels, useStorefrontBanners } from '@/hooks';
import { interleaveHomeSections } from '@/lib/utils';
import type { HomeSection } from '@/types';

interface UseHomeSectionsResult {
  sections: HomeSection[];
  isLoading: boolean;
  error: Error | null;
  hasContent: boolean;
}

/**
 * Hook that fetches and interleaves carousels and slim banners
 * for the home page using the Strategy pattern data structure.
 * 
 * @returns Object containing interleaved sections, loading state, and error
 */
export function useHomeSections(): UseHomeSectionsResult {
  const { 
    data: carouselsData, 
    isLoading: carouselsLoading, 
    error: carouselsError 
  } = useStorefrontCarousels();
  
  const { 
    data: bannersData, 
    isLoading: bannersLoading, 
    error: bannersError 
  } = useStorefrontBanners();

  const isLoading = carouselsLoading || bannersLoading;
  const error = carouselsError || bannersError;

  const sections = useMemo(() => {
    if (isLoading || error) {
      return [];
    }


    const carousels = carouselsData?.data ?? [];
    const slimBanners = bannersData?.slim ?? [];

    return interleaveHomeSections(carousels, slimBanners);
  }, [carouselsData, bannersData, isLoading, error]);

  const hasContent = sections.length > 0;

  return {
    sections,
    isLoading,
    error: error as Error | null,
    hasContent,
  };
}
