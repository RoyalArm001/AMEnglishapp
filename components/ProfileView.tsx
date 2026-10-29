'use client';

import React, { useMemo, useState } from 'react';
import {
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  Flame,
  Mic,
  Save,
  Search,
  User,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  CEFRLevel,
  LearningGoalId,
  ProfessionId,
  ProficiencyTier,
  UserProgressData,
} from '../lib/types';
import {
  getRecommendedLessonIdsForProfession,
  PROFESSIONS_LIST,
} from '../data/professions';
import { LESSONS_DATA } from '../data/lessons';
import {
  formatArmenianDateTime,
  LEARNING_GOALS,
  PROFICIENCY_TIERS,
  UI_TEXT,
} from '../lib/i18n';

interface ProfileViewProps {
  progress: UserProgressData;
  onUpdateProfile: (params: {
    firstName: string;
    lastName: string;
    age: number;
    profession: ProfessionId;
    customProfession: string;
    proficiencyTier: ProficiencyTier;
    level: CEFRLevel;
    learningGoal: LearningGoalId;
    customGoal: string;
  }) => void;
  onOpenLesson: (lessonId: string) => void;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
}

export default function ProfileView({
  progress,
  onUpdateProfile,
  onOpenLesson,
  onSpeak,
}: ProfileViewProps) {
  const { profile, settings } = progress;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>(profile.firstName || progress.userName);
  const [lastName, setLastName] = useState<string>(profile.lastName || '');
  const [age, setAge] = useState<string>(String(profile.age || 25));
  const [profession, setProfession] = useState<ProfessionId>(
    profile.profession || 'IT Specialist'
  );
  const [customProfession, setCustomProfession] = useState<string>(
    profile.customProfession || ''
  );
  const [profSearch, setProfSearch] = useState<string>('');
  const [proficiencyTier, setProficiencyTier] = useState<ProficiencyTier>(
    profile.proficiencyTier || 'Elementary'
  );
  const [level, setLevel] = useState<CEFRLevel>(progress.level || 'A2');
  const [learningGoal, setLearningGoal] = useState<LearningGoalId>(
    profile.learningGoal || 'work'
  );
  const [customGoal, setCustomGoal] = useState<string>(profile.customGoal || '');
  const [savedNotice, setSavedNotice] = useState<string>('');

  const currentProfessionMeta =
    PROFESSIONS_LIST.find((p) => p.id === profile.profession) || PROFESSIONS_LIST[0];

  const displayProfessionAm =
    profile.profession === 'Other' && profile.customProfession
      ? `${profile.customProfession} (Այլ մասնագիտություն)`
      : currentProfessionMeta.titleAm;

  const recommendedLessonIds = getRecommendedLessonIdsForProfession(profile.profession);
  const recommendedLessons = LESSONS_DATA.filter((l) =>
    recommendedLessonIds.includes(l.id)
  );

  const filteredProfessions = useMemo(() => {
    if (!profSearch.trim()) return PROFESSIONS_LIST;
    const q = profSearch.toLowerCase();
    return PROFESSIONS_LIST.filter(
      (p) =>
        p.titleAm.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q)
    );
  }, [profSearch]);

  const totalAnswers = progress.correctAnswersCount + progress.wrongAnswersCount;
  const accuracy =
    totalAnswers > 0 ? Math.round((progress.correctAnswersCount / totalAnswers) * 100) : 100;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = Math.max(5, Math.min(110, Number(age) || 25));
    onUpdateProfile({
      firstName: firstName.trim() || 'Սովորող',
      lastName: lastName.trim(),
      age: parsedAge,
      profession,
      customProfession: customProfession.trim(),
      proficiencyTier,
      level,
      learningGoal,
      customGoal: customGoal.trim(),
    });
    setIsEditing(false);
    setSavedNotice('Պրոֆիլի տվյալները հաջողությամբ թարմացվեցին՝ առանց ուսուցման առաջընթացը կորցնելու։');
    setTimeout(() => setSavedNotice(''), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            ԻՄ ՊՐՈՖԻԼԸ · ԱՆՁՆԱԿԱՆ ՏՎՅԱԼՆԵՐ ԵՎ ՎԻՃԱԿԱԳՐՈՒԹՅՈՒՆ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Սովորողի անձնական էջ
          </h1>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-sm w-fit"
        >
          {isEditing ? <X size={16} /> : <Edit3 size={16} />}
          <span>{isEditing ? UI_TEXT.buttons.cancel : UI_TEXT.buttons.editProfile}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 size={18} /> {savedNotice}
        </div>
      )}

      {/* Profile Summary Card */}
      <div className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-3xl flex items-center justify-center shadow-md shrink-0">
              {(profile.firstName || progress.userName || 'Ս')[0].toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-extrabold">
                  {profile.firstName
                    ? `${profile.firstName} ${profile.lastName}`.trim()
                    : progress.userName}
                </h2>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  Մակարդակ՝ {progress.level} ({profile.proficiencyTier})
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-3">
                <span>{currentProfessionMeta.icon} Մասնագիտություն՝ {displayProfessionAm}</span>
                <span>·</span>
                <span>Տարիք՝ {profile.age} տարեկան</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> Ուսուցման մեկնարկ՝ {profile.learningStartDate}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> Վերջին ակտիվություն՝{' '}
                  {formatArmenianDateTime(progress.lastActiveTimestamp, settings.timezone)}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                <Flame size={20} /> {progress.streakDays}
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Շարունակական օրեր
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center">
              <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                {progress.totalStudyMinutes || progress.dailyStudyMinutes} ր
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Ընդհանուր ժամանակ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form (when isEditing is true) */}
      {isEditing && (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSaveEdit}
          className="rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-lg space-y-6"
        >
          <h3 className="text-xl font-bold flex items-center gap-2">
            <User size={20} className="text-emerald-600" /> Խմբագրել անձնական տվյալները
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Անուն</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Ազգանուն</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Տարիք</label>
              <input
                type="number"
                min={5}
                max={110}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              />
            </div>
          </div>

          {/* Searchable Profession Selector */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-500">Մասնագիտություն</label>
              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={profSearch}
                  onChange={(e) => setProfSearch(e.target.value)}
                  placeholder="Որոնել մասնագիտություն..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-52 overflow-y-auto p-1">
              {filteredProfessions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProfession(p.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 ${
                    profession === p.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="truncate">{p.titleAm}</span>
                </button>
              ))}
            </div>

            {profession === 'Other' && (
              <input
                type="text"
                value={customProfession}
                onChange={(e) => setCustomProfession(e.target.value)}
                placeholder="Գրեք Ձեր մասնագիտությունը..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-emerald-500 text-sm"
              />
            )}
          </div>

          {/* Level & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Անգլերենի մակարդակ
              </label>
              <select
                value={proficiencyTier}
                onChange={(e) => {
                  const tier = e.target.value as ProficiencyTier;
                  setProficiencyTier(tier);
                  const found = PROFICIENCY_TIERS.find((t) => t.tier === tier);
                  if (found) setLevel(found.cefr);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              >
                {PROFICIENCY_TIERS.map((t) => (
                  <option key={t.tier} value={t.tier}>
                    {t.labelAm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Ուսուցման նպատակ
              </label>
              <select
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value as LearningGoalId)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              >
                {LEARNING_GOALS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {g.labelAm}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              {UI_TEXT.buttons.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Save size={15} /> {UI_TEXT.buttons.saveChanges}
            </button>
          </div>
        </motion.form>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
            <span>Ավարտված դասեր</span>
            <BookOpen size={17} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold">
            {progress.completedLessonIds.length} / {LESSONS_DATA.length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
            <span>Սովորած բառեր</span>
            <BookMarked size={17} className="text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold">{progress.learnedWordIds.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
            <span>Ճիշտ պատասխաններ</span>
            <CheckCircle2 size={17} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {progress.correctAnswersCount} ({accuracy}%)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
            <span>Սխալ պատասխաններ</span>
            <XCircle size={17} className="text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-500">
            {progress.wrongAnswersCount}
          </div>
        </div>
      </div>

      {/* Profession-Based Recommended Learning Section */}
      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
              ՄԱՍՆԱԳԻՏՈՒԹՅԱՆԸ ՀԱՄԱՊԱՏԱՍԽԱՆ ՈՒՍՈՒՑՈՒՄ
            </span>
            <h3 className="text-lg font-bold mt-0.5 flex items-center gap-2">
              <Briefcase size={18} className="text-emerald-600" />
              Առաջարկվող դասեր և թեմաներ՝ {displayProfessionAm}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentProfessionMeta.topics.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
            >
              ✓ {t.titleAm} ({t.titleEn})
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {recommendedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Դաս {lesson.order} · Մակարդակ {lesson.level}
                </div>
                <div className="font-bold text-sm mt-0.5">{lesson.titleAm}</div>
              </div>
              <button
                onClick={() => onOpenLesson(lesson.id)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0"
              >
                Բացել դասը
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Speaking Practice History & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Mic size={18} className="text-indigo-500" /> Խոսակցական պարապմունքների պատմություն ({progress.speakingSessions.length})
          </h3>
          {progress.speakingSessions.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              Դեռևս գրանցված ձայնային պարապմունքներ չկան։ Սկսեք «Ձայնային պարապմունք» բաժնից։
            </p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {progress.speakingSessions.map((sp) => (
                <div
                  key={sp.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {formatArmenianDateTime(sp.createdAt, settings.timezone)} · Համընկնում՝{' '}
                      {Math.round(sp.matchRatio * 100)}%
                    </div>
                    <div className="text-sm font-bold">“{sp.recognizedText}”</div>
                    <div className="text-xs text-slate-500">Թիրախ՝ {sp.targetEn}</div>
                  </div>
                  <button
                    onClick={() => onSpeak(sp.targetEn, 'normal')}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shrink-0"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Award size={18} className="text-amber-500" /> Ձեռքբերումներ ({progress.achievements.length})
          </h3>
          <div className="space-y-2.5">
            {progress.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3"
              >
                <span className="text-2xl">{ach.icon}</span>
                <div>
                  <div className="font-bold text-sm">{ach.titleAm}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {ach.descriptionAm}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
