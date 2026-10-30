'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Feather,
  Volume2,
  Bookmark,
  Sun,
  Eye,
  EyeOff,
  Type,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Search,
  Star,
  ExternalLink,
  Lock,
} from 'lucide-react';
import {
  UserProgressData,
  BookItem,
  PoemItem,
  BookCategory,
  ReadingProgressRecord,
  BookGlossaryEntry,
} from '@/lib/types';
import {
  BOOKS_DATA,
  POEMS_DATA,
  BOOK_CATEGORIES_DATA,
  lookupWordInLibrary,
} from '@/data/books-and-poetry';
import { speakEnglishText } from '@/lib/speech';
import { setPageMemory } from '@/lib/page-memory';
import { useWakeLock } from '@/lib/use-wake-lock';
import { recordLearningAttempt } from '@/lib/storage';

interface BookLibraryViewProps {
  userProgress: UserProgressData;
  onSaveProgress: (updated: UserProgressData) => void;
  onNavigateTab: (tab: string, subId?: string, step?: number) => void;
  initialItemId?: string;
  initialStep?: number;
  initialMode?: 'reading' | 'poetry';
}

export default function BookLibraryView({
  userProgress,
  onSaveProgress,
  onNavigateTab,
  initialItemId,
  initialStep,
  initialMode,
}: BookLibraryViewProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'poetry'>(initialMode || 'reading');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'all'>('all');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(() => {
    if (initialItemId && BOOKS_DATA.some((b) => b.id === initialItemId)) return initialItemId;
    return null;
  });
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(() => {
    if (initialItemId && POEMS_DATA.some((p) => p.id === initialItemId)) return initialItemId;
    return null;
  });

  // Reader Settings
  const [showArmenianTranslations, setShowArmenianTranslations] = useState(true);
  const [fontSizeLevel, setFontSizeLevel] = useState<'small' | 'medium' | 'large'>('medium');
  const [keepScreenOn, setKeepScreenOn] = useState(true);

  // Active word click popup modal
  const [clickedWord, setClickedWord] = useState<BookGlossaryEntry | null>(null);

  // Active book/chapter/sentence progress
  const activeBook = selectedBookId ? BOOKS_DATA.find((b) => b.id === selectedBookId) : null;
  const activePoem = selectedPoemId ? POEMS_DATA.find((p) => p.id === selectedPoemId) : null;

  // Chapter index for multi-chapter books
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const currentChapter = activeBook?.chapters?.[currentChapterIndex] || activeBook?.chapters?.[0];
  const currentSentences = currentChapter ? currentChapter.paragraphs.flat() : [];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(() => {
    if (typeof initialStep === 'number' && initialStep >= 0) return initialStep;
    return 0;
  });

  // Screen Wake Lock
  const isReaderOpen = Boolean(activeBook || activePoem);
  const { status: wakeLockStatus } = useWakeLock(isReaderOpen && keepScreenOn, 'book-reader');

  // Sync URL on selection or step change
  useEffect(() => {
    if (activeBook) {
      setPageMemory({
        tab: 'books',
        subId: activeBook.id,
        step: currentSentenceIndex,
        mode: 'reading',
      });
    } else if (activePoem) {
      setPageMemory({
        tab: 'books',
        subId: activePoem.id,
        step: 0,
        mode: 'poetry',
      });
    } else {
      setPageMemory({
        tab: 'books',
        mode: activeTab,
      });
    }
  }, [activeBook?.id, activePoem?.id, currentSentenceIndex, activeTab]);

  // Restore saved reading progress when opening a book
  useEffect(() => {
    if (activeBook) {
      const saved = userProgress.readingProgressMap?.[activeBook.id];
      if (saved) {
        setCurrentSentenceIndex(saved.currentSentenceIndex || 0);
        if (saved.currentChapterId && activeBook.chapters) {
          const chIdx = activeBook.chapters.findIndex((c) => c.id === saved.currentChapterId);
          if (chIdx >= 0) setCurrentChapterIndex(chIdx);
        }
      } else {
        setCurrentSentenceIndex(0);
        setCurrentChapterIndex(0);
      }
    }
  }, [activeBook?.id]);

  const handlePlayAudio = (text: string) => {
    speakEnglishText(text, 'normal', undefined, {
      customRateNumeric: userProgress.settings?.voiceSpeedNumeric,
      selectedVoiceURI: userProgress.settings?.selectedVoiceURI,
    });
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (!cleanWord) return;
    const found = lookupWordInLibrary(cleanWord);
    if (found) {
      setClickedWord({
        ...found,
        word: found.word || found.wordEn,
        wordEn: found.wordEn || found.word || cleanWord,
      });
      handlePlayAudio(found.wordEn || found.word || cleanWord);
    } else {
      setClickedWord({
        word: cleanWord,
        wordEn: cleanWord,
        pronunciation: cleanWord,
        translationAm: 'Սեղմեք «Լսել»՝ արտասանությունը ստուգելու համար',
      });
      handlePlayAudio(cleanWord);
    }
  };

  const handleSaveWordToVocabulary = (entry: BookGlossaryEntry) => {
    const wordKey = (entry.wordEn || entry.word || '').toLowerCase();
    const currentFavorites = userProgress.favoriteWordIds || [];
    if (!currentFavorites.includes(wordKey)) {
      onSaveProgress({
        ...userProgress,
        favoriteWordIds: [...currentFavorites, wordKey],
      });
    }
    setClickedWord(null);
  };

  const handleSentenceChange = (newIndex: number) => {
    if (!activeBook) return;
    setCurrentSentenceIndex(newIndex);

    // Save reading progress in userProgress
    const record: ReadingProgressRecord = {
      id: `read-${activeBook.id}`,
      userId: userProgress.profile?.id || 'user-main',
      itemId: activeBook.id,
      itemKind: 'book',
      currentSentenceIndex: newIndex,
      currentChapterId: activeBook.chapters?.[currentChapterIndex]?.id,
      scrollPercentage: Math.round(
        (newIndex / Math.max(1, currentSentences.length)) * 100
      ),
      isFinished: newIndex >= currentSentences.length - 1,
      lastReadAt: Date.now(),
      updatedAt: Date.now(),
    };

    let updated = recordLearningAttempt(userProgress, {
      isCorrect: true,
      skill: 'reading',
      source: 'book_reading',
      prompt: activeBook.titleEn,
      userAnswer: 'Sentence read',
      correctAnswer: '',
      explanationAm: `Ընթերցանություն՝ ${activeBook.titleAm}`,
      activityTitleAm: `Գիրք՝ ${activeBook.titleAm}`,
      minutesAdded: 1,
    });

    updated = {
      ...updated,
      readingProgressMap: {
        ...(updated.readingProgressMap || {}),
        [activeBook.id]: record,
      },
    };

    onSaveProgress(updated);
  };

  // Font size classes
  const fontClass =
    fontSizeLevel === 'small'
      ? 'text-sm leading-relaxed'
      : fontSizeLevel === 'large'
      ? 'text-xl leading-loose'
      : 'text-base leading-relaxed';

  // Filter books by category
  const filteredBooks = BOOKS_DATA.filter((b) => {
    if (selectedCategory === 'all') return true;
    return b.category === selectedCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      {!activeBook && !activePoem && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Անգլերեն ընթերցանության ակումբ</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Գրադարան և Պոեզիա
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              10 երկար պատմվածքներ, 5 բազմագլուխ գրքեր և 10 դասական պոեմներ՝ բառարանով ու ձայնով։
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setActiveTab('reading');
                setSelectedBookId(null);
                setSelectedPoemId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'reading'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Գրքեր & Պատմվածքներ</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('poetry');
                setSelectedBookId(null);
                setSelectedPoemId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'poetry'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Feather className="w-4 h-4" />
              <span>Պոեզիայի ռեժիմ</span>
            </button>
          </div>
        </div>
      )}

      {/* Word Click Translation Modal Popup */}
      {clickedWord && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full rounded-2xl bg-slate-900 border border-indigo-500/40 p-5 space-y-4 shadow-2xl text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{clickedWord.wordEn || clickedWord.word}</span>
                  <button
                    onClick={() => handlePlayAudio(clickedWord.wordEn || clickedWord.word || '')}
                    className="p-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300"
                    title="Լսել"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </h3>
                <span className="text-xs text-indigo-300">
                  [{clickedWord.pronunciation}]
                </span>
              </div>
              {clickedWord.partOfSpeechAm && (
                <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-400 font-semibold">
                  {clickedWord.partOfSpeechAm}
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm font-semibold text-emerald-300">
              {clickedWord.translationAm}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleSaveWordToVocabulary(clickedWord)}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Պահպանել բառացանկում</span>
              </button>
              <button
                onClick={() => setClickedWord(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Փակել
              </button>
            </div>
          </div>
        </div>
      )}

      {/* READING MODE: Book Reader Screen */}
      {activeBook ? (
        <div className="space-y-4">
          {/* Reader Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setSelectedBookId(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Վերադառնալ գրադարան</span>
            </button>

            {/* Font size & translation toggles */}
            <div className="flex items-center gap-2">
              {/* Wake lock indicator */}
              <button
                onClick={() => setKeepScreenOn(!keepScreenOn)}
                className={`p-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  keepScreenOn
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
                title={keepScreenOn ? 'Էկրանը չի անջատվում' : 'Էկրանը կարող է քնել'}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Էկրան</span>
              </button>

              {/* Translation toggle */}
              <button
                onClick={() => setShowArmenianTranslations(!showArmenianTranslations)}
                className={`p-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  showArmenianTranslations
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
                title="Միացնել / անջատել նախադասության հայերեն թարգմանությունը"
              >
                {showArmenianTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Թարգմանություն</span>
              </button>

              {/* Font size toggle */}
              <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5">
                {(['small', 'medium', 'large'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFontSizeLevel(lvl)}
                    className={`px-2 py-1 rounded text-xs font-bold transition ${
                      fontSizeLevel === lvl ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    {lvl === 'small' ? 'A' : lvl === 'medium' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Header & Title */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {activeBook.category} • {activeBook.level}
              </span>
              <span className="text-xs text-slate-400">
                Հեղինակ՝ {activeBook.author}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeBook.titleEn}
            </h2>
            <p className="text-sm text-indigo-300 font-medium">
              {activeBook.titleAm}
            </p>
          </div>

          {/* Multi-chapter switcher if chapters exist */}
          {activeBook.chapters && activeBook.chapters.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {activeBook.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setCurrentSentenceIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                    currentChapterIndex === idx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Գլուխ {ch.chapterNumber}․ {ch.titleAm}
                </button>
              ))}
            </div>
          )}

          {/* Sentences Interactive Reader */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl">
            <p className="text-xs text-indigo-300 font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Սեղմիր ցանկացած անգլերեն բառի վրա՝ հայերեն թարգմանությունը տեսնելու համար։</span>
            </p>

            <div className="space-y-4">
              {currentSentences.map((st, idx) => {
                const isSelected = idx === currentSentenceIndex;
                const words = st.english.split(' ');
                return (
                  <div
                    key={`st-${idx}`}
                    onClick={() => handleSentenceChange(idx)}
                    className={`p-4 rounded-xl border transition cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`font-medium text-slate-100 ${fontClass}`}>
                        {words.map((w, wIdx) => (
                          <span
                            key={wIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWordClick(w);
                            }}
                            className="hover:text-indigo-400 hover:underline cursor-pointer inline-block mr-1 transition-colors"
                          >
                            {w}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(st.english);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 shrink-0"
                        title="Լսել ամբողջ նախադասությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {showArmenianTranslations && (
                      <p className="text-xs sm:text-sm text-slate-400 pt-1 border-t border-slate-800/60">
                        {st.armenian}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : activePoem ? (
        /* POETRY MODE: Poem Line-by-Line Reader */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedPoemId(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Վերադառնալ պոեզիայի ցանկ</span>
            </button>

            <button
              onClick={() => handlePlayAudio(activePoem.lines.map((l) => l.english).join('. '))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Լսել ամբողջ պոեմը</span>
            </button>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl text-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Դասական պոեզիա • {activePoem.level}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {activePoem.titleEn}
              </h2>
              <p className="text-sm text-indigo-300">{activePoem.titleAm}</p>
              <p className="text-xs text-slate-400 mt-0.5">Հեղինակ՝ {activePoem.author}</p>
            </div>

            {/* Lines */}
            <div className="space-y-4 max-w-xl mx-auto text-left">
              {activePoem.lines.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-serif text-white tracking-wide">
                      {line.english}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(line.english)}
                      className="p-1 text-slate-400 hover:text-indigo-300"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-indigo-300">[{line.pronunciation}]</p>
                  <p className="text-xs text-slate-400">{line.armenian}</p>
                </div>
              ))}
            </div>

            {/* Glossary */}
            {((activePoem.unfamiliarWords || activePoem.glossary) && (activePoem.unfamiliarWords || activePoem.glossary)!.length > 0) && (
              <div className="text-left pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Գրական բառարան
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(activePoem.unfamiliarWords || activePoem.glossary)!.map((g, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{g.word || g.wordEn}</span>
                        <span className="text-indigo-300">[{g.pronunciation}]</span>
                      </div>
                      <p className="text-slate-300 mt-0.5">{g.meaningAm}</p>
                      <p className="text-[11px] text-slate-500">{g.explanationAm}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'reading' ? (
        /* LIBRARY CATALOG: Books List */
        <div className="space-y-6">
          {/* Categories Horizontal Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Բոլորը ({BOOKS_DATA.length})
            </button>
            {BOOK_CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.icon} {cat.labelAm}
              </button>
            ))}
          </div>

          {/* Books Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => {
              const progress = userProgress.readingProgressMap?.[book.id];
              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 space-y-4 cursor-pointer transition shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {book.level}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        ~{book.readingMinutes || book.totalReadingMinutes} րոպե
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-lg leading-snug">
                      {book.titleEn}
                    </h3>
                    <p className="text-xs text-indigo-300 font-medium">
                      {book.titleAm}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {book.summaryAm}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{book.author}</span>
                    <span className="text-indigo-400 flex items-center gap-1">
                      {progress?.isFinished ? 'Ավարտված է' : progress?.scrollPercentage ? `${progress.scrollPercentage}%` : 'Կարդալ'}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* POETRY CATALOG: 10 Classic Poems */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POEMS_DATA.map((poem) => (
            <div
              key={poem.id}
              onClick={() => setSelectedPoemId(poem.id)}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 space-y-3 cursor-pointer transition shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {poem.level}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{poem.author}</span>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg font-serif">
                  {poem.titleEn}
                </h3>
                <p className="text-xs text-indigo-300 font-medium">{poem.titleAm}</p>
              </div>

              <p className="text-xs text-slate-400 italic line-clamp-2">
                «{poem.lines[0]?.english}»
              </p>

              <div className="pt-2 flex items-center justify-end text-xs font-bold text-indigo-400">
                <span>Կարդալ տող առ տող →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

