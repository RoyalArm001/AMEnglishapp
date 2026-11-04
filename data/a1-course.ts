import { LESSONS_DATA } from './lessons';
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
  {id: 'first-steps', titleAm: 'Իմ առաջին անգլերենը', subtitleAm: 'Տառեր, մարդիկ, առօրյա բառեր և ողջույններ'},
  {id: 'numbers-and-me', titleAm: 'Թվերը և ես', subtitleAm: 'Հաշվել, ներկայանալ և կարդալ տարեթվերը'},
  {id: 'everyday-reading', titleAm: 'Իմ առօրյան', subtitleAm: 'Փոքր զրույցներ, օրեր, ժամեր և ուղղություններ'},
] as const;

type Line = [english: string, pronunciation: string, armenian: string];
type Check = [prompt: string, answer: string, alternatives?: string[]];
function chapter(lessonId: string, titleAm: string, bookId: string, lines: Line[], checks: Check[]): CourseChapter {
  return {lessonId, titleAm, bookId,
    lines: lines.map(([english, pronunciation, armenian]) => ({english, pronunciation, armenian})),
    questions: checks.map(([promptAm, english, alternatives], index) => ({
      id: `reading-${lessonId}-${index + 1}`, lessonId, promptAm, english,
      armenian: promptAm, pronunciation: '', skill: 'reading',
      writingTask: {promptAm, acceptedAnswers: alternatives, caseSensitive: lessonId.startsWith('foundation-alphabet-')},
    })),
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
    ['He is a student. She is a teacher.', 'Հի իզ ը սթյուդընթ։ Շի իզ ը թիչըր։', 'Նա ուսանող է։ Նա ուսուցիչ է։'],
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
    ['Ben: Hello! How are you?', 'Բեն՝ Հելոու։ Հաու ար յու՞', 'Բեն․ Բարև։ Ինչպե՞ս ես։'],
    ['Anna: I am fine. Thank you.', 'Աննա՝ Այ էմ ֆայն։ Թենք յու։', 'Աննա․ Ես լավ եմ։ Շնորհակալություն։'],
  ], [['Բենի հարցը՝ «Ինչպե՞ս ես», գրիր անգլերեն։', 'How are you'], ['Աննան ինչպե՞ս է։ Գրիր տեքստի մեկ բառը։', 'fine']]),
  chapter('foundation-dialogue-name', 'Նոր ծանոթ', 'everyday-reading', [
    ['Ben: What is your name?', 'Բեն՝ Ուոթ իզ յոր նեյմ՞', 'Բեն․ Ի՞նչ է քո անունը։'],
    ['Anna: My name is Anna.', 'Աննա՝ Մայ նեյմ իզ Աննա։', 'Աննա․ Իմ անունը Աննա է։'],
    ['Ben: Nice to meet you.', 'Բեն՝ Նայս թու միթ յու։', 'Բեն․ Ուրախ եմ ծանոթանալու համար։'],
    ['Anna: Nice to meet you too.', 'Աննա՝ Նայս թու միթ յու թու։', 'Աննա․ Ես էլ եմ ուրախ ծանոթանալու համար։'],
  ], [['Ի՞նչ է աղջկա անունը։ Գրիր անգլերեն։', 'Anna'], ['Լրացրու՝ My ___ is Anna.', 'name']]),
  chapter('foundation-dialogue-age', 'Քանի՞ տարեկան ես', 'everyday-reading', [
    ['Anna: How old are you?', 'Աննա՝ Հաու օուլդ ար յու՞', 'Աննա․ Քանի՞ տարեկան ես։'],
    ['Ben: I am ten years old. And you?', 'Բեն՝ Այ էմ թեն յիրզ օուլդ։ Ընդ յու՞', 'Բեն․ Ես տասը տարեկան եմ։ Իսկ դո՞ւ։'],
    ['Anna: I am eleven years old.', 'Աննա՝ Այ էմ իլեվըն յիրզ օուլդ։', 'Աննա․ Ես տասնմեկ տարեկան եմ։'],
  ], [['Քանի՞ տարեկան է Բենը։ Գրիր միայն թիվը՝ անգլերեն բառով։', 'ten'], ['Քանի՞ տարեկան է Աննան։ Գրիր միայն թիվը՝ անգլերեն բառով։', 'eleven']]),
  chapter('lesson-1-days', 'Իմ շաբաթը', 'everyday-reading', [
    ['Today is Monday.', 'Թուդեյ իզ Մանդեյ։', 'Այսօր երկուշաբթի է։'],
    ['I study English on Tuesday and Thursday.', 'Այ սթադի Ինգլիշ օն Թյուզդեյ ընդ Թըրզդեյ։', 'Ես անգլերեն եմ սովորում երեքշաբթի և հինգշաբթի։'],
    ['On Sunday, I rest.', 'Օն Սանդեյ այ րեսթ։', 'Կիրակի ես հանգստանում եմ։'],
  ], [['Տեքստում այսօր շաբաթվա ո՞ր օրն է։ Գրիր անգլերեն։', 'Monday'], ['Ո՞ր օրն է պատմողը հանգստանում։', 'Sunday']]),
  chapter('lesson-2-days-plans', 'Շաբաթական պլան', 'everyday-reading', [
    ['On Wednesday, I read a book.', 'Օն Ուենզդեյ այ րիդ ը բուք։', 'Չորեքշաբթի ես գիրք եմ կարդում։'],
    ['On Friday, I meet my friend.', 'Օն Ֆրայդեյ այ միթ մայ ֆրենդ։', 'Ուրբաթ ես հանդիպում եմ ընկերոջս։'],
    ['On Saturday, we go to the park.', 'Օն Սեթըրդեյ ուի գոու թու դը փարք։', 'Շաբաթ մենք գնում ենք այգի։'],
  ], [['Ո՞ր օրն է պատմողը գիրք կարդում։', 'Wednesday'], ['Ո՞ր օրն է հանդիպում ընկերոջը։', 'Friday']]),
  chapter('lesson-3-months', 'Տարվա իմ օրացույցը', 'everyday-reading', [
    ['January is in winter.', 'Ջենյուերի իզ ին ուինթըր։', 'Հունվարը ձմռանն է։'],
    ['My birthday is in May.', 'Մայ բըրթդեյ իզ ին Մեյ։', 'Իմ ծննդյան օրը մայիսին է։'],
    ['July and August are in summer.', 'Ջուլայ ընդ Օգըսթ ար ին սամըր։', 'Հուլիսն ու օգոստոսը ամռանն են։'],
  ], [['Ո՞ր ամսին է պատմողի ծննդյան օրը։', 'May'], ['Տեքստի ո՞ր ամիսն է ձմռանը։', 'January']]),
  chapter('lesson-4-numbers-small', 'Մեր դասարանը', 'everyday-reading', [
    ['There are twelve students in our class.', 'Դեր ար թուելվ սթյուդընթս ին աուըր քլաս։', 'Մեր դասարանում տասներկու աշակերտ կա։'],
    ['I have two books and three pens.', 'Այ հեվ թու բուքս ընդ թրի փենզ։', 'Ես ունեմ երկու գիրք և երեք գրիչ։'],
    ['Our room is number ten.', 'Աուըր րում իզ նամբըր թեն։', 'Մեր սենյակը տասներորդ համարն է։'],
  ], [['Քանի՞ ուսանող կա դասարանում։ Թիվը գրիր բառով։', 'twelve'], ['Քանի՞ գրիչ ունի պատմողը։ Թիվը գրիր բառով։', 'three']]),
  chapter('lesson-6-time-dates', 'Հանդիպման ժամը', 'everyday-reading', [
    ['Our lesson starts at nine o’clock.', 'Աուըր լեսըն սթարթս էթ նայն ըքլոք։', 'Մեր դասը սկսվում է ժամը իննին։'],
    ['Lunch is at twelve o’clock.', 'Լանչ իզ էթ թուելվ ըքլոք։', 'Ճաշը ժամը տասներկուսին է։'],
    ['We meet on Friday at three o’clock.', 'Ուի միթ օն Ֆրայդեյ էթ թրի ըքլոք։', 'Մենք հանդիպում ենք ուրբաթ՝ ժամը երեքին։'],
  ], [['Ժամը քանի՞սին է սկսվում դասը։ Գրիր միայն թիվը՝ բառով։', 'nine'], ['Շաբաթվա ո՞ր օրն են հանդիպում։', 'Friday']]),
  chapter('lesson-7-directions', 'Դեպի գրադարան', 'everyday-reading', [
    ['Go straight. Turn left.', 'Գոու սթրեյթ։ Թըրն լեֆթ։', 'Գնա ուղիղ։ Թեքվիր ձախ։'],
    ['The library is next to the school.', 'Դը լայբրըրի իզ նեքստ թու դը սքուլ։', 'Գրադարանը դպրոցի կողքին է։'],
    ['The door is on your right.', 'Դը դոր իզ օն յոր րայթ։', 'Դուռը քո աջ կողմում է։'],
  ], [['Տեքստով՝ ուղիղ գնալուց հետո ո՞ր կողմ պետք է թեքվել։ Գրիր left կամ right։', 'left'], ['Ո՞ր շենքի կողքին է գրադարանը։ Գրիր մեկ անգլերեն բառ։', 'school']]),
  chapter('lesson-8-daily-greetings', 'Առաջին օրը', 'everyday-reading', [
    ['Good morning! My name is Anna.', 'Գուդ մորնինգ։ Մայ նեյմ իզ Աննա։', 'Բարի լույս։ Իմ անունը Աննա է։'],
    ['I am from Armenia. I am a student.', 'Այ էմ ֆրոմ Արմինիա։ Այ էմ ը սթյուդընթ։', 'Ես Հայաստանից եմ։ Ես ուսանող եմ։'],
    ['Nice to meet you. See you tomorrow!', 'Նայս թու միթ յու։ Սի յու թըմորոու։', 'Ուրախ եմ ծանոթանալու համար։ Կհանդիպենք վաղը։'],
  ], [['Ո՞ր երկրից է Աննան։ Գրիր երկրի անգլերեն անունը։', 'Armenia'], ['Լրացրու տեքստից՝ I am a ___.', 'student']]),
];

export const getA1Chapter = (lessonId: string) => A1_CHAPTERS.find(chapter => chapter.lessonId === lessonId);

export const A1_FINAL_READING = 'My name is Mari. I am a student. I have two books. On Monday, my English lesson starts at ten o’clock. On Sunday, I read at home.';
export const A1_FINAL_QUESTIONS: CourseQuestion[] = [
  ...A1_CHAPTERS.map((chapter, index): CourseQuestion => {
    const lesson = LESSONS_DATA.find(item => item.id === chapter.lessonId)!;
    const sentence = lesson.sentences[Math.floor(lesson.sentences.length / 2)];
    const listening = index > 2 && index % 3 === 0;
    return {...sentence, id: `a1-final-${lesson.id}`, lessonId: lesson.id,
      skill: listening ? 'listening' : 'writing',
      promptAm: listening ? 'Լսիր և գրիր լսած բառը կամ նախադասությունը։' : sentence.writingTask?.promptAm || `Անգլերեն գրիր՝ «${sentence.armenian}»։`,
    };
  }),
  ...chapter('lesson-8-daily-greetings', '', '', [], [
    ['Կարդա ամփոփիչ տեքստը։ Ի՞նչ է պատմողի անունը։', 'Mari'],
    ['Քանի՞ գիրք ունի Մարին։ Գրիր թիվը անգլերեն բառով։', 'two'],
    ['Շաբաթվա ո՞ր օրն է անգլերենի դասը։', 'Monday'],
    ['Ժամը քանի՞սին է սկսվում դասը։ Գրիր թիվը անգլերեն բառով։', 'ten'],
  ]).questions.map((question, index) => ({...question, id: `a1-final-reading-${index + 1}`})),
];

// Optional official practice links. They are not copied or required for completion.
export const A1_EXTRA_READING = [
  {title: 'British Council · A1 reading', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1'},
  {title: 'Student card application', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1/student-card-application'},
  {title: 'Text messages to a friend', url: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1/text-messages-friend'},
];
