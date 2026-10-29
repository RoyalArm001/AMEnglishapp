import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://armeng.royalarm.store';
  const now = new Date();

  const sections = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/?tab=lessons', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/?tab=exercises', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/?tab=teacher', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/?tab=voice', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/?tab=it-english', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/?tab=vocabulary', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/?tab=history', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: '/?tab=profile', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/?tab=settings', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return sections.map((section) => ({
    url: `${baseUrl}${section.path}`,
    lastModified: now,
    changeFrequency: section.changeFrequency,
    priority: section.priority,
  }));
}
