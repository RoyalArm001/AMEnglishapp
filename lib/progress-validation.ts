import { PROFESSIONS_LIST } from '../data/professions';
// Validate before touching either storage backend. Unknown future fields remain intact.
export function isValidProgressBackup(value: unknown): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  if (!('profile' in data || 'userName' in data)) return false;
  if (!Array.isArray(data.completedLessonIds) || !['A1','A2','B1','B2','C1','C2'].includes(String(data.level))) return false;
  if ('onboardingCompleted' in data && typeof data.onboardingCompleted !== 'boolean') return false;
  if (data.teacherSession && typeof data.teacherSession === 'object') {
    const session = data.teacherSession as Record<string, unknown>;
    for (const key of ['masteredQuestionIds', 'weakTopics', 'messages']) if (key in session && !Array.isArray(session[key])) return false;
    for (const key of ['masteredQuestionIds', 'weakTopics']) if (Array.isArray(session[key]) && !(session[key] as unknown[]).every(v => typeof v === 'string')) return false;
    if (Array.isArray(session.messages) && !session.messages.every(v => v && typeof v === 'object' && typeof v.id === 'string' && ['user','teacher'].includes(v.role))) return false;
    for (const key of ['currentQuestionIndex','difficultyScore']) if (key in session && (typeof session[key] !== 'number' || Number(session[key]) < 0)) return false;
  }
  const stringArrays = ['completedLessonIds', 'savedSentenceIds', 'learnedWordIds', 'favoriteWordIds', 'completedExerciseIds', 'completedRoleplayIds'];
  for (const key of stringArrays) {
    if (key in data && (!Array.isArray(data[key]) || !(data[key] as unknown[]).every(v => typeof v === 'string'))) return false;
  }
  const safe = (item: unknown): boolean => {
    if (typeof item === 'number') return Number.isFinite(item);
    if (item === null || typeof item !== 'object') return true;
    return Object.entries(item).every(([key, v]) => !['__proto__', 'prototype', 'constructor'].includes(key) && safe(v));
  };
  if (!safe(data)) return false;
  for (const key of ['profile', 'settings', 'skills', 'teacherSession', 'lessonProgressMap', 'srsWords']) {
    if (key in data && (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key]))) return false;
  }
  for (const key of ['history', 'mistakes', 'achievements', 'speakingSessions', 'exerciseAttempts']) {
    if (key in data && (!Array.isArray(data[key]) || !(data[key] as unknown[]).every(v => v && typeof v === 'object' && typeof (v as {id?: unknown}).id === 'string'))) return false;
  }
  if (data.profile) {
    const profile = data.profile as Record<string, unknown>;
    for (const key of ['firstName', 'lastName', 'profession', 'customProfession']) if (key in profile && typeof profile[key] !== 'string') return false;
    if ('profession' in profile && !PROFESSIONS_LIST.some(p => p.id === profile.profession)) return false;
  }
  if ('userName' in data && typeof data.userName !== 'string') return false;
  if (data.settings) {
    const settings = data.settings as Record<string, unknown>;
    for (const key of ['timezone','selectedVoiceURI','autoLightStartTime','autoDarkStartTime','preferredMorningTime']) if (key in settings && typeof settings[key] !== 'string') return false;
    if ('timezone' in settings) { try { new Intl.DateTimeFormat('en', { timeZone: String(settings.timezone) }); } catch { return false; } }
    if ('userId' in settings && (typeof settings.userId !== 'string' || !settings.userId)) return false;
    if ('keepScreenAwake' in settings && typeof settings.keepScreenAwake !== 'boolean') return false;
    if ('displayMode' in settings && !['auto','desktop','mobile'].includes(String(settings.displayMode))) return false;
    if ('fontSizes' in settings) {
      if (!settings.fontSizes || typeof settings.fontSizes !== 'object' || Array.isArray(settings.fontSizes)) return false;
      for (const size of Object.values(settings.fontSizes)) if (typeof size !== 'number' || !Number.isInteger(size) || size < 14 || size > 30) return false;
    }
    if ('themeMode' in settings && !['light','dark','auto'].includes(String(settings.themeMode))) return false;
    for (const key of ['autoDetectTimezone','autoPlayAudio','hintsEnabled','autoRepeatMistakes','autoAdvanceExercises']) if (key in settings && typeof settings[key] !== 'boolean') return false;
    for (const key of ['voiceSpeedNumeric','dailyGoalMinutes']) if (key in settings && (typeof settings[key] !== 'number' || Number(settings[key]) <= 0)) return false;
  }
  if (data.skills && Object.values(data.skills).some(value => typeof value !== 'number' || value < 0 || value > 100)) return false;
  for (const key of ['lessonProgressMap','srsWords']) {
    if (data[key] && Object.values(data[key]).some(value => !value || typeof value !== 'object' || Array.isArray(value))) return false;
  }
  for (const key of ['totalStudyMinutes', 'dailyStudyMinutes', 'streakDays', 'correctAnswersCount', 'wrongAnswersCount']) {
    if (key in data && (typeof data[key] !== 'number' || Number(data[key]) < 0)) return false;
  }
  return true;
}
