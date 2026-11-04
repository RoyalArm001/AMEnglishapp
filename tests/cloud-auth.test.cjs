const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (m, f) =>
  m._compile(
    ts.transpileModule(fs.readFileSync(f, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText,
    f
  );

const {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  parseSessionToken,
  isMongoConfigured,
} = require('../lib/mongodb.ts');

const {
  isCoursePageUnlocked,
  getPassedLessonsForSpeedCheck,
  getPassedCourseSentences,
} = require('../lib/learning-path.ts');

const { DEFAULT_USER_PROGRESS } = require('../lib/storage.ts');
const { LESSONS_DATA } = require('../data/lessons.ts');

test('hashPassword creates a non-empty salt and 128-char hex hash', () => {
  const result = hashPassword('mySecurePassword123');
  assert.ok(result.salt && result.salt.length === 32, 'Salt should be 32 hex chars (16 bytes)');
  assert.ok(result.hash && result.hash.length === 128, 'Hash should be 128 hex chars (64 bytes)');
});

test('verifyPassword verifies matching password and rejects incorrect password', () => {
  const password = 'CorrectPassword#2026';
  const { salt, hash } = hashPassword(password);

  assert.equal(verifyPassword(password, salt, hash), true, 'Correct password should pass');
  assert.equal(verifyPassword('WrongPassword', salt, hash), false, 'Wrong password should fail');
  assert.equal(verifyPassword('', salt, hash), false, 'Empty password should fail');
});

test('generateSessionToken and parseSessionToken round-trip cleanly', () => {
  const userId = 'usr_test_12345';
  const token = generateSessionToken(userId);
  assert.ok(typeof token === 'string' && token.length > 20);

  const parsed = parseSessionToken(token);
  assert.ok(parsed !== null);
  assert.equal(parsed.userId, userId);
  assert.ok(typeof parsed.timestamp === 'number' && parsed.timestamp > 0);
});

test('parseSessionToken rejects malformed or invalid tokens', () => {
  assert.equal(parseSessionToken(''), null);
  assert.equal(parseSessionToken('invalid_non_base64_???'), null);
  assert.equal(parseSessionToken('not-a-token'), null);
});

test('isMongoConfigured returns a boolean', () => {
  const configured = isMongoConfigured();
  assert.equal(typeof configured, 'boolean');
});

test('Speed Check tab is unlocked in sidebar alongside Lessons', () => {
  const fresh = structuredClone(DEFAULT_USER_PROGRESS);
  assert.equal(isCoursePageUnlocked(fresh, 'Speed Check'), true);
  assert.equal(isCoursePageUnlocked(fresh, 'Lessons'), true);
});

test('getPassedLessonsForSpeedCheck and getPassedCourseSentences return only passed lessons and words', () => {
  const fresh = structuredClone(DEFAULT_USER_PROGRESS);
  assert.equal(getPassedLessonsForSpeedCheck(fresh).length, 0);
  assert.equal(getPassedCourseSentences(fresh, 'all').length, 0);

  const firstLesson = LESSONS_DATA[0];
  const progressWithStep = {
    ...fresh,
    learningPath: {
      ...fresh.learningPath,
      writtenSentenceIds: [firstLesson.sentences[0].id, firstLesson.sentences[1].id],
      verifiedSentenceIds: [firstLesson.sentences[0].id, firstLesson.sentences[1].id],
    },
  };

  const partialGroups = getPassedLessonsForSpeedCheck(progressWithStep);
  assert.equal(partialGroups.length, 1);
  assert.equal(partialGroups[0].lesson.id, firstLesson.id);
  assert.equal(partialGroups[0].passedSentences.length, 2);

  const progressWithCompletedLesson = {
    ...fresh,
    completedLessonIds: [firstLesson.id],
  };

  const fullGroups = getPassedLessonsForSpeedCheck(progressWithCompletedLesson);
  assert.equal(fullGroups.length, 1);
  assert.equal(fullGroups[0].isFullyCompleted, true);
  assert.equal(
    getPassedCourseSentences(progressWithCompletedLesson, firstLesson.id).length,
    firstLesson.sentences.length
  );
});
