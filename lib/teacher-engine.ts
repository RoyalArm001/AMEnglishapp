import { TEACHER_CURRICULUM, TeacherCurriculumQuestion } from '../data/placement-and-teacher';
import { normalizeEnglishText } from './speech';

export interface TeacherEvaluationRequest {
  currentQuestionId: string;
  userAnswer: string;
  masteredQuestionIds: string[];
  weakTopics: string[];
  difficultyScore: number;
}

export interface TeacherEvaluationResponse {
  mode: 'rule-based';
  providerLabelAm: string;
  isFullyCorrect: boolean;
  isPartiallyCorrect: boolean;
  feedbackEn: string;
  correctedSentenceEn: string;
  explanationAm: string;
  updatedDifficulty: number;
  masteredQuestionId?: string;
  weakTopicDetected?: string;
  nextQuestion: {
    id: string;
    level: string;
    topic: string;
    questionEn: string;
    questionPronunciation: string;
    questionAm: string;
  };
}

const GLOBAL_GRAMMAR_RULES: {
  test: (raw: string) => boolean;
  fix: (raw: string) => string;
  noteAm: string;
}[] = [
  {
    test: (s) => /\bi\s+am\s+agree\b/i.test(s),
    fix: (s) => s.replace(/\bi\s+am\s+agree\b/gi, 'I agree'),
    noteAm: '«Agree»-ն արդեն բայ է, ուստի «am» օժանդակ բայը պետք չէ (ճիշտ է՝ «I agree»)։',
  },
  {
    test: (s) => /\bgo\s+to\s+home\b/i.test(s),
    fix: (s) => s.replace(/\bgo\s+to\s+home\b/gi, 'go home'),
    noteAm: '«Home» բառից առաջ «to» նախդիր չի դրվում (ճիշտ է՝ «go home»)։',
  },
  {
    test: (s) => /\bdepend(s)?\s+from\b/i.test(s),
    fix: (s) => s.replace(/\bdepend(s)?\s+from\b/gi, 'depends on'),
    noteAm: '«Կախված լինել»-ը անգլերենում միշտ «depend on» է, ոչ թե «depend from»։',
  },
  {
    test: (s) => /\binformations\b/i.test(s),
    fix: (s) => s.replace(/\binformations\b/gi, 'information'),
    noteAm: '«Information» բառը անհաշվելի է և հոգնակի «-s» չի ստանում։',
  },
  {
    test: (s) => /\bdid\s+you\s+received\b/i.test(s),
    fix: (s) => s.replace(/\bdid\s+you\s+received\b/gi, 'did you receive'),
    noteAm: '«Did» օժանդակ բայից հետո հիմնական բայը դրվում է ուղիղ ձևով («receive»)։',
  },
];

export function selectNextCurriculumQuestion(
  currentId: string,
  masteredIds: string[],
  weakTopics: string[],
  targetDifficulty: number
): TeacherCurriculumQuestion {
  const unmastered = TEACHER_CURRICULUM.filter(
    (q) => q.id !== currentId && !masteredIds.includes(q.id)
  );
  const pool = unmastered.length > 0 ? unmastered : TEACHER_CURRICULUM.filter((q) => q.id !== currentId);

  // Prioritize weak topics if any match
  const weakMatches = pool.filter((q) => weakTopics.includes(q.topic));
  if (weakMatches.length > 0) {
    return weakMatches.sort(
      (a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
    )[0];
  }

  return (
    pool.sort(
      (a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
    )[0] || TEACHER_CURRICULUM[0]
  );
}

export function evaluateWithRuleBasedTeacher(
  req: TeacherEvaluationRequest
): TeacherEvaluationResponse {
  const currentQ =
    TEACHER_CURRICULUM.find((q) => q.id === req.currentQuestionId) || TEACHER_CURRICULUM[0];
  const raw = req.userAnswer.trim();
  const normUser = normalizeEnglishText(raw);

  // 1. Check exact or accepted full sentence match
  const exactMatch = currentQ.acceptedFullSentences.some(
    (cand) => normalizeEnglishText(cand) === normUser
  );

  if (exactMatch) {
    const nextDiff = Math.min(10, req.difficultyScore + 1);
    const updatedMastered = Array.from(new Set([...req.masteredQuestionIds, currentQ.id]));
    const nextQ = selectNextCurriculumQuestion(
      currentQ.id,
      updatedMastered,
      req.weakTopics,
      nextDiff
    );

    return {
      mode: 'rule-based',
      providerLabelAm: 'Պատրաստի հարցաշար և կանոններով ստուգում',
      isFullyCorrect: true,
      isPartiallyCorrect: false,
      feedbackEn: `Excellent! "${currentQ.idealSentenceEn}" is a complete and grammatically correct sentence.`,
      correctedSentenceEn: currentQ.idealSentenceEn,
      explanationAm: `Գերազանց է։ Ձեր նախադասությունը լիովին ճիշտ է կառուցված։ Անցնում ենք մի փոքր ավելի բարդ հարցի (${nextQ.level})։`,
      updatedDifficulty: nextDiff,
      masteredQuestionId: currentQ.id,
      nextQuestion: {
        id: nextQ.id,
        level: nextQ.level,
        topic: nextQ.topic,
        questionEn: nextQ.questionEn,
        questionPronunciation: nextQ.questionPronunciation,
        questionAm: nextQ.questionAm,
      },
    };
  }

  // 2. Check specific short fragment patterns for this question (e.g., "Restart router" -> "I restart the router.")
  for (const frag of currentQ.shortFragmentPatterns) {
    if (frag.pattern.test(raw)) {
      const nextDiff = Math.min(10, req.difficultyScore + 1);
      const updatedMastered = Array.from(new Set([...req.masteredQuestionIds, currentQ.id]));
      const nextQ = selectNextCurriculumQuestion(
        currentQ.id,
        updatedMastered,
        req.weakTopics,
        nextDiff
      );

      return {
        mode: 'rule-based',
        providerLabelAm: 'Պատրաստի հարցաշար և կանոններով ստուգում',
        isFullyCorrect: false,
        isPartiallyCorrect: true,
        feedbackEn: `Good! The correct sentence is: "${frag.correctedEn}"`,
        correctedSentenceEn: frag.correctedEn,
        explanationAm: frag.explanationAm,
        updatedDifficulty: nextDiff,
        masteredQuestionId: currentQ.id,
        nextQuestion: {
          id: nextQ.id,
          level: nextQ.level,
          topic: nextQ.topic,
          questionEn: nextQ.questionEn,
          questionPronunciation: nextQ.questionPronunciation,
          questionAm: nextQ.questionAm,
        },
      };
    }
  }

  // 3. Check global grammar rules
  for (const rule of GLOBAL_GRAMMAR_RULES) {
    if (rule.test(raw)) {
      const fixed = rule.fix(raw);
      const nextDiff = Math.max(1, req.difficultyScore);
      const nextQ = selectNextCurriculumQuestion(
        currentQ.id,
        req.masteredQuestionIds,
        Array.from(new Set([...req.weakTopics, currentQ.topic])),
        nextDiff
      );

      return {
        mode: 'rule-based',
        providerLabelAm: 'Պատրաստի հարցաշար և կանոններով ստուգում',
        isFullyCorrect: false,
        isPartiallyCorrect: true,
        feedbackEn: `Good try! The correct sentence is: "${fixed}" (or "${currentQ.idealSentenceEn}")`,
        correctedSentenceEn: currentQ.idealSentenceEn,
        explanationAm: rule.noteAm,
        updatedDifficulty: nextDiff,
        weakTopicDetected: currentQ.topic,
        nextQuestion: {
          id: nextQ.id,
          level: nextQ.level,
          topic: nextQ.topic,
          questionEn: nextQ.questionEn,
          questionPronunciation: nextQ.questionPronunciation,
          questionAm: nextQ.questionAm,
        },
      };
    }
  }

  // 4. Check keyword presence (user understood the meaning, e.g., partial sentence or minor grammar issue)
  const matchedKeywords = currentQ.requiredKeywords.filter((kw) =>
    normUser.includes(normalizeEnglishText(kw))
  );
  const wordCount = normUser.split(' ').filter(Boolean).length;

  if (matchedKeywords.length > 0) {
    const hasSubject = /^(i|we|you|they|he|she|it|the|my|our|can|could|let)\b/i.test(raw);
    const isCompleteEnough = hasSubject && wordCount >= 4;
    const nextDiff = isCompleteEnough
      ? Math.min(10, req.difficultyScore + 1)
      : req.difficultyScore;
    const updatedMastered = isCompleteEnough
      ? Array.from(new Set([...req.masteredQuestionIds, currentQ.id]))
      : req.masteredQuestionIds;
    const nextQ = selectNextCurriculumQuestion(
      currentQ.id,
      updatedMastered,
      req.weakTopics,
      nextDiff
    );

    return {
      mode: 'rule-based',
      providerLabelAm: 'Պատրաստի հարցաշար և կանոններով ստուգում',
      isFullyCorrect: isCompleteEnough,
      isPartiallyCorrect: !isCompleteEnough,
      feedbackEn: isCompleteEnough
        ? `Very good! Another natural way to say it is: "${currentQ.idealSentenceEn}"`
        : `Good! The correct full sentence is: "${currentQ.idealSentenceEn}"`,
      correctedSentenceEn: currentQ.idealSentenceEn,
      explanationAm: isCompleteEnough
        ? `Միտքը ճիշտ է և հասկանալի։ Որպես օրինակելի տարբերակ հիշեք նաև՝ «${currentQ.idealSentenceEn}»։`
        : `Դուք ճիշտ բառեր եք օգտագործել (${matchedKeywords.join(', ')}), սակայն ամբողջական նախադասության համար անհրաժեշտ է նաև ենթակա և ստորոգյալ՝ «${currentQ.idealSentenceEn}»։`,
      updatedDifficulty: nextDiff,
      masteredQuestionId: isCompleteEnough ? currentQ.id : undefined,
      nextQuestion: {
        id: nextQ.id,
        level: nextQ.level,
        topic: nextQ.topic,
        questionEn: nextQ.questionEn,
        questionPronunciation: nextQ.questionPronunciation,
        questionAm: nextQ.questionAm,
      },
    };
  }

  // 5. Fallback when answer is off-topic or needs full correction
  const nextDiff = Math.max(1, req.difficultyScore - 1);
  const updatedWeak = Array.from(new Set([...req.weakTopics, currentQ.topic]));
  const nextQ = selectNextCurriculumQuestion(
    currentQ.id,
    req.masteredQuestionIds,
    updatedWeak,
    nextDiff
  );

  return {
    mode: 'rule-based',
    providerLabelAm: 'Պատրաստի հարցաշար և կանոններով ստուգում',
    isFullyCorrect: false,
    isPartiallyCorrect: false,
    feedbackEn: `Let's correct this together. The right sentence is: "${currentQ.idealSentenceEn}"`,
    correctedSentenceEn: currentQ.idealSentenceEn,
    explanationAm: currentQ.defaultExplanationAm,
    updatedDifficulty: nextDiff,
    weakTopicDetected: currentQ.topic,
    nextQuestion: {
      id: nextQ.id,
      level: nextQ.level,
      topic: nextQ.topic,
      questionEn: nextQ.questionEn,
      questionPronunciation: nextQ.questionPronunciation,
      questionAm: nextQ.questionAm,
    },
  };
}

