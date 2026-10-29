export const APP_VERSION = 'v1.1.4';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function isStandalonePWA(): boolean {
  if (typeof window === 'undefined') return false;
  const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = Boolean((window.navigator as unknown as { standalone?: boolean }).standalone);
  return isStandaloneDisplay || isIOSStandalone;
}

export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

export async function registerServiceWorker(
  onUpdateAvailable?: (registration: ServiceWorkerRegistration) => void,
  onNavigateTab?: (tab: string) => void
): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    if (registration.waiting && onUpdateAvailable) {
      onUpdateAvailable(registration);
    }

    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;
      installingWorker.addEventListener('statechange', () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          onUpdateAvailable?.(registration);
        }
      });
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      const data = event.data;
      if (data?.type === 'NAVIGATE_TAB' && typeof data.url === 'string' && onNavigateTab) {
        try {
          const parsed = new URL(data.url, window.location.origin);
          const tab = parsed.searchParams.get('tab');
          if (tab) {
            onNavigateTab(tab);
          }
        } catch {
          // ignore
        }
      }
    });

    return registration;
  } catch {
    return null;
  }
}

export function activateWaitingServiceWorker(registration: ServiceWorkerRegistration | null): void {
  if (!registration?.waiting) return;
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
}

export function getNotificationPermissionState(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestPWANotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return Notification.permission;
  }
}

export async function sendPWANotification(
  title: string,
  body: string,
  url: string = '/?tab=voice',
  tag: string = 'haylingo-reminder'
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await requestPWANotificationPermission() as NotificationPermission;
  }
  if (permission !== 'granted') {
    return false;
  }

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg?.active) {
        reg.active.postMessage({
          type: 'SHOW_NOTIFICATION',
          title,
          body,
          url,
          tag,
        });
        return true;
      }
    }

    new Notification(title, {
      body,
      icon: '/icons/icon-192.svg',
      tag,
    });
    return true;
  } catch {
    return false;
  }
}

export async function getPWACacheStats(): Promise<{ cacheCount: number; cachedEntries: number }> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return { cacheCount: 0, cachedEntries: 0 };
  }

  try {
    const keys = await caches.keys();
    const haylingoKeys = keys.filter((k) => k.startsWith('haylingo-pwa-'));
    let totalEntries = 0;

    for (const key of haylingoKeys) {
      const cache = await caches.open(key);
      const requests = await cache.keys();
      totalEntries += requests.length;
    }

    return {
      cacheCount: haylingoKeys.length,
      cachedEntries: totalEntries,
    };
  } catch {
    return { cacheCount: 0, cachedEntries: 0 };
  }
}

export async function refreshPWACache(): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('haylingo-pwa-')).map((k) => caches.delete(k)));

    const cache = await caches.open(`haylingo-pwa-${APP_VERSION}-static`);
    await cache.addAll(['/', '/manifest.webmanifest', '/icons/icon-192.svg', '/icons/icon-512.svg']);
    return true;
  } catch {
    return false;
  }
}

export async function shareProgressPWA(params: {
  streakDays: number;
  learnedWordsCount: number;
  completedLessonsCount: number;
  level: string;
}): Promise<'shared' | 'copied' | 'failed'> {
  const shareText = `Ես սովորում եմ անգլերեն HayLingo-ով (${params.level} մակարդակ)․ 🔥 ${params.streakDays} օր անընդմեջ, 📚 ${params.completedLessonsCount} ավարտած դաս և 🧠 ${params.learnedWordsCount} սովորած բառ։`;
  const shareUrl = 'https://armeng.royalarm.uk';

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: 'HayLingo — Իմ Անգլերենի Առաջընթացը',
        text: shareText,
        url: shareUrl,
      });
      return 'shared';
    } catch {
      // User cancelled or share failed; fall back to clipboard
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
