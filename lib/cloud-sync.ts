import type { UserProgressData } from './types';
import { normalizeAndValidateState } from './storage';

export interface CloudSession {
  userId: string;
  email: string;
  token: string;
  lastSyncedAt?: number;
}

const CLOUD_SESSION_KEY = 'haylingo_cloud_session_v1';

function uniqueStrings(a: string[] = [], b: string[] = []): string[] {
  return Array.from(new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]));
}

function mergeById<T extends { id: string }>(a: T[] = [], b: T[] = []): T[] {
  const map = new Map<string, T>();
  for (const item of Array.isArray(a) ? a : []) {
    if (item && typeof item.id === 'string') map.set(item.id, item);
  }
  for (const item of Array.isArray(b) ? b : []) {
    if (item && typeof item.id === 'string') map.set(item.id, item);
  }
  return Array.from(map.values());
}

/**
 * Losslessly merges local and remote progress data across Phone and Computer
 * so that neither device ever overwrites or loses lessons, words, or steps completed on the other.
 */
export function mergeProgressData(
  localRaw: UserProgressData,
  remoteRaw?: UserProgressData | null
): UserProgressData {
  if (!remoteRaw || typeof remoteRaw !== 'object') {
    return normalizeAndValidateState(localRaw);
  }

  const local = normalizeAndValidateState(localRaw);
  const remote = normalizeAndValidateState(remoteRaw);

  const localTime = Number(local.lastActiveTimestamp || 0);
  const remoteTime = Number(remote.lastActiveTimestamp || 0);
  const primary = remoteTime > localTime ? remote : local;
  const secondary = remoteTime > localTime ? local : remote;

  const profilePrimary =
    Number(remote.profile?.updatedAt || 0) > Number(local.profile?.updatedAt || 0)
      ? remote.profile
      : local.profile;

  const settingsPrimary =
    Number(remote.settings?.updatedAt || 0) > Number(local.settings?.updatedAt || 0)
      ? remote.settings
      : local.settings;

  const merged: UserProgressData = {
    ...secondary,
    ...primary,
    onboardingCompleted: Boolean(local.onboardingCompleted || remote.onboardingCompleted),
    profile: {
      ...secondary.profile,
      ...profilePrimary,
    },
    settings: {
      ...secondary.settings,
      ...settingsPrimary,
    },
    completedLessonIds: uniqueStrings(local.completedLessonIds, remote.completedLessonIds),
    learnedWordIds: uniqueStrings(local.learnedWordIds, remote.learnedWordIds),
    favoriteWordIds: uniqueStrings(local.favoriteWordIds, remote.favoriteWordIds),
    completedExerciseIds: uniqueStrings(local.completedExerciseIds, remote.completedExerciseIds),
    savedSentenceIds: uniqueStrings(local.savedSentenceIds, remote.savedSentenceIds),
    completedRoleplayIds: uniqueStrings(local.completedRoleplayIds, remote.completedRoleplayIds),
    correctAnswersCount: Math.max(
      Number(local.correctAnswersCount || 0),
      Number(remote.correctAnswersCount || 0)
    ),
    wrongAnswersCount: Math.max(
      Number(local.wrongAnswersCount || 0),
      Number(remote.wrongAnswersCount || 0)
    ),
    totalStudyMinutes: Math.max(
      Number(local.totalStudyMinutes || 0),
      Number(remote.totalStudyMinutes || 0)
    ),
    dailyStudyMinutes: Math.max(
      Number(local.dailyStudyMinutes || 0),
      Number(remote.dailyStudyMinutes || 0)
    ),
    streakDays: Math.max(Number(local.streakDays || 0), Number(remote.streakDays || 0)),
    lastActiveTimestamp: Math.max(localTime, remoteTime, Date.now()),
    skills: {
      reading: Math.max(local.skills?.reading || 0, remote.skills?.reading || 0),
      listening: Math.max(local.skills?.listening || 0, remote.skills?.listening || 0),
      speaking: Math.max(local.skills?.speaking || 0, remote.skills?.speaking || 0),
      writing: Math.max(local.skills?.writing || 0, remote.skills?.writing || 0),
    },
    learningPath: {
      userId: profilePrimary.id,
      entryLevel: primary.learningPath?.entryLevel || secondary.learningPath?.entryLevel || 'A1',
      verifiedSentenceIds: uniqueStrings(
        local.learningPath?.verifiedSentenceIds,
        remote.learningPath?.verifiedSentenceIds
      ),
      writtenSentenceIds: uniqueStrings(
        local.learningPath?.writtenSentenceIds,
        remote.learningPath?.writtenSentenceIds
      ),
      readingAnswerIds: uniqueStrings(
        local.learningPath?.readingAnswerIds,
        remote.learningPath?.readingAnswerIds
      ),
      assessmentAnswerIds: uniqueStrings(
        local.learningPath?.assessmentAnswerIds,
        remote.learningPath?.assessmentAnswerIds
      ),
      curriculumRevision: Math.max(
        Number(local.learningPath?.curriculumRevision || 0),
        Number(remote.learningPath?.curriculumRevision || 0)
      ),
    },
    history: mergeById(local.history, remote.history),
    mistakes: mergeById(local.mistakes, remote.mistakes),
    exerciseAttempts: mergeById(local.exerciseAttempts, remote.exerciseAttempts),
    speakingSessions: mergeById(local.speakingSessions, remote.speakingSessions),
    dailyWordAttempts: mergeById(local.dailyWordAttempts, remote.dailyWordAttempts),
    achievements: mergeById(local.achievements, remote.achievements),
    lessonProgressMap: {
      ...(secondary.lessonProgressMap || {}),
      ...(primary.lessonProgressMap || {}),
    },
    dailyConversationsMap: {
      ...(secondary.dailyConversationsMap || {}),
      ...(primary.dailyConversationsMap || {}),
    },
    readingProgressMap: {
      ...(secondary.readingProgressMap || {}),
      ...(primary.readingProgressMap || {}),
    },
    grammarAttemptsMap: {
      ...(secondary.grammarAttemptsMap || {}),
      ...(primary.grammarAttemptsMap || {}),
    },
    pronunciationProgressMap: {
      ...(secondary.pronunciationProgressMap || {}),
      ...(primary.pronunciationProgressMap || {}),
    },
    srsWords: {
      ...(secondary.srsWords || {}),
      ...(primary.srsWords || {}),
    },
  };

  return normalizeAndValidateState(merged);
}

export function getProgressSignature(progress: UserProgressData): string {
  return JSON.stringify({
    level: progress.level,
    lesson: progress.currentLessonId,
    idx: progress.currentSentenceIndex,
    completed: progress.completedLessonIds?.length || 0,
    written: progress.learningPath?.writtenSentenceIds?.length || 0,
    verified: progress.learningPath?.verifiedSentenceIds?.length || 0,
    reading: progress.learningPath?.readingAnswerIds?.length || 0,
    assessment: progress.learningPath?.assessmentAnswerIds?.length || 0,
    words: progress.learnedWordIds?.length || 0,
    saved: progress.savedSentenceIds?.length || 0,
    correct: progress.correctAnswersCount || 0,
    wrong: progress.wrongAnswersCount || 0,
    minutes: progress.totalStudyMinutes || 0,
    name: progress.userName,
    profUpdated: progress.profile?.updatedAt || 0,
    setUpdated: progress.settings?.updatedAt || 0,
  });
}

export function getStoredCloudSession(): CloudSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CLOUD_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && typeof parsed.token === 'string') {
      return parsed as CloudSession;
    }
  } catch {}
  return null;
}

export function setStoredCloudSession(session: CloudSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!session) {
      localStorage.removeItem(CLOUD_SESSION_KEY);
    } else {
      localStorage.setItem(CLOUD_SESSION_KEY, JSON.stringify(session));
    }
  } catch {}
}

export async function cloudRegister(
  email: string,
  password: string,
  localProgress?: UserProgressData
): Promise<{
  ok: boolean;
  session?: CloudSession;
  progressData?: UserProgressData | null;
  errorAm?: string;
  messageAm?: string;
}> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, progressData: localProgress }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Գրանցումը ձախողվեց։' };
    }

    const session: CloudSession = {
      userId: data.user.id,
      email: data.user.email,
      token: data.token,
      lastSyncedAt: Date.now(),
    };
    setStoredCloudSession(session);

    return {
      ok: true,
      session,
      progressData: localProgress || null,
      messageAm: data.messageAm || 'Գրանցումը հաջողվեց։',
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Չհաջողվեց կապվել սերվերի հետ։'}`,
    };
  }
}

export async function cloudLogin(
  email: string,
  password: string,
  localProgress?: UserProgressData
): Promise<{
  ok: boolean;
  session?: CloudSession;
  progressData?: UserProgressData | null;
  errorAm?: string;
  messageAm?: string;
}> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Մուտքը ձախողվեց։' };
    }

    const session: CloudSession = {
      userId: data.user.id,
      email: data.user.email,
      token: data.token,
      lastSyncedAt: data.lastSyncedAt || Date.now(),
    };
    setStoredCloudSession(session);

    let finalProgress: UserProgressData | null = data.progressData || null;
    if (localProgress && finalProgress) {
      finalProgress = mergeProgressData(localProgress, finalProgress);
      void cloudSyncPush(finalProgress);
    } else if (localProgress && !finalProgress) {
      finalProgress = localProgress;
      void cloudSyncPush(localProgress);
    }

    return {
      ok: true,
      session,
      progressData: finalProgress,
      messageAm: data.messageAm || 'Մուտքը հաջողվեց։',
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Չհաջողվեց կապվել սերվերի հետ։'}`,
    };
  }
}

export function cloudLogout(): void {
  setStoredCloudSession(null);
}

export async function cloudSyncPush(
  progressData: UserProgressData,
  options?: { keepalive?: boolean; forceOverwrite?: boolean }
): Promise<{
  ok: boolean;
  lastSyncedAt?: number;
  progressData?: UserProgressData;
  errorAm?: string;
}> {
  const session = getStoredCloudSession();
  if (!session || !session.token) {
    return { ok: false, errorAm: 'Մուտք չեք գործել առցանց բազա։' };
  }

  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      keepalive: options?.keepalive,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        progressData,
        forceOverwrite: options?.forceOverwrite === true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Համաժամեցումը ձախողվեց։' };
    }

    session.lastSyncedAt = data.lastSyncedAt || Date.now();
    setStoredCloudSession(session);

    return {
      ok: true,
      lastSyncedAt: session.lastSyncedAt,
      progressData: data.progressData,
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Անցանց ռեժիմ'}`,
    };
  }
}

export async function cloudSyncPull(): Promise<{
  ok: boolean;
  progressData?: UserProgressData | null;
  lastSyncedAt?: number;
  errorAm?: string;
}> {
  const session = getStoredCloudSession();
  if (!session || !session.token) {
    return { ok: false, errorAm: 'Մուտք չեք գործել առցանց բազա։' };
  }

  try {
    const res = await fetch(`/api/sync?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Cache-Control': 'no-cache',
      },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Տվյալների բեռնումը ձախողվեց։' };
    }

    if (data.lastSyncedAt) {
      session.lastSyncedAt = data.lastSyncedAt;
      setStoredCloudSession(session);
    }

    return {
      ok: true,
      progressData: data.progressData || null,
      lastSyncedAt: data.lastSyncedAt,
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Անցանց ռեժիմ'}`,
    };
  }
}

export async function checkCloudStatus(): Promise<{ isConfigured: boolean }> {
  try {
    const res = await fetch('/api/auth/status');
    const data = await res.json();
    return { isConfigured: Boolean(data?.isConfigured) };
  } catch {
    return { isConfigured: false };
  }
}
