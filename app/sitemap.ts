import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Query tabs are personal application state, not separate public pages.
  // Omit lastModified rather than reporting every build as a content update.
  return [{ url: SITE_URL }];
}
