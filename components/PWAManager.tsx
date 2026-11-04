'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  WifiOff,
  Wifi,
  RefreshCw,
  Smartphone,
  X,
  Share,
  PlusSquare,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import {
  APP_VERSION,
  BeforeInstallPromptEvent,
  applySafePWAUpdate,
  checkRemoteVersionUpdate,
  isIOSDevice,
  isStandalonePWA,
  registerServiceWorker,
  sendPWANotification,
} from '../lib/pwa';
import { getDateStringInTimezone, getTimeStringInTimezone } from '../lib/i18n';

interface PWAManagerProps {
  installTargetId: string;
  morningPracticeTime: string;
  timezone: string;
  morningReminderEnabled?: boolean;
  morningReminderTopic?: 'words' | 'grammar' | 'conversation' | 'all';
  morningReminderTaskCount?: number;
  onNavigateTab: (tab: string) => void;
}

export const TAB_QUERY_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  lessons: 'Lessons',
  exercises: 'Exercises',
  teacher: 'Study Assistant',
  voice: 'Voice Practice',
  'it-english': 'IT English',
  vocabulary: 'Vocabulary',
  translation: 'Translation',
  history: 'My Progress',
  progress: 'My Progress',
  profile: 'Profile',
  settings: 'Settings',
  'daily-words': 'Daily Words',
  'daily-questions': 'Daily Questions',
  'daily-conversations': 'Daily Conversations',
  books: 'Book Library',
  grammar: 'Grammar Academy',
  accent: 'Accent Academy',
  'speed-check': 'Speed Check',
  speed: 'Speed Check',
};

export default function PWAManager({
  installTargetId,
  morningPracticeTime,
  timezone,
  morningReminderEnabled,
  morningReminderTopic,
  morningReminderTaskCount,
  onNavigateTab,
}: PWAManagerProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installBannerDismissed, setInstallBannerDismissed] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showBackOnlineToast, setShowBackOnlineToast] = useState(false);
  const [waitingSW, setWaitingSW] = useState<ServiceWorkerRegistration | null>(null);
  const [remoteUpdateVersion, setRemoteUpdateVersion] = useState<string | null>(null);
  const [justUpdatedToast, setJustUpdatedToast] = useState<string | null>(null);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);
  const [installTarget, setInstallTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setInstallTarget(document.getElementById(installTargetId));
  }, [installTargetId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsStandalone(isStandalonePWA());
    setIsIOS(isIOSDevice());
    setIsOnline(navigator.onLine);

    const dismissed = window.sessionStorage.getItem('haylingo_pwa_banner_dismissed') === '1';
    setInstallBannerDismissed(dismissed);

    // Check if the installed app just upgraded from an older version without deleting its database
    try {
      const justUpdated = window.sessionStorage.getItem('haylingo_just_updated_to');
      const prevInstalledVersion = window.localStorage.getItem('haylingo_installed_app_version');

      if (justUpdated) {
        window.sessionStorage.removeItem('haylingo_just_updated_to');
        window.localStorage.setItem('haylingo_installed_app_version', APP_VERSION);
        setJustUpdatedToast(APP_VERSION);
        setTimeout(() => setJustUpdatedToast(null), 6000);
      } else if (prevInstalledVersion && prevInstalledVersion !== APP_VERSION) {
        window.localStorage.setItem('haylingo_installed_app_version', APP_VERSION);
        setJustUpdatedToast(APP_VERSION);
        setTimeout(() => setJustUpdatedToast(null), 6000);
      } else if (!prevInstalledVersion) {
        window.localStorage.setItem('haylingo_installed_app_version', APP_VERSION);
      }
    } catch {
      // ignore storage errors
    }

    registerServiceWorker(
      (reg) => {
        setWaitingSW(reg);
      },
      (tab) => {
        const mapped = TAB_QUERY_MAP[tab.toLowerCase()] || tab;
        onNavigateTab(mapped);
      }
    );

    const checkServerVersion = async () => {
      if (!navigator.onLine) return;
      const check = await checkRemoteVersionUpdate();
      if (check.hasUpdate) {
        setRemoteUpdateVersion(check.remoteVersion);
        const notifiedVer = window.sessionStorage.getItem('haylingo_update_notified_version');
        if (notifiedVer !== check.remoteVersion && 'Notification' in window && Notification.permission === 'granted') {
          window.sessionStorage.setItem('haylingo_update_notified_version', check.remoteVersion);
          void sendPWANotification(
            `🔔 HayLingo — Հասանելի է նոր թարմացում (${check.remoteVersion})`,
            'Սեղմեք՝ առանց բազան ջնջելու նոր տարբերակը տեղադրելու համար։',
            '/?tab=dashboard',
            `haylingo-update-${check.remoteVersion}`
          );
        }
      }
    };

    void checkServerVersion();
    const versionInterval = setInterval(checkServerVersion, 90000);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        void checkServerVersion();
      }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      try {
        window.localStorage.setItem('haylingo_installed_app_version', APP_VERSION);
      } catch {}
    };

    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnlineToast(true);
      setTimeout(() => setShowBackOnlineToast(false), 3500);
      void checkServerVersion();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnlineToast(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      clearInterval(versionInterval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [onNavigateTab]);

  // Daily Morning Practice notification check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkReminder = async () => {
      if (morningReminderEnabled === false) return;

      const nowTime = getTimeStringInTimezone(timezone);
      const todayStr = getDateStringInTimezone(timezone);
      const lastNotified = window.localStorage.getItem('haylingo_last_notified_date');

      if (
        nowTime === morningPracticeTime &&
        lastNotified !== todayStr &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        let targetUrl = '/?tab=daily-words';
        if (morningReminderTopic === 'grammar') targetUrl = '/?tab=grammar';
        else if (morningReminderTopic === 'conversation') targetUrl = '/?tab=daily-conversations';

        const taskCount = morningReminderTaskCount || 3;
        const sent = await sendPWANotification(
          '🔔 HayLingo — Ժամանակն է սովորել անգլերեն',
          `Այսօր ունես ${taskCount} առաջադրանք։ Սեղմիր՝ «Սկսել»։`,
          targetUrl,
          `haylingo-morning-${todayStr}`
        );
        if (sent) window.localStorage.setItem('haylingo_last_notified_date', todayStr);
      }
    };

    const interval = setInterval(checkReminder, 45000);
    return () => clearInterval(interval);
  }, [
    morningPracticeTime,
    timezone,
    morningReminderEnabled,
    morningReminderTopic,
    morningReminderTaskCount,
  ]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
      return;
    }

    if (isIOS && !isStandalone) {
      setShowIOSGuide(true);
    }
  };

  const dismissBanner = () => {
    setInstallBannerDismissed(true);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('haylingo_pwa_banner_dismissed', '1');
    }
  };

  const handleApplySafeUpdate = async () => {
    setIsApplyingUpdate(true);
    await applySafePWAUpdate(waitingSW, remoteUpdateVersion || undefined);
  };

  const canShowInstallBanner =
    !isStandalone && !installBannerDismissed && (Boolean(deferredPrompt) || isIOS);

  const hasUpdatePrompt = Boolean(waitingSW || remoteUpdateVersion);

  return (
    <>
      {/* Offline / Online Status Floating Bar */}
      {!isOnline && (
        <div className="bg-amber-500/95 text-slate-950 px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md z-50">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Անցանց եք․ հասանելի է նախկինում բեռնված բովանդակությունը։</span>
        </div>
      )}

      {isOnline && showBackOnlineToast && (
        <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md z-50">
          <Wifi className="w-4 h-4 shrink-0" />
          <span>Առցանց կապը վերականգնվեց։</span>
        </div>
      )}

      {/* Confirmation Toast After Safe Update */}
      {justUpdatedToast && (
        <div
          role="status"
          className="bg-emerald-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-md z-50"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Հավելվածը հաջողությամբ թարմացվեց ({justUpdatedToast})․ ձեր բազան և ամբողջ առաջընթացը պահպանված են։
            </span>
          </div>
          <button
            type="button"
            onClick={() => setJustUpdatedToast(null)}
            className="p-1 rounded-lg hover:bg-emerald-500 transition"
            aria-label="Փակել ծանուցումը"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Installed App / Service Worker New Version Available Request Banner */}
      {hasUpdatePrompt && (
        <div
          role="region"
          aria-label="Հավելվածի թարմացման հայտ"
          className="bg-indigo-600 text-white px-4 py-3 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3 shadow-lg z-50"
        >
          <div className="flex items-start sm:items-center gap-2.5 font-medium">
            <RefreshCw
              className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${isApplyingUpdate ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <div>
              <p className="font-bold">
                Հասանելի է HayLingo-ի նոր թարմացում{' '}
                {remoteUpdateVersion ? `(${remoteUpdateVersion})` : ''}
              </p>
              <p className="text-[11px] sm:text-xs text-indigo-100">
                Թարմացումը տեղադրվում է առանց ձեր բազան (IndexedDB / SQLite) կամ առաջընթացը ջնջելու։
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isApplyingUpdate}
              onClick={handleApplySafeUpdate}
              className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-700 font-extrabold text-xs hover:bg-indigo-50 disabled:opacity-60 transition shadow-sm"
            >
              {isApplyingUpdate ? 'Թարմացվում է...' : 'Թարմացնել հիմա'}
            </button>
          </div>
        </div>
      )}

      {/* Render the installation controls in the shared top bar. */}
      {canShowInstallBanner &&
        installTarget &&
        createPortal(
          <div className="navigation-install-actions" role="group" aria-label="Հավելվածի տեղադրում">
            <button
              type="button"
              onClick={handleInstallClick}
              aria-label="Տեղադրել HayLingo հավելվածը"
              title="Տեղադրել HayLingo հավելվածը"
              className="navigation-install-button"
            >
              <Download size={18} aria-hidden="true" />
              <span className="navigation-install-label">Տեղադրել</span>
            </button>
            <button
              type="button"
              onClick={dismissBanner}
              aria-label="Թաքցնել տեղադրման առաջարկը"
              className="navigation-button"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>,
          installTarget
        )}

      {/* iOS Safari Add to Home Screen Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Տեղադրել iPhone / iPad-ում</h3>
              </div>
              <button
                type="button"
                aria-label="Փակել տեղադրման ուղեցույցը"
                onClick={() => setShowIOSGuide(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Safari-ում՝ Share → Add to Home Screen → Add։
            </p>

            <div className="space-y-3 text-xs bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Սեղմեք ներքևի <strong>Share</strong> կոճակը (
                  <Share className="w-3.5 h-3.5 text-indigo-400 inline" />)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Ընտրեք <strong>Add to Home Screen</strong> (
                  <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Սեղմեք <strong>Add</strong> վերևի աջ անկյունում (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />)
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
            >
              Հասկանալի է
            </button>
          </div>
        </div>
      )}
    </>
  );
}
