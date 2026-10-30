'use client';
import { useStudyActivity } from '../lib/study-activity';
import { evaluateExerciseAnswer } from '../lib/exercise-validation';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Mic,
  MicOff,
  RotateCcw,
  Volume2,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EXERCISE_ITEMS } from '../data/exercises';
import { CEFRLevel, ExerciseItem, ExerciseType, SkillType, UserProgressData } from '../lib/types';
import { normalizeEnglishText, startSpeechRecognition } from '../lib/speech';

interface ExercisesViewProps {
  progress: UserProgressData;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onRecordExerciseResult: (params: {
    exercise: ExerciseItem;
    isCorrect: boolean;
    userAnswer: string;
  }) => void;
}

const EXERCISE_TYPE_META: { id: ExerciseType | 'all'; code: string; labelAm: string }[] = [
  { id: 'all', code: 'Բոլորը', labelAm: 'Բոլոր տեսակները (Ա–Զ)' },
  { id: 'fill-blank', code: 'Վարժություն Ա', labelAm: 'Լրացնել բաց թողնված բառը' },
  { id: 'translate', code: 'Վարժություն Բ', labelAm: 'Թարգմանել անգլերեն' },
  { id: 'correct-mistake', code: 'Վարժություն Գ', labelAm: 'Գտնել և ուղղել սխալը' },
  { id: 'build-sentence', code: 'Վարժություն Դ', labelAm: 'Հավաքել նախադասություն' },
  { id: 'listening', code: 'Վարժություն Ե', labelAm: 'Լսողական վարժություն' },
  { id: 'speaking', code: 'Վարժություն Զ', labelAm: 'Ձայնային պատասխան' },
];

export default function ExercisesView({
  progress,
  onSpeak: speakAudio,
  onRecordExerciseResult,
}: ExercisesViewProps) {
  const studyActivity = useStudyActivity();
  const onSpeak = (text: string, rate?: 'slow' | 'normal') => { studyActivity.start(); speakAudio(text, rate); };
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [userInput, setUserInput] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<{ word: string; origIdx: number }[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [checkedResult, setCheckedResult] = useState<{
    isCorrect: boolean;
    submittedText: string;
  } | null>(null);

  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopRecFn, setStopRecFn] = useState<(() => void) | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);
  useEffect(() => () => { stopRecFn?.(); }, [stopRecFn]);
  const [speechError, setSpeechError] = useState<string>('');

  const filteredExercises = useMemo(() => {
    return EXERCISE_ITEMS.filter((ex) => {
      const matchType = selectedType === 'all' || ex.type === selectedType;
      const levels: CEFRLevel[] = ['A1','A2','B1','B2','C1','C2'];
      const difficulty = progress.settings.exerciseDifficulty;
      const allowed = difficulty === 'easy' ? ['A1','A2'] : difficulty === 'medium' ? ['B1','B2'] : difficulty === 'hard' ? ['C1','C2'] : levels.filter((_,i)=>Math.abs(i-levels.indexOf(progress.level))<=1);
      const matchLevel = selectedLevel !== 'all' ? ex.level === selectedLevel : allowed.includes(ex.level);
      return matchType && matchLevel;
    });
  }, [selectedType, selectedLevel, progress.settings.exerciseDifficulty, progress.level]);

  const currentExercise =
    filteredExercises[currentIndex % Math.max(1, filteredExercises.length)] || EXERCISE_ITEMS[0];

  const resetStateForNext = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (stopRecFn) {
      stopRecFn();
      setStopRecFn(null);
    }
    setIsListening(false);
    setUserInput('');
    setSelectedWords([]);
    setShowHint(false);
    setCheckedResult(null);
    setSpeechError('');
  };

  const handleCheck = () => {
    studyActivity.start();
    const raw =
      currentExercise.type === 'build-sentence'
        ? selectedWords.map((w) => w.word).join(' ')
        : userInput;

    if (!raw.trim() || checkedResult) return;

    const isCorrect = evaluateExerciseAnswer(currentExercise, raw);
    setCheckedResult({
      isCorrect,
      submittedText: raw.trim(),
    });

    onRecordExerciseResult({
      exercise: currentExercise,
      isCorrect,
      userAnswer: raw.trim(),
    });

    if (progress.settings?.autoAdvanceExercises && isCorrect) {
      advanceTimer.current = setTimeout(() => {
        resetStateForNext();
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredExercises.length));
      }, 1500);
    }
  };

  const handleNextExercise = () => {
    resetStateForNext();
    const retry = progress.settings.autoRepeatMistakes ? filteredExercises.findIndex(ex => ex.id !== currentExercise.id && progress.mistakes.some(m => m.exerciseId === ex.id && !m.resolved)) : -1;
    setCurrentIndex(prev => retry >= 0 ? retry : (prev + 1) % Math.max(1, filteredExercises.length));
  };

  const handleToggleWordChip = (word: string, origIdx: number) => {
    if (checkedResult) return;
    const exists = selectedWords.some((w) => w.origIdx === origIdx);
    if (exists) {
      setSelectedWords(selectedWords.filter((w) => w.origIdx !== origIdx));
    } else {
      setSelectedWords([...selectedWords, { word, origIdx }]);
    }
  };

  const handleVoiceInput = () => {
    studyActivity.start();
    if (isListening && stopRecFn) {
      stopRecFn();
      setIsListening(false);
      return;
    }

    setSpeechError('');
    const stop = startSpeechRecognition({
      onStart: () => setIsListening(true),
      onResult: (transcript) => {
        setUserInput(transcript);
      },
      onError: (msg) => {
        setIsListening(false);
        setSpeechError(msg);
      },
      onEnd: () => setIsListening(false),
    });

    if (stop) {
      setStopRecFn(() => stop);
    }
  };

  const typeInfo =
    EXERCISE_TYPE_META.find((t) => t.id === currentExercise.type) || EXERCISE_TYPE_META[1];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            INTERACTIVE EXERCISES · ԱՌԱՋԱԴՐԱՆՔՆԵՐ (A–F)
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Ինտերակտիվ վարժությունների հարթակ ({EXERCISE_ITEMS.length} առաջադրանք)
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            Ճիշտ՝ {progress.correctAnswersCount}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300">
            Սխալ՝ {progress.wrongAnswersCount}
          </span>
        </div>
      </div>

      {/* Exercise Type Tabs (A to F) */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {EXERCISE_TYPE_META.map((t) => {
            const active = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  resetStateForNext();
                  setSelectedType(t.id);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <span className="opacity-80 mr-1.5">{t.code}:</span>
                <span>{t.labelAm}</span>
              </button>
            );
          })}
        </div>

        {/* CEFR Level Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1">Մակարդակ․</span>
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                resetStateForNext();
                setSelectedLevel(lvl);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedLevel === lvl
                  ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {lvl === 'all' ? 'Ըստ կարգավորումների' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exercise Card */}
      {filteredExercises.length === 0 ? <p role="status">Այս ֆիլտրերով առաջադրանք չկա։ Ընտրեք այլ մակարդակ կամ տեսակ։</p> : <motion.div
        key={currentExercise.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-6"
      >
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              {typeInfo.code} · {typeInfo.labelAm}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              Մակարդակ {currentExercise.level}
            </span>
            <span className="text-xs text-slate-400 font-medium">{currentExercise.category}</span>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Առաջադրանք {(currentIndex % Math.max(1, filteredExercises.length)) + 1} /{' '}
            {filteredExercises.length}
          </span>
        </div>

        {/* Prompt Display Based on Exercise Type */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            🇦🇲 <span data-learning-text="armenian">{currentExercise.promptAm}</span>
          </p>

          {/* Exercise A: Fill in the blank */}
          {currentExercise.type === 'fill-blank' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <p className="text-xl md:text-2xl font-bold leading-relaxed">
                {currentExercise.promptEn.split('___').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span data-learning-text="english">{part}</span>
                    {i < arr.length - 1 && (
                      <span className="inline-block min-w-[90px] px-3 py-0.5 mx-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-500 text-center">
                        <span data-learning-text="english">{userInput || '___'}</span>
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}

          {/* Exercise B: Translate to English */}
          {currentExercise.type === 'translate' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold uppercase text-slate-400 mb-1">
                Թարգմանեք անգլերեն․
              </div>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                <span data-learning-text="english">{currentExercise.promptEn}</span>
              </p>
            </div>
          )}

          {/* Exercise C: Correct the mistake */}
          {currentExercise.type === 'correct-mistake' && (
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2">
              <div className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400">
                ❌ Սխալ նախադասություն (Գտեք և գրեք ճիշտ տարբերակը)․
              </div>
              <p className="text-xl md:text-2xl font-bold text-rose-900 dark:text-rose-200 line-through decoration-rose-500/60">
                <span data-learning-text="english">{currentExercise.incorrectSentence || currentExercise.promptEn}</span>
              </p>
            </div>
          )}

          {/* Exercise D: Build a sentence */}
          {currentExercise.type === 'build-sentence' && (
            <div className="space-y-4">
              <div className="p-4 min-h-[68px] rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
                {selectedWords.length === 0 ? (
                  <span className="text-sm text-slate-400">
                    Սեղմեք ներքևի բառերի վրա՝ ճիշտ անգլերեն նախադասություն հավաքելու համար...
                  </span>
                ) : (
                  selectedWords.map((item) => (
                    <button
                      key={item.origIdx}
                      onClick={() => handleToggleWordChip(item.word, item.origIdx)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
                    >
                      <span data-learning-text="english">{item.word}</span>
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {(currentExercise.wordsBank || []).map((word, idx) => {
                  const used = selectedWords.some((w) => w.origIdx === idx);
                  return (
                    <button
                      key={idx}
                      disabled={used || Boolean(checkedResult)}
                      onClick={() => handleToggleWordChip(word, idx)}
                      className={`px-3.5 py-2 rounded-xl font-semibold text-sm border transition ${
                        used
                          ? 'opacity-30 bg-slate-100 dark:bg-slate-800 border-slate-200'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                      }`}
                    >
                      <span data-learning-text="english">{word}</span>
                    </button>
                  );
                })}
                {selectedWords.length > 0 && !checkedResult && (
                  <button
                    onClick={() => setSelectedWords([])}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1"
                  >
                    <RotateCcw size={14} /> Մաքրել
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exercise E: Listening */}
          {currentExercise.type === 'listening' && (
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400">
                  🎧 Լսեք նախադասությունը և գրեք այն անգլերեն
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Սեղմեք «Լսել» կամ «Դանդաղ» կոճակը և մուտքագրեք լսած նախադասությունը։
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onSpeak(currentExercise.audioText || currentExercise.correctAnswer, 'normal')
                  }
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-2"
                >
                  <Volume2 size={18} /> Լսել (Normal)
                </button>
                <button
                  onClick={() =>
                    onSpeak(currentExercise.audioText || currentExercise.correctAnswer, 'slow')
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-xs"
                >
                  🐢 Դանդաղ (Slow)
                </button>
              </div>
            </div>
          )}

          {/* Exercise F: Speaking */}
          {currentExercise.type === 'speaking' && (
            <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    🎙️ Հարցին պատասխանեք ձայնով (կամ տեքստով)
                  </div>
                  <p className="text-xl font-bold mt-1"><span data-learning-text="english">{currentExercise.promptEn}</span></p>
                </div>
                <button
                  onClick={() =>
                    onSpeak(currentExercise.audioText || currentExercise.promptEn, 'normal')
                  }
                  className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0"
                  title="Լսել հարցը"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  {isListening ? 'Լսում եմ... (Սեղմեք կանգնեցնելու համար)' : '🎙️ Պատասխանել միկրոֆոնով'}
                </button>
              </div>
              {speechError && (
                <p className="text-xs text-amber-700 dark:text-amber-300">⚠️ {speechError}</p>
              )}
            </div>
          )}

          {/* Input Box for A, B, C, E, F */}
          {currentExercise.type !== 'build-sentence' && (
            <div>
              <input data-learning-text="english"
                type="text"
                disabled={Boolean(checkedResult)}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !checkedResult) {
                    handleCheck();
                  }
                }}
                placeholder={
                  currentExercise.type === 'fill-blank'
                    ? 'Գրեք բաց թողնված բառը (կամ ամբողջ նախադասությունը)...'
                    : 'Մուտքագրեք Ձեր պատասխանը անգլերեն...'
                }
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Action Row: Check Answer + Hint Button (Hidden until clicked!) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            {!checkedResult ? (
              <button
                onClick={handleCheck}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-sm"
              >
                <CheckCircle2 size={18} /> Ստուգել պատասխանը
              </button>
            ) : (
              <button
                onClick={handleNextExercise}
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm flex items-center gap-2 transition shadow-sm"
              >
                Հաջորդ առաջադրանքը <ArrowRight size={18} />
              </button>
            )}

            {progress.settings?.hintsEnabled !== false && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs md:text-sm font-semibold flex items-center gap-1.5 transition"
              >
                <HelpCircle size={16} className="text-amber-500" />
                {showHint ? 'Թաքցնել հուշումը' : 'Հուշում'}
              </button>
            )}
          </div>
        </div>

        {/* Hint Box — ONLY shown after user clicks Hint button */}
        {showHint && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-sm text-amber-950 dark:text-amber-200">
            💡 <strong>Հուշում (Hint)․</strong> {currentExercise.hintAm}
          </div>
        )}

        {/* Validation Feedback Box */}
        {checkedResult && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border space-y-3 ${
              checkedResult.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-base">
                {checkedResult.isCorrect ? (
                  <>
                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={22} />
                    <span>Ճիշտ է! (Correct)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-rose-600 dark:text-rose-400" size={22} />
                    <span>Ուշադրություն դարձրեք ուղղմանը</span>
                  </>
                )}
              </div>
              <button
                onClick={() => onSpeak(currentExercise.correctAnswer, 'normal')}
                className="px-3 py-1.5 rounded-lg bg-white/70 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 size={14} /> Լսել ճիշտը
              </button>
            </div>

            {!checkedResult.isCorrect && (
              <div className="text-sm">
                <span className="font-semibold opacity-75">Ձեր պատասխանը․ </span>
                <span className="line-through text-rose-600 dark:text-rose-300 font-semibold">
                  {checkedResult.submittedText}
                </span>
              </div>
            )}

            <div className="text-sm md:text-base">
              <span className="font-semibold">Ճիշտ տարբերակը․ </span>
              <strong className="text-emerald-700 dark:text-emerald-300">
                <span data-learning-text="english">{currentExercise.correctAnswer}</span>
              </strong>
            </div>

            <div className="text-xs md:text-sm pt-2 border-t border-black/10 dark:border-white/10">
              🇦🇲 <strong>Բացատրություն․</strong> {currentExercise.explanationAm}
            </div>
          </motion.div>
        )}
      </motion.div>}
    </div>
  );
}

