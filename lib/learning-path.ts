import { LESSONS_DATA } from '../data/lessons';
import { A1_CHAPTERS, A1_FINAL_QUESTIONS, getA1Chapter } from '../data/a1-course';
import type { CEFRLevel, LessonItem, LessonSentence, UserProgressData } from './types';

export const COURSE_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const isAtOrBelowLevel = (level: CEFRLevel, maximum: CEFRLevel) =>
  COURSE_LEVELS.indexOf(level) >= 0 && COURSE_LEVELS.indexOf(level) <= COURSE_LEVELS.indexOf(maximum);

// Exact spelling and word order, with harmless formatting differences allowed.
export function isCorrectWrittenAnswer(sentence: LessonSentence, answer: string): boolean {
  const normalize = (value: string) => {
    const text = value.normalize('NFKC').replace(/[’‘]/g, "'")
      .trim().replace(/[.!?]+$/g, '').replace(/[-‐‑]/g, ' ').replace(/\s+/g, ' ').trim();
    return sentence.writingTask?.caseSensitive ? text : text.toLowerCase();
  };
  const actual = normalize(answer);
  return actual.length > 0 && [sentence.english, ...(sentence.writingTask?.acceptedAnswers || [])]
    .some(expected => normalize(expected) === actual);
}

export function isCourseStepComplete(progress: UserProgressData, sentenceId: string): boolean {
  return Boolean(progress.learningPath?.writtenSentenceIds?.includes(sentenceId));
}

export function getCourseLessons(level: CEFRLevel): LessonItem[] {
  return LESSONS_DATA.filter(lesson => lesson.level === level &&
    !['it-specialist', 'professional-english'].includes(lesson.categoryId) &&
    !['lesson-20-listening-technical', 'lesson-22-error-correction-work'].includes(lesson.id)
  ).sort((a, b) => a.order - b.order);
}

export function isCourseLessonComplete(progress: UserProgressData, lesson: LessonItem) {
  return progress.completedLessonIds.includes(lesson.id) && lesson.sentences.length > 0 &&
    lesson.sentences.every(sentence => isCourseStepComplete(progress, sentence.id)) && isCourseReadingComplete(progress, lesson);
}

export function isCourseReadingComplete(progress: UserProgressData, lesson: LessonItem): boolean {
  if (lesson.level !== 'A1') return true;
  const chapter = getA1Chapter(lesson.id);
  return Boolean(chapter?.questions.length && chapter.questions.every(question => progress.learningPath?.readingAnswerIds?.includes(question.id)));
}

export function areCourseLessonsComplete(progress: UserProgressData, level = progress.level) {
  const lessons = getCourseLessons(level);
  return lessons.length > 0 && lessons.every(lesson => isCourseLessonComplete(progress, lesson));
}

export function isA1AssessmentComplete(progress: UserProgressData): boolean {
  return A1_FINAL_QUESTIONS.length > 0 && A1_FINAL_QUESTIONS.every(question => progress.learningPath?.assessmentAnswerIds?.includes(question.id));
}

export function isLevelCourseComplete(progress: UserProgressData, level = progress.level) {
  return areCourseLessonsComplete(progress, level) && (level !== 'A1' || isA1AssessmentComplete(progress));
}

export function canOpenCourseLesson(progress: UserProgressData, lessonId: string) {
  const lessons = getCourseLessons(progress.level);
  const index = lessons.findIndex(lesson => lesson.id === lessonId);
  const next = lessons.findIndex(lesson => !isCourseLessonComplete(progress, lesson));
  return index >= 0 && (next < 0 || index <= next);
}

export function getCurrentCourseLesson(progress: UserProgressData) {
  const lessons = getCourseLessons(progress.level);
  return lessons.find(lesson => !isCourseLessonComplete(progress, lesson)) || lessons[lessons.length - 1];
}

export function getFirstUnverifiedIndex(progress: UserProgressData, lesson: LessonItem) {
  const index = lesson.sentences.findIndex(sentence => !isCourseStepComplete(progress, sentence.id));
  return index < 0 ? lesson.sentences.length - 1 : index;
}

export function getNextCourseLevel(progress: UserProgressData): CEFRLevel | undefined {
  if (!isLevelCourseComplete(progress)) return undefined;
  const next = COURSE_LEVELS[COURSE_LEVELS.indexOf(progress.level) + 1];
  return next && getCourseLessons(next).length ? next : undefined;
}

export function normalizeLearningPath(progress: UserProgressData): UserProgressData {
  const saved = progress.learningPath;
  const sameUser = saved?.userId === progress.profile.id;
  let entryLevel: CEFRLevel = sameUser && saved && COURSE_LEVELS.includes(saved.entryLevel)
    ? saved.entryLevel : COURSE_LEVELS.includes(progress.level) ? progress.level : 'A1';
  // Keep a previously earned level during the one-time writing-check migration.
  // Multiple-choice history remains stored, but does not count as a written answer.
  if (sameUser && saved && (saved.writtenSentenceIds === undefined || saved.readingAnswerIds === undefined) &&
    COURSE_LEVELS.includes(progress.level) && isAtOrBelowLevel(entryLevel, progress.level)) {
    entryLevel = progress.level;
  }
  const validIds = new Set(LESSONS_DATA.flatMap(lesson => lesson.sentences.map(sentence => sentence.id)));
  const verifiedSentenceIds = sameUser && saved && Array.isArray(saved.verifiedSentenceIds)
    ? [...new Set(saved.verifiedSentenceIds.filter(id => typeof id === 'string' && validIds.has(id)))] : [];
  const writtenSentenceIds = sameUser && saved && Array.isArray(saved.writtenSentenceIds)
    ? [...new Set(saved.writtenSentenceIds.filter(id => typeof id === 'string' && validIds.has(id)))] : [];
  const readingIds = new Set(A1_CHAPTERS.flatMap(chapter => chapter.questions.map(question => question.id)));
  const assessmentIds = new Set(A1_FINAL_QUESTIONS.map(question => question.id));
  const readingAnswerIds = sameUser && Array.isArray(saved?.readingAnswerIds)
    ? [...new Set(saved.readingAnswerIds.filter(id => readingIds.has(id)))] : [];
  const assessmentAnswerIds = sameUser && Array.isArray(saved?.assessmentAnswerIds)
    ? [...new Set(saved.assessmentAnswerIds.filter(id => assessmentIds.has(id)))] : [];
  const result = {...progress, learningPath: {userId: progress.profile.id, entryLevel, verifiedSentenceIds, writtenSentenceIds, readingAnswerIds, assessmentAnswerIds}};
  let highest = entryLevel;
  while (isLevelCourseComplete(result, highest)) {
    const next = COURSE_LEVELS[COURSE_LEVELS.indexOf(highest) + 1];
    if (!next || !getCourseLessons(next).length) break;
    highest = next;
  }
  if (!COURSE_LEVELS.includes(result.level) || !isAtOrBelowLevel(result.level, highest)) result.level = highest;
  result.profile = {...result.profile, proficiencyTier: result.level === 'A1' ? 'Beginner' : result.level === 'A2' ? 'Elementary' : ['B1', 'B2'].includes(result.level) ? 'Intermediate' : 'Advanced'};
  if (!canOpenCourseLesson(result, result.currentLessonId)) {
    result.currentLessonId = getCurrentCourseLesson(result)?.id || '';
    result.currentSentenceIndex = 0;
  }
  const active = getCourseLessons(result.level).find(lesson => lesson.id === result.currentLessonId);
  if (active) result.currentSentenceIndex = Math.max(0, Math.min(result.currentSentenceIndex || 0, getFirstUnverifiedIndex(result, active)));
  return result;
}

// Personal pages remain usable; additional study pages unlock after the active course.
export function isCoursePageUnlocked(progress: UserProgressData, tab: string) {
  return ['Dashboard', 'Lessons', 'Profile', 'Settings', 'My Progress'].includes(tab) || isLevelCourseComplete(progress);
}
