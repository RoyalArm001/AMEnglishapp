import type { CourseChapter } from './a1-course';

type Line = [english: string, pronunciation: string, armenian: string];
function reading(lessonId: string, titleAm: string, bookId: string, lines: Line[], checks: [string, string][]): CourseChapter {
  return {lessonId, titleAm, bookId,
    lines: lines.map(([english, pronunciation, armenian]) => ({english, pronunciation, armenian})),
    questions: checks.map(([promptAm, english], index) => ({
      id: `reading-${lessonId}-${index + 1}`, lessonId, promptAm, english,
      armenian: promptAm, pronunciation: '', skill: 'reading',
    })),
  };
}

// Original companion readings, using only the grammar introduced by each lesson.
export const INTERNATIONAL_CHAPTERS: CourseChapter[] = [
  reading('intl-letter-sounds', 'Միացնում ենք հնչյունները', 'first-steps', [
    ['c–a–t → cat', 'քեթ', 'կատու'], ['p–e–n → pen', 'փեն', 'գրիչ'],
    ['s–i–t → sit', 'սիթ', 'նստել'], ['d–o–g → dog', 'դոգ', 'շուն'], ['s–u–n → sun', 'սան', 'արև'],
  ], [['Տառերը միացրու և գրիր բառը՝ c–a–t։', 'cat'], ['Ո՞ր բառն է նշանակում «արև»։', 'sun']]),
  reading('intl-family', 'Ընտանիքի բառաքարտերը', 'first-steps', [
    ['mother · father', 'մադըր · ֆադըր', 'մայր · հայր'],
    ['brother · sister', 'բրադըր · սիսթըր', 'եղբայր · քույր'],
    ['son · daughter', 'սան · դոթըր', 'որդի · դուստր'],
  ], [['Գրիր «քույր» բառը անգլերեն։', 'sister'], ['Ո՞ր բառն է նշանակում «հայր»։', 'father']]),
  reading('intl-colors', 'Գունավոր բառեր', 'first-steps', [
    ['red pen · blue pen', 'րեդ փեն · բլու փեն', 'կարմիր գրիչ · կապույտ գրիչ'],
    ['green book · yellow book', 'գրին բուք · յելոու բուք', 'կանաչ գիրք · դեղին գիրք'],
    ['black cat · white cat', 'բլեք քեթ · ուայթ քեթ', 'սև կատու · սպիտակ կատու'],
  ], [['Լրացրու՝ կարմիր գրիչ = ___ pen։ Գրիր միայն գույնը։', 'red'], ['Լրացրու՝ սպիտակ կատու = ___ cat։', 'white']]),
  reading('intl-articles-plurals', 'Մեկը և շատերը', 'first-steps', [
    ['a book → books', 'ը բուք → բուքս', 'մի գիրք → գրքեր'],
    ['an apple → apples', 'ըն էփըլ → էփըլզ', 'մի խնձոր → խնձորներ'],
    ['a pen → pens', 'ը փեն → փենզ', 'մի գրիչ → գրիչներ'],
  ], [['Լրացրու՝ ___ apple։ Գրիր a կամ an։', 'an'], ['Գրիր book բառի հոգնակին։', 'books']]),
  reading('intl-be-questions', 'Ո՞վ է Աննան', 'numbers-and-me', [
    ['Anna is a teacher.', 'Աննա իզ ը թիչըր։', 'Աննան ուսուցիչ է։'],
    ['Is she a student?', 'Իզ շի ը սթյուդընթ՞', 'Նա ուսանո՞ղ է։'],
    ['No, she is not. She is a teacher.', 'Նոու շի իզ նոթ։ Շի իզ ը թիչըր։', 'Ոչ։ Նա ուսուցիչ է։'],
  ], [['Տեքստով՝ Աննան teacher է, թե student։ Գրիր ճիշտ բառը։', 'teacher'], ['Լրացրու հարցը՝ ___ she a student?', 'Is']]),
  reading('intl-have', 'Գիրքն ու գրիչը', 'numbers-and-me', [
    ['I have a book and a pen.', 'Այ հեվ ը բուք ընդ ը փեն։', 'Ես գիրք և գրիչ ունեմ։'],
    ['My sister has a cat.', 'Մայ սիսթըր հեզ ը քեթ։', 'Քույրս կատու ունի։'],
    ['I do not have a car.', 'Այ դու նոթ հեվ ը քար։', 'Ես մեքենա չունեմ։'],
  ], [['Ի՞նչ կենդանի ունի պատմողի քույրը։ Գրիր մեկ անգլերեն բառ։', 'cat'], ['Լրացրու՝ My sister ___ a cat.', 'has']]),
  reading('intl-food', 'Թեյ, խնդրում եմ', 'everyday-reading', [
    ['Tea, please. Thank you!', 'Թի փլիզ։ Թենք յու։', 'Թեյ, խնդրում եմ։ Շնորհակալություն։'],
    ['I like apples.', 'Այ լայք էփըլզ։', 'Ես սիրում եմ խնձոր։'],
    ['I like milk.', 'Այ լայք միլք։', 'Ես սիրում եմ կաթ։'],
  ], [['Ի՞նչ ըմպելիք է խնդրում պատմողը։ Գրիր անգլերեն։', 'tea'], ['Ո՞ր միրգն է սիրում։ Գրիր տեքստի բառը՝ հոգնակի։', 'apples']]),
  reading('intl-routine', 'Իմ օրը', 'everyday-reading', [
    ['I get up. I eat breakfast.', 'Այ գեթ ափ։ Այ իթ բրեքֆըսթ։', 'Ես վեր եմ կենում։ Նախաճաշում եմ։'],
    ['I go to school.', 'Այ գոու թու սքուլ։', 'Ես գնում եմ դպրոց։'],
    ['I read a book. I study English every day.', 'Այ րիդ ը բուք։ Այ սթադի Ինգլիշ էվրի դեյ։', 'Ես գիրք եմ կարդում։ Ամեն օր անգլերեն եմ սովորում։'],
    ['I go to bed.', 'Այ գոու թու բեդ։', 'Ես գնում եմ քնելու։'],
  ], [['Ո՞ւր է գնում պատմողը նախաճաշից հետո։ Գրիր մեկ բառ։', 'school'], ['Ո՞ր լեզուն է սովորում ամեն օր։', 'English']]),
];
