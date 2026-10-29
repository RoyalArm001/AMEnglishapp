'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Briefcase, CheckCircle2, GraduationCap, Search, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROFESSIONS_LIST } from '../data/professions';
import { LEARNING_GOALS, PROFICIENCY_TIERS, UI_TEXT } from '../lib/i18n';
import {
  CEFRLevel,
  LearningGoalId,
  ProfessionId,
  ProficiencyTier,
  UserProfileRecord,
} from '../lib/types';

interface OnboardingViewProps {
  initialProfile: UserProfileRecord;
  onCompleteOnboarding: (params: {
    firstName: string;
    lastName: string;
    age: number;
    profession: ProfessionId;
    customProfession: string;
    proficiencyTier: ProficiencyTier;
    cefrLevel: CEFRLevel;
    learningGoal: LearningGoalId;
    customGoal: string;
  }) => void;
}

export default function OnboardingView({
  initialProfile,
  onCompleteOnboarding,
}: OnboardingViewProps) {
  const [firstName, setFirstName] = useState<string>(initialProfile.firstName || '');
  const [lastName, setLastName] = useState<string>(initialProfile.lastName || '');
  const [age, setAge] = useState<string>(String(initialProfile.age || 25));
  const [profession, setProfession] = useState<ProfessionId>(
    initialProfile.profession || 'IT Specialist'
  );
  const [customProfession, setCustomProfession] = useState<string>(
    initialProfile.customProfession || ''
  );
  const [professionSearch, setProfessionSearch] = useState<string>('');
  const [proficiencyTier, setProficiencyTier] = useState<ProficiencyTier>(
    initialProfile.proficiencyTier || 'Elementary'
  );
  const [learningGoal, setLearningGoal] = useState<LearningGoalId>(
    initialProfile.learningGoal || 'work'
  );
  const [customGoal, setCustomGoal] = useState<string>(initialProfile.customGoal || '');
  const [errorAm, setErrorAm] = useState<string>('');

  const filteredProfessions = useMemo(() => {
    if (!professionSearch.trim()) return PROFESSIONS_LIST;
    const q = professionSearch.toLowerCase();
    return PROFESSIONS_LIST.filter(
      (p) =>
        p.titleAm.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.descriptionAm.toLowerCase().includes(q)
    );
  }, [professionSearch]);

  const selectedProfessionMeta =
    PROFESSIONS_LIST.find((p) => p.id === profession) || PROFESSIONS_LIST[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorAm('Խնդրում ենք լրացնել Ձեր անունը։');
      return;
    }
    if (!lastName.trim()) {
      setErrorAm('Խնդրում ենք լրացնել Ձեր ազգանունը։');
      return;
    }
    const parsedAge = Number(age);
    if (!parsedAge || parsedAge < 5 || parsedAge > 110) {
      setErrorAm('Խնդրում ենք նշել վավեր տարիք (5–110)։');
      return;
    }
    if (profession === 'Other' && !customProfession.trim()) {
      setErrorAm('Խնդրում ենք գրել Ձեր մասնագիտությունը լրացուցիչ դաշտում։');
      return;
    }

    const tierObj =
      PROFICIENCY_TIERS.find((t) => t.tier === proficiencyTier) || PROFICIENCY_TIERS[1];

    onCompleteOnboarding({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: parsedAge,
      profession,
      customProfession: customProfession.trim(),
      proficiencyTier,
      cefrLevel: tierObj.cefr,
      learningGoal,
      customGoal: customGoal.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-emerald-500/30 shadow-2xl overflow-hidden"
      >
        {/* Top Hero Banner */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-bold mb-3">
            <Sparkles size={14} /> {UI_TEXT.onboarding.welcomeBadge}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {UI_TEXT.onboarding.title}
          </h1>
          <p className="text-sm md:text-base text-emerald-100/90 mt-2 max-w-2xl">
            {UI_TEXT.onboarding.subtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-7">
          {errorAm && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm font-bold">
              ⚠️ {errorAm}
            </div>
          )}

          {/* 1. Անուն, Ազգանուն, Տարիք */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {UI_TEXT.onboarding.firstName} *
              </label>
              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setErrorAm('');
                    setFirstName(e.target.value);
                  }}
                  placeholder="Օրինակ՝ Արմեն"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {UI_TEXT.onboarding.lastName} *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => {
                  setErrorAm('');
                  setLastName(e.target.value);
                }}
                placeholder="Օրինակ՝ Հակոբյան"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {UI_TEXT.onboarding.age} *
              </label>
              <input
                type="number"
                min={5}
                max={110}
                required
                value={age}
                onChange={(e) => {
                  setErrorAm('');
                  setAge(e.target.value);
                }}
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 2. Մասնագիտություն (Searchable List + Other field) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Briefcase size={15} className="text-emerald-600" />
                {UI_TEXT.onboarding.profession} *
              </label>
              <div className="relative w-full sm:w-64">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={professionSearch}
                  onChange={(e) => setProfessionSearch(e.target.value)}
                  placeholder={UI_TEXT.onboarding.professionSearchPlaceholder}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
              {filteredProfessions.map((prof) => {
                const active = profession === prof.id;
                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => {
                      setErrorAm('');
                      setProfession(prof.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="text-xl shrink-0">{prof.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs md:text-sm truncate">
                        {prof.titleAm}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          active ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {prof.titleEn}
                      </div>
                    </div>
                    {active && <CheckCircle2 size={16} className="shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Extra input when "Other" is selected */}
            {profession === 'Other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-2"
              >
                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                  {UI_TEXT.onboarding.customProfessionLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  placeholder="Գրեք Ձեր մասնագիտությունը (օր.՝ Ճարտարապետ, Իրավաբան, Ֆոտոգրաֆ)..."
                  className="w-full px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/40 text-sm font-semibold"
                />
              </motion.div>
            )}

            {/* Preview of profession-tailored topics */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex flex-wrap items-center gap-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                🎯 Առաջարկվող թեմաներ ({selectedProfessionMeta.titleAm})․
              </span>
              {selectedProfessionMeta.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200"
                >
                  {t.titleAm} ({t.titleEn})
                </span>
              ))}
            </div>
          </div>

          {/* 3. Անգլերենի մակարդակ (Beginner / Elementary / Intermediate / Advanced) */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <GraduationCap size={16} className="text-emerald-600" />
              {UI_TEXT.onboarding.englishLevel} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROFICIENCY_TIERS.map((t) => {
                const active = proficiencyTier === t.tier;
                return (
                  <button
                    key={t.tier}
                    type="button"
                    onClick={() => setProficiencyTier(t.tier)}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="font-bold text-sm">{t.labelAm}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        active ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {t.descAm}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Ուսուցման նպատակ */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {UI_TEXT.onboarding.learningGoal} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {LEARNING_GOALS.map((g) => {
                const active = learningGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setLearningGoal(g.id)}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{g.icon}</div>
                    <div className="font-bold text-xs md:text-sm">{g.labelAm}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        active ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {g.descAm}
                    </div>
                  </button>
                );
              })}
            </div>

            {learningGoal === 'other' && (
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Նշեք Ձեր ուսուցման նպատակը..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm mt-2"
              />
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              🔒 Ձեր տվյալները պահպանվում են լոկալ բրաուզերում (IndexedDB) և կարող են ցանկացած պահի խմբագրվել «Իմ պրոֆիլը» բաժնում։
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition shrink-0"
            >
              <span>{UI_TEXT.onboarding.submitButton}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
