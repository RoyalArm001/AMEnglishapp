'use client';

/**
 * Web Speech API wrapper for:
 * 1. Text-to-Speech (TTS) with Slow / Normal rate, custom numeric speed, & English voice selection
 * 2. Speech-to-Text (STT) with microphone permission & browser compatibility handling
 * 3. Transcript comparison (honest word-level matching, NOT fake acoustic phonetic grading)
 */

export interface SpeechSupportInfo {
  ttsSupported: boolean;
  sttSupported: boolean;
}

export interface BrowserVoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
}

export function checkSpeechSupport(): SpeechSupportInfo {
  if (typeof window === 'undefined') {
    return { ttsSupported: false, sttSupported: false };
  }
  const ttsSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const SpeechRecognitionCtor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const sttSupported = Boolean(SpeechRecognitionCtor);
  return { ttsSupported, sttSupported };
}

export function getAvailableEnglishVoices(): BrowserVoiceOption[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  try {
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((v) => v.lang.toLowerCase().startsWith('en'))
      .map((v) => ({
        voiceURI: v.voiceURI,
        name: v.name,
        lang: v.lang,
      }));
  } catch {
    return [];
  }
}

export function speakEnglish(
  text: string,
  rateMode: 'slow' | 'normal' = 'normal',
  onEnd?: () => void,
  options?: {
    customRateNumeric?: number;
    selectedVoiceURI?: string;
  }
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    if (rateMode === 'slow') {
      utterance.rate = 0.72;
    } else if (options?.customRateNumeric && options.customRateNumeric >= 0.5) {
      utterance.rate = options.customRateNumeric;
    } else {
      utterance.rate = 0.98;
    }
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const byUri = options?.selectedVoiceURI
      ? voices.find((v) => v.voiceURI === options.selectedVoiceURI)
      : undefined;

    const preferredVoice =
      byUri ||
      voices.find(
        (v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google'))
      ) ||
      voices.find((v) => v.lang.startsWith('en-US')) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    onEnd?.();
    return false;
  }
}

export interface RecognitionCallbacks {
  onStart?: () => void;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (errorMessageAm: string, errorCode: string) => void;
  onEnd?: () => void;
}

export function startSpeechRecognition(callbacks: RecognitionCallbacks): (() => void) | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognitionCtor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionCtor) {
    callbacks.onError(
      'Ձեր բրաուզերը չի աջակցում խոսքի ճանաչմանը (Web Speech API)։ Կարող եք օգտագործել տեքստային ռեժիմը կամ բացել Chrome / Edge բրաուզերով։',
      'not-supported'
    );
    return null;
  }

  try {
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      callbacks.onStart?.();
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          isFinal = true;
        }
      }
      callbacks.onResult(transcript.trim(), isFinal);
    };

    recognition.onerror = (event: any) => {
      const code = event?.error || 'unknown';
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        callbacks.onError(
          'Միկրոֆոնի թույլտվությունը մերժված է։ Խնդրում ենք թույլատրել միկրոֆոնը բրաուզերի հասցեի տողից կամ շարունակել տեքստային ռեժիմով։',
          code
        );
      } else if (code === 'no-speech') {
        callbacks.onError(
          'Ձայն չլսվեց։ Փորձեք խոսել միկրոֆոնին մի փոքր ավելի մոտ կամ օգտագործեք տեքստային դաշտը։',
          code
        );
      } else if (code === 'audio-capture') {
        callbacks.onError(
          'Միկրոֆոն չգտնվեց։ Համոզվեք, որ միկրոֆոնը միացված է, կամ օգտվեք տեքստային ռեժիմից։',
          code
        );
      } else {
        callbacks.onError(
          `Խոսքի ճանաչման ընդհատում (${code})։ Կարող եք կրկին փորձել կամ գրել տեքստով։`,
          code
        );
      }
    };

    recognition.onend = () => {
      callbacks.onEnd?.();
    };

    recognition.start();

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore stop errors
      }
    };
  } catch {
    callbacks.onError(
      'Չհաջողվեց միացնել միկրոֆոնը։ Կարող եք օգտագործել տեքստային մուտքագրման ռեժիմը։',
      'init-failed'
    );
    return null;
  }
}

export function normalizeEnglishText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bit's\b/g, 'it is')
    .replace(/\bthat's\b/g, 'that is')
    .replace(/\bwhat's\b/g, 'what is')
    .replace(/\blet's\b/g, 'let us')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface WordComparisonItem {
  word: string;
  matched: boolean;
}

export interface SpeechComparisonResult {
  matchRatio: number;
  isAcceptable: boolean;
  wordBreakdown: WordComparisonItem[];
  feedbackAm: string;
}

export function compareSpokenToTarget(
  spokenText: string,
  targetSentence: string,
  alternatives: string[] = []
): SpeechComparisonResult {
  const normSpoken = normalizeEnglishText(spokenText);
  const spokenWords = normSpoken.split(' ').filter(Boolean);
  let cursor = 0;

  const candidates = [targetSentence, ...alternatives];
  for (const cand of candidates) {
    if (normalizeEnglishText(cand) === normSpoken && normSpoken.length > 0) {
      const words = targetSentence.split(/\s+/).filter(Boolean);
      return {
        matchRatio: 1,
        isAcceptable: true,
        wordBreakdown: words.map((w) => ({ word: w, matched: true })),
        feedbackAm: 'Ճանաչված խոսքը ամբողջությամբ համընկնում է նախադասության տեքստի հետ։',
      };
    }
  }

  const targetWordsRaw = targetSentence.split(/\s+/).filter(Boolean);
  const breakdown: WordComparisonItem[] = targetWordsRaw.map((rawWord) => {
    const clean = normalizeEnglishText(rawWord);
    const tokens = clean.split(' ').filter(Boolean);
    const start = spokenWords.findIndex((word, i) => i >= cursor && tokens.every((t, j) => spokenWords[i + j] === t));
    if (start >= 0) cursor = start + tokens.length;
    return { word: rawWord, matched: tokens.length > 0 && start >= 0 };
  });

  const matchedCount = breakdown.filter((b) => b.matched).length;
  const matchRatio = breakdown.length > 0 ? matchedCount / breakdown.length : 0;
  const targetNegated = /\b(not|never|no)\b/.test(normalizeEnglishText(targetSentence));
  const spokenNegated = /\b(not|never|no)\b/.test(normSpoken);
  const isAcceptable = matchRatio >= 0.85 && targetNegated === spokenNegated && spokenWords.length <= breakdown.length * 1.3;

  let feedbackAm = '';
  if (targetNegated !== spokenNegated) {
    feedbackAm = 'Ժխտումը փոխում է նախադասության իմաստը։ Ստուգեք «not / never / no» բառերը և կրկին փորձեք։';
  } else if (isAcceptable) {
    feedbackAm = 'Հիանալի է․ ճանաչված բառերը գրեթե ամբողջությամբ համընկնում են։';
  } else if (matchRatio >= 0.7) {
    feedbackAm = 'Լավ արդյունք է․ հիմնական բառերը ճանաչվել են, ուշադրություն դարձրեք ընդգծված բառերին։';
  } else {
    feedbackAm = 'Որոշ բառեր չեն ճանաչվել․ լսեք դանդաղ տարբերակը և կրկին փորձեք։';
  }

  return {
    matchRatio,
    isAcceptable,
    wordBreakdown: breakdown,
    feedbackAm,
  };
}

export const speakEnglishText = speakEnglish;
export const compareSpeechTranscript = (expected: string, spoken: string) => {
  const comp = compareSpokenToTarget(expected, spoken);
  const matchedWords = comp.wordBreakdown.filter((w) => w.matched).map((w) => w.word);
  const missingWords = comp.wordBreakdown.filter((w) => !w.matched).map((w) => w.word);
  return {
    matchedWords,
    missingWords,
    matchRatio: comp.matchRatio,
    isAcceptable: comp.isAcceptable,
    feedbackAm: comp.feedbackAm,
  };
};
