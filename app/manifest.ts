import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'HayLingo — Անգլերենի Ինտերակտիվ Ուսուցում Հայախոսների Համար',
    short_name: 'HayLingo',
    description:
      'Ժամանակակից անգլերենի ուսուցման ինտերակտիվ PWA հարթակ հայախոսների համար՝ 26 դասեր, 210+ բառեր, 108 վարժություններ, մասնագիտական անգլերեն, ձայնային պարապմունք և ուսումնական օգնական (աշխատում է նաև Offline)։',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    orientation: 'portrait-primary',
    background_color: '#090d16',
    theme_color: '#4f46e5',
    lang: 'hy',
    dir: 'ltr',
    categories: ['education', 'productivity', 'books'],
    prefer_related_applications: false,
    icons: [
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Անգլերենի Դասեր',
        short_name: 'Դասեր',
        description: 'Շարունակել անգլերենի ինտերակտիվ դասերը',
        url: '/?tab=lessons',
        icons: [{ src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
      },
      {
        name: 'Ձայնային Պարապմունք',
        short_name: 'Ձայնային',
        description: 'Սկսել խոսակցական և առավոտյան ձայնային պարապմունքը',
        url: '/?tab=voice',
        icons: [{ src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
      },
      {
        name: 'Վարժություններ',
        short_name: 'Վարժություններ',
        description: 'Կատարել ինտերակտիվ վարժություններ (A–F)',
        url: '/?tab=exercises',
        icons: [{ src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
      },
      {
        name: 'Ուսումնական օգնական',
        short_name: 'Ուսումնական օգնական',
        description: 'Պարապել պատրաստի հարցաշարով և ստանալ հայերեն բացատրություններ',
        url: '/?tab=teacher',
        icons: [{ src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
      },
    ],
  };
}
