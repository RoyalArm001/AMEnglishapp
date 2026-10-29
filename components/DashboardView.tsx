'use client';

import React from 'react';
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  GraduationCap,
  Mic,
  Sparkles,
  Star,
  Target,
  User,
  Volume2,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CEFRLevel, UserProgressData } from '../lib/types';
import { LESSONS_DATA, ALL_LESSON_SENTENCES } from '../data/lessons';
import {
  getRecommendedLessonIdsForProfession,
  PROFESSIONS_LIST,
} from '../data/professions';
import { CEFR_LEVELS } from '../lib/storage';
import { UI_TEXT } from '../lib/i18n';

interface DashboardViewProps {
  progress: UserProgressData;
  onNavigate: (tab: string) => void;
  onOpenLesson: (lessonId: string, sentenceIdx?: number) => void;
  onChangeLevel: (level: CEFRLevel) => void;
  onStartPlacementTest: () => void;
  onSpeak: (text: string) => void;
}

export default function DashboardView({
  progress,
  onNavigate,
  onOpenLesson,
  onChangeLevel,
  onStartPlacementTest,
  onSpeak,
}: DashboardViewProps) {
  const currentLesson =
    LESSONS_DATA.find((l) => l.id === progress.currentLessonId) || LESSONS_DATA[0];

  const profRecommendedIds = getRecommendedLessonIdsForProfession(
    progress.profile?.profession || 'IT Specialist'
  );
  const recommendedByProfession =
    LESSONS_DATA.find(
      (l) =>
        profRecommendedIds.includes(l.id) &&
        !progress.completedLessonIds.includes(l.id)
    ) ||
    LESSONS_DATA.find(
      (l) => l.level === progress.level && !progress.completedLessonIds.includes(l.id)
    ) ||
    currentLesson;

  const professionMeta =
    PROFESSIONS_LIST.find((p) => p.id === progress.profile?.profession) ||
    PROFESSIONS_LIST[0];

  const displayProfessionAm =
    progress.profile?.profession === 'Other' && progress.profile?.customProfession
      ? progress.profile.customProfession
      : professionMeta.titleAm;

  const totalAnswers = progress.correctAnswersCount + progress.wrongAnswersCount;
  const accuracyPercent =
    totalAnswers > 0 ? Math.round((progress.correctAnswersCount / totalAnswers) * 100) : 100;

  const dailyGoalMinutes = progress.settings?.dailyGoalMinutes || 15;
  const dailyGoalPercent = Math.min(
    100,
    Math.round((progress.dailyStudyMinutes / dailyGoalMinutes) * 100)
  );

  const savedSentences = ALL_LESSON_SENTENCES.filter((s) =>
    progress.savedSentenceIds.includes(s.id)
  ).slice(0, 4);

  const unresolvedMistakesCount = progress.mistakes.filter((m) => !m.resolved).length;
  const currentLp = progress.lessonProgressMap?.[currentLesson.id];
  const resumeSentenceIdx =
    currentLp?.lastSentenceIndex ?? progress.currentSentenceIndex ?? 0;

  return (
    <div className="space-y-8">
      {/* Placement Test Banner if not completed */}
      {!progress.placementCompleted && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Անհատական ուսուցման համակարգ
              </span>
              <h3 className="text-lg font-bold mt-0.5">
                Պարզի՛ր քո անգլերենի ճշգրիտ մակարդակը (A1–C2) 2 րոպեում
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Անցիր կարճ մակարդակի ստուգումը, որպեսզի դասերն ու վարժությունները հարմարվեն քո գիտելիքներին։
              </p>
            </div>
          </div>
          <button
            onClick={onStartPlacementTest}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 shrink-0 transition shadow-sm"
          >
            Սկսել մակարդակի թեստը <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      {/* Hero Row: Today's Profession-Tailored Lesson + Level & Quick Voice Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden shadow-lg"
        >
          <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-semibold mb-3">
                <Sparkles size={14} /> ԱՅՍՕՐՎԱ ԴԱՍԸ · ՄԱԿԱՐԴԱԿ {recommendedByProfession.level} ·{' '}
                {displayProfessionAm}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {recommendedByProfession.titleAm}
              </h1>
              <p className="text-emerald-100/90 text-sm md:text-base mt-2 max-w-xl">
                {recommendedByProfession.descriptionAm}
              </p>

              {/* Sample sentence preview from today's lesson with mandatory 3-field format */}
              {recommendedByProfession.sentences[0] && (
                <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-base md:text-lg text-white">
                      <span className="text-xs text-emerald-200 mr-1.5">
                        {UI_TEXT.mandatoryFields.english}
                      </span>
                      {recommendedByProfession.sentences[0].english}
                    </p>
                    <button
                      onClick={() => onSpeak(recommendedByProfession.sentences[0].english)}
                      className="p-2 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/50 text-white transition shrink-0"
                      title="Լսել արտասանությունը"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-emerald-200">
                    <strong>{UI_TEXT.mandatoryFields.pronunciation}</strong>{' '}
                    {recommendedByProfession.sentences[0].pronunciation}
                  </p>
                  <p className="text-xs md:text-sm text-slate-200">
                    <strong>{UI_TEXT.mandatoryFields.armenian}</strong>{' '}
                    {recommendedByProfession.sentences[0].armenian}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenLesson(recommendedByProfession.id, 0)}
                className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm flex items-center gap-2 transition shadow"
              >
                Սկսել այսօրվա դասը <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onOpenLesson(currentLesson.id, resumeSentenceIdx)}
                className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm flex items-center gap-2 transition"
              >
                <BookOpen size={16} /> Շարունակել նախորդ դասը (Նախադասություն {resumeSentenceIdx + 1})
              </button>
            </div>
          </div>
        </motion.section>

        {/* Right Card: Level Control + Quick Voice Practice */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ԻՄ ՄԱԿԱՐԴԱԿԸ ԵՎ ՄԱՍՆԱԳԻՏՈՒԹՅՈՒՆԸ
                </span>
                <h2 className="text-xl font-bold mt-0.5">
                  Մակարդակ՝ <span className="text-emerald-600 dark:text-emerald-400">{progress.level}</span>
                </h2>
              </div>
              <button
                onClick={() => onNavigate('Profile')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/15 transition"
              >
                <User size={14} /> Իմ պրոֆիլը
              </button>
            </div>

            {/* Level Pills A1-C2 */}
            <div className="grid grid-cols-6 gap-1.5 mt-3">
              {CEFR_LEVELS.map((item) => {
                const active = progress.level === item.level;
                return (
                  <button
                    key={item.level}
                    onClick={() => onChangeLevel(item.level)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      active
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700'
                    }`}
                    title={item.labelAm}
                  >
                    {item.level}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {CEFR_LEVELS.find((c) => c.level === progress.level)?.descAm}
            </p>
          </div>

          {/* Daily Study Time Progress */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
              <span className="flex items-center gap-1.5">
                <Target size={16} className="text-emerald-600" /> Օրական ուսուցման ժամանակ
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {progress.dailyStudyMinutes} / {dailyGoalMinutes} րոպե ({dailyGoalPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${dailyGoalPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Start Voice Practice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 border border-indigo-500/20 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                Ձայնային պարապմունք · {progress.preferredMorningTime}
              </div>
              <div className="font-bold text-sm mt-0.5">
                Արագ սկսել ձայնային պարապմունք
              </div>
            </div>
            <button
              onClick={() => onNavigate('Voice Practice')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs md:text-sm flex items-center gap-2 shrink-0 transition"
            >
              <Mic size={16} /> Սկսել
            </button>
          </div>
        </motion.section>
      </div>

      {/* Profession-Based Recommended Topics Bar */}
      <div className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Briefcase size={14} /> Ձեր մասնագիտության առաջարկվող ուղղությունները ({displayProfessionAm})
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {professionMeta.topics.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
              >
                {t.titleAm} · {t.titleEn}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onNavigate('Lessons')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-xs font-bold shrink-0 transition"
        >
          Տեսնել բոլոր մասնագիտությունների դասերը →
        </button>
      </div>

      {/* 6 Mandatory KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Շարունակական օրեր</span>
            <Flame size={18} className="text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold">{progress.streakDays} օր</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Անընդմեջ պարապմունք</div>
        </div>

        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Օրական ժամանակ</span>
            <Clock size={18} className="text-sky-500" />
          </div>
          <div className="text-2xl font-extrabold">{progress.dailyStudyMinutes} ր</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Այսօրվա ուսուցումը</div>
        </div>

        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Ավարտած դասեր</span>
            <BookOpen size={18} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold">
            {progress.completedLessonIds.length} / {LESSONS_DATA.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">16 թեմատիկ բաժին</div>
        </div>

        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Սովորած բառեր</span>
            <BookMarked size={18} className="text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold">{progress.learnedWordIds.length}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ընտրյալ՝ {progress.favoriteWordIds.length} բառ
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Ճիշտ պատասխաններ</span>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {progress.correctAnswersCount}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ճշգրտություն՝ {accuracyPercent}%
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Սխալ պատասխաններ</span>
            <XCircle size={18} className="text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-500">
            {progress.wrongAnswersCount}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Կրկնության ենթակա՝ {unresolvedMistakesCount}
          </div>
        </div>
      </div>

      {/* Skills Breakdown & Quick Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Հմտությունների զարգացում</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ընթերցանություն, Լսողական, Խոսակցական և Գրավոր հմտություններ
              </p>
            </div>
            <button
              onClick={() => onNavigate('My Progress')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Ուսուցման պատմություն →
            </button>
          </div>

          <div className="space-y-4">
            {[
              { key: 'reading', label: '📖 Ընթերցանություն (Reading)', val: progress.skills.reading, color: 'bg-emerald-500' },
              { key: 'listening', label: '🎧 Լսողական ընկալում (Listening)', val: progress.skills.listening, color: 'bg-sky-500' },
              { key: 'speaking', label: '🎙️ Խոսակցական հմտություն (Speaking)', val: progress.skills.speaking, color: 'bg-indigo-500' },
              { key: 'writing', label: '✍️ Գրավոր և Քերականություն (Writing)', val: progress.skills.writing, color: 'bg-amber-500' },
            ].map((sk) => (
              <div key={sk.key}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{sk.label}</span>
                  <span>{sk.val}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${sk.color} rounded-full transition-all duration-500`}
                    style={{ width: `${sk.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Action Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('Exercises')}
            className="text-left p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition shadow-sm flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <Brain size={22} />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-base">Ինտերակտիվ Առաջադրանքներ (A–F)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                108 վարժություն՝ լրացում, թարգմանություն, սխալի ուղղում, լսողական և ձայնային։
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('IT English')}
            className="text-left p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition shadow-sm flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 w-fit">
              <Compass size={22} />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-base">Մասնագիտական և ՏՏ Անգլերեն</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                13 ՏՏ թեմաներ և 21 աշխատանքային դերային խաղեր (Helpdesk, Network, AD, M365)։
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('My AI Teacher')}
            className="text-left p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition shadow-sm flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
              <Sparkles size={22} />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-base">Անձնական Ուսուցիչ (AI Teacher)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Հարց ու պատասխան, քերականական սխալների ուղղում և հայերեն բացատրություն։
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('Vocabulary')}
            className="text-left p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition shadow-sm flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
              <BookMarked size={22} />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-base">Բառապաշար և Քարտեր (210 բառ)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Հայերեն արտասանությամբ բառարան, ընտրյալներ և ինտերվալային կրկնություն։
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Saved Sentences Section */}
      {savedSentences.length > 0 && (
        <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Star size={18} className="text-amber-500 fill-amber-500" /> Պահպանված նախադասություններ ({progress.savedSentenceIds.length})
            </h2>
            <button
              onClick={() => onNavigate('Lessons')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Դիտել բոլոր դասերը →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedSentences.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-sm">
                    <strong>{UI_TEXT.mandatoryFields.english}</strong> {s.english}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    <strong>{UI_TEXT.mandatoryFields.pronunciation}</strong> {s.pronunciation}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>{UI_TEXT.mandatoryFields.armenian}</strong> {s.armenian}
                  </p>
                </div>
                <button
                  onClick={() => onSpeak(s.english)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 transition shrink-0"
                  title="Լսել"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
