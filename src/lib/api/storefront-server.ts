import type { StorefrontConfig, ApiResponse } from '@/types';
import { storefrontDefaults } from '@/lib/defaults/storefront-defaults';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Fetch storefront config from the server (for use in Server Components and generateMetadata)
 * This function is cached by Next.js automatically
 */
export async function getStorefrontConfig(): Promise<StorefrontConfig> {
  try {
    const response = await fetch(`${API_URL}/api/storefront/config`, {
      next: { 
        revalidate: 300 // Revalidate every 5 minutes (matches client staleTime)
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch storefront config:', response.status);
      return storefrontDefaults;
    }

    const data: ApiResponse<StorefrontConfig> = await response.json();
    return data.data ?? storefrontDefaults;
  } catch (error) {
    console.error('Error fetching storefront config:', error);
    return storefrontDefaults;
  }
}

/**
 * Get branding section
 */
export async function getStorefrontBranding() {
  const config = await getStorefrontConfig();
  return config.branding;
}

/**
 * Get SEO section
 */
export async function getStorefrontSeo() {
  const config = await getStorefrontConfig();
  return config.seo;
}
