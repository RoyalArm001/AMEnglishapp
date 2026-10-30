'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  Languages,
  Check,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import {
  UserProgressData,
  AccentVariant,
  PronunciationModule,
  PronunciationPracticeItem,
  PronunciationProgressRecord,
} from '@/lib/types';
import { PRONUNCIATION_MODULES_DATA } from '@/data/accent-academy';
import {
  speakEnglishText,
  startSpeechRecognition,
  compareSpeechTranscript,
  getAvailableEnglishVoices,
} from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { recordLearningAttempt } from '@/lib/storage';

interface AccentAcademyViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialModuleId?: string;
  initialStep?: number;
}

export default function AccentAcademyView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialModuleId,
  initialStep,
}: AccentAcademyViewProps) {
  // Current accent preference (US or UK)
  const [accent, setAccent] = useState<AccentVariant>(() => {
    return userProgress.accentPreference?.accent || 'us';
  });

  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(() => {
    if (initialModuleId && PRONUNCIATION_MODULES_DATA.some((m) => m.id === initialModuleId)) {
      return initialModuleId;
    }
    return null;
  });

  const activeModule: PronunciationModule | null = selectedModuleId
    ? PRONUNCIATION_MODULES_DATA.find((m) => m.id === selectedModuleId) || null
    : null;

  const [currentItemIndex, setCurrentItemIndex] = useState<number>(() => {
    if (typeof initialStep === 'number' && initialStep >= 0 && initialStep < 6) {
      return initialStep;
    }
    return 0;
  });

  const [isRecording, setIsRecording] = useState(false);
  const [stopRecordingFn, setStopRecordingFn] = useState<(() => void) | null>(null);
  const [comparisonResult, setComparisonResult] = useState<{
    spokenText: string;
    matchedWords: string[];
    missingWords: string[];
    matchRatio: number;
    isPass: boolean;
  } | null>(null);

  // Available voices check
  const [voiceNoticeAm, setVoiceNoticeAm] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const voices = getAvailableEnglishVoices();
      const hasUS = voices.some((v) => v.lang.toLowerCase().startsWith('en-us'));
      const hasGB = voices.some((v) => v.lang.toLowerCase().startsWith('en-gb'));

      if (!hasGB && accent === 'uk') {
        setVoiceNoticeAm('Ձեր բրաուզերում բրիտանական մաքուր ձայնը կարող է հնչել ամերիկյան ստանդարտով։');
      } else {
        setVoiceNoticeAm('');
      }
    }
  }, [accent]);

  // Sync page memory with URL query
  useEffect(() => {
    if (activeModule) {
      setPageMemory({
        tab: 'accent',
        subId: activeModule.id,
        step: currentItemIndex,
      });
    } else {
      setPageMemory({
        tab: 'accent',
      });
    }
  }, [activeModule?.id, currentItemIndex]);

  const currentItem: PronunciationPracticeItem | undefined =
    activeModule?.items[currentItemIndex];

  const handleSwitchAccent = (newAccent: AccentVariant) => {
    setAccent(newAccent);
    onSaveProgress({
      ...userProgress,
      accentPreference: {
        userId: userProgress.profile?.id || 'user-main',
        accent: newAccent,
        updatedAt: Date.now(),
      },
    });
  };

  const handlePlayAudio = (text: string) => {
    // Choose appropriate voice for US or UK if available
    const voices = getAvailableEnglishVoices();
    const targetLang = accent === 'uk' ? 'en-gb' : 'en-us';
    const foundVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLang));

    speakEnglishText(text, 'normal', undefined, {
      customRateNumeric: userProgress.settings?.voiceSpeedNumeric,
      selectedVoiceURI: foundVoice?.voiceURI || userProgress.settings?.selectedVoiceURI,
    });
  };

  const handleToggleMic = () => {
    if (isRecording && stopRecordingFn) {
      stopRecordingFn();
      setIsRecording(false);
      setStopRecordingFn(null);
      return;
    }

    if (!currentItem) return;

    const cancel = startSpeechRecognition({
      onResult: (spokenText) => {
        setIsRecording(false);
        setStopRecordingFn(null);

        // Compare spoken words honestly
        const comp = compareSpeechTranscript(currentItem.targetEn, spokenText);
        const isPass = comp.matchRatio >= 0.6;

        setComparisonResult({
          spokenText,
          matchedWords: comp.matchedWords,
          missingWords: comp.missingWords,
          matchRatio: comp.matchRatio,
          isPass,
        });

        // Record attempt and progress
        const key = `${activeModule?.id}_${currentItem.id}`;
        const record: PronunciationProgressRecord = {
          id: `pr-${key}`,
          userId: userProgress.profile?.id || 'user-main',
          moduleId: activeModule?.id || '',
          itemId: currentItem.id,
          accent,
          recognizedText: spokenText,
          matchedWords: comp.matchedWords,
          missingWords: comp.missingWords,
          matchRatio: comp.matchRatio,
          isCompleted: isPass,
          timestamp: Date.now(),
          updatedAt: Date.now(),
        };

        let updated = recordLearningAttempt(userProgress, {
          isCorrect: isPass,
          skill: 'speaking',
          source: 'pronunciation',
          prompt: currentItem.targetEn,
          userAnswer: spokenText,
          correctAnswer: currentItem.targetEn,
          explanationAm: currentItem.tipAm,
          activityTitleAm: `Արտասանություն՝ ${activeModule?.titleAm}`,
          minutesAdded: isPass ? 1 : 0,
        });

        updated = {
          ...updated,
          pronunciationProgressMap: {
            ...(updated.pronunciationProgressMap || {}),
            [key]: record,
          },
        };

        onSaveProgress(updated);
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

  const handleNextItem = () => {
    if (!activeModule) return;
    setComparisonResult(null);
    if (currentItemIndex + 1 < activeModule.items.length) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5" />
            <span>Արտասանության Ակադեմիա</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Արտասանություն և ակցենտ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            10 հիմնարար մոդուլներ, ամերիկյան և բրիտանական տարբերակում, խոսքի ճանաչում։
          </p>
        </div>

        {/* Accent Selector (US vs UK) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
          <button
            onClick={() => handleSwitchAccent('us')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              accent === 'us'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇺🇸 Ամերիկյան (US)</span>
          </button>
          <button
            onClick={() => handleSwitchAccent('uk')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              accent === 'uk'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇬🇧 Բրիտանական (UK)</span>
          </button>
        </div>
      </div>

      {voiceNoticeAm && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
          {voiceNoticeAm}
        </div>
      )}

      {/* ACTIVE MODULE VIEW: Lesson & Practice Items */}
      {activeModule ? (
        <div className="space-y-6">
          <button
            onClick={() => {
              setSelectedModuleId(null);
              setComparisonResult(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Վերադառնալ բոլոր մոդուլներին</span>
          </button>

          {/* Module Header & US vs UK differences */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                Մոդուլ {activeModule.order} / 10 • {activeModule.level}
              </span>
              <span className="text-xs text-indigo-400 font-bold">
                Ակցենտ՝ {accent === 'us' ? '🇺🇸 American' : '🇬🇧 British'}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white">
              {activeModule.titleAm}
            </h2>
            <p className="text-sm font-semibold text-indigo-300">
              {activeModule.titleEn}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {activeModule.descriptionAm}
            </p>

            {/* US vs GB Diff in Armenian */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-900/60 text-xs space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                🇺🇸 Ամերիկյան vs 🇬🇧 Բրիտանական գլխավոր տարբերությունը․
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeModule.usVsGbDiffAm}
              </p>
            </div>
          </div>

          {/* Practice Item Card */}
          {currentItem && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Stepper */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Վարժություն {currentItemIndex + 1} / {activeModule.items.length}
                </span>

                <div className="flex items-center gap-1">
                  {activeModule.items.map((it, idx) => {
                    const key = `${activeModule.id}_${it.id}`;
                    const done = userProgress.pronunciationProgressMap?.[key]?.isCompleted;
                    return (
                      <button
                        key={it.id}
                        onClick={() => {
                          setCurrentItemIndex(idx);
                          setComparisonResult(null);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                          idx === currentItemIndex
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                            : done
                            ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Prompt in English */}
              <div className="text-center py-6 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {currentItem.targetEn}
                </div>

                {currentItem.stressPattern && (
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-indigo-300 font-mono">
                    Շեշտադրություն՝ {currentItem.stressPattern}
                  </div>
                )}

                <div className="space-y-1 pt-2 border-t border-slate-800/80 max-w-md mx-auto">
                  <div className="text-xs text-slate-300 font-medium">
                    🇺🇸 ԱՄՆ․{' '}
                    <span className="text-indigo-300 font-semibold">{currentItem.pronunciationUS}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    🇬🇧 Բրիտ․{' '}
                    <span className="text-indigo-300 font-semibold">{currentItem.pronunciationGB}</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold pt-1">
                    Թարգմանություն՝ {currentItem.armenian}
                  </p>
                </div>
              </div>

              {/* Tips & Audio Button */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400 italic max-w-md">
                  💡 {currentItem.tipAm}
                </p>

                <button
                  type="button"
                  onClick={() => handlePlayAudio(currentItem.targetEn)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Լսել ({accent.toUpperCase()})</span>
                </button>
              </div>

              {/* Speech Recognition Practice Area */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isRecording ? 'Կանգնեցնել ձայնագրությունը' : 'Արտասանիր միկրոֆոնով'}</span>
                  </button>
                </div>

                {/* Honest Speech Breakdown Result */}
                {comparisonResult && (
                  <div
                    className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                      comparisonResult.isPass
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span className="flex items-center gap-1.5">
                        {comparisonResult.isPass ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        )}
                        {comparisonResult.isPass ? 'Հիանալի արտասանություն' : 'Շարունակիր պարապել'}
                      </span>
                      <span className="font-mono">
                        Ճանաչման համընկնում՝ {Math.round(comparisonResult.matchRatio * 100)}%
                      </span>
                    </div>

                    <div className="text-slate-300">
                      Քո ասածը․ <span className="font-semibold text-white">«{comparisonResult.spokenText || '—'}»</span>
                    </div>

                    {/* Word breakdown */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {comparisonResult.matchedWords.map((w, idx) => (
                        <span
                          key={`m-${idx}`}
                          className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                        >
                          ✓ {w}
                        </span>
                      ))}
                      {comparisonResult.missingWords.map((w, idx) => (
                        <span
                          key={`ms-${idx}`}
                          className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300"
                        >
                          ✗ {w}
                        </span>
                      ))}
                    </div>

                    {comparisonResult.isPass && currentItemIndex + 1 < activeModule.items.length && (
                      <button
                        onClick={handleNextItem}
                        className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>Հաջորդ բառը</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ALL 10 ACCENT MODULES GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRONUNCIATION_MODULES_DATA.map((module) => {
            return (
              <div
                key={module.id}
                onClick={() => setSelectedModuleId(module.id)}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 space-y-3 cursor-pointer transition shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      Մոդուլ {module.order} • {module.level}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{module.items.length} առաջադրանք</span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {module.titleAm}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">
                    {module.titleEn}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {module.descriptionAm}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">US vs UK</span>
                  <span className="text-indigo-400 flex items-center gap-1">
                    Մարզվել <ChevronRight className="w-4 h-4" />
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

