import { findLocalTranslation, TranslationLanguage } from './translation-dictionary';

export const MAX_TRANSLATION_CHARACTERS = 200;
export interface TranslationResult {
  text: string;
  from: TranslationLanguage;
  to: TranslationLanguage;
  source: 'dictionary' | 'mymemory';
  pronunciation?: string;
  cached?: boolean;
}

// A bounded session cache avoids repeat requests without retaining text on disk.
const cache = new Map<string, TranslationResult>();

export function googleTranslateUrl(text: string, from: TranslationLanguage): string {
  const query = new URLSearchParams({ sl: from, tl: from === 'en' ? 'hy' : 'en', text, op: 'translate' });
  return `https://translate.google.com/?${query}`;
}

function decodeEntities(text: string): string {
  const named: Record<string, string> = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity: string) => {
    if (!entity.startsWith('#')) return named[entity.toLowerCase()] || match;
    const hexadecimal = entity.slice(0, 2).toLowerCase() === '#x';
    const code = parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : match;
  });
}

export async function translateText(text: string, from: TranslationLanguage, signal?: AbortSignal): Promise<TranslationResult> {
  const input = text.trim();
  if (!input) throw new Error('Գրեք բառ կամ կարճ նախադասություն։');
  if (from !== 'en' && from !== 'hy') throw new Error('Ընտրեք հայերեն կամ անգլերեն։');
  const to = from === 'en' ? 'hy' : 'en';
  const local = findLocalTranslation(input, from);
  if (local) return { text: to === 'en' ? local.english : local.armenian, from, to, source: 'dictionary', pronunciation: local.pronunciation };

  // MyMemory accepts at most 500 UTF-8 bytes per request, not 500 characters.
  if (input.length > MAX_TRANSLATION_CHARACTERS || new TextEncoder().encode(input).length > 500) {
    throw new Error('Տեքստը երկար է։ Փորձեք մեկ կարճ նախադասություն՝ մինչև 200 նիշ։');
  }
  const key = `${from}:${input}`;
  const cached = cache.get(key);
  if (cached) return { ...cached, cached: true };
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(abort, 12000);
  try {
    const query = new URLSearchParams({ q: input, langpair: `${from}|${to}` });
    const response = await fetch(`https://api.mymemory.translated.net/get?${query}`, {
      signal: controller.signal, cache: 'no-store', referrerPolicy: 'no-referrer', credentials: 'omit',
    });
    if (response.status === 429) throw new Error('Անվճար ծառայության սահմանաչափը սպառվել է։ Փորձեք ավելի ուշ կամ բացեք Google Translate-ը։');
    if (!response.ok) throw new Error('Թարգմանության ծառայությունն անհասանելի է։ Փորձեք Google Translate-ը։');
    const body = await response.json();
    if (body?.quotaFinished || Number(body?.responseStatus) === 429) {
      throw new Error('Անվճար ծառայության սահմանաչափը սպառվել է։ Փորձեք ավելի ուշ կամ բացեք Google Translate-ը։');
    }
    if (Number(body?.responseStatus) !== 200 || typeof body?.responseData?.translatedText !== 'string' || !body.responseData.translatedText.trim()) {
      throw new Error('Այս տեքստի թարգմանությունը չգտնվեց։ Փորձեք Google Translate-ը։');
    }
    const result: TranslationResult = { text: decodeEntities(body.responseData.translatedText).trim(), from, to, source: 'mymemory' };
    if (cache.size >= 100) cache.delete(cache.keys().next().value!);
    cache.set(key, result);
    return result;
  } catch (error) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    if (controller.signal.aborted) throw new Error('Ծառայությունը չի պատասխանում։ Փորձեք կրկին կամ բացեք Google Translate-ը։');
    if (error instanceof TypeError) throw new Error('Ստուգեք ինտերնետ կապը։ Ներքին բառարանը հասանելի է նաև առանց կապի՝ էջը բացելուց հետո։');
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
