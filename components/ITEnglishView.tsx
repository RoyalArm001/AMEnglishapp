'use client';
import { useStudyActivity } from '../lib/study-activity';

import React, { useEffect, useState } from 'react';
import ProfessionalPracticeView from './ProfessionalPracticeView';
import {
  CheckCircle2,
  HelpCircle,
  Mic,
  MicOff,
  Play,
  Send,
  Terminal,
  User,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IT_DIALOGUES, IT_TOPICS } from '../data/it-english';
import { ITTopicId, UserProgressData, SkillType } from '../lib/types';
import { normalizeEnglishText, startSpeechRecognition } from '../lib/speech';

interface ITEnglishViewProps {
  progress: UserProgressData;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onCompleteRoleplay: (
    scenarioId: string,
    isCorrect: boolean,
    prompt: string,
    userReply: string,
    expectedReply: string,
    skill?: SkillType
  ) => void;
}

export default function ITEnglishView({
  progress,
  onSpeak: speakAudio,
  onCompleteRoleplay,
}: ITEnglishViewProps) {
  const studyActivity = useStudyActivity();
  const onSpeak = (text: string, rate?: 'slow' | 'normal') => { studyActivity.start(); speakAudio(text, rate); };
  const [selectedTopicId, setSelectedTopicId] = useState<ITTopicId>(IT_DIALOGUES[0].topicId);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(IT_DIALOGUES[0].id);
  const [roleplayMode, setRoleplayMode] = useState<'study' | 'interactive'>('interactive');
  const [currentTurnIdx, setCurrentTurnIdx] = useState<number>(1); // Turn 0 is Employee, Turn 1 is IT Specialist
  const [userReply, setUserReply] = useState<string>('');
  const [turnFeedback, setTurnFeedback] = useState<{
    isGood: boolean;
    messageAm: string;
    expectedEn: string;
  } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopRecFn, setStopRecFn] = useState<(() => void) | null>(null);
  useEffect(() => () => { stopRecFn?.(); }, [stopRecFn]);

  const selectedTopic =
    IT_TOPICS.find((t) => t.id === selectedTopicId) || IT_TOPICS[0];

  const topicScenarios = IT_DIALOGUES.filter((d) => d.topicId === selectedTopicId);
  const activeScenario =
    IT_DIALOGUES.find((d) => d.id === activeScenarioId) ||
    topicScenarios[0] ||
    IT_DIALOGUES[0];

  const handleSelectTopic = (topicId: ITTopicId) => {
    setSelectedTopicId(topicId);
    const first = IT_DIALOGUES.find((d) => d.topicId === topicId);
    if (first) {
      setActiveScenarioId(first.id);
      setCurrentTurnIdx(1);
      setUserReply('');
      setTurnFeedback(null);
      setShowHint(false);
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCurrentTurnIdx(1);
    setUserReply('');
    setTurnFeedback(null);
    setShowHint(false);
  };

  const currentSpecialistTurn = activeScenario.turns[currentTurnIdx];
  const previousEmployeeTurn = activeScenario.turns[currentTurnIdx - 1];

  const handleCheckSpecialistTurn = () => {
    studyActivity.start();
    if (!currentSpecialistTurn || !userReply.trim()) return;

    const normUser = normalizeEnglishText(userReply);
    const normExpected = normalizeEnglishText(currentSpecialistTurn.english);
    const alternatives = (currentSpecialistTurn.sampleAlternatives || []).map(
      normalizeEnglishText
    );

    const exactMatch =
      normUser === normExpected || alternatives.includes(normUser);

    const keywords = currentSpecialistTurn.expectedKeywords || [];
    const matchedKeywords = keywords.filter((kw) =>
      normUser.includes(normalizeEnglishText(kw))
    );

    const isGood = exactMatch;

    setTurnFeedback({
      isGood,
      messageAm: isGood
        ? 'Հիանալի պատասխան որպես IT Specialist։ Համեմատեք նաև օրինակելի տարբերակի հետ։'
        : 'Լավ փորձ է։ Ուշադրություն դարձրեք տեխնիկական ձևակերպմանը և կիրառեք օրինակելի պատասխանը։',
      expectedEn: currentSpecialistTurn.english,
    });

    onCompleteRoleplay(
      activeScenario.id,
      isGood,
      previousEmployeeTurn?.english || activeScenario.titleEn,
      userReply,
      currentSpecialistTurn.english
    );
  };

  const handleNextRoleplayStep = () => {
    setUserReply('');
    setTurnFeedback(null);
    setShowHint(false);
    // Find next IT Specialist turn
    let nextIdx = currentTurnIdx + 1;
    while (
      nextIdx < activeScenario.turns.length &&
      activeScenario.turns[nextIdx].speaker !== 'IT Specialist'
    ) {
      nextIdx++;
    }
    if (nextIdx < activeScenario.turns.length) {
      setCurrentTurnIdx(nextIdx);
    } else {
      studyActivity.finish();
      setCurrentTurnIdx(1);
    }
  };

  const handleVoiceReply = () => {
    studyActivity.start();
    if (isListening && stopRecFn) {
      stopRecFn();
      setIsListening(false);
      return;
    }
    const stop = startSpeechRecognition({
      onStart: () => setIsListening(true),
      onResult: (transcript) => setUserReply(transcript),
      onError: () => setIsListening(false),
      onEnd: () => setIsListening(false),
    });
    if (stop) setStopRecFn(() => stop);
  };

  return (
    <div className="space-y-8">
      <ProfessionalPracticeView profession={progress.profile.profession} onSpeak={onSpeak} onComplete={onCompleteRoleplay} />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            ՄԱՍՆԱԳԻՏԱԿԱՆ ԵՎ ՏՏ ԱՆԳԼԵՐԵՆ · ԱՇԽԱՏԱՆՔԱՅԻՆ ԻՐԱՎԻՃԱԿՆԵՐ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            ՏՏ Անգլերեն՝ 13 Թեմաներ և {IT_DIALOGUES.length} Աշխատանքային Երկխոսություններ
          </h1>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold">
          Ավարտած երկխոսություն՝ {progress.completedRoleplayIds.length} / {IT_DIALOGUES.length}
        </span>
      </div>

      {/* 13 IT Topics Selector */}
      <div className="space-y-3">
        <h2 className="text-base font-bold">Ընտրեք ՏՏ մասնագիտական թեման (13 բաժին)․</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {IT_TOPICS.map((topic) => {
            const active = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className={`p-3.5 rounded-2xl text-left border transition flex items-start gap-3 ${
                  active
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-500/50'
                }`}
              >
                <span className="text-xl shrink-0">{topic.icon}</span>
                <div className="min-w-0">
                  <div className="font-bold text-xs md:text-sm truncate">{topic.titleEn}</div>
                  <div
                    className={`text-xs truncate mt-0.5 ${
                      active ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {topic.titleAm}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Topic Key Phrases Card */}
      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>{selectedTopic.icon}</span>
              <span>{selectedTopic.titleEn}</span>
              <span className="text-slate-400">·</span>
              <span className="text-sky-600 dark:text-sky-400">{selectedTopic.titleAm}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {selectedTopic.descriptionAm}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {selectedTopic.keyPhrases.map((phrase, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <p className="font-bold text-base text-slate-900 dark:text-white">
                  <span className="text-xs uppercase text-slate-400 block">English:</span>
                  <span data-learning-text="english">{phrase.english}</span>
                </p>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="text-xs uppercase text-slate-400 block">Կարդացվում է:</span>
                  <span data-learning-text="pronunciation">{phrase.pronunciation}</span>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-xs uppercase text-slate-400 block">Հայերեն:</span>
                  <span data-learning-text="armenian">{phrase.armenian}</span>
                </p>
              </div>
              <button
                onClick={() => onSpeak(phrase.english, 'normal')}
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shrink-0 transition"
                title="Լսել արտասանությունը"
              >
                <Volume2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Workplace Roleplay Section */}
      <div className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-sky-500/30 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              ԱՇԽԱՏԱՆՔԱՅԻՆ ԻՐԱՎԻՃԱԿԻ ԴԵՐԱՅԻՆ ԽԱՂ (WORKPLACE ROLEPLAY)
            </span>
            <h3 className="text-xl md:text-2xl font-bold mt-1">
              Պատրաստի երկխոսության զրուցակիցը՝ աշխատակից (Employee), Դուք՝ ՏՏ Մասնագետ (IT Specialist)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRoleplayMode('interactive')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                roleplayMode === 'interactive'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              🎮 Ինտերակտիվ Roleplay
            </button>
            <button
              onClick={() => setRoleplayMode('study')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                roleplayMode === 'study'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              📖 Ամբողջ երկխոսությունը
            </button>
          </div>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {IT_DIALOGUES.map((dlg, idx) => {
            const active = dlg.id === activeScenario.id;
            const done = progress.completedRoleplayIds.includes(dlg.id);
            return (
              <button
                key={dlg.id}
                onClick={() => handleSelectScenario(dlg.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                  active
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>#{idx + 1}</span>
                <span>{dlg.titleAm}</span>
                {done && <CheckCircle2 size={13} className="text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Scenario Context Header */}
        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300">
              Սցենար · Մակարդակ {activeScenario.level}
            </span>
            <span className="text-xs font-semibold text-slate-500">{activeScenario.titleEn}</span>
          </div>
          <p className="text-sm font-medium mt-1">📋 {activeScenario.contextAm}</p>
        </div>

        {roleplayMode === 'study' ? (
          /* Full Dialogue View */
          <div className="space-y-3">
            {activeScenario.turns.map((turn, idx) => {
              const isSpecialist = turn.speaker === 'IT Specialist';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isSpecialist
                      ? 'bg-emerald-500/10 border-emerald-500/25 ml-0 md:ml-8'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 mr-0 md:mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {isSpecialist ? (
                        <Terminal size={14} className="text-emerald-600" />
                      ) : (
                        <User size={14} className="text-sky-600" />
                      )}
                      {turn.speaker} ({turn.speakerAm})
                    </span>
                    <button
                      onClick={() => onSpeak(turn.english, 'normal')}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                    >
                      <Volume2 size={15} />
                    </button>
                  </div>
                  <p className="font-bold text-base"><span data-learning-text="english">{turn.english}</span></p>
                  <p className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    🔊 <span data-learning-text="pronunciation">{turn.pronunciation}</span>
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                    🇦🇲 <span data-learning-text="armenian">{turn.armenian}</span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Interactive Roleplay Mode */
          <div className="space-y-5">
            {previousEmployeeTurn && (
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400">
                    👤 Աշխատակիցը (Employee) ասում է․
                  </span>
                  <button
                    onClick={() => onSpeak(previousEmployeeTurn.english, 'normal')}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Volume2 size={14} /> Լսել աշխատակցին
                  </button>
                </div>
                <p className="text-lg md:text-xl font-bold"><span data-learning-text="english">{previousEmployeeTurn.english}</span></p>
                <p className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300">
                  🔊 <span data-learning-text="pronunciation">{previousEmployeeTurn.pronunciation}</span>
                </p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  🇦🇲 <span data-learning-text="armenian">{previousEmployeeTurn.armenian}</span>
                </p>
              </div>
            )}

            {currentSpecialistTurn && (
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    💻 Ձեր հերթն է որպես IT Specialist․
                  </span>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-semibold flex items-center gap-1 text-amber-600 dark:text-amber-400"
                  >
                    <HelpCircle size={14} /> {showHint ? 'Թաքցնել հուշումը' : 'Հուշում (Hint)'}
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Պատասխանեք անգլերեն՝ արտահայտելով հետևյալ միտքը․{' '}
                  <strong>«<span data-learning-text="armenian">{currentSpecialistTurn.armenian}</span>»</strong>
                </p>

                {showHint && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                    💡 {currentSpecialistTurn.hintAm || `Օգտագործեք՝ ${(currentSpecialistTurn.expectedKeywords || []).join(', ')}`}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <input data-learning-text="english"
                    type="text"
                    value={userReply}
                    onChange={(e) => setUserReply(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckSpecialistTurn()}
                    placeholder="Գրեք կամ թելադրեք Ձեր պատասխանը որպես IT Specialist..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceReply}
                    className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 ${
                      isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    {isListening ? 'Լսում եմ...' : 'Խոսել'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckSpecialistTurn}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Send size={15} /> Ուղարկել
                  </button>
                </div>

                {turnFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/40 space-y-2"
                  >
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {turnFeedback.messageAm}
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold">Օրինակելի պատասխան (English)․ </span>
                      <strong><span data-learning-text="english">{currentSpecialistTurn.english}</span></strong>
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300">
                      🔊 <strong>Pronunciation:</strong> <span data-learning-text="pronunciation">{currentSpecialistTurn.pronunciation}</span>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => onSpeak(currentSpecialistTurn.english, 'normal')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1"
                      >
                        <Volume2 size={14} /> Լսել արտասանությունը
                      </button>
                      <button
                        onClick={handleNextRoleplayStep}
                        className="px-4 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Play size={13} /> Հաջորդ քայլը
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

