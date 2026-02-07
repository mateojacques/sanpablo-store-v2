'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { StoreLogo, SocialLinks } from '@/components/branding';
import { useBranding, useContact } from '@/lib/providers';
import { storefrontDefaults } from '@/lib/defaults/storefront-defaults';
import { Skeleton } from '@/components/ui';

const footerLinks = {
  shop: [
    { name: 'Todos los Productos', href: '/productos' },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Ofertas', href: '/productos?onSale=true' },
    { name: 'Novedades', href: '/productos?sortBy=createdAt&sortOrder=desc' },
  ],
  support: [
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Envios', href: '/envios' },
    { name: 'Devoluciones', href: '/devoluciones' },
    { name: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { name: 'Terminos y Condiciones', href: '/terminos' },
    { name: 'Politica de Privacidad', href: '/privacidad' },
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
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
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
            <div className="flex gap-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
