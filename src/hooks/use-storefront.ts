import { useQuery } from '@tanstack/react-query';
import { storefrontApi } from '@/lib/api';

/**
 * Hook to fetch storefront configuration
 */
export function useStorefrontConfig() {
  return useQuery({
    queryKey: ['storefront', 'config'],
    queryFn: () => storefrontApi.getConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get specific storefront sections
 */
export function useStorefrontBranding() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.branding,
  };
}

export function useStorefrontColors() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.colors,
  };
}

export function useStorefrontBanners() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.banners,
  };
}

export function useStorefrontFaq() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.faq,
  };
}

export function useStorefrontContact() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.contact,
  };
}

export function useStorefrontSeo() {
  const { data, ...rest } = useStorefrontConfig();
  return {
    ...rest,
    data: data?.data?.seo,
  };
}
