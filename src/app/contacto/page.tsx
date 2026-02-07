'use client';

import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useStorefrontContact } from '@/hooks';
import { Button, Skeleton, Input, Textarea } from '@/components/ui';

export default function ContactoPage() {
  const { data: contact, isLoading } = useStorefrontContact();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Contacto
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para ayudarte. Contactanos por cualquiera de nuestros canales.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Informacion de Contacto
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                <div className="flex-shrink-0 p-2 bg-[var(--color-primary-50)] rounded-lg">
                  <MapPin className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Direccion</h3>
                  <p className="mt-1 text-gray-600">
                    {contact?.address || 'Av. Ejemplo 123, Lima, Peru'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                <div className="flex-shrink-0 p-2 bg-[var(--color-primary-50)] rounded-lg">
                  <Phone className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefono</h3>
                  <a 
                    href={`tel:${contact?.phone || '+51999999999'}`}
                    className="mt-1 text-[var(--color-primary)] hover:opacity-80"
                  >
                    {contact?.phone || '+51 999 999 999'}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                <div className="flex-shrink-0 p-2 bg-[var(--color-primary-50)] rounded-lg">
                  <Mail className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Correo Electronico</h3>
                  <a 
                    href={`mailto:${contact?.email || 'contacto@sanpablo.com'}`}
                    className="mt-1 text-[var(--color-primary)] hover:opacity-80"
                  >
                    {contact?.email || 'contacto@sanpablo.com'}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              {contact?.whatsappNumber && (
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                  <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${contact.whatsappNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-green-600 hover:text-green-700"
                    >
                      {contact.whatsappNumber}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                <div className="flex-shrink-0 p-2 bg-[var(--color-primary-50)] rounded-lg">
                  <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horario de Atencion</h3>
                  <p className="mt-1 text-gray-600">
                    Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                    Sabados: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Envianos un Mensaje
          </h2>
          
          <form className="bg-white rounded-lg border p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <Input 
                id="name"
                type="text" 
                placeholder="Tu nombre" 
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electronico
              </label>
              <Input 
                id="email"
                type="email" 
                placeholder="tu@correo.com" 
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <Input 
                id="subject"
                type="text" 
                placeholder="Asunto de tu mensaje" 
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <Textarea 
                id="message"
                placeholder="Escribe tu mensaje aqui..."
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
