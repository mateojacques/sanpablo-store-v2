'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button, Card, Spinner } from '@/components/ui';
import { CheckoutSteps } from '@/components/features/checkout/checkout-steps';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="mt-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        Pedido Confirmado!
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Gracias por tu compra. Hemos recibido tu pedido.
      </p>

      {orderNumber && (
        <Card className="mt-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-gray-600">Numero de orden:</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">{orderNumber}</p>
          <p className="mt-4 text-sm text-gray-500">
            Te hemos enviado un correo con los detalles de tu pedido.
          </p>
        </Card>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/mis-ordenes">
          <Button>
            Ver mis ordenes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/productos">
          <Button variant="outline">
            Seguir comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ConfirmationFallback() {
  return (
    <div className="mt-12 flex justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <CheckoutSteps currentStep={3} />
      <Suspense fallback={<ConfirmationFallback />}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
