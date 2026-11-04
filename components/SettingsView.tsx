'use client';

import DisplaySettings from './DisplaySettings';
import styles from './SettingsView.module.css';
import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Globe,
  Mic,
  Moon,
  RefreshCw,
  Share2,
  Sliders,
  Smartphone,
  Sun,
  Upload,
  Volume2,
  AlertCircle,
  Cloud,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
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
} from '../lib/i18n';
import { CEFR_LEVELS } from '../lib/storage';
import CloudAuthModal from './CloudAuthModal';
import {
  CloudSession,
  getStoredCloudSession,
  cloudRegister,
  cloudLogin,
  cloudLogout,
  cloudSyncPush,
  cloudSyncPull,
} from '../lib/cloud-sync';
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
  onProgressLoadedFromCloud?: (progress: UserProgressData) => void;
}

type SettingsSection = 'appearance' | 'display' | 'timezone' | 'audio' | 'reminders' | 'learning' | 'data' | 'app';

const SETTINGS_GROUPS: { title: string; items: { id: SettingsSection; title: string; description: string; icon: typeof Sun; tone: string }[] }[] = [
  { title: 'Քո հավելվածը', items: [
    { id: 'appearance', title: 'Արտաքին տեսք', description: 'Լուսավոր, մուգ և ավտոմատ ռեժիմ', icon: Sun, tone: 'amber' },
    { id: 'display', title: 'Էկրան և տառաչափ', description: 'Ընթերցման չափերն ու ցուցադրման ռեժիմը', icon: Smartphone, tone: 'blue' },
    { id: 'audio', title: 'Ձայն և արտասանություն', description: 'Ձայնի արագություն, խոսափող և հնչեցում', icon: Volume2, tone: 'violet' },
  ] },
  { title: 'Քո ուսուցումը', items: [
    { id: 'learning', title: 'Ուսուցման կարգավորումներ', description: 'Մակարդակ, բարդություն և հուշումներ', icon: Sliders, tone: 'green' },
    { id: 'reminders', title: 'Հիշեցումներ', description: 'Օրական պարապմունքի ժամն ու թեման', icon: Bell, tone: 'rose' },
    { id: 'timezone', title: 'Ժամ և օրական նպատակ', description: 'Ժամային գոտի և ուսուցման տևողություն', icon: Clock, tone: 'blue' },
  ] },
  { title: 'Տվյալներ և հավելված', items: [
    { id: 'data', title: 'Տվյալներ և պահուստավորում', description: 'Պահպանել կամ վերականգնել առաջընթացը', icon: Database, tone: 'violet' },
    { id: 'app', title: 'Հավելվածի մասին', description: 'Տարբերակ, անցանց աշխատանք և կիսում', icon: Smartphone, tone: 'green' },
  ] },
];

export default function SettingsView({
  progress,
  onUpdateSettings,
  onUpdateMorningReminder,
  onChangeLevel,
  onExportJson,
  onImportJson,
  onImportSqlite,
  onSpeak,
  onProgressLoadedFromCloud,
}: SettingsViewProps) {
  const { settings } = progress;
  const [activeSection, setActiveSection] = useState<SettingsSection | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [cloudSession, setCloudSession] = useState<CloudSession | null>(null);
  const openSection = (section: SettingsSection | null) => {
    setActiveSection(section);
    requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
      titleRef.current?.scrollIntoView({ block: 'start' });
    });
  };
  const selectedSection = SETTINGS_GROUPS.flatMap(group => group.items).find(item => item.id === activeSection);
  const sectionValues: Record<SettingsSection, string> = {
    appearance: settings.themeMode === 'auto' ? 'Ավտոմատ' : settings.themeMode === 'dark' ? 'Մուգ' : 'Լուսավոր',
    display: `${settings.fontSizes.interface}px`,
    audio: `${settings.voiceSpeedNumeric.toFixed(2)}×`,
    learning: progress.level,
    reminders: progress.morningReminder?.isEnabled ? progress.morningReminder.reminderTime : 'Անջատված',
    timezone: `${settings.dailyGoalMinutes} րոպե / օր`,
    data: cloudSession ? cloudSession.email : 'Այս սարքում',
    app: APP_VERSION,
  };
  const [voices, setVoices] = useState<BrowserVoiceOption[]>([]);
  const [micStatusAm, setMicStatusAm] = useState<string>('');
  const [importFeedback, setImportFeedback] = useState<{
    ok: boolean;
    messageAm: string;
  } | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [notifPerm, setNotifPerm] = useState<string>('default');
  const [cacheStats, setCacheStats] = useState<{ cacheCount: number; cachedEntries: number }>({
    cacheCount: 0,
    cachedEntries: 0,
  });
  const [pwaFeedback, setPwaFeedback] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [cloudEmail, setCloudEmail] = useState('');
  const [cloudPassword, setCloudPassword] = useState('');
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudFeedback, setCloudFeedback] = useState<{ ok: boolean; messageAm: string } | null>(null);

  useEffect(() => {
    setCloudSession(getStoredCloudSession());
  }, []);

  const handleQuickRegister = async () => {
    if (!cloudEmail || !cloudPassword) {
      setCloudFeedback({ ok: false, messageAm: 'Խնդրում ենք լրացնել էլ. փոստը և գաղտնաբառը։' });
      return;
    }
    setCloudLoading(true);
    setCloudFeedback(null);
    const res = await cloudRegister(cloudEmail, cloudPassword, progress);
    setCloudLoading(false);
    if (res.ok && res.session) {
      setCloudSession(res.session);
      setCloudEmail('');
      setCloudPassword('');
      setCloudFeedback({ ok: true, messageAm: res.messageAm || 'Գրանցումը հաջողվեց։ Տվյալները պահպանվեցին ամպում։' });
    } else {
      setCloudFeedback({ ok: false, messageAm: res.errorAm || 'Գրանցման սխալ։' });
    }
  };

  const handleQuickLogin = async () => {
    if (!cloudEmail || !cloudPassword) {
      setCloudFeedback({ ok: false, messageAm: 'Խնդրում ենք լրացնել էլ. փոստը և գաղտնաբառը։' });
      return;
    }
    setCloudLoading(true);
    setCloudFeedback(null);
    const res = await cloudLogin(cloudEmail, cloudPassword);
    setCloudLoading(false);
    if (res.ok && res.session) {
      setCloudSession(res.session);
      setCloudEmail('');
      setCloudPassword('');
      setCloudFeedback({ ok: true, messageAm: res.messageAm || 'Մուտքը հաջողվեց։' });
      if (res.progressData && onProgressLoadedFromCloud) {
        onProgressLoadedFromCloud(res.progressData);
      }
    } else {
      setCloudFeedback({ ok: false, messageAm: res.errorAm || 'Մուտքի սխալ։' });
    }
  };

  const handleCloudLogout = () => {
    cloudLogout();
    setCloudSession(null);
    setCloudFeedback({ ok: true, messageAm: 'Դուրս եկաք առցանց բազայից։' });
  };

  const handleCloudPush = async () => {
    setCloudLoading(true);
    setCloudFeedback(null);
    const res = await cloudSyncPush(progress);
    setCloudLoading(false);
    if (res.ok) {
      setCloudSession(getStoredCloudSession());
      setCloudFeedback({ ok: true, messageAm: 'Առաջընթացը հաջողությամբ համաժամեցվեց ամպի հետ։' });
    } else {
      setCloudFeedback({ ok: false, messageAm: res.errorAm || 'Համաժամեցման սխալ։' });
    }
  };

  const handleCloudPull = async () => {
    setCloudLoading(true);
    setCloudFeedback(null);
    const res = await cloudSyncPull();
    setCloudLoading(false);
    if (res.ok && res.progressData) {
      setCloudSession(getStoredCloudSession());
      if (onProgressLoadedFromCloud) {
        onProgressLoadedFromCloud(res.progressData);
      }
      setCloudFeedback({ ok: true, messageAm: 'Առաջընթացը բեռնվեց առցանց բազայից։' });
    } else if (res.ok) {
      setCloudFeedback({ ok: true, messageAm: 'Ամպում առկա տվյալներ չկան։' });
    } else {
      setCloudFeedback({ ok: false, messageAm: res.errorAm || 'Բեռնման սխալ։' });
    }
  };

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setImportFeedback(null);
    try {
      const header = new TextDecoder().decode(await file.slice(0, 16).arrayBuffer());
      const result = header === 'SQLite format 3\0'
        ? onImportSqlite ? await onImportSqlite(file) : { ok: false }
        : await onImportJson(await file.text());
      setImportFeedback({
        ok: result.ok,
        messageAm: result.ok
          ? 'Տվյալները հաջողությամբ ներմուծվեցին։'
          : 'Չհաջողվեց ներմուծել։ Ընտրեք հավելվածից արտահանված պահուստը։',
      });
    } catch {
      setImportFeedback({ ok: false, messageAm: 'Չհաջողվեց կարդալ պահուստը։ Փորձեք կրկին։' });
    } finally {
      input.value = '';
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        {activeSection && <button type="button" className={styles.back} onClick={() => openSection(null)}><ChevronLeft size={20} aria-hidden="true" /> Կարգավորումներ</button>}
        <h1 ref={titleRef} tabIndex={-1}>{selectedSection?.title || 'Կարգավորումներ'}</h1>
        <p>{selectedSection?.description || 'Քո սովորելու ձևը՝ քո հարմարությամբ։'}</p>
      </header>

      {!activeSection && <>
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true">{(progress.userName?.trim() || 'H').slice(0, 1).toUpperCase()}</div>
          <div className={styles.profileText}><strong>{progress.userName || 'Սովորող'}</strong><span>Քո անձնական ուսումնական տարածքը</span></div>
          <span className={styles.level}>{progress.level}</span>
        </div>
        <div className={styles.groups}>
          {SETTINGS_GROUPS.map(group => <section key={group.title} className={styles.group} aria-label={group.title}>
            <h2>{group.title}</h2>
            <div className={styles.list}>
              {group.items.map(item => <button key={item.id} type="button" className={styles.row} onClick={() => openSection(item.id)}>
                <span className={styles.icon} data-tone={item.tone}><item.icon size={21} aria-hidden="true" /></span>
                <span className={styles.rowText}><strong>{item.title}</strong><span>{item.description}</span><small>{sectionValues[item.id]}</small></span>
                <ChevronRight size={18} className={styles.chevron} aria-hidden="true" />
              </button>)}
            </div>
          </section>)}
        </div>
        <footer className={styles.footer}>HayLingo <span>·</span> {APP_VERSION}</footer>
      </>}

      <div hidden={activeSection !== 'display'} className={styles.detail}>
        <DisplaySettings settings={settings} onChange={onUpdateSettings} />
      </div>

      {/* A. Արտաքին տեսք (Appearance: Light / Dark / Auto) */}
      <section hidden={activeSection !== 'appearance'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Sun size={20} className="text-amber-500" /> Ընտրիր արտաքին տեսքը
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
              { id: 'light', label: 'Լուսավոր', icon: Sun },
              { id: 'dark', label: 'Մուգ', icon: Moon },
              { id: 'auto', label: 'Ավտոմատ', icon: Clock },
            ] as { id: ThemeMode; label: string; icon: any }[]
          ).map((mode) => {
            const active = settings.themeMode === mode.id;
            return (
              <button
                key={mode.id}
                aria-pressed={active}
                onClick={() => onUpdateSettings({ themeMode: mode.id })}
                className={`p-4 rounded-2xl border text-left font-bold text-xs md:text-sm transition flex items-center justify-between ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-2"><mode.icon size={18} aria-hidden="true" />{mode.label}</span>
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
      <section hidden={activeSection !== 'timezone'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Globe size={20} className="text-emerald-500" /> Ժամային գոտի և օրական նպատակ
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
              aria-label="Ժամային գոտի"
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
              aria-label="Օրական ուսումնական նպատակ"
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
      <section hidden={activeSection !== 'audio'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Volume2 size={20} className="text-sky-500" /> Ձայնի կարգավորումներ
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
              aria-label="Անգլերեն ձայն"
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

          <div className="sm:col-span-2 pt-1">
            <label htmlFor="auto-play-audio-setting" className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <input
                type="checkbox"
                id="auto-play-audio-setting"
                aria-label="Ավտոմատ արտասանություն"
                checked={Boolean(settings.autoPlayAudio)}
                onChange={(e) => onUpdateSettings({ autoPlayAudio: e.target.checked })}
                className="w-4 h-4 accent-sky-600 rounded"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Ավտոմատ արտասանություն
                </span>
                <p className="text-[11px] text-slate-400">
                  Դասերում հաջորդ նախադասությանն անցնելիս ավտոմատ հնչեցնել անգլերեն արտասանությունը։
                </p>
              </div>
            </label>
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
      <section hidden={activeSection !== 'reminders'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Պարապմունքի հիշեցում
              </h2>
              <p className="text-xs text-slate-500">
                Կարգավորիր ամենօրյա հիշեցման ժամը, առաջադրանքների քանակը և թեման։
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              aria-label="Պարապմունքի հիշեցում"
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

      {activeSection === 'reminders' && pwaFeedback && <p role="status" className={styles.feedback}>{pwaFeedback}</p>}

      {/* E. Ուսումնական Մակարդակ (CEFR Level & Adaptive Engine) */}
      <section hidden={activeSection !== 'learning'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sliders size={20} className="text-indigo-500" /> Սովորիր քո մակարդակով
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Մակարդակը փոխվում է միայն ընթացիկ դասապլանն ամբողջությամբ ավարտելուց հետո։
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Ընթացիկ CEFR մակարդակ
            </label>
            <select
              aria-label="Ուսումնական մակարդակ" value={progress.level} disabled
              onChange={(e) => onChangeLevel(e.target.value as CEFRLevel)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              {CEFR_LEVELS.filter(lvl => lvl.level === progress.level).map((lvl) => (
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
              aria-label="Վարժությունների բարդություն"
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
      <section hidden={activeSection !== 'data'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <span>Քո տվյալները</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Պահպանեք առաջընթացի պատճենը կամ վերականգնեք այն պահուստային ֆայլից։
          </p>
        </div>

        {/* MongoDB Atlas Առցանց Բազա */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-blue-50/40 dark:from-indigo-950/40 dark:to-slate-900/40 border border-indigo-200 dark:border-indigo-800/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Cloud size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Առցանց բազա (MongoDB Atlas)</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    {cloudSession ? 'Միացված է' : 'Առցանց'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Պահպանեք ձեր առաջընթացն առցանց ամպում՝ ապահով և հասանելի բոլոր սարքերում։
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCloudModalOpen(true)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Բացել պատուհանը</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {cloudFeedback && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                cloudFeedback.ok
                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-800 dark:text-rose-200 border border-rose-500/30'
              }`}
            >
              {cloudFeedback.ok ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
              <span>{cloudFeedback.messageAm}</span>
            </div>
          )}

          {cloudSession ? (
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Mail size={13} className="text-indigo-500" />
                    <span>{cloudSession.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {cloudSession.lastSyncedAt
                      ? `Վերջին համաժամեցում՝ ${new Date(cloudSession.lastSyncedAt).toLocaleString('hy-AM')}`
                      : 'Համաժամեցված է'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloudLogout}
                  className="px-3 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center gap-1"
                >
                  <LogOut size={13} />
                  <span>Դուրս գալ</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleCloudPush}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  <RefreshCw size={14} className={cloudLoading ? 'animate-spin' : ''} />
                  <span>Համաժամեցնել (Push)</span>
                </button>
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleCloudPull}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition disabled:opacity-50"
                >
                  <Download size={14} />
                  <span>Բեռնել ամպից (Pull)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="email"
                    value={cloudEmail}
                    onChange={(e) => setCloudEmail(e.target.value)}
                    placeholder="Էլ. փոստ (name@example.com)"
                    aria-label="Էլ. փոստի հասցե"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={cloudPassword}
                    onChange={(e) => setCloudPassword(e.target.value)}
                    placeholder="Գաղտնաբառ (առնվազն 6 նիշ)"
                    aria-label="Գաղտնաբառ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleQuickRegister}
                  className="flex-1 min-w-[130px] px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  <ShieldCheck size={14} />
                  <span>{cloudLoading ? 'Գրանցվում է...' : 'Գրանցվել'}</span>
                </button>
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleQuickLogin}
                  className="flex-1 min-w-[130px] px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 transition disabled:opacity-50"
                >
                  <span>{cloudLoading ? 'Մուտք...' : 'Մուտք գործել'}</span>
                </button>
              </div>
            </div>
          )}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onExportJson}
            className="min-h-12 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <Download size={18} aria-hidden="true" /> Արտահանել
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.db,application/json,application/x-sqlite3"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Ընտրել պահուստը"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-12 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition"
          >
            <Upload size={18} aria-hidden="true" /> Ներմուծել
          </button>
        </div>
      </section>

      {/* G. PWA Հավելված, Offline Քեշ և Ծանուցումներ */}
      <section hidden={activeSection !== 'app'} className={`${styles.detail} rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Smartphone size={20} className="text-indigo-600" />
            <div>
              <h2 className="text-lg font-bold">
                HayLingo {APP_VERSION}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Տեղեկություններ հավելվածի, անցանց բովանդակության և ծանուցումների մասին։
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
      <CloudAuthModal
        isOpen={isCloudModalOpen}
        onClose={() => {
          setIsCloudModalOpen(false);
          setCloudSession(getStoredCloudSession());
        }}
        currentProgress={progress}
        onProgressLoadedFromCloud={(p) => {
          if (onProgressLoadedFromCloud) onProgressLoadedFromCloud(p);
          setCloudSession(getStoredCloudSession());
        }}
      />
    </div>
  );
}
