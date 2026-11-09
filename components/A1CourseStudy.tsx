'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle2, Volume2 } from 'lucide-react';
import { A1_EXTRA_READING, A1_FINAL_QUESTIONS, A1_FINAL_READING, A1_TEXTBOOKS, getA1Chapter, type CourseQuestion } from '../data/a1-course';
import { isCorrectWrittenAnswer, isCourseLessonComplete, isCourseReadingComplete, needsAnswerConfirmation } from '../lib/learning-path';
import { useStudyActivity } from '../lib/study-activity';
import type { LessonItem, UserProgressData } from '../lib/types';
import LessonSources from './LessonSources';
import { LEARNING_MONTHS, MONTH_GROUPS, MONTHS_LESSON_ID } from '../data/months';
import MonthReference from './MonthReference';

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
  const [monthGroup, setMonthGroup] = useState(0);
  const study = useStudyActivity();
  if (!chapter) return null;
  const book = A1_TEXTBOOKS.find(item => item.id === chapter.bookId);
  const done = isCourseLessonComplete(progress, lesson);
  const checked = isCourseReadingComplete(progress, lesson);
  const passed = progress.learningPath?.readingAnswerIds || [];
  const question = chapter.questions.find(item => !passed.includes(item.id));
  const questionMonth = lesson.id === MONTHS_LESSON_ID ? LEARNING_MONTHS.find(month => month.english === question?.english) : undefined;
  const readingContext = questionMonth ? `${questionMonth.english} — ${questionMonth.armenian}` : chapter.lines.map(line => line.english).join(' ');

  return <section id="course-reading" className={`${panelClass} scroll-mt-24`} aria-labelledby="course-reading-title">
    <div className="space-y-2">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300"><BookOpen size={20} />HayLingo · {book?.titleAm}</p>
      <h2 id="course-reading-title" className="text-xl font-bold">{chapter.titleAm}</h2>
      <p className="text-sm text-slate-500">{lesson.id === MONTHS_LESSON_ID ? 'Կրկնիր ամիսները փոքր խմբերով։ Վերջում պատասխանիր երկու կարճ հարցի․ մեկ բառը բավական է։' : 'Կարդա այս դասին համապատասխան գլուխը, լսիր արտասանությունը և պատասխանիր երկու հարցերին։'}</p>
    </div>
    <button type="button" aria-pressed={translation} onClick={() => setTranslation(value => !value)} className="min-h-11 rounded-xl border px-4 py-2">{translation ? 'Թաքցնել հայերենն ու արտասանությունը' : 'Ցույց տալ հայերենն ու արտասանությունը'}</button>
    {lesson.id === MONTHS_LESSON_ID ? <div className="space-y-3">
      <nav className="flex flex-wrap gap-2" aria-label="Ամիսների կրկնության մասերը">
        {MONTH_GROUPS.map((group, index) => <button key={group.titleAm} type="button" aria-pressed={monthGroup === index} onClick={() => setMonthGroup(index)} className={`min-h-11 rounded-xl border px-3 py-2 ${monthGroup === index ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-700'}`}>
          {index + 1}. {group.titleAm}
        </button>)}
      </nav>
      <MonthReference months={MONTH_GROUPS[monthGroup].months} translation={translation} onSpeak={onSpeak} />
    </div> : <div className="space-y-3">
      {chapter.lines.map((line, index) => <article key={index} className="min-w-0 space-y-2 break-words rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
        <p lang="en" data-learning-text="english" className="font-semibold">{line.english}</p>
        {translation && <><p data-learning-text="pronunciation" className="text-emerald-700 dark:text-emerald-300">{line.pronunciation}</p><p data-learning-text="armenian">{line.armenian}</p></>}
        <button type="button" onClick={() => {study.start(); onSpeak(line.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2"><Volume2 size={17} />Լսել</button>
      </article>)}
    </div>}
    <p role="status" className="text-sm font-semibold">Ընթերցանության ստուգում՝ {chapter.questions.filter(item => passed.includes(item.id)).length} / {chapter.questions.length}</p>
    {question && <CourseAnswer key={question.id} question={question} onSpeak={onSpeak} context={readingContext} onAnswer={answer => onVerify('reading', question.id, answer)} />}
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
      <p className="text-sm leading-relaxed text-slate-500">{A1_FINAL_QUESTIONS.length} առաջադրանք՝ գրել, լսել և կարդալ։ Բոլոր պատասխանները պետք է ճիշտ լինեն։ Սխալվելու դեպքում կարող ես կրկնել, իսկ ընթերցանության հարցի երեք սխալ փորձից հետո համապատասխան տեքստը կցուցադրվի։ Ճիշտ պատասխանները պահպանվում են, և կարող ես շարունակել ավելի ուշ։ A2-ն ու մյուս ուսումնական էջերը բացվում են այս աշխատանքն ավարտելուց հետո։</p>
    </div>
    <p role="status" className="font-semibold">Ճիշտ ավարտված՝ {count} / {A1_FINAL_QUESTIONS.length}</p>
    <progress className="h-2 w-full accent-emerald-600" value={count} max={A1_FINAL_QUESTIONS.length} aria-label="Ամփոփիչ աշխատանքի առաջընթաց" />
    {question?.skill === 'reading' && <p lang="en" data-learning-text="english" className="rounded-xl bg-slate-50 p-4 leading-relaxed dark:bg-slate-800">{A1_FINAL_READING}</p>}
    {question ? <CourseAnswer key={question.id} question={question} onSpeak={onSpeak} context={question.skill === 'reading' ? A1_FINAL_READING : undefined} onAnswer={answer => onVerify('assessment', question.id, answer)} />
      : <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={20} />Ամփոփիչ աշխատանքն անցած է։</p>}
  </section>;
}

function CourseAnswer({question, onAnswer, onSpeak, context}: {question: CourseQuestion; onAnswer: (answer: string) => void; onSpeak: StudyProps['onSpeak']; context?: string}) {
  const [answer, setAnswer] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const [justCorrect, setJustCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const study = useStudyActivity();
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const audioFallback = question.skill === 'listening' && !speechAvailable;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setAnswer(val);
    setIncorrect(false);
    // Ավտոմատացում՝ ճիշտ պատասխանի դեպքում ավտոմատ հաստատում
    if (!justCorrect && !needsAnswerConfirmation(question) && isCorrectWrittenAnswer(question, val)) {
      study.start();
      setJustCorrect(true);
      onAnswer(val);
    }
  };

  return <form className="space-y-3" onSubmit={event => {
    event.preventDefault();
    if (!answer.trim() || justCorrect) return;
    study.start();
    const correct = isCorrectWrittenAnswer(question, answer);
    setIncorrect(!correct);
    if (correct) {
      setJustCorrect(true);
      onAnswer(answer);
    } else {
      setWrongAttempts(attempts => attempts + 1);
    }
  }}>
    <label htmlFor={`answer-${question.id}`} className="block font-semibold">{audioFallback ? question.writingTask?.promptAm || `Անգլերեն գրիր՝ «${question.armenian}»։` : question.promptAm}</label>
    {needsAnswerConfirmation(question) && <p className="text-sm text-slate-500">{question.writingTask?.helpAm || 'Կարճ պատասխանը բավական է։ Գրիր ու սեղմիր «Ստուգել և շարունակել»։'}</p>}
    {audioFallback && <p className="text-sm text-slate-500">Այս բրաուզերում ձայնը հասանելի չէ․ կատարիր գրավոր տարբերակը։</p>}
    {question.skill === 'listening' && speechAvailable && <button type="button" onClick={() => {study.start(); onSpeak(question.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2"><Volume2 size={18} />Լսել առաջադրանքը</button>}
    <div className="relative">
      <input id={`answer-${question.id}`} lang="en" dir="ltr" value={answer} onChange={handleInputChange}
        autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} required maxLength={500}
        aria-invalid={incorrect} aria-describedby={incorrect ? `error-${question.id}` : undefined} data-learning-text="english"
        placeholder="Գրեք անգլերեն..."
        className={`min-h-12 w-full min-w-0 rounded-xl border bg-transparent px-4 py-3 transition focus:outline-none focus:ring-2 ${
          justCorrect
            ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/30"
            : incorrect
            ? "border-rose-500 bg-rose-50/20"
            : "border-slate-300 focus:ring-emerald-500 dark:border-slate-600"
        }`} />
      {justCorrect && (
        <span className="absolute right-3.5 top-3.5 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={20} />
        </span>
      )}
    </div>
    {incorrect && <p id={`error-${question.id}`} role="status" className="text-sm text-rose-700 dark:text-rose-300">{question.writingTask?.meaning ? 'Պատասխանի իմաստը չհաստատվեց։ Վերանայիր հարցը կամ նույն միտքը ավելի պարզ գրիր։' : 'Դեռ ճիշտ չէ։ Վերանայիր հարցը, ստուգիր գրությունը և փորձիր կրկին։'}</p>}
    {wrongAttempts >= 3 && context && <div role="status" className="space-y-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-800 dark:bg-amber-950">
      <p className="font-semibold">Վերանայիր այս առաջադրանքի տեքստը․</p>
      <p lang="en" data-learning-text="english" className="leading-relaxed">{context}</p>
    </div>}
    <button type="submit" disabled={!answer.trim() || justCorrect} className={buttonClass}>Ստուգել և շարունակել</button>
  </form>;
}
