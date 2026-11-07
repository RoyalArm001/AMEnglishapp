import { ageMeaning, factMeaning, quantityMeaning, timeMeaning } from '../lib/answer-meaning';
import type { AnswerMeaning, LessonSentence } from '../lib/types';

const unrelatedIdentity = ['(?:a|an|from) .+', '\\d+(?: years? old)?', 'fine|good|well|happy|sad|ready|tired'];
const name = (value: string, subjects: string): AnswerMeaning => ({...factMeaning([value], [
  `(?:${subjects}) (?:name is|is called|am called) {not}{value}`,
  `(?:${subjects}) (?:am|is) {not}{value}`,
  '(?:the name|the answer|it) is {not}{value}',
]), unrelatedValues: unrelatedIdentity});
const day = (value: string, action: string) => factMeaning([value], [
  `(?:i|he|she|the narrator) ${action} {not}on {value}`,
  `(?:the |my |our )?(?:lesson|class) (?:is|takes place) {not}on {value}`,
  '(?:it is|it happens|we meet) {not}on {value}',
  'on {not}{value}',
]);
const feeling: AnswerMeaning = {...factMeaning(['fine', 'good', 'well', 'great', 'okay', 'ok', 'all right', 'very well', 'very good', 'really good', 'pretty good'], [
  'i (?:am|feel|am feeling) {not}{value}',
  'i am doing {not}{value}',
  'things are going {not}{value}',
]), unrelatedValues: ['(?:a|an|from) .+', '\\d+(?: years? old)?']};
const tea = factMeaning(['tea', 'a tea', 'some tea', 'a cup of tea'], [
  'i (?:would like|would love|want|prefer|will have|will take) {not}{value}',
  'can i (?:have|get) {value}',
  'could i (?:have|get) {value}',
  '{value} for me',
]);

// Only attach meaning rules where the task asks for information or a reply.
// Dictation, alphabet, and grammar gaps keep their specific learning target.
const MEANINGS: Record<string, AnswerMeaning> = {
  'foundation-dialogue-ten': ageMeaning(),
  'foundation-dialogue-eleven': ageMeaning('i', 11),
  'foundation-dialogue-fine': feeling,
  'foundation-dialogue-my-name': name('Anna', 'my|i'),
  's-17': quantityMeaning(12, 'students', 'we'),
  's-18': quantityMeaning(2, 'books', 'i'),
  's-19': quantityMeaning(3, 'pens', 'i'),
  's-20': factMeaning(['10', 'room 10'], ['(?:the |our )?room (?:number )?is {not}{value}', '(?:we are going to|we go to|it is) {not}(?:room )?{value}']),
  's-27': timeMeaning(9),
  's-28': timeMeaning(10),
  's-31': timeMeaning(3),
  's-38': feeling,
  's-39': tea,
  'reading-foundation-introduction-1': name('Anna', 'my|her|i|she|the girl|the narrator|the narrator\'s'),
  'reading-foundation-dialogue-name-1': name('Anna', 'her|she|the girl|the girl\'s'),
  'reading-foundation-dialogue-age-1': ageMeaning('ben|he|the boy', 10),
  'reading-foundation-dialogue-age-2': ageMeaning('anna|she|the girl', 11),
  'reading-foundation-dialogue-greeting-2': factMeaning(['fine', 'well', 'good'], ['(?:anna|she) (?:is|feels) {not}{value}']),
  'reading-lesson-2-days-plans-1': day('Monday', '(?:read|reads)'),
  'reading-lesson-2-days-plans-2': day('Tuesday', '(?:play|plays)'),
  'reading-lesson-4-numbers-small-1': quantityMeaning(12, 'students', 'we'),
  'reading-lesson-4-numbers-small-2': quantityMeaning(3, 'pens'),
  'reading-lesson-6-time-dates-1': timeMeaning(9),
  'reading-lesson-6-time-dates-2': day('Friday', '(?:meet|meets)'),
  'reading-lesson-7-directions-1': factMeaning(['left'], ['(?:you |we )?(?:turn|go) {not}{value}']),
  'reading-lesson-7-directions-2': factMeaning(['school', 'the school', 'a school'], ['(?:it|the building) is {not}{value}', 'there is {not}{value}', 'here is {value}']),
  'reading-lesson-8-daily-greetings-1': factMeaning(['Armenia'], ['(?:anna|she|the girl) (?:is|comes) {not}from {value}', 'from {value}', 'her country is {not}{value}']),
  'reading-intl-be-questions-1': factMeaning(['teacher', 'a teacher'], ['(?:anna|she) is {not}{value}', 'her job is {not}{value}']),
  'reading-intl-have-1': factMeaning(['cat', 'a cat'], ['(?:my|his|her|the narrator\'s) sister has {not}{value}', 'she has {not}{value}', 'the animal is {not}{value}']),
  'reading-intl-food-1': factMeaning(['tea', 'some tea', 'a cup of tea'], ['(?:i|he|she|the narrator) (?:want|wants|asks for|would like) {not}{value}', 'the drink is {not}{value}']),
  'reading-intl-routine-1': factMeaning(['school'], ['(?:i|he|she|the narrator) (?:go|goes) {not}to {value}', 'to {not}{value}']),
  'reading-intl-routine-2': factMeaning(['English'], ['(?:i|he|she|the narrator) (?:study|studies|learn|learns) {not}{value}(?: every day)?', 'the language is {not}{value}']),
  'a1-final-reading-1': name('Mari', 'my|her|i|she|the narrator|the narrator\'s'),
  'a1-final-reading-2': quantityMeaning(2, 'books', 'mari|she|the narrator'),
  'a1-final-reading-3': day('Monday', '(?:study|studies)'),
  'a1-final-reading-4': timeMeaning(10),
};

export function withAnswerMeaning<T extends LessonSentence>(sentence: T): T {
  const meaning = MEANINGS[sentence.id];
  if (!meaning) return sentence;
  return {...sentence, writingTask: {
    ...sentence.writingTask,
    promptAm: sentence.writingTask?.promptAm || sentence.armenian,
    meaning,
    helpAm: 'Պատասխանիր քո բառերով՝ կարճ կամ ամբողջ նախադասությամբ։ Կարևոր է հարցի պատասխանը, ոչ թե օրինակի բառացի կրկնությունը։',
  }};
}
