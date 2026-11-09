'use client';

import { Volume2 } from 'lucide-react';
import type { LearningMonth } from '../data/months';
import { useStudyActivity } from '../lib/study-activity';

export default function MonthReference({months, translation = true, onSpeak}: {
  months: readonly LearningMonth[];
  translation?: boolean;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}) {
  const study = useStudyActivity();
  return <ul className="grid min-w-0 gap-3 sm:grid-cols-3" aria-label="Ամիսների քարտեր">
    {months.map(month => <li key={month.id} className="min-w-0 space-y-2 break-words rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-semibold text-slate-500">{month.number === 1 ? '1-ին' : `${month.number}-րդ`} ամիս</p>
      <p lang="en" data-learning-text="english" className="font-bold">{month.english}</p>
      {translation && <>
        <p data-learning-text="armenian" className="font-semibold">{month.armenian}</p>
        <p data-learning-text="pronunciation" className="text-emerald-700 dark:text-emerald-300">{month.pronunciation}</p>
      </>}
      <button type="button" aria-label={`Լսել ${month.english}`} onClick={() => {study.start(); onSpeak(month.english, 'slow');}} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
        <Volume2 size={18} className="shrink-0" />Լսել
      </button>
    </li>)}
  </ul>;
}
