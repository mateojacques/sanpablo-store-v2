import { apiClient } from './client';
import type {
  StorefrontConfig,
  StorefrontBranding,
  StorefrontColors,
  StorefrontContact,
  StorefrontSeo,
  HeroBanner,
  SlimBanner,
  StorefrontFaq,
  ApiResponse,
} from '@/types';

export const storefrontApi = {
  /**
   * Get storefront configuration (public)
   */
  getConfig: () =>
    apiClient.get<ApiResponse<StorefrontConfig>>('/api/storefront/config'),

  /**
   * Update full storefront configuration (admin)
   */
  updateConfig: (data: Partial<StorefrontConfig>) =>
    apiClient.put<ApiResponse<StorefrontConfig>>('/api/storefront/config', data),

  /**
   * Update branding section (admin)
   */
  updateBranding: (data: Partial<StorefrontBranding>) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/branding', data),

  /**
   * Update colors section (admin)
   */
  updateColors: (data: Partial<StorefrontColors>) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/colors', data),

  /**
   * Update banners section (admin)
   */
  updateBanners: (data: { hero?: HeroBanner[]; slim?: SlimBanner[] }) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/banners', data),

  /**
   * Update FAQ section (admin)
   */
  updateFaq: (data: { faq: StorefrontFaq[] }) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/faq', data),

  /**
   * Update contact section (admin)
   */
  updateContact: (data: Partial<StorefrontContact>) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/contact', data),

  /**
   * Update SEO section (admin)
   */
  updateSeo: (data: Partial<StorefrontSeo>) =>
    apiClient.patch<ApiResponse<StorefrontConfig>>('/api/storefront/config/seo', data),

  /**
   * Upload storefront asset (admin)
   */
  uploadAsset: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>('/api/storefront/upload', file),
};
