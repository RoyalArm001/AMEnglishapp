'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  History,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PLACEMENT_QUESTIONS } from '../data/placement-and-teacher';
import { CEFRLevel, UserProgressData } from '../lib/types';
import { CEFR_LEVELS } from '../lib/storage';

interface PersonalSystemViewProps {
  progress: UserProgressData;
  startInPlacementMode?: boolean;
  onChangeLevel: (level: CEFRLevel) => void;
  onCompletePlacement: (calculatedLevel: CEFRLevel, scorePercent: number) => void;
  onResolveMistake: (mistakeId: string) => void;
  onResetAllProgress: () => void;
  onNavigate: (tab: string) => void;
}

export default function PersonalSystemView({
  progress,
  startInPlacementMode = false,
  onChangeLevel,
  onCompletePlacement,
  onResolveMistake,
  onResetAllProgress,
  onNavigate,
}: PersonalSystemViewProps) {
  const [testingMode, setTestingMode] = useState<boolean>(startInPlacementMode);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [placementResult, setPlacementResult] = useState<{
    level: CEFRLevel;
    correctCount: number;
  } | null>(null);

  const currentQ = PLACEMENT_QUESTIONS[questionIdx] || PLACEMENT_QUESTIONS[0];

  const handleSelectOption = (optIdx: number) => {
    const nextAnswers = { ...selectedAnswers, [currentQ.id]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (questionIdx + 1 < PLACEMENT_QUESTIONS.length) {
      setQuestionIdx(questionIdx + 1);
    } else {
      let correct = 0;
      for (const q of PLACEMENT_QUESTIONS) {
        if (nextAnswers[q.id] === q.correctOptionIndex) {
          correct++;
        }
      }
      const ratio = correct / PLACEMENT_QUESTIONS.length;
      let level: CEFRLevel = 'A1';
      if (ratio >= 0.9) level = 'C1';
      else if (ratio >= 0.75) level = 'B2';
      else if (ratio >= 0.55) level = 'B1';
      else if (ratio >= 0.35) level = 'A2';
      else level = 'A1';

      setPlacementResult({ level, correctCount: correct });
      onCompletePlacement(level, Math.round(ratio * 100));
    }
  };

  const handleStartTest = () => {
    setSelectedAnswers({});
    setQuestionIdx(0);
    setPlacementResult(null);
    setTestingMode(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            PERSONAL LEARNING SYSTEM · ԱՆՀԱՏԱԿԱՆ ՈՒՍՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ ԵՎ ՊԱՏՄՈՒԹՅՈՒՆ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Իմ Առաջընթացը, Մակարդակի Ստուգումը և Սխալների Ուղղումը
          </h1>
        </div>
        <button
          onClick={handleStartTest}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 shrink-0"
        >
          <Sparkles size={16} /> Անցնել մակարդակի ստուգումը (Placement Test)
        </button>
      </div>

      {/* Interactive Placement Test Modal/Section */}
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
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  🇦🇲 <span data-learning-text="armenian">{currentQ.questionAm}</span>
                </p>
                <h3 className="text-xl md:text-2xl font-bold"><span data-learning-text="english">{currentQ.questionEn}</span></h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 text-left font-bold text-sm md:text-base transition"
                  >
                    {idx + 1}. <span data-learning-text="english">{opt}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <Award size={48} className="mx-auto text-emerald-500" />
              <h3 className="text-2xl font-extrabold">
                Թեստը ավարտված է! Ձեր առաջարկվող մակարդակն է՝{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {placementResult.level}
                </span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Դուք ճիշտ պատասխանեցիք {placementResult.correctCount} հարցի՝{' '}
                {PLACEMENT_QUESTIONS.length}-ից։ Հավելվածն ավտոմատ հարմարեցրեց Ձեր ուսուցման ծրագիրը։
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setTestingMode(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm"
                >
                  Շարունակել ուսուցումը
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Manual CEFR Level Selector & 4 Skills Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Ձեռքով ընտրել մակարդակը (A1–C2)</h2>
            <Award size={20} className="text-emerald-500" />
          </div>
          <div className="space-y-2">
            {CEFR_LEVELS.map((item) => {
              const active = progress.level === item.level;
              return (
                <button
                  key={item.level}
                  onClick={() => onChangeLevel(item.level)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between gap-2 ${
                    active
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">{item.labelAm}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.descAm}
                    </div>
                  </div>
                  {active && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Language Skills & Adaptive Recommendations */}
        <div className="lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">4 Հմտությունների վերլուծություն</h2>
                <p className="text-xs text-slate-500">
                  Համակարգն առանձին հաշվառում է Reading, Listening, Speaking և Writing հմտությունները
                </p>
              </div>
              <TrendingUp className="text-emerald-500" size={22} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  key: 'reading',
                  title: '📖 Reading (Ընթերցանություն)',
                  score: progress.skills.reading,
                  actionTab: 'Lessons',
                  actionLabel: 'Բացել դասերը',
                },
                {
                  key: 'listening',
                  title: '🎧 Listening (Լսողական)',
                  score: progress.skills.listening,
                  actionTab: 'Exercises',
                  actionLabel: 'Լսողական վարժություններ',
                },
                {
                  key: 'speaking',
                  title: '🎙️ Speaking (Խոսակցական)',
                  score: progress.skills.speaking,
                  actionTab: 'Voice Practice',
                  actionLabel: 'Ձայնային պարապմունք',
                },
                {
                  key: 'writing',
                  title: '✍️ Writing (Գրավոր և Քերականություն)',
                  score: progress.skills.writing,
                  actionTab: 'Study Assistant',
                  actionLabel: 'Գրել ուսուցչին',
                },
              ].map((sk) => (
                <div
                  key={sk.key}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{sk.title}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{sk.score}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${sk.score}%` }}
                    />
                  </div>
                  <button
                    onClick={() => onNavigate(sk.actionTab)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    <Play size={12} /> {sk.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs md:text-sm">
              <strong>Ադապտիվ խորհուրդ․</strong> Ձեր ամենաքիչ մարզված հմտությունը զարգացնելու համար խորհուրդ է տրվում ամեն օր 10 րոպե անցկացնել{' '}
              <strong>Ձայնային պարապմունք</strong> և <strong>Սխալների ուղղում</strong> բաժիններում։
            </div>
          </div>
        </div>
      </div>

      {/* Mistake Log & Study History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Saved Mistakes */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" /> Թույլ տված սխալների պահոց ({progress.mistakes.length})
            </h2>
          </div>

          {progress.mistakes.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              Դեռևս գրանցված սխալներ չկան։ Կատարեք առաջադրանքներ կամ գրեք ուսուցչին։
            </p>
          ) : (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {progress.mistakes.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    m.resolved
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-65'
                      : 'bg-rose-500/5 border-rose-500/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      {m.source} · {m.skill}
                    </span>
                    {!m.resolved ? (
                      <button
                        onClick={() => onResolveMistake(m.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                      >
                        ✓ Նշել որպես կրկնված
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600">Կրկնված է</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{m.prompt}</p>
                  <p className="text-xs text-rose-600 dark:text-rose-400 line-through">
                    Ձեր տարբերակը՝ <span data-learning-text="english">{m.userAnswer}</span>
                  </p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    Ճիշտը՝ <span data-learning-text="english">{m.correctAnswer}</span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{m.explanationAm}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study History */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <History size={18} className="text-sky-500" /> Ուսուցման պատմություն ({progress.history.length})
            </h2>
            <button
              onClick={onResetAllProgress}
              className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={13} /> Զրոյացնել տվյալները
            </button>
          </div>

          {progress.history.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              Ուսուցման պատմությունը կհամալրվի դասեր և առաջադրանքներ կատարելուն պես։
            </p>
          ) : (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {progress.history.map((h) => (
                <div
                  key={h.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-xs md:text-sm">{h.titleAm}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {h.date} · +{h.durationMinutes} րոպե
                    </div>
                  </div>
                  <div className="text-xs font-bold shrink-0">
                    {h.correctDelta > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">✓ Ճիշտ</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">Կրկնել</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

