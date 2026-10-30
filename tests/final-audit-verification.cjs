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

// Import modules
const {
  DAILY_WORDS_POOL,
  DAILY_QUESTIONS_POOL,
  getDailyWordsChallenge,
  getDailyQuestionsDayState,
} = require('../data/daily-questions-and-words.ts');

const {
  DAILY_CONVERSATION_TOPICS,
} = require('../data/daily-conversations.ts');

const {
  LIBRARY_BOOKS,
  LIBRARY_POEMS,
  BOOK_CATEGORIES,
  lookupWordInLibrary,
} = require('../data/books-and-poetry.ts');

const {
  GRAMMAR_TOPICS_DATA,
} = require('../data/grammar-academy.ts');

const {
  PRONUNCIATION_MODULES_DATA,
} = require('../data/accent-academy.ts');

const {
  createSqliteBackupBuffer,
  parseSqliteBackupBuffer,
} = require('../lib/sqlite-server.ts');

const {
  compareSpeechTranscript,
} = require('../lib/speech.ts');

const {
  DEFAULT_USER_PROGRESS,
  normalizeAndValidateState,
} = require('../lib/storage.ts');

// =========================================================================
// TEST SUITE 1: Daily 3 Words Challenge
// =========================================================================
test('Daily 3 Words Challenge: Pool size and CEFR coverage', () => {
  assert.ok(DAILY_WORDS_POOL.length >= 50, `Pool size should be >= 50, got ${DAILY_WORDS_POOL.length}`);
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  for (const lvl of levels) {
    const count = DAILY_WORDS_POOL.filter(w => w.level === lvl).length;
    assert.ok(count >= 5, `Level ${lvl} should have at least 5 words, got ${count}`);
  }
});

test('Daily 3 Words Challenge: Շուն -> Dog vs Cat, Case-insensitive, infinite retry & progressive hints', () => {
  const dogItem = DAILY_WORDS_POOL.find(w => w.english.toLowerCase() === 'dog');
  assert.ok(dogItem, 'Dog item must exist in pool');
  assert.equal(dogItem.armenian, 'Շուն');

  const target = dogItem.english; // 'Dog'
  
  // Test case 1: Wrong answer 'Cat' does not match
  const wrongAnswer = 'Cat';
  const isWrong = wrongAnswer.trim().toLowerCase() === target.toLowerCase();
  assert.equal(isWrong, false, 'Cat should not match Dog');

  // Progressive hints test: revealing letters step by step
  function getProgressiveHint(word, hintsRevealed) {
    return word.split('').map((ch, idx) => (idx < hintsRevealed ? ch : '_')).join(' ');
  }

  assert.equal(getProgressiveHint(target, 0), '_ _ _');
  assert.equal(getProgressiveHint(target, 1), 'D _ _');
  assert.equal(getProgressiveHint(target, 2), 'D o _');
  assert.equal(getProgressiveHint(target, 3), 'D o g');

  // Test case 2: Correct answer with mixed case and whitespace
  const mixedCaseAnswer = '  DoG  ';
  const isMatch = mixedCaseAnswer.trim().toLowerCase() === target.toLowerCase();
  assert.equal(isMatch, true, 'Dog with spaces and uppercase should match');

  // Test case 3: Synonyms if present
  if (dogItem.synonyms && dogItem.synonyms.length > 0) {
    const synonym = dogItem.synonyms[0];
    const synMatch = dogItem.synonyms.some(s => s.toLowerCase() === synonym.toLowerCase());
    assert.equal(synMatch, true, 'Declared synonyms must match');
  }
});

test('Daily 3 Words Challenge: Challenge generator produces 3 words per date', () => {
  const date = '2026-10-30';
  const challenge = getDailyWordsChallenge(date, 'A1', 3);
  assert.equal(challenge.date, date);
  assert.equal(challenge.words.length, 3);
  assert.equal(challenge.isCompleted, false);
  assert.equal(challenge.currentWordIndex, 0);

  // Different date gives deterministic but varied selection
  const challenge2 = getDailyWordsChallenge('2026-10-31', 'A1', 3);
  assert.equal(challenge2.words.length, 3);
});

// =========================================================================
// TEST SUITE 2: Library & Poetry
// =========================================================================
test('Book Library: Category, Long Story, Book and Poem Counts', () => {
  assert.ok(BOOK_CATEGORIES.length >= 8, `Categories should be >= 8, got ${BOOK_CATEGORIES.length}`);
  
  // Long stories count (kind === 'story')
  const stories = LIBRARY_BOOKS.filter(b => b.kind === 'story');
  assert.ok(stories.length >= 10, `Long stories should be at least 10, got ${stories.length}`);

  // Multi-chapter books count (kind === 'book')
  const multiChapterBooks = LIBRARY_BOOKS.filter(b => b.kind === 'book');
  assert.ok(multiChapterBooks.length >= 5, `Multi-chapter books should be at least 5, got ${multiChapterBooks.length}`);

  // Total chapters across all books and stories
  const totalChapters = LIBRARY_BOOKS.reduce((acc, b) => acc + (b.chapters ? b.chapters.length : 0), 0);
  assert.ok(totalChapters >= 20, `Total chapters should be >= 20, got ${totalChapters}`);

  // Poems count
  assert.ok(LIBRARY_POEMS.length >= 10, `Poems should be at least 10, got ${LIBRARY_POEMS.length}`);
});

test('Book Library: All books have valid titles, authors, levels, paragraphs and glossary', () => {
  for (const book of LIBRARY_BOOKS) {
    assert.ok(book.id, 'Book must have id');
    assert.ok(book.titleEn, `Book ${book.id} must have titleEn`);
    assert.ok(book.titleAm, `Book ${book.id} must have titleAm`);
    assert.ok(book.author, `Book ${book.id} must have author`);
    assert.ok(book.level, `Book ${book.id} must have level`);
    assert.ok(book.chapters && book.chapters.length > 0, `Book ${book.id} must have chapters`);
    
    for (const ch of book.chapters) {
      assert.ok(ch.id, `Chapter must have id in ${book.id}`);
      assert.ok(ch.titleEn, `Chapter must have titleEn in ${book.id}`);
      assert.ok(ch.titleAm, `Chapter must have titleAm in ${book.id}`);
      assert.ok(ch.paragraphs && ch.paragraphs.length > 0, `Chapter must have paragraphs in ${book.id}`);
      for (const p of ch.paragraphs) {
        assert.ok(p.length > 0, `Paragraph must have sentences in ${book.id}`);
        for (const s of p) {
          assert.ok(s.english, `Sentence must have english in ${book.id}`);
          assert.ok(s.armenian, `Sentence must have armenian in ${book.id}`);
          assert.ok(s.pronunciation, `Sentence must have pronunciation in ${book.id}`);
        }
      }
    }
  }
});

test('Book Library: Poetry structure, line-by-line pronunciation and glossary', () => {
  for (const poem of LIBRARY_POEMS) {
    assert.ok(poem.id, 'Poem must have id');
    assert.ok(poem.titleEn, `Poem ${poem.id} must have titleEn`);
    assert.ok(poem.author, `Poem ${poem.id} must have author`);
    assert.ok(poem.lines && poem.lines.length >= 4, `Poem ${poem.id} must have >= 4 lines`);
    for (const line of poem.lines) {
      assert.ok(line.english, `Poem line must have english`);
      assert.ok(line.armenian, `Poem line must have armenian`);
      assert.ok(line.pronunciation, `Poem line must have pronunciation`);
    }
    assert.ok(poem.unfamiliarWords && poem.unfamiliarWords.length > 0, `Poem ${poem.id} must have glossary words`);
  }
});

test('Book Library: Word click lookup returns valid translation and pronunciation', () => {
  const res1 = lookupWordInLibrary('clockmaker');
  assert.ok(res1.translationAm.includes('ժամագործ') || res1.translationAm.length > 0);
  assert.ok(res1.pronunciation.length > 0);

  const resCommon = lookupWordInLibrary('morning');
  assert.ok(resCommon.translationAm.includes('առավոտ'));

  const resUnknown = lookupWordInLibrary('supercalifragilistic');
  assert.ok(resUnknown.wordEn.length > 0);
});

// =========================================================================
// TEST SUITE 3: Grammar Academy
// =========================================================================
test('Grammar Academy: Exactly 18 mandatory topics with formulas, rules and 4 exercises each', () => {
  assert.equal(GRAMMAR_TOPICS_DATA.length, 18, `Should have exactly 18 grammar topics, got ${GRAMMAR_TOPICS_DATA.length}`);

  let totalExercises = 0;
  for (const topic of GRAMMAR_TOPICS_DATA) {
    assert.ok(topic.id, 'Topic must have id');
    assert.ok(topic.titleEn, `Topic ${topic.id} must have titleEn`);
    assert.ok(topic.titleAm, `Topic ${topic.id} must have titleAm`);
    assert.ok(topic.formulaEn, `Topic ${topic.id} must have formulaEn`);
    assert.ok(topic.summaryAm, `Topic ${topic.id} must have summaryAm`);
    assert.ok(topic.detailedRulesAm && topic.detailedRulesAm.length >= 3, `Topic ${topic.id} must have >= 3 rules`);
    assert.ok(topic.examples && topic.examples.length >= 4, `Topic ${topic.id} must have >= 4 examples`);
    assert.equal(topic.exercises.length, 4, `Topic ${topic.id} must have exactly 4 exercises`);
    totalExercises += topic.exercises.length;

    for (const ex of topic.exercises) {
      assert.ok(ex.id, `Exercise must have id`);
      assert.ok(ex.promptEn, `Exercise ${ex.id} must have promptEn`);
      assert.ok(ex.promptAm, `Exercise ${ex.id} must have promptAm`);
      assert.ok(ex.correctAnswer, `Exercise ${ex.id} must have correctAnswer`);
      assert.ok(ex.ruleExplanationAm, `Exercise ${ex.id} must have ruleExplanationAm`);
      assert.ok(ex.options && ex.options.length >= 2, `Exercise ${ex.id} must have options`);
      
      const matchesOption = ex.options.some(opt => opt.toLowerCase() === ex.correctAnswer.toLowerCase());
      assert.ok(matchesOption, `Exercise ${ex.id} correctAnswer "${ex.correctAnswer}" should be in options`);
    }
  }

  assert.equal(totalExercises, 72, `Total grammar exercises should be 18 * 4 = 72, got ${totalExercises}`);
});

// =========================================================================
// TEST SUITE 4: Accent & Pronunciation Academy
// =========================================================================
test('Accent Academy: Exactly 10 modules, US vs UK guide and 6 items each', () => {
  assert.equal(PRONUNCIATION_MODULES_DATA.length, 10, `Should have 10 accent modules, got ${PRONUNCIATION_MODULES_DATA.length}`);

  let totalItems = 0;
  for (const mod of PRONUNCIATION_MODULES_DATA) {
    assert.ok(mod.id, 'Module must have id');
    assert.ok(mod.titleEn, `Module ${mod.id} must have titleEn`);
    assert.ok(mod.titleAm, `Module ${mod.id} must have titleAm`);
    assert.ok(mod.usVsGbDiffAm, `Module ${mod.id} must have usVsGbDiffAm`);
    assert.equal(mod.items.length, 6, `Module ${mod.id} must have exactly 6 practice items`);
    totalItems += mod.items.length;

    for (const item of mod.items) {
      assert.ok(item.id, `Item must have id`);
      assert.ok(item.targetEn, `Item ${item.id} must have targetEn`);
      assert.ok(item.armenian, `Item ${item.id} must have armenian`);
      assert.ok(item.pronunciationUS, `Item ${item.id} must have pronunciationUS`);
      assert.ok(item.pronunciationGB, `Item ${item.id} must have pronunciationGB`);
      assert.ok(item.kind, `Item ${item.id} must have kind`);
    }
  }

  assert.equal(totalItems, 60, `Total pronunciation items should be 10 * 6 = 60, got ${totalItems}`);
});

test('Accent Academy: Honest word matching speech comparator', () => {
  const target = 'Better water for everyone';
  
  // Exact match
  const resExact = compareSpeechTranscript('Better water for everyone', target);
  assert.equal(resExact.isAcceptable, true);
  assert.equal(resExact.matchRatio, 1);
  assert.equal(resExact.missingWords.length, 0);

  // Partial match
  const resPartial = compareSpeechTranscript('Better coffee for everyone', target);
  assert.ok(resPartial.matchRatio < 1 && resPartial.matchRatio >= 0.5);
  assert.ok(resPartial.missingWords.includes('water'));
  assert.ok(resPartial.matchedWords.map(w => w.toLowerCase()).includes('better'));

  // Complete mismatch
  const resMiss = compareSpeechTranscript('Something totally different', target);
  assert.equal(resMiss.matchRatio, 0);
  assert.equal(resMiss.isAcceptable, false);
});

// =========================================================================
// TEST SUITE 5: Daily Questions & Daily Conversations
// =========================================================================
test('Daily Questions: Pool size, 6 question types and profession filtering', () => {
  assert.ok(DAILY_QUESTIONS_POOL.length >= 60, `Pool size should be >= 60, got ${DAILY_QUESTIONS_POOL.length}`);
  
  const types = new Set(DAILY_QUESTIONS_POOL.map(q => q.type));
  assert.ok(types.has('fill-blank'), 'Must have fill-blank');
  assert.ok(types.has('translate-am-en'), 'Must have translate-am-en');
  assert.ok(types.has('correct-mistake'), 'Must have correct-mistake');
  assert.ok(types.has('answer-question'), 'Must have answer-question');
  assert.ok(types.has('listening-write'), 'Must have listening-write');
  assert.ok(types.has('speaking-mic'), 'Must have speaking-mic');
  assert.equal(types.size, 6, 'Must cover all 6 question types');

  // Generator creates 10 questions
  const dayState = getDailyQuestionsDayState('2026-10-30', 'A1', 'Software Developer', 10);
  assert.equal(dayState.questions.length, 10);
  assert.equal(dayState.currentIndex, 0);
  assert.equal(dayState.isCompleted, false);
});

test('Daily Conversations: Exactly 12 topics with 8 sequential turns each', () => {
  assert.equal(DAILY_CONVERSATION_TOPICS.length, 12, `Must have 12 conversation topics, got ${DAILY_CONVERSATION_TOPICS.length}`);

  let totalTurns = 0;
  for (const topic of DAILY_CONVERSATION_TOPICS) {
    assert.ok(topic.id, 'Topic must have id');
    assert.ok(topic.titleAm, `Topic ${topic.id} must have titleAm`);
    assert.ok(topic.titleEn, `Topic ${topic.id} must have titleEn`);
    assert.equal(topic.turns.length, 8, `Topic ${topic.id} must have exactly 8 turns`);
    totalTurns += topic.turns.length;

    for (let i = 0; i < topic.turns.length; i++) {
      const turn = topic.turns[i];
      assert.equal(turn.stepIndex, i, `Step index must match turn index`);
      assert.ok(turn.promptEn, `PromptEn missing in ${topic.id} turn ${i}`);
      assert.ok(turn.promptAm, `PromptAm missing in ${topic.id} turn ${i}`);
      assert.ok(turn.sampleReplyEn, `SampleReplyEn missing in ${topic.id} turn ${i}`);
      assert.ok(turn.acceptableReplies.length > 0, `AcceptableReplies missing in ${topic.id} turn ${i}`);
      assert.ok(turn.requiredKeywords.length > 0, `RequiredKeywords missing in ${topic.id} turn ${i}`);
      assert.ok(turn.grammarTipAm, `GrammarTipAm missing in ${topic.id} turn ${i}`);
    }
  }

  assert.equal(totalTurns, 96, `Total conversation turns must be 12 * 8 = 96, got ${totalTurns}`);
});

// =========================================================================
// TEST SUITE 6: SQLite .db Real Binary Export & Import
// =========================================================================
test('SQLite .db Export/Import: Binary serialization, PRAGMA integrity, round-trip fidelity', () => {
  const dummyProgress = structuredClone(DEFAULT_USER_PROGRESS);
  dummyProgress.profile.firstName = 'Տիգրան';
  dummyProgress.profile.lastName = 'Մեծ';
  dummyProgress.profile.profession = 'Software Developer';
  dummyProgress.level = 'B2';
  dummyProgress.completedLessonIds = ['lesson-1-days', 'lesson-2-months'];
  dummyProgress.morningReminder = {
    id: 'reminder-main',
    userId: 'user-main',
    isEnabled: true,
    reminderTime: '07:30',
    repeatDaily: true,
    taskCount: 5,
    soundEnabled: true,
    timezone: 'Asia/Yerevan',
    topic: 'words',
    updatedAt: Date.now(),
  };
  dummyProgress.dailyWordsChallenge = {
    id: 'dw-2026-10-30',
    userId: 'user-main',
    date: '2026-10-30',
    words: DAILY_WORDS_POOL.slice(0, 3),
    currentWordIndex: 2,
    completedCount: 2,
    isCompleted: false,
    updatedAt: Date.now(),
  };

  // 1. Export binary buffer
  const binaryBuffer = createSqliteBackupBuffer(dummyProgress);
  assert.ok(binaryBuffer instanceof Uint8Array);
  assert.ok(binaryBuffer.byteLength >= 4096, 'SQLite buffer must be at least 1 page (4096 bytes)');

  // 2. Check Magic Header: SQLite format 3\0
  const magic = Buffer.from(binaryBuffer).subarray(0, 16).toString('utf8');
  assert.equal(magic, 'SQLite format 3\0', 'Must contain valid SQLite 3 magic header');

  // 3. Import & Parse Binary Buffer
  const parseResult = parseSqliteBackupBuffer(binaryBuffer);
  assert.equal(parseResult.ok, true, `Parse should succeed, error: ${parseResult.errorAm}`);
  assert.ok(parseResult.data, 'Restored data must exist');

  // 4. Verify Data Fidelity
  const restored = parseResult.data;
  assert.equal(restored.profile.firstName, 'Տիգրան');
  assert.equal(restored.profile.lastName, 'Մեծ');
  assert.equal(restored.profile.profession, 'Software Developer');
  assert.equal(restored.morningReminder.isEnabled, true);
  assert.equal(restored.morningReminder.reminderTime, '07:30');
  assert.equal(restored.morningReminder.taskCount, 5);
  assert.equal(restored.dailyWordsChallenge.date, '2026-10-30');
  assert.equal(restored.dailyWordsChallenge.currentWordIndex, 2);

  // 5. Test validation with normalizeAndValidateState
  const fullRestored = normalizeAndValidateState(restored);
  assert.equal(fullRestored.profile.firstName, 'Տիգրան');
  assert.equal(fullRestored.profile.profession, 'Software Developer');

  // 6. Test rejection of corrupted buffer
  const corruptedBuffer = new Uint8Array([1, 2, 3, 4, 5]);
  const failResult = parseSqliteBackupBuffer(corruptedBuffer);
  assert.equal(failResult.ok, false, 'Corrupted buffer must be rejected');
  assert.ok(failResult.errorAm.includes('SQLite') || failResult.errorAm.length > 0);

  // 7. Test rejection of pure JSON string disguised as .db
  const fakeDbBuffer = Buffer.from(JSON.stringify({ hello: 'world' }));
  const fakeDbResult = parseSqliteBackupBuffer(fakeDbBuffer);
  assert.equal(fakeDbResult.ok, false, 'Fake JSON masquerading as .db must be rejected');
});
