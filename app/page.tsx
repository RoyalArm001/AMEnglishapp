'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Award,
  BookMarked,
  BookOpen,
  Brain,
  Clock,
  Flame,
  History,
  LayoutDashboard,
  Languages,
  Menu,
  MessageCircle,
  Mic,
  Moon,
  Settings,
  Sun,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  calculateNextSRS,
  DEFAULT_USER_PROGRESS,
  getTodayDateString,
  learningRepository,
  normalizeAndValidateState,
  recordLearningAttempt,
} from '../lib/storage';
import {
  CEFRLevel,
  ExerciseItem,
  LearningGoalId,
  LessonProgressRecord,
  ProfessionId,
  ProficiencyTier,
  StudySessionRecord,
  TeacherMessage,
  ThemeMode,
  SkillType,
  UserProgressData,
  UserSettingsRecord,
} from '../lib/types';
import { useDisplaySettings } from '../lib/use-display-settings';
import { StudyActivityContext } from '../lib/study-activity';
import { useWakeLock } from '../lib/use-wake-lock';
import { WAKE_STATUS_AM } from '../lib/wake-lock';
import { useStudyTimer } from '../lib/use-study-timer';
import { LESSONS_DATA, LESSON_CATEGORIES } from '../data/lessons';
import { speakEnglish, compareSpokenToTarget } from '../lib/speech';
import { computeEffectiveDarkMode, getTimeStringInTimezone, UI_TEXT } from '../lib/i18n';
import { getRecommendedLessonIdsForProfession } from '../data/professions';
import OnboardingView from '../components/OnboardingView';
import DashboardView from '../components/DashboardView';
import LessonsView from '../components/LessonsView';
import ExercisesView from '../components/ExercisesView';
import TeacherView from '../components/TeacherView';
import VoicePracticeView from '../components/VoicePracticeView';
import ITEnglishView from '../components/ITEnglishView';
import VocabularyView from '../components/VocabularyView';
import LearningHistoryView from '../components/LearningHistoryView';
import ProfileView from '../components/ProfileView';
import SettingsView from '../components/SettingsView';
import PWAManager, { TAB_QUERY_MAP } from '../components/PWAManager';
import Logo, { LogoIcon } from '../components/Logo';
import { APP_VERSION } from '../lib/pwa';

const TranslationView = dynamic(() => import('../components/TranslationView'), {
  loading: () => <p className="p-6 text-slate-500">Բառարանը բեռնվում է…</p>,
});

type NavTabId =
  | 'Dashboard'
  | 'Lessons'
  | 'Exercises'
  | 'Study Assistant'
  | 'Voice Practice'
  | 'IT English'
  | 'Vocabulary'
  | 'Translation'
  | 'My Progress'
  | 'Profile'
  | 'Settings';

const NAV_ITEMS: { id: NavTabId; labelAm: string; subAm: string; icon: any }[] = [
  { id: 'Dashboard', labelAm: UI_TEXT.nav.dashboard, subAm: 'Օրվա ամփոփում', icon: LayoutDashboard },
  { id: 'Lessons', labelAm: UI_TEXT.nav.lessons, subAm: `${LESSON_CATEGORIES.length} բաժին · ${LESSONS_DATA.length} դաս`, icon: BookOpen },
  { id: 'Exercises', labelAm: UI_TEXT.nav.exercises, subAm: 'Վարժություններ Ա–Զ', icon: Brain },
  { id: 'Study Assistant', labelAm: UI_TEXT.nav.teacher, subAm: 'Հարց ու պատասխան', icon: MessageCircle },
  { id: 'Voice Practice', labelAm: UI_TEXT.nav.voice, subAm: 'Խոսք և Առավոտյան ռեժիմ', icon: Mic },
  { id: 'IT English', labelAm: UI_TEXT.nav.itEnglish, subAm: '15 մասնագիտություն · երկխոսություն', icon: Terminal },
  { id: 'Vocabulary', labelAm: UI_TEXT.nav.vocabulary, subAm: '210 բառ և Քարտեր', icon: BookMarked },
  { id: 'Translation', labelAm: UI_TEXT.nav.translation, subAm: 'Հայերեն ↔ Անգլերեն', icon: Languages },
  { id: 'My Progress', labelAm: UI_TEXT.nav.history, subAm: 'Գրաֆիկներ և Սխալներ', icon: History },
  { id: 'Profile', labelAm: UI_TEXT.nav.profile, subAm: 'Անձնական տվյալներ', icon: User },
  { id: 'Settings', labelAm: UI_TEXT.nav.settings, subAm: 'Տեսք, Ժամ և Տվյալներ', icon: Settings },
];

function navigateByKey(event: React.KeyboardEvent<HTMLElement>) {
  if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
  const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
  buttons[next]?.focus();
}

export default function HomePage() {
  const [activeTab, restoreActiveTab] = useState<NavTabId>('Dashboard');
  const [sessionState, setSessionState] = useState<'idle' | 'active' | 'paused'>('idle');
  const setActiveTab = useCallback((tab: NavTabId) => {
    restoreActiveTab(tab);
    setSessionState(['Lessons','Exercises','Study Assistant','Voice Practice','IT English','Vocabulary'].includes(tab) ? 'active' : 'idle');
  }, []);
  const navigateTab = useCallback((tab: string) => setActiveTab(tab as NavTabId), []);
  const consumeStudyMinutes = useStudyTimer(activeTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_USER_PROGRESS);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [storageError, setStorageError] = useState(false);
  const [startInPlacement, setStartInPlacement] = useState<boolean>(false);
  const sessionRunning = sessionState === 'active';
  const isLearning = ['Lessons','Exercises','Study Assistant','Voice Practice','IT English','Vocabulary'].includes(activeTab) || (activeTab === 'My Progress' && startInPlacement);
  useDisplaySettings(progress.settings);
  const wake = useWakeLock(hydrated && progress.onboardingCompleted && isLearning && sessionRunning && progress.settings.keepScreenAwake, activeTab);
  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem('haylingo-study-session', JSON.stringify({ userId: progress.profile.id, tab: activeTab, state: sessionState, placement: startInPlacement, entryUrl: location.pathname + location.search })); } catch { /* Storage may be disabled; learning still works. */ }
  }, [hydrated, activeTab, sessionState, startInPlacement, progress.profile.id]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && mobileMenuOpen) { setMobileMenuOpen(false); document.querySelector<HTMLButtonElement>('[aria-label="Մենյու"]')?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [mobileMenuOpen]);

  const [lessonSentenceResumeIdx, setLessonSentenceResumeIdx] = useState<number>(0);

  // Load persisted state from LocalStorage + IndexedDB on mount
  useEffect(() => {
    const syncData = learningRepository.loadProgressSync();
    setProgress(syncData);


    learningRepository.loadProgressAsync().then((asyncData) => {
      setProgress(asyncData);
      let tab = TAB_QUERY_MAP[new URLSearchParams(location.search).get('tab')?.toLowerCase() || ''] || 'Dashboard';
      let state: 'idle' | 'active' | 'paused' = 'idle';
      try {
        const saved = JSON.parse(sessionStorage.getItem('haylingo-study-session') || 'null');
        const reload = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
        if (reload && saved?.userId === asyncData.profile.id && saved.entryUrl === location.pathname + location.search && NAV_ITEMS.some(item => item.id === saved.tab) && ['idle','active','paused'].includes(saved.state)) {
          tab = saved.tab; state = saved.state;
          setStartInPlacement(saved.placement === true);
        }
      } catch { /* Ignore invalid or unavailable tab-local session data. */ }
      restoreActiveTab(tab as NavTabId);
      setSessionState(state);
      setLessonSentenceResumeIdx(asyncData.currentSentenceIndex || 0);
      setHydrated(true);
    });
  }, []);

  // Sync Dark Mode class on <html> and re-check Auto Mode every 60s
  useEffect(() => {
    const applyTheme = () => {
      const effectiveDark = computeEffectiveDarkMode({
        themeMode: progress.settings?.themeMode || 'light',
        timezone: progress.settings?.timezone || 'Asia/Yerevan',
        autoLightStartTime: progress.settings?.autoLightStartTime || '07:00',
        autoDarkStartTime: progress.settings?.autoDarkStartTime || '19:00',
      });
      if (typeof document !== 'undefined') {
        if (effectiveDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      if (effectiveDark !== progress.darkMode) {
        setProgress((prev) => ({ ...prev, darkMode: effectiveDark }));
      }
    };

    applyTheme();
    const interval = setInterval(applyTheme, 60000);
    return () => clearInterval(interval);
  }, [
    progress.settings?.themeMode,
    progress.settings?.timezone,
    progress.settings?.autoLightStartTime,
    progress.settings?.autoDarkStartTime,
    progress.darkMode,
  ]);

  const updateAndPersist = (updater: (prev: UserProgressData) => UserProgressData) => {
    setProgress((prev) => {
      const updated = normalizeAndValidateState(updater(normalizeAndValidateState(prev)));
      learningRepository.saveProgress(updated).then(() => setStorageError(false)).catch(() => setStorageError(true));
      return updated;
    });
  };

  const handleSpeak = (text: string, customRate?: 'slow' | 'normal') => {
    const rateMode = customRate || progress.settings?.speechRate || progress.speechRate;
    speakEnglish(text, rateMode, undefined, {
      customRateNumeric: progress.settings?.voiceSpeedNumeric,
      selectedVoiceURI: progress.settings?.selectedVoiceURI,
    });
  };

  const handleCycleThemeMode = () => {
    const current = progress.settings?.themeMode || 'light';
    const nextMode: ThemeMode =
      current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
    handleUpdateSettings({ themeMode: nextMode });
  };

  const handleCompleteOnboarding = (params: {
    firstName: string;
    lastName: string;
    age: number;
    profession: ProfessionId;
    customProfession: string;
    proficiencyTier: ProficiencyTier;
    cefrLevel: CEFRLevel;
    learningGoal: LearningGoalId;
    customGoal: string;
  }) => {
    const recommendedIds = getRecommendedLessonIdsForProfession(params.profession);
    const initialLessonId = recommendedIds[0] || 'lesson-1-days';
    const tz = progress.settings?.timezone || 'Asia/Yerevan';

    updateAndPersist((prev): UserProgressData => ({
      ...prev,
      onboardingCompleted: true,
      userName: `${params.firstName} ${params.lastName}`.trim(),
      level: params.cefrLevel,
      currentLessonId: initialLessonId,
      profile: {
        ...prev.profile,
        firstName: params.firstName,
        lastName: params.lastName,
        age: params.age,
        profession: params.profession,
        customProfession: params.customProfession,
        proficiencyTier: params.proficiencyTier,
        learningGoal: params.learningGoal,
        customGoal: params.customGoal,
        learningStartDate: prev.profile?.learningStartDate || getTodayDateString(tz),
        updatedAt: Date.now(),
      },
    }));
    setActiveTab('Dashboard');
  };

  const handleUpdateProfile = (params: {
    firstName: string;
    lastName: string;
    age: number;
    profession: ProfessionId;
    customProfession: string;
    proficiencyTier: ProficiencyTier;
    level: CEFRLevel;
    learningGoal: LearningGoalId;
    customGoal: string;
  }) => {
    updateAndPersist((prev): UserProgressData => ({
      ...prev,
      userName: `${params.firstName} ${params.lastName}`.trim(),
      level: params.level,
      profile: {
        ...prev.profile,
        firstName: params.firstName,
        lastName: params.lastName,
        age: params.age,
        profession: params.profession,
        customProfession: params.customProfession,
        proficiencyTier: params.proficiencyTier,
        learningGoal: params.learningGoal,
        customGoal: params.customGoal,
        updatedAt: Date.now(),
      },
    }));
  };

  const handleUpdateSettings = (partial: Partial<UserSettingsRecord>) => {
    updateAndPersist((prev): UserProgressData => {
      const nextSettings: UserSettingsRecord = {
        ...prev.settings,
        ...partial,
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        settings: nextSettings,
        preferredMorningTime: nextSettings.preferredMorningTime,
        speechRate: nextSettings.speechRate,
      };
    });
  };

  const handleChangeLevel = (level: CEFRLevel) => {
    updateAndPersist((prev): UserProgressData => ({
      ...prev,
      level,
    }));
  };

  const handleOpenLesson = (lessonId: string, sentenceIdx: number = 0, startSession = true) => {
    setSessionState(startSession ? 'active' : 'idle');
    setLessonSentenceResumeIdx(sentenceIdx);
    updateAndPersist((prev): UserProgressData => {
      const existingLp = prev.lessonProgressMap?.[lessonId];
      const updatedLp: LessonProgressRecord = {
        id: lessonId,
        lessonId,
        status: existingLp?.status === 'completed' ? 'completed' : 'in-progress',
        lastSentenceIndex: sentenceIdx,
        completedSentenceIndices: existingLp?.completedSentenceIndices || [],
        timeSpentMinutes: existingLp?.timeSpentMinutes || 0,
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        currentLessonId: lessonId,
        currentSentenceIndex: sentenceIdx,
        lessonProgressMap: {
          ...(prev.lessonProgressMap || {}),
          [lessonId]: updatedLp,
        },
      };
    });
    restoreActiveTab('Lessons');
  };

  const handleUpdateSentencePosition = (lessonId: string, sentenceIdx: number) => {
    if (sessionState === 'idle') setSessionState('active');
    updateAndPersist((prev): UserProgressData => {
      const existingLp = prev.lessonProgressMap?.[lessonId];
      const completedIndices = Array.from(
        new Set([...(existingLp?.completedSentenceIndices || []), sentenceIdx])
      );
      const updatedLp: LessonProgressRecord = {
        id: lessonId,
        lessonId,
        status: existingLp?.status === 'completed' ? 'completed' : 'in-progress',
        lastSentenceIndex: sentenceIdx,
        completedSentenceIndices: completedIndices,
        timeSpentMinutes: existingLp?.timeSpentMinutes || 0,
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        currentLessonId: lessonId,
        currentSentenceIndex: sentenceIdx,
        lessonProgressMap: {
          ...(prev.lessonProgressMap || {}),
          [lessonId]: updatedLp,
        },
      };
    });
  };

  const handleToggleSaveSentence = (sentenceId: string) => {
    updateAndPersist((prev): UserProgressData => {
      const exists = prev.savedSentenceIds.includes(sentenceId);
      const savedSentenceIds = exists
        ? prev.savedSentenceIds.filter((id) => id !== sentenceId)
        : [sentenceId, ...prev.savedSentenceIds];
      return { ...prev, savedSentenceIds };
    });
  };

  const handleCompleteLesson = (lessonId: string) => {
    setSessionState('idle');
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const completedLessonIds = Array.from(new Set([...prev.completedLessonIds, lessonId]));
      const readingBoost = Math.min(100, prev.skills.reading + 3);
      const tz = prev.settings?.timezone || 'Asia/Yerevan';
      const existingLp = prev.lessonProgressMap?.[lessonId];
      const updatedLp: LessonProgressRecord = {
        id: lessonId,
        lessonId,
        status: 'completed',
        lastSentenceIndex: 0,
        completedSentenceIndices: (LESSONS_DATA.find(l => l.id === lessonId)?.sentences || []).map((_, i) => i),
        timeSpentMinutes: (existingLp?.timeSpentMinutes || 0) + minutes,
        completedAt: Date.now(),
        updatedAt: Date.now(),
      };
      const newSession: StudySessionRecord = {
        id: `hist-${Date.now()}`,
        date: getTodayDateString(tz),
        timestamp: Date.now(),
        activityType: 'lesson',
        referenceId: lessonId,
        titleAm: `Ավարտված դաս՝ ${lessonId}`,
        durationMinutes: minutes,
        correctDelta: 1,
        wrongDelta: 0,
      };
      return {
        ...prev,
        completedLessonIds,
        totalStudyMinutes: (prev.totalStudyMinutes || 0) + minutes,
        dailyStudyMinutes: prev.dailyStudyMinutes + minutes,
        lessonProgressMap: {
          ...(prev.lessonProgressMap || {}),
          [lessonId]: updatedLp,
        },
        skills: {
          ...prev.skills,
          reading: readingBoost,
        },
        history: [newSession, ...prev.history].slice(0, 100),
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
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      const next = recordLearningAttempt(prev, {
        isCorrect,
        skill: exercise.skill,
        source: 'exercise',
        prompt: exercise.promptEn,
        userAnswer,
        correctAnswer: exercise.correctAnswer,
        explanationAm: exercise.explanationAm,
        activityTitleAm: `Վարժություն · ${exercise.category}`,
        minutesAdded: minutes,
        exerciseId: exercise.id,
        exerciseType: exercise.type,
        category: exercise.category,
      });
      const completedExerciseIds = isCorrect
        ? Array.from(new Set([...next.completedExerciseIds, exercise.id]))
        : next.completedExerciseIds;
      return {
        ...next,
        completedExerciseIds,
        mistakes: isCorrect ? next.mistakes.map(m => m.exerciseId === exercise.id ? {...m,resolved:true} : m) : next.mistakes,
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
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      const next = recordLearningAttempt(prev, {
        isCorrect: params.isCorrect,
        skill: 'writing',
        source: 'teacher',
        prompt: params.prompt,
        userAnswer: params.userAnswer,
        correctAnswer: params.correctAnswer,
        explanationAm: params.explanationAm,
        activityTitleAm: 'Պարապմունք Անձնական Ուսուցչի հետ',
        minutesAdded: minutes,
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
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData =>
      recordLearningAttempt(prev, {
        isCorrect,
        skill: 'speaking',
        source: 'voice',
        prompt,
        userAnswer: spokenText,
        correctAnswer: targetText,
        explanationAm: 'Խոսակցական վարժության տեքստային համեմատում։',
        activityTitleAm: 'Ձայնային պարապմունք',
        minutesAdded: minutes,
        matchRatio: compareSpokenToTarget(spokenText, targetText).matchRatio,
      })
    );
  };

  const handleCompleteRoleplay = (
    scenarioId: string,
    isGood: boolean,
    prompt: string,
    userReply: string,
    expectedReply: string,
    skill: SkillType = 'speaking'
  ) => {
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      const next = recordLearningAttempt(prev, {
        isCorrect: isGood,
        skill,
        source: 'roleplay',
        prompt,
        userAnswer: userReply,
        correctAnswer: expectedReply,
        explanationAm: 'Աշխատանքային երկխոսության պատասխան։',
        activityTitleAm: `Մասնագիտական երկխոսություն (${scenarioId})`,
        minutesAdded: minutes,
      });
      return {
        ...next,
        completedRoleplayIds: isGood ? Array.from(new Set([...next.completedRoleplayIds, scenarioId])) : next.completedRoleplayIds,
      };
    });
  };

  const handleToggleFavoriteWord = (wordId: string) => {
    updateAndPersist((prev): UserProgressData => {
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
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      const nextSRS = calculateNextSRS(wordId, prev.srsWords[wordId], grade);
      const learnedWordIds =
        grade !== 'again'
          ? Array.from(new Set([...prev.learnedWordIds, wordId]))
          : prev.learnedWordIds;
      return {
        ...prev,
        learnedWordIds,
        totalStudyMinutes: (prev.totalStudyMinutes || 0) + minutes,
        dailyStudyMinutes: prev.dailyStudyMinutes + minutes,
        history: [{id: `vocab-${Date.now()}`,date:getTodayDateString(prev.settings.timezone),timestamp:Date.now(),activityType:'vocabulary' as const,referenceId:wordId,titleAm:'Բառի կրկնում',durationMinutes:minutes,correctDelta:0,wrongDelta:0},...prev.history].slice(0,100),
        srsWords: {
          ...prev.srsWords,
          [wordId]: nextSRS,
        },
      };
    });
  };

  const handleCompletePlacement = (calculatedLevel: CEFRLevel, scorePercent: number) => {
    setSessionState('idle');
    const minutes = consumeStudyMinutes();
    updateAndPersist((prev): UserProgressData => {
      const tz = prev.settings?.timezone || 'Asia/Yerevan';
      const newEntry: StudySessionRecord = {
        id: `placement-${Date.now()}`,
        date: getTodayDateString(tz),
        timestamp: Date.now(),
        activityType: 'placement',
        titleAm: `Մակարդակի ստուգում՝ ${calculatedLevel} (${scorePercent}%)`,
        durationMinutes: minutes,
        correctDelta: 1,
        wrongDelta: 0,
      };
      return {
        ...prev,
        level: calculatedLevel,
        placementCompleted: true,
        totalStudyMinutes: (prev.totalStudyMinutes || 0) + minutes,
        dailyStudyMinutes: prev.dailyStudyMinutes + minutes,
        skills: prev.skills,
        history: [newEntry, ...prev.history].slice(0, 100),
      };
    });
  };

  const handleResolveMistake = (mistakeId: string) => {
    updateAndPersist((prev): UserProgressData => ({
      ...prev,
      mistakes: prev.mistakes.map((m) =>
        m.id === mistakeId ? { ...m, resolved: true } : m
      ),
    }));
  };

  const handleExportJson = () => {
    const jsonStr = learningRepository.exportToJson(progress);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `haylingo-backup-${getTodayDateString(progress.settings?.timezone)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (jsonText: string) => {
    const res = await learningRepository.importFromJson(jsonText);
    if (res.ok && res.data) {
      setProgress(res.data);
    }
    return { ok: res.ok, errorAm: res.errorAm };
  };

  const handleWipeAllData = async () => {
    const fresh = await learningRepository.resetProgress();
    setProgress(fresh);
    setActiveTab('Dashboard');
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold">
        Բեռնվում է ուսուցման միջավայրը...
      </div>
    );
  }

  // Show Onboarding screen on first visit before Dashboard
  if (!progress.onboardingCompleted) {
    return (
      <OnboardingView
        initialProfile={progress.profile}
        onCompleteOnboarding={handleCompleteOnboarding}
      />
    );
  }

  const themeBadgeLabel =
    progress.settings?.themeMode === 'auto'
      ? '🕒 Ավտոմատ տեսք'
      : progress.darkMode
      ? '🌙 Գիշերային տեսք'
      : '☀️ Ցերեկային տեսք';

  return (
    <div className="app-shell min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {storageError && <div role="alert" className="fixed top-0 inset-x-0 z-50 bg-amber-100 text-amber-950 p-3 text-center">Առաջընթացը չի պահպանվել բրաուզերում։ Էջը փակելուց առաջ Կարգավորումներից արտահանեք JSON պահուստը։</div>}
      <a href="#learning-main" className="skip-link">Անցնել պարապմունքին</a>
      {/* Desktop Sidebar */}
      <aside aria-label="Ձախ ընտրացանկ" className="app-sidebar bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 justify-between z-30 overflow-y-auto">
        <div className="space-y-4">
          {/* Brand Logo */}
          <div className="px-2 pt-1">
            <Logo size="md" badgeText={APP_VERSION} />
          </div>

          {/* Navigation Menu */}
          <nav aria-label="Բաժինների ընտրություն" onKeyDown={navigateByKey} className="space-y-1">
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
                  className={`w-full px-3.5 py-2.5 rounded-2xl text-left transition flex items-center gap-3 ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 font-medium'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm leading-tight truncate">{item.labelAm}</div>
                    <div
                      className={`text-[10px] truncate ${
                        active ? 'text-emerald-100' : 'text-slate-400'
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

        {/* Sidebar Footer: Streak + Theme Mode Switcher */}
        <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Flame size={15} className="text-amber-500" /> {progress.streakDays} օր անընդմեջ
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              {progress.level}
            </span>
          </div>

          <button
            onClick={handleCycleThemeMode}
            className="w-full px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-between transition"
            title="Սեղմեք՝ Ցերեկային / Գիշերային / Ավտոմատ ռեժիմը փոխելու համար"
          >
            <span className="flex items-center gap-2">
              {progress.settings?.themeMode === 'auto' ? (
                <Clock size={15} className="text-sky-500" />
              ) : progress.darkMode ? (
                <Moon size={15} className="text-indigo-400" />
              ) : (
                <Sun size={15} className="text-amber-500" />
              )}
              <span>{themeBadgeLabel}</span>
            </span>
            <span className="text-[10px] text-slate-400">Փոխել</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="app-header sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoIcon size={34} />
          <div>
            <div className="font-extrabold text-base leading-none">
              Hay<span className="text-emerald-600 dark:text-emerald-400">Lingo</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {progress.userName} · Մակարդակ {progress.level} · {progress.streakDays} օր
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCycleThemeMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            aria-label="Փոխել թեման"
          >
            {progress.darkMode ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-amber-500" />}
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
            role="navigation" aria-label="Բջջային ընտրացանկ" onKeyDown={navigateByKey}
            className="app-drawer fixed inset-x-0 top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl space-y-1 max-h-[80vh] overflow-y-auto"
          >
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-3 underline">Փակել ընտրացանկը</button>
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
                  className={`w-full px-4 py-2.5 rounded-xl text-left flex items-center justify-between ${
                    active
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
      <StudyActivityContext.Provider value={{start: () => setSessionState(value => value === 'idle' ? 'active' : value), finish: () => setSessionState('idle')}}>
      <main id="learning-main" tabIndex={-1} className="app-main">
        <PWAManager
          morningPracticeTime={progress.settings?.preferredMorningTime || '08:30'}
          timezone={progress.settings?.timezone || 'Asia/Yerevan'}
          onNavigateTab={navigateTab}
        />
        <div className="app-content mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          {/* Top Status Bar */}
          <div className="app-top-status hidden md:flex flex-wrap gap-3 items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ԱՆԳԼԵՐԵՆԻ ՈՒՍՈՒՑՄԱՆ ԱՆՁՆԱԿԱՆ ՀԱՐԹԱԿ ·{' '}
                {getTimeStringInTimezone(progress.settings?.timezone || 'Asia/Yerevan')} (
                {progress.settings?.timezone || 'Asia/Yerevan'})
              </div>
              <div className="text-lg font-bold mt-0.5">
                Բարի գալուստ, {progress.userName} 👋
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveTab('Profile')}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-xs font-bold flex items-center gap-2 transition"
              >
                <User size={15} className="text-emerald-600" />
                <span>{progress.userName}</span>
              </button>
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2">
                <Flame size={15} className="text-amber-500" />
                <span>{progress.streakDays} օր</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2">
                <Award size={15} className="text-emerald-500" />
                <span>Մակարդակ՝ {progress.level}</span>
              </div>
              <button
                onClick={() => setActiveTab('Settings')}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition"
                title="Կարգավորումներ"
              >
                <Settings size={16} />
              </button>
            </div>
          </div>

          {isLearning && <section aria-label="Պարապմունքի էկրանը" className="study-session-bar mb-5 p-3 rounded-xl border border-emerald-300 flex flex-wrap gap-3 items-center justify-between">
            <div><p>{sessionRunning ? 'Պարապմունքն ընթացքի մեջ է' : sessionState === 'paused' ? 'Պարապմունքն ընդմիջված է' : 'Պարապմունքն ավարտված է կամ դեռ չի սկսվել'}</p><p aria-live="polite" data-wake-status={wake.status} className="text-sm">{WAKE_STATUS_AM[wake.status]}</p></div>
            <div className="flex flex-wrap gap-2">
              {sessionRunning ? <button type="button" className="rounded-xl px-3 py-2 bg-emerald-600 text-white" onClick={() => setSessionState('paused')}>Ընդմիջել դասը</button> : <button type="button" className="rounded-xl px-3 py-2 bg-emerald-600 text-white" onClick={() => setSessionState('active')}>{sessionState === 'paused' ? 'Շարունակել դասը' : 'Սկսել պարապմունքը'}</button>}
              {sessionState !== 'idle' && <button type="button" className="rounded-xl border px-3 py-2" onClick={() => setSessionState('idle')}>Դադարեցնել դասը</button>}
            </div>
            <label className="flex gap-2 items-start text-sm"><input type="checkbox" checked={progress.settings.keepScreenAwake} onChange={event => handleUpdateSettings({keepScreenAwake:event.target.checked})} /><span>Դասի ընթացքում էկրանը միացված պահել</span></label>
            {['released','denied'].includes(wake.status) && <button type="button" className="underline" onClick={wake.retry}>Կրկին միացնել էկրանի պահումը</button>}
          </section>}
          {activeTab === 'Dashboard' && (
            <DashboardView
              progress={progress}
              onNavigate={(tab) => setActiveTab(tab as NavTabId)}
              onOpenLesson={handleOpenLesson}
              onChangeLevel={handleChangeLevel}
              onStartPlacementTest={() => {
                setStartInPlacement(true);
                setActiveTab('My Progress');
                setSessionState('active');
              }}
              onSpeak={handleSpeak}
            />
          )}

          {activeTab === 'Lessons' && (
            <LessonsView
              progress={progress}
              selectedLessonId={progress.currentLessonId}
              initialSentenceIdx={lessonSentenceResumeIdx}
              onSelectLesson={handleOpenLesson}
              onUpdateSentencePosition={handleUpdateSentencePosition}
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

          {activeTab === 'Study Assistant' && (
            <TeacherView
              progress={progress}
              onSpeak={handleSpeak}
              onUpdateTeacherState={handleUpdateTeacherState}
            />
          )}

          {activeTab === 'Voice Practice' && (
            <VoicePracticeView
              progress={progress}
              onUpdateMorningTime={(time) => handleUpdateSettings({ preferredMorningTime: time })}
              onUpdateSpeechRate={(rate) => handleUpdateSettings({ speechRate: rate })}
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

          {activeTab === 'Translation' && <TranslationView onSpeak={handleSpeak} />}

          {activeTab === 'My Progress' && (
            <LearningHistoryView
              progress={progress}
              startInPlacementMode={startInPlacement}
              onResumeLessonAtSentence={(lessonId, sIdx) => handleOpenLesson(lessonId, sIdx)}
              onCompletePlacement={handleCompletePlacement}
              onResolveMistake={handleResolveMistake}
              onNavigate={(tab) => setActiveTab(tab as NavTabId)}
              onSpeak={handleSpeak}
            />
          )}

          {activeTab === 'Profile' && (
            <ProfileView
              progress={progress}
              onUpdateProfile={handleUpdateProfile}
              onOpenLesson={(lessonId) => handleOpenLesson(lessonId, 0)}
              onSpeak={handleSpeak}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsView
              progress={progress}
              onUpdateSettings={handleUpdateSettings}
              onChangeLevel={handleChangeLevel}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onWipeAllData={handleWipeAllData}
              onSpeak={handleSpeak}
            />
          )}
        </div>
      </main>
      </StudyActivityContext.Provider>

      {/* Mobile Bottom Navigation Bar (PWA Native App Experience) */}
      <nav
        aria-label="Հիմնական բաժիններ"
        className="app-bottom-nav fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={() => {
            setStartInPlacement(false);
            setActiveTab('Dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'Dashboard'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] mt-0.5">Վահանակ</span>
        </button>

        <button
          onClick={() => {
            setStartInPlacement(false);
            setActiveTab('Lessons');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'Lessons'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] mt-0.5">Դասեր</span>
        </button>

        <button
          onClick={() => {
            setStartInPlacement(false);
            setActiveTab('Exercises');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'Exercises'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Brain size={20} />
          <span className="text-[10px] mt-0.5">Վարժանք</span>
        </button>

        <button
          onClick={() => {
            setStartInPlacement(false);
            setActiveTab('Voice Practice');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'Voice Practice'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mic size={20} />
          <span className="text-[10px] mt-0.5">Ձայնային</span>
        </button>

        <button
          onClick={() => {
            setStartInPlacement(false);
            setActiveTab('Profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'Profile'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User size={20} />
          <span className="text-[10px] mt-0.5">Պրոֆիլ</span>
        </button>
      </nav>
    </div>
  );
}
