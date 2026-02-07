import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminos y Condiciones',
  description: 'Terminos y condiciones de uso de San Pablo.',
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Terminos y Condiciones
      </h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Ultima actualizacion: Enero 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceptacion de los Terminos</h2>
            <p className="text-gray-600">
              Al acceder y utilizar este sitio web, aceptas estar sujeto a estos terminos y condiciones de uso. 
              Si no estas de acuerdo con alguna parte de estos terminos, no debes usar nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso del Sitio</h2>
            <p className="text-gray-600">
              Este sitio web es para uso personal y no comercial. No puedes modificar, copiar, distribuir, 
              transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear trabajos derivados, 
              transferir o vender cualquier informacion obtenida de este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cuenta de Usuario</h2>
            <p className="text-gray-600">
              Para realizar compras, es posible que necesites crear una cuenta. Eres responsable de mantener 
              la confidencialidad de tu cuenta y contrasena, y de restringir el acceso a tu computadora. 
              Aceptas la responsabilidad de todas las actividades que ocurran bajo tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Productos y Precios</h2>
            <p className="text-gray-600">
              Nos esforzamos por mostrar informacion precisa sobre nuestros productos, incluyendo precios y 
              disponibilidad. Sin embargo, pueden ocurrir errores. Nos reservamos el derecho de corregir 
              cualquier error y de cancelar ordenes si es necesario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Pagos</h2>
            <p className="text-gray-600">
              Aceptamos varios metodos de pago. Al proporcionar informacion de pago, garantizas que estas 
              autorizado a usar el metodo de pago seleccionado y que la informacion proporcionada es correcta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Envios y Entregas</h2>
            <p className="text-gray-600">
              Los tiempos de entrega son estimados y pueden variar. No somos responsables de retrasos 
              causados por terceros o circunstancias fuera de nuestro control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Devoluciones y Reembolsos</h2>
            <p className="text-gray-600">
              Consulta nuestra Politica de Devoluciones para informacion detallada sobre como devolver 
              productos y obtener reembolsos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Propiedad Intelectual</h2>
            <p className="text-gray-600">
              Todo el contenido de este sitio web, incluyendo textos, graficos, logos, imagenes y software, 
              es propiedad de San Pablo o de sus proveedores de contenido y esta protegido por leyes de 
              propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitacion de Responsabilidad</h2>
            <p className="text-gray-600">
              San Pablo no sera responsable de danos indirectos, incidentales, especiales o consecuentes 
              que resulten del uso o la imposibilidad de usar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Cambios a los Terminos</h2>
            <p className="text-gray-600">
              Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios 
              entraran en vigor inmediatamente despues de su publicacion en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contacto</h2>
            <p className="text-gray-600">
              Si tienes preguntas sobre estos terminos, contactanos en legal@sanpablo.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
