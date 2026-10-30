'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Brain,
  Lightbulb,
} from 'lucide-react';
import {
  UserProgressData,
  DailyWordChallengeState,
  DailyWordAttemptRecord,
} from '@/lib/types';
import { getDailyWordsChallenge } from '@/data/daily-questions-and-words';
import { speakEnglishText } from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { calculateNextSRS, getTodayDateString, recordLearningAttempt } from '@/lib/storage';

interface DailyWordsViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialStep?: number;
}

export default function DailyWordsView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialStep,
}: DailyWordsViewProps) {
  const todayStr = getTodayDateString(userProgress.settings?.timezone);

  // Initialize or restore challenge state
  const [challenge, setChallenge] = useState<DailyWordChallengeState>(() => {
    if (userProgress.dailyWordsChallenge && userProgress.dailyWordsChallenge.date === todayStr) {
      return userProgress.dailyWordsChallenge;
    }
    return getDailyWordsChallenge(todayStr, userProgress.level, 3);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (typeof initialStep === 'number' && initialStep >= 0 && initialStep < 3) {
      return initialStep;
    }
    return challenge.currentWordIndex ?? 0;
  });

  const [userInput, setUserInput] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong' | 'hint';
    messageAm: string;
  } | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = challenge.words[currentIndex];
  const isDayFinished = challenge.isCompleted || currentIndex >= challenge.words.length;

  // Sync page memory with URL query
  useEffect(() => {
    setPageMemory({
      tab: 'daily-words',
      step: currentIndex,
    });
  }, [currentIndex]);

  // Focus input whenever word changes
  useEffect(() => {
    if (!isDayFinished) {
      inputRef.current?.focus();
      setUserInput('');
      setHintsUsed(0);
      setWrongAttempts(0);
      setFeedback(null);
    }
  }, [currentIndex, isDayFinished]);

  const handlePlayAudio = (text: string) => {
    speakEnglishText(
      text,
      'normal',
      undefined,
      {
        customRateNumeric: userProgress.settings?.voiceSpeedNumeric,
        selectedVoiceURI: userProgress.settings?.selectedVoiceURI,
      }
    );
  };

  const handleShowHint = () => {
    if (!currentWord) return;
    const target = currentWord.english.trim();
    const nextHints = hintsUsed + 1;
    setHintsUsed(nextHints);

    let masked = '';
    const revealedCount = Math.min(nextHints, target.length);
    for (let i = 0; i < target.length; i++) {
      if (i < revealedCount) {
        masked += target[i] + ' ';
      } else if (target[i] === ' ') {
        masked += '   ';
      } else {
        masked += '_ ';
      }
    }

    setFeedback({
      type: 'hint',
      messageAm: `Հուշում (${nextHints}/3)․ ${masked.trim()} — ${currentWord.pronunciation}`,
    });
    inputRef.current?.focus();
  };

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentWord || isAdvancing) return;

    const trimmedInput = userInput.trim().toLowerCase();
    const target = currentWord.english.trim().toLowerCase();
    const synonyms = (currentWord.synonyms || []).map((s) => s.trim().toLowerCase());

    const isMatch = trimmedInput === target || synonyms.includes(trimmedInput);

    // Save attempt record
    const attemptRecord: DailyWordAttemptRecord = {
      id: `dwa-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId: userProgress.profile?.id || 'user-main',
      wordId: currentWord.id,
      date: todayStr,
      userAnswer: userInput.trim(),
      isCorrect: isMatch,
      attemptNumber: wrongAttempts + 1,
      hintsUsed,
      timestamp: Date.now(),
    };

    const nextAttempts = [...(userProgress.dailyWordAttempts || []), attemptRecord];

    if (!isMatch) {
      // WRONG ANSWER: Do NOT advance! Infinite retries on same word.
      const newWrong = wrongAttempts + 1;
      setWrongAttempts(newWrong);
      setFeedback({
        type: 'wrong',
        messageAm: `Սխալ է, փորձիր կրկին (փորձ ${newWrong})։ Ուշադիր ստուգիր տառերը կամ սեղմիր «Հուշում»։`,
      });
      inputRef.current?.select();

      // Persist attempt
      onSaveProgress({
        ...userProgress,
        dailyWordAttempts: nextAttempts,
      });
      return;
    }

    // CORRECT ANSWER!
    setIsAdvancing(true);
    setFeedback({
      type: 'correct',
      messageAm: `Ճիշտ է! «${currentWord.english}» (${currentWord.pronunciation}) — ${currentWord.armenian}։`,
    });
    handlePlayAudio(currentWord.english);

    // If had mistakes, schedule SRS repetition for this word
    let updatedSrs = { ...(userProgress.srsWords || {}) };
    if (wrongAttempts > 0) {
      const srsRes = calculateNextSRS(currentWord.id, updatedSrs[currentWord.id], 'again');
      updatedSrs[currentWord.id] = srsRes;
    } else {
      const srsRes = calculateNextSRS(currentWord.id, updatedSrs[currentWord.id], 'good');
      updatedSrs[currentWord.id] = srsRes;
    }

    const nextIndex = currentIndex + 1;
    const completedCount = challenge.completedCount + 1;
    const isCompletedNow = completedCount >= challenge.totalTarget;

    const updatedChallenge: DailyWordChallengeState = {
      ...challenge,
      currentWordIndex: nextIndex,
      completedCount,
      isCompleted: isCompletedNow,
      updatedAt: Date.now(),
    };

    // Update study record
    let updatedState = recordLearningAttempt(userProgress, {
      isCorrect: true,
      skill: 'writing',
      source: 'daily_words',
      prompt: currentWord.armenian,
      userAnswer: userInput.trim(),
      correctAnswer: currentWord.english,
      explanationAm: `${currentWord.armenian} -> ${currentWord.english}. ${currentWord.exampleEn}`,
      activityTitleAm: 'Օրվա 3 բառերը',
      minutesAdded: isCompletedNow ? 3 : 1,
    });

    updatedState = {
      ...updatedState,
      dailyWordsChallenge: updatedChallenge,
      dailyWordAttempts: nextAttempts,
      srsWords: updatedSrs,
      learnedWordIds: Array.from(new Set([...(updatedState.learnedWordIds || []), currentWord.id])),
    };

    setChallenge(updatedChallenge);
    onSaveProgress(updatedState);

    setTimeout(() => {
      setIsAdvancing(false);
      if (nextIndex < challenge.words.length) {
        setCurrentIndex(nextIndex);
      }
    }, 1200);
  };

  const handleRestartForPractice = () => {
    setCurrentIndex(0);
    setUserInput('');
    setHintsUsed(0);
    setWrongAttempts(0);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Օրական մարտահրավեր</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Օրվա 3 բառերը
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Ամեն օր 3 նոր բառ՝ հայերենից անգլերեն։ Մինչև ճիշտ չգրես, հաջորդ բառին չես անցնի։
          </p>
        </div>

        {/* Progress pills */}
        <div className="flex items-center gap-1.5">
          {challenge.words.map((w, idx) => (
            <div
              key={w.id}
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                idx < currentIndex || (isDayFinished && idx < challenge.totalTarget)
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : idx === currentIndex
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Completion Screen */}
      {isDayFinished ? (
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-emerald-500/30 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Շնորհավորում ենք։
            </h2>
            <p className="text-sm text-emerald-300 mt-1">
              Այսօրվա 3 բառերի առաջադրանքը հաջողությամբ ավարտված է։
            </p>
          </div>

          {/* List of learned words */}
          <div className="space-y-3 text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Այսօր սովորած բառերը․
            </p>
            {challenge.words.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      {word.english}
                    </span>
                    <span className="text-xs text-indigo-300">
                      [{word.pronunciation}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {word.armenian} — <span className="text-slate-400 italic">{word.exampleEn}</span>
                  </p>
                </div>
                <button
                  onClick={() => handlePlayAudio(word.english)}
                  className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 transition"
                  title="Լսել արտասանությունը"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartForPractice}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              Կրկնել պարապմունքը
            </button>
            <button
              onClick={() => onNavigateTab('daily-questions')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
            >
              Անցնել «Օրվա հարցերին»
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Word Card */
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Card Top: Word info */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Բառ {currentIndex + 1} / {challenge.totalTarget} ({currentWord?.level})
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Թեմա՝ {currentWord?.categoryAm}
              </p>
            </div>

            <button
              onClick={() => handlePlayAudio(currentWord?.english || '')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold transition"
              title="Լսել անգլերեն արտասանությունը"
            >
              <Volume2 className="w-4 h-4" />
              <span>Լսել</span>
            </button>
          </div>

          {/* Prompt in Armenian */}
          <div className="text-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">
              Ինչպե՞ս է անգլերեն․
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              {currentWord?.armenian}
            </div>
            {currentWord?.exampleAm && (
              <p className="text-xs text-slate-400 mt-2 px-4">
                Օրինակ՝ «{currentWord.exampleAm}»
              </p>
            )}
          </div>

          {/* User Input Form */}
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <div>
              <label
                htmlFor="word-input"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Գրիր անգլերեն թարգմանությունը․
              </label>
              <div className="relative">
                <input
                  id="word-input"
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Մուտքագրիր անգլերեն բառը..."
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  disabled={isAdvancing}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-500 text-base font-semibold outline-none transition"
                />
              </div>
            </div>

            {/* Feedback message */}
            {feedback && (
              <div
                className={`flex items-start gap-2.5 p-3.5 rounded-xl text-xs font-medium leading-relaxed ${
                  feedback.type === 'correct'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : feedback.type === 'hint'
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                {feedback.type === 'correct' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : feedback.type === 'hint' ? (
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{feedback.messageAm}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleShowHint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Հուշում ({hintsUsed}/3)</span>
              </button>

              <button
                type="submit"
                disabled={!userInput.trim() || isAdvancing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
              >
                <span>Ստուգել</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Hint Card if hints used */}
          {hintsUsed >= 2 && currentWord && (
            <div className="rounded-xl bg-indigo-950/40 border border-indigo-800/40 p-3.5 text-xs text-indigo-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                <Brain className="w-3.5 h-3.5" />
                <span>Արտասանություն և օրինակ․</span>
              </div>
              <p>Արտասանություն՝ <span className="font-semibold text-white">{currentWord.pronunciation}</span></p>
              <p className="italic text-slate-300">{currentWord.exampleEn}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

