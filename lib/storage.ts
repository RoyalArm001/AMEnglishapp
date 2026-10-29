import {
  AchievementRecord,
  CEFRLevel,
  ExerciseAttemptRecord,
  ExerciseType,
  LessonProgressRecord,
  MistakeRecord,
  SkillType,
  SpeakingSessionRecord,
  SRSWordState,
  StudySessionRecord,
  UserProfileRecord,
  UserProgressData,
  UserSettingsRecord,
} from './types';
import {
  computeEffectiveDarkMode,
  detectBrowserTimezone,
  getDateStringInTimezone,
} from './i18n';
import { PROFESSIONS_LIST } from '../data/professions';
import { LESSONS_DATA } from '../data/lessons';

const SNAPSHOT_STORAGE_KEY = 'am_english_learning_snapshot_v3';
const LEGACY_STORAGE_KEY_V2 = 'am_english_learning_state_v2';
const LIGHT_SETTINGS_KEY = 'am_english_light_settings_v3';

const IDB_NAME = 'AMEnglishLearningDB_v3';
const IDB_SCHEMA_VERSION = 3;

export const IDB_STORES = {
  users: 'users',
  profiles: 'profiles',
  settings: 'settings',
  professions: 'professions',
  lessons: 'lessons',
  vocabulary: 'vocabulary',
  exercises: 'exercises',
  lesson_progress: 'lesson_progress',
  exercise_attempts: 'exercise_attempts',
  speaking_sessions: 'speaking_sessions',
  learning_history: 'learning_history',
  achievements: 'achievements',
} as const;

export function getTodayDateString(timezone: string = 'Asia/Yerevan'): string {
  return getDateStringInTimezone(timezone);
}

const DEFAULT_TIMEZONE = 'Asia/Yerevan';

export const DEFAULT_USER_PROFILE: UserProfileRecord = {
  id: 'user-main',
  firstName: '',
  lastName: '',
  age: 25,
  profession: 'IT Specialist',
  customProfession: '',
  proficiencyTier: 'Elementary',
  learningGoal: 'work',
  customGoal: '',
  learningStartDate: getDateStringInTimezone(DEFAULT_TIMEZONE),
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const DEFAULT_USER_SETTINGS: UserSettingsRecord = {
  id: 'settings-main',
  themeMode: 'light',
  autoLightStartTime: '07:00',
  autoDarkStartTime: '19:00',
  timezone: DEFAULT_TIMEZONE,
  autoDetectTimezone: true,
  voiceSpeedNumeric: 1.0,
  speechRate: 'normal',
  selectedVoiceURI: '',
  autoPlayAudio: false,
  preferredMorningTime: '08:30',
  dailyGoalMinutes: 15,
  exerciseDifficulty: 'adaptive',
  hintsEnabled: true,
  autoRepeatMistakes: true,
  autoAdvanceExercises: false,
  updatedAt: Date.now(),
};

export const DEFAULT_ACHIEVEMENTS: AchievementRecord[] = [
  {
    id: 'ach-welcome',
    code: 'FIRST_STEP',
    titleAm: 'Առաջին քայլը',
    descriptionAm: 'Սկսել եք անգլերենի ուսուցման ճանապարհը HayLingo-ում։',
    icon: '🚀',
    unlockedAt: Date.now(),
  },
];

export const DEFAULT_USER_PROGRESS: UserProgressData = {
  onboardingCompleted: false,
  profile: DEFAULT_USER_PROFILE,
  settings: DEFAULT_USER_SETTINGS,
  userName: 'Սովորող',
  level: 'A2',
  placementCompleted: false,
  completedLessonIds: [],
  currentLessonId: 'lesson-1-days',
  currentSentenceIndex: 0,
  lessonProgressMap: {},
  savedSentenceIds: [],
  learnedWordIds: [],
  favoriteWordIds: [],
  srsWords: {},
  completedExerciseIds: [],
  exerciseAttempts: [],
  completedRoleplayIds: [],
  speakingSessions: [],
  achievements: DEFAULT_ACHIEVEMENTS,
  correctAnswersCount: 0,
  wrongAnswersCount: 0,
  totalStudyMinutes: 5,
  dailyStudyMinutes: 5,
  dailyStudyDate: getDateStringInTimezone(DEFAULT_TIMEZONE),
  streakDays: 1,
  lastActiveDate: getDateStringInTimezone(DEFAULT_TIMEZONE),
  lastActiveTimestamp: Date.now(),
  preferredMorningTime: '08:30',
  darkMode: false,
  speechRate: 'normal',
  skills: {
    reading: 35,
    listening: 30,
    speaking: 25,
    writing: 30,
  },
  mistakes: [],
  history: [],
  teacherSession: {
    currentQuestionIndex: 0,
    difficultyScore: 2,
    masteredQuestionIds: [],
    weakTopics: [],
    messages: [],
  },
};

/**
 * Future Cloud / SQL Database Integration Interface (Section 7):
 * Ready for PostgreSQL, MySQL, or Supabase without refactoring the frontend.
 */
export interface ICloudDatabaseAdapter {
  migrateLocalUserToCloud(localData: UserProgressData): Promise<{ remoteUserId: string }>;
  createCloudBackup(userId: string, data: UserProgressData): Promise<{ backupId: string; syncedAt: number }>;
  syncAcrossDevices(userId: string, localUpdatedAt: number): Promise<UserProgressData | null>;
  recordAnalyticsEvent(userId: string, eventType: string, metadata: Record<string, unknown>): Promise<void>;
}

export interface ILearningRepository {
  loadProgressSync(): UserProgressData;
  loadProgressAsync(): Promise<UserProgressData>;
  saveProgress(data: UserProgressData): Promise<void>;
  resetProgress(): Promise<UserProgressData>;
  exportToJson(data: UserProgressData): string;
  importFromJson(jsonText: string): Promise<{ ok: boolean; data?: UserProgressData; errorAm?: string }>;
}

/**
 * Opens IndexedDB with all 12 logically separate object stores and schema migration support.
 */
function openIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_SCHEMA_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        Object.values(IDB_STORES).forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function deduplicateById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items || []) {
    if (item && item.id && !seen.has(item.id)) {
      seen.add(item.id);
      out.push(item);
    }
  }
  return out;
}

/**
 * Validates data integrity, normalizes timezone-based Daily Streak, and computes Auto Dark Mode.
 */
export function normalizeAndValidateState(raw: Partial<UserProgressData>): UserProgressData {
  const browserTz = detectBrowserTimezone();
  const mergedSettings: UserSettingsRecord = {
    ...DEFAULT_USER_SETTINGS,
    ...(raw.settings || {}),
  };

  if (mergedSettings.autoDetectTimezone && browserTz) {
    mergedSettings.timezone = browserTz;
  }

  const tz = mergedSettings.timezone || DEFAULT_TIMEZONE;
  const todayInTz = getDateStringInTimezone(tz);

  const mergedProfile: UserProfileRecord = {
    ...DEFAULT_USER_PROFILE,
    ...(raw.profile || {}),
    learningStartDate: raw.profile?.learningStartDate || todayInTz,
  };

  const derivedName =
    mergedProfile.firstName.trim()
      ? `${mergedProfile.firstName.trim()}${mergedProfile.lastName.trim() ? ' ' + mergedProfile.lastName.trim() : ''}`
      : raw.userName || 'Սովորող';

  const effectiveDark = computeEffectiveDarkMode({
    themeMode: mergedSettings.themeMode,
    timezone: tz,
    autoLightStartTime: mergedSettings.autoLightStartTime,
    autoDarkStartTime: mergedSettings.autoDarkStartTime,
  });

  let updated: UserProgressData = {
    ...DEFAULT_USER_PROGRESS,
    ...raw,
    profile: mergedProfile,
    settings: mergedSettings,
    userName: derivedName,
    darkMode: effectiveDark,
    preferredMorningTime: mergedSettings.preferredMorningTime || raw.preferredMorningTime || '08:30',
    speechRate: mergedSettings.speechRate || raw.speechRate || 'normal',
    skills: {
      ...DEFAULT_USER_PROGRESS.skills,
      ...(raw.skills || {}),
    },
    teacherSession: {
      ...DEFAULT_USER_PROGRESS.teacherSession,
      ...(raw.teacherSession || {}),
    },
    mistakes: deduplicateById(raw.mistakes || []),
    history: deduplicateById(raw.history || []),
    exerciseAttempts: deduplicateById(raw.exerciseAttempts || []),
    speakingSessions: deduplicateById(raw.speakingSessions || []),
    achievements: deduplicateById(raw.achievements || DEFAULT_ACHIEVEMENTS),
    lessonProgressMap: raw.lessonProgressMap || {},
  };

  // Timezone-accurate Daily Study Minutes & Streak calculation
  if (updated.dailyStudyDate !== todayInTz) {
    updated.dailyStudyDate = todayInTz;
    updated.dailyStudyMinutes = 0;
  }

  if (updated.lastActiveDate !== todayInTz) {
    const lastParts = (updated.lastActiveDate || todayInTz).split('-').map(Number);
    const currParts = todayInTz.split('-').map(Number);
    const lastUtc = Date.UTC(lastParts[0] || 2026, (lastParts[1] || 1) - 1, lastParts[2] || 1);
    const currUtc = Date.UTC(currParts[0] || 2026, (currParts[1] || 1) - 1, currParts[2] || 1);
    const diffDays = Math.round((currUtc - lastUtc) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      updated.streakDays = (updated.streakDays || 1) + 1;
    } else if (diffDays > 1) {
      updated.streakDays = 1;
    }
    updated.lastActiveDate = todayInTz;
  }

  // Unlock dynamic achievements
  const unlockedCodes = new Set(updated.achievements.map((a) => a.code));
  const nextAchievements = [...updated.achievements];

  if (updated.onboardingCompleted && !unlockedCodes.has('PROFILE_COMPLETED')) {
    nextAchievements.push({
      id: 'ach-profile',
      code: 'PROFILE_COMPLETED',
      titleAm: 'Անձնական Պրոֆիլ',
      descriptionAm: 'Լրացրել եք Ձեր ուսուցման պրոֆիլն ու նպատակը։',
      icon: '👤',
      unlockedAt: Date.now(),
    });
  }
  if (updated.completedLessonIds.length >= 1 && !unlockedCodes.has('FIRST_LESSON')) {
    nextAchievements.push({
      id: 'ach-lesson-1',
      code: 'FIRST_LESSON',
      titleAm: 'Առաջին ավարտած դասը',
      descriptionAm: 'Հաջողությամբ ավարտել եք Ձեր առաջին անգլերենի դասը։',
      icon: '📘',
      unlockedAt: Date.now(),
    });
  }
  if (updated.learnedWordIds.length >= 10 && !unlockedCodes.has('WORDS_10')) {
    nextAchievements.push({
      id: 'ach-words-10',
      code: 'WORDS_10',
      titleAm: 'Բառապաշարի մեկնարկ (10+ բառ)',
      descriptionAm: 'Սովորել եք առնվազն 10 անգլերեն բառ։',
      icon: '🌟',
      unlockedAt: Date.now(),
    });
  }
  if (updated.speakingSessions.length >= 1 && !unlockedCodes.has('VOICE_SPEAKER')) {
    nextAchievements.push({
      id: 'ach-voice-1',
      code: 'VOICE_SPEAKER',
      titleAm: 'Վստահ խոսող',
      descriptionAm: 'Կատարել եք ձայնային խոսակցական պարապմունք։',
      icon: '🎙️',
      unlockedAt: Date.now(),
    });
  }
  updated.achievements = nextAchievements;

  return updated;
}

class LocalLearningRepository implements ILearningRepository {
  loadProgressSync(): UserProgressData {
    if (typeof window === 'undefined') {
      return DEFAULT_USER_PROGRESS;
    }
    try {
      // 1. Check v3 snapshot first
      let rawStr = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
      // 2. Local migration from v2 if v3 does not exist yet
      if (!rawStr) {
        const legacyV2 = window.localStorage.getItem(LEGACY_STORAGE_KEY_V2);
        if (legacyV2) {
          rawStr = legacyV2;
        }
      }
      if (!rawStr) {
        return normalizeAndValidateState(DEFAULT_USER_PROGRESS);
      }
      const parsed = JSON.parse(rawStr) as Partial<UserProgressData>;
      return normalizeAndValidateState(parsed);
    } catch {
      return normalizeAndValidateState(DEFAULT_USER_PROGRESS);
    }
  }

  async loadProgressAsync(): Promise<UserProgressData> {
    const syncState = this.loadProgressSync();
    const db = await openIndexedDB();
    if (!db) {
      return syncState;
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction([IDB_STORES.users], 'readonly');
        const usersStore = tx.objectStore(IDB_STORES.users);
        const req = usersStore.get('user-main');
        req.onsuccess = () => {
          if (req.result && req.result.payload) {
            const idbPayload = req.result.payload as Partial<UserProgressData>;
            const merged = normalizeAndValidateState({
              ...syncState,
              ...idbPayload,
            });
            try {
              window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(merged));
            } catch {
              // Ignore quota errors
            }
            resolve(merged);
          } else {
            // Seed IndexedDB stores with current state
            this.saveProgress(syncState).then(() => resolve(syncState));
          }
        };
        req.onerror = () => resolve(syncState);
      } catch {
        resolve(syncState);
      }
    });
  }

  async saveProgress(data: UserProgressData): Promise<void> {
    if (typeof window === 'undefined') return;
    const normalized = normalizeAndValidateState({
      ...data,
      lastActiveTimestamp: Date.now(),
    });

    try {
      // Save small settings and fast hydration snapshot in LocalStorage
      window.localStorage.setItem(
        LIGHT_SETTINGS_KEY,
        JSON.stringify(normalized.settings)
      );
      window.localStorage.setItem(
        SNAPSHOT_STORAGE_KEY,
        JSON.stringify(normalized)
      );
    } catch {
      // Ignore localStorage quota errors
    }

    const db = await openIndexedDB();
    if (!db) return;

    return new Promise((resolve) => {
      try {
        const storeNames = Object.values(IDB_STORES);
        const tx = db.transaction(storeNames, 'readwrite');

        // 1. users store
        tx.objectStore(IDB_STORES.users).put({
          id: 'user-main',
          userName: normalized.userName,
          level: normalized.level,
          onboardingCompleted: normalized.onboardingCompleted,
          payload: normalized,
          updatedAt: Date.now(),
        });

        // 2. profiles store
        tx.objectStore(IDB_STORES.profiles).put({
          ...normalized.profile,
          id: 'profile-main',
          updatedAt: Date.now(),
        });

        // 3. settings store
        tx.objectStore(IDB_STORES.settings).put({
          ...normalized.settings,
          id: 'settings-main',
          updatedAt: Date.now(),
        });

        // 4. professions store (selected & catalog metadata)
        tx.objectStore(IDB_STORES.professions).put({
          id: 'selected-profession',
          profession: normalized.profile.profession,
          customProfession: normalized.profile.customProfession,
          catalogCount: PROFESSIONS_LIST.length,
          updatedAt: Date.now(),
        });

        // 5. lessons store (summary of available lessons)
        tx.objectStore(IDB_STORES.lessons).put({
          id: 'lessons-catalog-meta',
          totalLessons: LESSONS_DATA.length,
          currentLessonId: normalized.currentLessonId,
          updatedAt: Date.now(),
        });

        // 6. vocabulary store (learned & SRS state)
        tx.objectStore(IDB_STORES.vocabulary).put({
          id: 'vocabulary-user-state',
          learnedWordIds: normalized.learnedWordIds,
          favoriteWordIds: normalized.favoriteWordIds,
          srsWords: normalized.srsWords,
          updatedAt: Date.now(),
        });

        // 7. exercises store (completed IDs & mistake summary)
        tx.objectStore(IDB_STORES.exercises).put({
          id: 'exercises-user-state',
          completedExerciseIds: normalized.completedExerciseIds,
          mistakes: normalized.mistakes,
          updatedAt: Date.now(),
        });

        // 8. lesson_progress store (individual records per lesson)
        const lpStore = tx.objectStore(IDB_STORES.lesson_progress);
        Object.values(normalized.lessonProgressMap || {}).forEach((lp) => {
          if (lp && lp.id) {
            lpStore.put(lp);
          }
        });

        // 9. exercise_attempts store
        const attemptsStore = tx.objectStore(IDB_STORES.exercise_attempts);
        (normalized.exerciseAttempts || []).slice(0, 100).forEach((att) => {
          if (att && att.id) {
            attemptsStore.put(att);
          }
        });

        // 10. speaking_sessions store
        const speakingStore = tx.objectStore(IDB_STORES.speaking_sessions);
        (normalized.speakingSessions || []).slice(0, 100).forEach((sp) => {
          if (sp && sp.id) {
            speakingStore.put(sp);
          }
        });

        // 11. learning_history store
        const historyStore = tx.objectStore(IDB_STORES.learning_history);
        (normalized.history || []).slice(0, 100).forEach((h) => {
          if (h && h.id) {
            historyStore.put(h);
          }
        });

        // 12. achievements store
        const achStore = tx.objectStore(IDB_STORES.achievements);
        (normalized.achievements || []).forEach((ach) => {
          if (ach && ach.id) {
            achStore.put(ach);
          }
        });

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  async resetProgress(): Promise<UserProgressData> {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(SNAPSHOT_STORAGE_KEY);
        window.localStorage.removeItem(LEGACY_STORAGE_KEY_V2);
        window.localStorage.removeItem(LIGHT_SETTINGS_KEY);
      } catch {
        // Ignore
      }
    }

    const db = await openIndexedDB();
    if (db) {
      await new Promise<void>((resolve) => {
        try {
          const storeNames = Object.values(IDB_STORES);
          const tx = db.transaction(storeNames, 'readwrite');
          storeNames.forEach((name) => {
            tx.objectStore(name).clear();
          });
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }

    const fresh = normalizeAndValidateState({
      ...DEFAULT_USER_PROGRESS,
      onboardingCompleted: false,
    });
    await this.saveProgress(fresh);
    return fresh;
  }

  exportToJson(data: UserProgressData): string {
    const exportBundle = {
      schemaVersion: IDB_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      app: 'HayLingo',
      data: normalizeAndValidateState(data),
    };
    return JSON.stringify(exportBundle, null, 2);
  }

  async importFromJson(
    jsonText: string
  ): Promise<{ ok: boolean; data?: UserProgressData; errorAm?: string }> {
    try {
      const parsed = JSON.parse(jsonText);
      const rawData: Partial<UserProgressData> =
        parsed && typeof parsed === 'object' && parsed.data ? parsed.data : parsed;

      if (!rawData || typeof rawData !== 'object') {
        return {
          ok: false,
          errorAm: 'Ֆայլի կառուցվածքը վավեր չէ։ Խնդրում ենք ընտրել HayLingo-ի արտահանված JSON ֆայլ։',
        };
      }

      const restored = normalizeAndValidateState({
        ...rawData,
        onboardingCompleted: true,
      });

      await this.saveProgress(restored);
      return { ok: true, data: restored };
    } catch {
      return {
        ok: false,
        errorAm: 'Չհաջողվեց կարդալ JSON ֆայլը։ Համոզվեք, որ ֆայլը վնասված չէ։',
      };
    }
  }
}

export const learningRepository: ILearningRepository = new LocalLearningRepository();

/**
 * Spaced Repetition (SM-2 inspired) helper for Vocabulary flashcards
 */
export function calculateNextSRS(
  wordId: string,
  current: SRSWordState | undefined,
  grade: 'again' | 'hard' | 'good' | 'easy'
): SRSWordState {
  const now = Date.now();
  const prev = current || {
    wordId,
    intervalDays: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewAt: now,
    mastered: false,
    updatedAt: now,
  };

  let intervalDays = prev.intervalDays;
  let easeFactor = prev.easeFactor;
  let repetitions = prev.repetitions;

  if (grade === 'again') {
    repetitions = 0;
    intervalDays = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (grade === 'hard') {
    repetitions += 1;
    intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (grade === 'good') {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easeFactor);
  } else if (grade === 'easy') {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 3;
    else intervalDays = Math.round((intervalDays || 2) * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
  }

  const nextReviewAt =
    intervalDays === 0
      ? now + 10 * 60 * 1000
      : now + intervalDays * 24 * 60 * 60 * 1000;

  return {
    wordId,
    intervalDays,
    easeFactor,
    repetitions,
    nextReviewAt,
    lastGrade: grade,
    mastered: repetitions >= 3 && grade !== 'again',
    updatedAt: now,
  };
}

/**
 * Helper to record an answer, update skill score, mistakes, attempts, speaking sessions, and history
 */
export function recordLearningAttempt(
  state: UserProgressData,
  params: {
    isCorrect: boolean;
    skill: SkillType;
    source: 'exercise' | 'teacher' | 'voice' | 'roleplay';
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    explanationAm: string;
    activityTitleAm: string;
    minutesAdded?: number;
    exerciseId?: string;
    exerciseType?: ExerciseType;
    category?: string;
    matchRatio?: number;
  }
): UserProgressData {
  const {
    isCorrect,
    skill,
    source,
    prompt,
    userAnswer,
    correctAnswer,
    explanationAm,
    activityTitleAm,
    minutesAdded = 1,
    exerciseId,
    exerciseType,
    category,
    matchRatio = isCorrect ? 1 : 0.4,
  } = params;

  const skillDelta = isCorrect ? 2 : -1;
  const currentSkill = state.skills[skill] ?? 30;
  const nextSkill = Math.max(5, Math.min(100, currentSkill + skillDelta));

  let mistakes = [...state.mistakes];
  if (!isCorrect && userAnswer.trim()) {
    const newMistake: MistakeRecord = {
      id: `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      source,
      exerciseId,
      prompt,
      userAnswer,
      correctAnswer,
      explanationAm,
      skill,
      resolved: false,
    };
    mistakes = [newMistake, ...mistakes].slice(0, 80);
  }

  const tz = state.settings?.timezone || DEFAULT_TIMEZONE;
  const today = getDateStringInTimezone(tz);

  const historyItem: StudySessionRecord = {
    id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: today,
    timestamp: Date.now(),
    activityType: source === 'roleplay' ? 'it-roleplay' : source,
    referenceId: exerciseId,
    titleAm: activityTitleAm,
    durationMinutes: minutesAdded,
    correctDelta: isCorrect ? 1 : 0,
    wrongDelta: isCorrect ? 0 : 1,
  };

  let exerciseAttempts = [...(state.exerciseAttempts || [])];
  if (source === 'exercise' && exerciseId) {
    const attempt: ExerciseAttemptRecord = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      exerciseId,
      exerciseType: exerciseType || 'fill-blank',
      category: category || 'Ընդհանուր',
      isCorrect,
      userAnswer,
      correctAnswer,
      createdAt: Date.now(),
    };
    exerciseAttempts = [attempt, ...exerciseAttempts].slice(0, 100);
  }

  let speakingSessions = [...(state.speakingSessions || [])];
  if (source === 'voice' || source === 'roleplay' || skill === 'speaking') {
    const spSession: SpeakingSessionRecord = {
      id: `spk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      promptEn: prompt,
      targetEn: correctAnswer,
      recognizedText: userAnswer,
      matchRatio,
      isAcceptable: isCorrect,
      mode: source === 'roleplay' ? 'roleplay' : 'voice',
      durationMinutes: minutesAdded,
      createdAt: Date.now(),
    };
    speakingSessions = [spSession, ...speakingSessions].slice(0, 100);
  }

  return {
    ...state,
    correctAnswersCount: state.correctAnswersCount + (isCorrect ? 1 : 0),
    wrongAnswersCount: state.wrongAnswersCount + (isCorrect ? 0 : 1),
    totalStudyMinutes: (state.totalStudyMinutes || 0) + minutesAdded,
    dailyStudyMinutes: state.dailyStudyMinutes + minutesAdded,
    lastActiveTimestamp: Date.now(),
    skills: {
      ...state.skills,
      [skill]: nextSkill,
    },
    mistakes,
    exerciseAttempts,
    speakingSessions,
    history: [historyItem, ...state.history].slice(0, 100),
  };
}

export const CEFR_LEVELS: { level: CEFRLevel; labelAm: string; descAm: string }[] = [
  { level: 'A1', labelAm: 'A1 · Սկսնակ (Beginner)', descAm: 'Պարզ բառեր, թվեր, օրեր և ամենօրյա կարճ արտահայտություններ' },
  { level: 'A2', labelAm: 'A2 · Տարրական (Elementary)', descAm: 'Առօրյա խոսակցություններ, պարզ աշխատանքային և ճանապարհորդական թեմաներ' },
  { level: 'B1', labelAm: 'B1 · Միջին (Intermediate)', descAm: 'Աշխատանքային երկխոսություններ, IT խնդիրների բացատրություն և հարցազրույցներ' },
  { level: 'B2', labelAm: 'B2 · Միջինից բարձր (Upper-Int)', descAm: 'Տեխնիկական քննարկումներ, բարդ նախադասություններ և վստահ հաղորդակցում' },
  { level: 'C1', labelAm: 'C1 · Առաջադեմ (Advanced)', descAm: 'Մասնագիտական ճշգրիտ անգլերեն, երկար վերլուծական նախադասություններ' },
  { level: 'C2', labelAm: 'C2 · Վարպետ (Proficiency)', descAm: 'Լիարժեք և բնական լեզվական տիրապետում բոլոր իրավիճակներում' },
];
