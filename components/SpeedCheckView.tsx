'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  Flame,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  Trophy,
  Volume2,
  Zap,
} from 'lucide-react';
import type { LessonSentence, UserProgressData } from '../lib/types';
import {
  getPassedCourseSentences,
  getPassedLessonsForSpeedCheck,
  isCorrectWrittenAnswer,
} from '../lib/learning-path';
import { useStudyActivity } from '../lib/study-activity';

interface SpeedCheckViewProps {
  progress: UserProgressData;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onOpenLessons: () => void;
  onRecordWordSuccess?: (sentenceId: string) => void;
}

type SpeedCheckDurationMinutes = 1 | 2 | 3 | 4 | 5;

const DURATION_OPTIONS: SpeedCheckDurationMinutes[] = [1, 2, 3, 4, 5];

function formatCountdown(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function SpeedCheckView({
  progress,
  onSpeak,
  onOpenLessons,
  onRecordWordSuccess,
}: SpeedCheckViewProps) {
  const study = useStudyActivity();

  const passedGroups = useMemo(() => getPassedLessonsForSpeedCheck(progress), [progress]);
  const allPassedSentences = useMemo(() => getPassedCourseSentences(progress, 'all'), [progress]);

  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');
  const [selectedMinutes, setSelectedMinutes] = useState<SpeedCheckDurationMinutes>(1);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(60);
  const [deck, setDeck] = useState<LessonSentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [roundStep, setRoundStep] = useState<number>(0);

  const [inputValue, setInputValue] = useState<string>('');
  const [isFlashingEnglish, setIsFlashingEnglish] = useState<boolean>(true);
  const [justConfirmedText, setJustConfirmedText] = useState<string | null>(null);
  const [wrongSubmitAttempt, setWrongSubmitAttempt] = useState<boolean>(false);

  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [solvedHistory, setSolvedHistory] = useState<
    { id: string; english: string; armenian: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextWordTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredSentences = useMemo(() => {
    const list = getPassedCourseSentences(progress, selectedLessonId);
    return list.length > 0 ? list : allPassedSentences;
  }, [progress, selectedLessonId, allPassedSentences]);

  const lessonTitleBySentenceId = useMemo(() => {
    const map = new Map<string, string>();
    for (const group of passedGroups) {
      for (const s of group.passedSentences) {
        map.set(s.id, group.lesson.titleAm);
      }
    }
    return map;
  }, [passedGroups]);

  const triggerOneSecondEnglishFlash = useCallback(() => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setIsFlashingEnglish(true);
    flashTimerRef.current = setTimeout(() => {
      setIsFlashingEnglish(false);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (nextWordTimerRef.current) clearTimeout(nextWordTimerRef.current);
    };
  }, []);

  // Countdown timer effect during active gameplay
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameState('finished');
          study.finish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, study]);

  // Trigger 1-second English display whenever a new word appears in 'playing' mode
  useEffect(() => {
    if (gameState !== 'playing') return;
    triggerOneSecondEnglishFlash();
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 30);
    return () => clearTimeout(focusTimeout);
  }, [gameState, roundStep, triggerOneSecondEnglishFlash]);

  const buildShuffledDeck = useCallback((pool: LessonSentence[]): LessonSentence[] => {
    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }, []);

  const startSpeedCheck = () => {
    if (filteredSentences.length === 0) return;
    study.start();
    const initialDeck = buildShuffledDeck(filteredSentences);
    setDeck(initialDeck);
    setCurrentIndex(0);
    setRoundStep(1);
    setInputValue('');
    setJustConfirmedText(null);
    setWrongSubmitAttempt(false);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setSolvedHistory([]);
    setTimeLeftSeconds(selectedMinutes * 60);
    setGameState('playing');
  };

  const advanceToNextWord = useCallback(
    (currentPool: LessonSentence[], idx: number) => {
      if (idx + 1 < currentPool.length) {
        setCurrentIndex(idx + 1);
      } else {
        const reshuffled = buildShuffledDeck(filteredSentences);
        setDeck(reshuffled);
        setCurrentIndex(0);
      }
      setInputValue('');
      setJustConfirmedText(null);
      setWrongSubmitAttempt(false);
      setRoundStep((prev) => prev + 1);
    },
    [buildShuffledDeck, filteredSentences]
  );

  const currentSentence: LessonSentence | undefined = deck[currentIndex] || filteredSentences[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setWrongSubmitAttempt(false);

    if (!currentSentence || justConfirmedText !== null || gameState !== 'playing') return;

    // Ավտոմատ հաստատում՝ երբ գրվում է ճիշտ պատասխանը (սխալի դեպքում չի հաստատում)
    if (isCorrectWrittenAnswer(currentSentence, val)) {
      study.start();
      const nextCorrect = correctCount + 1;
      const nextStreak = streak + 1;
      setCorrectCount(nextCorrect);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
      setSolvedHistory((prev) => [
        ...prev,
        {
          id: currentSentence.id,
          english: currentSentence.english,
          armenian: currentSentence.armenian,
        },
      ]);
      setJustConfirmedText(currentSentence.english);
      onRecordWordSuccess?.(currentSentence.id);

      if (nextWordTimerRef.current) clearTimeout(nextWordTimerRef.current);
      nextWordTimerRef.current = setTimeout(() => {
        advanceToNextWord(deck, currentIndex);
      }, 240);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSentence || gameState !== 'playing' || justConfirmedText !== null) return;
    if (!inputValue.trim()) return;

    if (isCorrectWrittenAnswer(currentSentence, inputValue)) {
      // Already handled by handleInputChange, but keep fallback safety
      handleInputChange({
        target: { value: inputValue },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      // Սխալ պատասխանը չի հաստատվում
      setWrongSubmitAttempt(true);
      setStreak(0);
    }
  };

  const totalSecondsSelected = selectedMinutes * 60;
  const elapsedSeconds = Math.max(1, totalSecondsSelected - timeLeftSeconds);
  const wordsPerMinute = Number(((correctCount / elapsedSeconds) * 60).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Zap size={14} />
              Արագության մարզում · 1 վայրկյան ցուցադրում
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Ստուգել իմ արագությունը
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              Յուրաքանչյուր բառ կամ արտահայտություն <strong>1 վայրկյան</strong> ցուցադրվում է անգլերեն,
              ապա թաքցվում է, իսկ հայերեն հուշումը մնում է էկրանին։ Գրիր անգլերեն տարբերակը ընտրված ժամանակի
              մեջ (1–5 րոպե)՝ ճիշտ գրելիս պատասխանը հաստատվում է <strong>ավտոմատ</strong>։
            </p>
          </div>
          {allPassedSentences.length > 0 && (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-right">
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                Անցած դասեր և բառեր
              </div>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {passedGroups.length} դաս · {allPassedSentences.length} բառ
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Empty State if no lessons or steps have been passed yet */}
      {allPassedSentences.length === 0 && (
        <section className="rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Դուք դեռ չեք անցել որևէ դաս կամ բառ
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Այս բաժնում ցուցադրվում են միայն այն դասերի բառերը, որոնք դուք արդեն անցել եք։
                Նախ անցեք առնվազն մեկ քայլ կամ դաս «Իմ դասապլանը» բաժնում։
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLessons}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition"
          >
            <BookOpen size={17} />
            Բացել «Իմ դասապլանը»
          </button>
        </section>
      )}

      {/* Setup Screen */}
      {allPassedSentences.length > 0 && gameState === 'setup' && (
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-6 shadow-sm">
          {/* 1. Lesson selection (only passed lessons) */}
          <div className="space-y-3">
            <label
              htmlFor="speed-lesson-select"
              className="block text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              1. Ընտրիր անցած դասը (ցուցադրվում են միայն քո անցած դասերը)
            </label>
            <select
              id="speed-lesson-select"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">
                Բոլոր անցած դասերը ({allPassedSentences.length} բառ / արտահայտություն)
              </option>
              {passedGroups.map((group) => (
                <option key={group.lesson.id} value={group.lesson.id}>
                  {group.lesson.level} · {group.lesson.titleAm} ({group.passedSentences.length}{' '}
                  բառ · {group.isFullyCompleted ? 'Ավարտված դաս' : 'Անցած քայլեր'})
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 pt-1">
              {passedGroups.map((group) => {
                const isSelected = selectedLessonId === group.lesson.id;
                return (
                  <button
                    key={group.lesson.id}
                    type="button"
                    onClick={() =>
                      setSelectedLessonId(isSelected ? 'all' : group.lesson.id)
                    }
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{group.lesson.titleAm}</span>
                    <span className="opacity-70">({group.passedSentences.length})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Duration selection (1-5 minutes) */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              2. Ընտրիր ժամանակի ֆիքսումը (1–5 րոպե)
            </p>
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {DURATION_OPTIONS.map((mins) => {
                const active = selectedMinutes === mins;
                return (
                  <button
                    key={mins}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedMinutes(mins)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-4 font-bold transition ${
                      active
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
                    }`}
                  >
                    <Clock size={18} className="mb-1" />
                    <span className="text-base sm:text-lg font-extrabold">{mins}</span>
                    <span className="text-[11px] opacity-90">րոպե</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Start button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Ընտրված է՝ <strong>{filteredSentences.length} բառ</strong> · Ժամանակ՝{' '}
              <strong>{selectedMinutes} րոպե</strong> · Ցուցադրում՝ <strong>1 վայրկյան</strong>
            </div>
            <button
              type="button"
              onClick={startSpeedCheck}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 transition"
            >
              <Play size={18} />
              Սկսել արագության ստուգումը ({selectedMinutes} րոպե)
            </button>
          </div>
        </section>
      )}

      {/* Active Gameplay Screen */}
      {gameState === 'playing' && currentSentence && (
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-6 shadow-sm">
          {/* Top Timer & Score Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-base font-extrabold border ${
                  timeLeftSeconds <= 15
                    ? 'border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse'
                    : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Timer size={18} />
                <span aria-live="polite" data-testid="speed-timer">
                  {formatCountdown(timeLeftSeconds)}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Ճիշտ՝ {correctCount}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold">
                <Flame size={15} className="text-amber-500" />
                <span>Շարք՝ {streak}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setGameState('finished');
                study.finish();
              }}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Ավարտել
            </button>
          </div>

          {/* 1-Second English Flash Area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 text-center space-y-3 min-h-32 flex flex-col items-center justify-center">
            {isFlashingEnglish ? (
              <div className="space-y-2 animate-fadeIn">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles size={13} />
                  1 վայրկյան անգլերեն ցուցադրում
                </span>
                <p
                  lang="en"
                  data-testid="speed-english-flash"
                  className="text-2xl sm:text-3xl font-extrabold tracking-wide text-slate-900 dark:text-white"
                >
                  {currentSentence.english}
                </p>
                {currentSentence.pronunciation && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    [{currentSentence.pronunciation}]
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p
                  data-testid="speed-english-hidden"
                  className="text-sm font-bold text-slate-500 dark:text-slate-400"
                >
                  Անգլերեն տեքստը ցուցադրվեց 1 վայրկյան և թաքցվեց
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={triggerOneSecondEnglishFlash}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition"
                  >
                    <Eye size={14} />
                    Ցույց տալ ևս 1 վայրկյան
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onSpeak(currentSentence.speechText || currentSentence.english, 'normal')
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition"
                  >
                    <Volume2 size={14} />
                    Լսել արտասանությունը
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Armenian Prompt Telling User What to Write in English */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <span>ՀԱՅԵՐԵՆ ԱՌԱՋԱԴՐԱՆՔ (ԳՐԻՐ ԱՆԳԼԵՐԵՆ)</span>
              {lessonTitleBySentenceId.get(currentSentence.id) && (
                <span className="text-slate-500 dark:text-slate-400">
                  Դաս՝ {lessonTitleBySentenceId.get(currentSentence.id)}
                </span>
              )}
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              «{currentSentence.armenian}»
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Գրիր անգլերեն՝ ինչպե՞ս կլինի <strong>«{currentSentence.armenian}»</strong>։ Ճիշտ
              գրելու դեպքում պատասխանը կհաստատվի ավտոմատ։
            </p>
          </div>

          {/* Typing Input Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <label
              htmlFor="speed-check-input"
              className="block text-sm font-bold text-slate-700 dark:text-slate-200"
            >
              Քո անգլերեն պատասխանը՝
            </label>
            <input
              id="speed-check-input"
              ref={inputRef}
              type="text"
              lang="en"
              dir="ltr"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Գրիր անգլերեն այստեղ..."
              className={`w-full rounded-2xl border px-4 py-3.5 text-lg font-bold transition focus:outline-none focus:ring-2 ${
                justConfirmedText
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/40'
                  : wrongSubmitAttempt
                  ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-slate-900 dark:text-white focus:ring-rose-500/30'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500/30'
              }`}
            />

            {justConfirmedText && (
              <p
                role="status"
                className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} />
                Ճիշտ է ({justConfirmedText}) — ավտոմատ հաստատվեց։
              </p>
            )}

            {wrongSubmitAttempt && !justConfirmedText && (
              <p
                role="alert"
                className="text-sm font-semibold text-rose-600 dark:text-rose-400"
              >
                Դեռ ճիշտ չէ. սխալ պատասխանը չի հաստատվում։ Ուղղիր տառերը կամ սեղմիր «Ցույց տալ ևս 1 վայրկյան»։
              </p>
            )}
          </form>
        </section>
      )}

      {/* Results Screen */}
      {gameState === 'finished' && (
        <section className="rounded-2xl border border-emerald-500/40 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Trophy size={28} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Ժամանակն ավարտվեց · Արդյունքներ
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Ֆիքսված ժամանակ՝ {selectedMinutes} րոպե
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={startSpeedCheck}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition"
              >
                <RotateCcw size={16} />
                Կրկին փորձել ({selectedMinutes} րոպե)
              </button>
              <button
                type="button"
                onClick={() => setGameState('setup')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Փոխել ժամանակը / դասը
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs font-bold text-slate-500">Ճիշտ գրված բառեր</div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {correctCount}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs font-bold text-slate-500">Արագություն (բառ / րոպե)</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {wordsPerMinute}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs font-bold text-slate-500">Լավագույն անընդմեջ շարք</div>
              <div className="text-3xl font-extrabold text-amber-500 mt-1">{bestStreak} 🔥</div>
            </div>
          </div>

          {solvedHistory.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Այս փուլում ճիշտ գրված բառերը ({solvedHistory.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {solvedHistory.map((item, idx) => (
                  <span
                    key={`${item.id}-${idx}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300"
                  >
                    <CheckCircle2 size={13} />
                    <span lang="en">{item.english}</span>
                    <span className="opacity-75">— {item.armenian}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

