const { test, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

// Load the pure TypeScript modules in Node; next build checks their types.
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  }).outputText, filename);
};

const { translateText, googleTranslateUrl } = require('../lib/translation.ts');
const { TRANSLATION_DICTIONARY, findLocalTranslation, normalizeTranslationText } = require('../lib/translation-dictionary.ts');
const { evaluateWithRuleBasedTeacher } = require('../lib/teacher-engine.ts');

afterEach(() => mock.restoreAll());
const remoteResponse = (translatedText, extra = {}) => new Response(JSON.stringify({
  responseStatus: 200, responseData: { translatedText }, quotaFinished: false, ...extra,
}), { headers: { 'Content-Type': 'application/json' } });

test('the bilingual base combines lessons, vocabulary, dialogue, and the new phrasebook', () => {
  assert.ok(TRANSLATION_DICTIONARY.length > 700);
  assert.ok(TRANSLATION_DICTIONARY.every((entry) => entry.english.trim() && entry.armenian.trim()));
  const keys = TRANSLATION_DICTIONARY.map((entry) => `${normalizeTranslationText(entry.english)}|${normalizeTranslationText(entry.armenian)}`);
  assert.equal(new Set(keys).size, keys.length);
});

test('local translations work in both directions without a network request', async () => {
  const request = mock.method(globalThis, 'fetch', () => { throw new Error('Network must not be used'); });
  assert.equal((await translateText('  GOOD MORNING! ', 'en')).text, 'Բարի առավոտ');
  assert.equal((await translateText('Ես անգլերեն եմ սովորում։', 'hy')).text, 'I am learning English.');
  assert.equal((await translateText('Ինչպե՞ս եք։', 'hy')).text, 'How are you?');
  assert.equal(request.mock.callCount(), 0);
});

test('normalization preserves decimal points and meaningful punctuation', () => {
  assert.notEqual(normalizeTranslationText('1.5'), normalizeTranslationText('15'));
  assert.equal(normalizeTranslationText('I’m ready.'), "i'm ready");
  assert.ok(findLocalTranslation('Որտե՞ղ է ավտոբուսի կանգառը։', 'hy'));
});

test('unknown text uses the documented keyless provider and caches a successful result', async () => {
  const input = 'The purple notebook is beside the telescope.';
  const request = mock.method(globalThis, 'fetch', async (url, options) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, 'https://api.mymemory.translated.net');
    assert.equal(parsed.searchParams.get('q'), input);
    assert.equal(parsed.searchParams.get('langpair'), 'en|hy');
    assert.equal(parsed.searchParams.has('key'), false);
    assert.equal(parsed.searchParams.has('de'), false);
    assert.equal(options.credentials, 'omit');
    return remoteResponse('Մանուշակագույն տետրը աստղադիտակի կողքին է։');
  });
  const result = await translateText(input, 'en');
  assert.equal(result.source, 'mymemory');
  assert.equal(result.to, 'hy');
  assert.equal((await translateText(input, 'en')).cached, true);
  assert.equal(request.mock.callCount(), 1);
  assert.equal(findLocalTranslation(input, 'en'), undefined);
});

test('Armenian input requests English and safely decodes character entities', async () => {
  mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(new URL(url).searchParams.get('langpair'), 'hy|en');
    return remoteResponse('The sign says &quot;welcome&quot; &amp; &#39;hello&#39;.');
  });
  const result = await translateText('Պատին գրված են ողջույնի բառերը։', 'hy');
  assert.equal(result.text, 'The sign says "welcome" & \'hello\'.');
});

test('provider quotas and rate limits return a usable explanation', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('', { status: 429 }));
  await assert.rejects(translateText('Quota test one.', 'en'), /սահմանաչափ/);
  mock.restoreAll();
  mock.method(globalThis, 'fetch', async () => remoteResponse('quota message', { quotaFinished: true }));
  await assert.rejects(translateText('Quota test two.', 'en'), /սահմանաչափ/);
});

test('an empty successful response is not presented or cached as a translation', async () => {
  const request = mock.method(globalThis, 'fetch', async () => remoteResponse(''));
  await assert.rejects(translateText('Empty response example.', 'en'), /չգտնվեց/);
  await assert.rejects(translateText('Empty response example.', 'en'), /չգտնվեց/);
  assert.equal(request.mock.callCount(), 2);
});

test('invalid requests do not leave the browser', async () => {
  const request = mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  await assert.rejects(translateText(' ', 'en'), /Գրեք/);
  await assert.rejects(translateText('x'.repeat(201), 'en'), /երկար/);
  await assert.rejects(translateText('€'.repeat(180), 'hy'), /երկար/);
  await assert.rejects(translateText('test', 'fr'), /Ընտրեք/);
  assert.equal(request.mock.callCount(), 0);
});

test('network failures provide an offline dictionary alternative', async () => {
  mock.method(globalThis, 'fetch', async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(translateText('Network failure sample.', 'en'), /ինտերնետ/);
});

test('cancelling an in-flight translation aborts the external request', async () => {
  mock.method(globalThis, 'fetch', (_, options) => new Promise((resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }));
  const controller = new AbortController();
  const pending = translateText('Cancelled request sample.', 'en', controller.signal);
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
});

test('Google fallback encodes the text as a URL parameter', () => {
  const url = new URL(googleTranslateUrl('hello & goodbye? #test', 'hy'));
  assert.equal(url.origin, 'https://translate.google.com');
  assert.equal(url.searchParams.get('sl'), 'hy');
  assert.equal(url.searchParams.get('tl'), 'en');
  assert.equal(url.searchParams.get('text'), 'hello & goodbye? #test');
});

test('the study assistant evaluates an existing exercise entirely locally', () => {
  const request = mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  const result = evaluateWithRuleBasedTeacher({ currentQuestionId: 'tq-1', userAnswer: 'I restart the router.', masteredQuestionIds: [], weakTopics: [], difficultyScore: 2 });
  assert.equal(result.mode, 'rule-based');
  assert.equal(result.isFullyCorrect, true);
  assert.equal(result.masteredQuestionId, 'tq-1');
  assert.equal(request.mock.callCount(), 0);
});
