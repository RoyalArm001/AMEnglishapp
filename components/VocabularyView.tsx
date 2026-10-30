'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Layers,
  Repeat,
  Search,
  Star,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { VOCABULARY_CATEGORIES, VOCABULARY_ITEMS } from '../data/vocabulary';
import { CEFRLevel, UserProgressData, VocabularyItem } from '../lib/types';

interface VocabularyViewProps {
  progress: UserProgressData;
  onSpeak: (text: string, speed?: 'slow' | 'normal') => void;
  onToggleFavoriteWord: (wordId: string) => void;
  onGradeSRSWord: (wordId: string, grade: 'again' | 'hard' | 'good' | 'easy') => void;
}

export default function VocabularyView({
  progress,
  onSpeak,
  onToggleFavoriteWord,
  onGradeSRSWord,
}: VocabularyViewProps) {
  const [subTab, setSubTab] = useState<'list' | 'flashcards' | 'srs' | 'favorites'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');

  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredWords = useMemo(() => {
    return VOCABULARY_ITEMS.filter((item) => {
      if (subTab === 'favorites' && !progress.favoriteWordIds.includes(item.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.word.toLowerCase().includes(q) ||
          item.armenian.toLowerCase().includes(q) ||
          item.pronunciation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [subTab, selectedCategory, selectedLevel, searchQuery, progress.favoriteWordIds]);

  // Words due for Spaced Repetition review (or unlearned words)
  const srsQueue = useMemo(() => {
    const now = Date.now();
    const due = VOCABULARY_ITEMS.filter((w) => {
      const srs = progress.srsWords[w.id];
      if (!srs) return true;
      return srs.nextReviewAt <= now;
    });
    return due.length > 0 ? due : VOCABULARY_ITEMS;
  }, [progress.srsWords]);

  const activeDeck: VocabularyItem[] =
    subTab === 'srs'
      ? srsQueue
      : filteredWords.length > 0
      ? filteredWords
      : VOCABULARY_ITEMS;

  const currentCard = activeDeck[flashcardIdx % Math.max(1, activeDeck.length)] || VOCABULARY_ITEMS[0];

  const handleSRSGrade = (grade: 'again' | 'hard' | 'good' | 'easy') => {
    onGradeSRSWord(currentCard.id, grade);
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev + 1) % Math.max(1, activeDeck.length));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            VOCABULARY & SPACED REPETITION · ԲԱՌԵՐԻ ՈՒՍՈՒՑՈՒՄ ({VOCABULARY_ITEMS.length} ԲԱՌ)
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            Բառարան, Քարտեր (Flashcards) և Ինտերվալային Կրկնություն
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            Սովորած՝ {progress.learnedWordIds.length} / {VOCABULARY_ITEMS.length}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
            Ընտրյալներ՝ {progress.favoriteWordIds.length}
          </span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'list', label: `📚 Բոլոր բառերը (${VOCABULARY_ITEMS.length})`, icon: BookMarked },
          { id: 'flashcards', label: '🃏 Քարտեր', icon: Layers },
          { id: 'srs', label: `🔄 Ինտերվալային կրկնություն (${srsQueue.length})`, icon: Repeat },
          { id: 'favorites', label: `⭐ Ընտրյալներ (${progress.favoriteWordIds.length})`, icon: Star },
        ].map((t) => {
          const Icon = t.icon;
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSubTab(t.id as any);
                setFlashcardIdx(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition ${
                active
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <Icon size={16} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Flashcards & Spaced Repetition View */}
      {(subTab === 'flashcards' || subTab === 'srs') && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              {subTab === 'srs'
                ? 'Ինտերվալային կրկնություն (Spaced Repetition)'
                : 'Քարտային ուսուցում (Flashcards)'}
            </span>
            <span>
              Քարտ {(flashcardIdx % Math.max(1, activeDeck.length)) + 1} / {activeDeck.length}
            </span>
          </div>

          <motion.div
            key={`${currentCard.id}-${isFlipped}`}
            initial={{ opacity: 0, rotateX: -8 }}
            animate={{ opacity: 1, rotateX: 0 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer rounded-3xl p-8 md:p-10 bg-white dark:bg-slate-900 border-2 border-emerald-500/30 shadow-lg min-h-[320px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                {currentCard.category} · {currentCard.level}
              </span>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onSpeak(currentCard.word, 'normal')}
                  className="p-2.5 rounded-xl bg-emerald-600 text-white"
                  title="Լսել բառը"
                >
                  <Volume2 size={18} />
                </button>
                <button
                  onClick={() => onToggleFavoriteWord(currentCard.id)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  title="Պահպանել ընտրյալներում"
                >
                  <Star
                    size={18}
                    className={
                      progress.favoriteWordIds.includes(currentCard.id)
                        ? 'fill-amber-500 text-amber-500'
                        : ''
                    }
                  />
                </button>
              </div>
            </div>

            {!isFlipped ? (
              <div className="text-center py-8 space-y-3">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                  <span data-learning-text="english">{currentCard.word}</span>
                </h2>
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  🔊 <span data-learning-text="pronunciation">{currentCard.pronunciation}</span>
                </p>
                <p className="text-xs text-slate-400 pt-4">
                  Սեղմեք քարտի վրա՝ հայերեն նշանակությունը և օրինակը տեսնելու համար
                </p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">
                    Հայերեն նշանակություն
                  </div>
                  <p className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <span data-learning-text="armenian">{currentCard.armenian}</span>
                  </p>
                </div>

                <div
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Օգտագործման օրինակ․</span>
                    <button
                      onClick={() => onSpeak(currentCard.exampleEn, 'normal')}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                    >
                      <Volume2 size={14} /> Լսել օրինակը
                    </button>
                  </div>
                  <p className="font-bold text-base"><span data-learning-text="english">{currentCard.exampleEn}</span></p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    🔊 <span data-learning-text="pronunciation">{currentCard.examplePronunciation}</span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    🇦🇲 <span data-learning-text="armenian">{currentCard.exampleAm}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="text-center text-xs font-semibold text-slate-400">
              {isFlipped ? 'Սեղմեք՝ անգլերեն երեսին վերադառնալու համար' : 'Սեղմեք՝ շրջելու համար ↻'}
            </div>
          </motion.div>

          {/* Spaced Repetition Grading Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-center text-slate-500">
              Գնահատեք՝ որքան հեշտ հիշեցիք բառը (Spaced Repetition)․
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleSRSGrade('again')}
                className="p-3 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold text-xs"
              >
                🔁 Կրկնել հիմա
                <span className="block text-[10px] opacity-75 mt-0.5">10 րոպեից</span>
              </button>
              <button
                onClick={() => handleSRSGrade('hard')}
                className="p-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs"
              >
                😓 Դժվար էր
                <span className="block text-[10px] opacity-75 mt-0.5">1 օրից</span>
              </button>
              <button
                onClick={() => handleSRSGrade('good')}
                className="p-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs"
              >
                👍 Լավ
                <span className="block text-[10px] opacity-75 mt-0.5">3 օրից</span>
              </button>
              <button
                onClick={() => handleSRSGrade('easy')}
                className="p-3 rounded-2xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold text-xs"
              >
                ⚡ Հեշտ
                <span className="block text-[10px] opacity-75 mt-0.5">7+ օրից</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIdx((prev) => (prev - 1 + activeDeck.length) % activeDeck.length);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft size={15} /> Նախորդ բառը
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIdx((prev) => (prev + 1) % activeDeck.length);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1"
            >
              Հաջորդ բառը <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Search & Filters for Word Bank / Favorites */}
      {(subTab === 'list' || subTab === 'favorites') && (
        <>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Որոնել բառ՝ անգլերեն, հայերեն կամ արտասանությամբ..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs md:text-sm font-semibold"
            >
              <option value="all">Բոլոր թեմաները</option>
              {VOCABULARY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs md:text-sm font-semibold"
            >
              <option value="all">Բոլոր մակարդակները (A1–C2)</option>
              {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Մակարդակ {lvl}
                </option>
              ))}
            </select>
          </div>

          {filteredWords.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-500">
              Բառեր չգտնվեցին ըստ ընտրված ֆիլտրի։
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredWords.map((item) => {
                const isFav = progress.favoriteWordIds.includes(item.id);
                const isLearned = progress.learnedWordIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                              <span data-learning-text="english">{item.word}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
                              {item.level}
                            </span>
                            {isLearned && (
                              <CheckCircle2 size={15} className="text-emerald-500" />
                            )}
                          </div>
                          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            🔊 <span data-learning-text="pronunciation">{item.pronunciation}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onSpeak(item.word, 'normal')}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white transition"
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 size={16} />
                          </button>
                          <button
                            onClick={() => onToggleFavoriteWord(item.id)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 transition"
                            title="Պահպանել ընտրյալներում"
                          >
                            <Star
                              size={16}
                              className={isFav ? 'fill-amber-500 text-amber-500' : ''}
                            />
                          </button>
                        </div>
                      </div>

                      <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
                        🇦🇲 <span data-learning-text="armenian">{item.armenian}</span>
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase text-slate-400">
                          Օրինակ · {item.category}
                        </span>
                        <button
                          onClick={() => onSpeak(item.exampleEn, 'normal')}
                          className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"
                        >
                          <Volume2 size={13} /> Լսել
                        </button>
                      </div>
                      <p className="text-xs md:text-sm font-semibold"><span data-learning-text="english">{item.exampleEn}</span></p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        <span data-learning-text="pronunciation">{item.examplePronunciation}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        <span data-learning-text="armenian">{item.exampleAm}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        {progress.srsWords[item.id]
                          ? `Կրկնված՝ ${progress.srsWords[item.id].repetitions} անգամ`
                          : 'Նոր բառ'}
                      </span>
                      <button
                        onClick={() => onGradeSRSWord(item.id, 'good')}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {isLearned ? '✓ Կրկնված է' : '+ Նշել որպես սովորած'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

