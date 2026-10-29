import { NextRequest, NextResponse } from 'next/server';
import {
  evaluateWithRuleBasedTeacher,
  selectNextCurriculumQuestion,
  TeacherEvaluationRequest,
} from '../../../lib/teacher-engine';
import { TEACHER_CURRICULUM } from '../../../data/placement-and-teacher';

/**
 * Server-side AI Provider Abstraction (`app/api/teacher/route.ts`).
 * - Keeps API keys strictly in Server / Vercel Environment Variables (`OPENAI_API_KEY`, `GEMINI_API_KEY`).
 * - Falls back cleanly and transparently to the Rule-Based Adaptive Teacher when no API key is configured.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TeacherEvaluationRequest;
    const provider = (process.env.AI_PROVIDER || 'rule-based').toLowerCase();
    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Optional OpenAI Server-Side Provider
    if (provider === 'openai' && openAiKey) {
      const currentQ =
        TEACHER_CURRICULUM.find((q) => q.id === body.currentQuestionId) || TEACHER_CURRICULUM[0];
      const nextQ = selectNextCurriculumQuestion(
        currentQ.id,
        body.masteredQuestionIds || [],
        body.weakTopics || [],
        Math.min(10, (body.difficultyScore || 2) + 1)
      );

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are an English teacher for Armenian speakers. Evaluate the user answer to the current question. Return JSON with fields: isFullyCorrect (boolean), isPartiallyCorrect (boolean), feedbackEn (string, e.g. Good! The correct sentence is: "..."), correctedSentenceEn (string), explanationAm (1-2 sentences in Armenian explaining grammar).',
            },
            {
              role: 'user',
              content: `Question: "${currentQ.questionEn}"\nUser Answer: "${body.userAnswer}"`,
            },
          ],
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const parsed = JSON.parse(json.choices?.[0]?.message?.content || '{}');
        return NextResponse.json({
          mode: 'cloud-ai',
          providerLabelAm: 'AI Ուսուցիչ (OpenAI API)',
          isFullyCorrect: Boolean(parsed.isFullyCorrect),
          isPartiallyCorrect: Boolean(parsed.isPartiallyCorrect),
          feedbackEn: parsed.feedbackEn || `The correct sentence is: "${currentQ.idealSentenceEn}"`,
          correctedSentenceEn: parsed.correctedSentenceEn || currentQ.idealSentenceEn,
          explanationAm: parsed.explanationAm || currentQ.defaultExplanationAm,
          updatedDifficulty: parsed.isFullyCorrect
            ? Math.min(10, (body.difficultyScore || 2) + 1)
            : body.difficultyScore || 2,
          masteredQuestionId: parsed.isFullyCorrect ? currentQ.id : undefined,
          nextQuestion: {
            id: nextQ.id,
            level: nextQ.level,
            topic: nextQ.topic,
            questionEn: nextQ.questionEn,
            questionPronunciation: nextQ.questionPronunciation,
            questionAm: nextQ.questionAm,
          },
        });
      }
    }

    // 2. Optional Gemini Server-Side Provider
    if (provider === 'gemini' && geminiKey) {
      const currentQ =
        TEACHER_CURRICULUM.find((q) => q.id === body.currentQuestionId) || TEACHER_CURRICULUM[0];
      const nextQ = selectNextCurriculumQuestion(
        currentQ.id,
        body.masteredQuestionIds || [],
        body.weakTopics || [],
        Math.min(10, (body.difficultyScore || 2) + 1)
      );
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an English teacher for Armenian speakers. Evaluate User Answer "${body.userAnswer}" to Question "${currentQ.questionEn}". Respond in JSON: {"isFullyCorrect": boolean, "isPartiallyCorrect": boolean, "feedbackEn": string, "correctedSentenceEn": string, "explanationAm": string}`,
                },
              ],
            },
          ],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const parsed = JSON.parse(text);
        return NextResponse.json({
          mode: 'cloud-ai',
          providerLabelAm: 'AI Ուսուցիչ (Gemini API)',
          isFullyCorrect: Boolean(parsed.isFullyCorrect),
          isPartiallyCorrect: Boolean(parsed.isPartiallyCorrect),
          feedbackEn: parsed.feedbackEn || `The correct sentence is: "${currentQ.idealSentenceEn}"`,
          correctedSentenceEn: parsed.correctedSentenceEn || currentQ.idealSentenceEn,
          explanationAm: parsed.explanationAm || currentQ.defaultExplanationAm,
          updatedDifficulty: parsed.isFullyCorrect
            ? Math.min(10, (body.difficultyScore || 2) + 1)
            : body.difficultyScore || 2,
          masteredQuestionId: parsed.isFullyCorrect ? currentQ.id : undefined,
          nextQuestion: {
            id: nextQ.id,
            level: nextQ.level,
            topic: nextQ.topic,
            questionEn: nextQ.questionEn,
            questionPronunciation: nextQ.questionPronunciation,
            questionAm: nextQ.questionAm,
          },
        });
      }
    }

    // 3. Default: Rule-Based Adaptive Mode (transparently labeled, no API keys needed)
    const result = evaluateWithRuleBasedTeacher(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Չհաջողվեց մշակել պատասխանը։ Խնդրում ենք կրկին փորձել։' },
      { status: 500 }
    );
  }
}

