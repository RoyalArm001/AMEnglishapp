import { LESSONS_DATA } from './lessons';
import { INTERNATIONAL_CHAPTERS } from './international-chapters';
import { withAnswerMeaning } from './answer-meanings';
import type { LessonSentence } from '../lib/types';

export interface CourseQuestion extends LessonSentence {
  promptAm: string;
  lessonId: string;
  skill: 'reading' | 'writing' | 'listening';
}
export interface CourseChapter {
  lessonId: string;
  titleAm: string;
  bookId: string;
  lines: {english: string; pronunciation: string; armenian: string}[];
  questions: CourseQuestion[];
}

export const A1_TEXTBOOKS = [
  {id: 'first-steps', titleAm: 'Իմ առաջին անգլերենը', subtitleAm: 'Տառեր ու հնչյուններ, ընտանիք, գույներ և առաջին բառերը'},
  {id: 'numbers-and-me', titleAm: 'Թվերը և ես', subtitleAm: 'Հաշվել, ներկայանալ և կարդալ տարեթվերը'},
  {id: 'everyday-reading', titleAm: 'Իմ առօրյան', subtitleAm: 'Փոքր զրույցներ, օրեր, ժամեր և ուղղություններ'},
] as const;

type Line = [english: string, pronunciation: string, armenian: string];
type Check = [prompt: string, answer: string, alternatives?: string[]];
function chapter(lessonId: string, titleAm: string, bookId: string, lines: Line[], checks: Check[]): CourseChapter {
  return {lessonId, titleAm, bookId,
    lines: lines.map(([english, pronunciation, armenian]) => ({english, pronunciation, armenian})),
    questions: checks.map(([promptAm, english, alternatives], index) => withAnswerMeaning({
      id: `reading-${lessonId}-${index + 1}`, lessonId, promptAm, english,
      armenian: promptAm, pronunciation: '', skill: 'reading',
      writingTask: {promptAm, acceptedAnswers: alternatives, caseSensitive: lessonId.startsWith('foundation-alphabet-'), answerMode: lessonId.startsWith('foundation-alphabet-') ? undefined : 'short-answer'},
    } as CourseQuestion)),
  };
}

// Original HayLingo learning texts; no third-party textbook text is bundled.
export const A1_CHAPTERS: CourseChapter[] = [
  ...LESSONS_DATA.filter(lesson => lesson.id.startsWith('foundation-alphabet-')).map(lesson => chapter(
    lesson.id, lesson.titleAm, 'first-steps',
    lesson.sentences.map(s => [s.english, s.pronunciation, s.armenian] as Line),
    [
      [`Գրիր «${lesson.sentences[0].pronunciation}» տառի մեծատառն ու փոքրատառը՝ բացատով։`, lesson.sentences[0].english],
      [`Գրիր «${lesson.sentences[lesson.sentences.length - 1].pronunciation}» տառի մեծատառն ու փոքրատառը՝ բացատով։`, lesson.sentences[lesson.sentences.length - 1].english],
    ],
  )),
  chapter('foundation-people', 'Մարդիկ մեր շուրջը', 'first-steps', [
    ['boy · girl', 'բոյ · գըրլ', 'տղա · աղջիկ'],
    ['man · woman', 'մեն · վումըն', 'տղամարդ · կին'],
    ['child · friend', 'չայլդ · ֆրենդ', 'երեխա · ընկեր'],
    ['teacher · student', 'թիչըր · սթյուդընթ', 'ուսուցիչ · ուսանող'],
  ], [['Ո՞ր բառն է նշանակում «աղջիկ»։ Գրիր անգլերեն։', 'girl'], ['Գրիր «տղա» բառը անգլերեն։', 'boy']]),
  chapter('foundation-everyday-words', 'Մեր փոքր բառարանը', 'first-steps', [
    ['book · pen', 'բուք · փեն', 'գիրք · գրիչ'],
    ['cat · dog', 'քեթ · դոգ', 'կատու · շուն'],
    ['water · school', 'ուոթըր · սքուլ', 'ջուր · դպրոց'],
  ], [['Ո՞ր բառն է նշանակում «գիրք»։', 'book'], ['Գրիր «դպրոց» բառը անգլերեն։', 'school']]),
  chapter('foundation-first-words', 'Քաղաքավարի բառեր', 'first-steps', [
    ['Hello! Goodbye!', 'Հելոու։ Գուդբայ։', 'Բարև։ Ցտեսություն։'],
    ['Yes. No.', 'Յես։ Նոու։', 'Այո։ Ոչ։'],
    ['Please. Thank you.', 'Փլիզ։ Թենք յու։', 'Խնդրում եմ։ Շնորհակալություն։'],
  ], [['Տեքստից գրիր հրաժեշտի բառը։', 'Goodbye'], ['Տեքստից գրիր շնորհակալություն հայտնելու արտահայտությունը։', 'Thank you']]),
  chapter('foundation-numbers-0-10', 'Հաշվում ենք մինչև տասը', 'numbers-and-me', [
    ['zero · one · two', 'զիրոու · ուան · թու', '0 · 1 · 2'],
    ['three · four · five', 'թրի · ֆոր · ֆայվ', '3 · 4 · 5'],
    ['six · seven · eight', 'սիքս · սեվըն · էյթ', '6 · 7 · 8'],
    ['nine · ten', 'նայն · թեն', '9 · 10'],
  ], [['5 թիվը գրիր անգլերեն բառով։', 'five'], ['9-ից հետո եկող թիվը գրիր անգլերեն բառով։', 'ten']]),
  chapter('foundation-numbers-11-20', 'Եվս տասը թիվ', 'numbers-and-me', [
    ['eleven · twelve · thirteen', 'իլեվըն · թուելվ · թըրթին', '11 · 12 · 13'],
    ['fourteen · fifteen · sixteen', 'ֆորթին · ֆիֆթին · սիքսթին', '14 · 15 · 16'],
    ['seventeen · eighteen · nineteen · twenty', 'սեվընթին · էյթին · նայնթին · թուենթի', '17 · 18 · 19 · 20'],
  ], [['12 թիվը գրիր անգլերեն բառով։', 'twelve'], ['20 թիվը գրիր անգլերեն բառով։', 'twenty']]),
  chapter('foundation-tens', 'Թվերի աստիճանները', 'numbers-and-me', [
    ['twenty · thirty · forty', 'թուենթի · թըրթի · ֆորթի', '20 · 30 · 40'],
    ['fifty · sixty · seventy', 'ֆիֆթի · սիքսթի · սեվընթի', '50 · 60 · 70'],
    ['eighty · ninety', 'էյթի · նայնթի', '80 · 90'],
    ['one hundred · one thousand', 'ուան հանդրեդ · ուան թաուզընդ', '100 · 1000'],
  ], [['40 թիվը գրիր անգլերեն բառով։', 'forty'], ['1000 թիվը գրիր անգլերեն բառերով։', 'one thousand', ['a thousand']]]),
  chapter('foundation-introduction', 'Աննան և իր ընկերը', 'numbers-and-me', [
    ['I am Anna.', 'Այ էմ Աննա։', 'Ես Աննան եմ։'],
    ['You are my friend.', 'Յու ար մայ ֆրենդ։', 'Դու իմ ընկերն ես։'],
    ['He is a student.', 'Հի իզ ը սթյուդընթ։', 'Նա ուսանող է։'],
    ['She is a teacher.', 'Շի իզ ը թիչըր։', 'Նա ուսուցիչ է։'],
    ['We are ready.', 'Ուի ար րեդի։', 'Մենք պատրաստ ենք։'],
  ], [['Ի՞նչ է ներկայացող մարդու անունը։ Գրիր անգլերեն։', 'Anna'], ['Լրացրու տեքստի նախադասությունը՝ He is a ___.', 'student']]),
  chapter('foundation-years', 'Տարեթվերի էջը', 'numbers-and-me', [
    ['1990 — nineteen ninety', 'նայնթին նայնթի', '1990 թվական'],
    ['2000 — two thousand', 'թու թաուզընդ', '2000 թվական'],
    ['2005 — two thousand and five', 'թու թաուզընդ ընդ ֆայվ', '2005 թվական'],
    ['2026 — twenty twenty-six', 'թուենթի թուենթի սիքս', '2026 թվական'],
  ], [['2000 թվականը գրիր անգլերեն բառերով։', 'two thousand'], ['2026 թվականը գրիր անգլերեն բառերով։', 'twenty twenty-six', ['two thousand and twenty-six', 'two thousand twenty-six']]]),
  chapter('foundation-dialogue-greeting', 'Բարև, ինչպե՞ս ես', 'everyday-reading', [
    ['Anna: Hello!', 'Աննա՝ Հելոու։', 'Աննա․ Բարև։'],
    ['Ben: How are you?', 'Բեն՝ Հաու ար յու՞', 'Բեն․ Ինչպե՞ս ես։'],
    ['Anna: Fine, thanks.', 'Աննա՝ Ֆայն թենքս։', 'Աննա․ Լավ եմ, շնորհակալություն։'],
  ], [['Բենի հարցը՝ «Ինչպե՞ս ես», գրիր անգլերեն։', 'How are you'], ['Աննան ինչպե՞ս է։ Գրիր տեքստի մեկ բառը։', 'fine']]),
  chapter('foundation-dialogue-name', 'Նոր ծանոթ', 'everyday-reading', [
    ['Ben: What is your name?', 'Բեն՝ Ուոթ իզ յոր նեյմ՞', 'Բեն․ Ի՞նչ է քո անունը։'],
    ['Anna: My name is Anna.', 'Աննա՝ Մայ նեյմ իզ Աննա։', 'Աննա․ Իմ անունը Աննա է։'],
    ['Ben: Nice to meet you.', 'Բեն՝ Նայս թու միթ յու։', 'Բեն․ Ուրախ եմ ծանոթանալու համար։'],
    ['Anna: You too.', 'Աննա՝ Յու թու։', 'Աննա․ Ես էլ։'],
  ], [['Ի՞նչ է աղջկա անունը։ Գրիր անգլերեն։', 'Anna'], ['Լրացրու՝ My ___ is Anna.', 'name']]),
  chapter('foundation-dialogue-age', 'Քանի՞ տարեկան ես', 'everyday-reading', [
    ['Anna: How old are you?', 'Աննա՝ Հաու օուլդ ար յու՞', 'Աննա․ Քանի՞ տարեկան ես։'],
    ['Ben: Ten. And you?', 'Բեն՝ Թեն։ Ընդ յու՞', 'Բեն․ Տասը։ Իսկ դո՞ւ։'],
    ['Anna: Eleven.', 'Աննա՝ Իլեվըն։', 'Աննա․ Տասնմեկ։'],
  ], [['Քանի՞ տարեկան է Բենը։ Կարող ես գրել միայն թիվը։', 'ten', ['10', 'He is ten.', "He's ten.", 'He is 10.', 'He is ten years old.', 'He is 10 years old.']], ['Քանի՞ տարեկան է Աննան։ Կարող ես գրել միայն թիվը։', 'eleven', ['11', 'She is eleven.', "She's eleven.", 'She is 11.', 'She is eleven years old.', 'She is 11 years old.']]]),
  chapter('lesson-1-days', 'Իմ շաբաթը', 'everyday-reading', [
    ['Monday · Tuesday', 'Մանդեյ · Թյուզդեյ', 'երկուշաբթի · երեքշաբթի'],
    ['Wednesday · Thursday', 'Ուենզդեյ · Թըրզդեյ', 'չորեքշաբթի · հինգշաբթի'],
    ['Friday · Saturday · Sunday', 'Ֆրայդեյ · Սեթըրդեյ · Սանդեյ', 'ուրբաթ · շաբաթ · կիրակի'],
  ], [['Գրիր «երկուշաբթի» բառը անգլերեն։', 'Monday'], ['Գրիր «կիրակի» բառը անգլերեն։', 'Sunday']]),
  chapter('lesson-2-days-plans', 'Շաբաթական պլան', 'everyday-reading', [
    ['I read on Monday.', 'Այ րիդ օն Մանդեյ։', 'Երկուշաբթի ես կարդում եմ։'],
    ['I play on Tuesday.', 'Այ փլեյ օն Թյուզդեյ։', 'Երեքշաբթի ես խաղում եմ։'],
    ['I rest on Sunday.', 'Այ րեսթ օն Սանդեյ։', 'Կիրակի ես հանգստանում եմ։'],
  ], [['Ո՞ր օրն է պատմողը կարդում։', 'Monday'], ['Ո՞ր օրն է խաղում։', 'Tuesday']]),
  chapter('lesson-3-months', 'Տարվա իմ օրացույցը', 'everyday-reading', [
    ['January · February · March', 'Ջենյուերի · Ֆեբրուերի · Մարչ', 'հունվար · փետրվար · մարտ'],
    ['April · May · June', 'Էյփրիլ · Մեյ · Ջուն', 'ապրիլ · մայիս · հունիս'],
    ['July · August · September', 'Ջուլայ · Օգըսթ · Սեփթեմբըր', 'հուլիս · օգոստոս · սեպտեմբեր'],
    ['October · November · December', 'Օքթոուբըր · Նոուվեմբըր · Դիսեմբըր', 'հոկտեմբեր · նոյեմբեր · դեկտեմբեր'],
  ], [['Գրիր «մայիս» բառը անգլերեն։', 'May'], ['Գրիր տարվա առաջին ամսվա անունը անգլերեն։', 'January']]),
  chapter('lesson-4-numbers-small', 'Մեր դասարանը', 'everyday-reading', [
    ['Twelve students.', 'Թուելվ սթյուդընթս։', 'Տասներկու աշակերտ։'],
    ['Two books. Three pens.', 'Թու բուքս։ Թրի փենզ։', 'Երկու գիրք։ Երեք գրիչ։'],
    ['Room ten.', 'Րում թեն։', 'Սենյակ տասը։'],
  ], [['Քանի՞ աշակերտ կա։', 'twelve', ['12', 'twelve students']], ['Քանի՞ գրիչ կա։', 'three', ['3', 'three pens']]]),
  chapter('lesson-6-time-dates', 'Հանդիպման ժամը', 'everyday-reading', [
    ['The lesson is at nine.', 'Դը լեսըն իզ էթ նայն։', 'Դասը ժամը իննին է։'],
    ['Lunch is at twelve.', 'Լանչ իզ էթ թուելվ։', 'Ճաշը ժամը տասներկուսին է։'],
    ['We meet on Friday.', 'Ուի միթ օն Ֆրայդեյ։', 'Մենք հանդիպում ենք ուրբաթ։'],
  ], [['Ժամը քանի՞սին է դասը։', 'nine', ['9', 'at nine', 'at 9', '9:00']], ['Շաբաթվա ո՞ր օրն են հանդիպում։', 'Friday', ['on Friday']]]),
  chapter('lesson-7-directions', 'Դեպի գրադարան', 'everyday-reading', [
    ['Go straight. Turn left.', 'Գոու սթրեյթ։ Թըրն լեֆթ։', 'Գնա ուղիղ։ Թեքվիր ձախ։'],
    ['Go up. Turn right.', 'Գոու ափ։ Թըրն րայթ։', 'Բարձրացիր վերև։ Թեքվիր աջ։'],
    ['Here is the school.', 'Հիըր իզ դը սքուլ։', 'Ահա դպրոցը։'],
  ], [['Առաջին տողով՝ ո՞ր կողմ պետք է թեքվել։ Գրիր left կամ right։', 'left', ['turn left']], ['Ի՞նչ շենք է վերջում։ Գրիր մեկ անգլերեն բառ։', 'school', ['the school']]]),
  chapter('lesson-8-daily-greetings', 'Առաջին օրը', 'everyday-reading', [
    ['Good morning!', 'Գուդ մորնինգ։', 'Բարի լույս։'],
    ['I am from Armenia.', 'Այ էմ ֆրոմ Արմինիա։', 'Ես Հայաստանից եմ։'],
    ['I am a student.', 'Այ էմ ը սթյուդընթ։', 'Ես ուսանող եմ։'],
    ['Goodbye!', 'Գուդբայ։', 'Ցտեսություն։'],
  ], [['Ո՞ր երկրից է Աննան։ Գրիր երկրի անգլերեն անունը։', 'Armenia'], ['Լրացրու տեքստից՝ I am a ___.', 'student']]),
  // Preserve the existing chapter order and final-review IDs.
  ...INTERNATIONAL_CHAPTERS,
];

export const getA1Chapter = (lessonId: string) => A1_CHAPTERS.find(chapter => chapter.lessonId === lessonId);

export const A1_FINAL_READING = 'I am Mari. I am a student. I have two books. My lesson is on Monday. It is at ten.';
export const A1_FINAL_QUESTIONS: CourseQuestion[] = [
  ...A1_CHAPTERS.map((chapter, index): CourseQuestion => {
    const lesson = LESSONS_DATA.find(item => item.id === chapter.lessonId)!;
    const sentence = lesson.sentences.find(item => item.writingTask?.answerMode === 'personal-age')
      || lesson.sentences[Math.floor(lesson.sentences.length / 2)];
    const listening = index > 2 && index % 3 === 0 && !sentence.writingTask?.answerMode;
    return {...sentence, id: `a1-final-${lesson.id}`, lessonId: lesson.id,
      skill: listening ? 'listening' : 'writing',
      promptAm: listening ? 'Լսիր և գրիր լսած բառը կամ նախադասությունը։' : sentence.writingTask?.promptAm || `Անգլերեն գրիր՝ «${sentence.armenian}»։`,
    };
  }),
  ...chapter('lesson-8-daily-greetings', '', '', [], [
    ['Կարդա ամփոփիչ տեքստը։ Ի՞նչ է պատմողի անունը։', 'Mari'],
    ['Քանի՞ գիրք ունի Մարին։', 'two'],
    ['Շաբաթվա ո՞ր օրն է անգլերենի դասը։', 'Monday'],
    ['Ժամը քանի՞սին է սկսվում դասը։', 'ten'],
  ]).questions.map((question, index) => withAnswerMeaning({...question, writingTask: {promptAm: question.promptAm, answerMode: 'short-answer' as const}, id: `a1-final-reading-${index + 1}`})),
];

// Optional official practice links. They are not copied or required for completion.
export const A1_EXTRA_READING = [
  {title: 'British Council · A1 reading', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1'},
  {title: 'Student card application', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1/student-card-application'},
  {title: 'Text messages to a friend', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1/text-messages-friend'},
];
