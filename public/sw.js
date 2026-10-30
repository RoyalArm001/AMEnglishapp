const CACHE_VERSION = 'haylingo-pwa-v1.3.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('haylingo-pwa-') && key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Navigation requests: Network-first with cached '/' shell fallback for full Offline PWA support
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put('/', copy));
          }
          return response;
        })
        .catch(async () => {
          const runtimeCached = await caches.match(request);
          if (runtimeCached) return runtimeCached;
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;
          return new Response(
            '<!DOCTYPE html><html lang="hy"><head><meta charset="utf-8"><title>HayLingo — Offline</title></head><body style="background:#090d16;color:#fff;font-family:sans-serif;padding:2rem;text-align:center;"><h1>HayLingo AI</h1><p>Դուք անցանց եք (Offline)։ Ուսումնական բովանդակությունը հասանելի է։</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // Static Next.js assets & icons: Stale-While-Revalidate
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/icon' ||
    url.pathname === '/apple-icon'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
    return;
  }

  // Default GET strategy: Network-first with runtime cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

self.addEventListener('message', (event) => {
  const data = event.data || {};

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (data.type === 'CLEAR_PWA_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }

  if (data.type === 'SHOW_NOTIFICATION') {
    const title = data.title || '🔔 HayLingo — Ժամանակն է սովորել անգլերեն';
    const options = {
      body:
        data.body ||
        'Այսօր ունես նոր առաջադրանք։ Սեղմիր՝ «Սկսել»։',
      icon: '/icons/icon-192.svg',
      badge: '/icons/icon-192.svg',
      tag: data.tag || 'haylingo-morning-reminder',
      renotify: true,
      data: {
        url: data.url || '/?tab=daily-words',
      },
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener('push', (event) => {
  let payload = {
    title: '🔔 HayLingo — Ժամանակն է սովորել անգլերեն',
    body: 'Այսօրվա առաջադրանքը պատրաստ է։ Սեղմիր՝ սովորելու համար։',
    url: '/?tab=daily-words',
  };

  if (event.data) {
    try {
      payload = { ...payload, ...event.data.json() };
    } catch {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icons/icon-192.svg',
      badge: '/icons/icon-192.svg',
      tag: 'haylingo-push-reminder',
      data: { url: payload.url || '/?tab=daily-words' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/?tab=daily-words';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.postMessage({ type: 'NAVIGATE_TAB', url: targetUrl });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
