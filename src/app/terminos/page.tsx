import type { Metadata } from 'next';
import { getStorefrontConfig } from '@/lib/api/storefront-server';
import { Markdown } from '@/components/content/markdown';

export const metadata: Metadata = {
  title: 'Terminos y Condiciones',
  description: 'Terminos y condiciones de uso de San Pablo.',
};

export default async function TerminosPage() {
  const config = await getStorefrontConfig();
  const content = config.legal?.termsMarkdown ?? '';

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Terminos y Condiciones
      </h1>

      {content.trim().length === 0 ? (
        <p className="text-gray-600">
          Aun no hay terminos y condiciones configurados.
        </p>
      ) : (
        <Markdown content={content} className="prose prose-gray max-w-none" />
      )}
    </div>
  );
}
