'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftRight, BookOpen, Check, Copy, ExternalLink, Languages, Loader2, Search, Volume2 } from 'lucide-react';
import { searchTranslationDictionary, TRANSLATION_DICTIONARY, TranslationLanguage } from '../lib/translation-dictionary';
import { googleTranslateUrl, MAX_TRANSLATION_CHARACTERS, translateText, TranslationResult } from '../lib/translation';

export default function TranslationView({ onSpeak }: { onSpeak: (text: string) => void }) {
  const [text, setText] = useState('');
  const [from, setFrom] = useState<TranslationLanguage>('en');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const controller = useRef<AbortController | null>(null);
  const requestId = useRef(0);
  const matches = searchTranslationDictionary(query, visibleCount + 1);
  const languageName = (language: TranslationLanguage) => language === 'en' ? 'Անգլերեն' : 'Հայերեն';
  const to = from === 'en' ? 'hy' : 'en';

  useEffect(() => () => { requestId.current += 1; controller.current?.abort(); }, []);

  const resetRequest = () => {
    requestId.current += 1;
    controller.current?.abort();
    setLoading(false);
    setResult(null);
    setError('');
    setCopied(false);
  };

  const handleTranslate = async (event: React.FormEvent) => {
    event.preventDefault();
    resetRequest();
    const id = requestId.current;
    controller.current = new AbortController();
    setLoading(true);
    try {
      const translated = await translateText(text, from, controller.current.signal);
      if (requestId.current === id) setResult(translated);
    } catch (failure) {
      if (requestId.current === id) setError(failure instanceof Error ? failure.message : 'Թարգմանությունը չհաջողվեց։');
    } finally {
      if (requestId.current === id) setLoading(false);
    }
  };

  const handleSwap = () => {
    const nextText = result?.text || '';
    resetRequest();
    setFrom(to);
    setText(nextText);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400">ՀԱՅԵՐԵՆ ↔ ԱՆԳԼԵՐԵՆ</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold">Բառից դեպի խոսք</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Թարգմանեք, լսեք անգլերենը և գտեք առօրյայում պետք եկող արտահայտություններ։</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <BookOpen size={17} /> {TRANSLATION_DICTIONARY.length.toLocaleString('en-US')} բառ և արտահայտություն
        </span>
      </header>

      <form onSubmit={handleTranslate} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <div className="mb-4 flex items-center gap-3">
          <label htmlFor="translation-language" className="sr-only">Բնագրի լեզուն</label>
          <select id="translation-language" value={from} onChange={(event) => { resetRequest(); setFrom(event.target.value as TranslationLanguage); }} className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-800">
            <option value="en">Անգլերեն</option>
            <option value="hy">Հայերեն</option>
          </select>
          <button type="button" onClick={handleSwap} aria-label="Փոխել թարգմանության ուղղությունը" className="rounded-xl p-2 text-emerald-600 hover:bg-emerald-500/10"><ArrowLeftRight size={20} /></button>
          <span className="text-sm font-bold">{languageName(to)}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="translation-input" className="mb-2 block text-sm font-semibold">Թարգմանվող տեքստը</label>
            <textarea id="translation-input" value={text} maxLength={MAX_TRANSLATION_CHARACTERS} onChange={(event) => { resetRequest(); setText(event.target.value); }} placeholder={from === 'en' ? 'Օրինակ՝ I am learning English.' : 'Օրինակ՝ Ես անգլերեն եմ սովորում։'} className="min-h-44 w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-4 text-base outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800" />
            <p className="mt-1 text-right text-xs text-slate-400">{text.length}/{MAX_TRANSLATION_CHARACTERS}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Թարգմանությունը</p>
            <div role="status" aria-live="polite" aria-busy={loading} className="min-h-44 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
              {loading ? <p className="flex items-center gap-2 text-sm text-slate-500"><Loader2 size={17} className="animate-spin" /> Թարգմանվում է…</p> : result ? (
                <>
                  <p lang={result.to} className="whitespace-pre-wrap break-words text-lg font-medium">{result.text}</p>
                  {result.pronunciation && <p className="mt-3 text-xs text-slate-500">Անգլերենը կարդացվում է՝ {result.pronunciation}</p>}
                  <p className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{result.source === 'dictionary' ? 'Աղբյուր՝ HayLingo-ի ուսումնական բազա' : `Աղբյուր՝ MyMemory · առցանց առաջարկ${result.cached ? ' · այս էջում արդեն ստացված' : ''}`}</p>
                  {result.source === 'mymemory' && <p className="mt-1 text-xs text-slate-500">Թարգմանությունը կարող է անճշտություններ պարունակել։ Այն չի ավելացվում դասերի պատասխաններին։</p>}
                </>
              ) : <p className="text-sm text-slate-400">Արդյունքը կհայտնվի այստեղ։</p>}
            </div>
          </div>
        </div>

        {error && <p role="alert" className="mt-3 rounded-xl bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-200">{error}</p>}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Նախ փնտրում ենք ներքին բազայում։ Չգտնելու դեպքում «Թարգմանել» կոճակը տեքստը կուղարկի MyMemory-ին։ Ծառայությունն անվճար է՝ օրական սահմանաչափով, գրանցում կամ բանալի պետք չէ։</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading || !text.trim()} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"><Languages size={18} /> Թարգմանել</button>
          {result && <>
            <button type="button" onClick={() => onSpeak(result.to === 'en' ? result.text : text)} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800"><Volume2 size={16} /> Լսել անգլերենը</button>
            <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(result.text); setCopied(true); } catch { setError('Պատճենեք թարգմանությունը՝ ընտրելով տեքստը։'); } }} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Պատճենված է' : 'Պատճենել'}</button>
          </>}
          {text.trim() && <a href={googleTranslateUrl(text, from)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-emerald-700 underline underline-offset-4 dark:text-emerald-400">Բացել Google Translate-ում <ExternalLink size={14} /></a>}
        </div>
      </form>

      <section aria-labelledby="dictionary-heading" className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 id="dictionary-heading" className="text-xl font-bold">Մեր բառերն ու արտահայտությունները</h2>
            <p className="mt-1 text-xs text-slate-500">Որոնեք հայերեն կամ անգլերեն։ Այս բաժինը արտաքին ծառայություն չի օգտագործում։</p>
          </div>
          <div className="relative sm:w-72">
            <Search size={17} className="absolute left-3 top-3 text-slate-400" />
            <input aria-label="Որոնել ներքին բառարանում" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }} placeholder="Բառ կամ արտահայտություն…" className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, visibleCount).map((entry) => <article key={`${entry.english}|${entry.armenian}`} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{entry.category}</p>
            <p lang="en" className="mt-2 font-semibold">{entry.english}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.armenian}</p>
            <button type="button" aria-label={`Լսել՝ ${entry.english}`} onClick={() => onSpeak(entry.english)} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"><Volume2 size={14} /> Լսել</button>
          </article>)}
        </div>
        {matches.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">Ներքին բազայում արդյունք չկա։ Կարող եք օգտագործել վերևի թարգմանիչը։</p>}
        {matches.length > visibleCount && <button type="button" onClick={() => setVisibleCount((count) => count + 12)} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold dark:bg-slate-800">Ցույց տալ ավելին</button>}
      </section>
    </div>
  );
}
