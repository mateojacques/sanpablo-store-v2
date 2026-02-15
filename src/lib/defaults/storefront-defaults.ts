import type { StorefrontConfig } from '@/types';

/**
 * Default storefront configuration values
 * Used as fallback when API data is unavailable
 */
export const storefrontDefaults: StorefrontConfig = {
  version: '1.0',
  lastUpdated: new Date().toISOString(),
  
  branding: {
    storeName: 'San Pablo',
    tagline: 'Arte y Libros',
    headerLogoUrl: '',
    footerLogoUrl: '',
    faviconUrl: '',
  },
  
  colors: {
    primary: '#4a90d9',
    secondary: '#2c5282',
    accent: '#ed8936',
    background: '#ffffff',
    text: '#1a202c',
    textMuted: '#718096',
  },
  
  banners: {
    hero: [],
    slim: [],
  },
  
  faq: [],
  
  contact: {
    whatsappNumber: '+5491123456789',
    email: 'contacto@sanpablo.com',
    phone: '+54 11 4321-1234',
    address: 'Av. Corrientes 1234, CABA, Argentina',
    socialLinks: {
      whatsapp: '',
    },
  },
  
  seo: {
    metaTitle: 'San Pablo - Arte y Libros',
    metaDescription: 'Tu tienda de arte y libreria favorita',
    ogImage: '',
  },

  legal: {
    termsMarkdown: '',
  },
};

/**
 * Get a specific section with defaults merged
 */
export function withDefaults<K extends keyof StorefrontConfig>(
  section: K,
  data: StorefrontConfig[K] | undefined
): StorefrontConfig[K] {
  if (!data) return storefrontDefaults[section];
  return data;
}
