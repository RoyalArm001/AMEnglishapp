import { CEFRLevel, LearningGoalId, ProficiencyTier, ThemeMode } from './types';

/**
 * Կենտրոնացված հայերեն թարգմանությունների և տեքստերի համակարգ (Centralized Armenian UI Dictionary).
 * Կայքի ինտերֆեյսը 100% հայերեն է, իսկ անգլերենը կիրառվում է միայն ուսումնական նյութերում։
 */
export const UI_TEXT = {
  appName: 'HayLingo',
  appSubtitle: 'Անգլերենի ինտերակտիվ ուսուցում',
  mandatoryFields: {
    english: 'English:',
    pronunciation: 'Կարդացվում է:',
    armenian: 'Հայերեն:',
  },
  nav: {
    dashboard: 'Գլխավոր վահանակ',
    lessons: 'Անգլերենի դասեր',
    exercises: 'Առաջադրանքներ',
    teacher: 'Ուսումնական օգնական',
    translation: 'Թարգմանություն',
    voice: 'Ձայնային պարապմունք',
    itEnglish: 'Մասնագիտական և ՏՏ',
    vocabulary: 'Բառապաշար',
    history: 'Ուսուցման պատմություն',
    profile: 'Իմ պրոֆիլը',
    settings: 'Կարգավորումներ',
  },
  buttons: {
    listen: '🔊 Լսել',
    listenSlow: '🐢 Դանդաղ',
    speak: '🎙️ Կրկնել միկրոֆոնով',
    save: '⭐ Պահպանել',
    saved: '⭐ Պահպանված է',
    next: 'Հաջորդը',
    previous: 'Նախորդը',
    checkAnswer: 'Ստուգել պատասխանը',
    hint: 'Հուշում',
    hideHint: 'Թաքցնել հուշումը',
    editProfile: 'Խմբագրել տվյալները',
    saveChanges: 'Պահպանել փոփոխությունները',
    cancel: 'Չեղարկել',
    exportJson: 'Արտահանել տվյալները (JSON)',
    importJson: 'Ներմուծել տվյալները (JSON)',
    deleteAllData: 'Պրոֆիլի և տվյալների ամբողջական ջնջում',
  },
  onboarding: {
    welcomeBadge: 'ԲԱՐԻ ԳԱԼՈՒՍՏ HAYLINGO',
    title: 'Ստեղծենք Ձեր անհատական ուսուցման պրոֆիլը',
    subtitle:
      'Լրացրեք Ձեր տվյալները, որպեսզի համակարգը հարմարեցնի դասերը, մասնագիտական բառապաշարը և վարժությունների դժվարությունը։',
    firstName: 'Անուն',
    lastName: 'Ազգանուն',
    age: 'Տարիք',
    profession: 'Մասնագիտություն',
    professionSearchPlaceholder: 'Որոնել մասնագիտություն...',
    customProfessionLabel: 'Նշեք Ձեր մասնագիտությունը',
    englishLevel: 'Անգլերենի մակարդակ',
    learningGoal: 'Ուսուցման նպատակ',
    submitButton: 'Պահպանել և անցնել գլխավոր վահանակ',
  },
} as const;

export const PROFICIENCY_TIERS: {
  tier: ProficiencyTier;
  cefr: CEFRLevel;
  labelAm: string;
  descAm: string;
}[] = [
  {
    tier: 'Beginner',
    cefr: 'A1',
    labelAm: 'Սկսնակ (Beginner · A1)',
    descAm: 'Նոր եմ սկսում, գիտեմ միայն պարզագույն բառեր ու արտահայտություններ',
  },
  {
    tier: 'Elementary',
    cefr: 'A2',
    labelAm: 'Տարրական (Elementary · A2)',
    descAm: 'Հասկանում եմ պարզ առօրյա նախադասություններ և կարճ զրույցներ',
  },
  {
    tier: 'Intermediate',
    cefr: 'B1',
    labelAm: 'Միջին (Intermediate · B1–B2)',
    descAm: 'Կարող եմ շփվել աշխատանքային և առօրյա թեմաներով, ուզում եմ վարժ խոսել',
  },
  {
    tier: 'Advanced',
    cefr: 'C1',
    labelAm: 'Առաջադեմ (Advanced · C1–C2)',
    descAm: 'Ազատ հաղորդակցվում եմ, ցանկանում եմ կատարելագործել մասնագիտական անգլերենը',
  },
];

export const LEARNING_GOALS: {
  id: LearningGoalId;
  labelAm: string;
  icon: string;
  descAm: string;
}[] = [
  {
    id: 'work',
    labelAm: 'Աշխատանք և Կարիերա',
    icon: '💼',
    descAm: 'Մասնագիտական շփում, հարցազրույցներ, նամակագրություն և ժողովներ',
  },
  {
    id: 'travel',
    labelAm: 'Ճանապարհորդություն',
    icon: '✈️',
    descAm: 'Օդանավակայան, հյուրանոց, տրանսպորտ և արտերկրում ազատ հաղորդակցում',
  },
  {
    id: 'daily',
    labelAm: 'Առօրյա շփում',
    icon: '💬',
    descAm: 'Ամենօրյա խոսակցական անգլերեն, ֆիլմեր, ընթերցանություն և ընկերական զրույցներ',
  },
  {
    id: 'other',
    labelAm: 'Այլ նպատակ',
    icon: '🎯',
    descAm: 'Քննություններ, համալսարանական ուսում կամ անձնական զարգացում',
  },
];

export const SUPPORTED_TIMEZONES: { id: string; labelAm: string }[] = [
  { id: 'Asia/Yerevan', labelAm: 'Երևան (Asia/Yerevan · UTC+4)' },
  { id: 'Asia/Tbilisi', labelAm: 'Թբիլիսի (Asia/Tbilisi · UTC+4)' },
  { id: 'Asia/Dubai', labelAm: 'Դուբայ (Asia/Dubai · UTC+4)' },
  { id: 'Europe/Moscow', labelAm: 'Մոսկվա (Europe/Moscow · UTC+3)' },
  { id: 'Europe/Athens', labelAm: 'Աթենք / Կիպրոս (Europe/Athens · UTC+2/3)' },
  { id: 'Europe/Berlin', labelAm: 'Բեռլին / Փարիզ (Europe/Berlin · UTC+1/2)' },
  { id: 'Europe/London', labelAm: 'Լոնդոն (Europe/London · UTC+0/1)' },
  { id: 'America/New_York', labelAm: 'Նյու Յորք (America/New_York · UTC-5/4)' },
  { id: 'America/Chicago', labelAm: 'Չիկագո (America/Chicago · UTC-6/5)' },
  { id: 'America/Los_Angeles', labelAm: 'Լոս Անջելես / Գլենդել (America/Los_Angeles · UTC-8/7)' },
];

export function detectBrowserTimezone(): string {
  if (typeof window === 'undefined') return 'Asia/Yerevan';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz || 'Asia/Yerevan';
  } catch {
    return 'Asia/Yerevan';
  }
}

/**
 * Returns YYYY-MM-DD in the specified timezone.
 */
export function getDateStringInTimezone(
  timezone: string = 'Asia/Yerevan',
  date: Date = new Date()
): string {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);
    const y = parts.find((p) => p.type === 'year')?.value || '2026';
    const m = parts.find((p) => p.type === 'month')?.value || '01';
    const d = parts.find((p) => p.type === 'day')?.value || '01';
    return `${y}-${m}-${d}`;
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

/**
 * Returns HH:MM (24-hour) in the specified timezone.
 */
export function getTimeStringInTimezone(
  timezone: string = 'Asia/Yerevan',
  date: Date = new Date()
): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date);
    const h = parts.find((p) => p.type === 'hour')?.value || '12';
    const m = parts.find((p) => p.type === 'minute')?.value || '00';
    return `${h === '24' ? '00' : h}:${m}`;
  } catch {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

/**
 * Formats a timestamp in Armenian using the user's selected timezone.
 */
export function formatArmenianDateTime(
  timestamp: number,
  timezone: string = 'Asia/Yerevan'
): string {
  try {
    const d = new Date(timestamp);
    const dateStr = getDateStringInTimezone(timezone, d);
    const timeStr = getTimeStringInTimezone(timezone, d);
    return `${dateStr}, ժամը ${timeStr}`;
  } catch {
    return getDateStringInTimezone(timezone);
  }
}

function parseTimeToMinutes(hhmm: string, fallback: number): number {
  const parts = (hhmm || '').split(':');
  if (parts.length !== 2) return fallback;
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m)) return fallback;
  return h * 60 + m;
}

/**
 * Evaluates whether Dark Mode should be active based on themeMode ('light' | 'dark' | 'auto'),
 * the user's selected timezone, and custom light/dark transition times (default 07:00 and 19:00).
 */
export function computeEffectiveDarkMode(params: {
  themeMode: ThemeMode;
  timezone: string;
  autoLightStartTime: string;
  autoDarkStartTime: string;
}): boolean {
  const { themeMode, timezone, autoLightStartTime, autoDarkStartTime } = params;
  if (themeMode === 'dark') return true;
  if (themeMode === 'light') return false;

  const currentHHMM = getTimeStringInTimezone(timezone);
  const currentMins = parseTimeToMinutes(currentHHMM, 12 * 60);
  const lightStartMins = parseTimeToMinutes(autoLightStartTime || '07:00', 7 * 60);
  const darkStartMins = parseTimeToMinutes(autoDarkStartTime || '19:00', 19 * 60);

  if (lightStartMins < darkStartMins) {
    // Light mode is between lightStartMins and darkStartMins
    const isLight = currentMins >= lightStartMins && currentMins < darkStartMins;
    return !isLight;
  } else {
    const isDark = currentMins >= darkStartMins && currentMins < lightStartMins;
    return isDark;
  }
}

