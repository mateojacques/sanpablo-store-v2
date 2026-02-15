'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Shield, CreditCard, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroBanner } from '@/components/banners';
import { HomeSectionsRenderer } from '@/components/home';
import { ProductGrid } from '@/components/features/products/product-grid';
import { useHomeSections } from '@/hooks';

const features = [
  {
    icon: Truck,
    title: 'Envio Gratis',
    description: 'En compras mayores a ARS 20.000',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Protegemos tus datos',
  },
  {
    icon: CreditCard,
    title: 'Pago Facil',
    description: 'Multiples metodos de pago',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte 24/7',
    description: 'Estamos para ayudarte',
  },
];

export default function HomePage() {
  const { sections, isLoading, hasContent } = useHomeSections();

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Section */}
      {/* <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex-shrink-0 p-2 bg-[var(--color-primary-50)] rounded-lg">
                  <feature.icon className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Dynamic Content: Interleaved Carousels & Slim Banners */}
      <section>
        <div className="mx-auto max-w-7xl">
          <HomeSectionsRenderer 
            sections={sections} 
            isLoading={isLoading}
            skeletonCount={4}
          />
        </div>
      </section>

      {/* Fallback: Featured Products Section (shown when no content configured) */}
      {!isLoading && !hasContent && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Productos Destacados
                </h2>
                <p className="mt-2 text-gray-600">
                  Los mas vendidos de nuestra tienda
                </p>
              </div>
              <Link href="/productos" className="hidden sm:flex items-center text-[var(--color-primary)] hover:opacity-80 font-medium">
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <ProductGrid limit={8} />
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/productos">
                <Button variant="outline">
                  Ver todos los productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Instagram Feed Section -- TODO: config this */}
      {/* <InstagramFeed maxPosts={6} /> */}
    </>
  );
}
