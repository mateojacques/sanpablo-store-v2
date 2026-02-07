'use client';

import type { ReactNode } from 'react';
import { QueryProvider, StorefrontProvider } from '@/lib/providers';
import { ToastProvider } from '@/components/ui';
import { ThemeStyles } from '@/components/theme';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <StorefrontProvider>
        <ThemeStyles />
        <ToastProvider>
          {children}
        </ToastProvider>
      </StorefrontProvider>
    </QueryProvider>
  );
}
