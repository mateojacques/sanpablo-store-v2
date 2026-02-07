import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price as currency
 */
export function formatPrice(price: string | number, currency = 'ARS'): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(numericPrice);
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Generate a random session ID for guest carts
 */
export function generateSessionId(): string {
  return `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get session ID from localStorage or generate a new one
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }
  
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

/**
 * Clear session ID from localStorage
 */
export function clearSessionId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sessionId');
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Calculate effective price (sale price or regular price)
 */
export function getEffectivePrice(product: { regularPrice: string; salePrice: string | null }): number {
  const salePrice = product.salePrice ? parseFloat(product.salePrice) : null;
  const regularPrice = parseFloat(product.regularPrice);
  
  if (salePrice && salePrice < regularPrice) {
    return salePrice;
  }
  return regularPrice;
}

/**
 * Check if product is on sale
 */
export function isOnSale(product: { regularPrice: string; salePrice: string | null }): boolean {
  if (!product.salePrice) return false;
  return parseFloat(product.salePrice) < parseFloat(product.regularPrice);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(product: { regularPrice: string; salePrice: string | null }): number {
  if (!isOnSale(product)) return 0;
  const regular = parseFloat(product.regularPrice);
  const sale = parseFloat(product.salePrice!);
  return Math.round(((regular - sale) / regular) * 100);
}
