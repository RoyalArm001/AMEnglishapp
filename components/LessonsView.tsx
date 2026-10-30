'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Mic,
  MicOff,
  Star,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LESSON_CATEGORIES, LESSONS_DATA } from '../data/lessons';
import {
  getRecommendedLessonIdsForProfession,
  PROFESSIONS_LIST,
} from '../data/professions';
import { LessonCategoryId, ProfessionId, UserProgressData } from '../lib/types';
import {
  compareSpokenToTarget,
  SpeechComparisonResult,
  startSpeechRecognition,
} from '../lib/speech';
import { UI_TEXT } from '../lib/i18n';

interface LessonsViewProps {
  progress: UserProgressData;
  selectedLessonId: string;
  initialSentenceIdx?: number;
  onSelectLesson: (lessonId: string, sentenceIdx?: number, startSession?: boolean) => void;
  onUpdateSentencePosition: (lessonId: string, sentenceIdx: number) => void;
  onToggleSaveSentence: (sentenceId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onRecordSpeakingAttempt: (
    isCorrect: boolean,
    prompt: string,
    userSpoken: string,
    correctSentence: string
  ) => void;
}

export default function LessonsView({
  progress,
  selectedLessonId,
  initialSentenceIdx = 0,
  onSelectLesson,
  onUpdateSentencePosition,
  onToggleSaveSentence,
  onCompleteLesson,
  onSpeak,
  onRecordSpeakingAttempt,
}: LessonsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<LessonCategoryId | 'all' | 'profession'>('all');
  const [selectedProfessionFilter, setSelectedProfessionFilter] = useState<ProfessionId>(
    progress.profile?.profession || 'IT Specialist'
  );
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(initialSentenceIdx);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopRecognitionFn, setStopRecognitionFn] = useState<(() => void) | null>(null);
  useEffect(() => () => { stopRecognitionFn?.(); }, [stopRecognitionFn]);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [manualTextFallback, setManualTextFallback] = useState<string>('');
  const [showTextFallback, setShowTextFallback] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string>('');
  const [comparison, setComparison] = useState<SpeechComparisonResult | null>(null);

  const activeLesson =
    LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];

  useEffect(() => {
    const savedLp = progress.lessonProgressMap?.[selectedLessonId];
    const startIdx =
      initialSentenceIdx > 0
        ? initialSentenceIdx
        : savedLp?.lastSentenceIndex ?? 0;
    const validIdx = Math.min(startIdx, Math.max(0, activeLesson.sentences.length - 1));
    setActiveSentenceIdx(validIdx);
  }, [selectedLessonId, initialSentenceIdx, activeLesson.sentences.length]);

  const profRecommendedIds = getRecommendedLessonIdsForProfession(selectedProfessionFilter);

  const filteredLessons =
    selectedCategory === 'all'
      ? LESSONS_DATA
      : selectedCategory === 'profession'
      ? LESSONS_DATA.filter((l) => profRecommendedIds.includes(l.id))
      : LESSONS_DATA.filter((l) => l.categoryId === selectedCategory);

  const currentSentence =
    activeLesson.sentences[activeSentenceIdx] || activeLesson.sentences[0];

  // Auto-play audio if enabled in settings
  useEffect(() => {
    if (progress.settings?.autoPlayAudio && currentSentence?.english) {
      onSpeak(currentSentence.english, progress.settings.speechRate);
    }
  }, [activeLesson.id, activeSentenceIdx]);

  const resetSentenceSpeechState = () => {
    if (stopRecognitionFn) {
      stopRecognitionFn();
      setStopRecognitionFn(null);
    }
    setIsListening(false);
    setSpokenTranscript('');
    setManualTextFallback('');
    setSpeechError('');
    setComparison(null);
  };

  const handleOpenLesson = (lessonId: string) => {
    resetSentenceSpeechState();
    const lp = progress.lessonProgressMap?.[lessonId];
    const resumeIdx = lp?.lastSentenceIndex ?? 0;
    setActiveSentenceIdx(resumeIdx);
    onSelectLesson(lessonId, resumeIdx);
  };

  const handleNextSentence = () => {
    resetSentenceSpeechState();
    if (activeSentenceIdx + 1 < activeLesson.sentences.length) {
      const nextIdx = activeSentenceIdx + 1;
      setActiveSentenceIdx(nextIdx);
      onUpdateSentencePosition(activeLesson.id, nextIdx);
    } else {
      onCompleteLesson(activeLesson.id);
      const currentIdx = LESSONS_DATA.findIndex((l) => l.id === activeLesson.id);
      if (currentIdx >= 0 && currentIdx + 1 < LESSONS_DATA.length) {
        onSelectLesson(LESSONS_DATA[currentIdx + 1].id, 0, false);
        setActiveSentenceIdx(0);
      } else {
        setActiveSentenceIdx(0);
      }
    }
  };

  const handlePrevSentence = () => {
    resetSentenceSpeechState();
    if (activeSentenceIdx > 0) {
      const prevIdx = activeSentenceIdx - 1;
      setActiveSentenceIdx(prevIdx);
      onUpdateSentencePosition(activeLesson.id, prevIdx);
    }
  };

  const handleSpeakPractice = () => {
    if (isListening && stopRecognitionFn) {
      stopRecognitionFn();
      setIsListening(false);
      return;
    }

    setSpeechError('');
    setSpokenTranscript('');
    setComparison(null);

    const stop = startSpeechRecognition({
      onStart: () => setIsListening(true),
      onResult: (transcript, isFinal) => {
        setSpokenTranscript(transcript);
        if (isFinal || transcript.length > 2) {
          const res = compareSpokenToTarget(transcript, currentSentence.english);
          setComparison(res);
          if (isFinal) {
            onRecordSpeakingAttempt(
              res.isAcceptable,
              currentSentence.english,
              transcript,
              currentSentence.english
            );
          }
        }
      },
      onError: (msgAm) => {
        setIsListening(false);
        setSpeechError(msgAm);
        setShowTextFallback(true);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (stop) {
      setStopRecognitionFn(() => stop);
    } else {
      setShowTextFallback(true);
    }
  };

  const handleCheckManualFallback = () => {
    if (!manualTextFallback.trim()) return;
    const res = compareSpokenToTarget(manualTextFallback, currentSentence.english);
    setSpokenTranscript(manualTextFallback);
    setComparison(res);
    onRecordSpeakingAttempt(
      res.isAcceptable,
      currentSentence.english,
      manualTextFallback,
      currentSentence.english
    );
  };

  const isSaved = progress.savedSentenceIds.includes(currentSentence.id);
  const isLessonDone = progress.completedLessonIds.includes(activeLesson.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            ԱՆԳԼԵՐԵՆԻ ԴԱՍԵՐ · 16 ՈՒՍՈՒՑՄԱՆ ԲԱԺԻՆՆԵՐ ԵՎ ՄԱՍՆԱԳԻՏԱԿԱՆ ՈՒՂՂՈՒԹՅՈՒՆՆԵՐ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Անգլերենի գործնական դասեր ({LESSONS_DATA.length} դաս)
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            Ավարտած՝ {progress.completedLessonIds.length} / {LESSONS_DATA.length}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
            Պահպանված՝ {progress.savedSentenceIds.length} նախադասություն
          </span>
        </div>
      </div>

      {/* Active Interactive Lesson Player */}
      <motion.div
        key={activeLesson.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-emerald-500/30 shadow-md space-y-6"
      >
        {/* Lesson Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>ԴԱՍ {activeLesson.order}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15">{activeLesson.level}</span>
              <span>·</span>
              <span>{activeLesson.estimatedMinutes} րոպե</span>
              {isLessonDone && (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={14} /> Ավարտված է
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold mt-1">{activeLesson.titleAm}</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {activeLesson.descriptionAm}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Նախադասություն {activeSentenceIdx + 1} / {activeLesson.sentences.length}
            </span>
            <div className="flex gap-1">
              {activeLesson.sentences.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    resetSentenceSpeechState();
                    setActiveSentenceIdx(idx);
                    onUpdateSentencePosition(activeLesson.id, idx);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    idx === activeSentenceIdx
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Mandatory Fields Card: English:, Կարդացվում է:, Հայերեն: */}
        <div className="rounded-2xl p-6 md:p-8 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {UI_TEXT.mandatoryFields.english}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
              <span data-learning-text="english">{currentSentence.english}</span>
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              {UI_TEXT.mandatoryFields.pronunciation}
            </div>
            <p className="text-lg md:text-xl font-semibold text-emerald-800 dark:text-emerald-300">
              <span data-learning-text="pronunciation">{currentSentence.pronunciation}</span>
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              {UI_TEXT.mandatoryFields.armenian}
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100">
              <span data-learning-text="armenian">{currentSentence.armenian}</span>
            </p>
          </div>

          {currentSentence.grammarNoteAm && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs md:text-sm text-amber-900 dark:text-amber-200">
              💡 <strong>Քերականական նշում․</strong> {currentSentence.grammarNoteAm}
            </div>
          )}
        </div>

        {/* 4 Mandatory Sentence Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSpeak(currentSentence.english, 'normal')}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 transition shadow-sm"
            >
              <Volume2 size={18} /> {UI_TEXT.buttons.listen}
            </button>

            <button
              onClick={() => onSpeak(currentSentence.english, 'slow')}
              className="px-3.5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs md:text-sm transition"
              title="Դանդաղ արտասանություն"
            >
              {UI_TEXT.buttons.listenSlow}
            </button>

            <button
              onClick={handleSpeakPractice}
              className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              {isListening ? 'Լսում եմ... (Սեղմեք կանգնեցնելու համար)' : UI_TEXT.buttons.speak}
            </button>

            <button
              onClick={() => onToggleSaveSentence(currentSentence.id)}
              className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border transition ${
                isSaved
                  ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Star size={17} className={isSaved ? 'fill-amber-500 text-amber-500' : ''} />
              {isSaved ? UI_TEXT.buttons.saved : UI_TEXT.buttons.save}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeSentenceIdx > 0 && (
              <button
                onClick={handlePrevSentence}
                className="px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center gap-1"
              >
                <ArrowLeft size={16} /> {UI_TEXT.buttons.previous}
              </button>
            )}
            <button
              onClick={handleNextSentence}
              className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm flex items-center gap-2 hover:opacity-90 transition"
            >
              {activeSentenceIdx + 1 < activeLesson.sentences.length
                ? 'Հաջորդ նախադասությունը'
                : 'Ավարտել դասը և անցնել առաջ'}{' '}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Speech Recognition Feedback / Text Fallback */}
        {(spokenTranscript || speechError || showTextFallback) && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3">
            {speechError && (
              <p className="text-xs md:text-sm text-amber-700 dark:text-amber-300 font-medium">
                ⚠️ {speechError}
              </p>
            )}

            {spokenTranscript && (
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Ձեր արտասանած / մուտքագրած տեքստը․
                </div>
                <p className="text-base font-semibold mt-0.5">“{spokenTranscript}”</p>
              </div>
            )}

            {comparison && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {comparison.wordBreakdown.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded-md text-sm font-semibold ${
                        item.matched
                          ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-500/20 text-rose-800 dark:text-rose-300 underline'
                      }`}
                    >
                      <span data-learning-text="english">{item.word}</span>
                    </span>
                  ))}
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200">
                  {comparison.feedbackAm} (Տեքստային համընկնում՝{' '}
                  {Math.round(comparison.matchRatio * 100)}%)
                </p>
              </div>
            )}

            {/* Text Mode Fallback */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row gap-2">
                <input data-learning-text="english"
                  type="text"
                  value={manualTextFallback}
                  onChange={(e) => setManualTextFallback(e.target.value)}
                  placeholder="Կամ մուտքագրեք նախադասությունը տեքստով՝ ստուգելու համար..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                />
                <button
                  onClick={handleCheckManualFallback}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Ստուգել տեքստով
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
          <strong className="text-emerald-700 dark:text-emerald-300">📘 Դասի կանոնը․</strong>{' '}
          {activeLesson.grammarTipAm}
        </div>
      </motion.div>

      {/* Profession Filter & All 16 Lesson Categories Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold">Ուսուցման բաժիններ և Մասնագիտական ֆիլտր</h3>
          <div className="flex items-center gap-2">
            <Briefcase size={15} className="text-emerald-600" />
            <span className="text-xs font-bold text-slate-500">Ըստ մասնագիտության․</span>
            <select
              value={selectedProfessionFilter}
              onChange={(e) => {
                setSelectedProfessionFilter(e.target.value as ProfessionId);
                setSelectedCategory('profession');
              }}
              className="max-w-full min-w-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
            >
              {PROFESSIONS_LIST.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.titleAm}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
            }`}
          >
            Բոլոր դասերը ({LESSONS_DATA.length})
          </button>

          <button
            onClick={() => setSelectedCategory('profession')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === 'profession'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
            }`}
          >
            🎯 Առաջարկվող ըստ մասնագիտության ({profRecommendedIds.length})
          </button>

          {LESSON_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.titleAm}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const cat = LESSON_CATEGORIES.find((c) => c.id === lesson.categoryId);
          const completed = progress.completedLessonIds.includes(lesson.id);
          const isCurrent = lesson.id === activeLesson.id;
          const lp = progress.lessonProgressMap?.[lesson.id];

          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -3 }}
              className={`rounded-2xl p-5 bg-white dark:bg-slate-900 border transition flex flex-col justify-between ${
                isCurrent
                  ? 'border-2 border-emerald-500 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {cat?.icon} Դաս {lesson.order} · {lesson.level}
                  </span>
                  {completed ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={15} /> Ավարտված
                    </span>
                  ) : lp && lp.lastSentenceIndex > 0 ? (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      Ընթացքի մեջ ({lp.lastSentenceIndex + 1}/{lesson.sentences.length})
                    </span>
                  ) : null}
                </div>
                <h4 className="font-bold text-base leading-snug">{lesson.titleAm}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lesson.descriptionAm}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {lesson.sentences.length} նախադասություն · {lesson.estimatedMinutes} ր
                </span>
                <button
                  aria-label={`Բացել դասը՝ ${lesson.titleAm}`}
                  onClick={() => handleOpenLesson(lesson.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    isCurrent
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  <BookOpen size={14} /> {isCurrent ? 'Ընթացիկ դաս' : 'Բացել դասը'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
