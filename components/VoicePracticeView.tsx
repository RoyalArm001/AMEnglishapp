'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Clock,
  Info,
  Mic,
  MicOff,
  RotateCcw,
  Sun,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { VOICE_PRACTICE_ITEMS } from '../data/placement-and-teacher';
import { UserProgressData } from '../lib/types';
import {
  checkSpeechSupport,
  compareSpokenToTarget,
  speakEnglish,
  SpeechComparisonResult,
  startSpeechRecognition,
} from '../lib/speech';

interface VoicePracticeViewProps {
  progress: UserProgressData;
  onUpdateMorningTime: (time: string) => void;
  onUpdateSpeechRate: (rate: 'slow' | 'normal') => void;
  onRecordVoiceSession: (
    isCorrect: boolean,
    prompt: string,
    spokenText: string,
    targetText: string
  ) => void;
}

export default function VoicePracticeView({
  progress,
  onUpdateMorningTime,
  onUpdateSpeechRate,
  onRecordVoiceSession,
}: VoicePracticeViewProps) {
  const [practiceMode, setPracticeMode] = useState<'conversation' | 'morning'>('morning');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [stopRecFn, setStopRecFn] = useState<(() => void) | null>(null);
  useEffect(() => () => { stopRecFn?.(); }, [stopRecFn]);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [manualText, setManualText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [comparison, setComparison] = useState<SpeechComparisonResult | null>(null);
  const [support, setSupport] = useState({ ttsSupported: true, sttSupported: true });

  useEffect(() => {
    setSupport(checkSpeechSupport());
  }, []);

  const filteredItems = VOICE_PRACTICE_ITEMS.filter((item) => item.mode === practiceMode);
  const currentItem =
    filteredItems[currentIdx % Math.max(1, filteredItems.length)] || VOICE_PRACTICE_ITEMS[0];

  const resetCurrentAttempt = () => {
    if (stopRecFn) {
      stopRecFn();
      setStopRecFn(null);
    }
    setIsListening(false);
    setRecognizedText('');
    setManualText('');
    setErrorMsg('');
    setComparison(null);
  };

  const handlePlayAudio = (text: string, customRate?: 'slow' | 'normal') => {
    speakEnglish(text, customRate || progress.speechRate, undefined, {customRateNumeric:progress.settings.voiceSpeedNumeric,selectedVoiceURI:progress.settings.selectedVoiceURI});
  };

  const handleToggleMicrophone = () => {
    if (isListening && stopRecFn) {
      stopRecFn();
      setIsListening(false);
      return;
    }

    setErrorMsg('');
    setRecognizedText('');
    setComparison(null);

    const stop = startSpeechRecognition({
      onStart: () => setIsListening(true),
      onResult: (transcript, isFinal) => {
        setRecognizedText(transcript);
        if (isFinal || transcript.length > 2) {
          const comp = compareSpokenToTarget(
            transcript,
            currentItem.targetAnswerEn,
            currentItem.alternativesEn
          );
          setComparison(comp);
          if (isFinal) {
            onRecordVoiceSession(
              comp.isAcceptable,
              currentItem.questionEn,
              transcript,
              currentItem.targetAnswerEn
            );
          }
        }
      },
      onError: (msg) => {
        setIsListening(false);
        setErrorMsg(msg);
      },
      onEnd: () => setIsListening(false),
    });

    if (stop) {
      setStopRecFn(() => stop);
    }
  };

  const handleManualCompare = () => {
    if (!manualText.trim()) return;
    const comp = compareSpokenToTarget(
      manualText,
      currentItem.targetAnswerEn,
      currentItem.alternativesEn
    );
    setRecognizedText(manualText.trim());
    setComparison(comp);
    onRecordVoiceSession(
      comp.isAcceptable,
      currentItem.questionEn,
      manualText.trim(),
      currentItem.targetAnswerEn
    );
  };

  const handleNextPrompt = () => {
    resetCurrentAttempt();
    setCurrentIdx((prev) => (prev + 1) % Math.max(1, filteredItems.length));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            VOICE CONVERSATION · ՁԱՅՆԱՅԻՆ ՊԱՐԱՊՄՈՒՆՔ ԵՎ ԱՌԱՎՈՏՅԱՆ ՄԱՐԶՈՒՄ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Խոսակցական ուսուցում միկրոֆոնով (STT & TTS)
          </h1>
        </div>

        {/* Speed Selector Slow / Normal */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => onUpdateSpeechRate('normal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              progress.speechRate === 'normal'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            🔊 Normal (1.0x)
          </button>
          <button
            onClick={() => onUpdateSpeechRate('slow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              progress.speechRate === 'slow'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            🐢 Slow (0.72x)
          </button>
        </div>
      </div>

      {/* Mode Switcher + Morning Practice Preferred Time */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7 flex gap-2">
          <button
            onClick={() => {
              resetCurrentAttempt();
              setPracticeMode('morning');
              setCurrentIdx(0);
            }}
            className={`flex-1 p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              practiceMode === 'morning'
                ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-100'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sun className="text-amber-500 shrink-0" size={24} />
            <div>
              <div className="font-bold text-sm">Morning Practice (Առավոտյան ռեժիմ)</div>
              <div className="text-xs opacity-75">Առավոտյան խոսակցական նախավարժանք</div>
            </div>
          </button>

          <button
            onClick={() => {
              resetCurrentAttempt();
              setPracticeMode('conversation');
              setCurrentIdx(0);
            }}
            className={`flex-1 p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              practiceMode === 'conversation'
                ? 'bg-indigo-500/15 border-indigo-500 text-indigo-950 dark:text-indigo-100'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Mic className="text-indigo-500 shrink-0" size={24} />
            <div>
              <div className="font-bold text-sm">Հարց ու պատասխան (Voice Q&A)</div>
              <div className="text-xs opacity-75">Իրական երկխոսություններ և IT իրավիճակներ</div>
            </div>
          </button>
        </div>

        {/* Preferred Morning Practice Time Picker */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Clock className="text-emerald-600 shrink-0" size={20} />
            <div>
              <div className="text-xs font-bold">Պարապմունքի նախընտրելի ժամ</div>
              <div className="text-xs text-slate-500">Ամենօրյա Morning Practice</div>
            </div>
          </div>
          <input
            type="time"
            value={progress.preferredMorningTime}
            onChange={(e) => onUpdateMorningTime(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-bold"
          />
        </div>
      </div>

      {/* Main Voice Practice Card */}
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-indigo-500/30 shadow-md space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
            {currentItem.categoryAm} · Մակարդակ {currentItem.level}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Վարժություն {(currentIdx % filteredItems.length) + 1} / {filteredItems.length}
          </span>
        </div>

        {/* Step 1: Question from System */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
              1. Լսեք հարցը անգլերեն․
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayAudio(currentItem.questionEn, 'normal')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 size={14} /> Լսել հարցը
              </button>
              <button
                onClick={() => handlePlayAudio(currentItem.questionEn, 'slow')}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold"
              >
                🐢 Slow
              </button>
            </div>
          </div>
          <p className="text-lg md:text-xl font-bold">{currentItem.questionEn}</p>
          <p className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300">
            🔊 {currentItem.questionPronunciation}
          </p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            🇦🇲 {currentItem.questionAm}
          </p>
        </div>

        {/* Step 2: Target Answer to Speak */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300">
              2. Պատասխանեք բարձրաձայն միկրոֆոնով․
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayAudio(currentItem.targetAnswerEn, 'normal')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 size={14} /> Լսել պատասխանը (Normal)
              </button>
              <button
                onClick={() => handlePlayAudio(currentItem.targetAnswerEn, 'slow')}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-500/30 text-xs font-bold"
              >
                🐢 Դանդաղ (Slow)
              </button>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
            “{currentItem.targetAnswerEn}”
          </p>
          <p className="text-sm md:text-base font-semibold text-emerald-800 dark:text-emerald-300">
            🔊 {currentItem.targetPronunciation}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            🇦🇲 {currentItem.targetAnswerAm}
          </p>
        </div>

        {/* Animated Microphone Interface */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleMicrophone}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 font-bold text-xs shadow-lg transition ${
              isListening
                ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white ring-8 ring-indigo-500/15'
            }`}
          >
            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            <span>{isListening ? 'Կանգնեցնել' : '🎙️ Խոսել'}</span>
          </motion.button>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {isListening
              ? 'Միկրոֆոնը միացված է․ կարդացեք կամ ասեք պատասխանը անգլերեն...'
              : 'Սեղմեք միկրոֆոնի կոճակը՝ խոսքը սկսելու կամ կրկնելու համար'}
          </p>
        </div>

        {/* Recognized Speech Output & Comparison */}
        {(recognizedText || comparison || errorMsg) && (
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            {errorMsg && (
              <p className="text-xs md:text-sm text-amber-700 dark:text-amber-300 font-semibold">
                ⚠️ {errorMsg}
              </p>
            )}

            {recognizedText && (
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">
                  Ճանաչված տեքստը (Speech-to-Text)․
                </span>
                <p className="text-lg font-bold mt-0.5">“{recognizedText}”</p>
              </div>
            )}

            {comparison && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-400">
                  Համեմատում ճիշտ նախադասության հետ․
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {comparison.wordBreakdown.map((w, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-sm font-bold ${
                        w.matched
                          ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-500/20 text-rose-800 dark:text-rose-300 underline'
                      }`}
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
                <p className="text-xs md:text-sm font-semibold">
                  {comparison.feedbackAm} ({Math.round(comparison.matchRatio * 100)}% բառային համընկնում)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Text Mode Fallback (Always Accessible when mic is unavailable) */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ⌨️ Տեքստային ռեժիմ (եթե միկրոֆոնը անհասանելի է կամ ցանկանում եք մուտքագրել ձեռքով)․
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualCompare()}
              placeholder="Մուտքագրեք պատասխանը անգլերեն..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm"
            />
            <button
              onClick={handleManualCompare}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Համեմատել տեքստը
            </button>
          </div>
        </div>

        {/* Bottom Actions: Repeat & Next */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={resetCurrentAttempt}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw size={15} /> Կրկնել նորից
          </button>
          <button
            onClick={handleNextPrompt}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs md:text-sm flex items-center gap-2"
          >
            Հաջորդ ձայնային վարժությունը <ArrowRight size={16} />
          </button>
        </div>

        {/* Honest Disclaimer per Section 6 */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <Info size={16} className="shrink-0 mt-0.5 text-indigo-500" />
          <span>
            <strong>Ծանոթագրություն․</strong> Խոսքի ճանաչումն իրականացվում է բրաուզերի Web Speech API-ի միջոցով և համեմատում է ճանաչված բառերը թիրախային նախադասության հետ (այն չի հանդիսանում մասնագիտական ֆոնետիկ/ակուստիկ գնահատական)։
            {!support.sttSupported &&
              ' Ձեր ընթացիկ բրաուզերում SpeechRecognition-ը հասանելի չէ, կարող եք օգտվել վերևի տեքստային ռեժիմից։'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

