'use client';

import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// TikTok icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

interface SocialLinksProps {
  links: Record<string, string>;
  className?: string;
  iconClassName?: string;
}

type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'youtube' | 'linkedin';

const socialIcons: Record<SocialPlatform, LucideIcon | typeof TikTokIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: TikTokIcon,
  youtube: Youtube,
  linkedin: Linkedin,
};

const socialLabels: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

export function SocialLinks({ 
  links, 
  className = '', 
  iconClassName = 'h-5 w-5' 
}: SocialLinksProps) {
  // Filter only known social platforms with valid URLs
  const validLinks = Object.entries(links).filter(
    ([key, url]) => key in socialIcons && url && url.trim() !== ''
  );

  if (validLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      {validLinks.map(([platform, url]) => {
        const Icon = socialIcons[platform as SocialPlatform];
        const label = socialLabels[platform as SocialPlatform];
        
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={label}
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
