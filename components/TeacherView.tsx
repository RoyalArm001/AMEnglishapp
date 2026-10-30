'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TEACHER_CURRICULUM } from '../data/placement-and-teacher';
import { TeacherMessage, UserProgressData } from '../lib/types';
import { evaluateWithRuleBasedTeacher } from '../lib/teacher-engine';
import { startSpeechRecognition } from '../lib/speech';

interface TeacherViewProps {
  progress: UserProgressData;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onUpdateTeacherState: (params: {
    newMessages: TeacherMessage[];
    nextQuestionIndex: number;
    difficultyScore: number;
    masteredQuestionIds: string[];
    weakTopics: string[];
    isCorrect: boolean;
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    explanationAm: string;
  }) => void;
}

export default function TeacherView({
  progress,
  onSpeak,
  onUpdateTeacherState,
}: TeacherViewProps) {
  const session = progress.teacherSession;
  const storedQuestion = TEACHER_CURRICULUM[session.currentQuestionIndex % TEACHER_CURRICULUM.length];
  const preferredQuestion = (!session.messages.length || (storedQuestion?.profession && storedQuestion.profession !== progress.profile.profession)) ? TEACHER_CURRICULUM.find(q => q.profession === progress.profile.profession) : undefined;
  const activeQuestion = preferredQuestion ||
    TEACHER_CURRICULUM[session.currentQuestionIndex % TEACHER_CURRICULUM.length] ||
    TEACHER_CURRICULUM[0];

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [providerLabel, setProviderLabel] = useState<string>(
    'Պատրաստի հարցաշար և կանոններով ստուգում'
  );
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopRecFn, setStopRecFn] = useState<(() => void) | null>(null);
  useEffect(() => () => { stopRecFn?.(); }, [stopRecFn]);

  const handleSendAnswer = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setInputText('');

    const payload = {
      profession: progress.profile.profession,
      currentQuestionId: activeQuestion.id,
      userAnswer: trimmed,
      masteredQuestionIds: session.masteredQuestionIds || [],
      weakTopics: session.weakTopics || [],
      difficultyScore: session.difficultyScore || 2,
    };

    const evalResult = evaluateWithRuleBasedTeacher(payload);

    setProviderLabel(evalResult.providerLabelAm);

    const userMsg: TeacherMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      textEn: trimmed,
      timestamp: Date.now(),
    };

    const teacherReplyMsg: TeacherMessage = {
      id: `t-${Date.now() + 1}`,
      role: 'teacher',
      textEn: evalResult.feedbackEn,
      correctionEn: evalResult.correctedSentenceEn,
      explanationAm: evalResult.explanationAm,
      nextQuestionEn: evalResult.nextQuestion.questionEn,
      nextQuestionPronunciation: evalResult.nextQuestion.questionPronunciation,
      nextQuestionAm: evalResult.nextQuestion.questionAm,
      isCorrect: evalResult.isFullyCorrect,
      level: evalResult.nextQuestion.level as any,
      topic: evalResult.nextQuestion.topic,
      timestamp: Date.now() + 1,
    };

    const nextIdx = TEACHER_CURRICULUM.findIndex(
      (q) => q.id === evalResult.nextQuestion.id
    );

    const nextMastered = evalResult.masteredQuestionId
      ? Array.from(new Set([...(session.masteredQuestionIds || []), evalResult.masteredQuestionId]))
      : session.masteredQuestionIds || [];

    const nextWeak = evalResult.weakTopicDetected
      ? Array.from(new Set([...(session.weakTopics || []), evalResult.weakTopicDetected]))
      : evalResult.isFullyCorrect ? session.weakTopics.filter(topic => topic !== activeQuestion.topic) : session.weakTopics || [];

    onUpdateTeacherState({
      newMessages: [...(session.messages || []), userMsg, teacherReplyMsg].slice(-30),
      nextQuestionIndex: nextIdx >= 0 ? nextIdx : (session.currentQuestionIndex + 1) % TEACHER_CURRICULUM.length,
      difficultyScore: evalResult.updatedDifficulty,
      masteredQuestionIds: nextMastered,
      weakTopics: nextWeak,
      isCorrect: evalResult.isFullyCorrect,
      prompt: activeQuestion.questionEn,
      userAnswer: trimmed,
      correctAnswer: evalResult.correctedSentenceEn,
      explanationAm: evalResult.explanationAm,
    });

    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    if (isListening && stopRecFn) {
      stopRecFn();
      setIsListening(false);
      return;
    }
    const stop = startSpeechRecognition({
      onStart: () => setIsListening(true),
      onResult: (transcript) => setInputText(transcript),
      onError: () => setIsListening(false),
      onEnd: () => setIsListening(false),
    });
    if (stop) setStopRecFn(() => stop);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header & Honest Provider Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            ՈՒՍՈՒՄՆԱԿԱՆ ՕԳՆԱԿԱՆ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Հարց ու պատասխան՝ հայերեն բացատրություններով
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Պարապեք պատրաստի հարցաշարով։ Օգնականը համեմատում է պատասխանը օրինակների ու կանոնների հետ և ցույց տալիս հայերեն բացատրությունը։ Այն ազատ զրույց չի վարում և չի հայտնաբերում բոլոր հնարավոր սխալները։
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-700 dark:text-purple-300 text-xs font-bold">
            <ShieldCheck size={15} /> {providerLabel}
          </span>
          <span className="text-xs text-slate-400">
            Դժվարություն՝ {session.difficultyScore}/10 · Յուրացված հարցեր՝{' '}
            {(session.masteredQuestionIds || []).length}/{TEACHER_CURRICULUM.length}
          </span>
        </div>
      </div>

      {/* Current Active Question Banner (Always 1 question at a time) */}
      <motion.div
        key={activeQuestion.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
            <Sparkles size={15} />
            <span>ԸՆԹԱՑԻԿ ՀԱՐՑ · ՄԱԿԱՐԴԱԿ {activeQuestion.level}</span>
            <span>·</span>
            <span>Թեմա՝ {activeQuestion.topic}</span>
          </div>
          <button
            onClick={() => onSpeak(activeQuestion.questionEn, 'normal')}
            className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Volume2 size={15} /> Լսել հարցը
          </button>
        </div>

        <div>
          <p className="text-xl md:text-2xl font-bold leading-snug">
            “<span data-learning-text="english">{activeQuestion.questionEn}</span>”
          </p>
          <p className="text-xs md:text-sm text-purple-200 mt-1.5">
            🔊 <span data-learning-text="pronunciation">{activeQuestion.questionPronunciation}</span>
          </p>
          <p className="text-xs md:text-sm text-slate-200 mt-0.5">
            🇦🇲 <span data-learning-text="armenian">{activeQuestion.questionAm}</span>
          </p>
        </div>

        {/* Quick Example Chip for first question */}
        {activeQuestion.id === 'tq-1' && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-purple-200">Փորձեք գրել կարճ (օրինակ)․</span>
            <button
              onClick={() => setInputText('Restart router')}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 font-semibold"
            >
              “Restart router”
            </button>
            <button
              onClick={() => setInputText('I restart the router.')}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 font-semibold"
            >
              “I restart the router.”
            </button>
          </div>
        )}
      </motion.div>

      {/* Weak Topics Indicator if any */}
      {session.weakTopics && session.weakTopics.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs md:text-sm flex flex-wrap items-center justify-between gap-2">
          <div>
            🎯 <strong>Կենտրոնացում թույլ կողմերի վրա․</strong>{' '}
            {session.weakTopics.join(' · ')}
          </div>
          <span className="text-xs text-slate-500">
            Ուսուցիչն առաջնահերթ տալիս է հարցեր այս թեմաներից
          </span>
        </div>
      )}

      {/* Conversation History Feed */}
      <div className="rounded-3xl p-5 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-h-[460px] overflow-y-auto">
        {(!session.messages || session.messages.length === 0) ? (
          <div className="text-center py-8 space-y-2 text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-sm">
              Պատասխանեք վերևի հարցին անգլերենով (նույնիսկ կարճ բառերով)։
            </p>
            <p className="text-xs">
              Օրինակ՝ եթե գրեք «Restart router», ուսուցիչը կուղղի՝ «Good! The correct sentence is: "I restart the router."» և կբացատրի հայերեն։
            </p>
          </div>
        ) : (
          session.messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-emerald-600 text-white text-sm font-medium shadow-sm">
                  <span data-learning-text="english">{m.textEn}</span>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[90%] p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Ուսուցչի արձագանքը
                    </span>
                    {m.correctionEn && (
                      <button
                        onClick={() => onSpeak(m.correctionEn!, 'normal')}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-xs font-bold flex items-center gap-1"
                      >
                        <Volume2 size={13} /> Լսել ճիշտը
                      </button>
                    )}
                  </div>

                  <p className="font-bold text-sm md:text-base"><span data-learning-text="english">{m.textEn}</span></p>

                  {m.explanationAm && (
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl">
                      🇦🇲 <strong>Բացատրություն․</strong> {m.explanationAm}
                    </p>
                  )}

                  {m.nextQuestionEn && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs md:text-sm">
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        Հաջորդ հարցը ({m.level})․{' '}
                      </span>
                      <span className="font-semibold"><span data-learning-text="english">{m.nextQuestionEn}</span></span>
                    </div>
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* Input Area */}
      <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-2.5">
        <input data-learning-text="english"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendAnswer()}
          placeholder="Գրեք Ձեր պատասխանը անգլերեն (օր.՝ Restart router կամ I restart the router)..."
          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`px-4 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
            title="Պատասխանել ձայնով"
          >
            {isListening ? <MicOff size={17} /> : <Mic size={17} />}
            <span>{isListening ? 'Լսում եմ...' : 'Ձայնով'}</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleSendAnswer}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Send size={16} /> {isLoading ? 'Ստուգվում է...' : 'Ուղարկել'}
          </button>
        </div>
      </div>
    </div>
  );
}

