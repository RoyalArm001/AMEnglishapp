'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Mic,
  MicOff,
  ArrowRight,
  RotateCcw,
  Trophy,
  History,
  Sparkles,
} from 'lucide-react';
import {
  UserProgressData,
  DailyQuestionDayState,
  DailyQuestionAnswerRecord,
} from '@/lib/types';
import { getDailyQuestionsDayState } from '@/data/daily-questions-and-words';
import { speakEnglishText, startSpeechRecognition } from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { getTodayDateString, recordLearningAttempt } from '@/lib/storage';

interface DailyQuestionsViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialStep?: number;
}

export default function DailyQuestionsView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialStep,
}: DailyQuestionsViewProps) {
  const todayStr = getTodayDateString(userProgress.settings?.timezone);

  // Restore or generate day state
  const [dayState, setDayState] = useState<DailyQuestionDayState>(() => {
    if (
      userProgress.dailyQuestionsState &&
      userProgress.dailyQuestionsState.date === todayStr
    ) {
      return userProgress.dailyQuestionsState;
    }
    return getDailyQuestionsDayState(
      todayStr,
      userProgress.level,
      userProgress.profile?.profession,
      10
    );
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (
      typeof initialStep === 'number' &&
      initialStep >= 0 &&
      initialStep < dayState.questions.length
    ) {
      return initialStep;
    }
    return dayState.currentIndex ?? 0;
  });

  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stopRecordingFn, setStopRecordingFn] = useState<(() => void) | null>(null);
  const [showResult, setShowResult] = useState<DailyQuestionAnswerRecord | null>(null);
  const [viewHistoryMode, setViewHistoryMode] = useState(false);

  const currentQ = dayState.questions[currentIndex];
  const isFinished = dayState.isCompleted || currentIndex >= dayState.questions.length;

  // Sync page memory with URL query
  useEffect(() => {
    setPageMemory({
      tab: 'daily-questions',
      step: currentIndex,
    });
  }, [currentIndex]);

  // Reset inputs on question switch
  useEffect(() => {
    setUserInput('');
    setSelectedOption(null);
    setShowResult(null);
  }, [currentIndex]);

  const handlePlayAudio = (text: string) => {
    speakEnglishText(text, 'normal', undefined, {
      customRateNumeric: userProgress.settings?.voiceSpeedNumeric,
      selectedVoiceURI: userProgress.settings?.selectedVoiceURI,
    });
  };

  const handleToggleMic = () => {
    if (isRecording && stopRecordingFn) {
      stopRecordingFn();
      setIsRecording(false);
      setStopRecordingFn(null);
      return;
    }

    const cancel = startSpeechRecognition({
      onResult: (spokenText) => {
        setUserInput(spokenText);
        setIsRecording(false);
        setStopRecordingFn(null);
      },
      onError: (msg) => {
        alert(msg);
        setIsRecording(false);
        setStopRecordingFn(null);
      },
      onEnd: () => {
        setIsRecording(false);
        setStopRecordingFn(null);
      },
    });

    if (cancel) {
      setIsRecording(true);
      setStopRecordingFn(() => cancel);
    }
  };

  const handleSubmitAnswer = () => {
    if (!currentQ || showResult) return;

    let submittedText = (selectedOption !== null ? selectedOption : userInput).trim();
    if (!submittedText) return;

    const lowerSub = submittedText.toLowerCase();
    const lowerCorrect = currentQ.correctAnswer.toLowerCase();
    const acceptable = (currentQ.acceptableAnswers || []).map((a) => a.toLowerCase());
    const requiredKeywords = (currentQ.requiredKeywords || []).map((k) => k.toLowerCase());

    let isCorrect = lowerSub === lowerCorrect || acceptable.includes(lowerSub);

    // If answer contains all required keywords (e.g. for free-form answering)
    if (!isCorrect && requiredKeywords.length > 0) {
      isCorrect = requiredKeywords.every((kw) => lowerSub.includes(kw));
    }

    const answerRecord: DailyQuestionAnswerRecord = {
      questionId: currentQ.id,
      userAnswer: submittedText,
      isCorrect,
      explanationAm: currentQ.explanationAm,
      timestamp: Date.now(),
    };

    const nextAnswers = [...(dayState.answers || []), answerRecord];
    const nextScore = dayState.score + (isCorrect ? 10 : 0);
    const nextIndex = currentIndex + 1;
    const isCompletedNow = nextIndex >= dayState.questions.length;

    const updatedDayState: DailyQuestionDayState = {
      ...dayState,
      currentIndex: nextIndex,
      isCompleted: isCompletedNow,
      score: nextScore,
      answers: nextAnswers,
      updatedAt: Date.now(),
    };

    let updatedState = recordLearningAttempt(userProgress, {
      isCorrect,
      skill: currentQ.type === 'speaking-mic' ? 'speaking' : 'reading',
      source: 'daily_questions',
      prompt: currentQ.questionEn,
      userAnswer: submittedText,
      correctAnswer: currentQ.correctAnswer,
      explanationAm: currentQ.explanationAm,
      activityTitleAm: `Օրվա հարց #${currentIndex + 1}`,
      minutesAdded: isCompletedNow ? 5 : 1,
    });

    updatedState = {
      ...updatedState,
      dailyQuestionsState: updatedDayState,
    };

    setShowResult(answerRecord);
    setDayState(updatedDayState);
    onSaveProgress(updatedState);

    if (isCorrect) {
      handlePlayAudio(currentQ.correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(null);
    if (currentIndex + 1 < dayState.questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestartDay = () => {
    const fresh = getDailyQuestionsDayState(
      todayStr,
      userProgress.level,
      userProgress.profile?.profession,
      dayState.totalQuestions
    );
    setDayState(fresh);
    setCurrentIndex(0);
    setShowResult(null);
    setViewHistoryMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Օրական հարցաշար</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Օրվա հարցերը
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Ամեն օր 10 նոր հարց՝ քո մակարդակին ({userProgress.level}) և մասնագիտությանը համապատասխան։
          </p>
        </div>

        <button
          onClick={() => setViewHistoryMode(!viewHistoryMode)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
        >
          <History className="w-4 h-4" />
          <span>{viewHistoryMode ? 'Հարցաշար' : 'Պատմություն'}</span>
        </button>
      </div>

      {/* History view */}
      {viewHistoryMode ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Այսօրվա արդյունքների պատմություն</span>
          </h2>
          {dayState.answers.length === 0 ? (
            <p className="text-xs text-slate-400">Դեռ ոչ մի հարցի չեք պատասխանել։</p>
          ) : (
            <div className="space-y-3">
              {dayState.answers.map((a, idx) => {
                const q = dayState.questions[idx];
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      a.isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                        : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>Հարց #{idx + 1}</span>
                      <span className={a.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                        {a.isCorrect ? 'Ճիշտ է (+10 միավոր)' : 'Սխալ է'}
                      </span>
                    </div>
                    {q && <p className="text-white font-medium">{q.questionEn}</p>}
                    <p className="text-slate-300">Քո պատասխանը․ {a.userAnswer}</p>
                    <p className="text-slate-400">{a.explanationAm}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : isFinished && !showResult ? (
        /* Finished Screen */
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-emerald-500/30 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Ամբողջ հարցաշարն ավարտվեց։
            </h2>
            <p className="text-sm text-emerald-300 mt-1">
              Ընդհանուր միավորներ՝ {dayState.score} / {dayState.totalQuestions * 10}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Ճիշտ պատասխաններ</span>
              <p className="text-xl font-extrabold text-emerald-400">
                {dayState.answers.filter((a) => a.isCorrect).length}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Սխալ պատասխաններ</span>
              <p className="text-xl font-extrabold text-rose-400">
                {dayState.answers.filter((a) => !a.isCorrect).length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartDay}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              Սկսել նորից
            </button>
            <button
              onClick={() => onNavigateTab('daily-conversations')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
            >
              Անցնել «Առօրյա զրույցներին»
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Հարց {currentIndex + 1} / {dayState.totalQuestions} ({currentQ?.level})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400">
                {dayState.score} միավոր
              </span>
              <button
                onClick={() => handlePlayAudio(currentQ?.questionEn || '')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 transition"
                title="Լսել հարցը"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-5 space-y-2">
            <div className="text-lg sm:text-xl font-bold text-white">
              {currentQ?.questionEn}
            </div>
            <div className="text-xs text-indigo-300">
              [{currentQ?.questionPronunciation}]
            </div>
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              {currentQ?.questionAm}
            </div>
          </div>

          {/* Answer Options or Input */}
          {!showResult ? (
            <div className="space-y-4">
              {currentQ?.options && currentQ.options.length > 0 ? (
                /* Multiple Choice Options */
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-semibold transition ${
                        selectedOption === opt
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                          : 'bg-slate-950 hover:bg-slate-800/80 text-slate-200 border-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                /* Text or Microphone Input */
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmitAnswer();
                      }}
                      placeholder="Գրիր պատասխանը անգլերեն..."
                      className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-500 text-sm font-semibold outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={handleToggleMic}
                      className={`absolute right-2 top-2 p-2 rounded-lg transition ${
                        isRecording
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title={isRecording ? 'Դադարեցնել ձայնագրությունը' : 'Պատասխանել միկրոֆոնով'}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                  {currentQ?.hintAm && (
                    <p className="text-xs text-slate-500 italic">
                      Հուշում․ {currentQ.hintAm}
                    </p>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedOption && !userInput.trim()}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Ստուգել պատասխանը</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Result and Explanation card */
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  showResult.isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {showResult.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Ճիշտ է (+10 միավոր)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                      <span>Սխալ պատասխան</span>
                    </>
                  )}
                </div>

                {!showResult.isCorrect && (
                  <p className="text-slate-200 font-semibold">
                    Ճիշտ տարբերակը․ <span className="text-white underline">{currentQ.correctAnswer}</span>
                  </p>
                )}

                <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800/60">
                  {currentQ.explanationAm}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
              >
                <span>
                  {currentIndex + 1 < dayState.questions.length ? 'Հաջորդ հարցը' : 'Տեսնել արդյունքները'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

