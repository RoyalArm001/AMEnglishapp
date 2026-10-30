'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Play,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LESSON_CATEGORIES, LESSONS_DATA } from '../data/lessons';
import { VOCABULARY_ITEMS } from '../data/vocabulary';
import { PLACEMENT_QUESTIONS } from '../data/placement-and-teacher';
import { CEFRLevel, UserProgressData } from '../lib/types';
import { buildStudyChart } from '../lib/study-statistics';
import { getDateStringInTimezone } from '../lib/i18n';

interface LearningHistoryViewProps {
  progress: UserProgressData;
  startInPlacementMode?: boolean;
  onResumeLessonAtSentence: (lessonId: string, sentenceIndex: number) => void;
  onCompletePlacement: (calculatedLevel: CEFRLevel, scorePercent: number) => void;
  onResolveMistake: (mistakeId: string) => void;
  onNavigate: (tab: string) => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}

export default function LearningHistoryView({
  progress,
  startInPlacementMode = false,
  onResumeLessonAtSentence,
  onCompletePlacement,
  onResolveMistake,
  onNavigate,
  onSpeak,
}: LearningHistoryViewProps) {
  const [chartRange, setChartRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [testingMode, setTestingMode] = useState<boolean>(startInPlacementMode);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [placementResult, setPlacementResult] = useState<{
    level: CEFRLevel;
    correctCount: number;
  } | null>(null);

  const tz = progress.settings?.timezone || 'Asia/Yerevan';

  // Completed vs In-Progress Lessons
  const completedLessons = LESSONS_DATA.filter((l) =>
    progress.completedLessonIds.includes(l.id)
  );

  const inProgressLessons = useMemo(() => {
    return LESSONS_DATA.filter((l) => {
      if (progress.completedLessonIds.includes(l.id)) return false;
      const lp = progress.lessonProgressMap?.[l.id];
      return Boolean(
        l.id === progress.currentLessonId ||
          (lp && (lp.status === 'in-progress' || lp.lastSentenceIndex > 0 || lp.timeSpentMinutes > 0))
      );
    });
  }, [progress.completedLessonIds, progress.lessonProgressMap, progress.currentLessonId]);

  // Difficult Words (graded 'again' or 'hard' in SRS, or low ease factor)
  const difficultWords = useMemo(() => {
    return VOCABULARY_ITEMS.filter((w) => {
      const srs = progress.srsWords[w.id];
      if (!srs) return false;
      return srs.lastGrade === 'again' || srs.lastGrade === 'hard' || srs.easeFactor < 2.2;
    });
  }, [progress.srsWords]);

  // Active Study Days
  const activeDatesList = useMemo(() => {
    const dates = new Set<string>();
    if (progress.lastActiveDate) dates.add(progress.lastActiveDate);
    (progress.history || []).forEach((h) => {
      if (h.date) dates.add(h.date);
    });
    return Array.from(dates).sort().reverse();
  }, [progress.history, progress.lastActiveDate]);

  // Chart Data (Daily 7 days, Weekly 4 weeks, Monthly 6 months)
  const chartBars = useMemo(() => buildStudyChart(progress.history, chartRange, tz), [progress.history, chartRange, tz]);

  const maxChartVal = Math.max(20, ...chartBars.map((b) => b.minutes));

  // Category Progress Breakdown
  const categoryProgress = useMemo(() => {
    return LESSON_CATEGORIES.map((cat) => {
      const catLessons = LESSONS_DATA.filter((l) => l.categoryId === cat.id);
      const doneCount = catLessons.filter((l) =>
        progress.completedLessonIds.includes(l.id)
      ).length;
      const timeSpent = catLessons.reduce((acc, l) => {
        const lp = progress.lessonProgressMap?.[l.id];
        return acc + (lp?.timeSpentMinutes || 0);
      }, 0);
      const percent =
        catLessons.length > 0 ? Math.round((doneCount / catLessons.length) * 100) : 0;
      return {
        ...cat,
        totalLessons: catLessons.length,
        doneCount,
        timeSpent,
        percent,
      };
    });
  }, [progress.completedLessonIds, progress.lessonProgressMap]);

  const currentQ = PLACEMENT_QUESTIONS[questionIdx] || PLACEMENT_QUESTIONS[0];

  const handleSelectOption = (optIdx: number) => {
    const nextAnswers = { ...selectedAnswers, [currentQ.id]: optIdx };
    setSelectedAnswers(nextAnswers);
    if (questionIdx + 1 < PLACEMENT_QUESTIONS.length) {
      setQuestionIdx(questionIdx + 1);
    } else {
      let correct = 0;
      for (const q of PLACEMENT_QUESTIONS) {
        if (nextAnswers[q.id] === q.correctOptionIndex) correct++;
      }
      const ratio = correct / PLACEMENT_QUESTIONS.length;
      let level: CEFRLevel = 'A1';
      if (ratio >= 0.9) level = 'C1';
      else if (ratio >= 0.75) level = 'B2';
      else if (ratio >= 0.55) level = 'B1';
      else if (ratio >= 0.35) level = 'A2';
      setPlacementResult({ level, correctCount: correct });
      onCompletePlacement(level, Math.round(ratio * 100));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            ՈՒՍՈՒՑՄԱՆ ՊԱՏՄՈՒԹՅՈՒՆ ԵՎ ՎԵՐԼՈՒԾՈՒԹՅՈՒՆ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Առաջընթացի գրաֆիկներ, դասերի կարգավիճակ և սխալների շտկում
          </h1>
        </div>
        <button
          onClick={() => {
            setSelectedAnswers({});
            setQuestionIdx(0);
            setPlacementResult(null);
            setTestingMode(!testingMode);
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 shrink-0"
        >
          <Sparkles size={16} /> Անցնել մակարդակի ստուգումը (Placement Test)
        </button>
      </div>

      {/* Optional Placement Test Modal */}
      {testingMode && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-lg space-y-6"
        >
          {!placementResult ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ՄԱԿԱՐԴԱԿԻ ՍՏՈՒԳՈՒՄ · ՀԱՐՑ {questionIdx + 1} / {PLACEMENT_QUESTIONS.length}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  Ստուգվող մակարդակ՝ {currentQ.level}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-500"><span data-learning-text="armenian">{currentQ.questionAm}</span></p>
                <h3 className="text-xl font-bold"><span data-learning-text="english">{currentQ.questionEn}</span></h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-left font-bold text-sm"
                  >
                    {idx + 1}. <span data-learning-text="english">{opt}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-3">
              <Award size={44} className="mx-auto text-emerald-500" />
              <h3 className="text-2xl font-extrabold">
                Թեստը ավարտված է! Ձեր մակարդակը՝ {placementResult.level}
              </h3>
              <button
                onClick={() => setTestingMode(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Փակել թեստը
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Progress Charts (Daily / Weekly / Monthly) */}
      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 size={20} className="text-emerald-600" /> Առաջընթացի գրաֆիկ (Ուսուցման րոպեներ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Օրական, շաբաթական և ամսական ակտիվության պատկերը
            </p>
          </div>
          <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(
              [
                { id: 'daily', label: 'Օրական' },
                { id: 'weekly', label: 'Շաբաթական' },
                { id: 'monthly', label: 'Ամսական' },
              ] as const
            ).map((r) => (
              <button
                key={r.id}
                onClick={() => setChartRange(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  chartRange === r.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 items-end h-44 pt-6 px-2">
          {chartBars.map((bar, idx) => {
            const heightPct = Math.max(12, Math.round((bar.minutes / maxChartVal) * 100));
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {bar.minutes} ր
                </span>
                <div className="w-full max-w-[44px] bg-slate-100 dark:bg-slate-800 rounded-xl h-28 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-xl transition-all duration-500"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 truncate max-w-full">
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-Progress Lessons (Resume at exact last unfinished sentence) & Completed Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Clock size={18} className="text-amber-500" /> Ընթացքի մեջ գտնվող դասեր ({inProgressLessons.length})
          </h3>
          <p className="text-xs text-slate-500">
            «Շարունակել» սեղմելիս կբացվի հենց վերջին չավարտված նախադասությունը։
          </p>

          <div className="space-y-3">
            {inProgressLessons.map((lesson) => {
              const lp = progress.lessonProgressMap?.[lesson.id];
              const lastIdx = lp?.lastSentenceIndex ?? (lesson.id === progress.currentLessonId ? progress.currentSentenceIndex : 0);
              const spent = lp?.timeSpentMinutes ?? 2;
              return (
                <div
                  key={lesson.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      Դաս {lesson.order} · Նախադասություն {lastIdx + 1}/{lesson.sentences.length} · Տրամադրված՝ {spent} ր
                    </div>
                    <div className="font-bold text-sm mt-0.5">{lesson.titleAm}</div>
                  </div>
                  <button
                    onClick={() => onResumeLessonAtSentence(lesson.id, lastIdx)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <Play size={13} /> Շարունակել
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" /> Ավարտված դասեր ({completedLessons.length} / {LESSONS_DATA.length})
          </h3>
          {completedLessons.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              Դեռևս ավարտված դասեր չկան։
            </p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {completedLessons.map((lesson) => {
                const lp = progress.lessonProgressMap?.[lesson.id];
                return (
                  <div
                    key={lesson.id}
                    className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm">{lesson.titleAm}</div>
                      <div className="text-xs text-slate-500">
                        Տրամադրված ժամանակ՝ {lp?.timeSpentMinutes || lesson.estimatedMinutes} րոպե
                      </div>
                    </div>
                    <button
                      onClick={() => onResumeLessonAtSentence(lesson.id, 0)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold"
                    >
                      Կրկնել
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Topic / Category Progress Breakdown */}
      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <BookOpen size={18} className="text-emerald-600" /> Առաջընթաց ըստ ուսուցման թեմաների ({categoryProgress.length} բաժին)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {categoryProgress.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>
                  {cat.icon} {cat.titleAm}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {cat.doneCount}/{cat.totalLessons} դաս ({cat.percent}%) · {cat.timeSpent} ր
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wrong Exercises, Difficult Words & Active Study Days */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wrong Answers */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-500" /> Սխալ կատարված առաջադրանքներ ({progress.mistakes.length})
          </h3>
          {progress.mistakes.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">Սխալ կատարված առաջադրանքներ չկան։</p>
          ) : (
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {progress.mistakes.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">{m.prompt}</span>
                    {!m.resolved && (
                      <button
                        onClick={() => onResolveMistake(m.id)}
                        className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold"
                      >
                        ✓ Շտկված է
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-rose-500 line-through"><span data-learning-text="english">{m.userAnswer}</span></div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Ճիշտ՝ <span data-learning-text="english">{m.correctAnswer}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Difficult Words */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Դժվար յուրացվող բառեր ({difficultWords.length})</h3>
            <button
              onClick={() => onNavigate('Vocabulary')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Կրկնել →
            </button>
          </div>
          {difficultWords.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">
              Բարդ նշված բառեր այս պահին չկան։ «Բառապաշար» բաժնում գնահատեք բառերը Flashcards-ով։
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {difficultWords.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm"><span data-learning-text="english">{w.word}</span></div>
                    <div className="text-xs text-slate-500">
                      <span data-learning-text="pronunciation">{w.pronunciation}</span> · <span data-learning-text="armenian">{w.armenian}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSpeak(w.word, 'slow')}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Study Days */}
        <div className="lg:col-span-3 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Calendar size={17} className="text-sky-500" /> Ուսուցման օրեր ({activeDatesList.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeDatesList.map((d) => (
              <span
                key={d}
                className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold"
              >
                📅 {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

