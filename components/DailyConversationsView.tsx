'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  Check,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import {
  UserProgressData,
  DailyConversationSessionState,
  DailyConversationTopic,
} from '@/lib/types';
import { DAILY_CONVERSATION_TOPICS } from '@/data/daily-conversations';
import { speakEnglishText, startSpeechRecognition } from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { recordLearningAttempt } from '@/lib/storage';

interface DailyConversationsViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialTopicId?: string;
  initialStep?: number;
}

export default function DailyConversationsView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialTopicId,
  initialStep,
}: DailyConversationsViewProps) {
  // Select active topic
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (initialTopicId && DAILY_CONVERSATION_TOPICS.some((t) => t.id === initialTopicId)) {
      return initialTopicId;
    }
    return DAILY_CONVERSATION_TOPICS[0].id;
  });

  const activeTopic =
    DAILY_CONVERSATION_TOPICS.find((t) => t.id === selectedTopicId) ||
    DAILY_CONVERSATION_TOPICS[0];

  // Restore session for active topic from user progress
  const [session, setSession] = useState<DailyConversationSessionState>(() => {
    const existing = userProgress.dailyConversationsMap?.[activeTopic.id];
    if (existing) return existing;
    return {
      id: `conv-${activeTopic.id}`,
      userId: userProgress.profile?.id || 'user-main',
      topicId: activeTopic.id,
      currentTurnIndex: typeof initialStep === 'number' && initialStep >= 0 ? initialStep : 0,
      isCompleted: false,
      completedTurns: 0,
      history: [],
      updatedAt: Date.now(),
    };
  });

  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [stopRecordingFn, setStopRecordingFn] = useState<(() => void) | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    textAm: string;
  } | null>(null);
  const [showSample, setShowSample] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentTurn = activeTopic.turns[session.currentTurnIndex];
  const isFinished = session.isCompleted || session.currentTurnIndex >= activeTopic.turns.length;

  // Sync page memory with URL query
  useEffect(() => {
    setPageMemory({
      tab: 'daily-conversations',
      subId: activeTopic.id,
      step: session.currentTurnIndex,
    });
  }, [activeTopic.id, session.currentTurnIndex]);

  // When active topic changes, restore state for that topic
  useEffect(() => {
    const existing = userProgress.dailyConversationsMap?.[activeTopic.id];
    if (existing) {
      setSession(existing);
    } else {
      setSession({
        id: `conv-${activeTopic.id}`,
        userId: userProgress.profile?.id || 'user-main',
        topicId: activeTopic.id,
        currentTurnIndex: 0,
        isCompleted: false,
        completedTurns: 0,
        history: [],
        updatedAt: Date.now(),
      });
    }
    setUserInput('');
    setFeedback(null);
    setShowSample(false);
  }, [activeTopic.id]);

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

  const handleSubmitReply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentTurn || !userInput.trim()) return;

    const lowerInput = userInput.trim().toLowerCase();
    const acceptable = (currentTurn.acceptableReplies || []).map((r) => r.toLowerCase());
    const required = (currentTurn.requiredKeywords || []).map((k) => k.toLowerCase());

    let isCorrect = acceptable.some((acc) => lowerInput.includes(acc) || acc.includes(lowerInput));
    if (!isCorrect && required.length > 0) {
      isCorrect = required.every((kw) => lowerInput.includes(kw));
    }

    // Save record of turn
    const turnRecord = {
      turnNumber: currentTurn.turnNumber ?? currentTurn.stepIndex,
      stepIndex: currentTurn.stepIndex,
      userReply: userInput.trim(),
      isCorrect,
      timestamp: Date.now(),
    };

    const nextHistory = [...session.history, turnRecord];
    const nextIndex = session.currentTurnIndex + 1;
    const isCompletedNow = nextIndex >= activeTopic.turns.length;

    const nextSession: DailyConversationSessionState = {
      ...session,
      currentTurnIndex: nextIndex,
      completedTurns: session.completedTurns + 1,
      isCompleted: isCompletedNow,
      history: nextHistory,
      updatedAt: Date.now(),
    };

    // Update global user progress
    let updatedState = recordLearningAttempt(userProgress, {
      isCorrect,
      skill: 'speaking',
      source: 'daily_conversations',
      prompt: currentTurn.promptEn,
      userAnswer: userInput.trim(),
      correctAnswer: currentTurn.sampleReplyEn,
      explanationAm: currentTurn.grammarTipAm,
      activityTitleAm: `Զրույց՝ ${activeTopic.titleAm}`,
      minutesAdded: isCompletedNow ? 4 : 1,
    });

    const nextConversationsMap = {
      ...(userProgress.dailyConversationsMap || {}),
      [activeTopic.id]: nextSession,
    };

    updatedState = {
      ...updatedState,
      dailyConversationsMap: nextConversationsMap,
    };

    setSession(nextSession);
    onSaveProgress(updatedState);

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        textAm: `Գերազանց է։ Ճիշտ պատասխան․ «${currentTurn.sampleReplyEn}»։`,
      });
      handlePlayAudio(userInput.trim());
    } else {
      setFeedback({
        isCorrect: false,
        textAm: `Առաջարկվող պատասխան․ «${currentTurn.sampleReplyEn}»։ ${currentTurn.grammarTipAm}`,
      });
    }

    setUserInput('');
    setShowSample(false);
  };

  const handleRestartTopic = () => {
    const fresh: DailyConversationSessionState = {
      id: `conv-${activeTopic.id}`,
      userId: userProgress.profile?.id || 'user-main',
      topicId: activeTopic.id,
      currentTurnIndex: 0,
      isCompleted: false,
      completedTurns: 0,
      history: [],
      updatedAt: Date.now(),
    };
    setSession(fresh);
    setFeedback(null);
    setUserInput('');
    setShowSample(false);

    const nextConversationsMap = {
      ...(userProgress.dailyConversationsMap || {}),
      [activeTopic.id]: fresh,
    };
    onSaveProgress({
      ...userProgress,
      dailyConversationsMap: nextConversationsMap,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Իրական խոսակցություններ</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Առօրյա զրույցներ
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          12 կենդանի թեմաներ՝ յուրաքանչյուրը 8 հերթափոխ երկխոսությամբ։
        </p>
      </div>

      {/* 12 Topics Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {DAILY_CONVERSATION_TOPICS.map((topic) => {
          const isDone = userProgress.dailyConversationsMap?.[topic.id]?.isCompleted;
          const isCurrent = topic.id === activeTopic.id;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{topic.titleAm}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Dialogue Screen */}
      {isFinished ? (
        /* Finished Screen */
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-emerald-500/30 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              «{activeTopic.titleAm}» երկխոսությունն ավարտված է։
            </h2>
            <p className="text-sm text-emerald-300 mt-1">
              Դուք հաջողությամբ անցաք բոլոր 8 խոսակցական քայլերը։
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartTopic}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              Կրկնել այս թեման
            </button>
            <button
              onClick={() => onNavigateTab('books')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
            >
              Անցնել «Գրադարանին»
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Dialogue Turn */
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>
              Քայլ {session.currentTurnIndex + 1} / {activeTopic.turns.length}
            </span>
            <span>{activeTopic.titleEn}</span>
          </div>

          {/* Conversation history / current turn bubbles */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
            {/* Speaker A (Prompt) Bubble */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="space-y-1.5 max-w-xl">
                <div className="p-4 rounded-2xl rounded-tl-sm bg-indigo-950/40 border border-indigo-800/40 text-white space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-bold">{currentTurn?.promptEn}</span>
                    <button
                      onClick={() => handlePlayAudio(currentTurn?.promptEn || '')}
                      className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 transition"
                      title="Լսել"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-indigo-300">
                    [{currentTurn?.promptPronunciation}]
                  </p>
                  <p className="text-xs text-slate-300 pt-1 border-t border-indigo-800/40">
                    {currentTurn?.promptAm}
                  </p>
                </div>
              </div>
            </div>

            {/* Speaker B (User Reply Area) */}
            <div className="flex items-start gap-3 justify-end">
              <div className="space-y-2 max-w-xl w-full">
                <form onSubmit={handleSubmitReply} className="space-y-3">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Գրիր քո պատասխանը անգլերեն..."
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
                      title={isRecording ? 'Դադարեցնել' : 'Խոսել միկրոֆոնով'}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSample(!showSample)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold transition"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showSample ? 'Թաքցնել օրինակը' : 'Ինչպե՞ս պատասխանել'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={!userInput.trim()}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition shadow-md"
                    >
                      <span>Ուղարկել</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* Sample Reply Help Card */}
                {showSample && currentTurn && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/60 text-xs text-indigo-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Օրինակելի պատասխան․</span>
                      <button
                        onClick={() => handlePlayAudio(currentTurn.sampleReplyEn)}
                        className="p-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-medium text-emerald-300">{currentTurn.sampleReplyEn}</p>
                    <p className="text-slate-400">{currentTurn.sampleReplyAm}</p>
                  </div>
                )}

                {/* Feedback message */}
                {feedback && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-medium ${
                      feedback.isCorrect
                        ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-200'
                        : 'bg-amber-950/20 border border-amber-500/30 text-amber-200'
                    }`}
                  >
                    {feedback.textAm}
                  </div>
                )}

                {/* Grammar Tip */}
                {currentTurn?.grammarTipAm && (
                  <p className="text-[11px] text-slate-500 italic px-1">
                    💡 Քերականական խորհուրդ․ {currentTurn.grammarTipAm}
                  </p>
                )}
              </div>

              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

