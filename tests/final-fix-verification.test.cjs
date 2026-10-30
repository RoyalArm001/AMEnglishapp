const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { DatabaseSync } = require('node:sqlite');

// Transpiler hook for requiring TypeScript files in CommonJS
require.extensions['.ts'] = (m, f) => {
  const content = fs.readFileSync(f, 'utf8');
  const transpiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  return m._compile(transpiled.outputText, f);
};

const {
  DEFAULT_USER_PROGRESS,
  normalizeAndValidateState,
} = require('../lib/storage.ts');

const {
  createSqliteBackupBuffer,
  parseSqliteBackupBuffer,
} = require('../lib/sqlite-server.ts');

const {
  normalizeDisplaySettings,
} = require('../lib/display-settings.ts');

// =========================================================================
// TEST SUITE 1: Full SQLite Export -> Import -> Deep Equality Round Trip
// =========================================================================
test('Full SQLite .db Export -> Import: Complete State Comparison', () => {
  const fullState = structuredClone(DEFAULT_USER_PROGRESS);
  fullState.profile = {
    firstName: 'Արամ',
    lastName: 'Մանուկյան',
    age: 32,
    profession: 'Software Developer',
    level: 'B2',
    learningGoal: 'career',
    onboardingCompleted: true,
    createdAt: 1730000000000,
  };
  fullState.level = 'B2';
  fullState.completedLessonIds = ['lesson-1-days', 'lesson-2-months', 'lesson-3-colors'];
  fullState.completedExerciseIds = ['ex-vocab-1', 'ex-grammar-1'];
  fullState.streakDays = 7;
  fullState.totalStudyMinutes = 145;
  fullState.settings = {
    ...fullState.settings,
    displayMode: 'desktop',
    keepScreenAwake: true,
    autoPlayAudio: true,
    themeMode: 'dark',
    timezone: 'Asia/Yerevan',
    fontSizes: { interface: 18, english: 22, pronunciation: 18, armenian: 18 },
  };
  fullState.readingProgressMap = {
    'book-clockmaker': {
      id: 'read-book-clockmaker',
      userId: 'user-main',
      itemId: 'book-clockmaker',
      itemKind: 'book',
      currentSentenceIndex: 5,
      currentChapterId: 'ch-1',
      scrollPercentage: 35,
      isFinished: false,
      lastReadAt: 1730000500000,
    },
  };
  fullState.grammarAttemptsMap = {
    'grammar-topic-1': {
      id: 'gram-grammar-topic-1',
      userId: 'user-main',
      topicId: 'grammar-topic-1',
      isCompleted: true,
      score: 4,
      completedExercises: [0, 1, 2, 3],
      updatedAt: 1730000600000,
    },
  };
  fullState.dailyConversationsMap = {
    'conv-morning-coffee': {
      id: 'conv-morning-coffee',
      userId: 'user-main',
      topicId: 'conv-morning-coffee',
      currentTurnIndex: 3,
      isCompleted: false,
      completedTurns: 3,
      history: [],
      updatedAt: 1730000700000,
    },
  };
  fullState.dailyWordsChallenge = {
    id: 'dw-2026-10-30',
    userId: 'user-main',
    date: '2026-10-30',
    words: [
      { id: 'w1', english: 'Innovate', armenian: 'Նորարարել', level: 'B2', category: 'General' },
      { id: 'w2', english: 'Resilient', armenian: 'Ճկուն', level: 'B2', category: 'General' },
      { id: 'w3', english: 'Optimize', armenian: 'Օպտիմալացնել', level: 'B2', category: 'General' },
    ],
    currentWordIndex: 2,
    completedCount: 2,
    isCompleted: false,
    updatedAt: 1730000800000,
  };

  // 1. Export
  const backupBuffer = createSqliteBackupBuffer(fullState);
  assert.ok(backupBuffer instanceof Uint8Array);
  assert.ok(backupBuffer.byteLength >= 4096);

  // 2. Validate header
  const header = Buffer.from(backupBuffer.subarray(0, 16)).toString('utf8');
  assert.equal(header, 'SQLite format 3\0');

  // 3. Import
  const parseRes = parseSqliteBackupBuffer(backupBuffer);
  assert.equal(parseRes.ok, true, `Parse failed: ${parseRes.errorAm}`);
  const restored = parseRes.data;

  // 4. Detailed comparison
  assert.equal(restored.profile.firstName, 'Արամ');
  assert.equal(restored.profile.lastName, 'Մանուկյան');
  assert.equal(restored.profile.profession, 'Software Developer');
  assert.equal(restored.level, 'B2');
  assert.equal(restored.settings.displayMode, 'desktop');
  assert.equal(restored.settings.autoPlayAudio, true);
  assert.equal(restored.settings.keepScreenAwake, true);
  assert.equal(restored.settings.fontSizes.english, 22);

  // 5. Reading progress comparison
  assert.equal(restored.readingProgressMap['book-clockmaker'].currentSentenceIndex, 5);
  assert.equal(restored.readingProgressMap['book-clockmaker'].scrollPercentage, 35);

  // 6. Grammar progress comparison
  assert.equal(restored.grammarAttemptsMap['grammar-topic-1'].isCompleted, true);
  assert.equal(restored.grammarAttemptsMap['grammar-topic-1'].score, 4);

  // 7. Conversation progress comparison
  assert.equal(restored.dailyConversationsMap['conv-morning-coffee'].currentTurnIndex, 3);
  assert.equal(restored.dailyConversationsMap['conv-morning-coffee'].completedTurns, 3);

  // 8. Daily words comparison
  assert.equal(restored.dailyWordsChallenge.date, '2026-10-30');
  assert.equal(restored.dailyWordsChallenge.words.length, 3);
  assert.equal(restored.dailyWordsChallenge.currentWordIndex, 2);

  // 9. Normalized state validation
  const validated = normalizeAndValidateState(restored);
  assert.equal(validated.profile.firstName, 'Արամ');
  assert.equal(validated.settings.autoPlayAudio, true);
  assert.equal(validated.settings.displayMode, 'desktop');
});

// =========================================================================
// TEST SUITE 2: Display Mode Normalization & Override Logic
// =========================================================================
test('Display Mode: auto, desktop and mobile manual modes validate correctly', () => {
  const sAuto = normalizeDisplaySettings({ displayMode: 'auto' }, 'user-1');
  assert.equal(sAuto.displayMode, 'auto');

  const sDesktop = normalizeDisplaySettings({ displayMode: 'desktop' }, 'user-1');
  assert.equal(sDesktop.displayMode, 'desktop');

  const sMobile = normalizeDisplaySettings({ displayMode: 'mobile' }, 'user-1');
  assert.equal(sMobile.displayMode, 'mobile');

  // Corrupted value falls back to 'auto'
  const sInvalid = normalizeDisplaySettings({ displayMode: 'widescreen' }, 'user-1');
  assert.equal(sInvalid.displayMode, 'auto');
});

// =========================================================================
// TEST SUITE 3: Screen Wake Lock Setting & State Lifecycle
// =========================================================================
test('Screen Wake Lock: Setting toggle, fallback and persistence', () => {
  const enabled = normalizeDisplaySettings({ keepScreenAwake: true }, 'user-1');
  assert.equal(enabled.keepScreenAwake, true);

  const disabled = normalizeDisplaySettings({ keepScreenAwake: false }, 'user-1');
  assert.equal(disabled.keepScreenAwake, false);

  // Non-boolean falls back to default true
  const fallback = normalizeDisplaySettings({ keepScreenAwake: 'yes' }, 'user-1');
  assert.equal(fallback.keepScreenAwake, true);
});

// =========================================================================
// TEST SUITE 4: Auto Play Audio Setting
// =========================================================================
test('Auto Play Audio: autoPlayAudio flag survives state normalization', () => {
  const stateWithAudio = structuredClone(DEFAULT_USER_PROGRESS);
  stateWithAudio.settings.autoPlayAudio = true;
  const validated = normalizeAndValidateState(stateWithAudio);
  assert.equal(validated.settings.autoPlayAudio, true);

  const stateWithoutAudio = structuredClone(DEFAULT_USER_PROGRESS);
  stateWithoutAudio.settings.autoPlayAudio = false;
  const validatedOff = normalizeAndValidateState(stateWithoutAudio);
  assert.equal(validatedOff.settings.autoPlayAudio, false);
});
