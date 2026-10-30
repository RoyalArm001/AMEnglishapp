import {
  UserProfileRecord,
  UserSettingsRecord,
  UserProgressData,
  ProfessionId,
  MorningReminderSettings,
  DailyWordChallengeState,
  DailyWordAttemptRecord,
  DailyQuestionDayState,
  DailyConversationSessionState,
  ReadingProgressRecord,
  GrammarAttemptRecord,
  PronunciationProgressRecord,
  AccentPreferenceRecord,
  SRSWordState,
  StudySessionRecord,
  LessonProgressRecord,
  AchievementRecord,
} from './types';

/**
 * Creates SQLite 3 in-memory database using Node.js DatabaseSync
 */
export function createSqliteBackupBuffer(data: UserProgressData): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(':memory:');

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS haylingo_meta (key TEXT PRIMARY KEY, val TEXT);
      CREATE TABLE IF NOT EXISTS user_profile (
        id TEXT PRIMARY KEY, first_name TEXT, last_name TEXT, age INTEGER, profession TEXT,
        custom_profession TEXT, proficiency_tier TEXT, cefr_level TEXT, learning_goal TEXT, custom_goal TEXT,
        learning_start_date TEXT, created_at INTEGER, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS user_settings (
        id TEXT PRIMARY KEY, user_id TEXT, keep_screen_awake INTEGER, display_mode TEXT,
        theme_mode TEXT, font_sizes_json TEXT, auto_light_start_time TEXT, auto_dark_start_time TEXT,
        timezone TEXT, auto_detect_timezone INTEGER, voice_speed_numeric REAL, speech_rate TEXT,
        selected_voice_uri TEXT, auto_play_audio INTEGER, preferred_morning_time TEXT,
        daily_goal_minutes INTEGER, exercise_difficulty TEXT, hints_enabled INTEGER,
        auto_repeat_mistakes INTEGER, auto_advance_exercises INTEGER, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS morning_reminders (
        id TEXT PRIMARY KEY, user_id TEXT, is_enabled INTEGER, reminder_time TEXT,
        repeat_daily INTEGER, task_count INTEGER, sound_enabled INTEGER, timezone TEXT,
        topic TEXT, last_notified_date TEXT, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS daily_words_challenge (
        id TEXT PRIMARY KEY, user_id TEXT, date TEXT, is_completed INTEGER,
        completed_count INTEGER, current_word_index INTEGER, total_target INTEGER,
        words_data_json TEXT, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS daily_word_attempts (
        id TEXT PRIMARY KEY, user_id TEXT, word_id TEXT, date TEXT, user_answer TEXT,
        is_correct INTEGER, attempt_number INTEGER, hints_used INTEGER, timestamp INTEGER
      );
      CREATE TABLE IF NOT EXISTS daily_questions_state (
        id TEXT PRIMARY KEY, user_id TEXT, date TEXT, total_questions INTEGER,
        current_index INTEGER, is_completed INTEGER, score INTEGER, answers_json TEXT, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS daily_conversations_state (
        id TEXT PRIMARY KEY, user_id TEXT, topic_id TEXT, current_turn_index INTEGER,
        is_completed INTEGER, completed_turns INTEGER, history_json TEXT, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS reading_progress (
        id TEXT PRIMARY KEY, user_id TEXT, item_id TEXT, item_kind TEXT,
        current_sentence_index INTEGER, current_chapter_id TEXT, scroll_percentage REAL,
        is_finished INTEGER, last_read_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS grammar_progress (
        id TEXT PRIMARY KEY, user_id TEXT, topic_id TEXT, is_completed INTEGER,
        score INTEGER, completed_exercises_json TEXT, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS pronunciation_progress (
        id TEXT PRIMARY KEY, user_id TEXT, module_id TEXT, item_id TEXT,
        accent TEXT, recognized_text TEXT, match_ratio REAL, is_completed INTEGER, updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS accent_preferences (user_id TEXT PRIMARY KEY, accent TEXT, updated_at INTEGER);
      CREATE TABLE IF NOT EXISTS lesson_progress (lesson_id TEXT PRIMARY KEY, completed INTEGER, score INTEGER, last_studied_at INTEGER);
      CREATE TABLE IF NOT EXISTS srs_vocabulary (word_id TEXT PRIMARY KEY, interval_days INTEGER, ease_factor REAL, repetitions INTEGER, due_date INTEGER, lapses INTEGER);
      CREATE TABLE IF NOT EXISTS learning_history (id TEXT PRIMARY KEY, user_id TEXT, date TEXT, minutes_spent INTEGER, activity_type TEXT, score INTEGER, xp_earned INTEGER, created_at INTEGER);
      CREATE TABLE IF NOT EXISTS achievements (id TEXT PRIMARY KEY, code TEXT, title_am TEXT, description_am TEXT, icon TEXT, unlocked_at INTEGER);
    `);

    // Insert Meta
    const metaStmt = db.prepare('INSERT INTO haylingo_meta (key, val) VALUES (?, ?)');
    metaStmt.run('app', 'HayLingo AI');
    metaStmt.run('version', '4.0.0');
    metaStmt.run('exported_at', new Date().toISOString());
    metaStmt.run('format', 'sqlite3');
    metaStmt.run('cefr_level', data.level || 'A2');

    // Profile
    if (data.profile) {
      const p = data.profile;
      db.prepare(`
        INSERT INTO user_profile (
          id, first_name, last_name, age, profession, custom_profession,
          proficiency_tier, cefr_level, learning_goal, custom_goal, learning_start_date,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        p.id || 'user-main',
        p.firstName || '',
        p.lastName || '',
        p.age || 25,
        p.profession || '',
        p.customProfession || '',
        p.proficiencyTier || 'Elementary',
        data.level || 'A2',
        p.learningGoal || 'work',
        p.customGoal || '',
        p.learningStartDate || '',
        p.createdAt || Date.now(),
        p.updatedAt || Date.now()
      );
    }

    // Settings
    if (data.settings) {
      const s = data.settings;
      db.prepare(`
        INSERT INTO user_settings (
          id, user_id, keep_screen_awake, display_mode, theme_mode,
          font_sizes_json, auto_light_start_time, auto_dark_start_time,
          timezone, auto_detect_timezone, voice_speed_numeric, speech_rate,
          selected_voice_uri, auto_play_audio, preferred_morning_time,
          daily_goal_minutes, exercise_difficulty, hints_enabled,
          auto_repeat_mistakes, auto_advance_exercises, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        s.id || 'settings-main',
        s.userId || 'user-main',
        s.keepScreenAwake ? 1 : 0,
        s.displayMode || 'auto',
        s.themeMode || 'light',
        JSON.stringify(s.fontSizes || {}),
        s.autoLightStartTime || '07:00',
        s.autoDarkStartTime || '19:00',
        s.timezone || 'Asia/Yerevan',
        s.autoDetectTimezone ? 1 : 0,
        s.voiceSpeedNumeric ?? 1.0,
        s.speechRate || 'normal',
        s.selectedVoiceURI || '',
        s.autoPlayAudio ? 1 : 0,
        s.preferredMorningTime || '08:30',
        s.dailyGoalMinutes ?? 15,
        s.exerciseDifficulty || 'adaptive',
        s.hintsEnabled ? 1 : 0,
        s.autoRepeatMistakes ? 1 : 0,
        s.autoAdvanceExercises ? 1 : 0,
        s.updatedAt || Date.now()
      );
    }

    // Morning Reminder
    if (data.morningReminder) {
      const r = data.morningReminder;
      db.prepare(`
        INSERT INTO morning_reminders (
          id, user_id, is_enabled, reminder_time, repeat_daily,
          task_count, sound_enabled, timezone, topic, last_notified_date, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        r.id || 'reminder-main',
        r.userId || 'user-main',
        (r.isEnabled ?? r.enabled) ? 1 : 0,
        r.reminderTime || r.time || '08:00',
        (r.repeatDaily ?? r.dailyRepeat) ? 1 : 0,
        r.taskCount ?? r.dailyTaskCount ?? 3,
        r.soundEnabled ? 1 : 0,
        r.timezone || 'Asia/Yerevan',
        r.topic || 'all',
        r.lastNotifiedDate || '',
        r.updatedAt || Date.now()
      );
    }

    // Daily Words Challenge
    if (data.dailyWordsChallenge) {
      const dw = data.dailyWordsChallenge;
      db.prepare(`
        INSERT INTO daily_words_challenge (
          id, user_id, date, is_completed, completed_count,
          current_word_index, total_target, words_data_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        dw.id || 'dw-today',
        dw.userId || 'user-main',
        dw.date || '',
        dw.isCompleted ? 1 : 0,
        dw.completedCount ?? 0,
        dw.currentWordIndex ?? 0,
        dw.totalTarget ?? 3,
        JSON.stringify(dw.words || []),
        dw.updatedAt || Date.now()
      );
    }

    // Daily Word Attempts
    if (Array.isArray(data.dailyWordAttempts)) {
      const stmt = db.prepare(`
        INSERT INTO daily_word_attempts (
          id, user_id, word_id, date, user_answer, is_correct, attempt_number, hints_used, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const a of data.dailyWordAttempts) {
        stmt.run(
          a.id,
          a.userId || 'user-main',
          a.wordId,
          a.date,
          a.userAnswer,
          a.isCorrect ? 1 : 0,
          a.attemptNumber,
          a.hintsUsed ?? 0,
          a.timestamp
        );
      }
    }

    // Daily Questions
    if (data.dailyQuestionsState) {
      const dq = data.dailyQuestionsState;
      db.prepare(`
        INSERT INTO daily_questions_state (
          id, user_id, date, total_questions, current_index, is_completed, score, answers_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        dq.id || 'dq-today',
        dq.userId || 'user-main',
        dq.date,
        dq.totalQuestions,
        dq.currentIndex,
        dq.isCompleted ? 1 : 0,
        dq.score,
        JSON.stringify(dq.answers || []),
        dq.updatedAt || Date.now()
      );
    }

    // Daily Conversations
    if (data.dailyConversationsMap) {
      const stmt = db.prepare(`
        INSERT INTO daily_conversations_state (
          id, user_id, topic_id, current_turn_index, is_completed, completed_turns, history_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const [topicId, c] of Object.entries(data.dailyConversationsMap)) {
        stmt.run(
          c.id || `conv-${topicId}`,
          c.userId || 'user-main',
          c.topicId || topicId,
          c.currentTurnIndex,
          c.isCompleted ? 1 : 0,
          c.completedTurns,
          JSON.stringify(c.history || []),
          c.updatedAt || Date.now()
        );
      }
    }

    // Reading Progress
    if (data.readingProgressMap) {
      const stmt = db.prepare(`
        INSERT INTO reading_progress (
          id, user_id, item_id, item_kind, current_sentence_index, current_chapter_id, scroll_percentage, is_finished, last_read_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const [itemId, rp] of Object.entries(data.readingProgressMap)) {
        stmt.run(
          rp.id || `read-${itemId}`,
          rp.userId || 'user-main',
          rp.itemId || itemId,
          rp.itemKind || 'book',
          rp.currentSentenceIndex ?? 0,
          rp.currentChapterId || '',
          rp.scrollPercentage ?? rp.progressPercent ?? 0,
          rp.isFinished ? 1 : 0,
          rp.lastReadAt ?? rp.updatedAt ?? Date.now()
        );
      }
    }

    // Grammar Progress
    if (data.grammarAttemptsMap) {
      const stmt = db.prepare(`
        INSERT INTO grammar_progress (
          id, user_id, topic_id, is_completed, score, completed_exercises_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const [topicId, g] of Object.entries(data.grammarAttemptsMap)) {
        stmt.run(
          g.id || `gram-${topicId}`,
          g.userId || 'user-main',
          g.topicId || topicId,
          g.isCompleted ? 1 : 0,
          g.score,
          JSON.stringify(g.completedExercises || []),
          g.updatedAt || Date.now()
        );
      }
    }

    // Pronunciation Progress
    if (data.pronunciationProgressMap) {
      const stmt = db.prepare(`
        INSERT INTO pronunciation_progress (
          id, user_id, module_id, item_id, accent, recognized_text, match_ratio, is_completed, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const [key, pp] of Object.entries(data.pronunciationProgressMap)) {
        stmt.run(
          pp.id || `pr-${key}`,
          pp.userId || 'user-main',
          pp.moduleId,
          pp.itemId,
          pp.accent,
          pp.recognizedText,
          pp.matchRatio,
          pp.isCompleted ? 1 : 0,
          pp.timestamp || Date.now()
        );
      }
    }

    // Accent Preference
    if (data.accentPreference) {
      const acc = data.accentPreference;
      db.prepare(`
        INSERT INTO accent_preferences (user_id, accent, updated_at) VALUES (?, ?, ?)
      `).run(acc.userId || 'user-main', acc.accent || acc.selectedAccent || 'us', acc.updatedAt || Date.now());
    }

    // Lesson Progress
    if (data.lessonProgressMap) {
      const stmt = db.prepare(`
        INSERT INTO lesson_progress (lesson_id, completed, score, last_studied_at) VALUES (?, ?, ?, ?)
      `);
      for (const [lessonId, lp] of Object.entries(data.lessonProgressMap)) {
        stmt.run(lessonId, lp.status === 'completed' ? 1 : 0, lp.completedSentenceIndices?.length || 0, lp.updatedAt || Date.now());
      }
    }

    // SRS Vocabulary
    if (data.srsWords) {
      const stmt = db.prepare(`
        INSERT INTO srs_vocabulary (word_id, interval_days, ease_factor, repetitions, due_date, lapses) VALUES (?, ?, ?, ?, ?, ?)
      `);
      for (const [wordId, srs] of Object.entries(data.srsWords)) {
        stmt.run(wordId, srs.intervalDays, srs.easeFactor, srs.repetitions, srs.nextReviewAt || Date.now(), 0);
      }
    }

    // Learning History
    if (Array.isArray(data.history)) {
      const stmt = db.prepare(`
        INSERT INTO learning_history (id, user_id, date, minutes_spent, activity_type, score, xp_earned, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const h of data.history.slice(0, 500)) {
        stmt.run(h.id, 'user-main', h.date, h.durationMinutes || 0, h.activityType, h.correctDelta || 0, 0, h.timestamp || Date.now());
      }
    }

    // Achievements
    if (Array.isArray(data.achievements)) {
      const stmt = db.prepare(`
        INSERT INTO achievements (id, code, title_am, description_am, icon, unlocked_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      for (const ach of data.achievements) {
        stmt.run(ach.id, ach.code, ach.titleAm, ach.descriptionAm, ach.icon, ach.unlockedAt);
      }
    }

    const buf = db.serialize();
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  } finally {
    db.close();
  }
}

/**
 * Validates SQLite 3 binary buffer, verifies integrity with PRAGMA integrity_check,
 * and extracts all records back into UserProgressData.
 */
export function parseSqliteBackupBuffer(
  buffer: Uint8Array
): { ok: boolean; data?: Partial<UserProgressData>; errorAm?: string } {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite');

  const magic = new TextDecoder().decode(buffer.subarray(0, 16));
  if (!magic.startsWith('SQLite format 3\0')) {
    return {
      ok: false,
      errorAm: 'Ֆայլը վավեր SQLite format 3 տվյալների բազա չէ (SQLite format 3 header-ը բացակայում է)։',
    };
  }

  const db = new DatabaseSync(':memory:');
  try {
    const nodeBuf = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    db.deserialize(nodeBuf);

    const integrityRows = db.prepare('PRAGMA integrity_check').all() as Array<{ integrity_check: string }>;
    if (!integrityRows || integrityRows.length === 0 || integrityRows[0].integrity_check !== 'ok') {
      return {
        ok: false,
        errorAm: `SQLite բազայի ամբողջականության ստուգումը ձախողվեց: ${integrityRows?.[0]?.integrity_check || 'անհայտ սխալ'}`,
      };
    }

    const restored: Partial<UserProgressData> = {};

    const hasTable = (tableName: string) => {
      const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(tableName);
      return !!row;
    };

    // User Profile
    if (hasTable('user_profile')) {
      const pRow = db.prepare('SELECT * FROM user_profile LIMIT 1').get() as Record<string, unknown> | undefined;
      if (pRow) {
        const prof: UserProfileRecord = {
          id: String(pRow.id || 'user-main'),
          firstName: String(pRow.first_name || ''),
          lastName: String(pRow.last_name || ''),
          age: Number(pRow.age || 25),
          profession: String(pRow.profession || 'IT Specialist') as ProfessionId,
          customProfession: String(pRow.custom_profession || ''),
          proficiencyTier: (pRow.proficiency_tier || 'Elementary') as any,
          learningGoal: (pRow.learning_goal || 'work') as any,
          customGoal: String(pRow.custom_goal || ''),
          learningStartDate: String(pRow.learning_start_date || ''),
          createdAt: Number(pRow.created_at || Date.now()),
          updatedAt: Number(pRow.updated_at || Date.now()),
        };
        restored.profile = prof;
        restored.userName = `${prof.firstName} ${prof.lastName}`.trim() || 'Օգտատեր';
        if (pRow.cefr_level) {
          restored.level = String(pRow.cefr_level) as any;
        }
      }
    }

    if (hasTable('haylingo_meta') && !restored.level) {
      const levelRow = db.prepare("SELECT val FROM haylingo_meta WHERE key='cefr_level'").get() as { val?: string } | undefined;
      if (levelRow?.val) {
        restored.level = levelRow.val as any;
      }
    }

    // Settings
    if (hasTable('user_settings')) {
      const sRow = db.prepare('SELECT * FROM user_settings LIMIT 1').get() as Record<string, unknown> | undefined;
      if (sRow) {
        let fontSizes = { interface: 15, english: 16, pronunciation: 14, armenian: 15 };
        try {
          if (typeof sRow.font_sizes_json === 'string') fontSizes = JSON.parse(sRow.font_sizes_json);
        } catch {}

        restored.settings = {
          id: String(sRow.id || 'settings-main'),
          userId: String(sRow.user_id || 'user-main'),
          keepScreenAwake: Boolean(sRow.keep_screen_awake),
          displayMode: (sRow.display_mode || 'auto') as any,
          themeMode: (sRow.theme_mode || 'light') as any,
          fontSizes,
          autoLightStartTime: String(sRow.auto_light_start_time || '07:00'),
          autoDarkStartTime: String(sRow.auto_dark_start_time || '19:00'),
          timezone: String(sRow.timezone || 'Asia/Yerevan'),
          autoDetectTimezone: Boolean(sRow.auto_detect_timezone),
          voiceSpeedNumeric: Number(sRow.voice_speed_numeric ?? 1.0),
          speechRate: (sRow.speech_rate || 'normal') as any,
          selectedVoiceURI: String(sRow.selected_voice_uri || ''),
          autoPlayAudio: Boolean(sRow.auto_play_audio),
          preferredMorningTime: String(sRow.preferred_morning_time || '08:30'),
          dailyGoalMinutes: Number(sRow.daily_goal_minutes ?? 15),
          exerciseDifficulty: (sRow.exercise_difficulty || 'adaptive') as any,
          hintsEnabled: Boolean(sRow.hints_enabled),
          autoRepeatMistakes: Boolean(sRow.auto_repeat_mistakes),
          autoAdvanceExercises: Boolean(sRow.auto_advance_exercises),
          updatedAt: Number(sRow.updated_at || Date.now()),
        };
      }
    }

    // Morning Reminder
    if (hasTable('morning_reminders')) {
      const rRow = db.prepare('SELECT * FROM morning_reminders LIMIT 1').get() as Record<string, unknown> | undefined;
      if (rRow) {
        restored.morningReminder = {
          id: String(rRow.id || 'reminder-main'),
          userId: String(rRow.user_id || 'user-main'),
          isEnabled: Boolean(rRow.is_enabled),
          reminderTime: String(rRow.reminder_time || '08:00'),
          repeatDaily: Boolean(rRow.repeat_daily),
          taskCount: Number(rRow.task_count ?? 3),
          soundEnabled: Boolean(rRow.sound_enabled),
          timezone: String(rRow.timezone || 'Asia/Yerevan'),
          topic: (rRow.topic || 'all') as any,
          lastNotifiedDate: String(rRow.last_notified_date || ''),
          updatedAt: Number(rRow.updated_at || Date.now()),
        };
      }
    }

    // Daily Words Challenge
    if (hasTable('daily_words_challenge')) {
      const dwRow = db.prepare('SELECT * FROM daily_words_challenge LIMIT 1').get() as Record<string, unknown> | undefined;
      if (dwRow) {
        let words = [];
        try {
          if (typeof dwRow.words_data_json === 'string') words = JSON.parse(dwRow.words_data_json);
        } catch {}

        restored.dailyWordsChallenge = {
          id: String(dwRow.id || 'dw-today'),
          userId: String(dwRow.user_id || 'user-main'),
          date: String(dwRow.date || ''),
          isCompleted: Boolean(dwRow.is_completed),
          completedCount: Number(dwRow.completed_count || 0),
          currentWordIndex: Number(dwRow.current_word_index || 0),
          totalTarget: Number(dwRow.total_target || 3),
          words,
          updatedAt: Number(dwRow.updated_at || Date.now()),
        };
      }
    }

    // Daily Word Attempts
    if (hasTable('daily_word_attempts')) {
      const rows = db.prepare('SELECT * FROM daily_word_attempts').all() as Record<string, unknown>[];
      restored.dailyWordAttempts = rows.map((r) => ({
        id: String(r.id),
        userId: String(r.user_id || 'user-main'),
        wordId: String(r.word_id),
        date: String(r.date),
        userAnswer: String(r.user_answer),
        isCorrect: Boolean(r.is_correct),
        attemptNumber: Number(r.attempt_number || 1),
        hintsUsed: Number(r.hints_used || 0),
        timestamp: Number(r.timestamp || Date.now()),
      }));
    }

    // Daily Questions
    if (hasTable('daily_questions_state')) {
      const dqRow = db.prepare('SELECT * FROM daily_questions_state LIMIT 1').get() as Record<string, unknown> | undefined;
      if (dqRow) {
        let answers = [];
        try {
          if (typeof dqRow.answers_json === 'string') answers = JSON.parse(dqRow.answers_json);
        } catch {}

        restored.dailyQuestionsState = {
          id: String(dqRow.id || 'dq-today'),
          userId: String(dqRow.user_id || 'user-main'),
          date: String(dqRow.date || ''),
          totalQuestions: Number(dqRow.total_questions || 10),
          currentIndex: Number(dqRow.current_index || 0),
          isCompleted: Boolean(dqRow.is_completed),
          score: Number(dqRow.score || 0),
          answers,
          updatedAt: Number(dqRow.updated_at || Date.now()),
        };
      }
    }

    // Daily Conversations
    if (hasTable('daily_conversations_state')) {
      const convRows = db.prepare('SELECT * FROM daily_conversations_state').all() as Record<string, unknown>[];
      const convMap: Record<string, DailyConversationSessionState> = {};
      for (const cr of convRows) {
        let history = [];
        try {
          if (typeof cr.history_json === 'string') history = JSON.parse(cr.history_json);
        } catch {}
        const topicId = String(cr.topic_id);
        convMap[topicId] = {
          id: String(cr.id),
          userId: String(cr.user_id || 'user-main'),
          topicId,
          currentTurnIndex: Number(cr.current_turn_index || 0),
          isCompleted: Boolean(cr.is_completed),
          completedTurns: Number(cr.completed_turns || 0),
          history,
          updatedAt: Number(cr.updated_at || Date.now()),
        };
      }
      restored.dailyConversationsMap = convMap;
    }

    // Reading Progress
    if (hasTable('reading_progress')) {
      const readRows = db.prepare('SELECT * FROM reading_progress').all() as Record<string, unknown>[];
      const readMap: Record<string, ReadingProgressRecord> = {};
      for (const rr of readRows) {
        const itemId = String(rr.item_id);
        readMap[itemId] = {
          id: String(rr.id),
          userId: String(rr.user_id || 'user-main'),
          itemId,
          itemKind: (rr.item_kind || 'book') as any,
          currentSentenceIndex: Number(rr.current_sentence_index || 0),
          currentChapterId: rr.current_chapter_id ? String(rr.current_chapter_id) : undefined,
          scrollPercentage: Number(rr.scroll_percentage || 0),
          isFinished: Boolean(rr.is_finished),
          lastReadAt: Number(rr.last_read_at || Date.now()),
          updatedAt: Number(rr.last_read_at || Date.now()),
        };
      }
      restored.readingProgressMap = readMap;
    }

    // Grammar Progress
    if (hasTable('grammar_progress')) {
      const gramRows = db.prepare('SELECT * FROM grammar_progress').all() as Record<string, unknown>[];
      const gramMap: Record<string, GrammarAttemptRecord> = {};
      for (const gr of gramRows) {
        let completedExercises = [];
        try {
          if (typeof gr.completed_exercises_json === 'string') completedExercises = JSON.parse(gr.completed_exercises_json);
        } catch {}
        const topicId = String(gr.topic_id);
        gramMap[topicId] = {
          id: String(gr.id),
          userId: String(gr.user_id || 'user-main'),
          topicId,
          isCompleted: Boolean(gr.is_completed),
          score: Number(gr.score || 0),
          completedExercises,
          updatedAt: Number(gr.updated_at || Date.now()),
        };
      }
      restored.grammarAttemptsMap = gramMap;
    }

    // Pronunciation Progress
    if (hasTable('pronunciation_progress')) {
      const pronRows = db.prepare('SELECT * FROM pronunciation_progress').all() as Record<string, unknown>[];
      const pronMap: Record<string, PronunciationProgressRecord> = {};
      for (const pr of pronRows) {
        const key = `${pr.module_id}_${pr.item_id}`;
        pronMap[key] = {
          id: String(pr.id),
          userId: String(pr.user_id || 'user-main'),
          moduleId: String(pr.module_id),
          itemId: String(pr.item_id),
          accent: (pr.accent || 'us') as any,
          recognizedText: String(pr.recognized_text || ''),
          matchedWords: [],
          missingWords: [],
          matchRatio: Number(pr.match_ratio || 0),
          isCompleted: Boolean(pr.is_completed),
          timestamp: Number(pr.updated_at || Date.now()),
          updatedAt: Number(pr.updated_at || Date.now()),
        };
      }
      restored.pronunciationProgressMap = pronMap;
    }

    // Accent Preference
    if (hasTable('accent_preferences')) {
      const aRow = db.prepare('SELECT * FROM accent_preferences LIMIT 1').get() as Record<string, unknown> | undefined;
      if (aRow) {
        restored.accentPreference = {
          userId: String(aRow.user_id || 'user-main'),
          accent: (aRow.accent || 'us') as any,
          updatedAt: Number(aRow.updated_at || Date.now()),
        };
      }
    }

    // Lesson Progress
    if (hasTable('lesson_progress')) {
      const lpRows = db.prepare('SELECT * FROM lesson_progress').all() as Record<string, unknown>[];
      const lpMap: Record<string, LessonProgressRecord> = {};
      for (const r of lpRows) {
        const lId = String(r.lesson_id);
        lpMap[lId] = {
          id: lId,
          lessonId: lId,
          status: Boolean(r.completed) ? 'completed' : 'in-progress',
          lastSentenceIndex: 0,
          completedSentenceIndices: [],
          timeSpentMinutes: 0,
          updatedAt: Number(r.last_studied_at || Date.now()),
        };
      }
      restored.lessonProgressMap = lpMap;
    }

    // SRS Vocabulary
    if (hasTable('srs_vocabulary')) {
      const srsRows = db.prepare('SELECT * FROM srs_vocabulary').all() as Record<string, unknown>[];
      const srsMap: Record<string, SRSWordState> = {};
      for (const r of srsRows) {
        const wId = String(r.word_id);
        const reps = Number(r.repetitions || 0);
        srsMap[wId] = {
          wordId: wId,
          intervalDays: Number(r.interval_days || 1),
          easeFactor: Number(r.ease_factor || 2.5),
          repetitions: reps,
          nextReviewAt: Number(r.due_date || Date.now()),
          mastered: reps >= 3,
          updatedAt: Date.now(),
        };
      }
      restored.srsWords = srsMap;
    }

    // History
    if (hasTable('learning_history')) {
      const hRows = db.prepare('SELECT * FROM learning_history ORDER BY created_at DESC LIMIT 500').all() as Record<string, unknown>[];
      restored.history = hRows.map((r) => ({
        id: String(r.id),
        date: String(r.date),
        timestamp: Number(r.created_at || Date.now()),
        activityType: (r.activity_type || 'exercise') as any,
        titleAm: 'Ուսումնական գործունեություն',
        durationMinutes: Number(r.minutes_spent || 0),
        correctDelta: Number(r.score || 0),
        wrongDelta: 0,
      }));
    }

    // Achievements
    if (hasTable('achievements')) {
      const achRows = db.prepare('SELECT * FROM achievements').all() as Record<string, unknown>[];
      restored.achievements = achRows.map((r) => ({
        id: String(r.id),
        code: String(r.code),
        titleAm: String(r.title_am),
        descriptionAm: String(r.description_am),
        icon: String(r.icon),
        unlockedAt: Number(r.unlocked_at || Date.now()),
      }));
    }

    return { ok: true, data: restored };
  } finally {
    db.close();
  }
}
