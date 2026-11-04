'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle2, Volume2 } from 'lucide-react';
import { A1_EXTRA_READING, A1_FINAL_QUESTIONS, A1_FINAL_READING, A1_TEXTBOOKS, getA1Chapter, type CourseQuestion } from '../data/a1-course';
import { isCorrectWrittenAnswer, isCourseLessonComplete, isCourseReadingComplete } from '../lib/learning-path';
import { useStudyActivity } from '../lib/study-activity';
import type { LessonItem, UserProgressData } from '../lib/types';
import LessonSources from './LessonSources';

interface StudyProps {
  progress: UserProgressData;
  onVerify: (kind: 'reading' | 'assessment', questionId: string, answer: string) => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}
const panelClass = 'min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6';
const buttonClass = 'min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40';

export function CourseReadingPanel({lesson, progress, onVerify, onSpeak, onCompleteLesson}: StudyProps & {lesson: LessonItem; onCompleteLesson: (id: string) => void}) {
  const chapter = getA1Chapter(lesson.id);
  const [translation, setTranslation] = useState(true);
  const study = useStudyActivity();
  if (!chapter) return null;
  const book = A1_TEXTBOOKS.find(item => item.id === chapter.bookId);
  const done = isCourseLessonComplete(progress, lesson);
  const checked = isCourseReadingComplete(progress, lesson);
  const passed = progress.learningPath?.readingAnswerIds || [];
  const question = chapter.questions.find(item => !passed.includes(item.id));

  return <section id="course-reading" className={`${panelClass} scroll-mt-24`} aria-labelledby="course-reading-title">
    <div className="space-y-2">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300"><BookOpen size={20} />HayLingo · {book?.titleAm}</p>
      <h2 id="course-reading-title" className="text-xl font-bold">{chapter.titleAm}</h2>
      <p className="text-sm text-slate-500">Կարդա այս դասին համապատասխան գլուխը, լսիր արտասանությունը և պատասխանիր երկու հարցերին։</p>
    </div>
    <button type="button" aria-pressed={translation} onClick={() => setTranslation(value => !value)} className="min-h-11 rounded-xl border px-4 py-2">{translation ? 'Թաքցնել հայերենն ու արտասանությունը' : 'Ցույց տալ հայերենն ու արտասանությունը'}</button>
    <div className="space-y-3">
      {chapter.lines.map((line, index) => <article key={index} className="min-w-0 space-y-2 break-words rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
        <p lang="en" data-learning-text="english" className="font-semibold">{line.english}</p>
        {translation && <><p data-learning-text="pronunciation" className="text-emerald-700 dark:text-emerald-300">{line.pronunciation}</p><p data-learning-text="armenian">{line.armenian}</p></>}
        <button type="button" onClick={() => {study.start(); onSpeak(line.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2"><Volume2 size={17} />Լսել</button>
      </article>)}
    </div>
    <p role="status" className="text-sm font-semibold">Ընթերցանության ստուգում՝ {chapter.questions.filter(item => passed.includes(item.id)).length} / {chapter.questions.length}</p>
    {question && <CourseAnswer key={question.id} question={question} onSpeak={onSpeak} onAnswer={answer => onVerify('reading', question.id, answer)} />}
    {checked && <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={19} />Գլուխն ու ստուգումն ավարտված են։</p>}
    {!done && <button type="button" disabled={!checked} onClick={() => onCompleteLesson(lesson.id)} className={buttonClass}>Ավարտել դասը</button>}
    <LessonSources lesson={lesson} age={progress.profile.age} onSpeak={onSpeak} />
    {done && lesson.id === 'lesson-8-daily-greetings' && <details className="rounded-xl border p-4">
      <summary className="cursor-pointer font-semibold">Լրացուցիչ ընթերցանություն · British Council</summary>
      <p className="my-3 text-sm text-slate-500">Ոչ պարտադիր նյութեր․ բացվում են առանձին կայքում և պահանջում են ինտերնետ։</p>
      <ul className="space-y-3">{A1_EXTRA_READING.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer" className="underline">{item.title}</a></li>)}</ul>
    </details>}
  </section>;
}

export function A1FinalAssessment({progress, onVerify, onSpeak}: StudyProps) {
  const passed = progress.learningPath?.assessmentAnswerIds || [];
  const question = A1_FINAL_QUESTIONS.find(item => !passed.includes(item.id));
  const count = A1_FINAL_QUESTIONS.filter(item => passed.includes(item.id)).length;
  return <section id="a1-final-assessment" className={`${panelClass} scroll-mt-24`} aria-labelledby="a1-final-heading">
    <div className="space-y-2">
      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">A1 · Պարտադիր ամփոփիչ աշխատանք</p>
      <h2 id="a1-final-heading" className="text-xl font-bold">Կիրառիր սովորածդ</h2>
      <p className="text-sm leading-relaxed text-slate-500">{A1_FINAL_QUESTIONS.length} առաջադրանք՝ գրել, լսել և կարդալ։ Բոլոր պատասխանները պետք է ճիշտ լինեն։ Սխալվելու դեպքում կարող ես կրկնել։ Ճիշտ պատասխանները պահպանվում են, և կարող ես շարունակել ավելի ուշ։ A2-ն ու մյուս ուսումնական էջերը բացվում են այս աշխատանքն ավարտելուց հետո։</p>
    </div>
    <p role="status" className="font-semibold">Ճիշտ ավարտված՝ {count} / {A1_FINAL_QUESTIONS.length}</p>
    <progress className="h-2 w-full accent-emerald-600" value={count} max={A1_FINAL_QUESTIONS.length} aria-label="Ամփոփիչ աշխատանքի առաջընթաց" />
    {question?.skill === 'reading' && <p lang="en" data-learning-text="english" className="rounded-xl bg-slate-50 p-4 leading-relaxed dark:bg-slate-800">{A1_FINAL_READING}</p>}
    {question ? <CourseAnswer key={question.id} question={question} onSpeak={onSpeak} onAnswer={answer => onVerify('assessment', question.id, answer)} />
      : <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={20} />Ամփոփիչ աշխատանքն անցած է։</p>}
  </section>;
}

function CourseAnswer({question, onAnswer, onSpeak}: {question: CourseQuestion; onAnswer: (answer: string) => void; onSpeak: StudyProps['onSpeak']}) {
  const [answer, setAnswer] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const study = useStudyActivity();
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const audioFallback = question.skill === 'listening' && !speechAvailable;
  return <form className="space-y-3" onSubmit={event => {
    event.preventDefault();
    if (!answer.trim()) return;
    study.start();
    setIncorrect(!isCorrectWrittenAnswer(question, answer));
    onAnswer(answer);
  }}>
    <label htmlFor={`answer-${question.id}`} className="block font-semibold">{audioFallback ? question.writingTask?.promptAm || `Անգլերեն գրիր՝ «${question.armenian}»։` : question.promptAm}</label>
    {audioFallback && <p className="text-sm text-slate-500">Այս բրաուզերում ձայնը հասանելի չէ․ կատարիր գրավոր տարբերակը։</p>}
    {question.skill === 'listening' && speechAvailable && <button type="button" onClick={() => {study.start(); onSpeak(question.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2"><Volume2 size={18} />Լսել առաջադրանքը</button>}
    <input id={`answer-${question.id}`} lang="en" dir="ltr" value={answer} onChange={event => {setAnswer(event.target.value); setIncorrect(false);}}
      autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} required maxLength={500}
      aria-invalid={incorrect} aria-describedby={incorrect ? `error-${question.id}` : undefined} data-learning-text="english"
      className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600" />
    {incorrect && <p id={`error-${question.id}`} role="status" className="text-sm text-rose-700 dark:text-rose-300">Դեռ ճիշտ չէ։ Վերանայիր հարցը, ստուգիր գրությունը և փորձիր կրկին։</p>}
    <button type="submit" disabled={!answer.trim()} className={buttonClass}>Ստուգել և շարունակել</button>
  </form>;
}
