'use client';

import { useColors } from '@/lib/providers';
import { storefrontDefaults } from '@/lib/defaults/storefront-defaults';

/**
 * Injects dynamic CSS variables based on storefront colors configuration.
 * Must be rendered inside StorefrontProvider.
 */
export function ThemeStyles() {
  const { colors } = useColors();
  
  // Use colors from config or fall back to defaults
  const c = colors ?? storefrontDefaults.colors;

  // Generate CSS with dynamic variables
  const css = `
    :root {
      --color-primary: ${c.primary};
      --color-primary-dark: color-mix(in srgb, ${c.primary} 85%, black);
      --color-primary-light: color-mix(in srgb, ${c.primary} 85%, white);
      --color-primary-50: color-mix(in srgb, ${c.primary} 10%, white);
      --color-primary-100: color-mix(in srgb, ${c.primary} 20%, white);
      --color-secondary: ${c.secondary};
      --color-secondary-dark: color-mix(in srgb, ${c.secondary} 85%, black);
      --color-accent: ${c.accent};
      --color-accent-dark: color-mix(in srgb, ${c.accent} 85%, black);
      --color-background: ${c.background};
      --color-surface: ${c.background};
      --color-text: ${c.text};
      --color-text-muted: ${c.textMuted};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
