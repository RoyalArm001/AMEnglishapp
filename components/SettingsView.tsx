'use client';

import DisplaySettings from './DisplaySettings';
import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Globe,
  Mic,
  Moon,
  RefreshCw,
  Share2,
  ShieldAlert,
  Sliders,
  Smartphone,
  Sun,
  Trash2,
  Upload,
  Volume2,
} from 'lucide-react';
import {
  CEFRLevel,
  MorningReminderSettings,
  ThemeMode,
  UserProgressData,
  UserSettingsRecord,
} from '../lib/types';
import {
  detectBrowserTimezone,
  getDateStringInTimezone,
  getTimeStringInTimezone,
  SUPPORTED_TIMEZONES,
  UI_TEXT,
} from '../lib/i18n';
import { CEFR_LEVELS } from '../lib/storage';
import {
  BrowserVoiceOption,
  checkSpeechSupport,
  getAvailableEnglishVoices,
  startSpeechRecognition,
} from '../lib/speech';
import {
  APP_VERSION,
  getNotificationPermissionState,
  getPWACacheStats,
  isStandalonePWA,
  refreshPWACache,
  sendPWANotification,
  shareProgressPWA,
} from '../lib/pwa';

interface SettingsViewProps {
  progress: UserProgressData;
  onUpdateSettings: (partialSettings: Partial<UserSettingsRecord>) => void;
  onUpdateMorningReminder?: (partialReminder: Partial<MorningReminderSettings>) => void;
  onChangeLevel: (level: CEFRLevel) => void;
  onExportJson: () => void;
  onImportJson: (jsonText: string) => Promise<{ ok: boolean; errorAm?: string }>;
  onExportSqlite?: () => void;
  onImportSqlite?: (file: File) => Promise<{ ok: boolean; errorAm?: string }>;
  onWipeAllData: () => Promise<void>;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}

export default function SettingsView({
  progress,
  onUpdateSettings,
  onUpdateMorningReminder,
  onChangeLevel,
  onExportJson,
  onImportJson,
  onExportSqlite,
  onImportSqlite,
  onWipeAllData,
  onSpeak,
}: SettingsViewProps) {
  const { settings } = progress;
  const [voices, setVoices] = useState<BrowserVoiceOption[]>([]);
  const [micStatusAm, setMicStatusAm] = useState<string>('');
  const [importFeedback, setImportFeedback] = useState<{
    ok: boolean;
    messageAm: string;
  } | null>(null);
  const [sqliteFeedback, setSqliteFeedback] = useState<{
    ok: boolean;
    messageAm: string;
  } | null>(null);
  const [confirmWipe, setConfirmWipe] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [notifPerm, setNotifPerm] = useState<string>('default');
  const [cacheStats, setCacheStats] = useState<{ cacheCount: number; cachedEntries: number }>({
    cacheCount: 0,
    cachedEntries: 0,
  });
  const [pwaFeedback, setPwaFeedback] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputSqliteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const list = getAvailableEnglishVoices();
      setVoices(list);
    };
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    setIsStandalone(isStandalonePWA());
    setNotifPerm(getNotificationPermissionState());
    getPWACacheStats().then(setCacheStats);
  }, []);

  const currentLocalDate = getDateStringInTimezone(settings.timezone);
  const currentLocalTime = getTimeStringInTimezone(settings.timezone);

  const handleTestMicrophone = () => {
    const support = checkSpeechSupport();
    if (!support.sttSupported) {
      setMicStatusAm(
        'Ձեր բրաուզերը չի աջակցում Web Speech API խոսքի ճանաչմանը։ Խորհուրդ է տրվում օգտագործել Chrome կամ Edge։'
      );
      return;
    }
    setMicStatusAm('Ստուգվում է միկրոֆոնի թույլտվությունը... ասեք որևէ բառ անգլերեն։');
    const stop = startSpeechRecognition({
      onResult: (transcript) => {
        setMicStatusAm(`✓ Միկրոֆոնն աշխատում է։ Ճանաչված խոսք՝ «${transcript}»`);
        stop?.();
      },
      onError: (errAm) => {
        setMicStatusAm(`⚠️ ${errAm}`);
      },
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = await onImportJson(text);
      if (res.ok) {
        setImportFeedback({
          ok: true,
          messageAm: 'Տվյալները և ամբողջ ուսուցման առաջընթացը հաջողությամբ վերականգնվեցին JSON ֆայլից։',
        });
      } else {
        setImportFeedback({
          ok: false,
          messageAm: res.errorAm || 'Չհաջողվեց ներմուծել տվյալները։',
        });
      }
    } catch {
      setImportFeedback({
        ok: false,
        messageAm: 'Սխալ ֆայլը կարդալիս։',
      });
    }
    e.target.value = '';
  };

  const handleSqliteFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImportSqlite) return;
    try {
      const res = await onImportSqlite(file);
      setSqliteFeedback({
        ok: res.ok,
        messageAm: res.ok
          ? 'SQLite (.db) բազան հաջողությամբ վերականգնվեց։'
          : res.errorAm || 'SQLite վերականգնումը ձախողվեց։',
      });
    } catch (err) {
      setSqliteFeedback({
        ok: false,
        messageAm: `SQLite ֆայլի սխալ: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ · ԱՐՏԱՔԻՆ ՏԵՍՔ, ԺԱՄԱՅԻՆ ԳՈՏԻ, ՁԱՅՆ ԵՎ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mt-1">
          Համակարգի և ուսուցման կարգավորումներ
        </h1>
      </div>

      <DisplaySettings settings={settings} onChange={onUpdateSettings} />

      {/* A. Արտաքին տեսք (Appearance: Light / Dark / Auto) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Sun size={20} className="text-amber-500" /> Ա. Արտաքին տեսք (Ցերեկային / Գիշերային / Ավտոմատ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ավտոմատ ռեժիմն օգտագործում է Ձեր ընտրված ժամային գոտին ({settings.timezone}) և տեղական ժամանակը ({currentLocalTime})։
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            Ակտիվ տեսք՝ {progress.darkMode ? '🌙 Գիշերային' : '☀️ Ցերեկային'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              { id: 'light', label: '☀️ Ցերեկային — Light Mode', icon: Sun },
              { id: 'dark', label: '🌙 Գիշերային — Dark Mode', icon: Moon },
              { id: 'auto', label: '🕒 Ավտոմատ — Auto Mode', icon: Clock },
            ] as { id: ThemeMode; label: string; icon: any }[]
          ).map((mode) => {
            const active = settings.themeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onUpdateSettings({ themeMode: mode.id })}
                className={`p-4 rounded-2xl border text-left font-bold text-xs md:text-sm transition flex items-center justify-between ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{mode.label}</span>
                {active && <CheckCircle2 size={16} />}
              </button>
            );
          })}
        </div>

        {settings.themeMode === 'auto' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ☀️ Ցերեկային ռեժիմի մեկնարկի ժամ
              </label>
              <input
                type="time"
                value={settings.autoLightStartTime}
                onChange={(e) => onUpdateSettings({ autoLightStartTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                🌙 Գիշերային ռեժիմի մեկնարկի ժամ
              </label>
              <input
                type="time"
                value={settings.autoDarkStartTime}
                onChange={(e) => onUpdateSettings({ autoDarkStartTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
              />
            </div>
          </div>
        )}
      </section>

      {/* B. Ժամային գոտի և Օրական նպատակ (Timezone & Streak Accuracy) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Globe size={20} className="text-emerald-500" /> Բ. Ժամային գոտի և օրական հաշվարկ
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Օրական շարունակականության (Streak) և ուսումնական րոպեների ճշգրիտ հաշվարկ ըստ Ձեր բնակության վայրի։
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Ժամային գոտի (Timezone)
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => onUpdateSettings({ timezone: e.target.value, autoDetectTimezone: false })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              {SUPPORTED_TIMEZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.labelAm}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Օրական ուսումնական նպատակ
            </label>
            <select
              value={settings.dailyGoalMinutes}
              onChange={(e) => onUpdateSettings({ dailyGoalMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              <option value={10}>10 րոպե / օրական (Թեթև)</option>
              <option value={15}>15 րոպե / օրական (Խորհուրդ տրվող)</option>
              <option value={25}>25 րոպե / օրական (Ինտենսիվ)</option>
              <option value={45}>45 րոպե / օրական (Խորացված)</option>
            </select>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-300">
            Ընտրված գոտու տեղական ամսաթիվն ու ժամը․ <strong>{currentLocalDate} {currentLocalTime}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              const detected = detectBrowserTimezone();
              if (detected) onUpdateSettings({ timezone: detected, autoDetectTimezone: true });
            }}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
          >
            Ավտոմատ որոշել
          </button>
        </div>
      </section>

      {/* C. Ձայն և Արտասանություն (Speech & Audio Engine) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Volume2 size={20} className="text-sky-500" /> Գ. Ձայն և արտասանություն (TTS & STT)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Անգլերեն խոսքի արագության կարգավորում (0.7x – 1.2x), ձայնի ընտրություն և միկրոֆոնի թեստավորում։
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Ձայնի արագություն ({settings.voiceSpeedNumeric.toFixed(2)}x)
              </label>
              <button
                type="button"
                onClick={() => onSpeak('This is a test of the English speech speed.', settings.speechRate)}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <Volume2 size={13} /> Լսել օրինակը
              </button>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.2"
              step="0.05"
              value={settings.voiceSpeedNumeric}
              onChange={(e) => onUpdateSettings({ voiceSpeedNumeric: parseFloat(e.target.value) })}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0.7x (Դանդաղ)</span>
              <span>1.0x (Բնական)</span>
              <span>1.2x (Արագ)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Անգլերեն ձայն (Բրաուզերի հասանելի TTS ձայներ)
            </label>
            <select
              value={settings.selectedVoiceURI}
              onChange={(e) => onUpdateSettings({ selectedVoiceURI: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              <option value="">Ավտոմատ բնական ձայն (Default)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Mic size={18} className="text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Միկրոֆոնի և խոսքի ճանաչման թեստավորում
              </p>
              {micStatusAm && <p className="text-xs text-slate-500 mt-0.5">{micStatusAm}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleTestMicrophone}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-bold transition"
          >
            Ստուգել միկրոֆոնը
          </button>
        </div>
      </section>

      {/* D. Առավոտյան հիշեցումներ (Morning Reminder System) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Դ. Առավոտյան հիշեցումներ
              </h2>
              <p className="text-xs text-slate-500">
                Կարգավորիր ամենօրյա հիշեցման ժամը, առաջադրանքների քանակը և թեման։
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(progress.morningReminder?.isEnabled)}
              onChange={(e) =>
                onUpdateMorningReminder?.({ isEnabled: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Հիշեցման ժամը
            </label>
            <input
              type="time"
              value={progress.morningReminder?.reminderTime || '08:00'}
              onChange={(e) =>
                onUpdateMorningReminder?.({ reminderTime: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Օրական առաջադրանքներ
            </label>
            <select
              value={progress.morningReminder?.taskCount ?? 3}
              onChange={(e) =>
                onUpdateMorningReminder?.({ taskCount: Number(e.target.value) })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value={3}>3 առաջադրանք (արագ)</option>
              <option value={5}>5 առաջադրանք (ստանդարտ)</option>
              <option value={10}>10 առաջադրանք (ինտենսիվ)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Հիշեցման թեման
            </label>
            <select
              value={progress.morningReminder?.topic || 'all'}
              onChange={(e) =>
                onUpdateMorningReminder?.({
                  topic: e.target.value as 'words' | 'grammar' | 'conversation' | 'all',
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="words">Օրվա բառերը (3 Words)</option>
              <option value="grammar">Քերականություն (Grammar)</option>
              <option value="conversation">Առօրյա զրույցներ (Conversations)</option>
              <option value="all">Բոլոր առաջադրանքները</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={progress.morningReminder?.soundEnabled ?? true}
              onChange={(e) =>
                onUpdateMorningReminder?.({ soundEnabled: e.target.checked })
              }
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            <span>Հիշեցման ձայնային ազդանշան</span>
          </label>

          <button
            type="button"
            onClick={async () => {
              let targetUrl = '/?tab=daily-words';
              if (progress.morningReminder?.topic === 'grammar') targetUrl = '/?tab=grammar';
              else if (progress.morningReminder?.topic === 'conversation') targetUrl = '/?tab=daily-conversations';
              const count = progress.morningReminder?.taskCount || 3;
              const ok = await sendPWANotification(
                '🔔 HayLingo — Ժամանակն է սովորել անգլերեն',
                `Այսօր ունես ${count} առաջադրանք։ Սեղմիր՝ «Սկսել»։`,
                targetUrl,
                'haylingo-test-morning-reminder'
              );
              setNotifPerm(getNotificationPermissionState());
              setPwaFeedback(
                ok
                  ? '✓ Ծանուցումը հաջողությամբ ուղարկվեց։'
                  : '✗ Խնդրում ենք միացնել ծանուցումների թույլտվությունը (Notifications) բրաուզերում։'
              );
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Bell size={14} />
            <span>Փորձարկել հիշեցումը հիմա</span>
          </button>
        </div>
      </section>

      {/* E. Ուսումնական Մակարդակ (CEFR Level & Adaptive Engine) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sliders size={20} className="text-indigo-500" /> Ե. Ուսումնական մակարդակ և ադապտիվություն
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Փոխեք Ձեր CEFR մակարդակը կամ ադապտիվ դժվարության կանոնները։
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Ընթացիկ CEFR մակարդակ
            </label>
            <select
              value={progress.level}
              onChange={(e) => onChangeLevel(e.target.value as CEFRLevel)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              {CEFR_LEVELS.map((lvl) => (
                <option key={lvl.level} value={lvl.level}>
                  {lvl.labelAm}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Վարժությունների բարդություն
            </label>
            <select
              value={settings.exerciseDifficulty}
              onChange={(e) =>
                onUpdateSettings({
                  exerciseDifficulty: e.target.value as UserSettingsRecord['exerciseDifficulty'],
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              <option value="adaptive">Ադապտիվ (ըստ առաջադիմության)</option>
              <option value="easy">Հեշտ (A1–A2)</option>
              <option value="medium">Միջին (B1–B2)</option>
              <option value="hard">Խորացված (C1–C2)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Հուշումների ցուցադրում (Hints)</span>
            <input
              type="checkbox"
              checked={settings.hintsEnabled}
              onChange={(e) => onUpdateSettings({ hintsEnabled: e.target.checked })}
              className="w-4 h-4 accent-emerald-600"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Սխալների ավտոմատ կրկնում</span>
            <input
              type="checkbox"
              checked={settings.autoRepeatMistakes}
              onChange={(e) => onUpdateSettings({ autoRepeatMistakes: e.target.checked })}
              className="w-4 h-4 accent-emerald-600"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Ավտոմատ անցում հաջորդին</span>
            <input
              type="checkbox"
              checked={settings.autoAdvanceExercises}
              onChange={(e) => onUpdateSettings({ autoAdvanceExercises: e.target.checked })}
              className="w-4 h-4 accent-emerald-600"
            />
          </label>
        </div>
      </section>

      {/* F. Լոկալ տվյալների բազա (IndexedDB & SQLite .db) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <span>Զ. Լոկալ տվյալների բազա (IndexedDB & SQLite .db)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ձեր պրոֆիլը, դասերի առաջընթացը, բառապաշարը և պատմությունը պահպանվում են բրաուզերի IndexedDB-ում (24 առանձին աղյուսակներով)։ Կարող եք արտահանել իրական SQLite (.db) կամ JSON ֆայլով։
          </p>
        </div>

        {importFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs md:text-sm font-bold ${
              importFeedback.ok
                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-800 dark:text-rose-200 border border-rose-500/30'
            }`}
          >
            {importFeedback.messageAm}
          </div>
        )}

        {sqliteFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs md:text-sm font-bold ${
              sqliteFeedback.ok
                ? 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-200 border border-indigo-500/30'
                : 'bg-rose-500/15 text-rose-800 dark:text-rose-200 border border-rose-500/30'
            }`}
          >
            {sqliteFeedback.messageAm}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {/* SQLite Export */}
          <button
            type="button"
            onClick={onExportSqlite}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Download size={16} /> Արտահանել SQLite (.db)
          </button>

          {/* SQLite Import */}
          <input
            ref={fileInputSqliteRef}
            type="file"
            accept=".db,application/x-sqlite3"
            onChange={handleSqliteFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputSqliteRef.current?.click()}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Upload size={16} /> Վերականգնել SQLite (.db)
          </button>

          {/* JSON Export */}
          <button
            type="button"
            onClick={onExportJson}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition"
          >
            <Download size={16} /> {UI_TEXT.buttons.exportJson}
          </button>

          {/* JSON Import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition"
          >
            <Upload size={16} /> {UI_TEXT.buttons.importJson}
          </button>

          {!confirmWipe ? (
            <button
              type="button"
              onClick={() => setConfirmWipe(true)}
              className="px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs md:text-sm flex items-center gap-2 transition"
            >
              <Trash2 size={16} /> {UI_TEXT.buttons.deleteAllData}
            </button>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-500/15 border border-rose-500/40">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                Հաստատո՞ւմ եք ամբողջական ջնջումը․
              </span>
              <button
                type="button"
                onClick={async () => {
                  setConfirmWipe(false);
                  await onWipeAllData();
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
              >
                Այո, ջնջել
              </button>
              <button
                type="button"
                onClick={() => setConfirmWipe(false)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold"
              >
                Չեղարկել
              </button>
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <ShieldAlert size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Գաղտնիության երաշխիք․</strong> Ձեր անձնական տվյալները պահվում են բացառապես Ձեր սարքի մեջ և չեն փոխանցվում արտաքին ծառայությունների առանց Ձեր տեղեկացված համաձայնության։
          </span>
        </div>
      </section>

      {/* G. PWA Հավելված, Offline Քեշ և Ծանուցումներ */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Smartphone size={20} className="text-indigo-600" />
            <div>
              <h2 className="text-lg font-bold">
                Է. PWA Հավելված, Offline Քեշ և Ծանուցումներ ({APP_VERSION})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Progressive Web App ֆունկցիոնալություն՝ անցանց աշխատանք, ծանուցումներ և արագ կիսվելու հնարավորություն
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isStandalone
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
            }`}
          >
            {isStandalone ? '📲 Տեղադրված PWA (Standalone)' : '🌐 Բրաուզերային ռեժիմ (PWA Ready)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-500 dark:text-slate-400">Հավելվածի տարբերակ</span>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              HayLingo {APP_VERSION}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-500 dark:text-slate-400">Offline քեշավորված ռեսուրսներ</span>
            <p className="text-sm font-bold">
              {cacheStats.cachedEntries} ֆայլ ({cacheStats.cacheCount} պահոց)
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-500 dark:text-slate-400">Ծանուցումների կարգավիճակ</span>
            <p className="text-sm font-bold">
              {notifPerm === 'granted'
                ? '✅ Միացված է'
                : notifPerm === 'denied'
                ? '🚫 Արգելափակված է բրաուզերում'
                : '🔔 Սպասում է թույլտվության'}
            </p>
          </div>
        </div>

        {pwaFeedback && (
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-800 dark:text-indigo-200">
            {pwaFeedback}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              const ok = await sendPWANotification(
                'HayLingo — Ծանուցումներն Ակտիվ Են',
                `Առավոտյան պարապմունքի հիշեցումը կուղարկվի ժամը ${settings.preferredMorningTime}-ին։`,
                '/?tab=daily-words',
                'haylingo-test-notif'
              );
              setNotifPerm(getNotificationPermissionState());
              setPwaFeedback(
                ok
                  ? '✅ PWA ծանուցումը հաջողությամբ ուղարկվեց։'
                  : '⚠️ Խնդրում ենք բրաուզերում թույլատրել ծանուցումները (Notifications)։'
              );
            }}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Bell size={15} /> Միացնել / Թեստավորել Ծանուցումը
          </button>

          <button
            type="button"
            onClick={async () => {
              const ok = await refreshPWACache();
              const stats = await getPWACacheStats();
              setCacheStats(stats);
              setPwaFeedback(
                ok
                  ? '✅ Offline PWA քեշը հաջողությամբ թարմացվեց։'
                  : '⚠️ Offline քեշի թարմացումը հասանելի չէ այս միջավայրում։'
              );
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-2 transition"
          >
            <RefreshCw size={15} /> Թարմացնել Offline Քեշը
          </button>

          <button
            type="button"
            onClick={async () => {
              const res = await shareProgressPWA({
                streakDays: progress.streakDays,
                learnedWordsCount: progress.learnedWordIds.length,
                completedLessonsCount: progress.completedLessonIds.length,
                level: progress.level,
              });
              if (res === 'shared') {
                setPwaFeedback('✅ Առաջընթացը հաջողությամբ կիսվեց։');
              } else if (res === 'copied') {
                setPwaFeedback('📋 Առաջընթացի տեքստը պատճենվեց (Clipboard)։');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center gap-2 transition"
          >
            <Share2 size={15} /> Կիսվել Առաջընթացով (Web Share)
          </button>
        </div>
      </section>
    </div>
  );
}
