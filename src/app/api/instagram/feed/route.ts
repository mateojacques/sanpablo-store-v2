import { NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(12).default(6),
});

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

interface InstagramMediaResponse {
  data: InstagramMedia[];
}

/**
 * Public endpoint used by the storefront to display a real Instagram grid.
 *
 * Instagram does NOT provide a stable, unauthenticated public API for recent posts.
 * This route uses the Instagram Basic Display API via graph.instagram.com.
 *
 * Required env:
 * - INSTAGRAM_ACCESS_TOKEN: long-lived access token
 */
export async function GET(request: Request) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ data: [] satisfies InstagramMedia[] }, { status: 200 });
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: url.searchParams.get('limit') ?? undefined,
  });

  const limit = parsed.success ? parsed.data.limit : 6;

  const endpoint = new URL('https://graph.instagram.com/me/media');
  endpoint.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
  );
  endpoint.searchParams.set('access_token', token);
  endpoint.searchParams.set('limit', String(limit));

  try {
    const res = await fetch(endpoint.toString(), {
      // Cache to reduce API calls; tweak as needed.
      next: { revalidate: 10 * 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ data: [] satisfies InstagramMedia[] }, { status: 200 });
    }

    const json = (await res.json()) as InstagramMediaResponse;
    const items = Array.isArray(json?.data) ? json.data : [];

    const normalized = items
      .filter((m) => typeof m?.id === 'string' && typeof m?.permalink === 'string')
      .map((m) => ({
        id: m.id,
        caption: m.caption,
        media_type: m.media_type,
        media_url: m.media_url,
        thumbnail_url: m.thumbnail_url,
        permalink: m.permalink,
        timestamp: m.timestamp,
      }));

    return NextResponse.json({ data: normalized }, { status: 200 });
  } catch {
    return NextResponse.json({ data: [] satisfies InstagramMedia[] }, { status: 200 });
  }
}
