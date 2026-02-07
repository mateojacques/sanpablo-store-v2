'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle, MapPin, Mail, Phone, User } from 'lucide-react';
import { Button, Card, Badge, Spinner } from '@/components/ui';
import { useOrderById } from '@/hooks/use-orders';
import { useAuthStore } from '@/stores/auth-store';
import { formatPrice, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info'; icon: typeof Clock }> = {
  pending: { label: 'Pendiente', variant: 'warning', icon: Clock },
  confirmed: { label: 'Confirmado', variant: 'info', icon: CheckCircle },
  processing: { label: 'En proceso', variant: 'info', icon: Package },
  shipped: { label: 'Enviado', variant: 'success', icon: Truck },
  delivered: { label: 'Entregado', variant: 'success', icon: CheckCircle },
  cancelled: { label: 'Cancelado', variant: 'danger', icon: XCircle },
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { data, isLoading, error } = useOrderById(id);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !data?.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Orden no encontrada</h1>
        <Link href="/mis-ordenes">
          <Button className="mt-6">Ver mis ordenes</Button>
        </Link>
      </div>
    );
  }

  const order = data.data;
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/mis-ordenes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Realizado el {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge variant={config.variant} size="md">
          <StatusIcon className="h-4 w-4 mr-1" />
          {config.label}
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacion de Contacto</h2>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <dt className="text-gray-500">Nombre</dt>
                <dd className="font-medium text-gray-900">{order.contactFullName}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium text-gray-900">{order.contactEmail}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <dt className="text-gray-500">Telefono</dt>
                <dd className="font-medium text-gray-900">{order.contactPhone}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <dt className="text-gray-500">Direccion</dt>
                <dd className="font-medium text-gray-900">{order.contactAddress}</dd>
              </div>
            </div>
          </dl>

          {order.customerNotes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <dt className="text-sm text-gray-500">Notas del cliente</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.customerNotes}</dd>
            </div>
          )}
        </Card>

        {/* Order Items */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos</h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-2 font-medium text-gray-500">Producto</th>
                <th className="text-center py-2 font-medium text-gray-500">Cant.</th>
                <th className="text-right py-2 font-medium text-gray-500">Precio</th>
                <th className="text-right py-2 font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3">
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-xs text-gray-500">SKU: {item.productSku}</p>
                  </td>
                  <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-600">
                    {formatPrice(item.unitPrice)}
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900">
                    {formatPrice(item.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Order Summary */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envio</span>
              <span className="text-gray-500">Incluido</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-[var(--color-primary)]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
