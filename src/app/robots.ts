// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/', // A Sanity Studio háttérrendszert nem kell indexelnie a Google-nek
        '/api/',    // Az API végpontokat is tiltjuk
      ],
    },
    sitemap: 'https://82seoul.de/sitemap.xml',
  };
}