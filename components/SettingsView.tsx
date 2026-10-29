'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  Globe,
  Mic,
  Moon,
  ShieldAlert,
  Sliders,
  Sun,
  Trash2,
  Upload,
  Volume2,
} from 'lucide-react';
import {
  CEFRLevel,
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

interface SettingsViewProps {
  progress: UserProgressData;
  onUpdateSettings: (partialSettings: Partial<UserSettingsRecord>) => void;
  onChangeLevel: (level: CEFRLevel) => void;
  onExportJson: () => void;
  onImportJson: (jsonText: string) => Promise<{ ok: boolean; errorAm?: string }>;
  onWipeAllData: () => Promise<void>;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}

export default function SettingsView({
  progress,
  onUpdateSettings,
  onChangeLevel,
  onExportJson,
  onImportJson,
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
  const [confirmWipe, setConfirmWipe] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const list = getAvailableEnglishVoices();
      setVoices(list);
    };
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
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
                {active && <CheckCircle2 size={17} />}
              </button>
            );
          })}
        </div>

        {/* Custom transition hours for Auto mode */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold">☀️ Ցերեկային ռեժիմի մեկնարկ</div>
              <div className="text-[11px] text-slate-500">Սկզբնական՝ 07:00</div>
            </div>
            <input
              type="time"
              value={settings.autoLightStartTime}
              onChange={(e) => onUpdateSettings({ autoLightStartTime: e.target.value })}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold">🌙 Գիշերային ռեժիմի մեկնարկ</div>
              <div className="text-[11px] text-slate-500">Սկզբնական՝ 19:00</div>
            </div>
            <input
              type="time"
              value={settings.autoDarkStartTime}
              onChange={(e) => onUpdateSettings({ autoDarkStartTime: e.target.value })}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold"
            />
          </div>
        </div>
      </section>

      {/* B. Ժամային գոտի (Timezone) */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe size={20} className="text-sky-500" /> Բ. Ժամային գոտի և Օրական Streak
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ուսուցման օրերը և շարունակական օրերը (Daily Streak) հաշվարկվում են ըստ ընտրված ժամային գոտու։
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold">
            Տեղական ժամանակ՝ {currentLocalDate} · {currentLocalTime}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={settings.timezone}
            onChange={(e) =>
              onUpdateSettings({
                timezone: e.target.value,
                autoDetectTimezone: false,
              })
            }
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
          >
            {SUPPORTED_TIMEZONES.map((tz) => (
              <option key={tz.id} value={tz.id}>
                {tz.labelAm}
              </option>
            ))}
            {!SUPPORTED_TIMEZONES.some((t) => t.id === settings.timezone) && (
              <option value={settings.timezone}>{settings.timezone}</option>
            )}
          </select>

          <button
            type="button"
            onClick={() => {
              const detected = detectBrowserTimezone();
              onUpdateSettings({
                timezone: detected,
                autoDetectTimezone: true,
              });
            }}
            className="px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0"
          >
            Ավտոմատ հայտնաբերել բրաուզերից ({detectBrowserTimezone()})
          </button>
        </div>
      </section>

      {/* C. Կայքի լեզու և Ուսուցման ձևաչափ */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold">Գ. Կայքի լեզու և Ուսուցման պարտադիր ձևաչափ</h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
          Կայքի ամբողջ ինտերֆեյսը, մենյուները, կոճակները և բացատրությունները <strong>հայերեն</strong> են։ Բոլոր դասերն ու նախադասությունները ներկայացվում են եռատող ձևաչափով․
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5 text-sm">
          <div>
            <strong>{UI_TEXT.mandatoryFields.english}</strong> I am checking your computer.
          </div>
          <div className="text-emerald-700 dark:text-emerald-300">
            <strong>{UI_TEXT.mandatoryFields.pronunciation}</strong> Այ եմ չեքինգ յոր քոմփյութըր։
          </div>
          <div>
            <strong>{UI_TEXT.mandatoryFields.armenian}</strong> Ես ստուգում եմ ձեր համակարգիչը։
          </div>
        </div>
      </section>

      {/* D. Ձայնային կարգավորումներ */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Volume2 size={20} className="text-indigo-500" /> Դ. Ձայնային կարգավորումներ
          </h2>
          <button
            type="button"
            onClick={() => onSpeak('I am checking your computer.', settings.speechRate)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Volume2 size={14} /> Փորձարկել ձայնը
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Voice Speed Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Ձայնի արագություն</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {settings.voiceSpeedNumeric}x ({settings.speechRate === 'slow' ? 'Դանդաղ' : 'Նորմալ'})
              </span>
            </div>
            <input
              type="range"
              min={0.65}
              max={1.25}
              step={0.05}
              value={settings.voiceSpeedNumeric}
              onChange={(e) => {
                const val = Number(e.target.value);
                onUpdateSettings({
                  voiceSpeedNumeric: val,
                  speechRate: val <= 0.8 ? 'slow' : 'normal',
                });
              }}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Browser Voice Selection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="block text-xs font-bold">
              Ձայնի ընտրություն (Բրաուզերի աջակցությամբ)
            </label>
            <select
              value={settings.selectedVoiceURI}
              onChange={(e) => onUpdateSettings({ selectedVoiceURI: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold"
            >
              <option value="">Ավտոմատ լավագույն անգլերեն ձայն (Default)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Ավտոմատ արտասանություն</span>
            <input
              type="checkbox"
              checked={settings.autoPlayAudio}
              onChange={(e) => onUpdateSettings({ autoPlayAudio: e.target.checked })}
              className="w-4 h-4 accent-emerald-600"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Դանդաղ խոսքի ռեժիմ (Slow)</span>
            <input
              type="checkbox"
              checked={settings.speechRate === 'slow'}
              onChange={(e) =>
                onUpdateSettings({
                  speechRate: e.target.checked ? 'slow' : 'normal',
                  voiceSpeedNumeric: e.target.checked ? 0.75 : 1.0,
                })
              }
              className="w-4 h-4 accent-emerald-600"
            />
          </label>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-bold">Պարապմունքի ժամ</span>
            <input
              type="time"
              value={settings.preferredMorningTime}
              onChange={(e) => onUpdateSettings({ preferredMorningTime: e.target.value })}
              className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            />
          </div>
        </div>

        {/* Microphone Check */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={handleTestMicrophone}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <Mic size={15} /> Ստուգել միկրոֆոնի կարգավորումները
          </button>
          {micStatusAm && <span className="text-xs font-semibold">{micStatusAm}</span>}
        </div>
      </section>

      {/* E. Ուսուցման կարգավորումներ */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Sliders size={20} className="text-emerald-600" /> Ե. Ուսուցման կարգավորումներ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Goal: 5, 10, 15, or 30 minutes */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="block text-xs font-bold">Օրական ուսուցման նպատակ</label>
            <div className="grid grid-cols-4 gap-1.5">
              {([5, 10, 15, 30] as const).map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => onUpdateSettings({ dailyGoalMinutes: mins })}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    settings.dailyGoalMinutes === mins
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {mins} ր
                </button>
              ))}
            </div>
          </div>

          {/* Learning Level */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="block text-xs font-bold">Սովորելու մակարդակ (A1–C2)</label>
            <select
              value={progress.level}
              onChange={(e) => onChangeLevel(e.target.value as CEFRLevel)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              {CEFR_LEVELS.map((l) => (
                <option key={l.level} value={l.level}>
                  {l.labelAm}
                </option>
              ))}
            </select>
          </div>

          {/* Exercise Difficulty */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="block text-xs font-bold">Առաջադրանքների դժվարություն</label>
            <select
              value={settings.exerciseDifficulty}
              onChange={(e) =>
                onUpdateSettings({
                  exerciseDifficulty: e.target.value as UserSettingsRecord['exerciseDifficulty'],
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              <option value="adaptive">Ադապտիվ (Ըստ առաջընթացի)</option>
              <option value="easy">Հեշտ (A1–A2)</option>
              <option value="medium">Միջին (B1–B2)</option>
              <option value="hard">Բարդ (C1–C2)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer">
            <span className="text-xs font-bold">Հուշումների միացում (Hints)</span>
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

      {/* F. Լոկալ տվյալների բազա (IndexedDB)՝ Պահպանում, JSON Export/Import և Ջնջում */}
      <section className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold">
            Զ. Լոկալ տվյալների բազա (IndexedDB)՝ Պահուստավորում և Կառավարում
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ձեր պրոֆիլը, դասերի առաջընթացը, բառապաշարը և պատմությունը պահպանվում են բրաուզերի IndexedDB-ում (12 առանձին աղյուսակներով)։ Սարքի կամ բրաուզերի քեշի/տվյալների ամբողջական մաքրման դեպքում լոկալ առաջընթացը կարող է ջնջվել, ուստի կարող եք ցանկացած պահի արտահանել Ձեր տվյալները JSON ֆայլով։
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

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExportJson}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition"
          >
            <Download size={16} /> {UI_TEXT.buttons.exportJson}
          </button>

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
    </div>
  );
}
