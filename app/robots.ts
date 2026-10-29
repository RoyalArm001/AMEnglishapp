import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://armeng.royalarm.uk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/manifest.webmanifest', '/icon', '/apple-icon', '/opengraph-image'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
