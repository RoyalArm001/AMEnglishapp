export const APP_VERSION = 'v1.9.7';

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
  const isIOSStandalone = Boolean(
    (window.navigator as unknown as { standalone?: boolean }).standalone
  );
  return isStandaloneDisplay || isIOSStandalone;
}

export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

export async function checkRemoteVersionUpdate(): Promise<{
  hasUpdate: boolean;
  remoteVersion: string;
  currentVersion: string;
}> {
  if (typeof window === 'undefined') {
    return { hasUpdate: false, remoteVersion: APP_VERSION, currentVersion: APP_VERSION };
  }

  try {
    const res = await fetch(`/api/version?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });
    if (!res.ok) {
      return { hasUpdate: false, remoteVersion: APP_VERSION, currentVersion: APP_VERSION };
    }
    const data = await res.json();
    const remoteVersion = typeof data?.version === 'string' ? data.version : APP_VERSION;
    const hasUpdate = Boolean(remoteVersion && remoteVersion !== APP_VERSION);
    return {
      hasUpdate,
      remoteVersion,
      currentVersion: APP_VERSION,
    };
  } catch {
    return { hasUpdate: false, remoteVersion: APP_VERSION, currentVersion: APP_VERSION };
  }
}

export async function registerServiceWorker(
  onUpdateAvailable?: (registration: ServiceWorkerRegistration) => void,
  onNavigateTab?: (tab: string) => void
): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  // Next dev reuses asset URLs. A cache-first worker mixes old components with new CSS.
  // Production retains the PWA; local development always loads from the dev server.
  if (process.env.NODE_ENV === 'development') return null;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
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
      if (data?.type === 'SW_UPDATE_AVAILABLE') {
        onUpdateAvailable?.(registration);
      }
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

    // Check for Service Worker updates when user focuses or returns to the installed app
    const checkSwUpdate = () => {
      registration.update().catch(() => {});
    };
    window.addEventListener('focus', checkSwUpdate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkSwUpdate();
      }
    });

    return registration;
  } catch {
    return null;
  }
}

/**
 * Safely activates the new Service Worker and reloads the application
 * WITHOUT touching or deleting IndexedDB or localStorage learner databases.
 */
export async function applySafePWAUpdate(
  registration: ServiceWorkerRegistration | null,
  targetVersion?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem('haylingo_just_updated_to', targetVersion || APP_VERSION);
    window.localStorage.setItem('haylingo_installed_app_version', targetVersion || APP_VERSION);
  } catch {
    // ignore storage quota errors
  }

  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith('haylingo-pwa-')).map((k) => caches.delete(k))
      );
    }
  } catch {
    // ignore cache cleanup errors
  }

  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    await new Promise<void>((resolve) => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };
      navigator.serviceWorker.addEventListener('controllerchange', done, { once: true });
      setTimeout(done, 800);
    });
  }

  window.location.reload();
}

export function activateWaitingServiceWorker(registration: ServiceWorkerRegistration | null): void {
  void applySafePWAUpdate(registration);
}

export function getNotificationPermissionState(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestPWANotificationPermission(): Promise<
  NotificationPermission | 'unsupported'
> {
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
    permission = (await requestPWANotificationPermission()) as NotificationPermission;
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
    await Promise.all(
      keys.filter((k) => k.startsWith('haylingo-pwa-')).map((k) => caches.delete(k))
    );

    const cache = await caches.open(`haylingo-pwa-${APP_VERSION}-static`);
    await cache.addAll([
      '/',
      '/manifest.webmanifest',
      '/icons/icon-192.svg',
      '/icons/icon-512.svg',
    ]);
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
