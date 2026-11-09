'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Volume2 } from 'lucide-react';
import { MONTH_GROUPS, MONTH_GROUP_SIZE } from '../data/months';
import { getFirstUnverifiedIndex, isCorrectWrittenAnswer, isCourseStepComplete } from '../lib/learning-path';
import { useStudyActivity } from '../lib/study-activity';
import type { LessonItem, UserProgressData } from '../lib/types';
import MonthReference from './MonthReference';

interface Props {
  lesson: LessonItem;
  progress: UserProgressData;
  onVerify: (lessonId: string, sentenceId: string, answer: string) => void;
  onUpdateSentencePosition: (lessonId: string, index: number) => void;
  onToggleSaveSentence: (id: string) => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}
const primaryButton = 'min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40';
const secondaryButton = 'inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700';

// The parent keys this component by user, lesson and position. Only written
// answers are persisted; preview and recognition can safely repeat on refresh.
export default function MonthsLessonStep({lesson, progress, onVerify, onUpdateSentencePosition, onToggleSaveSentence, onSpeak}: Props) {
  const index = Math.max(0, Math.min(progress.currentSentenceIndex, getFirstUnverifiedIndex(progress, lesson)));
  const sentence = lesson.sentences[index];
  const groupIndex = Math.floor(index / MONTH_GROUP_SIZE);
  const group = MONTH_GROUPS[groupIndex];
  const groupFinished = group.months.every(month => isCourseStepComplete(progress, month.id));
  const verified = isCourseStepComplete(progress, sentence.id);
  const [phase, setPhase] = useState<'learn' | 'choose' | 'write'>(index % MONTH_GROUP_SIZE === 0 ? 'learn' : 'choose');
  const [answer, setAnswer] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const [wrongChoice, setWrongChoice] = useState('');
  const [hint, setHint] = useState(false);
  const study = useStudyActivity();
  // Stable, varied option positions, without changing the calendar order on the cards.
  const choices = [...group.months].sort((a, b) => a.english.localeCompare(b.english));
  const saved = progress.savedSentenceIds.includes(sentence.id);

  return <section id="course-lesson-step" aria-labelledby="months-lesson-title" className="scroll-mt-24 min-w-0 space-y-5 break-words rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
    <header className="space-y-2">
      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Մաս {groupIndex + 1} / {MONTH_GROUPS.length} · {group.titleAm}</p>
      <h2 id="months-lesson-title" className="text-xl font-bold">Տարվա ամիսները՝ փոքր մասերով</h2>
      <p className="text-sm text-slate-500">Նայիր ու լսիր → ընտրիր անունը → գրիր մեկ բառ։ Շարունակիր, երբ պատրաստ ես։</p>
      <p className="text-sm">Այս մասում գրված է {group.months.filter(month => isCourseStepComplete(progress, month.id)).length} / {group.months.length} ամիս</p>
    </header>

    {phase === 'learn' && <div className="space-y-4">
      <MonthReference months={group.months} onSpeak={onSpeak} />
      <p className="text-sm text-slate-500">Յուրաքանչյուր քարտում՝ անգլերեն անունը, հայերեն իմաստը և արտասանությունը։ Նայիր այնքան, որքան պետք է։</p>
      <button type="button" className={primaryButton} onClick={() => {study.start(); setPhase('choose'); setWrongChoice('');}}>{verified ? 'Վերադառնալ քայլին' : 'Պատրաստ եմ փորձելու'}</button>
    </div>}

    {phase !== 'learn' && !verified && <>
      <p className="text-sm font-semibold text-slate-500">Ամիս {index % MONTH_GROUP_SIZE + 1} / {group.months.length}</p>
      {phase === 'choose' ? <fieldset className="space-y-3">
        <legend data-learning-text="armenian" className="mb-3 font-semibold">Ո՞րն է «{sentence.armenian}»-ը։</legend>
        <div className="flex flex-wrap gap-3">
          {choices.map(month => <button key={month.id} type="button" lang="en" data-learning-text="english" className={secondaryButton} onClick={() => {
            study.start();
            if (month.id === sentence.id) {setPhase('write'); setWrongChoice('');}
            else setWrongChoice(`${month.english} նշանակում է «${month.armenian}»։ Փորձիր գտնել «${sentence.armenian}»-ը։`);
          }}>{month.english}</button>)}
        </div>
        {wrongChoice && <p role="status" className="text-sm text-amber-700 dark:text-amber-300">{wrongChoice}</p>}
      </fieldset> : <form className="space-y-3" onSubmit={event => {
        event.preventDefault();
        if (!answer.trim()) return;
        study.start();
        const correct = isCorrectWrittenAnswer(sentence, answer);
        setIncorrect(!correct);
        if (correct) onVerify(lesson.id, sentence.id, answer);
      }}>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">Ճիշտ ընտրեցիր։ Հիմա փորձիր գրել հիշողությամբ։</p>
        <label htmlFor="month-answer" data-learning-text="armenian" className="block font-semibold">Անգլերեն գրիր՝ «{sentence.armenian}»։</label>
        <input id="month-answer" lang="en" dir="ltr" data-learning-text="english" autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} required maxLength={40}
          value={answer} onChange={event => {setAnswer(event.target.value); setIncorrect(false);}} aria-invalid={incorrect} aria-describedby={`month-writing-help${incorrect ? ' month-writing-error' : ''}`}
          className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600" />
        <p id="month-writing-help" className="text-sm text-slate-500">Բավական է մեկ բառ։ Ամսվա անունը սովորաբար սկսում ենք մեծատառով։</p>
        {incorrect && <p id="month-writing-error" role="status" className="text-sm text-rose-700 dark:text-rose-300">Փորձիր նորից։ Կարող ես բացել հուշումը կամ կրկին նայել երեք քարտերին։</p>}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={!answer.trim()} className={primaryButton}>Ստուգել</button>
          <button type="button" className={secondaryButton} aria-expanded={hint} aria-controls="month-hint" onClick={() => setHint(value => !value)}>Փոքր հուշում</button>
          <button type="button" className={secondaryButton} onClick={() => {study.start(); onSpeak(sentence.english, 'slow');}}><Volume2 size={18} className="shrink-0" />Լսել</button>
        </div>
        {hint && <p id="month-hint" role="status" className="text-sm text-emerald-700 dark:text-emerald-300">Առաջին տառը՝ <span lang="en">{sentence.english[0]}</span>։ Արտասանությունը՝ <span data-learning-text="pronunciation">{sentence.pronunciation}</span>։</p>}
      </form>}
      <button type="button" className={secondaryButton} onClick={() => setPhase('learn')}>Կրկին նայել երեք ամիսներին</button>
    </>}

    {verified && phase !== 'learn' && <div className="space-y-4">
      <p role="status" className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={20} className="shrink-0" />{groupFinished ? 'Այս երեք ամիսներն ավարտված են։ Կարող ես ընդմիջել ու հետո շարունակել։' : 'Ճիշտ է։ Շարունակիր, երբ պատրաստ ես։'}</p>
      <MonthReference months={group.months.filter(month => month.id === sentence.id)} onSpeak={onSpeak} />
      <button type="button" className={secondaryButton} onClick={() => setPhase('learn')}>Կրկնել այս երեք ամիսները</button>
    </div>}

    <footer className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
      {index > 0 && <button type="button" className={secondaryButton} onClick={() => onUpdateSentencePosition(lesson.id, index - 1)}><ArrowLeft size={17} className="shrink-0" />Նախորդ ամիսը</button>}
      <button type="button" aria-pressed={saved} className={secondaryButton} onClick={() => onToggleSaveSentence(sentence.id)}><Star size={17} className="shrink-0" />{saved ? 'Պահպանված է' : 'Պահպանել ամիսը'}</button>
      {index + 1 < lesson.sentences.length ? <button type="button" disabled={!verified} className={primaryButton} onClick={() => {study.start(); onUpdateSentencePosition(lesson.id, index + 1);}}>
        {(index + 1) % MONTH_GROUP_SIZE === 0 ? 'Հաջորդ երեք ամիսները' : 'Հաջորդ ամիսը'} <ArrowRight size={17} className="ml-1 inline" />
      </button> : <button type="button" disabled={!verified} className={primaryButton} onClick={() => document.getElementById('course-reading')?.scrollIntoView({block: 'start'})}>Կարճ կրկնություն և երկու հարց</button>}
    </footer>
  </section>;
}
