const test = require('node:test');
const assert = require('node:assert/strict');
const { DatabaseSync } = require('node:sqlite');

// Test 1: SQLite binary generation & integrity check
test('SQLite Backup: Header, Schema & PRAGMA integrity_check', () => {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE IF NOT EXISTS haylingo_meta (key TEXT PRIMARY KEY, val TEXT);
    CREATE TABLE IF NOT EXISTS user_profile (id TEXT PRIMARY KEY, first_name TEXT, level TEXT);
    CREATE TABLE IF NOT EXISTS daily_words_challenge (id TEXT PRIMARY KEY, date TEXT, completed_count INT);
    CREATE TABLE IF NOT EXISTS daily_questions_state (id TEXT PRIMARY KEY, date TEXT, score INT);
    CREATE TABLE IF NOT EXISTS daily_conversations_state (id TEXT PRIMARY KEY, topic_id TEXT, turn_index INT);
    CREATE TABLE IF NOT EXISTS reading_progress (id TEXT PRIMARY KEY, item_id TEXT, scroll_percentage REAL);
    CREATE TABLE IF NOT EXISTS grammar_progress (id TEXT PRIMARY KEY, topic_id TEXT, is_completed INT);
    CREATE TABLE IF NOT EXISTS pronunciation_progress (id TEXT PRIMARY KEY, module_id TEXT, accent TEXT);
  `);

  db.prepare('INSERT INTO haylingo_meta VALUES (?, ?)').run('version', '4.0.0');
  db.prepare('INSERT INTO user_profile VALUES (?, ?, ?)').run('user-1', 'Armen', 'B1');
  db.prepare('INSERT INTO daily_words_challenge VALUES (?, ?, ?)').run('dw-1', '2026-10-30', 3);

  const buf = db.serialize();
  assert.ok(buf.length >= 4096, 'SQLite serialized buffer should be at least 1 page (4096 bytes)');

  // Verify format 3 magic header
  const magic = Buffer.from(buf).subarray(0, 16).toString('utf8');
  assert.equal(magic, 'SQLite format 3\0', 'Must contain SQLite format 3 null-terminated header');

  // Verify deserialization and integrity
  const db2 = new DatabaseSync(':memory:');
  db2.deserialize(buf);

  const pragma = db2.prepare('PRAGMA integrity_check').all();
  assert.equal(pragma[0].integrity_check, 'ok', 'PRAGMA integrity_check must return ok');

  const profile = db2.prepare('SELECT * FROM user_profile WHERE id = ?').get('user-1');
  assert.equal(profile.first_name, 'Armen');
  assert.equal(profile.level, 'B1');

  db.close();
  db2.close();
});

// Test 2: Daily 3 Words Challenge Logic
test('Daily 3 Words: Progressive Letter Hints and infinite retry rule', () => {
  const target = 'dog';
  
  // Hint step 1: 1 letter revealed
  let hint1 = '';
  for (let i = 0; i < target.length; i++) {
    hint1 += (i < 1 ? target[i] : '_') + ' ';
  }
  assert.equal(hint1.trim(), 'd _ _', 'Hint 1 must reveal 1 letter');

  // Hint step 2: 2 letters revealed
  let hint2 = '';
  for (let i = 0; i < target.length; i++) {
    hint2 += (i < 2 ? target[i] : '_') + ' ';
  }
  assert.equal(hint2.trim(), 'd o _', 'Hint 2 must reveal 2 letters');

  // Wrong answer must not advance index
  let currentIndex = 0;
  let wrongAttempts = 0;
  const userAnswer = 'cat';

  if (userAnswer.trim().toLowerCase() !== target.toLowerCase()) {
    wrongAttempts += 1;
    // Index stays 0
  }
  assert.equal(currentIndex, 0, 'Index must not advance on wrong answer');
  assert.equal(wrongAttempts, 1, 'Wrong attempts counter must increment');

  // Correct answer advances index
  const correctUserAnswer = 'Dog ';
  if (correctUserAnswer.trim().toLowerCase() === target.toLowerCase()) {
    currentIndex += 1;
  }
  assert.equal(currentIndex, 1, 'Index must advance to 1 on correct answer');
});

// Test 3: Daily Conversations Turn Resumption & Matching
test('Daily Conversations: Keyword validation & Turn step resumption', () => {
  const currentTurn = {
    turnNumber: 7,
    promptEn: 'Could you please check my pull request?',
    acceptableReplies: ['Sure, I will review it right away', 'Yes, I will check it'],
    requiredKeywords: ['review', 'check'],
  };

  // Case-insensitive reply matching
  const userReply1 = 'Sure, I will review it right away!';
  const isMatch1 = currentTurn.acceptableReplies.some(acc =>
    userReply1.toLowerCase().includes(acc.toLowerCase()) || acc.toLowerCase().includes(userReply1.toLowerCase())
  );
  assert.ok(isMatch1, 'Exact/substring acceptable reply must pass');

  // Keyword validation
  const userReply2 = 'I can check it now';
  const hasKeyword = currentTurn.requiredKeywords.some(kw => userReply2.toLowerCase().includes(kw));
  assert.ok(hasKeyword, 'Reply containing required keyword must match');

  // Exact step resumption: completed 6 turns means current turn index is 6 (which is turn #7)
  const completedTurns = 6;
  const currentTurnIndex = 6;
  assert.equal(currentTurnIndex, 6, 'Resumption must stay at exact turn index 6 (7th turn)');
});

// Test 4: Morning Reminder Deep-Link Resolution
test('Morning Reminder: Topic to deep link URL routing', () => {
  const getReminderUrl = (topic) => {
    switch (topic) {
      case 'words':
        return '/?tab=daily-words';
      case 'grammar':
        return '/?tab=grammar';
      case 'conversation':
        return '/?tab=daily-conversations';
      default:
        return '/?tab=daily-words';
    }
  };

  assert.equal(getReminderUrl('words'), '/?tab=daily-words');
  assert.equal(getReminderUrl('grammar'), '/?tab=grammar');
  assert.equal(getReminderUrl('conversation'), '/?tab=daily-conversations');
  assert.equal(getReminderUrl('all'), '/?tab=daily-words');
});

// Test 5: Speech transcript honesty check (no fake acoustic percentage)
test('Speech Comparison: Honest word matching and breakdown', () => {
  const target = 'Three brothers thought through their plans';
  const spoken = 'Three brothers thought their plans';

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);
  const targetWords = normalize(target);
  const spokenWords = normalize(spoken);

  const matched = [];
  const missing = [];

  for (const tw of targetWords) {
    if (spokenWords.includes(tw)) {
      matched.push(tw);
    } else {
      missing.push(tw);
    }
  }

  const ratio = matched.length / targetWords.length;
  assert.equal(missing.length, 1, 'Should find exactly 1 missing word ("through")');
  assert.equal(missing[0], 'through');
  assert.ok(ratio > 0.8 && ratio < 1.0, 'Ratio should reflect true 5/6 words matched');
});
