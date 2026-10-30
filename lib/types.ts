export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type ProficiencyTier = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';

export type LearningGoalId = 'work' | 'travel' | 'daily' | 'other';

export type ProfessionId =
  | 'IT Specialist'
  | 'Software Developer'
  | 'Network Administrator'
  | 'System Administrator'
  | 'Engineer'
  | 'Doctor'
  | 'Teacher'
  | 'Student'
  | 'Accountant'
  | 'Driver'
  | 'Manager'
  | 'Business Owner'
  | 'Sales Specialist'
  | 'Designer'
  | 'Other';

export type ThemeMode = 'light' | 'dark' | 'auto';

export type SkillType = 'reading' | 'listening' | 'speaking' | 'writing';

export type LessonCategoryId =
  | 'days-of-week'
  | 'months-of-year'
  | 'numbers'
  | 'time-and-dates'
  | 'directions'
  | 'daily-conversations'
  | 'work-conversations'
  | 'it-specialist'
  | 'travel'
  | 'interviews'
  | 'questions-answers'
  | 'long-sentences'
  | 'grammar-basics'
  | 'listening-tasks'
  | 'error-correction'
  | 'professional-english';

export interface LessonCategoryMeta {
  id: LessonCategoryId;
  order: number;
  icon: string;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
}

export interface LessonSentence {
  id: string;
  english: string;
  pronunciation: string; // Կարդացվում է (natural Armenian transcription)
  armenian: string;      // Հայերեն թարգմանություն
  grammarNoteAm?: string;
}

export interface LessonItem {
  id: string;
  categoryId: LessonCategoryId;
  order: number;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
  level: CEFRLevel;
  estimatedMinutes: number;
  grammarTipAm: string;
  recommendedProfessions?: ProfessionId[];
  sentences: LessonSentence[];
}

export type ExerciseType =
  | 'fill-blank'       // Exercise A — Fill in the blank
  | 'translate'        // Exercise B — Translate to English
  | 'correct-mistake'  // Exercise C — Correct the mistake
  | 'build-sentence'   // Exercise D — Build a sentence
  | 'listening'        // Exercise E — Listening
  | 'speaking';        // Exercise F — Speaking

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  level: CEFRLevel;
  skill: SkillType;
  category: string;
  recommendedProfessions?: ProfessionId[];
  promptEn: string;
  promptAm: string;
  incorrectSentence?: string;
  wordsBank?: string[];
  audioText?: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  hintAm: string;
  explanationAm: string;
}

export type ITTopicId =
  | 'first-day'
  | 'introducing-yourself'
  | 'computer-problems'
  | 'network-troubleshooting'
  | 'printer-problems'
  | 'windows-support'
  | 'router-switch'
  | 'ip-dns-dhcp'
  | 'microsoft-365'
  | 'active-directory'
  | 'helpdesk'
  | 'colleagues'
  | 'explaining-problems';

export interface ITTopicMeta {
  id: ITTopicId;
  order: number;
  icon: string;
  titleEn: string;
  titleAm: string;
  descriptionAm: string;
  keyPhrases: {
    english: string;
    pronunciation: string;
    armenian: string;
  }[];
}

export interface ITDialogueTurn {
  speaker: 'Employee' | 'IT Specialist';
  speakerAm: string;
  english: string;
  pronunciation: string;
  armenian: string;
  expectedKeywords?: string[];
  sampleAlternatives?: string[];
  hintAm?: string;
}

export interface ITDialogueScenario {
  id: string;
  topicId: ITTopicId;
  titleEn: string;
  titleAm: string;
  contextAm: string;
  level: CEFRLevel;
  turns: ITDialogueTurn[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  pronunciation: string;
  armenian: string;
  exampleEn: string;
  examplePronunciation: string;
  exampleAm: string;
  category: string;
  level: CEFRLevel;
  recommendedProfessions?: ProfessionId[];
}

export interface SRSWordState {
  wordId: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewAt: number;
  lastGrade?: 'again' | 'hard' | 'good' | 'easy';
  mastered: boolean;
  updatedAt: number;
}

export interface MistakeRecord {
  id: string;
  timestamp: number;
  source: 'exercise' | 'teacher' | 'voice' | 'roleplay';
  exerciseId?: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanationAm: string;
  skill: SkillType;
  resolved: boolean;
}

export interface StudySessionRecord {
  id: string;
  date: string; // YYYY-MM-DD in user's timezone
  timestamp: number;
  activityType:
    | 'lesson'
    | 'exercise'
    | 'voice'
    | 'teacher'
    | 'vocabulary'
    | 'it-roleplay'
    | 'placement';
  referenceId?: string;
  titleAm: string;
  durationMinutes: number;
  correctDelta: number;
  wrongDelta: number;
}

export interface TeacherMessage {
  id: string;
  role: 'teacher' | 'user';
  textEn: string;
  correctionEn?: string;
  explanationAm?: string;
  nextQuestionEn?: string;
  nextQuestionPronunciation?: string;
  nextQuestionAm?: string;
  isCorrect?: boolean;
  level?: CEFRLevel;
  topic?: string;
  timestamp: number;
}

export interface TeacherSessionState {
  currentQuestionIndex: number;
  difficultyScore: number;
  masteredQuestionIds: string[];
  weakTopics: string[];
  messages: TeacherMessage[];
}

// --- New Structured Entities for Profile, Onboarding, Settings & IndexedDB ---

export interface UserProfileRecord {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: ProfessionId;
  customProfession: string;
  proficiencyTier: ProficiencyTier;
  learningGoal: LearningGoalId;
  customGoal: string;
  learningStartDate: string; // YYYY-MM-DD
  createdAt: number;
  updatedAt: number;
}

export interface UserSettingsRecord {
  id: string;
  userId: string;
  keepScreenAwake: boolean;
  displayMode: 'auto' | 'desktop' | 'mobile';
  fontSizes: { interface: number; english: number; pronunciation: number; armenian: number };
  themeMode: ThemeMode; // 'light' | 'dark' | 'auto'
  autoLightStartTime: string; // Default '07:00'
  autoDarkStartTime: string;  // Default '19:00'
  timezone: string;           // e.g. 'Asia/Yerevan'
  autoDetectTimezone: boolean;
  voiceSpeedNumeric: number;  // 0.7 to 1.2
  speechRate: 'slow' | 'normal';
  selectedVoiceURI: string;
  autoPlayAudio: boolean;
  preferredMorningTime: string; // Default '08:30'
  dailyGoalMinutes: 5 | 10 | 15 | 30;
  exerciseDifficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  hintsEnabled: boolean;
  autoRepeatMistakes: boolean;
  autoAdvanceExercises: boolean;
  updatedAt: number;
}

export interface LessonProgressRecord {
  id: string; // lessonId
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  lastSentenceIndex: number;
  completedSentenceIndices: number[];
  timeSpentMinutes: number;
  completedAt?: number;
  updatedAt: number;
}

export interface ExerciseAttemptRecord {
  id: string;
  exerciseId: string;
  exerciseType: ExerciseType;
  category: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  createdAt: number;
}

export interface SpeakingSessionRecord {
  id: string;
  promptEn: string;
  targetEn: string;
  recognizedText: string;
  matchRatio: number;
  isAcceptable: boolean;
  mode: 'lesson' | 'voice' | 'morning' | 'roleplay' | 'exercise';
  durationMinutes: number;
  createdAt: number;
}

export interface AchievementRecord {
  id: string;
  code: string;
  titleAm: string;
  descriptionAm: string;
  icon: string;
  unlockedAt: number;
}

export interface ProfessionTrackMeta {
  id: ProfessionId;
  titleEn: string;
  titleAm: string;
  icon: string;
  descriptionAm: string;
  topics: {
    titleEn: string;
    titleAm: string;
  }[];
  sampleSentences: LessonSentence[];
}

export interface UserProgressData {
  onboardingCompleted: boolean;
  profile: UserProfileRecord;
  settings: UserSettingsRecord;
  userName: string; // Derived full name or firstName for compatibility
  level: CEFRLevel;
  placementCompleted: boolean;
  completedLessonIds: string[];
  currentLessonId: string;
  currentSentenceIndex: number;
  lessonProgressMap: Record<string, LessonProgressRecord>;
  savedSentenceIds: string[];
  learnedWordIds: string[];
  favoriteWordIds: string[];
  srsWords: Record<string, SRSWordState>;
  completedExerciseIds: string[];
  exerciseAttempts: ExerciseAttemptRecord[];
  completedRoleplayIds: string[];
  speakingSessions: SpeakingSessionRecord[];
  achievements: AchievementRecord[];
  correctAnswersCount: number;
  wrongAnswersCount: number;
  totalStudyMinutes: number;
  dailyStudyMinutes: number;
  dailyStudyDate: string; // YYYY-MM-DD in user's timezone
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD in user's timezone
  lastActiveTimestamp: number;
  preferredMorningTime: string;
  darkMode: boolean; // Computed active dark mode boolean
  speechRate: 'slow' | 'normal';
  skills: {
    reading: number;
    listening: number;
    speaking: number;
    writing: number;
  };
  mistakes: MistakeRecord[];
  history: StudySessionRecord[];
  teacherSession: TeacherSessionState;
}
