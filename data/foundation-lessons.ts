import type { LessonItem, LessonSentence } from '../lib/types';

const LETTERS = [
  ['A', 'էյ'], ['B', 'բի'], ['C', 'սի'], ['D', 'դի'], ['E', 'ի'],
  ['F', 'էֆ'], ['G', 'ջի'], ['H', 'էյչ'], ['I', 'այ'], ['J', 'ջեյ'],
  ['K', 'քեյ'], ['L', 'էլ'], ['M', 'էմ'], ['N', 'էն'], ['O', 'օու'],
  ['P', 'փի'], ['Q', 'քյու'], ['R', 'ար'], ['S', 'էս'], ['T', 'թի'],
  ['U', 'յու'], ['V', 'վի'], ['W', 'դաբլյու'], ['X', 'էքս'], ['Y', 'ուայ'], ['Z', 'զեդ'],
];

const word = (id: string, english: string, pronunciation: string, armenian: string): LessonSentence => ({
  id: `foundation-${id}`, english, pronunciation, armenian,
  writingTask: {promptAm: `Անգլերեն գրիր՝ «${armenian}»։`},
});

const number = (value: number, english: string, pronunciation: string, armenian: string): LessonSentence => ({
  id: `foundation-number-${value}`, english, pronunciation, armenian: `${value} · ${armenian}`,
  writingTask: {promptAm: `${value} թիվը գրիր անգլերեն բառերով։`},
});

const year = (value: number, english: string, pronunciation: string, acceptedAnswers: string[] = []): LessonSentence => ({
  id: `foundation-year-${value}`, english, pronunciation, armenian: `${value} թվական`,
  writingTask: {promptAm: `${value} թվականը գրիր անգլերեն բառերով։`, acceptedAnswers},
});

const reply = (id: string, english: string, pronunciation: string, armenian: string, promptAm: string, acceptedAnswers: string[] = []): LessonSentence => ({
  id: `foundation-dialogue-${id}`, english, pronunciation, armenian,
  writingTask: {promptAm, acceptedAnswers, answerMode: 'short-answer'},
});

export const FOUNDATION_LESSONS: LessonItem[] = [
  ...[LETTERS.slice(0, 9), LETTERS.slice(9, 18), LETTERS.slice(18)].map((letters, index): LessonItem => ({
    id: `foundation-alphabet-${index + 1}`, categoryId: 'grammar-basics', order: -100 + index,
    titleAm: `Այբուբեն․ ${letters[0][0]}–${letters[letters.length - 1][0]}`,
    titleEn: 'The English alphabet', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Լսիր տառի անունը, ճանաչիր մեծատառն ու փոքրատառը և գրիր երկուսն էլ։',
    grammarTipAm: 'Անգլերենն ունի 26 տառ։ Տառի անունն ու բառի մեջ հնչյունը կարող են տարբեր լինել։ Z-ն բրիտանական տարբերակում «զեդ» է, ամերիկյանում՝ «զի»։',
    sentences: letters.map(([letter, name]) => ({
      id: `foundation-letter-${letter}`, english: `${letter} ${letter.toLowerCase()}`,
      pronunciation: name, armenian: `Տառի անունը՝ ${name}`,
      speechText: letter,
      writingTask: {promptAm: `Գրիր «${name}» տառի մեծատառն ու փոքրատառը՝ բացատով։`, caseSensitive: true},
    })),
  })),
  {
    id: 'foundation-people', categoryId: 'grammar-basics', order: -97,
    titleAm: 'Տղա, աղջիկ և մարդիկ', titleEn: 'People', level: 'A1', estimatedMinutes: 6,
    descriptionAm: 'Սովորիր մարդկանց անվանող ութ պարզ բառ և գրիր դրանք։',
    grammarTipAm: 'Սկզբում սովորում ենք մեկական բառ։ Լսիր, նայիր գրությանը, ապա փորձիր գրել հիշողությամբ։',
    sentences: [
      word('boy', 'boy', 'բոյ', 'տղա'),
      word('girl', 'girl', 'գըրլ', 'աղջիկ'),
      word('man', 'man', 'մեն', 'տղամարդ'),
      word('woman', 'woman', 'վումըն', 'կին'),
      word('child', 'child', 'չայլդ', 'երեխա'),
      word('friend', 'friend', 'ֆրենդ', 'ընկեր'),
      word('teacher', 'teacher', 'թիչըր', 'ուսուցիչ'),
      word('student', 'student', 'սթյուդընթ', 'ուսանող'),
    ],
  },
  {
    id: 'foundation-everyday-words', categoryId: 'daily-conversations', order: -96,
    titleAm: 'Պարզ բառեր՝ քո շուրջը', titleEn: 'Everyday words', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Գիրք, գրիչ, կենդանիներ և առօրյայում հանդիպող բառեր։',
    grammarTipAm: 'Մի շտապիր նախադասություններ կազմել․ նախ ճանաչիր և ճիշտ գրիր յուրաքանչյուր բառը։',
    sentences: [
      word('book', 'book', 'բուք', 'գիրք'),
      word('pen', 'pen', 'փեն', 'գրիչ'),
      word('cat', 'cat', 'քեթ', 'կատու'),
      word('dog', 'dog', 'դոգ', 'շուն'),
      word('water', 'water', 'ուոթըր', 'ջուր'),
      word('school', 'school', 'սքուլ', 'դպրոց'),
    ],
  },
  {
    id: 'foundation-first-words', categoryId: 'daily-conversations', order: -95,
    titleAm: 'Բարև և շնորհակալություն', titleEn: 'Greetings and polite words', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Բարևել, հրաժեշտ տալ, շնորհակալություն հայտնել և պատասխանել։',
    grammarTipAm: 'Սկսիր կարճ բառերից և արտահայտություններից։ Հայերեն տառադարձումը մոտավոր հուշում է․ լսիր նաև ձայնը։',
    sentences: [
      {id:'foundation-hello',english:'Hello.',pronunciation:'Հելոու։',armenian:'Բարև։'},
      {id:'foundation-bye',english:'Goodbye.',pronunciation:'Գուդբայ։',armenian:'Ցտեսություն։'},
      {id:'foundation-yes',english:'Yes.',pronunciation:'Յես։',armenian:'Այո։'},
      {id:'foundation-no',english:'No.',pronunciation:'Նոու։',armenian:'Ոչ։'},
      {id:'foundation-please',english:'Please.',pronunciation:'Փլիզ։',armenian:'Խնդրում եմ։'},
      {id:'foundation-thanks',english:'Thank you.',pronunciation:'Թենք յու։',armenian:'Շնորհակալություն։'},
    ],
  },
  {
    id: 'foundation-numbers-0-10', categoryId: 'numbers', order: -94,
    titleAm: 'Թվեր՝ 0–10', titleEn: 'Numbers zero to ten', level: 'A1', estimatedMinutes: 7,
    descriptionAm: 'Սովորիր հաշվել զրոյից տասը և թվերը գրել անգլերեն բառերով։',
    grammarTipAm: 'Ստուգման ժամանակ գրիր թվի անունը՝ անգլերեն տառերով, ոչ թե թվանշանը։',
    sentences: [
      number(0, 'zero', 'զիրոու', 'զրո'), number(1, 'one', 'ուան', 'մեկ'),
      number(2, 'two', 'թու', 'երկու'), number(3, 'three', 'թրի', 'երեք'),
      number(4, 'four', 'ֆոր', 'չորս'), number(5, 'five', 'ֆայվ', 'հինգ'),
      number(6, 'six', 'սիքս', 'վեց'), number(7, 'seven', 'սեվըն', 'յոթ'),
      number(8, 'eight', 'էյթ', 'ութ'), number(9, 'nine', 'նայն', 'ինը'),
      number(10, 'ten', 'թեն', 'տասը'),
    ],
  },
  {
    id: 'foundation-numbers-11-20', categoryId: 'numbers', order: -93,
    titleAm: 'Թվեր՝ 11–20', titleEn: 'Numbers eleven to twenty', level: 'A1', estimatedMinutes: 7,
    descriptionAm: 'Շարունակիր հաշվել և սովորիր տասնմեկից քսան թվերի գրությունը։',
    grammarTipAm: '13–19 թվերի անուններն ավարտվում են -teen-ով։ Ուշադրություն դարձրու thirteen, fifteen և eighteen բառերի գրությանը։',
    sentences: [
      number(11, 'eleven', 'իլեվըն', 'տասնմեկ'), number(12, 'twelve', 'թուելվ', 'տասներկու'),
      number(13, 'thirteen', 'թըրթին', 'տասներեք'), number(14, 'fourteen', 'ֆորթին', 'տասնչորս'),
      number(15, 'fifteen', 'ֆիֆթին', 'տասնհինգ'), number(16, 'sixteen', 'սիքսթին', 'տասնվեց'),
      number(17, 'seventeen', 'սեվընթին', 'տասնյոթ'), number(18, 'eighteen', 'էյթին', 'տասնութ'),
      number(19, 'nineteen', 'նայնթին', 'տասնինը'), number(20, 'twenty', 'թուենթի', 'քսան'),
    ],
  },
  {
    id: 'foundation-tens', categoryId: 'numbers', order: -85,
    titleAm: 'Տասնյակներ, հարյուր և հազար', titleEn: 'Tens, a hundred and a thousand', level: 'A1', estimatedMinutes: 7,
    descriptionAm: 'Սովորիր այն թվերը, որոնք պետք են նաև տարեթվերը կարդալու համար։',
    grammarTipAm: 'Տասնյակները վերջանում են -ty-ով։ 40-ը գրվում է forty, ոչ թե fourty։ Հարյուրը՝ one hundred, հազարը՝ one thousand։',
    sentences: [
      {...number(20, 'twenty', 'թուենթի', 'քսան'), id: 'foundation-tens-20'},
      number(30, 'thirty', 'թըրթի', 'երեսուն'), number(40, 'forty', 'ֆորթի', 'քառասուն'),
      number(50, 'fifty', 'ֆիֆթի', 'հիսուն'), number(60, 'sixty', 'սիքսթի', 'վաթսուն'),
      number(70, 'seventy', 'սեվընթի', 'յոթանասուն'), number(80, 'eighty', 'էյթի', 'ութսուն'),
      number(90, 'ninety', 'նայնթի', 'իննսուն'),
      number(100, 'one hundred', 'ուան հանդրեդ', 'հարյուր'),
      number(1000, 'one thousand', 'ուան թաուզընդ', 'հազար'),
    ],
  },
  {
    id: 'foundation-introduction', categoryId: 'grammar-basics', order: -91,
    titleAm: 'Ես, դու և առաջին նախադասությունը', titleEn: 'Introducing yourself', level: 'A1', estimatedMinutes: 6,
    descriptionAm: 'Կարդա կարճ օրինակը և լրացրու միայն պակասող բառը։',
    grammarTipAm: 'I am = ես եմ, you are = դու ես, he/she is = նա է։ «I» դերանունը միշտ գրվում է մեծատառով։',
    sentences: [
      {id:'foundation-i',english:'I am Anna.',pronunciation:'Այ էմ Աննա։',armenian:'Ես Աննան եմ։', writingTask: {promptAm: 'Լրացրու՝ I ___ Anna. Գրիր միայն պակասող բառը։', acceptedAnswers: ['am'], answerMode: 'short-answer'}},
      {id:'foundation-you',english:'You are my friend.',pronunciation:'Յու ար մայ ֆրենդ։',armenian:'Դու իմ ընկերն ես։', writingTask: {promptAm: 'Լրացրու՝ You ___ my friend.', acceptedAnswers: ['are'], answerMode: 'short-answer'}},
      {id:'foundation-he',english:'He is a student.',pronunciation:'Հի իզ ը սթյուդընթ։',armenian:'Նա ուսանող է (արական)։', writingTask: {promptAm: 'Լրացրու՝ He ___ a student.', acceptedAnswers: ['is'], answerMode: 'short-answer'}},
      {id:'foundation-she',english:'She is a teacher.',pronunciation:'Շի իզ ը թիչըր։',armenian:'Նա ուսուցիչ է (իգական)։', writingTask: {promptAm: 'Լրացրու՝ She is a ___. Նա ուսուցիչ է։', acceptedAnswers: ['teacher'], answerMode: 'short-answer'}},
      {id:'foundation-we',english:'We are ready.',pronunciation:'Ուի ար րեդի։',armenian:'Մենք պատրաստ ենք։', writingTask: {promptAm: 'Լրացրու՝ We ___ ready.', acceptedAnswers: ['are'], answerMode: 'short-answer'}},
      {id:'foundation-name',english:'What is your name?',pronunciation:'Ուոթ իզ յոր նեյմ՞',armenian:'Ի՞նչ է քո անունը։', writingTask: {promptAm: 'Լրացրու՝ What is your ___? Հարցնում ենք անունը։', acceptedAnswers: ['name'], answerMode: 'short-answer'}},
    ],
  },
  {
    id: 'foundation-years', categoryId: 'time-and-dates', order: 4.5,
    titleAm: 'Պարզ տարեթվեր', titleEn: 'Reading years', level: 'A1', estimatedMinutes: 6,
    descriptionAm: 'Թվերից անցիր տարեթվերին՝ լսելով և գրելով մի քանի օրինակ։',
    grammarTipAm: '1990-ը սովորաբար կարդում ենք երկու մասով՝ nineteen ninety։ 2000-ը՝ two thousand։ 2026-ը՝ twenty twenty-six կամ two thousand and twenty-six։ 21–99 բաղադրյալ թվերը սովորաբար գրվում են գծիկով։',
    sentences: [
      year(1990, 'nineteen ninety', 'նայնթին նայնթի'),
      year(1999, 'nineteen ninety-nine', 'նայնթին նայնթի նայն'),
      year(2000, 'two thousand', 'թու թաուզընդ'),
      year(2005, 'two thousand and five', 'թու թաուզընդ ընդ ֆայվ', ['two thousand five', 'twenty oh five']),
      year(2024, 'twenty twenty-four', 'թուենթի թուենթի ֆոր', ['two thousand and twenty-four', 'two thousand twenty-four']),
      year(2026, 'twenty twenty-six', 'թուենթի թուենթի սիքս', ['two thousand and twenty-six', 'two thousand twenty-six']),
    ],
  },
  {
    id: 'foundation-dialogue-greeting', categoryId: 'daily-conversations', order: -89,
    titleAm: 'Փոքր զրույց․ բարևել', titleEn: 'A short greeting', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Չորս կարճ արտահայտությամբ բարևիր և հարցրու՝ ինչպես է զրուցակիցդ։',
    grammarTipAm: 'How are you? հարցին կարող ես կարճ պատասխանել՝ Fine կամ Good։ Ամբողջ օրինակը արտագրելու կարիք չկա։',
    sentences: [
      reply('hello', 'Hello.', 'Հելոու։', 'Բարև։', 'Հանդիպում ես ընկերոջդ։ Անգլերեն գրիր՝ «Բարև»։', ['Hi.']),
      reply('how-are-you', 'How are you?', 'Հաու ար յու՞', 'Ինչպե՞ս ես։', 'Բարևելուց հետո հարցրու՝ «Ինչպե՞ս ես»։'),
      reply('fine', 'Fine.', 'Ֆայն։', 'Լավ։', 'How are you? — Ինչպե՞ս ես։ Պատասխանիր՝ լավ։ Մեկ բառն էլ բավական է։', ['I am fine.', "I'm fine.", 'Good.', 'I am good.', "I'm good.", 'Fine, thanks.', 'Fine thank you.']),
      reply('thanks', 'Thank you.', 'Թենք յու։', 'Շնորհակալություն։', 'Շնորհակալություն հայտնիր ընկերոջդ։', ['Thanks.']),
    ],
  },
  {
    id: 'foundation-dialogue-name', categoryId: 'daily-conversations', order: -88,
    titleAm: 'Փոքր զրույց․ ծանոթանալ', titleEn: 'Meeting someone', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Հարցրու անունը, ներկայացիր և արձագանքիր ծանոթությանը։',
    grammarTipAm: 'My name is նշանակում է «Իմ անունն է»։ Այս զրույցում ներկայանում ես Աննա անունով։ Nice to meet you = Ուրախ եմ ծանոթանալու համար։',
    sentences: [
      reply('ask-name', 'What is your name?', 'Ուոթ իզ յոր նեյմ՞', 'Ի՞նչ է քո անունը։', 'Նոր ծանոթիդ անգլերեն հարցրու՝ «Ի՞նչ է քո անունը»։', ["What's your name?"]),
      reply('my-name', 'My name is Anna.', 'Մայ նեյմ իզ Աննա։', 'Իմ անունը Աննա է։', 'Այս փոքր զրույցում դու Աննան ես։ What is your name? Կարող ես գրել միայն անունը։', ['Anna', "My name's Anna.", 'I am Anna.', "I'm Anna."]),
      reply('nice', 'Nice to meet you.', 'Նայս թու միթ յու։', 'Ուրախ եմ ծանոթանալու համար։', 'Ասա՝ «Ուրախ եմ ծանոթանալու համար»։'),
      reply('nice-too', 'You too.', 'Յու թու։', 'Ես էլ։', 'Քեզ ասում են՝ Nice to meet you. Կարճ պատասխանիր՝ «Ես էլ»։', ['Nice to meet you too.']),
    ],
  },
  {
    id: 'foundation-dialogue-age', categoryId: 'daily-conversations', order: -87,
    titleAm: 'Փոքր զրույց․ տարիք', titleEn: 'Talking about age', level: 'A1', estimatedMinutes: 5,
    descriptionAm: 'Օգտագործիր սովորած թվերը՝ տարիքի մասին հարցնելիս և պատասխանելիս։',
    grammarTipAm: 'How old are you? = Քանի՞ տարեկան ես։ Քո տարիքը կարող ես գրել կարճ՝ 11, eleven կամ I’m 11։ Օրինակի տարիքը պարտադիր չէ կրկնել։',
    sentences: [
      reply('ask-age', 'How old are you?', 'Հաու օուլդ ար յու՞', 'Քանի՞ տարեկան ես։', 'Անգլերեն հարցրու՝ «Քանի՞ տարեկան ես»։'),
      {...reply('ten', "I'm eleven.", 'Այմ իլեվըն։', 'Ես տասնմեկ տարեկան եմ։', ''), writingTask: {promptAm: 'How old are you? — Քանի՞ տարեկան ես։ Պատասխանիր քո մասին։', answerMode: 'personal-age', helpAm: 'Գրիր քո տարիքը՝ թվանշանով կամ անգլերեն բառով։ Օրինակ՝ 11, eleven, I am 11 կամ I’m eleven years old։ Հետո սեղմիր «Ստուգել»։'}},
      reply('and-you', 'And you?', 'Ընդ յու՞', 'Իսկ դո՞ւ։', 'Հիմա նույն հարցն ուղղիր զրուցակցիդ՝ «Իսկ դո՞ւ»։'),
      reply('eleven', 'Eleven.', 'Իլեվըն։', 'Տասնմեկ։', 'Հիմա խոսում ես 11 տարեկան Աննայի անունից։ How old are you? Կարճ պատասխանիր։', ['11', 'I am eleven.', "I'm eleven.", 'I am 11.', "I'm 11.", 'I am eleven years old.', "I'm eleven years old.", 'I am 11 years old.', "I'm 11 years old.", 'eleven years old', '11 years old']),
    ],
  },
];
