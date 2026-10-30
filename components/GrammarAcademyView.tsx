'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Volume2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Trophy,
} from 'lucide-react';
import {
  UserProgressData,
  GrammarTopicLesson,
  GrammarExerciseItem,
  GrammarAttemptRecord,
} from '@/lib/types';
import { GRAMMAR_TOPICS_DATA } from '@/data/grammar-academy';
import { speakEnglishText } from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { recordLearningAttempt } from '@/lib/storage';

interface GrammarAcademyViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialTopicId?: string;
  initialStep?: number;
}

export default function GrammarAcademyView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialTopicId,
  initialStep,
}: GrammarAcademyViewProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(() => {
    if (initialTopicId && GRAMMAR_TOPICS_DATA.some((t) => t.id === initialTopicId)) {
      return initialTopicId;
    }
    return null;
  });

  const activeTopic = selectedTopicId
    ? GRAMMAR_TOPICS_DATA.find((t) => t.id === selectedTopicId) || null
    : null;

  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(() => {
    if (typeof initialStep === 'number' && initialStep >= 0 && initialStep < 4) {
      return initialStep;
    }
    return 0;
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    textAm: string;
  } | null>(null);
  const [completedTopicExercises, setCompletedTopicExercises] = useState<string[]>([]);

  // Sync page memory with URL query
  useEffect(() => {
    if (activeTopic) {
      setPageMemory({
        tab: 'grammar',
        subId: activeTopic.id,
        step: activeExerciseIndex,
      });
    } else {
      setPageMemory({
        tab: 'grammar',
      });
    }
  }, [activeTopic?.id, activeExerciseIndex]);

  // When opening a topic, restore completed exercises
  useEffect(() => {
    if (activeTopic) {
      const saved = userProgress.grammarAttemptsMap?.[activeTopic.id];
      if (saved) {
        setCompletedTopicExercises(saved.completedExercises || []);
      } else {
        setCompletedTopicExercises([]);
      }
      setActiveExerciseIndex(0);
      setSelectedOption(null);
      setUserInput('');
      setFeedback(null);
    }
  }, [activeTopic?.id]);

  const handlePlayAudio = (text: string) => {
    speakEnglishText(text, 'normal', undefined, {
      customRateNumeric: userProgress.settings?.voiceSpeedNumeric,
      selectedVoiceURI: userProgress.settings?.selectedVoiceURI,
    });
  };

  const currentExercise: GrammarExerciseItem | undefined =
    activeTopic?.exercises[activeExerciseIndex];

  const handleCheckAnswer = () => {
    if (!currentExercise || !activeTopic) return;

    let submitted = (selectedOption !== null ? selectedOption : userInput).trim();
    if (!submitted) return;

    const lowerSub = submitted.toLowerCase();
    const lowerCorrect = currentExercise.correctAnswer.toLowerCase();
    const acceptable = currentExercise.acceptableAnswers || currentExercise.acceptableAlternatives || [];
    const explanationText = currentExercise.ruleExplanationAm || currentExercise.explanationAm || '';
    const questionTextEn = currentExercise.promptEn || currentExercise.questionEn || '';
    const isCorrect =
      lowerSub === lowerCorrect ||
      acceptable.some((alt) => alt.toLowerCase() === lowerSub);

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        textAm: `Ճիշտ է։ ${explanationText}`,
      });
      handlePlayAudio(currentExercise.correctAnswer);

      const nextCompleted = Array.from(
        new Set([...completedTopicExercises, currentExercise.id])
      );
      setCompletedTopicExercises(nextCompleted);

      const isTopicFinished = nextCompleted.length >= activeTopic.exercises.length;

      const record: GrammarAttemptRecord = {
        id: `gram-${activeTopic.id}`,
        userId: userProgress.profile?.id || 'user-main',
        topicId: activeTopic.id,
        isCompleted: isTopicFinished,
        score: nextCompleted.length * 25,
        completedExercises: nextCompleted,
        updatedAt: Date.now(),
      };

      let updated = recordLearningAttempt(userProgress, {
        isCorrect: true,
        skill: 'writing',
        source: 'grammar',
        prompt: questionTextEn,
        userAnswer: submitted,
        correctAnswer: currentExercise.correctAnswer,
        explanationAm: explanationText,
        activityTitleAm: `Քերականություն՝ ${activeTopic.titleAm}`,
        minutesAdded: isTopicFinished ? 5 : 1,
      });

      updated = {
        ...updated,
        grammarAttemptsMap: {
          ...(updated.grammarAttemptsMap || {}),
          [activeTopic.id]: record,
        },
      };

      onSaveProgress(updated);
    } else {
      setFeedback({
        isCorrect: false,
        textAm: `Սխալ է։ Ճիշտ պատասխանը՝ «${currentExercise.correctAnswer}»։ ${explanationText}`,
      });
    }
  };

  const handleNextExercise = () => {
    if (!activeTopic) return;
    setFeedback(null);
    setSelectedOption(null);
    setUserInput('');
    if (activeExerciseIndex + 1 < activeTopic.exercises.length) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      {!activeTopic && (
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Քերականության Ակադեմիա</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Անգլերենի քերականություն (A1 – C2)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Բոլոր 18 պարտադիր քերականական թեմաները՝ կանոններով, բանաձևերով և ինտերակտիվ վարժություններով։
          </p>
        </div>
      )}

      {/* TOPIC VIEW: Lesson Theory & 4 Exercises */}
      {activeTopic ? (
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => setSelectedTopicId(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Վերադառնալ բոլոր թեմաներին</span>
          </button>

          {/* Topic Title Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                Մակարդակ՝ {activeTopic.level} • Դաս {activeTopic.order} / 18
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {completedTopicExercises.length} / {activeTopic.exercises.length} վարժություն ավարտված
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white">
              {activeTopic.titleAm}
            </h2>
            <p className="text-sm font-semibold text-indigo-300">
              {activeTopic.titleEn}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {activeTopic.ruleAm || activeTopic.summaryAm}
            </p>

            {/* Formula / Pattern Callout */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-900/60 text-xs space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Կազմության բանաձևը․
              </span>
              <code className="text-emerald-300 font-mono font-bold text-xs sm:text-sm block">
                {activeTopic.formula || activeTopic.formulaEn}
              </code>
            </div>
          </div>

          {/* Examples Carousel / List */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Օրինակներ և արտասանություն․</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeTopic.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      {ex.english}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(ex.english)}
                      className="p-1 text-slate-400 hover:text-indigo-300"
                      title="Լսել"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-indigo-300">[{ex.pronunciation}]</p>
                  <p className="text-xs text-slate-300">{ex.armenian}</p>
                  <p className="text-[11px] text-slate-500 italic">{ex.noteAm}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Interactive Exercises */}
          {currentExercise && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Վարժություն {activeExerciseIndex + 1} / {activeTopic.exercises.length}
                </span>

                <div className="flex items-center gap-1">
                  {activeTopic.exercises.map((ex, idx) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        setActiveExerciseIndex(idx);
                        setSelectedOption(null);
                        setUserInput('');
                        setFeedback(null);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        idx === activeExerciseIndex
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                          : completedTopicExercises.includes(ex.id)
                          ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <div className="text-base sm:text-lg font-bold text-white">
                  {currentExercise.promptEn || currentExercise.questionEn}
                </div>
                <div className="text-xs text-slate-400">
                  {currentExercise.promptAm || currentExercise.questionAm}
                </div>
              </div>

              {/* Options or Input */}
              {currentExercise.options && currentExercise.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentExercise.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold text-left transition ${
                        selectedOption === opt
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-950 hover:bg-slate-800/80 text-slate-200 border-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder="Գրիր ճիշտ պատասխանը..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm font-semibold outline-none focus:border-indigo-500"
                />
              )}

              {/* Feedback box */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium ${
                    feedback.isCorrect
                      ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border border-rose-500/30 text-rose-200'
                  }`}
                >
                  {feedback.textAm}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption && !userInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition shadow-md"
                >
                  Ստուգել
                </button>

                {feedback?.isCorrect && activeExerciseIndex + 1 < activeTopic.exercises.length && (
                  <button
                    type="button"
                    onClick={handleNextExercise}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                  >
                    <span>Հաջորդ վարժությունը</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* TOPICS CATALOG: All 18 Grammar Topics */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRAMMAR_TOPICS_DATA.map((topic) => {
            const attempt = userProgress.grammarAttemptsMap?.[topic.id];
            const isDone = attempt?.isCompleted;
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`rounded-2xl p-5 space-y-3 cursor-pointer transition shadow-lg border flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500'
                    : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {topic.level} • Դաս {topic.order}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        Ավարտված
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {topic.titleAm}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">
                    {topic.titleEn}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {topic.ruleAm}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 font-mono">{topic.exercises.length} վարժություն</span>
                  <span className="text-indigo-400 flex items-center gap-1">
                    Սկսել դասը <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

