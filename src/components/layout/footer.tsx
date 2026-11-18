'use client';

import Link from 'next/link';
import { CodeXml, Mail, Phone, MapPin } from 'lucide-react';
import { StoreLogo, SocialLinks, WhatsAppIcon } from '@/components/branding';
import { useBranding, useContact } from '@/lib/providers';
import { storefrontDefaults } from '@/lib/defaults/storefront-defaults';
import { Skeleton } from '@/components/ui';

const footerLinks = {
  shop: [
    { name: 'Todos los Productos', href: '/productos' },
    { name: 'Categorías', href: '/categorias' },
    { name: 'Novedades', href: '/productos?sortBy=createdAt&sortOrder=desc' },
  ],
  support: [
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Entregas', href: '/envios' },
    { name: 'Devoluciones', href: '/devoluciones' },
    { name: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { name: 'Términos y Condiciones', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
  ],
};

export function Footer() {
  const { branding, isLoading: brandingLoading } = useBranding();
  const { contact, isLoading: contactLoading } = useContact();
  
  const storeName = branding?.storeName ?? storefrontDefaults.branding.storeName;
  const tagline = branding?.tagline ?? storefrontDefaults.branding.tagline;
  const email = contact?.email ?? storefrontDefaults.contact.email;
  const phone = contact?.phone ?? storefrontDefaults.contact.phone;
  const address = contact?.address ?? storefrontDefaults.contact.address;
  const socialLinks = contact?.socialLinks ?? {};
  const rawWhatsappChannelUrl =
    contact?.socialLinks?.whatsapp ?? storefrontDefaults.contact.socialLinks.whatsapp;
  const whatsappChannelUrl = rawWhatsappChannelUrl?.trim()
    ? rawWhatsappChannelUrl.trim().startsWith('http')
      ? rawWhatsappChannelUrl.trim()
      : `https://${rawWhatsappChannelUrl.trim()}`
    : '';

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            {brandingLoading ? (
              <Skeleton className="h-8 w-32 bg-gray-700" />
            ) : (
              <StoreLogo variant="footer" />
            )}
            <p className="mt-4 text-sm">
              {tagline}
            </p>
            <div className="mt-6">
              {contactLoading ? (
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-5 rounded bg-gray-700" />
                  <Skeleton className="h-5 w-5 rounded bg-gray-700" />
                  <Skeleton className="h-5 w-5 rounded bg-gray-700" />
                </div>
              ) : (
                <SocialLinks links={socialLinks} />
              )}
            </div>

            {contactLoading ? (
              <Skeleton className="mt-6 h-10 w-48 rounded-full bg-gray-700" />
            ) : whatsappChannelUrl ? (
              <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-whatsapp)] py-2.5 pl-3.5 pr-5 text-sm font-semibold text-gray-950 transition-colors hover:bg-[var(--color-whatsapp-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-whatsapp)] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Canal de Novedades
              </a>
            ) : null}
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Tienda
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Ayuda
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Contacto
            </h3>
            {contactLoading ? (
              <div className="mt-4 space-y-3">
                <Skeleton className="h-12 w-full bg-gray-700" />
                <Skeleton className="h-6 w-32 bg-gray-700" />
                <Skeleton className="h-6 w-40 bg-gray-700" />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-sm">{address}</span>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`} 
                      className="text-sm hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a 
                      href={`mailto:${email}`} 
                      className="text-sm hover:text-white transition-colors"
                    >
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {storeName}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a
              href="https://go10.dev"
              target="_blank"
              rel="noopener"
              aria-label="Hecho a mano por go10.dev (abre en una pestaña nueva)"
              className="group inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-white"
            >
              <CodeXml className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden="true" />
              <span>
                Hecho a mano por{' '}
                <strong className="font-semibold text-gray-300 underline-offset-4 group-hover:text-white group-hover:underline">
                  go10.dev
                </strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
