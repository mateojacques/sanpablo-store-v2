'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Shield, CreditCard, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroBanner } from '@/components/banners';
import { CarouselsSection } from '@/components/carousels';
import { ProductGrid } from '@/components/features/products/product-grid';
import { useStorefrontCarousels } from '@/hooks';

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
  const { data: carouselsData } = useStorefrontCarousels();
  const hasCarousels = carouselsData?.data && carouselsData.data.length > 0;

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Section */}
      <section className="bg-white border-b">
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
      </section>

      {/* Dynamic Product Carousels */}
      <CarouselsSection />

      {/* Fallback: Featured Products Section (shown when no carousels configured) */}
      {!hasCarousels && (
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

      {/* CTA Section */}
      <section className="bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Suscribete a nuestro boletin
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
              Recibe ofertas exclusivas, novedades y descuentos especiales directamente en tu correo.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electronico"
                className="flex-1 h-12 px-4 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button type="submit" size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
