import { PROFESSIONAL_DIALOGUES } from '../data/professional-practice';
import { COMMON_TRANSLATION_GROUPS } from '../data/common-translations';
import { ALL_LESSON_SENTENCES } from '../data/lessons';
import { VOCABULARY_ITEMS } from '../data/vocabulary';
import { IT_DIALOGUES, IT_TOPICS } from '../data/it-english';
import { PROFESSIONS_LIST } from '../data/professions';
import { TEACHER_CURRICULUM, VOICE_PRACTICE_ITEMS } from '../data/placement-and-teacher';

export type TranslationLanguage = 'en' | 'hy';
export interface TranslationEntry {
  english: string;
  armenian: string;
  category: string;
  pronunciation?: string;
}

export function normalizeTranslationText(text: string): string {
  return text.normalize('NFKC').trim().toLowerCase().replace(/[’‘]/g, "'")
    .replace(/[՞՜՛՚]/g, '').replace(/[։.!?]+$/g, '').replace(/\s+/g, ' ').trim();
}

const entries: TranslationEntry[] = [
  ...PROFESSIONAL_DIALOGUES.flatMap(d => [d.question,d.answer,d.followUp,d.followUpAnswer].map(([english,pronunciation,armenian])=>({english,pronunciation,armenian,category:"Մասնագիտական պարապմունք"}))),
  ...COMMON_TRANSLATION_GROUPS.flatMap(({ category, pairs }) =>
    pairs.map(([english, armenian]) => ({ english, armenian, category }))),
  ...VOCABULARY_ITEMS.flatMap((word) => [
    { english: word.word, armenian: word.armenian, category: word.category, pronunciation: word.pronunciation },
    { english: word.exampleEn, armenian: word.exampleAm, category: word.category, pronunciation: word.examplePronunciation },
  ]),
  ...ALL_LESSON_SENTENCES.map((sentence) => ({ ...sentence, category: 'Դասեր' })),
  ...IT_TOPICS.flatMap((topic) => topic.keyPhrases.map((phrase) => ({ ...phrase, category: topic.titleAm }))),
  ...IT_DIALOGUES.flatMap((dialogue) => dialogue.turns.map((turn) => ({ ...turn, category: 'ՏՏ երկխոսություն' }))),
  ...PROFESSIONS_LIST.flatMap((profession) => profession.sampleSentences.map((sentence) => ({ ...sentence, category: profession.titleAm }))),
  ...VOICE_PRACTICE_ITEMS.flatMap((item) => [
    { english: item.questionEn, armenian: item.questionAm, category: 'Խոսակցական', pronunciation: item.questionPronunciation },
    { english: item.targetAnswerEn, armenian: item.targetAnswerAm, category: 'Խոսակցական', pronunciation: item.targetPronunciation },
  ]),
  ...TEACHER_CURRICULUM.map((question) => ({
    english: question.questionEn, armenian: question.questionAm,
    category: 'Հարցաշար', pronunciation: question.questionPronunciation,
  })),
];

const uniqueEntries = new Map<string, TranslationEntry>();
for (const entry of entries) {
  if (!entry.english.trim() || !entry.armenian.trim()) continue;
  const key = `${normalizeTranslationText(entry.english)}|${normalizeTranslationText(entry.armenian)}`;
  if (!uniqueEntries.has(key)) uniqueEntries.set(key, entry);
}

export const TRANSLATION_DICTIONARY = Array.from(uniqueEntries.values());
const indexes: Record<TranslationLanguage, Map<string, TranslationEntry>> = { en: new Map(), hy: new Map() };
for (const entry of TRANSLATION_DICTIONARY) {
  for (const language of ['en', 'hy'] as const) {
    const key = normalizeTranslationText(language === 'en' ? entry.english : entry.armenian);
    if (!indexes[language].has(key)) indexes[language].set(key, entry);
  }
}

export function findLocalTranslation(text: string, from: TranslationLanguage): TranslationEntry | undefined {
  return indexes[from].get(normalizeTranslationText(text));
}

export function searchTranslationDictionary(query: string, limit = 12): TranslationEntry[] {
  const normalized = normalizeTranslationText(query);
  if (!normalized) return TRANSLATION_DICTIONARY.slice(0, limit);
  return TRANSLATION_DICTIONARY.filter((entry) =>
    normalizeTranslationText(entry.english).includes(normalized) ||
    normalizeTranslationText(entry.armenian).includes(normalized)
  ).slice(0, limit);
}
