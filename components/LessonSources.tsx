'use client';

import { ExternalLink, Volume2 } from 'lucide-react';
import { LEARNING_SOURCES, VOA_WELCOME_EXCERPT } from '../data/international-sources';
import { useStudyActivity } from '../lib/study-activity';
import type { LessonItem } from '../lib/types';

export default function LessonSources({lesson, age, onSpeak}: {lesson: LessonItem; age: number; onSpeak: (text: string, speed?: 'slow' | 'normal') => void}) {
  const study = useStudyActivity();
  const voaLesson = ['foundation-introduction', 'foundation-dialogue-name', 'foundation-dialogue-greeting'].includes(lesson.id);
  const sourceIds = new Set(lesson.sourceIds || (voaLesson ? ['voa-welcome'] : []));
  if (lesson.id.startsWith('foundation-alphabet-')) sourceIds.add('pcc-sounds');
  if (age < 18 && ['foundation-people', 'intl-colors'].includes(lesson.id)) sourceIds.add('cambridge-young');
  const sources = LEARNING_SOURCES.filter(source => sourceIds.has(source.id));
  if (!sources.length) return null;

  return <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
    {voaLesson && <details className="rounded-xl bg-emerald-500/5 p-4">
      <summary className="cursor-pointer font-semibold">Փոքր զրույց՝ VOA-ի դասից</summary>
      <p className="my-3 text-sm text-slate-500">Լսիր յուրաքանչյուր խոսքը և կրկնիր բարձրաձայն։ Սա լրացուցիչ օրինակ է․ ավարտի պարտադիր հարցերը վերևում են։</p>
      <div className="space-y-4">{VOA_WELCOME_EXCERPT.map((line, index) => <article key={index} className="space-y-1 break-words">
        <span className="text-xs font-bold text-slate-500">{line.speaker}</span>
        <p lang="en" data-learning-text="english" className="font-semibold">{line.english}</p>
        <p data-learning-text="pronunciation" className="text-emerald-700 dark:text-emerald-300">{line.pronunciation}</p>
        <p data-learning-text="armenian">{line.armenian}</p>
        <button type="button" onClick={() => {study.start(); onSpeak(line.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2"><Volume2 size={16} />Լսել</button>
      </article>)}</div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">Աղբյուր՝ <a href="https://learningenglish.voanews.com/a/lets-learn-english-lesson-one/3111026.html" target="_blank" rel="noopener noreferrer" className="underline">VOA Learning English, Lesson 1: Welcome!</a>։ Կրճատված հատված․ հայերեն թարգմանությունը և հուշումները՝ HayLingo։</p>
    </details>}
    <details className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <summary className="cursor-pointer text-sm font-semibold">Դասի աղբյուրները և լրացուցիչ նյութերը</summary>
      <p className="my-3 text-sm text-slate-500">Հղումները բացվում են առանձին կայքում։ Դրանց այցելելը պարտադիր չէ դասը կամ ամփոփիչ աշխատանքն ավարտելու համար։</p>
      <ul className="space-y-5">{sources.map(source => <li key={source.id} className="space-y-2 text-sm leading-relaxed">
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold underline">{source.title}<ExternalLink size={14} className="shrink-0" /></a>
        <p>{source.credit}</p><p className="text-slate-500">{source.useAm}</p>
        {source.license && <a href={source.license.url} target="_blank" rel="noopener noreferrer" className="underline">{source.license.label}</a>}
      </li>)}</ul>
    </details>
  </div>;
}
