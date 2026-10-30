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
  source:
    | 'exercise'
    | 'teacher'
    | 'voice'
    | 'roleplay'
    | 'daily-words'
    | 'daily-questions'
    | 'daily-conversation'
    | 'daily_words'
    | 'daily_questions'
    | 'daily_conversations'
    | 'book_reading'
    | 'grammar'
    | 'accent'
    | 'pronunciation';
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
    | 'placement'
    | 'daily-words'
    | 'daily-questions'
    | 'daily-conversation'
    | 'daily_words'
    | 'daily_questions'
    | 'daily_conversations'
    | 'reading'
    | 'book_reading'
    | 'poetry'
    | 'grammar'
    | 'accent'
    | 'pronunciation';
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
  dailyGoalMinutes: number;
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

export type ReminderTopic = 'words' | 'grammar' | 'conversation' | 'all';

export interface MorningReminderSettings {
  id: string;
  userId: string;
  isEnabled?: boolean;
  enabled?: boolean;
  reminderTime?: string;
  time?: string;
  repeatDaily?: boolean;
  dailyRepeat?: boolean;
  taskCount?: number;
  dailyTaskCount?: number;
  soundEnabled: boolean;
  timezone: string;
  topic: ReminderTopic;
  lastNotifiedDate?: string;
  updatedAt: number;
}

export interface DailyWordItem {
  id: string;
  armenian: string;
  english: string;
  pronunciation: string;
  synonyms: string[];
  level: CEFRLevel;
  categoryAm: string;
  exampleEn: string;
  examplePronunciation: string;
  exampleAm: string;
}

export interface DailyWordAttemptRecord {
  id: string;
  userId: string;
  wordId: string;
  date: string;
  userAnswer: string;
  isCorrect: boolean;
  attemptNumber: number;
  hintsUsed: number;
  createdAt?: number;
  timestamp?: number;
}

export interface DailyWordChallengeState {
  id: string;
  userId: string;
  date: string;
  level?: CEFRLevel;
  wordIds?: string[];
  words: DailyWordItem[];
  currentWordIndex: number;
  totalTarget?: number;
  completedCount?: number;
  completedWordIds?: string[];
  wrongAttemptsPerWord?: Record<string, number>;
  hintsRevealedPerWord?: Record<string, number>;
  completed?: boolean;
  isCompleted?: boolean;
  completedAt?: number;
  updatedAt: number;
}

export type DailyQuestionType =
  | 'fill-blank'
  | 'translate-am-en'
  | 'correct-mistake'
  | 'answer-question'
  | 'listening-write'
  | 'speaking-mic';

export interface DailyQuestionItem {
  id: string;
  type: DailyQuestionType;
  level: CEFRLevel;
  difficultyRank: number; // 1..6
  professions?: (ProfessionId | string)[]; // Empty means general for all professions
  questionEn: string;
  questionPronunciation: string;
  questionAm: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers: string[];
  requiredKeywords?: string[];
  explanationAm: string;
  hintAm?: string;
}

export interface DailyQuestionAnswerRecord {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  correctedEn?: string;
  explanationAm: string;
  answeredAt?: number;
  timestamp?: number;
}

export interface DailyQuestionDayState {
  id: string;
  userId: string;
  date: string;
  targetCount?: number;
  totalQuestions?: number;
  questionIds?: string[];
  questions?: DailyQuestionItem[];
  currentQuestionIndex?: number;
  currentIndex?: number;
  answers: any;
  correctCount?: number;
  wrongCount?: number;
  score?: number;
  completed?: boolean;
  isCompleted?: boolean;
  completedAt?: number;
  updatedAt: number;
}

export interface DailyConversationTurn {
  stepIndex: number;
  turnNumber?: number;
  speakerRoleAm: string;
  promptEn: string;
  promptPronunciation: string;
  promptAm: string;
  sampleReplyEn: string;
  sampleReplyPronunciation: string;
  sampleReplyAm: string;
  acceptableReplies: string[];
  requiredKeywords: string[];
  grammarTipAm: string;
}

export interface DailyConversationTopic {
  id: string;
  slug: string;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
  level: CEFRLevel;
  icon: string;
  turns: DailyConversationTurn[];
}

export interface DailyConversationTurnRecord {
  stepIndex: number;
  promptEn: string;
  userReply: string;
  isAcceptable: boolean;
  correctedReplyEn: string;
  explanationAm: string;
  timestamp: number;
}

export interface DailyConversationSessionState {
  id: string;
  userId: string;
  topicId: string;
  currentTurnIndex: number;
  completed?: boolean;
  isCompleted?: boolean;
  completedTurns?: number;
  transcript?: DailyConversationTurnRecord[];
  history?: DailyConversationTurnRecord[] | any[];
  updatedAt: number;
}

export type BookCategory =
  | 'Easy English Stories'
  | 'Short Stories'
  | 'Long Stories'
  | 'English Books'
  | 'English Poetry'
  | 'Everyday Life Stories'
  | 'Technology Stories'
  | 'Work & Business English'
  | 'Advanced Reading';

export interface BookSentenceItem {
  english: string;
  pronunciation: string;
  armenian: string;
}

export interface BookChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  titleEn: string;
  titleAm: string;
  readingMinutes: number;
  paragraphs: BookSentenceItem[][];
}

export interface BookGlossaryEntry {
  wordEn: string;
  word?: string;
  pronunciation: string;
  translationAm: string;
  translation?: string;
  meaningAm?: string;
  partOfSpeechAm?: string;
  exampleEn?: string;
  exampleAm?: string;
}

export interface BookItem {
  id: string;
  titleEn: string;
  titleAm: string;
  author: string;
  level: CEFRLevel;
  category: BookCategory;
  kind: 'story' | 'book';
  totalReadingMinutes: number;
  readingMinutes?: number;
  summaryAm: string;
  chapters: BookChapter[];
  glossary: Record<string, BookGlossaryEntry>;
}

export interface PoemLineItem {
  lineNumber: number;
  english: string;
  pronunciation: string;
  armenian: string;
}

export interface PoemItem {
  id: string;
  titleEn: string;
  titleAm: string;
  author: string;
  level: CEFRLevel;
  category: 'English Poetry';
  readingMinutes: number;
  themeAm: string;
  lines: PoemLineItem[];
  unfamiliarWords: {
    wordEn: string;
    word?: string;
    pronunciation: string;
    meaningAm: string;
    explanationAm: string;
  }[];
  glossary?: {
    wordEn?: string;
    word?: string;
    pronunciation: string;
    meaningAm: string;
    explanationAm: string;
  }[];
}

export interface ReadingProgressRecord {
  id: string;
  userId: string;
  itemId: string;
  itemKind: 'book' | 'poem';
  currentChapterIndex?: number;
  currentParagraphIndex?: number;
  currentLineIndex?: number;
  currentSentenceIndex?: number;
  currentChapterId?: string;
  scrollOffset?: number;
  scrollPercentage?: number;
  progressPercent?: number;
  completedChapterIds?: string[];
  savedWords?: string[];
  isFinished?: boolean;
  lastReadAt?: number;
  updatedAt: number;
}

export interface GrammarExerciseItem {
  id: string;
  topicId: string;
  promptEn: string;
  promptAm: string;
  questionEn?: string;
  questionAm?: string;
  options: string[];
  correctAnswer: string;
  acceptableAnswers: string[];
  acceptableAlternatives?: string[];
  ruleExplanationAm: string;
  explanationAm?: string;
  errorFeedbackAm: string;
}

export interface GrammarTopicLesson {
  id: string;
  order: number;
  code: string;
  titleEn: string;
  titleAm: string;
  level: CEFRLevel;
  summaryAm: string;
  ruleAm?: string;
  formulaEn: string;
  formula?: string;
  detailedRulesAm: string[];
  examples: {
    english: string;
    pronunciation: string;
    armenian: string;
    noteAm: string;
  }[];
  exercises: GrammarExerciseItem[];
}

export interface GrammarAttemptRecord {
  id: string;
  userId: string;
  topicId: string;
  exerciseId?: string;
  userAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
  isCompleted?: boolean;
  score?: number;
  completedExercises?: string[];
  createdAt?: number;
  updatedAt?: number;
}

export type AccentVariant = 'us' | 'uk' | 'en-US' | 'en-GB';

export interface AccentPreferenceRecord {
  id?: string;
  userId: string;
  selectedAccent?: AccentVariant;
  accent?: AccentVariant;
  preferredVoiceURI_US?: string;
  preferredVoiceURI_GB?: string;
  updatedAt: number;
}

export interface PronunciationPracticeItem {
  id: string;
  moduleId: string;
  kind: 'word' | 'stress' | 'intonation' | 'minimal-pair' | 'sentence';
  targetEn: string;
  stressPattern?: string;
  intonationArrow?: 'rising' | 'falling' | 'fall-rise';
  pronunciationUS: string;
  pronunciationGB: string;
  armenian: string;
  tipAm: string;
}

export interface PronunciationModule {
  id: string;
  order: number;
  titleEn: string;
  titleAm: string;
  level: CEFRLevel;
  descriptionAm: string;
  usVsGbDiffAm: string;
  items: PronunciationPracticeItem[];
}

export interface PronunciationProgressRecord {
  id: string;
  userId: string;
  moduleId: string;
  itemId: string;
  accent: AccentVariant;
  recognizedText: string;
  matchedWords: string[];
  missingWords: string[];
  matchRatio: number;
  isCompleted: boolean;
  timestamp?: number;
  updatedAt: number;
}

export interface PageMemoryState {
  userId?: string;
  tab?: string;
  subId?: string;
  step?: number;
  mode?: string;
  activeTab?: string;
  lessonId?: string;
  lessonSentenceIndex?: number;
  exerciseCategory?: string;
  exerciseType?: string;
  exerciseIndex?: number;
  itCategory?: string;
  itScenarioId?: string;
  dailyWordDate?: string;
  dailyWordIndex?: number;
  dailyQuestionDate?: string;
  dailyQuestionIndex?: number;
  conversationTopicId?: string;
  conversationTurnIndex?: number;
  libraryMode?: 'books' | 'poetry';
  libraryCategory?: string;
  activeBookId?: string;
  activeChapterIndex?: number;
  activeParagraphIndex?: number;
  activePoemId?: string;
  activePoemLineIndex?: number;
  grammarTopicId?: string;
  grammarExerciseIndex?: number;
  accentModuleId?: string;
  accentItemIndex?: number;
  updatedAt?: number;
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

  // --- New HayLingo Features State ---
  morningReminder?: MorningReminderSettings;
  dailyWordsChallenge?: DailyWordChallengeState;
  dailyWordChallenges?: Record<string, DailyWordChallengeState>;
  dailyWordAttempts?: DailyWordAttemptRecord[];
  dailyQuestionsState?: DailyQuestionDayState;
  dailyQuestionsHistory?: Record<string, DailyQuestionDayState>;
  usedDailyQuestionIds?: string[];
  dailyQuestionsTargetCount?: number;
  dailyConversations?: Record<string, DailyConversationSessionState>;
  dailyConversationsMap?: Record<string, DailyConversationSessionState>;
  readingProgressMap?: Record<string, ReadingProgressRecord>;
  completedGrammarTopicIds?: string[];
  grammarAttempts?: GrammarAttemptRecord[];
  grammarAttemptsMap?: Record<string, GrammarAttemptRecord>;
  accentPreference?: AccentPreferenceRecord;
  pronunciationProgressMap?: Record<string, PronunciationProgressRecord>;
  pageMemory?: PageMemoryState;
}
