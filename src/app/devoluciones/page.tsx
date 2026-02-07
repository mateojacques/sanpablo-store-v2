import { RotateCcw, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devoluciones',
  description: 'Politica de devoluciones y reembolsos de San Pablo.',
};

export default function DevolucionesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-[var(--color-primary)]/10 rounded-full mb-4">
          <RotateCcw className="h-8 w-8 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Politica de Devoluciones
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Tu satisfaccion es nuestra prioridad.
        </p>
      </div>

      <div className="space-y-8">
        {/* Return Period */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
              <Clock className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Plazo de Devolucion</h2>
              <p className="mt-2 text-gray-600">
                Tienes hasta 15 dias calendario desde la fecha de entrega para solicitar una devolucion. 
                El producto debe estar en su empaque original y sin uso.
              </p>
            </div>
          </div>
        </div>

        {/* What can be returned */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Productos que Aceptamos en Devolucion
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium text-green-700 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Aceptamos
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>- Productos sin abrir en empaque original</li>
                <li>- Productos con defectos de fabrica</li>
                <li>- Productos equivocados enviados por error</li>
                <li>- Productos danados durante el envio</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-red-700 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                No Aceptamos
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>- Productos abiertos o usados</li>
                <li>- Productos sin empaque original</li>
                <li>- Productos en oferta o liquidacion</li>
                <li>- Productos personalizados</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Proceso de Devolucion
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium">
                1
              </span>
              <div>
                <h3 className="font-medium text-gray-900">Contactanos</h3>
                <p className="text-sm text-gray-600">
                  Envíanos un correo a devoluciones@sanpablo.com o contactanos por WhatsApp.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium">
                2
              </span>
              <div>
                <h3 className="font-medium text-gray-900">Aprobacion</h3>
                <p className="text-sm text-gray-600">
                  Revisaremos tu solicitud y te enviaremos las instrucciones para la devolucion.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium">
                3
              </span>
              <div>
                <h3 className="font-medium text-gray-900">Envio del Producto</h3>
                <p className="text-sm text-gray-600">
                  Envianos el producto en su empaque original a nuestra direccion.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium">
                4
              </span>
              <div>
                <h3 className="font-medium text-gray-900">Reembolso</h3>
                <p className="text-sm text-gray-600">
                  Una vez recibido y verificado el producto, procesaremos tu reembolso en 5-10 dias habiles.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
