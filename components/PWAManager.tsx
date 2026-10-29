'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import {
  APP_VERSION,
  BeforeInstallPromptEvent,
  activateWaitingServiceWorker,
  isIOSDevice,
  isStandalonePWA,
  registerServiceWorker,
  sendPWANotification,
} from '../lib/pwa';
import { getDateStringInTimezone, getTimeStringInTimezone } from '../lib/i18n';

interface PWAManagerProps {
  morningPracticeTime: string;
  timezone: string;
  onNavigateTab: (tab: string) => void;
}

const TAB_QUERY_MAP: Record<string, string> = {
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
};

export default function PWAManager({
  morningPracticeTime,
  timezone,
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsStandalone(isStandalonePWA());
    setIsIOS(isIOSDevice());
    setIsOnline(navigator.onLine);

    const dismissed = window.sessionStorage.getItem('haylingo_pwa_banner_dismissed') === '1';
    setInstallBannerDismissed(dismissed);

    // Handle PWA shortcut deep links (?tab=lessons, ?tab=voice, etc.)
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && TAB_QUERY_MAP[tabParam.toLowerCase()]) {
        onNavigateTab(TAB_QUERY_MAP[tabParam.toLowerCase()]);
      }
    } catch {
      // ignore
    }

    registerServiceWorker(
      (reg) => setWaitingSW(reg),
      (tab) => {
        const mapped = TAB_QUERY_MAP[tab.toLowerCase()] || tab;
        onNavigateTab(mapped);
      }
    );

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnlineToast(true);
      setTimeout(() => setShowBackOnlineToast(false), 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnlineToast(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onNavigateTab]);

  // Daily Morning Practice notification check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkReminder = () => {
      const nowTime = getTimeStringInTimezone(timezone);
      const todayStr = getDateStringInTimezone(timezone);
      const lastNotified = window.localStorage.getItem('haylingo_last_notified_date');

      if (nowTime === morningPracticeTime && lastNotified !== todayStr) {
        window.localStorage.setItem('haylingo_last_notified_date', todayStr);
        sendPWANotification(
          'HayLingo — Առավոտյան Ձայնային Պարապմունք',
          `Ժամը ${morningPracticeTime}-ն է։ Սկսեք 5 րոպեանոց առավոտյան անգլերենի պարապմունքը։`,
          '/?tab=voice',
          `haylingo-morning-${todayStr}`
        );
      }
    };

    const interval = setInterval(checkReminder, 45000);
    return () => clearInterval(interval);
  }, [morningPracticeTime, timezone]);

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

  const canShowInstallBanner =
    !isStandalone && !installBannerDismissed && (Boolean(deferredPrompt) || isIOS);

  return (
    <>
      {/* Offline / Online Status Floating Bar */}
      {!isOnline && (
        <div className="bg-amber-500/95 text-slate-950 px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md z-50">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>
            Անցանց ռեժիմ (Offline PWA)․ բոլոր դասերը, վարժությունները և լոկալ բազան աշխատում են առանց ինտերնետի։
          </span>
        </div>
      )}

      {isOnline && showBackOnlineToast && (
        <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md z-50">
          <Wifi className="w-4 h-4 shrink-0" />
          <span>Առցանց կապը վերականգնվեց։</span>
        </div>
      )}

      {/* Service Worker New Version Available Banner */}
      {waitingSW && (
        <div className="bg-indigo-600 text-white px-4 py-2 text-xs sm:text-sm flex items-center justify-between gap-3 z-50">
          <div className="flex items-center gap-2 font-medium">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>Հասանելի է HayLingo-ի նոր տարբերակ ({APP_VERSION})։</span>
          </div>
          <button
            onClick={() => activateWaitingServiceWorker(waitingSW)}
            className="px-3 py-1 rounded-lg bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 transition"
          >
            Թարմացնել հիմա
          </button>
        </div>
      )}

      {/* Install PWA Smart Banner */}
      {canShowInstallBanner && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-emerald-950/80 border-b border-indigo-500/30 px-4 py-2.5 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                Տեղադրեք HayLingo ({APP_VERSION}) որպես հավելված (PWA)
              </p>
              <p className="text-[11px] text-slate-300">
                Արագ մուտք գլխավոր էկրանից և 100% աշխատանք առանց ինտերնետի (Offline)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              Տեղադրել PWA
            </button>
            <button
              onClick={dismissBanner}
              aria-label="Փակել"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
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
                onClick={() => setShowIOSGuide(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              HayLingo-ն որպես լիարժեք հավելված (PWA) տեղադրելու համար կատարեք այս 2 պարզ քայլը Safari բրաուզերում․
            </p>

            <div className="space-y-3 text-xs bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Սեղմեք ներքևի <strong>Share</strong> կոճակը (<Share className="w-3.5 h-3.5 text-indigo-400 inline" />)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Ընտրեք <strong>Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  Սեղմեք <strong>Add</strong> վերևի աջ անկյունում (<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />)
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
