'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Star, Volume2 } from 'lucide-react';
import type { LessonItem, UserProgressData } from '../lib/types';
import { areCourseLessonsComplete, canOpenCourseLesson, getCourseLessons, getCurrentCourseLesson, getFirstUnverifiedIndex, getNextCourseLevel, isCorrectWrittenAnswer, isCourseLessonComplete, isCourseReadingComplete, isCourseStepComplete, isLevelCourseComplete } from '../lib/learning-path';
import { A1FinalAssessment, CourseReadingPanel } from './A1CourseStudy';
import { useStudyActivity } from '../lib/study-activity';

interface Props {
  progress: UserProgressData;
  onSelectLesson: (id: string, index?: number) => void;
  onUpdateSentencePosition: (id: string, index: number) => void;
  onVerify: (lessonId: string, sentenceId: string, answer: string) => void;
  onVerifyCourseQuestion: (kind: 'reading' | 'assessment', questionId: string, answer: string) => void;
  onCompleteLesson: (id: string) => void;
  onToggleSaveSentence: (id: string) => void;
  onAdvance: () => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}

export default function LearningPlanView(props: Props) {
  const {progress} = props;
  const lessons = getCourseLessons(progress.level);
  const active = lessons.find(lesson => lesson.id === progress.currentLessonId && canOpenCourseLesson(progress, lesson.id)) || getCurrentCourseLesson(progress);
  const complete = isLevelCourseComplete(progress);
  const completed = lessons.filter(lesson => isCourseLessonComplete(progress, lesson)).length;
  const nextLevel = getNextCourseLevel(progress);
  const lessonsComplete = areCourseLessonsComplete(progress);
  const writingComplete = active?.sentences.every(sentence => isCourseStepComplete(progress, sentence.id));

  return <div className="space-y-6">
    <header className="space-y-3">
      <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">{progress.level} · Քո դասապլանը</span>
      <h1 className="text-2xl font-bold">{progress.level === 'A1' ? 'Սկսիր զրոյից՝ քայլ առ քայլ' : 'Սովորիր հերթականությամբ'}</h1>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{progress.level === 'A1' ? 'Այբուբեն → պարզ բառեր → թվեր → առաջին նախադասություններ → տարեթվեր → կարճ զրույցներ։ ' : ''}Նախ սովորիր և լսիր, հետո ինքդ գրիր անգլերեն։ Միայն ճիշտ գրելուց հետո կարող ես անցնել հաջորդ քայլին։ Մյուս ուսումնական էջերը բացվում են այս մակարդակի դասապլանն ավարտելիս։</p>
      <p className="text-sm font-semibold">Ավարտված է {completed} / {lessons.length} դաս</p>
      <progress className="h-2 w-full accent-emerald-600" value={completed} max={Math.max(1, lessons.length)} aria-label="Դասապլանի առաջընթաց" />
      {progress.level === 'A1' && <p className="text-sm text-slate-500">Ամեն դաս՝ սովորել և գրել → կարդալ դասագրքի գլուխը → պատասխանել հարցերին։ Բոլոր դասերից հետո՝ պարտադիր ամփոփիչ աշխատանք։</p>}
    </header>
    {!active && <p className="rounded-2xl border p-5">Այս մակարդակի հերթական դասընթացի նյութերը դեռ հասանելի չեն։ Ավարտ չպարունակող մակարդակը ինքնաշխատ չի բացում հաջորդը։</p>}
    {complete && <section className="space-y-3 rounded-2xl border border-emerald-300 bg-emerald-500/10 p-5" aria-label="Մակարդակի ավարտ">
      <h2 className="flex items-center gap-2 text-lg font-bold"><CheckCircle2 size={22} />{progress.level} դասապլանն ավարտված է</h2>
      <p className="text-sm">Կարող ես կրկնել այս մակարդակի նյութերը կամ օգտվել բացված ուսումնական բաժիններից։</p>
      {nextLevel ? <button type="button" onClick={props.onAdvance} className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">Սկսել {nextLevel} մակարդակը <ArrowRight className="ml-2 inline" size={17} /></button> : <p className="text-sm">Հաջորդ մակարդակի դասապլանը դեռ պատրաստ չէ։ Այն ինքնաշխատ չի համարվում անցած։</p>}
    </section>}
    {progress.level === 'A1' && lessonsComplete && <A1FinalAssessment progress={progress} onVerify={props.onVerifyCourseQuestion} onSpeak={props.onSpeak} />}
    {active && <LessonStep key={`${progress.profile.id}-${active.id}-${progress.currentSentenceIndex}`} {...props} lesson={active} />}
    {active && active.level === 'A1' && writingComplete && <CourseReadingPanel key={active.id} lesson={active} progress={progress} onVerify={props.onVerifyCourseQuestion} onSpeak={props.onSpeak} onCompleteLesson={props.onCompleteLesson} />}
    <section aria-labelledby="course-order-heading" className="space-y-3">
      <h2 id="course-order-heading" className="text-lg font-bold">{progress.level} · Դասերի հերթականությունը</h2>
      <ol className="space-y-2">
        {lessons.map((lesson, index) => ({lesson, index, done: isCourseLessonComplete(progress, lesson)}))
          .filter(item => !item.done)
          .map(({lesson, index}) => {
            const unlocked = canOpenCourseLesson(progress, lesson.id);
            return <li key={lesson.id}>
              <button type="button" disabled={!unlocked} aria-current={active?.id === lesson.id ? 'step' : undefined} onClick={() => props.onSelectLesson(lesson.id, getFirstUnverifiedIndex(progress, lesson))} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border p-4 text-left disabled:cursor-not-allowed disabled:opacity-50 ${active?.id === lesson.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}>
                {unlocked ? <span className="font-bold">{index + 1}</span> : <Lock size={18} className="shrink-0" />}
                <span className="flex-1"><span className="block font-semibold">{lesson.titleAm}</span><span className="mt-1 block text-xs text-slate-500">{unlocked ? `${lesson.sentences.length} քայլ` : 'Նախ ավարտիր նախորդ դասը'}</span></span>
              </button>
            </li>;
        })}
      </ol>
      {lessons.length > 0 && completed === lessons.length && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">Բոլոր դասերն ավարտված են։</p>}
    </section>
  </div>;
}

function LessonStep({lesson, progress, onVerify, onSpeak, onCompleteLesson, onUpdateSentencePosition, onSelectLesson, onToggleSaveSentence}: Props & {lesson: LessonItem}) {
  const study = useStudyActivity();
  const [answer, setAnswer] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const [justCorrect, setJustCorrect] = useState(false);
  const [hideEnglish, setHideEnglish] = useState(false);
  const advanceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const index = Math.min(progress.currentSentenceIndex, getFirstUnverifiedIndex(progress, lesson));
  const sentence = lesson.sentences[index];
  const verified = isCourseStepComplete(progress, sentence.id);
  const done = isCourseLessonComplete(progress, lesson);
  const readingComplete = isCourseReadingComplete(progress, lesson);
  const nextLesson = getCurrentCourseLesson(progress);
  const prompt = sentence.writingTask?.promptAm || `Սովորած արտահայտությունը գրիր անգլերեն՝ «${sentence.armenian}»։`;
  const showMaterial = !hideEnglish || verified;

  const handleVerifyAnswer = (val: string) => {
    if (!val.trim()) return;
    study.start();
    const correct = isCorrectWrittenAnswer(sentence, val);
    if (correct) {
      setIncorrect(false);
      setJustCorrect(true);
      onVerify(lesson.id, sentence.id, val);
      if (index + 1 < lesson.sentences.length) {
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          onUpdateSentencePosition(lesson.id, index + 1);
        }, 500);
      }
    } else {
      setIncorrect(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setAnswer(val);
    setIncorrect(false);

    // Ավտոմատացում՝ երբ գրվում է ճիշտ պատասխանը, նա հաստատում է ավտոմատ
    if (isCorrectWrittenAnswer(sentence, val)) {
      study.start();
      setJustCorrect(true);
      onVerify(lesson.id, sentence.id, val);
      if (index + 1 < lesson.sentences.length) {
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          onUpdateSentencePosition(lesson.id, index + 1);
        }, 500);
      }
    }
  };

  return <section className="min-w-0 space-y-5 break-words rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
    <div><p className="text-xs font-semibold text-slate-500">Քայլ {index + 1} / {lesson.sentences.length}</p><h2 className="mt-1 text-xl font-bold">{lesson.titleAm}</h2></div>
    {lesson.outcomeAm && <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Այս դասից հետո՝ {lesson.outcomeAm}</p>}
    {showMaterial && <p className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed dark:bg-slate-800">{lesson.grammarTipAm}</p>}
    <div className="space-y-2">
      {showMaterial && sentence.colorHex && <span className="block h-16 w-16 rounded-2xl border border-slate-400" style={{backgroundColor: sentence.colorHex}} role="img" aria-label={sentence.armenian} />}
      {showMaterial && <><p lang="en" data-learning-text="english" className="font-bold text-lg">{sentence.english}</p><p data-learning-text="pronunciation" className="text-emerald-700 dark:text-emerald-300 font-medium">{sentence.pronunciation}</p><p data-learning-text="armenian" className="text-slate-700 dark:text-slate-300">{sentence.armenian}</p></>}
      {showMaterial && sentence.grammarNoteAm && <p className="text-sm leading-relaxed text-slate-500">{sentence.grammarNoteAm}</p>}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button type="button" onClick={() => {study.start(); onSpeak(sentence.speechText || sentence.english, 'slow');}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition"><Volume2 size={18} />Լսել դանդաղ</button>
        <button type="button" aria-pressed={progress.savedSentenceIds.includes(sentence.id)} onClick={() => onToggleSaveSentence(sentence.id)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition"><Star size={18} />{progress.savedSentenceIds.includes(sentence.id) ? 'Պահպանված է' : 'Պահպանել'}</button>
        {!verified && <button type="button" onClick={() => setHideEnglish(v => !v)} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition">{hideEnglish ? 'Ցույց տալ հուշումը' : 'Թաքցնել հուշումը'}</button>}
      </div>
    </div>
    {!verified ? <form className="space-y-3 pt-2" onSubmit={event => {
      event.preventDefault();
      handleVerifyAnswer(answer);
    }}>
      <label htmlFor="course-written-answer" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{prompt}</label>
      <div className="relative">
        <input id="course-written-answer" name="course-written-answer" ref={inputRef} type="text" lang="en" dir="ltr" data-learning-text="english"
          autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} required maxLength={500}
          value={answer} onChange={handleInputChange}
          aria-invalid={incorrect} aria-describedby={`course-writing-help${incorrect ? " course-writing-error" : ""}`}
          placeholder="Գրեք անգլերեն..." className={`min-h-12 w-full min-w-0 rounded-xl border px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 dark:bg-slate-950 dark:text-slate-100 ${
            justCorrect || verified
              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/30"
              : incorrect
              ? "border-rose-500 bg-rose-50/20 focus:border-rose-500"
              : "border-slate-300 bg-white focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-slate-600"
          }`} />
        {(justCorrect || verified) && (
          <span className="absolute right-3.5 top-3.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={20} />
          </span>
        )}
      </div>
      <p id="course-writing-help" className="text-xs text-slate-500">{sentence.writingTask?.caseSensitive ? "Մեծատառն ու փոքրատառը գրիր հերթով՝ անգլերեն ստեղնաշարով։" : "Գրիր անգլերեն տառերով։ Ճիշտ պատասխանը գրելիս այն ավտոմատ կհաստատվի։"}</p>
      {incorrect && <p id="course-writing-error" role="status" className="text-sm font-medium text-rose-700 dark:text-rose-300">Դեռ ճիշտ չէ։ Ստուգիր տառերն ու բառերի հերթականությունը։ Կարող ես նորից լսել կամ վերանայել սովորած տարբերակը։</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={!answer.trim()} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Ստուգել գրածը</button>
      </div>
    </form> : <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
      <CheckCircle2 size={20} className="shrink-0" />
      <span>Ճիշտ գրված է։ Կարող ես անցնել հաջորդ քայլին։</span>
    </div>}
    <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
      {index > 0 && <button type="button" onClick={() => onUpdateSentencePosition(lesson.id, index - 1)} className="min-h-11 rounded-xl border px-4 py-2"><ArrowLeft size={16} className="mr-1 inline" />Նախորդը</button>}
      {index + 1 < lesson.sentences.length ? <button type="button" disabled={!verified} onClick={() => onUpdateSentencePosition(lesson.id, index + 1)} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Հաջորդ քայլը <ArrowRight size={16} className="ml-1 inline" /></button>
        : !readingComplete ? <button type="button" disabled={!verified} onClick={() => document.getElementById('course-reading')?.scrollIntoView({block: 'start'})} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Կարդալ դասագրքի գլուխը</button>
        : !done ? <button type="button" disabled={!verified} onClick={() => onCompleteLesson(lesson.id)} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Ավարտել դասը</button>
        : nextLesson && nextLesson.id !== lesson.id && <button type="button" onClick={() => onSelectLesson(nextLesson.id, getFirstUnverifiedIndex(progress, nextLesson))} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 text-white">Անցնել հաջորդ դասին</button>}
      {done && progress.level === 'A1' && areCourseLessonsComplete(progress) && !isLevelCourseComplete(progress) && <button type="button" onClick={() => document.getElementById('a1-final-assessment')?.scrollIntoView({block: 'start'})} className="min-h-11 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">Անցնել ամփոփիչ աշխատանքին</button>}
    </div>
  </section>;
}