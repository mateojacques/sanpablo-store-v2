'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useStorefrontFaq, useStorefrontContact } from '@/hooks';
import { Skeleton, Button } from '@/components/ui';
import type { StorefrontFaq } from '@/types';

// FAQ Item Component
function FaqItem({ faq, isOpen, onToggle }: { faq: StorefrontFaq; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 text-gray-600 whitespace-pre-wrap">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

// FAQ Skeleton
function FaqSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-6 w-3/4" />
        </div>
      ))}
    </div>
  );
}

// Default FAQs when API doesn't return any
const defaultFaqs: StorefrontFaq[] = [
  {
    id: '1',
    question: 'Como puedo realizar un pedido?',
    answer: 'Puedes realizar un pedido navegando por nuestros productos, agregandolos al carrito y completando el proceso de checkout. Aceptamos diferentes metodos de pago para tu comodidad.',
    sortOrder: 1,
  },
  {
    id: '2',
    question: 'Cuales son los tiempos de entrega?',
    answer: 'Los tiempos de entrega varian segun tu ubicacion. Generalmente, los pedidos se entregan entre 3 a 7 dias habiles dentro de la ciudad y hasta 10 dias habiles para envios a provincias.',
    sortOrder: 2,
  },
  {
    id: '3',
    question: 'Puedo devolver un producto?',
    answer: 'Si, aceptamos devoluciones dentro de los 15 dias posteriores a la compra, siempre que el producto este en su empaque original y sin uso. Contactanos para iniciar el proceso de devolucion.',
    sortOrder: 3,
  },
  {
    id: '4',
    question: 'Como puedo contactar al soporte?',
    answer: 'Puedes contactarnos a traves de WhatsApp, correo electronico o telefono. Nuestro equipo de soporte esta disponible de lunes a viernes de 9am a 6pm.',
    sortOrder: 4,
  },
  {
    id: '5',
    question: 'Tienen tienda fisica?',
    answer: 'Si, contamos con una tienda fisica donde puedes ver nuestros productos en persona. Visita la seccion de Contacto para ver nuestra direccion y horarios de atencion.',
    sortOrder: 5,
  },
];

export default function FaqPage() {
  const { data: faqs, isLoading, error } = useStorefrontFaq();
  const { data: contact } = useStorefrontContact();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const faqList = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const sortedFaqs = [...faqList].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-[var(--color-primary-100)] rounded-full mb-4">
          <HelpCircle className="h-8 w-8 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Preguntas Frecuentes
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas mas comunes sobre nuestra tienda, 
          envios, pagos y mas.
        </p>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {isLoading ? (
          <div className="p-4">
            <FaqSkeleton />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">Error al cargar las preguntas frecuentes</p>
          </div>
        ) : (
          sortedFaqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl p-8 text-center text-white">
        <MessageCircle className="mx-auto h-10 w-10 mb-4" />
        <h2 className="text-2xl font-bold">
          No encontraste lo que buscabas?
        </h2>
        <p className="mt-2 opacity-90 max-w-xl mx-auto">
          Nuestro equipo de soporte esta listo para ayudarte. Contactanos por cualquiera 
          de nuestros canales y te responderemos a la brevedad.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          {contact?.whatsappNumber && (
            <a
              href={`https://wa.me/${contact.whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-[var(--color-primary)] hover:bg-gray-100 w-full sm:w-auto">
                Escribenos al WhatsApp
              </Button>
            </a>
          )}
          {contact?.email && (
            <a href={`mailto:${contact.email}`}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Enviar un correo
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
