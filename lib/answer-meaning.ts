import type { AnswerMeaning } from './types';

const SMALL = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function numberWords(value: number): string {
  if (value < 20) return SMALL[value];
  if (value < 100) return `${TENS[Math.floor(value / 10)]}${value % 10 ? ` ${SMALL[value % 10]}` : ''}`;
  return `one hundred${value % 100 ? ` ${numberWords(value % 100)}` : ''}`;
}
const NUMBER_WORDS = Array.from({length: 121}, (_, value) => [numberWords(value), value] as const)
  .flatMap(([words, value]) => [[words, value], [words.replace('hundred ', 'hundred and '), value]] as const)
  .sort((a, b) => b[0].length - a[0].length);
const NUMBER_REPLACEMENTS = NUMBER_WORDS.map(([words, value]) => ({pattern: new RegExp(`\\b${words}\\b`, 'g'), value: String(value)}));
const aliasCache = new WeakMap<Record<string, string>, {pattern: RegExp; value: string}[]>();

export function normalizeMeaningText(input: string): string {
  let text = input.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'")
    .replace(/\bi'm\b/g, 'i am').replace(/\b(he|she|it|that)'s\b/g, '$1 is')
    .replace(/\b(you|we|they)'re\b/g, '$1 are').replace(/\b(is|are|was|were|do|does|did)n['’]t\b/g, '$1 not')
    .replace(/\b(can|could|would|should)n['’]t\b/g, '$1 not').replace(/\bi'd like\b/g, 'i would like')
    .replace(/\bmy name's\b/g, 'my name is').replace(/(?<=[a-z])[-‐‑](?=[a-z])/g, ' ')
    .replace(/\b(have|has|are|is) no\b/g, '$1 0');
  for (const {pattern, value} of NUMBER_REPLACEMENTS) text = text.replace(pattern, value);
  return text.replace(/\s+/g, ' ').trim();
}

const cleanValue = (value: string) => normalizeMeaningText(value).replace(/[.!?,;]+$/g, '').trim();
const cleanClause = (value: string) => value.trim()
  .replace(/^(?:(?:well|yes|actually|to answer your question|as for me|at the moment|right now),?\s+)+/, '')
  .replace(/\b(?:currently|actually|exactly|already|still|usually)\s+/g, '')
  .replace(/(?:,?\s+(?:please|thank you|thanks|today|right now))+$|[,;]$/g, '').trim();

/** Offline, question-scoped meaning matching. No substring/keyword scoring.
 * Multiple statements about the same fact must agree. Unrelated clauses can
 * add context, but cannot supply the answer on behalf of another subject.
 */
export function matchesAnswerMeaning(rule: AnswerMeaning, input: string): boolean {
  if (!input.trim() || /(?:^|\s)[-‐‑−]\s*\d|\d\s*,\s*\d/.test(input.normalize('NFKC'))) return false;
  let text = normalizeMeaningText(input);
  // Resolve compound year readings before splitting clauses at "and".
  if (rule.valueAliases) {
    let aliases = aliasCache.get(rule.valueAliases);
    if (!aliases) {
      aliases = Object.entries(rule.valueAliases).map(([phrase, value]) => [normalizeMeaningText(phrase), value])
        .sort((a, b) => b[0].length - a[0].length).map(([phrase, value]) => ({
          pattern: new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), value,
        }));
      aliasCache.set(rule.valueAliases, aliases);
    }
    for (const {pattern, value} of aliases) text = text.replace(pattern, value);
  }
  const clauses = text.split(/(?<!\d)[.!?;]+|[.!?;]+(?!\d)|\s+(?:and|but|while|although|because|so)\s+|,\s*/).map(cleanClause).filter(Boolean);
  const positives: string[] = [];
  const negatives: string[] = [];
  const numeric = Boolean(rule.numberRange || rule.values?.every(value => /^\d+$/.test(value)));
  const capture = numeric ? '(?<value>-?\\d+(?:\\.\\d+)?)' : '(?<value>.+?)';
  const patterns = rule.patterns.map(pattern => new RegExp(`^(?:${pattern.replace('{value}', capture).replace('{not}', '(?<not>not\\s+)?')})$`, 'i'));
  const expected = rule.values?.map(cleanValue);
  const domain = rule.valueDomain?.map(cleanValue);
  const valid = (value: string) => rule.numberRange
    ? /^\d+$/.test(value) && Number(value) >= rule.numberRange[0] && Number(value) <= rule.numberRange[1]
    : Boolean(expected?.includes(value));

  for (const clause of clauses) {
    let matched = false;
    for (const pattern of patterns) {
      const match = clause.match(pattern);
      if (!match?.groups?.value) continue;
      const value = cleanValue(match.groups.value);
      if (rule.unrelatedValues?.some(pattern => new RegExp(`^(?:${pattern})$`, 'i').test(value))) {
        matched = true;
        break;
      }
      (match.groups.not ? negatives : positives).push(value);
      matched = true;
      break;
    }
    // A bare fact can stand alone, or accompany a polite/extra sentence. Never
    // extract a number/name from the middle of a statement about someone else.
    if (!matched && rule.allowBareValue !== false) {
      const bare = cleanValue(clause);
      if (valid(bare) || domain?.includes(bare) || (numeric && /^\d+$/.test(bare))) positives.push(bare);
      else if (bare.startsWith('not ') && valid(bare.slice(4))) negatives.push(bare.slice(4));
    }
  }
  if (!positives.length || positives.some(value => !valid(value))) return false;
  if (rule.numberRange && new Set(positives).size !== 1) return false;
  return !negatives.some(value => rule.numberRange ? positives.includes(value) : valid(value));
}

export const ageMeaning = (subjects = 'i', age?: number): AnswerMeaning => ({
  ...(age === undefined ? {numberRange: [1, 120] as [number, number]} : {values: [String(age)]}),
  patterns: [
    `(?:${subjects}) (?:am|is) {not}(?:aged )?{value}(?: years? old| years? of age)?`,
    `(?:${subjects}) (?:am|is) {not}(?:a|an) {value} year old (?:boy|girl|child|student|person)`,
    `${subjects === 'i' ? 'my' : '(?:his|her)'} age is {not}{value}`,
    '{not}{value} years? (?:old|of age)',
  ],
});

export const quantityMeaning = (count: number, object: string, subjects = 'i|he|she|mari|anna|the narrator'): AnswerMeaning => ({
  values: [String(count)], patterns: [
    `(?:${subjects}) (?:have|has) {not}{value} ${object}`,
    `(?:${subjects}) (?:do|does) {not}have {value} ${object}`,
    `there (?:are|is) {not}{value} ${object}(?: in (?:the|our) class)?`,
    `{not}{value} ${object}`,
    `the number of ${object} is {not}{value}`,
  ],
});

export const factMeaning = (values: string[], patterns: string[]): AnswerMeaning => ({values, patterns});

export const timeMeaning = (hour?: number, event = '(?:the |my |our )?(?:lesson|class|meeting)|it'): AnswerMeaning => ({
  ...(hour === undefined ? {numberRange: [0, 23] as [number, number]} : {values: [String(hour)]}),
  patterns: [
    `(?:${event}) (?:is|starts|begins) {not}(?:at )?{value}(?::00| o'clock)?(?: (?:am|pm|in the morning|in the evening))?`,
    `(?:i|we) (?:start work|start working|begin work|meet) {not}at {value}(?::00| o'clock)?(?: (?:am|pm|in the morning|in the evening))?`,
    `(?:at )?{not}{value}(?::00| o'clock)?(?: (?:am|pm|in the morning|in the evening))?`,
    '(?:at )?{not}{value}',
  ],
});
