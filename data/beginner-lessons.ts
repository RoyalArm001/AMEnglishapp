import type { LessonItem, LessonSentence } from '../lib/types';
import { LEARNING_MONTHS, MONTHS_LESSON_ID } from './months';

// Keep the existing sentence IDs so saved answers and bookmarks still resolve.
const word = (id: string, english: string, pronunciation: string, armenian: string): LessonSentence => ({
  id, english, pronunciation, armenian,
  writingTask: {promptAm: `Գրիր անգլերեն՝ «${armenian}»։`},
});
const practice = (id: string, english: string, pronunciation: string, armenian: string, promptAm: string, acceptedAnswers: string[]): LessonSentence => ({
  id, english, pronunciation, armenian,
  writingTask: {promptAm, acceptedAnswers, answerMode: 'short-answer', helpAm: 'Կարճ պատասխանը բավական է։ Եթե ուզում ես, կարող ես գրել նաև ամբողջ օրինակը։'},
});

export const BEGINNER_LESSONS: LessonItem[] = [
  {
    id: 'lesson-1-days', categoryId: 'days-of-week', order: 1, level: 'A1', estimatedMinutes: 5,
    titleAm: 'Շաբաթվա յոթ օրերը', titleEn: 'Days of the week',
    descriptionAm: 'Մի քայլում՝ մեկ օր։ Լսիր և գրիր նրա անունը։',
    grammarTipAm: 'Օրերի անունները սկսում ենք մեծատառով՝ Monday։ Նախ սովորիր միայն անունները։',
    sentences: [
      word('s-1', 'Monday', 'Մանդեյ', 'երկուշաբթի'),
      word('s-2', 'Tuesday', 'Թյուզդեյ', 'երեքշաբթի'),
      word('s-3', 'Wednesday', 'Ուենզդեյ', 'չորեքշաբթի'),
      word('s-4', 'Thursday', 'Թըրզդեյ', 'հինգշաբթի'),
      word('s-5', 'Friday', 'Ֆրայդեյ', 'ուրբաթ'),
      word('beginner-saturday', 'Saturday', 'Սեթըրդեյ', 'շաբաթ'),
      word('beginner-sunday', 'Sunday', 'Սանդեյ', 'կիրակի'),
    ],
  },
  {
    id: 'lesson-2-days-plans', categoryId: 'days-of-week', order: 2, level: 'A1', estimatedMinutes: 4,
    titleAm: 'Ի՞նչ եմ անում այսօր', titleEn: 'Simple daily plans',
    descriptionAm: 'Փոքր նախադասություններ քո առօրյայից։ Լրացրու մեկ բառ։',
    grammarTipAm: 'I read = ես կարդում եմ։ Օրը նշում ենք on-ով՝ on Monday։',
    sentences: [
      practice('s-6', 'I read on Monday.', 'Այ րիդ օն Մանդեյ։', 'Երկուշաբթի ես կարդում եմ։', 'Լրացրու՝ I read on ___. Երկուշաբթի։', ['Monday']),
      practice('s-7', 'I play on Tuesday.', 'Այ փլեյ օն Թյուզդեյ։', 'Երեքշաբթի ես խաղում եմ։', 'Լրացրու՝ I ___ on Tuesday. Ես խաղում եմ։', ['play']),
      practice('s-8', 'I study on Wednesday.', 'Այ սթադի օն Ուենզդեյ։', 'Չորեքշաբթի ես սովորում եմ։', 'Լրացրու՝ I study on ___. Չորեքշաբթի։', ['Wednesday']),
      practice('s-9', 'I walk on Thursday.', 'Այ ուոք օն Թըրզդեյ։', 'Հինգշաբթի ես զբոսնում եմ։', 'Լրացրու՝ I ___ on Thursday. Ես զբոսնում եմ։', ['walk']),
      practice('s-10', 'I rest on Sunday.', 'Այ րեսթ օն Սանդեյ։', 'Կիրակի ես հանգստանում եմ։', 'Լրացրու՝ I rest on ___. Կիրակի։', ['Sunday']),
    ],
  },
  {
    id: MONTHS_LESSON_ID, categoryId: 'months-of-year', order: 3, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Տարվա ամիսները՝ երեքական', titleEn: 'Months in small groups',
    descriptionAm: 'Չորս փոքր մաս՝ երեքական ամսով։ Նայիր հայերեն իմաստին, լսիր, ընտրիր ու գրիր մեկ անուն։',
    grammarTipAm: 'January = հունվար։ Ամսվա անունը սկսում ենք մեծատառով։ Սովորիր միայն այս երեք ամիսները, հետո անցիր հաջորդ մասին։',
    sentences: LEARNING_MONTHS.map(month => word(month.id, month.english, month.pronunciation, month.armenian)),
  },
  {
    id: 'lesson-4-numbers-small', categoryId: 'numbers', order: 4, level: 'A1', estimatedMinutes: 4,
    titleAm: 'Քանի՞ հատ կա', titleEn: 'Small everyday numbers',
    descriptionAm: 'Հաշվում ենք գրքերն ու գրիչները։ Պատասխանում ենք մեկ թվով։',
    grammarTipAm: 'two books = երկու գիրք։ Քանակի հարցին կարող ես պատասխանել միայն թվով։',
    sentences: [
      practice('s-17', 'Twelve students.', 'Թուելվ սթյուդընթս։', 'Տասներկու աշակերտ։', 'Դասարանում 12 աշակերտ կա։ How many students? Քանի՞ աշակերտ։', ['12', 'twelve']),
      practice('s-18', 'Two books.', 'Թու բուքս։', 'Երկու գիրք։', 'Քո առջև 2 գիրք կա։ How many books? Քանի՞ գիրք։', ['2', 'two']),
      practice('s-19', 'Three pens.', 'Թրի փենզ։', 'Երեք գրիչ։', 'Քո առջև 3 գրիչ կա։ How many pens? Քանի՞ գրիչ։', ['3', 'three']),
      practice('s-20', 'Room ten.', 'Րում թեն։', 'Սենյակ տասը։', 'Գնում ենք 10-րդ սենյակ։ Which room? Ո՞ր սենյակ։', ['10', 'ten']),
      word('s-21', 'fifteen', 'ֆիֆթին', 'տասնհինգ'),
    ],
  },
  {
    id: 'lesson-6-time-dates', categoryId: 'time-and-dates', order: 6, level: 'A1', estimatedMinutes: 4,
    titleAm: 'Ժամը քանի՞սն է', titleEn: 'Simple times',
    descriptionAm: 'Ժամ հարցնել և կարճ պատասխանել։',
    grammarTipAm: 'It is nine = ժամը իննն է։ At nine = ժամը իննին։ Սկսենք ամբողջ ժամերից։',
    sentences: [
      practice('s-27', 'It is nine.', 'Իթ իզ նայն։', 'Ժամը իննն է։', 'Ժամացույցը ցույց է տալիս 9:00։ What time is it?', ['nine', '9', "It's nine.", 'nine o’clock', '9:00']),
      practice('s-28', 'At ten.', 'Էթ թեն։', 'Ժամը տասին։', 'Դասը ժամը 10-ին է։ What time is the lesson?', ['10', 'ten', 'at 10', '10:00']),
      practice('s-29', 'Lunch is at twelve.', 'Լանչ իզ էթ թուելվ։', 'Ճաշը ժամը տասներկուսին է։', 'Լրացրու՝ Lunch is at ___. Ժամը 12-ին։', ['12', 'twelve']),
      word('s-30', 'What time is it?', 'Ուոթ թայմ իզ իթ՞', 'Ժամը քանի՞սն է'),
      practice('s-31', 'At three.', 'Էթ թրի։', 'Ժամը երեքին։', 'Հանդիպում ենք ժամը 3-ին։ What time?', ['3', 'three', 'at 3', '3:00']),
    ],
  },
  {
    id: 'lesson-7-directions', categoryId: 'directions', order: 7, level: 'A1', estimatedMinutes: 4,
    titleAm: 'Աջ, ձախ և ուղիղ', titleEn: 'Simple directions',
    descriptionAm: 'Ճանապարհ ցույց տուր երկու բառով։',
    grammarTipAm: 'left = ձախ, right = աջ։ Turn left = թեքվիր ձախ։',
    sentences: [
      word('s-32', 'Go straight.', 'Գոու սթրեյթ։', 'Գնա ուղիղ'),
      word('s-33', 'Turn right.', 'Թըրն րայթ։', 'Թեքվիր աջ'),
      word('s-34', 'Turn left.', 'Թըրն լեֆթ։', 'Թեքվիր ձախ'),
      word('s-35', 'Go down.', 'Գոու դաուն։', 'Իջիր ներքև'),
      word('s-36', 'Go up.', 'Գոու ափ։', 'Բարձրացիր վերև'),
    ],
  },
  {
    id: 'lesson-8-daily-greetings', categoryId: 'daily-conversations', order: 8, level: 'A1', estimatedMinutes: 4,
    titleAm: 'Իմ առաջին փոքր զրույցը', titleEn: 'My first small conversation',
    descriptionAm: 'Բարևիր, պատասխանիր ու հրաժեշտ տուր կարճ արտահայտություններով։',
    grammarTipAm: 'Զրույցի պատասխանը կարող է մեկ կամ երկու բառ լինել՝ Fine, Thanks, Goodbye։',
    sentences: [
      word('s-37', 'Good morning!', 'Գուդ մորնինգ։', 'Բարի լույս'),
      practice('s-38', 'Fine, thanks.', 'Ֆայն թենքս։', 'Լավ եմ, շնորհակալություն։', 'How are you? Պատասխանիր՝ լավ եմ։', ['fine', 'good', 'I am fine', "I'm fine", 'fine thanks', 'fine thank you']),
      practice('s-39', 'Tea, please.', 'Թի փլիզ։', 'Թեյ, խնդրում եմ։', 'Tea or coffee? Ընտրիր թեյը։', ['tea', 'tea please']),
      practice('s-40', 'Thank you.', 'Թենք յու։', 'Շնորհակալություն։', 'Քեզ թեյ տվեցին։ Շնորհակալություն հայտնիր։', ['thanks']),
      practice('s-41', 'Goodbye!', 'Գուդբայ։', 'Ցտեսություն։', 'Հրաժեշտ տուր ընկերոջդ։', ['bye', 'see you', 'see you tomorrow']),
    ],
  },
];
