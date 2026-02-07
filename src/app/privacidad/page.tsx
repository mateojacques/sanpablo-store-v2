import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad y proteccion de datos de San Pablo.',
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Politica de Privacidad
      </h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Ultima actualizacion: Enero 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informacion que Recopilamos</h2>
            <p className="text-gray-600">
              Recopilamos informacion que nos proporcionas directamente, como tu nombre, correo electronico, 
              direccion de envio y datos de pago cuando realizas una compra o creas una cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso de la Informacion</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos la informacion recopilada para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Procesar y entregar tus pedidos</li>
              <li>Enviar confirmaciones y actualizaciones de pedidos</li>
              <li>Responder a tus consultas y solicitudes</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviarte comunicaciones de marketing (con tu consentimiento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Proteccion de Datos</h2>
            <p className="text-gray-600">
              Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion 
              personal contra el acceso no autorizado, la alteracion, divulgacion o destruccion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Compartir Informacion</h2>
            <p className="text-gray-600">
              No vendemos ni alquilamos tu informacion personal a terceros. Solo compartimos tu informacion 
              con proveedores de servicios que nos ayudan a operar nuestro negocio, como empresas de envio 
              y procesadores de pago.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
            <p className="text-gray-600">
              Utilizamos cookies y tecnologias similares para mejorar tu experiencia en nuestro sitio, 
              recordar tus preferencias y analizar el trafico del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Tus Derechos</h2>
            <p className="text-gray-600 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Acceder a tu informacion personal</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminacion de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Retencion de Datos</h2>
            <p className="text-gray-600">
              Conservamos tu informacion personal durante el tiempo necesario para cumplir con los 
              propositos descritos en esta politica, a menos que se requiera un periodo de retencion 
              mas largo por ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cambios a esta Politica</h2>
            <p className="text-gray-600">
              Podemos actualizar esta politica de privacidad periodicamente. Te notificaremos sobre 
              cambios significativos publicando la nueva politica en nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contacto</h2>
            <p className="text-gray-600">
              Si tienes preguntas sobre esta politica de privacidad, contactanos en privacidad@sanpablo.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
