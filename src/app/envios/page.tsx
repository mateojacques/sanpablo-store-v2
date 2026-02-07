import { Truck, Clock, MapPin, Package } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envios',
  description: 'Informacion sobre nuestros tiempos y costos de envio.',
};

const shippingInfo = [
  {
    icon: Truck,
    title: 'Envio a Domicilio',
    description: 'Entregamos en todo el Peru. Los tiempos de entrega varian segun tu ubicacion.',
  },
  {
    icon: Clock,
    title: 'Tiempos de Entrega',
    description: 'Lima Metropolitana: 1-3 dias habiles. Provincias: 5-10 dias habiles.',
  },
  {
    icon: MapPin,
    title: 'Seguimiento',
    description: 'Recibiras un codigo de seguimiento para rastrear tu pedido en todo momento.',
  },
  {
    icon: Package,
    title: 'Empaque Seguro',
    description: 'Todos nuestros productos son empacados cuidadosamente para garantizar su llegada en perfecto estado.',
  },
];

export default function EnviosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Informacion de Envios
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Conoce nuestras politicas y tiempos de envio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {shippingInfo.map((item) => (
          <div key={item.title} className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
                <item.icon className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Costos de Envio</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Zona</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Tiempo</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Costo</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 text-gray-700">Lima Metropolitana</td>
                <td className="py-3 px-4 text-gray-700">1-3 dias habiles</td>
                <td className="py-3 px-4 text-gray-700">S/ 10.00</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Provincias Costa</td>
                <td className="py-3 px-4 text-gray-700">3-5 dias habiles</td>
                <td className="py-3 px-4 text-gray-700">S/ 15.00</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Provincias Sierra/Selva</td>
                <td className="py-3 px-4 text-gray-700">5-10 dias habiles</td>
                <td className="py-3 px-4 text-gray-700">S/ 20.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          * Envio gratis en compras mayores a S/ 100.00 para Lima Metropolitana.
        </p>
      </div>
    </div>
  );
}
