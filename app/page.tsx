'use client';

import React, { useEffect, useState } from 'react';
import {
  Award,
  BookMarked,
  BookOpen,
  Brain,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Mic,
  Moon,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  calculateNextSRS,
  DEFAULT_USER_PROGRESS,
  getTodayDateString,
  learningRepository,
  recordLearningAttempt,
} from '../lib/storage';
import { CEFRLevel, ExerciseItem, StudySessionRecord, TeacherMessage, UserProgressData } from '../lib/types';
import { speakEnglish } from '../lib/speech';
import DashboardView from '../components/DashboardView';
import LessonsView from '../components/LessonsView';
import ExercisesView from '../components/ExercisesView';
import TeacherView from '../components/TeacherView';
import VoicePracticeView from '../components/VoicePracticeView';
import ITEnglishView from '../components/ITEnglishView';
import VocabularyView from '../components/VocabularyView';
import PersonalSystemView from '../components/PersonalSystemView';

type NavTabId =
  | 'Dashboard'
  | 'Lessons'
  | 'Exercises'
  | 'My AI Teacher'
  | 'Voice Practice'
  | 'IT English'
  | 'Vocabulary'
  | 'My Progress';

const NAV_ITEMS: { id: NavTabId; labelAm: string; subAm: string; icon: any }[] = [
  { id: 'Dashboard', labelAm: 'Գլխավոր վահանակ', subAm: 'Dashboard', icon: LayoutDashboard },
  { id: 'Lessons', labelAm: 'Անգլերենի դասեր', subAm: '15 բաժին · 22 դաս', icon: BookOpen },
  { id: 'Exercises', labelAm: 'Առաջադրանքներ', subAm: 'Exercises A–F', icon: Brain },
  { id: 'My AI Teacher', labelAm: 'My AI Teacher', subAm: 'Անձնական ուսուցիչ', icon: MessageCircle },
  { id: 'Voice Practice', labelAm: 'Ձայնային պարապմունք', subAm: 'Voice & Morning', icon: Mic },
  { id: 'IT English', labelAm: 'IT English', subAm: '13 թեմա & Roleplay', icon: Terminal },
  { id: 'Vocabulary', labelAm: 'Բառապաշար', subAm: '210 բառ & SRS', icon: BookMarked },
  { id: 'My Progress', labelAm: 'Իմ Առաջընթացը', subAm: 'Մակարդակ և Սխալներ', icon: GraduationCap },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTabId>('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_USER_PROGRESS);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [startInPlacement, setStartInPlacement] = useState<boolean>(false);

  // Load persisted state from LocalStorage + IndexedDB on mount
  useEffect(() => {
    const syncData = learningRepository.loadProgressSync();
    setProgress(syncData);
    setHydrated(true);

    learningRepository.loadProgressAsync().then((asyncData) => {
      setProgress(asyncData);
    });
  }, []);

  // Sync Dark Mode class on <html>
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (progress.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [progress.darkMode]);

  const updateAndPersist = (updater: (prev: UserProgressData) => UserProgressData) => {
    setProgress((prev) => {
      const next = updater(prev);
      learningRepository.saveProgress(next);
      return next;
    });
  };

  const handleSpeak = (text: string, customRate?: 'slow' | 'normal') => {
    speakEnglish(text, customRate || progress.speechRate);
  };

  const handleToggleDarkMode = () => {
    updateAndPersist((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const handleChangeLevel = (level: CEFRLevel) => {
    updateAndPersist((prev) => ({
      ...prev,
      level,
    }));
  };

  const handleOpenLesson = (lessonId: string) => {
    updateAndPersist((prev) => ({
      ...prev,
      currentLessonId: lessonId,
    }));
    setActiveTab('Lessons');
  };

  const handleToggleSaveSentence = (sentenceId: string) => {
    updateAndPersist((prev) => {
      const exists = prev.savedSentenceIds.includes(sentenceId);
      const savedSentenceIds = exists
        ? prev.savedSentenceIds.filter((id) => id !== sentenceId)
        : [sentenceId, ...prev.savedSentenceIds];
      return { ...prev, savedSentenceIds };
    });
  };

  const handleCompleteLesson = (lessonId: string) => {
    updateAndPersist((prev): UserProgressData => {
      const completedLessonIds = Array.from(new Set([...prev.completedLessonIds, lessonId]));
      const readingBoost = Math.min(100, prev.skills.reading + 3);
      const newSession: StudySessionRecord = {
        id: `hist-${Date.now()}`,
        date: getTodayDateString(),
        timestamp: Date.now(),
        activityType: 'lesson',
        titleAm: `Ավարտված դաս՝ ${lessonId}`,
        durationMinutes: 5,
        correctDelta: 1,
        wrongDelta: 0,
      };
      return {
        ...prev,
        completedLessonIds,
        dailyStudyMinutes: prev.dailyStudyMinutes + 5,
        skills: {
          ...prev.skills,
          reading: readingBoost,
        },
        history: [newSession, ...prev.history].slice(0, 80),
      };
    });
  };

  const handleRecordExerciseResult = ({
    exercise,
    isCorrect,
    userAnswer,
  }: {
    exercise: ExerciseItem;
    isCorrect: boolean;
    userAnswer: string;
  }) => {
    updateAndPersist((prev) => {
      const next = recordLearningAttempt(prev, {
        isCorrect,
        skill: exercise.skill,
        source: 'exercise',
        prompt: exercise.promptEn,
        userAnswer,
        correctAnswer: exercise.correctAnswer,
        explanationAm: exercise.explanationAm,
        activityTitleAm: `Վարժություն (${exercise.type}) · ${exercise.category}`,
        minutesAdded: 1,
      });
      const completedExerciseIds = isCorrect
        ? Array.from(new Set([...next.completedExerciseIds, exercise.id]))
        : next.completedExerciseIds;
      return {
        ...next,
        completedExerciseIds,
      };
    });
  };

  const handleUpdateTeacherState = (params: {
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
  }) => {
    updateAndPersist((prev) => {
      const next = recordLearningAttempt(prev, {
        isCorrect: params.isCorrect,
        skill: 'writing',
        source: 'teacher',
        prompt: params.prompt,
        userAnswer: params.userAnswer,
        correctAnswer: params.correctAnswer,
        explanationAm: params.explanationAm,
        activityTitleAm: 'Պարապմունք My AI Teacher-ի հետ',
        minutesAdded: 2,
      });
      return {
        ...next,
        teacherSession: {
          currentQuestionIndex: params.nextQuestionIndex,
          difficultyScore: params.difficultyScore,
          masteredQuestionIds: params.masteredQuestionIds,
          weakTopics: params.weakTopics,
          messages: params.newMessages,
        },
      };
    });
  };

  const handleRecordVoiceSession = (
    isCorrect: boolean,
    prompt: string,
    spokenText: string,
    targetText: string
  ) => {
    updateAndPersist((prev) =>
      recordLearningAttempt(prev, {
        isCorrect,
        skill: 'speaking',
        source: 'voice',
        prompt,
        userAnswer: spokenText,
        correctAnswer: targetText,
        explanationAm: 'Խոսակցական վարժության տեքստային համեմատում։',
        activityTitleAm: 'Ձայնային պարապմունք (Voice Conversation)',
        minutesAdded: 2,
      })
    );
  };

  const handleCompleteRoleplay = (
    scenarioId: string,
    isGood: boolean,
    prompt: string,
    userReply: string,
    expectedReply: string
  ) => {
    updateAndPersist((prev) => {
      const next = recordLearningAttempt(prev, {
        isCorrect: isGood,
        skill: 'speaking',
        source: 'roleplay',
        prompt,
        userAnswer: userReply,
        correctAnswer: expectedReply,
        explanationAm: 'IT Specialist աշխատանքային երկխոսության պատասխան։',
        activityTitleAm: `IT Roleplay (${scenarioId})`,
        minutesAdded: 2,
      });
      return {
        ...next,
        completedRoleplayIds: Array.from(new Set([...next.completedRoleplayIds, scenarioId])),
      };
    });
  };

  const handleToggleFavoriteWord = (wordId: string) => {
    updateAndPersist((prev) => {
      const exists = prev.favoriteWordIds.includes(wordId);
      const favoriteWordIds = exists
        ? prev.favoriteWordIds.filter((id) => id !== wordId)
        : [wordId, ...prev.favoriteWordIds];
      return { ...prev, favoriteWordIds };
    });
  };

  const handleGradeSRSWord = (
    wordId: string,
    grade: 'again' | 'hard' | 'good' | 'easy'
  ) => {
    updateAndPersist((prev) => {
      const nextSRS = calculateNextSRS(wordId, prev.srsWords[wordId], grade);
      const learnedWordIds =
        grade !== 'again'
          ? Array.from(new Set([...prev.learnedWordIds, wordId]))
          : prev.learnedWordIds;
      return {
        ...prev,
        learnedWordIds,
        dailyStudyMinutes: prev.dailyStudyMinutes + 1,
        srsWords: {
          ...prev.srsWords,
          [wordId]: nextSRS,
        },
      };
    });
  };

  const handleCompletePlacement = (calculatedLevel: CEFRLevel, scorePercent: number) => {
    updateAndPersist((prev): UserProgressData => ({
      ...prev,
      level: calculatedLevel,
      placementCompleted: true,
      dailyStudyMinutes: prev.dailyStudyMinutes + 3,
      skills: {
        reading: Math.max(25, scorePercent),
        listening: Math.max(25, scorePercent - 5),
        speaking: Math.max(20, scorePercent - 8),
        writing: Math.max(25, scorePercent - 3),
      },
      history: [
        {
          id: `placement-${Date.now()}`,
          date: getTodayDateString(),
          timestamp: Date.now(),
          activityType: 'placement',
          titleAm: `Մակարդակի ստուգում՝ ${calculatedLevel} (${scorePercent}%)`,
          durationMinutes: 3,
          correctDelta: 1,
          wrongDelta: 0,
        },
        ...prev.history,
      ],
    }));
  };

  const handleResolveMistake = (mistakeId: string) => {
    updateAndPersist((prev) => ({
      ...prev,
      mistakes: prev.mistakes.map((m) =>
        m.id === mistakeId ? { ...m, resolved: true } : m
      ),
    }));
  };

  const handleResetAllProgress = async () => {
    const fresh = await learningRepository.resetProgress();
    setProgress(fresh);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 justify-between z-30">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                H
              </div>
              <div>
                <div className="font-extrabold text-lg tracking-tight leading-none">
                  Hay<span className="text-emerald-600 dark:text-emerald-400">Lingo</span> AI
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  Անգլերեն հայախոսների համար
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setStartInPlacement(false);
                    setActiveTab(item.id);
                  }}
                  className={`w-full px-3.5 py-3 rounded-2xl text-left transition flex items-center gap-3 ${active
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 font-medium'
                    }`}
                >
                  <Icon size={19} className="shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm leading-tight truncate">{item.labelAm}</div>
                    <div
                      className={`text-[11px] truncate ${active ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                    >
                      {item.subAm}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Streak + Dark Mode Toggle */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Flame size={16} className="text-amber-500" /> {progress.streakDays} օր անընդմեջ
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              {progress.level}
            </span>
          </div>

          <button
            onClick={handleToggleDarkMode}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-between transition"
          >
            <span className="flex items-center gap-2">
              {progress.darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
              {progress.darkMode ? 'Լուսավոր ռեժիմ (Light Mode)' : 'Մութ ռեժիմ (Dark Mode)'}
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center">
            H
          </div>
          <div>
            <div className="font-extrabold text-base leading-none">
              Hay<span className="text-emerald-600 dark:text-emerald-400">Lingo</span> AI
            </div>
            <div className="text-[10px] text-slate-400">Մակարդակ {progress.level} · {progress.streakDays} օր</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            aria-label="Փոխել թեման"
          >
            {progress.darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            aria-label="Մենյու"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-x-0 top-[57px] z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setStartInPlacement(false);
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left flex items-center justify-between ${active
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                >
                  <span className="flex items-center gap-3 text-sm">
                    <Icon size={18} />
                    {item.labelAm}
                  </span>
                  <span className="text-xs opacity-75">{item.subAm}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-72">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          {/* Top Status Bar */}
          <div className="hidden md:flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ԱՆԳԼԵՐԵՆԻ ՈՒՍՈՒՑՄԱՆ ԱՆՁՆԱԿԱՆ ՀԱՐԹԱԿ
              </div>
              <div className="text-lg font-bold mt-0.5">
                Բարի գալուստ, {progress.userName} 👋
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2">
                <Flame size={16} className="text-amber-500" />
                <span>Streak՝ {progress.streakDays} օր</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2">
                <Award size={16} className="text-emerald-500" />
                <span>Մակարդակ՝ {progress.level}</span>
              </div>
              <button
                onClick={() => {
                  setStartInPlacement(true);
                  setActiveTab('My Progress');
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition"
              >
                Ստուգել մակարդակը
              </button>
            </div>
          </div>

          {!hydrated ? (
            <div className="py-20 text-center text-slate-400 font-semibold">
              Բեռնվում է ուսուցման միջավայրը...
            </div>
          ) : (
            <>
              {activeTab === 'Dashboard' && (
                <DashboardView
                  progress={progress}
                  onNavigate={(tab) => setActiveTab(tab as NavTabId)}
                  onOpenLesson={handleOpenLesson}
                  onChangeLevel={handleChangeLevel}
                  onStartPlacementTest={() => {
                    setStartInPlacement(true);
                    setActiveTab('My Progress');
                  }}
                  onSpeak={handleSpeak}
                />
              )}

              {activeTab === 'Lessons' && (
                <LessonsView
                  progress={progress}
                  selectedLessonId={progress.currentLessonId}
                  onSelectLesson={(lessonId) =>
                    updateAndPersist((prev) => ({ ...prev, currentLessonId: lessonId }))
                  }
                  onToggleSaveSentence={handleToggleSaveSentence}
                  onCompleteLesson={handleCompleteLesson}
                  onSpeak={handleSpeak}
                  onRecordSpeakingAttempt={handleRecordVoiceSession}
                />
              )}

              {activeTab === 'Exercises' && (
                <ExercisesView
                  progress={progress}
                  onSpeak={handleSpeak}
                  onRecordExerciseResult={handleRecordExerciseResult}
                />
              )}

              {activeTab === 'My AI Teacher' && (
                <TeacherView
                  progress={progress}
                  onSpeak={handleSpeak}
                  onUpdateTeacherState={handleUpdateTeacherState}
                />
              )}

              {activeTab === 'Voice Practice' && (
                <VoicePracticeView
                  progress={progress}
                  onUpdateMorningTime={(time) =>
                    updateAndPersist((prev) => ({ ...prev, preferredMorningTime: time }))
                  }
                  onUpdateSpeechRate={(rate) =>
                    updateAndPersist((prev) => ({ ...prev, speechRate: rate }))
                  }
                  onRecordVoiceSession={handleRecordVoiceSession}
                />
              )}

              {activeTab === 'IT English' && (
                <ITEnglishView
                  progress={progress}
                  onSpeak={handleSpeak}
                  onCompleteRoleplay={handleCompleteRoleplay}
                />
              )}

              {activeTab === 'Vocabulary' && (
                <VocabularyView
                  progress={progress}
                  onSpeak={handleSpeak}
                  onToggleFavoriteWord={handleToggleFavoriteWord}
                  onGradeSRSWord={handleGradeSRSWord}
                />
              )}

              {activeTab === 'My Progress' && (
                <PersonalSystemView
                  progress={progress}
                  startInPlacementMode={startInPlacement}
                  onChangeLevel={handleChangeLevel}
                  onCompletePlacement={handleCompletePlacement}
                  onResolveMistake={handleResolveMistake}
                  onResetAllProgress={handleResetAllProgress}
                  onNavigate={(tab) => setActiveTab(tab as NavTabId)}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
