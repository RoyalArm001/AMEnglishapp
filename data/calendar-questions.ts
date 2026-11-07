import type { AnswerMeaning, DailyQuestionItem } from '../lib/types';

const DAYS = [
  ['Monday', 'երկուշաբթի', 'Մանդեյ'], ['Tuesday', 'երեքշաբթի', 'Թյուզդեյ'],
  ['Wednesday', 'չորեքշաբթի', 'Ուենզդեյ'], ['Thursday', 'հինգշաբթի', 'Թըրզդեյ'],
  ['Friday', 'ուրբաթ', 'Ֆրայդեյ'], ['Saturday', 'շաբաթ', 'Սեթըրդեյ'], ['Sunday', 'կիրակի', 'Սանդեյ'],
];
const MONTHS = [
  ['January', 'հունվար', 'Ջենյուերի'], ['February', 'փետրվար', 'Ֆեբրուերի'],
  ['March', 'մարտ', 'Մարչ'], ['April', 'ապրիլ', 'Էյփրիլ'], ['May', 'մայիս', 'Մեյ'], ['June', 'հունիս', 'Ջուն'],
  ['July', 'հուլիս', 'Ջուլայ'], ['August', 'օգոստոս', 'Օգըսթ'], ['September', 'սեպտեմբեր', 'Սեփթեմբըր'],
  ['October', 'հոկտեմբեր', 'Օքթոուբըր'], ['November', 'նոյեմբեր', 'Նոուվեմբըր'], ['December', 'դեկտեմբեր', 'Դիսեմբըր'],
];
const SMALL = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const smallNumber = (n: number) => n < 20 ? SMALL[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${SMALL[n % 10]}` : ''}`;
function yearForms(year: number): string[] {
  const remainder = year % 100;
  const century = smallNumber(Math.floor(year / 100));
  const split = `${century} ${remainder === 0 ? 'hundred' : remainder < 10 ? `oh ${SMALL[remainder]}` : smallNumber(remainder)}`;
  return year >= 2000 ? [
    `two thousand${remainder ? ` and ${smallNumber(remainder)}` : ''}`,
    `two thousand${remainder ? ` ${smallNumber(remainder)}` : ''}`, split,
  ] : [split, `${century} hundred${remainder ? ` and ${smallNumber(remainder)}` : ''}`];
}
// Include adjacent years too: an incorrect or contradictory year stays a fact
// the checker can compare, rather than disappearing as an unrecognized phrase.
const YEAR_ALIASES: Record<string, string> = Object.fromEntries(
  Array.from({length: 200}, (_, index) => 1900 + index).flatMap(year => yearForms(year).map(form => [form, String(year)])),
);

function sequenceQuestions(topic: 'days' | 'months', rows: string[][]): DailyQuestionItem[] {
  return rows.flatMap(([english, armenian, pronunciation], index) => ([-1, 1] as const).map(direction => {
    const relation = direction === 1 ? 'after' : 'before';
    const [answer, answerAm] = rows[(index + direction + rows.length) % rows.length];
    const noun = topic === 'days' ? 'day' : 'month';
    const meaning: AnswerMeaning = {values: [answer], valueDomain: rows.map(row => row[0]), patterns: [
      `(?:it is|the answer is|the ${direction === 1 ? 'next' : 'previous'} ${noun} is) {not}{value}`,
      `{value} (?:comes|is) {not}${relation} ${english.toLowerCase()}`,
      `{value} does {not}come ${relation} ${english.toLowerCase()}`,
      `${relation} ${english.toLowerCase()} (?:comes|is) {not}{value}`,
      `{value} is {not}the ${noun} ${relation} ${english.toLowerCase()}`,
      `the ${noun} ${relation} ${english.toLowerCase()} is {not}{value}`,
    ]};
    return {
      id: `dq-calendar-${topic}-${english.toLowerCase()}-${relation}`,
      topic, type: 'answer-question', level: 'A1', difficultyRank: 1, professions: [],
      questionEn: `Which ${noun} comes ${relation} ${english}?`,
      questionPronunciation: `Ուիչ ${topic === 'days' ? 'դեյ' : 'մանթ'} քամզ ${direction === 1 ? 'աֆթըր' : 'բիֆոր'} ${pronunciation}՞`,
      questionAm: `«${armenian}» ${topic === 'days' ? 'օրվանից' : 'ամսից'} ${direction === 1 ? 'հետո' : 'առաջ'} ո՞ր ${topic === 'days' ? 'օրն' : 'ամիսն'} է գալիս։`,
      correctAnswer: answer, acceptableAnswers: [answer, `It is ${answer}.`], meaning,
      explanationAm: `${english} → ${answer}․ ${direction === 1 ? 'հաջորդը' : 'նախորդը'} ${answerAm} է։`,
      hintAm: topic === 'days' ? 'Հիշիր շաբաթվա օրերի հերթականությունը։' : 'Հիշիր օրացույցի ամիսների հերթականությունը։',
    };
  }));
}

export const CALENDAR_QUESTIONS: DailyQuestionItem[] = [
  ...sequenceQuestions('days', DAYS),
  ...sequenceQuestions('months', MONTHS),
  ...[1990, 1999, 2000, 2005, 2010, 2024, 2026, 2030].flatMap(year => ([-1, 1] as const).map(direction => {
    const answer = year + direction;
    const relation = direction === 1 ? 'after' : 'before';
    return {
      id: `dq-calendar-year-${year}-${relation}`, topic: 'years' as const,
      type: 'answer-question' as const, level: 'A1' as const, difficultyRank: 1, professions: [],
      questionEn: `Which year comes ${relation} ${year}?`,
      questionPronunciation: `Ուիչ յիր քամզ ${direction === 1 ? 'աֆթըր' : 'բիֆոր'} ${year}՞`,
      questionAm: `${year} թվականից ${direction === 1 ? 'հետո' : 'առաջ'} ո՞ր թվականն է։`,
      correctAnswer: String(answer), acceptableAnswers: [String(answer), ...yearForms(answer)],
      meaning: {values: [String(answer)], valueAliases: YEAR_ALIASES, patterns: [
        `(?:it is|the year is|the answer is|the ${direction === 1 ? 'next' : 'previous'} year is) {not}{value}`,
        `{value} (?:comes|is) {not}${relation} ${year}`,
        `${relation} ${year} (?:comes|is) {not}{value}`,
      ]},
      explanationAm: `${year} ${direction === 1 ? '+ 1' : '− 1'} = ${answer}։ Անգլերեն՝ ${yearForms(answer)[0]}։`,
      hintAm: 'Կարող ես գրել տարեթիվը թվերով, անգլերեն բառերով կամ նախադասությամբ։',
    };
  })),
];

export const CALENDAR_TOPIC_LABELS = {days: 'Շաբաթվա օրեր', months: 'Ամիսներ', years: 'Տարեթվեր'};
