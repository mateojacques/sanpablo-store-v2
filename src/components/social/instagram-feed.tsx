'use client';

import { Instagram } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { useContact } from '@/lib/providers';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
}

interface InstagramFeedResponse {
  data: InstagramMedia[];
}

interface InstagramFeedProps {
  /** Maximum number of posts to display */
  maxPosts?: number;
  className?: string;
}

/**
 * Instagram feed widget that displays recent posts and a follow CTA.
 * Shows the store's Instagram account with latest publications.
 */
export function InstagramFeed({ maxPosts = 6, className = '' }: InstagramFeedProps) {
  const { contact, isLoading } = useContact();
  
  // Get Instagram URL from social links
  const instagramUrl = contact?.socialLinks?.instagram;
  const instagramHandle = instagramUrl
    ? instagramUrl
        .replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')
        .replace(/\/$/, '')
    : null;

  const { data: feedData, isLoading: feedLoading } = useQuery({
    queryKey: ['instagram', 'feed', maxPosts],
    queryFn: async (): Promise<InstagramMedia[]> => {
      const res = await fetch(`/api/instagram/feed?limit=${encodeURIComponent(String(maxPosts))}`);
      const json = (await res.json()) as InstagramFeedResponse;
      return Array.isArray(json?.data) ? json.data : [];
    },
    enabled: !!instagramUrl && !isLoading,
    staleTime: 10 * 60 * 1000,
  });

  const posts = feedData ?? [];

  // If no Instagram configured, don't render
  if (!isLoading && !instagramUrl) return null;

  return (
    <section className={`bg-gray-50 py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-gray-900">
              <Instagram className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Novedades en {instagramHandle ?? 'Instagram'}
              </h2>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-prose">
              Inspiracion, lanzamientos y productos en fotos. Abri una publicacion para verla en detalle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-10 w-40" />
            ) : (
              <a href={instagramUrl!} target="_blank" rel="noopener noreferrer">
                <Button size="md" className="gap-2">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  Ver perfil
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {isLoading || feedLoading ? (
            Array.from({ length: maxPosts }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))
          ) : (
            posts.map((post) => {
              const imageUrl =
                post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label="Abrir publicacion en Instagram"
                >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.caption ? post.caption.slice(0, 80) : 'Publicacion de Instagram'}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="h-8 w-8 text-gray-300" aria-hidden="true" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                <div className="absolute left-3 bottom-3 right-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                    Ver en Instagram
                  </div>
                </div>
                </a>
              );
            })
          )}
        </div>

        {!isLoading && !feedLoading && posts.length === 0 && instagramUrl && (
          <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="text-sm text-gray-700">
              Todavia no pudimos cargar las publicaciones.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Si recien configuraste Instagram, asegurate de tener `INSTAGRAM_ACCESS_TOKEN` en el servidor.
            </p>
            <div className="mt-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md" className="gap-2">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  Abrir Instagram
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Secondary CTA */}
        {!isLoading && instagramUrl && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
              Seguir la cuenta
            </a>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">|</span>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
              Ver mas publicaciones
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
