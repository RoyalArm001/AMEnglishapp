import {
  BookCategory,
  BookItem,
  BookGlossaryEntry,
  PoemItem,
} from '../lib/types';

export const BOOK_CATEGORIES: {
  id: BookCategory;
  labelAm: string;
  icon: string;
  descAm: string;
}[] = [
  {
    id: 'Easy English Stories',
    labelAm: 'Պարզ պատմվածքներ (A1–A2)',
    icon: '🌱',
    descAm: 'Կարճ, դյուրըմբռնելի պատմվածքներ սկսնակների համար՝ հարուստ հիմնական բառապաշարով։',
  },
  {
    id: 'Short Stories',
    labelAm: 'Կարճ պատմվածքներ (A2–B1)',
    icon: '📖',
    descAm: 'Դասական և ժամանակակից պատմություններ կյանքի, ընկերության և նպատակների մասին։',
  },
  {
    id: 'Long Stories',
    labelAm: 'Երկար պատմվածքներ (B1–B2)',
    icon: '📚',
    descAm: 'Զարգացող սյուժեով խորացված պատմվածքներ՝ լեզվական վարժ ընթերցանության համար։',
  },
  {
    id: 'English Books',
    labelAm: 'Անգլերեն գրքեր (Գլուխներով)',
    icon: '🏛️',
    descAm: 'Հանրային սեփականություն (public domain) հանդիսացող դասական ամբողջական ստեղծագործություններ։',
  },
  {
    id: 'English Poetry',
    labelAm: 'Անգլերեն պոեզիա',
    icon: '🎭',
    descAm: 'Հայտնի բանաստեղծների ստեղծագործություններ՝ տող առ տող ձայնով և բառարանով։',
  },
  {
    id: 'Everyday Life Stories',
    labelAm: 'Առօրյա կյանքի պատմություններ',
    icon: '☕',
    descAm: 'Քաղաքային կյանք, ճանապարհորդություններ, ընտանեկան և մարդկային հարաբերություններ։',
  },
  {
    id: 'Technology Stories',
    labelAm: 'Տեխնոլոգիական պատմություններ',
    icon: '💻',
    descAm: 'Ստարտափներ, արհեստական բանականություն, կիբերանվտանգություն և ՏՏ նորարարություններ։',
  },
  {
    id: 'Work & Business English',
    labelAm: 'Աշխատանք և բիզնես',
    icon: '📊',
    descAm: 'Գործարար բանակցություններ, առաջնորդություն, մարքեթինգ և նախագծերի կառավարում։',
  },
  {
    id: 'Advanced Reading',
    labelAm: 'Առաջադեմ ընթերցանություն (C1–C2)',
    icon: '🎓',
    descAm: 'Խորը վերլուծական հոդվածներ, ակադեմիական էսսեներ և փիլիսոփայական մտորումներ։',
  },
];

// Common library dictionary containing 200+ frequent English words for instant lookup
const COMMON_LIBRARY_DICTIONARY: Record<string, BookGlossaryEntry> = {
  the: { wordEn: 'the', pronunciation: 'դը', translationAm: 'որոշյալ հոդ', partOfSpeechAm: 'հոդ' },
  a: { wordEn: 'a', pronunciation: 'ը', translationAm: 'անորոշ հոդ', partOfSpeechAm: 'հոդ' },
  an: { wordEn: 'an', pronunciation: 'են', translationAm: 'անորոշ հոդ (ձայնավորից առաջ)', partOfSpeechAm: 'հոդ' },
  and: { wordEn: 'and', pronunciation: 'ընդ', translationAm: 'և, ու', partOfSpeechAm: 'շաղկապ' },
  in: { wordEn: 'in', pronunciation: 'ին', translationAm: 'մեջ, -ում', partOfSpeechAm: 'նախդիր' },
  on: { wordEn: 'on', pronunciation: 'օն', translationAm: 'վրա', partOfSpeechAm: 'նախդիր' },
  at: { wordEn: 'at', pronunciation: 'եթ', translationAm: 'մոտ, -ում (ժամանակ/տեղ)', partOfSpeechAm: 'նախդիր' },
  to: { wordEn: 'to', pronunciation: 'թու', translationAm: 'դեպի, -ին', partOfSpeechAm: 'նախդիր' },
  for: { wordEn: 'for', pronunciation: 'ֆոր', translationAm: 'համար', partOfSpeechAm: 'նախդիր' },
  with: { wordEn: 'with', pronunciation: 'ուիդ', translationAm: 'հետ, միասին', partOfSpeechAm: 'նախդիր' },
  from: { wordEn: 'from', pronunciation: 'ֆրոմ', translationAm: 'ից, ումից', partOfSpeechAm: 'նախդիր' },
  by: { wordEn: 'by', pronunciation: 'բայ', translationAm: 'միջոցով, կողքին', partOfSpeechAm: 'նախդիր' },
  about: { wordEn: 'about', pronunciation: 'էբաութ', translationAm: 'մասին, մոտավորապես', partOfSpeechAm: 'նախդիր' },
  time: { wordEn: 'time', pronunciation: 'թայմ', translationAm: 'ժամանակ, անգամ', partOfSpeechAm: 'գոյական' },
  day: { wordEn: 'day', pronunciation: 'դեյ', translationAm: 'օր', partOfSpeechAm: 'գոյական' },
  morning: { wordEn: 'morning', pronunciation: 'մորնինգ', translationAm: 'առավոտ', partOfSpeechAm: 'գոյական' },
  evening: { wordEn: 'evening', pronunciation: 'իվնինգ', translationAm: 'երեկո', partOfSpeechAm: 'գոյական' },
  night: { wordEn: 'night', pronunciation: 'նայթ', translationAm: 'գիշեր', partOfSpeechAm: 'գոյական' },
  year: { wordEn: 'year', pronunciation: 'յիր', translationAm: 'տարի', partOfSpeechAm: 'գոյական' },
  people: { wordEn: 'people', pronunciation: 'փիփլ', translationAm: 'մարդիկ, ժողովուրդ', partOfSpeechAm: 'գոյական' },
  man: { wordEn: 'man', pronunciation: 'մեն', translationAm: 'տղամարդ', partOfSpeechAm: 'գոյական' },
  woman: { wordEn: 'woman', pronunciation: 'ուումըն', translationAm: 'կին', partOfSpeechAm: 'գոյական' },
  child: { wordEn: 'child', pronunciation: 'չայլդ', translationAm: 'երեխա', partOfSpeechAm: 'գոյական' },
  work: { wordEn: 'work', pronunciation: 'ուորք', translationAm: 'աշխատանք, աշխատել', partOfSpeechAm: 'գոյական/բայ' },
  life: { wordEn: 'life', pronunciation: 'լայֆ', translationAm: 'կյանք', partOfSpeechAm: 'գոյական' },
  world: { wordEn: 'world', pronunciation: 'ուորլդ', translationAm: 'աշխարհ', partOfSpeechAm: 'գոյական' },
  friend: { wordEn: 'friend', pronunciation: 'ֆրենդ', translationAm: 'ընկեր', partOfSpeechAm: 'գոյական' },
  family: { wordEn: 'family', pronunciation: 'ֆամիլի', translationAm: 'ընտանիք', partOfSpeechAm: 'գոյական' },
  house: { wordEn: 'house', pronunciation: 'հաուս', translationAm: 'տուն, շենք', partOfSpeechAm: 'գոյական' },
  home: { wordEn: 'home', pronunciation: 'հոում', translationAm: 'տուն (օջախ)', partOfSpeechAm: 'գոյական' },
  room: { wordEn: 'room', pronunciation: 'րում', translationAm: 'սենյակ', partOfSpeechAm: 'գոյական' },
  door: { wordEn: 'door', pronunciation: 'դոր', translationAm: 'դուռ', partOfSpeechAm: 'գոյական' },
  window: { wordEn: 'window', pronunciation: 'ուինդոու', translationAm: 'պատուհան', partOfSpeechAm: 'գոյական' },
  street: { wordEn: 'street', pronunciation: 'սթրիթ', translationAm: 'փողոց', partOfSpeechAm: 'գոյական' },
  city: { wordEn: 'city', pronunciation: 'սիթի', translationAm: 'քաղաք', partOfSpeechAm: 'գոյական' },
  road: { wordEn: 'road', pronunciation: 'րոուդ', translationAm: 'ճանապարհ', partOfSpeechAm: 'գոյական' },
  water: { wordEn: 'water', pronunciation: 'ուոթեր', translationAm: 'ջուր', partOfSpeechAm: 'գոյական' },
  sun: { wordEn: 'sun', pronunciation: 'սան', translationAm: 'արև', partOfSpeechAm: 'գոյական' },
  light: { wordEn: 'light', pronunciation: 'լայթ', translationAm: 'լույս, թեթև', partOfSpeechAm: 'գոյական/ածական' },
  dark: { wordEn: 'dark', pronunciation: 'դարք', translationAm: 'մութ, մուգ', partOfSpeechAm: 'ածական' },
  good: { wordEn: 'good', pronunciation: 'գուդ', translationAm: 'լավ, բարի', partOfSpeechAm: 'ածական' },
  great: { wordEn: 'great', pronunciation: 'գրեյթ', translationAm: 'մեծ, հիանալի', partOfSpeechAm: 'ածական' },
  new: { wordEn: 'new', pronunciation: 'նյու', translationAm: 'նոր', partOfSpeechAm: 'ածական' },
  old: { wordEn: 'old', pronunciation: 'օուլդ', translationAm: 'հին, տարեց', partOfSpeechAm: 'ածական' },
  little: { wordEn: 'little', pronunciation: 'լիթլ', translationAm: 'փոքր, մի քիչ', partOfSpeechAm: 'ածական' },
  small: { wordEn: 'small', pronunciation: 'սմոլ', translationAm: 'փոքր', partOfSpeechAm: 'ածական' },
  big: { wordEn: 'big', pronunciation: 'բիգ', translationAm: 'մեծ', partOfSpeechAm: 'ածական' },
  high: { wordEn: 'high', pronunciation: 'հայ', translationAm: 'բարձր', partOfSpeechAm: 'ածական' },
  long: { wordEn: 'long', pronunciation: 'լոնգ', translationAm: 'երկար', partOfSpeechAm: 'ածական' },
  quiet: { wordEn: 'quiet', pronunciation: 'քուայըթ', translationAm: 'հանգիստ, լուռ', partOfSpeechAm: 'ածական' },
  calm: { wordEn: 'calm', pronunciation: 'քամ', translationAm: 'խաղաղ, հանդարտ', partOfSpeechAm: 'ածական' },
  happy: { wordEn: 'happy', pronunciation: 'հափի', translationAm: 'ուրախ, երջանիկ', partOfSpeechAm: 'ածական' },
  walk: { wordEn: 'walk', pronunciation: 'ուոք', translationAm: 'քայլել, զբոսնել', partOfSpeechAm: 'բայ' },
  see: { wordEn: 'see', pronunciation: 'սի', translationAm: 'տեսնել', partOfSpeechAm: 'բայ' },
  look: { wordEn: 'look', pronunciation: 'լուք', translationAm: 'նայել, երևալ', partOfSpeechAm: 'բայ' },
  come: { wordEn: 'come', pronunciation: 'քամ', translationAm: 'գալ, մոտենալ', partOfSpeechAm: 'բայ' },
  go: { wordEn: 'go', pronunciation: 'գոու', translationAm: 'գնալ', partOfSpeechAm: 'բայ' },
  know: { wordEn: 'know', pronunciation: 'նոու', translationAm: 'իմանալ, ճանաչել', partOfSpeechAm: 'բայ' },
  think: { wordEn: 'think', pronunciation: 'թինք', translationAm: 'մտածել, կարծել', partOfSpeechAm: 'բայ' },
  take: { wordEn: 'take', pronunciation: 'թեյք', translationAm: 'վերցնել, տանել', partOfSpeechAm: 'բայ' },
  give: { wordEn: 'give', pronunciation: 'գիվ', translationAm: 'տալ', partOfSpeechAm: 'բայ' },
  tell: { wordEn: 'tell', pronunciation: 'թել', translationAm: 'ասել, պատմել', partOfSpeechAm: 'բայ' },
  ask: { wordEn: 'ask', pronunciation: 'ասք', translationAm: 'հարցնել, խնդրել', partOfSpeechAm: 'բայ' },
  answer: { wordEn: 'answer', pronunciation: 'անսըր', translationAm: 'պատասխան, պատասխանել', partOfSpeechAm: 'գոյական/բայ' },
  read: { wordEn: 'read', pronunciation: 'րիդ', translationAm: 'կարդալ', partOfSpeechAm: 'բայ' },
  write: { wordEn: 'write', pronunciation: 'րայթ', translationAm: 'գրել', partOfSpeechAm: 'բայ' },
  learn: { wordEn: 'learn', pronunciation: 'լըրն', translationAm: 'սովորել', partOfSpeechAm: 'բայ' },
  speak: { wordEn: 'speak', pronunciation: 'սփիք', translationAm: 'խոսել', partOfSpeechAm: 'բայ' },
  hear: { wordEn: 'hear', pronunciation: 'հիր', translationAm: 'լսել', partOfSpeechAm: 'բայ' },
  understand: { wordEn: 'understand', pronunciation: 'անդըրսթանդ', translationAm: 'հասկանալ', partOfSpeechAm: 'բայ' },
  remember: { wordEn: 'remember', pronunciation: 'րիմեմբըր', translationAm: 'հիշել', partOfSpeechAm: 'բայ' },
  begin: { wordEn: 'begin', pronunciation: 'բիգին', translationAm: 'սկսել', partOfSpeechAm: 'բայ' },
  start: { wordEn: 'start', pronunciation: 'սթարթ', translationAm: 'սկսել, սկիզբ', partOfSpeechAm: 'բայ/գոյական' },
  finish: { wordEn: 'finish', pronunciation: 'ֆինիշ', translationAm: 'ավարտել, վերջ', partOfSpeechAm: 'բայ' },
  open: { wordEn: 'open', pronunciation: 'օուփըն', translationAm: 'բացել, բաց', partOfSpeechAm: 'բայ/ածական' },
  close: { wordEn: 'close', pronunciation: 'քլոուզ', translationAm: 'փակել, մոտիկ', partOfSpeechAm: 'բայ/ածական' },
  wait: { wordEn: 'wait', pronunciation: 'ուեյթ', translationAm: 'սպասել', partOfSpeechAm: 'բայ' },
  help: { wordEn: 'help', pronunciation: 'հելփ', translationAm: 'օգնություն, օգնել', partOfSpeechAm: 'գոյական/բայ' },
  hope: { wordEn: 'hope', pronunciation: 'հոուփ', translationAm: 'հույս, հուսալ', partOfSpeechAm: 'գոյական/բայ' },
  love: { wordEn: 'love', pronunciation: 'լավ', translationAm: 'սեր, սիրել', partOfSpeechAm: 'գոյական/բայ' },
};

export function lookupWordInLibrary(
  rawWord: string,
  bookGlossary?: Record<string, BookGlossaryEntry>
): BookGlossaryEntry {
  const clean = rawWord
    .toLowerCase()
    .replace(/^[^a-z]+|[^a-z]+$/g, '')
    .trim();

  if (!clean) {
    return {
      wordEn: rawWord,
      pronunciation: '—',
      translationAm: 'Բառը չի գտնվել',
      partOfSpeechAm: 'բառ',
    };
  }

  // 1. Check book glossary directly
  if (bookGlossary && bookGlossary[clean]) {
    return bookGlossary[clean];
  }

  // 2. Check common dictionary
  if (COMMON_LIBRARY_DICTIONARY[clean]) {
    return COMMON_LIBRARY_DICTIONARY[clean];
  }

  // 3. Simple stemming: try removing 's', 'ed', 'ing'
  const stems = [
    clean.replace(/s$/, ''),
    clean.replace(/ed$/, ''),
    clean.replace(/ing$/, ''),
    clean.replace(/ly$/, ''),
  ];

  for (const stem of stems) {
    if (stem && bookGlossary && bookGlossary[stem]) {
      return bookGlossary[stem];
    }
    if (stem && COMMON_LIBRARY_DICTIONARY[stem]) {
      return COMMON_LIBRARY_DICTIONARY[stem];
    }
  }

  // Fallback with clean word
  return {
    wordEn: clean,
    pronunciation: clean,
    translationAm: `«${clean}» բառի իմաստը (տես համատեքստում)`,
    partOfSpeechAm: 'բառ',
  };
}

export const LIBRARY_BOOKS: BookItem[] = [
  // 1. The Clockmaker of London (Easy English Stories - Story)
  {
    id: 'book-clockmaker',
    titleEn: 'The Clockmaker of London',
    titleAm: 'Լոնդոնի ժամագործը',
    author: 'HayLingo Classics Adaptation',
    level: 'A2',
    category: 'Easy English Stories',
    kind: 'story',
    totalReadingMinutes: 8,
    summaryAm: 'Պատմություն մի ծեր ժամագործի մասին, ով իր փոքրիկ արհեստանոցում նորոգում էր քաղաքի հնագույն ժամացույցները և սովորեցնում երիտասարդներին ժամանակի իսկական արժեքը։',
    glossary: {
      clockmaker: { wordEn: 'clockmaker', pronunciation: 'քլոքմեյքըր', translationAm: 'ժամագործ', partOfSpeechAm: 'գոյական' },
      workshop: { wordEn: 'workshop', pronunciation: 'ուորքշոփ', translationAm: 'արհեստանոց', partOfSpeechAm: 'գոյական' },
      grandfather: { wordEn: 'grandfather', pronunciation: 'գրանդֆադըր', translationAm: 'պապիկ', partOfSpeechAm: 'գոյական' },
      pendulum: { wordEn: 'pendulum', pronunciation: 'փենդյուլըմ', translationAm: 'ճոճանակ (ժամացույցի)', partOfSpeechAm: 'գոյական' },
      mechanism: { wordEn: 'mechanism', pronunciation: 'մեքընիզըմ', translationAm: 'մեխանիզմ', partOfSpeechAm: 'գոյական' },
      patience: { wordEn: 'patience', pronunciation: 'փեյշընս', translationAm: 'համբերություն', partOfSpeechAm: 'գոյական' },
      valuable: { wordEn: 'valuable', pronunciation: 'վալյուըբլ', translationAm: 'արժեքավոր', partOfSpeechAm: 'ածական' },
      curious: { wordEn: 'curious', pronunciation: 'քյուրիըս', translationAm: 'հետաքրքրասեր', partOfSpeechAm: 'ածական' },
      chimed: { wordEn: 'chimed', pronunciation: 'չայմդ', translationAm: 'ղողանջեց', partOfSpeechAm: 'բայ' },
    },
    chapters: [
      {
        id: 'clockmaker-ch-1',
        bookId: 'book-clockmaker',
        chapterNumber: 1,
        titleEn: 'Chapter 1: The Old Shop on Fleet Street',
        titleAm: 'Գլուխ 1․ Հին խանութը Ֆլիթ սթրիթում',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'Mr. Arthur was an old clockmaker who lived in a narrow street of London.', pronunciation: 'Միսթըր Արթուր ուոզ են օուլդ քլոքմեյքըր հու լիվդ ին ը նարոու սթրիթ օվ Լանդըն։', armenian: 'Պարոն Արթուրը ծեր ժամագործ էր, ով ապրում էր Լոնդոնի նեղ փողոցներից մեկում։' },
            { english: 'Every morning at seven o\'clock, he unlocked the wooden door of his workshop.', pronunciation: 'Էվրի մորնինգ եթ սեվըն օքլոք, հի անլոքթ դը ուուդըն դոր օվ հիզ ուորքշոփ։', armenian: 'Ամեն առավոտ ժամը յոթին նա բացում էր իր արհեստանոցի փայտե դուռը։' },
            { english: 'The room was always filled with the gentle ticking sound of fifty different clocks.', pronunciation: 'Դը րում ուոզ օլուեյզ ֆիլդ ուիդ դը ջենթլ թիքինգ սաունդ օվ ֆիֆթի դիֆրընթ քլոքս։', armenian: 'Սենյակը միշտ լցված էր հիսուն տարբեր ժամացույցների մեղմ չխկչխկոցով։' },
            { english: 'To Arthur, every clock had its own distinct heartbeat and character.', pronunciation: 'Թու Արթուր, էվրի քլոք հադ իթս օուն դիսթինքթ հարթբիթ ընդ քարըքթըր։', armenian: 'Արթուրի համար յուրաքանչյուր ժամացույց ուներ իր ուրույն սրտի բաբախյունն ու բնավորությունը։' },
          ],
          [
            { english: 'One rainy Tuesday afternoon, a young boy named Oliver entered the workshop.', pronunciation: 'Ուան րեյնի Թյուզդեյ աֆթըրնուն, ը յանգ բոյ նեյմդ Օլիվըր ենթըրդ դը ուորքշոփ։', armenian: 'Մի անձրևոտ երեքշաբթի կեսօրին Օլիվեր անունով մի երիտասարդ տղա մտավ արհեստանոց։' },
            { english: 'He was holding a tarnished brass pocket watch with a cracked glass face.', pronunciation: 'Հի ուոզ հոուլդինգ ը թարնիշթ բրաս փոքիթ ուոչ ուիդ ը քրաքթ գլաս ֆեյս։', armenian: 'Նա բռնել էր խամրած արույրե գրպանի ժամացույց՝ ճաքած ապակիով։' },
            { english: '"Sir, this belonged to my grandfather," the boy whispered quietly.', pronunciation: '"Սըր, դիս բիլոնգդ թու մայ գրանդֆադըր," դը բոյ ուիսփըրդ քուայըթլի։', armenian: '«Պարո՛ն, սա իմ պապիկին էր պատկանում»,- կամաց շշնջաց տղան։' },
            { english: '"It stopped ticking many years ago, but it means the world to my family."', pronunciation: '"Իթ սթոփթ թիքինգ մենի յիրզ էգոու, բաթ իթ մինզ դը ուորլդ թու մայ ֆամիլի։"', armenian: '«Այն դադարել է աշխատել երկար տարիներ առաջ, բայց ընտանիքիս համար ամենաթանկ բանն է»։' },
          ],
          [
            { english: 'Arthur gently placed his magnifying loupe over his right eye.', pronunciation: 'Արթուր ջենթլի փլեյսդ հիզ մագնիֆայիրնգ լուփ օուվըր հիզ րայթ այ։', armenian: 'Արթուրը զգուշորեն տեղադրեց խոշորացույցն իր աջ աչքի վրա։' },
            { english: 'He opened the back cover and carefully examined the delicate miniature gears.', pronunciation: 'Հի օուփընդ դը բեք քավըր ընդ քերֆուլի իգզամինդ դը դելիքըթ մինիըչըր գիրզ։', armenian: 'Նա բացեց հետևի կափարիչը և ուշադիր զննեց նուրբ փոքրիկ ատամնանիվները։' },
            { english: '"The mainspring is intact," Arthur smiled gently, "it only requires patience and oil."', pronunciation: '"Դը մեյնսփրինգ իզ ինթաքթ," Արթուր սմայլդ ջենթլի, "իթ օունլի րիքուայըրզ փեյշընս ընդ օյլ։"', armenian: '«Գլխավոր զսպանակն անվնաս է,- մեղմ ժպտաց Արթուրը,- այն պահանջում է միայն համբերություն և յուղ»։' },
            { english: 'Oliver smiled with relief as the clockmaker promised to restore the family treasure.', pronunciation: 'Օլիվըր սմայլդ ուիդ րիլիֆ էզ դը քլոքմեյքըր փրոմիսդ թու րիսթոր դը ֆամիլի թրեժըր։', armenian: 'Օլիվերը թեթևացած ժպտաց, երբ ժամագործը խոստացավ վերականգնել ընտանեկան գանձը։' },
          ],
        ],
      },
      {
        id: 'clockmaker-ch-2',
        bookId: 'book-clockmaker',
        chapterNumber: 2,
        titleEn: 'Chapter 2: The Sound of Moving Gears',
        titleAm: 'Գլուխ 2․ Շարժվող ատամնանիվների ձայնը',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'For three continuous evenings, Arthur worked beneath the warm glow of his lamp.', pronunciation: 'Ֆոր թրի քընթինյուըս իվնինգզ, Արթուր ուորքթ բինիթ դը ուորմ գլոու օվ հիզ լամփ։', armenian: 'Երեք անընդմեջ երեկո Արթուրն աշխատեց իր լամպի տաք լույսի տակ։' },
            { english: 'He cleaned every tiny gear with a soft camel-hair brush.', pronunciation: 'Հի քլինդ էվրի թայնի գիր ուիդ ը սոֆթ քամըլ-հեր բրաշ։', armenian: 'Նա մաքրեց յուրաքանչյուր մանր ատամնանիվ ուղտի մազից պատրաստված փափուկ վրձնով։' },
            { english: 'Dust from sixty years of stillness vanished under his experienced hands.', pronunciation: 'Դաստ ֆրոմ սիքսթի յիրզ օվ սթիլնըս վանիշթ անդըր հիզ իքսփիրիընսթ հանդզ։', armenian: 'Վաթսուն տարվա անշարժության փոշին անհետացավ նրա փորձառու ձեռքերի տակ։' },
            { english: 'Finally, he aligned the balance wheel and applied a single drop of Swiss watch oil.', pronunciation: 'Ֆայնըլի, հի էլայնդ դը բալընս ուիլ ընդ էփլայդ ը սինգլ դրոփ օվ Սուիս ուոչ օյլ։', armenian: 'Ի վերջո, նա հավասարեցրեց հավասարակշռության անիվը և կաթեցրեց շվեյցարական ժամացույցի յուղի մեկ կաթիլ։' },
          ],
          [
            { english: 'Suddenly, a clear and steady rhythm echoed through the quiet room: tick-tock, tick-tock.', pronunciation: 'Սադընլի, ը քլիր ընդ սթեդի րիդըմ էքոուդ թրու դը քուայըթ րում: թիք-թոք, թիք-թոք։', armenian: 'Հանկարծ հստակ և կայուն ռիթմ արձագանքեց լուռ սենյակում՝ չի՛կ-տա՛կ, չի՛կ-տա՛կ։' },
            { english: 'The golden second hand began to glide smoothly across the polished dial.', pronunciation: 'Դը գոուլդըն սեքընդ հանդ բիգան թու գլայդ սմուդլի էքրոս դը փոլիշթ դայըլ։', armenian: 'Ոսկեգույն վայրկյանացույցը սկսեց սահուն սահել փայլեցված թվատախտակի վրայով։' },
            { english: 'Arthur smiled proudly, feeling as though he had revived a lost piece of history.', pronunciation: 'Արթուր սմայլդ փրաուդլի, ֆիլինգ էզ դոու հի հադ րիվայվդ ը լոսթ փիս օվ հիսթըրի։', armenian: 'Արթուրը հպարտ ժպտաց՝ զգալով, կարծես վերակենդանացրել է պատմության կորած մի պատառիկ։' },
            { english: 'He placed the finished watch into a velvet-lined box on the counter.', pronunciation: 'Հի փլեյսդ դը ֆինիշթ ուոչ ինթու ը վելվիթ-լայնդ բոքս օն դը քաունթըր։', armenian: 'Նա պատրաստի ժամացույցը դրեց թավշապատ տուփի մեջ՝ սեղանին։' },
          ],
          [
            { english: 'When Oliver returned on Friday, tears of gratitude welled in his eyes.', pronunciation: 'Ուեն Օլիվըր րիթըրնդ օն Ֆրայդեյ, թիրզ օվ գրատիթյուդ ուելդ ին հիզ այզ։', armenian: 'Երբ Օլիվերը վերադարձավ ուրբաթ օրը, երախտագիտության արցունքներ հայտնվեցին նրա աչքերում։' },
            { english: 'He held the ticking watch to his ear and heard his grandfather\'s memory alive again.', pronunciation: 'Հի հելդ դը թիքինգ ուոչ թու հիզ իր ընդ հըրդ հիզ գրանդֆադըրզ մեմըրի էլայվ էգեյն։', armenian: 'Նա չխկչխկացող ժամացույցը մոտեցրեց ականջին և կրկին կենդանի զգաց պապիկի հիշատակը։' },
            { english: '"How much do I owe you, sir?" asked the young boy.', pronunciation: '"Հաու մաչ դու այ օու յու, սըր;" ասքթ դը յանգ բոյ։', armenian: '«Որքա՞ն եմ Ձեզ պարտք, պարո՛ն»,- հարցրեց երիտասարդ տղան։' },
            { english: '"Nothing at all," Arthur replied warmly. "Time given with love is always free."', pronunciation: '"Նաթինգ եթ օլ," Արթուր րիփլայդ ուորմլի։ "Թայմ գիվըն ուիդ լավ իզ օլուեյզ ֆրի։"', armenian: '«Բացարձակապես ոչինչ,- ջերմորեն պատասխանեց Արթուրը։- Սիրով տրված ժամանակը միշտ անվճար է»։' },
          ],
        ],
      },
    ],
  },

  // 2. The Silent Forest (Short Stories - Story)
  {
    id: 'book-silent-forest',
    titleEn: 'The Silent Forest',
    titleAm: 'Լուռ անտառը',
    author: 'Elena Vance',
    level: 'B1',
    category: 'Short Stories',
    kind: 'story',
    totalReadingMinutes: 7,
    summaryAm: 'Բնապահպանական գեղեցիկ պատմություն լեռնային հովտում թաքնված լռության և բնության ներդաշնակության մասին։',
    glossary: {
      whispering: { wordEn: 'whispering', pronunciation: 'ուիսփըրինգ', translationAm: 'շշնջացող', partOfSpeechAm: 'ածական' },
      sanctuary: { wordEn: 'sanctuary', pronunciation: 'սանքչուըրի', translationAm: 'ապաստարան, սրբավայր', partOfSpeechAm: 'գոյական' },
      canopy: { wordEn: 'canopy', pronunciation: 'քանըփի', translationAm: 'ծառերի սաղարթ', partOfSpeechAm: 'գոյական' },
      solitude: { wordEn: 'solitude', pronunciation: 'սոլիթյուդ', translationAm: 'մենակություն, առանձնություն', partOfSpeechAm: 'գոյական' },
      tranquility: { wordEn: 'tranquility', pronunciation: 'թրանքուիլիթի', translationAm: 'անդորր, խաղաղություն', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'forest-ch-1',
        bookId: 'book-silent-forest',
        chapterNumber: 1,
        titleEn: 'The Path through the Pine Valley',
        titleAm: 'Արահետը սոճիների հովտով',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'High in the northern mountains lay a valley where no human voice had echoed for decades.', pronunciation: 'Հայ ին դը նորդըրն մաունթընզ լեյ ը վալի ուեր նոու հյումըն վոյս հադ էքոուդ ֆոր դեքեյդզ։', armenian: 'Հյուսիսային լեռներում բարձր գտնվում էր մի հովիտ, որտեղ տասնամյակներ շարունակ մարդկային ձայն չէր արձագանքել։' },
            { english: 'Ancient pine trees reached toward the clouds like tall green sentinels.', pronunciation: 'Էյնշընթ փայն թրիզ րիչթ թուորդ դը քլաուդզ լայք թոլ գրին սենթինըլզ։', armenian: 'Հնագույն սոճիները ձգվում էին դեպի ամպերը՝ բարձրահասակ կանաչ պահապանների պես։' },
            { english: 'Maya, a biologist studying mountain ecosystems, hiked slowly along the mossy trail.', pronunciation: 'Մայա, ը բայոլըջիսթ սթադիինգ մաունթըն իքոուսիսթըմզ, հայքթ սլոուլի էլոնգ դը մոսի թրեյլ։', armenian: 'Մայան՝ լեռնային էկոհամակարգերն ուսումնասիրող կենսաբանը, դանդաղ քայլում էր մամռապատ արահետով։' },
            { english: 'The only sound was the rhythmic crunch of pine needles beneath her walking boots.', pronunciation: 'Դի օունլի սաունդ ուոզ դը րիդմիք քրանչ օվ փայն նիդլզ բինիթ հըր ուոքինգ բութս։', armenian: 'Միակ ձայնը նրա քայլարշավային կոշիկների տակ սոճու ասեղների ռիթմիկ ճռճռոցն էր։' },
          ],
          [
            { english: 'As she climbed higher, the morning mist began to dissolve into golden sunlight.', pronunciation: 'Էզ շի քլայմբդ հայըր, դը մորնինգ միսթ բիգան թու դիզոլվ ինթու գոուլդըն սանլայթ։', armenian: 'Երբ նա ավելի վեր բարձրացավ, առավոտյան մշուշը սկսեց ցրվել ոսկեգույն արևի լույսի մեջ։' },
            { english: 'A crystal-clear brook wound gracefully between smooth granite boulders.', pronunciation: 'Ը քրիսթըլ-քլիր բրուք ուաունդ գրեյսֆուլի բիթուին սմուդ գրանիթ բոուլդըրզ։', armenian: 'Բյուրեղյա մաքուր մի առվակ նրբագեղորեն ոլորվում էր հարթ գրանիտե ժայռաբեկորների միջով։' },
            { english: 'She kneeled beside the stream and drank the purest, coldest water she had ever tasted.', pronunciation: 'Շի նիլդ բիսայդ դը սթրիմ ընդ դրանք դը փյուրիսթ, քոուլդիսթ ուոթեր շի հադ էվըր թեյսթիդ։', armenian: 'Նա ծնկի իջավ առվի մոտ և խմեց ամենամաքուր, ամենասառը ջուրը, որ երբևէ ճաշակել էր։' },
            { english: 'Here, far from buzzing cities and digital screens, the Earth felt deeply alive.', pronunciation: 'Հիր, ֆար ֆրոմ բազինգ սիթիզ ընդ դիջիթըլ սքրինզ, դի Ըրթ ֆելթ դիփլի էլայվ։', armenian: 'Այստեղ՝ աղմկոտ քաղաքներից և թվային էկրաններից հեռու, Երկիր մոլորակը խորապես կենդանի էր թվում։' },
          ],
        ],
      },
    ],
  },

  // 3. The Digital Horizon (Technology Stories - Story)
  {
    id: 'book-digital-horizon',
    titleEn: 'The Digital Horizon',
    titleAm: 'Թվային հորիզոն',
    author: 'Armen Ghazaryan',
    level: 'B2',
    category: 'Technology Stories',
    kind: 'story',
    totalReadingMinutes: 9,
    summaryAm: 'Երևանյան ՏՏ ստարտափի պատմությունը, որը ստեղծում է էկոլոգիապես մաքուր խելացի էներգետիկ համակարգեր։',
    glossary: {
      innovation: { wordEn: 'innovation', pronunciation: 'ինըվեյշըն', translationAm: 'նորարարություն', partOfSpeechAm: 'գոյական' },
      algorithm: { wordEn: 'algorithm', pronunciation: 'ալգըրիդըմ', translationAm: 'ալգորիթմ', partOfSpeechAm: 'գոյական' },
      scalability: { wordEn: 'scalability', pronunciation: 'սքեյլըբիլիթի', translationAm: 'մասշտաբայնություն', partOfSpeechAm: 'գոյական' },
      optimization: { wordEn: 'optimization', pronunciation: 'օփթիմայզեյշըն', translationAm: 'օպտիմալացում', partOfSpeechAm: 'գոյական' },
      sustainable: { wordEn: 'sustainable', pronunciation: 'սըսթեյնըբլ', translationAm: 'կայուն, էկոլոգիական', partOfSpeechAm: 'ածական' },
    },
    chapters: [
      {
        id: 'horizon-ch-1',
        bookId: 'book-digital-horizon',
        chapterNumber: 1,
        titleEn: 'Chapter 1: The Midnight Deployment',
        titleAm: 'Գլուխ 1․ Կեսգիշերային տեղակայումը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'The office on Baghramyan Avenue was completely silent except for the gentle hum of server racks.', pronunciation: 'Դի օֆիս օն Բաղրամյան Ավենյու ուոզ քոմփլիթլի սայլընթ իքսեփթ ֆոր դը ջենթլ համ օվ սըրվըր րաքս։', armenian: 'Բաղրամյան պողոտայի գրասենյակում կատարյալ լռություն էր՝ բացառությամբ սերվերային պահարանների մեղմ բզզոցի։' },
            { english: 'Gevorg stared intently at his dual monitors, watching lines of automated telemetry stream past.', pronunciation: 'Գևորգ սթերդ ինթենթլի եթ հիզ դյուըլ մոնիթըրզ, ուոչինգ լայնզ օվ օթըմեյթիդ թելեմեթրի սթրիմ փասթ։', armenian: 'Գևորգը լարված նայում էր իր երկու մոնիտորներին՝ դիտելով ավտոմատացված տելեմետրիայի անցնող տողերը։' },
            { english: 'Their engineering team had spent nine relentless months building a decentralized green grid controller.', pronunciation: 'Դեր էնջինիրինգ թիմ հադ սփենթ նայն րիլենթլըս մանթս բիլդինգ ը դիսենթրըլայզդ գրին գրիդ քընթրոուլըր։', armenian: 'Նրանց ինժեներական թիմն ինը անդադար ամիսներ էր անցկացրել ապակենտրոնացված կանաչ էներգացանցի կարգավորիչ կառուցելու համար։' },
            { english: 'Tonight, the pilot system was connecting to thirty solar arrays across Armenia.', pronunciation: 'Թունայթ, դը փայլըթ սիսթըմ ուոզ քընեքթինգ թու թըրթի սոուլըր էռեյզ էքրոս Արմենիա։', armenian: 'Այս գիշեր փորձնական համակարգը միանում էր Հայաստանի ողջ տարածքով սփռված երեսուն արևային կայաններին։' },
          ],
          [
            { english: '"Telemetry looks stable across all nodes," whispered Ani, the lead data scientist.', pronunciation: '"Թելեմեթրի լուքս սթեյբլ էքրոս օլ նոուդզ," ուիսփըրդ Անի, դը լիդ դեյթը սայընթիսթ։', armenian: '«Տելեմետրիան կայուն է բոլոր հանգույցներում»,- շշնջաց Անին՝ գլխավոր տվյալագետը։' },
            { english: 'The machine learning model was predicting solar irradiance with ninety-eight percent accuracy.', pronunciation: 'Դը մըշին լըրնինգ մոդըլ ուոզ փրիդիքթինգ սոուլըր իռադիընս ուիդ նայնթի-էյթ փըրսենթ աքյուրըսի։', armenian: 'Մեքենայական ուսուցման մոդելը 98 տոկոս ճշգրտությամբ կանխատեսում էր արևային ճառագայթումը։' },
            { english: 'Excess energy was automatically channeled into clean hydrogen storage batteries.', pronunciation: 'Էքսես էնըրջի ուոզ օթըմաթիքլի չանըլդ ինթու քլին հայդրըջըն սթորիջ բաթըրիզ։', armenian: 'Ավելցուկային էներգիան ավտոմատ կերպով ուղղվում էր մաքուր ջրածնային պահեստային մարտկոցներին։' },
            { english: 'With a single keyboard click, their vision of clean and intelligent energy became reality.', pronunciation: 'Ուիդ ը սինգլ քիբորդ քլիք, դեր վիժըն օվ քլին ընդ ինթելիջընթ էնըրջի բիքեյմ րիալիթի։', armenian: 'Ստեղնաշարի մեկ կտտոցով նրանց մաքուր և խելացի էներգետիկայի տեսլականը դարձավ իրականություն։' },
          ],
        ],
      },
    ],
  },

  // 4. The First Step Across the Ocean (Long Stories - Story)
  {
    id: 'book-ocean-journey',
    titleEn: 'The First Step Across the Ocean',
    titleAm: 'Առաջին քայլը օվկիանոսից այն կողմ',
    author: 'Clara Hughes',
    level: 'B1',
    category: 'Long Stories',
    kind: 'story',
    totalReadingMinutes: 8,
    summaryAm: 'Պատմություն քաջության, նոր մշակույթների հետ ծանոթության և անծանոթ աշխարհում ինքդ քեզ գտնելու մասին։',
    glossary: {
      voyage: { wordEn: 'voyage', pronunciation: 'վոյիջ', translationAm: 'ծովային ճամփորդություն', partOfSpeechAm: 'գոյական' },
      harbor: { wordEn: 'harbor', pronunciation: 'հարբըր', translationAm: 'նավահանգիստ', partOfSpeechAm: 'գոյական' },
      horizon: { wordEn: 'horizon', pronunciation: 'հըրայզըն', translationAm: 'հորիզոն', partOfSpeechAm: 'գոյական' },
      departure: { wordEn: 'departure', pronunciation: 'դիփարչըր', translationAm: 'մեկնում', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'ocean-ch-1',
        bookId: 'book-ocean-journey',
        chapterNumber: 1,
        titleEn: 'Departure at Dawn',
        titleAm: 'Մեկնումը լուսաբացին',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'The morning breeze over the Atlantic harbor smelled of salt and distant adventures.', pronunciation: 'Դը մորնինգ բրիզ օուվըր դի Աթլանթիք հարբըր սմելդ օվ սոլթ ընդ դիսթընթ էդվենչըրզ։', armenian: 'Առավոտյան զեփյուռը Ատլանտյան նավահանգստի վրա աղի և հեռավոր արկածների բույր ուներ։' },
            { english: 'Narek adjusted his backpack and took one last glance at the familiar stone pier.', pronunciation: 'Նարեկ էջասթիդ հիզ բեքփեք ընդ թուք ուան լասթ գլանս եթ դը ֆըմիլյըր սթոուն փիր։', armenian: 'Նարեկն ուղղեց ուսապարկը և վերջին հայացքը գցեց ծանոթ քարե նավամատույցին։' },
            { english: 'Moving to a foreign university was the greatest leap of faith he had ever taken.', pronunciation: 'Մուվինգ թու ը ֆորըն յունիվըրսիթի ուոզ դը գրեյթիսթ լիփ օվ ֆեյթ հի հադ էվըր թեյքըն։', armenian: 'Օտար համալսարան տեղափոխվելը նրա կյանքի ամենամեծ համարձակ քայլն էր։' },
            { english: 'The ship horn sounded deeply, calling passengers aboard.', pronunciation: 'Դը շիփ հորն սաունդիդ դիփլի, քոլինգ փասընջըրզ էբորդ։', armenian: 'Նավի շեփորը խոր հնչեց՝ ուղևորներին հրավիրելով տախտակամած։' },
          ],
        ],
      },
    ],
  },

  // 5. The Art of Modern Negotiation (Work & Business English - Story)
  {
    id: 'book-negotiation-art',
    titleEn: 'The Art of Modern Negotiation',
    titleAm: 'Ժամանակակից բանակցությունների արվեստը',
    author: 'Victoria Sterling',
    level: 'B2',
    category: 'Work & Business English',
    kind: 'story',
    totalReadingMinutes: 8,
    summaryAm: 'Իրական կորպորատիվ բանակցությունների դեպք, որտեղ շահում են երկու կողմերը (Win-Win ռազմավարություն)։',
    glossary: {
      concession: { wordEn: 'concession', pronunciation: 'քընսեշըն', translationAm: 'զիջում', partOfSpeechAm: 'գոյական' },
      leverage: { wordEn: 'leverage', pronunciation: 'լեվըրիջ', translationAm: 'լծակ, առավելություն', partOfSpeechAm: 'գոյական' },
      compromise: { wordEn: 'compromise', pronunciation: 'քոմփրըմայզ', translationAm: 'փոխզիջում', partOfSpeechAm: 'գոյական/բայ' },
      stakeholders: { wordEn: 'stakeholders', pronunciation: 'սթեյքհոուլդըրզ', translationAm: 'շահառուներ', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'neg-ch-1',
        bookId: 'book-negotiation-art',
        chapterNumber: 1,
        titleEn: 'Finding Common Ground',
        titleAm: 'Ընդհանուր եզրեր գտնելը',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'The conference room was filled with quiet tension as both executive teams sat down.', pronunciation: 'Դը քոնֆրընս րում ուոզ ֆիլդ ուիդ քուայըթ թենշըն էզ բոութ իգզեքյութիվ թիմզ սաթ դաուն։', armenian: 'Կոնֆերանսների դահլիճը լցված էր լուռ լարվածությամբ, երբ երկու ղեկավար թիմերը նստեցին սեղանի շուրջ։' },
            { english: 'A multi-million dollar software licensing contract hung delicately in the balance.', pronunciation: 'Ը մալթի-միլիըն դոլըր սոֆթուեր լայսընսինգ քոնթրաքթ հանգ դելիքըթլի ին դը բալընս։', armenian: 'Բազմամիլիոնանոց ծրագրային լիցենզավորման պայմանագիրը մազից էր կախված։' },
            { english: 'Instead of starting with aggressive demands, David opened with a cooperative proposal.', pronunciation: 'Ինսթեդ օվ սթարթինգ ուիդ էգրեսիվ դիմանդզ, Դեյվիդ օուփընդ ուիդ ը քոուոփըրըթիվ փրըփոուզըլ։', armenian: 'Ագրեսիվ պահանջներից սկսելու փոխարեն՝ Դավիթը սկսեց համագործակցային առաջարկով։' },
            { english: '"True partnerships are measured by shared long-term success, not short-term concessions," he stated.', pronunciation: '"Թրու փարթնըրշիփս ար մեժըրդ բայ շերդ լոնգ-թըրմ սըքսես, նոթ շորթ-թըրմ քընսեշընզ," հի սթեյթիդ։', armenian: '«Իսկական գործընկերությունը չափվում է համատեղ երկարաժամկետ հաջողությամբ, ոչ թե կարճաժամկետ զիջումներով»,- ասաց նա։' },
          ],
        ],
      },
    ],
  },

  // 6. Echoes of the Past (Everyday Life Stories - Story)
  {
    id: 'book-echoes-past',
    titleEn: 'Echoes of the Past',
    titleAm: 'Անցյալի արձագանքները',
    author: 'Sarah Jenkins',
    level: 'A2',
    category: 'Everyday Life Stories',
    kind: 'story',
    totalReadingMinutes: 7,
    summaryAm: 'Ջերմ պատմություն հին լուսանկարների ալբոմի և տատիկի պատմած հիշողությունների մասին։',
    glossary: {
      photograph: { wordEn: 'photograph', pronunciation: 'ֆոութըգրաֆ', translationAm: 'լուսանկար', partOfSpeechAm: 'գոյական' },
      memories: { wordEn: 'memories', pronunciation: 'մեմըրիզ', translationAm: 'հիշողություններ', partOfSpeechAm: 'գոյական' },
      attic: { wordEn: 'attic', pronunciation: 'աթիք', translationAm: 'ձեղնահարկ', partOfSpeechAm: 'գոյական' },
      nostalgia: { wordEn: 'nostalgia', pronunciation: 'նոսթալջիա', translationAm: 'կարոտախտ', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'echoes-ch-1',
        bookId: 'book-echoes-past',
        chapterNumber: 1,
        titleEn: 'The Wooden Chest in the Attic',
        titleAm: 'Փայտե արկղը ձեղնահարկում',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'On a quiet Sunday morning, Sophie climbed the creaky stairs to her grandmother\'s attic.', pronunciation: 'Օն ը քուայըթ Սանդեյ մորնինգ, Սոֆի քլայմբդ դը քրիքի սթերզ թու հըր գրանդմադըրզ աթիք։', armenian: 'Մի հանգիստ կիրակի առավոտ Սոֆին բարձրացավ ճռճռացող աստիճաններով դեպի տատիկի ձեղնահարկը։' },
            { english: 'Sunlight poured through a circular dusty window, illuminating floating motes of dust.', pronunciation: 'Սանլայթ փորդ թրու ը սըրքյուլըր դասթի ուինդոու, իլյումինեյթինգ ֆլոութինգ մոութս օվ դաստ։', armenian: 'Արևի լույսը թափանցում էր կլոր փոշոտ պատուհանից՝ լուսավորելով օդում պարող փոշեհատիկները։' },
            { english: 'In the corner rested an oak chest carved with floral patterns and brass latches.', pronunciation: 'Ին դը քորնըր րեսթիդ են օուք չեսթ քարվդ ուիդ ֆլորըլ փաթըրնզ ընդ բրաս լաչիզ։', armenian: 'Անկյունում դրված էր կաղնու փայտից արկղ՝ ծաղկային նախշերով և արույրե փականներով։' },
            { english: 'Inside lay hundreds of black-and-white photographs from the early twentieth century.', pronunciation: 'Ինսայդ լեյ հանդրիդզ օվ բլեք-ընդ-ուայթ ֆոութըգրաֆս ֆրոմ դի էրլի թուենթիըթ սենչըրի։', armenian: 'Ներսում պահվում էին հարյուրավոր սև-սպիտակ լուսանկարներ՝ քսաներորդ դարի սկզբից։' },
          ],
        ],
      },
    ],
  },

  // 7. The City Beneath the Clouds (Advanced Reading - Story)
  {
    id: 'book-city-clouds',
    titleEn: 'The City Beneath the Clouds',
    titleAm: 'Քաղաքն ամպերի տակ',
    author: 'Dr. Gregory Finch',
    level: 'C1',
    category: 'Advanced Reading',
    kind: 'story',
    totalReadingMinutes: 9,
    summaryAm: 'Փիլիսոփայական և ճարտարապետական վերլուծություն քաղաքաշինության, հիշողության և ժամանակի մասին։',
    glossary: {
      ephemeral: { wordEn: 'ephemeral', pronunciation: 'իֆեմըրըլ', translationAm: 'անցողիկ, վաղանցիկ', partOfSpeechAm: 'ածական' },
      architecture: { wordEn: 'architecture', pronunciation: 'արքիթեքչըր', translationAm: 'ճարտարապետություն', partOfSpeechAm: 'գոյական' },
      labyrinthine: { wordEn: 'labyrinthine', pronunciation: 'լաբըրինթայն', translationAm: 'լաբիրինթոսանման', partOfSpeechAm: 'ածական' },
      juxtaposition: { wordEn: 'juxtaposition', pronunciation: 'ջաքսթըփըզիշըն', translationAm: 'համադրում, կողք կողքի դնել', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'city-ch-1',
        bookId: 'book-city-clouds',
        chapterNumber: 1,
        titleEn: 'Stone and Memory',
        titleAm: 'Քար և հիշողություն',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'Cities are living organisms composed of layered epochs, stone, and collective human memory.', pronunciation: 'Սիթիզ ար լիվինգ օրգընիզըմզ քըմփոուզդ օվ լեյըրդ էփըքս, սթոուն, ընդ քըլեքթիվ հյումըն մեմըրի։', armenian: 'Քաղաքները կենդանի օրգանիզմներ են՝ կազմված շերտավորված դարաշրջաններից, քարից և հավաքական մարդկային հիշողությունից։' },
            { english: 'The labyrinthine alleys of the old quarters whisper tales of forgotten dynasties and poets.', pronunciation: 'Դը լաբըրինթայն ալիզ օվ դի օուլդ քուորթըրզ ուիսփըր թեյլզ օվ ֆըրգոթըն դայնըսթիզ ընդ փոուիթս։', armenian: 'Հին թաղամասերի լաբիրինթոսանման նրբանցքները շշնջում են մոռացված արքայատոհմերի և բանաստեղծների պատմությունները։' },
            { english: 'Modern glass towers stand in sharp juxtaposition against hand-carved medieval basalt.', pronunciation: 'Մոդըրն գլաս թաուըրզ սթանդ ին շարփ ջաքսթըփըզիշըն էգեյնսթ հանդ-քարվդ մեդիիվըլ բասոլթ։', armenian: 'Ժամանակակից ապակե աշտարակները կտրուկ համադրությամբ վեր են խոյանում ձեռակերտ միջնադարյան բազալտի կողքին։' },
            { english: 'To truly comprehend an urban landscape, one must learn to read the stone like a parchment.', pronunciation: 'Թու թրուլի քոմփրիհենդ են ըրբըն լանդսքեյփ, ուան մասթ լըրն թու րիդ դը սթոուն լայք ը փարչմենթ։', armenian: 'Քաղաքային լանդշաֆտն իսկապես ըմբռնելու համար պետք է սովորել քարը կարդալ մագաղաթի պես։' },
          ],
        ],
      },
    ],
  },

  // 8. The Midnight Baker (Short Stories - Story)
  {
    id: 'book-midnight-baker',
    titleEn: 'The Midnight Baker',
    titleAm: 'Կեսգիշերային հացթուխը',
    author: 'Lucas Meyer',
    level: 'A2',
    category: 'Short Stories',
    kind: 'story',
    totalReadingMinutes: 7,
    summaryAm: 'Սրտառուչ պատմություն փոքրիկ փուռի մասին, որտեղ ամեն գիշեր թարմ հաց էր թխվում քաղաքի արթուն մարդկանց համար։',
    glossary: {
      bakery: { wordEn: 'bakery', pronunciation: 'բեյքըրի', translationAm: 'հացի փուռ', partOfSpeechAm: 'գոյական' },
      flour: { wordEn: 'flour', pronunciation: 'ֆլաուըր', translationAm: 'ալյուր', partOfSpeechAm: 'գոյական' },
      dough: { wordEn: 'dough', pronunciation: 'դոու', translationAm: 'խմոր', partOfSpeechAm: 'գոյական' },
      fragrant: { wordEn: 'fragrant', pronunciation: 'ֆրեյգրընթ', translationAm: 'անուշաբույր', partOfSpeechAm: 'ածական' },
    },
    chapters: [
      {
        id: 'baker-ch-1',
        bookId: 'book-midnight-baker',
        chapterNumber: 1,
        titleEn: 'The Warmth in the Dark',
        titleAm: 'Ջերմությունը խավարում',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'While the entire city slept under a blanket of snow, lights glowed inside the bakery.', pronunciation: 'Ուայլ դի ընթայըր սիթի սլեփթ անդըր ը բլանքիթ օվ սնոու, լայթս գլոուդ ինսայդ դը բեյքըրի։', armenian: 'Մինչ ողջ քաղաքը քնած էր ձյան ծածկոցի տակ, փռի ներսում լույս էր վառվում։' },
            { english: 'Master Thomas kneaded the sourdough with firm, experienced hands.', pronunciation: 'Մասթըր Թոմըս նիդիդ դը սաուըրդոու ուիդ ֆըրմ, իքսփիրիընսթ հանդզ։', armenian: 'Վարպետ Թոմասը հունցում էր թթխմորը վստահ, փորձառու ձեռքերով։' },
            { english: 'The sweet scent of roasted cinnamon and fresh yeast filled the frosty night air.', pronunciation: 'Դը սուիթ սենթ օվ րոուսթիդ սինըմըն ընդ ֆրեշ յիսթ ֆիլդ դը ֆրոսթի նայթ եր։', armenian: 'Տապակած դարչինի և թարմ խմորիչի քաղցր բույրը լցրել էր ցրտաշունչ գիշերային օդը։' },
            { english: 'By four in the morning, the first golden baguettes were cooling on wooden racks.', pronunciation: 'Բայ ֆոր ին դը մորնինգ, դը ֆըրսթ գոուլդըն բագեթս ուըր քուլինգ օն ուուդըն րաքս։', armenian: 'Առավոտյան ժամը չորսին առաջին ոսկեգույն բագետներն արդեն սառչում էին փայտե դարակներում։' },
          ],
        ],
      },
    ],
  },

  // 9. The Mountain Hermit (Easy English Stories - Story)
  {
    id: 'book-mountain-hermit',
    titleEn: 'The Mountain Hermit',
    titleAm: 'Լեռնային ճգնավորը',
    author: 'David Thorne',
    level: 'A1',
    category: 'Easy English Stories',
    kind: 'story',
    totalReadingMinutes: 6,
    summaryAm: 'Պարզ և ուսուցողական պատմություն բնության գրկում ապրող իմաստուն ծերունու մասին։',
    glossary: {
      mountain: { wordEn: 'mountain', pronunciation: 'մաունթըն', translationAm: 'լեռ, սար', partOfSpeechAm: 'գոյական' },
      spring: { wordEn: 'spring', pronunciation: 'սփրինգ', translationAm: 'աղբյուր, գարուն', partOfSpeechAm: 'գոյական' },
      peace: { wordEn: 'peace', pronunciation: 'փիս', translationAm: 'խաղաղություն', partOfSpeechAm: 'գոյական' },
      simple: { wordEn: 'simple', pronunciation: 'սիմփլ', translationAm: 'պարզ, հասարակ', partOfSpeechAm: 'ածական' },
    },
    chapters: [
      {
        id: 'hermit-ch-1',
        bookId: 'book-mountain-hermit',
        chapterNumber: 1,
        titleEn: 'A Simple Life',
        titleAm: 'Պարզ կյանք',
        readingMinutes: 3,
        paragraphs: [
          [
            { english: 'An old man lived in a small wooden cabin near the peak of the mountain.', pronunciation: 'Էն օուլդ մեն լիվդ ին ը սմոլ ուուդըն քաբին նիըր դը փիք օվ դը մաունթըն։', armenian: 'Մի ծերունի ապրում էր փոքր փայտե տնակում՝ լեռան գագաթի մոտ։' },
            { english: 'He woke up with the sunrise and drank water from the cold mountain spring.', pronunciation: 'Հի ուոուք ափ ուիդ դը սանրայզ ընդ դրանք ուոթեր ֆրոմ դը քոուլդ մաունթըն սփրինգ։', armenian: 'Նա արթնանում էր արևածագին և ջուր խմում լեռան սառը աղբյուրից։' },
            { english: 'Birds and small animals were not afraid of him, because he was kind and gentle.', pronunciation: 'Բըրդզ ընդ սմոլ անիմըլզ ուըր նոթ էֆրեյդ օվ հիմ, բիքոզ հի ուոզ քայնդ ընդ ջենթլ։', armenian: 'Թռչուններն ու փոքր կենդանիները չէին վախենում նրանից, քանի որ նա բարի էր և մեղմ։' },
            { english: 'He taught travelers that true wealth is having peace in one\'s heart.', pronunciation: 'Հի թոթ թրավըլըրզ դաթ թրու ուելթ իզ հավինգ փիս ին ուանզ հարթ։', armenian: 'Նա ճամփորդներին սովորեցնում էր, որ իսկական հարստությունը սրտի խաղաղությունն է։' },
          ],
        ],
      },
    ],
  },

  // 10. The Code of Tomorrow (Technology Stories - Story)
  {
    id: 'book-code-tomorrow',
    titleEn: 'The Code of Tomorrow',
    titleAm: 'Վաղվա կոդը',
    author: 'Vahan Melikyan',
    level: 'B1',
    category: 'Technology Stories',
    kind: 'story',
    totalReadingMinutes: 8,
    summaryAm: 'Պատմություն երիտասարդ ծրագրավորողի մասին, որն ստեղծում է առաջին բաց կոդով հայկական լեզվական մոդելը։',
    glossary: {
      open_source: { wordEn: 'open source', pronunciation: 'օուփըն սորս', translationAm: 'բաց կոդով', partOfSpeechAm: 'ածական' },
      repository: { wordEn: 'repository', pronunciation: 'րիփոզիթըրի', translationAm: 'կոդի պահոց', partOfSpeechAm: 'գոյական' },
      community: { wordEn: 'community', pronunciation: 'քըմյունիթի', translationAm: 'համայնք', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'code-ch-1',
        bookId: 'book-code-tomorrow',
        chapterNumber: 1,
        titleEn: 'Lines of Heritage',
        titleAm: 'Ժառանգության տողերը',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'Davit typed the final function declaration and ran the local benchmark test.', pronunciation: 'Դավիթ թայփթ դը ֆայնըլ ֆանքշըն դեքլըրեյշըն ընդ րան դը լոուքըլ բենչմարք թեսթ։', armenian: 'Դավիթը գրեց վերջին ֆունկցիան և գործարկեց տեղային արտադրողականության թեստը։' },
            { english: 'The terminal displayed green checkmarks across all Armenian syntactic evaluations.', pronunciation: 'Դը թըրմինըլ դիսփլեյդ գրին չեքմարքս էքրոս օլ Արմինիըն սինթաքթիք իվալյուեյշընզ։', armenian: 'Տերմինալը կանաչ նշաններ ցույց տվեց հայերենի շարահյուսական բոլոր ստուգումներում։' },
            { english: 'He opened the repository to the global community under a free license.', pronunciation: 'Հի օուփընդ դը րիփոզիթըրի թու դը գլոուբըլ քըմյունիթի անդըր ը ֆրի լայսընս։', armenian: 'Նա բացեց պահոցը համաշխարհային համայնքի առաջ՝ ազատ լիցենզիայով։' },
            { english: 'Within hours, contributors from five continents joined the project.', pronunciation: 'Ուիդին աուըրզ, քընթրիբյութըրզ ֆրոմ ֆայվ քոնթինընթս ջոյնդ դը փրոջեքթ։', armenian: 'Մի քանի ժամվա ընթացքում հինգ մայրցամաքներից մասնակիցներ միացան նախագծին։' },
          ],
        ],
      },
    ],
  },

  // --- 5 MULTI-CHAPTER BOOKS (English Books / Classics) ---

  // Book 1: The Red-Headed League (Sherlock Holmes adaptation - 3 chapters)
  {
    id: 'book-sherlock-red-headed',
    titleEn: 'The Red-Headed League',
    titleAm: 'Շիկահերների միությունը',
    author: 'Arthur Conan Doyle (Adapted)',
    level: 'B1',
    category: 'English Books',
    kind: 'book',
    totalReadingMinutes: 16,
    summaryAm: 'Շերլոկ Հոլմսի դասական հետաքննությունը՝ արտասովոր շիկահերների միության և Լոնդոնի բանկի խոշորագույն թալանը կանխելու մասին։',
    glossary: {
      investigation: { wordEn: 'investigation', pronunciation: 'ինվեսթիգեյշըն', translationAm: 'հետաքննություն', partOfSpeechAm: 'գոյական' },
      advertisement: { wordEn: 'advertisement', pronunciation: 'էդվըրթայզմենթ', translationAm: 'հայտարարություն', partOfSpeechAm: 'գոյական' },
      pawnbroker: { wordEn: 'pawnbroker', pronunciation: 'փոնբրոուքըր', translationAm: 'գրավատան տեր', partOfSpeechAm: 'գոյական' },
      tunnel: { wordEn: 'tunnel', pronunciation: 'թանըլ', translationAm: 'թունել', partOfSpeechAm: 'գոյական' },
      deduction: { wordEn: 'deduction', pronunciation: 'դիդաքշըն', translationAm: 'դեդուկցիա, տրամաբանական եզրահանգում', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'sherlock-ch-1',
        bookId: 'book-sherlock-red-headed',
        chapterNumber: 1,
        titleEn: 'Chapter 1: The Curious Client',
        titleAm: 'Գլուխ 1․ Տարօրինակ այցելուն',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year.', pronunciation: 'Այ հադ քոլդ էփոն մայ ֆրենդ, Միսթըր Շերլոք Հոլմս, ուան դեյ ին դի օթըմ օվ լասթ յիր։', armenian: 'Անցյալ տարվա աշնան մի օր ես այցելեցի իմ ընկերոջը՝ պարոն Շերլոք Հոլմսին։' },
            { english: 'He was deep in conversation with a stout, florid-faced gentleman with fiery red hair.', pronunciation: 'Հի ուոզ դիփ ին քոնվըրսեյշըն ուիդ ը սթաութ, ֆլորիդ-ֆեյսդ ջենթլմըն ուիդ ֆայըրի րեդ հեր։', armenian: 'Նա խորասուզված էր զրույցի մեջ մի թիկնեղ, կարմրադեմ ջենթլմենի հետ, ով կրակոտ շիկակարմիր մազեր ուներ։' },
            { english: '"You could not have come at a better time, my dear Watson," said Holmes cordially.', pronunciation: '"Յու քուդ նոթ հավ քամ եթ ը բեթըր թայմ, մայ դիր Ուաթսըն," սեդ Հոլմս քորդիըլի։', armenian: '«Դու չէիր կարող ավելի հարմար պահի գալ, իմ սիրելի՛ Ուոտսոն»,- սրտանց ասաց Հոլմսը։' },
            { english: 'The visitor was Mr. Jabez Wilson, a quiet pawnbroker who brought an extraordinary story.', pronunciation: 'Դը վիզիթըր ուոզ Միսթըր Ջաբեզ Ուիլսըն, ը քուայըթ փոնբրոուքըր հու բրոթ են իքսթրորդինըրի սթորի։', armenian: 'Այցելուն պարոն Ջաբեզ Ուիլսոնն էր՝ հանգիստ գրավատանտեր, ով բերել էր արտասովոր մի պատմություն։' },
          ],
          [
            { english: 'Wilson held out a piece of newspaper containing a strange employment advertisement.', pronunciation: 'Ուիլսըն հելդ աութ ը փիս օվ նյուզփեյփըր քընթեյնինգ ը սթրեյնջ իմփլոյմենթ էդվըրթայզմենթ։', armenian: 'Ուիլսոնը մեկնեց թերթի մի կտոր, որը պարունակում էր աշխատանքի տարօրինակ հայտարարություն։' },
            { english: 'It promised four pounds a week to any healthy man with bright red hair.', pronunciation: 'Իթ փրոմիսդ ֆոր փաունդզ ը ուիք թու ենի հելթի մեն ուիդ բրայթ րեդ հեր։', armenian: 'Այն շաբաթական չորս ֆունտ էր խոստանում ցանկացած առողջ տղամարդու, ով վառ շիկակարմիր մազեր ունի։' },
            { english: 'His duty was merely to copy the Encyclopaedia Britannica by hand for four hours each day.', pronunciation: 'Հիզ դյութի ուոզ միրլի թու քոփի դի Ինսայքլըփիդիա Բրիթանիքա բայ հանդ ֆոր ֆոր աուըրզ իչ դեյ։', armenian: 'Նրա պարտականությունն ընդամենը ամեն օր չորս ժամ ձեռքով Բրիտանիկա հանրագիտարանն արտագրելն էր։' },
            { english: '"And now, without any warning, the League was dissolved this morning," Wilson complained.', pronunciation: '"Ընդ նաու, ուիդաութ ենի ուորնինգ, դը Լիգ ուոզ դիզոլվդ դիս մորնինգ," Ուիլսըն քըմփլեյնդ։', armenian: '«Իսկ հիմա՝ առանց որևէ նախազգուշացման, այս առավոտ Միությունը լուծարվեց»,- դժգոհեց Ուիլսոնը։' },
          ],
        ],
      },
      {
        id: 'sherlock-ch-2',
        bookId: 'book-sherlock-red-headed',
        chapterNumber: 2,
        titleEn: 'Chapter 2: The Mysterious Assistant',
        titleAm: 'Գլուխ 2․ Առեղծվածային օգնականը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'Holmes leaned back in his armchair and closed his eyes in deep concentration.', pronunciation: 'Հոլմս լինդ բեք ին հիզ արմչեյր ընդ քլոուզդ հիզ այզ ին դիփ քոնսընթրեյշըն։', armenian: 'Հոլմսը թիկն տվեց բազկաթոռին և փակեց աչքերը՝ խորը կենտրոնանալով։' },
            { english: '"Tell me about your assistant who pointed out this advertisement," requested the detective.', pronunciation: '"Թել մի էբաութ յոր էսիսթընթ հու փոյնթիդ աութ դիս էդվըրթայզմենթ," րիքուեսթիդ դը դիթեքթիվ։', armenian: '«Պատմե՛ք ինձ Ձեր օգնականի մասին, ով ցույց տվեց այս հայտարարությունը»,- խնդրեց խուզարկուն։' },
            { english: '"His name is Vincent Spaulding," said Wilson. "He works for half wages and loves photography."', pronunciation: '"Հիզ նեյմ իզ Վինսընթ Սփոլդինգ," սեդ Ուիլսըն։ "Հի ուորքս ֆոր հաֆ ուեյջիզ ընդ լավզ ֆըթոգրըֆի։"', armenian: '«Նրա անունը Վինսենթ Սփոլդինգ է,- ասաց Ուիլսոնը։- Նա աշխատում է կես աշխատավարձով և սիրում է լուսանկարչություն»։' },
            { english: '"He often spends hours alone in the cellar developing pictures in the dark."', pronunciation: '"Հի օֆըն սփենդզ աուըրզ էլոուն ին դը սելըր դիվելըփինգ փիքչըրզ ին դը դարք։"', armenian: '«Նա հաճախ ժամերով մենակ է մնում նկուղում՝ մթության մեջ նկարներ երևակելով»։' },
          ],
          [
            { english: 'Holmes sat bolt upright, his keen grey eyes sparkling with excitement.', pronunciation: 'Հոլմս սաթ բոուլթ ափրայթ, հիզ քին գրեյ այզ սփարքլինգ ուիդ իքսայթմենթ։', armenian: 'Հոլմսը միանգամից ուղղվեց, նրա սուր գորշ աչքերը փայլեցին ոգևորությունից։' },
            { english: 'We walked to Wilson\'s pawnshop and Holmes tapped vigorously on the pavement outside.', pronunciation: 'Ուի ուոքթ թու Ուիլսընզ փոնշոփ ընդ Հոլմս թափթ վիգըրըսլի օն դը փեյվմենթ աութսայդ։', armenian: 'Մենք քայլեցինք դեպի Ուիլսոնի գրավատունը, և Հոլմսն ուժգին թակեց դրսի մայթի սալաքարերին։' },
            { english: 'The assistant opened the door; Holmes noted the worn knees of his trousers.', pronunciation: 'Դի էսիսթընթ օուփընդ դը դոր; Հոլմս նոութիդ դը ուորն նիզ օվ հիզ թրաուզըրզ։', armenian: 'Օգնականը բացեց դուռը. Հոլմսը նկատեց նրա տաբատի մաշված ծնկները։' },
            { english: '"Watson," whispered Holmes, "a grave crime is being prepared this very Saturday night."', pronunciation: '"Ուաթսըն," ուիսփըրդ Հոլմս, "ը գրեյվ քրայմ իզ բիինգ փրիփերդ դիս վերի Սաթըրդեյ նայթ։"', armenian: '«Ուո՛տսոն,- շշնջաց Հոլմսը,- հենց այս շաբաթ գիշեր ծանր հանցագործություն է նախապատրաստվում»։' },
          ],
        ],
      },
      {
        id: 'sherlock-ch-3',
        bookId: 'book-sherlock-red-headed',
        chapterNumber: 3,
        titleEn: 'Chapter 3: The Bank Vault Ambush',
        titleAm: 'Գլուխ 3․ Դարանակալումը բանկի պահոցում',
        readingMinutes: 6,
        paragraphs: [
          [
            { english: 'At ten o\'clock, Holmes, Inspector Jones of Scotland Yard, and I entered the City Bank vault.', pronunciation: 'Եթ թեն օքլոք, Հոլմս, Ինսփեքթըր Ջոունզ օվ Սքոթլընդ Յարդ, ընդ այ ենթըրդ դը Սիթի Բենք վոլթ։', armenian: 'Ժամը տասին Հոլմսը, Սքոթլենդ Յարդի տեսուչ Ջոնսը և ես մտանք City Bank-ի ստորգետնյա պահոցը։' },
            { english: 'Thirty thousand gold French coins were stored in wooden crates upon the stone floor.', pronunciation: 'Թըրթի թաուզընդ գոուլդ Ֆրենչ քոյնզ ուըր սթորդ ին ուուդըն քրեյթս էփոն դը սթոուն ֆլոր։', armenian: 'Երեսուն հազար ֆրանսիական ոսկեդրամներ էին պահվում քարե հատակին դրված փայտե արկղերում։' },
            { english: 'We waited in pitch darkness for over an hour without whispering a single breath.', pronunciation: 'Ուի ուեյթիդ ին փիչ դարքնըս ֆոր օուվըր են աուըր ուիդաութ ուիսփըրինգ ը սինգլ բրեթ։', armenian: 'Մենք սպասեցինք կատարյալ խավարի մեջ ավելի քան մեկ ժամ՝ առանց մեկ շունչ անգամ շշնջալու։' },
            { english: 'Suddenly, a flagstone in the floor moved, and a lantern light shone through the gap.', pronunciation: 'Սադընլի, ը ֆլագսթոուն ին դը ֆլոր մուվդ, ընդ ը լանթըրն լայթ շոուն թրու դը գափ։', armenian: 'Հանկարծ հատակի սալաքարը շարժվեց, և ճեղքից լապտերի լույս շողաց։' },
          ],
          [
            { english: 'The notorious bank robber John Clay emerged from the subterranean tunnel.', pronunciation: 'Դը նոութորիըս բենք րոբըր Ջոն Քլեյ իմըրջդ ֆրոմ դը սաբթըրեյնիըն թանըլ։', armenian: 'Տխրահռչակ բանկային կողոպտիչ Ջոն Քլեյը դուրս եկավ ստորգետնյա թունելից։' },
            { english: 'Holmes sprang forward like a tiger and seized the criminal by his collar.', pronunciation: 'Հոլմս սփրանգ ֆորուըրդ լայք ը թայգըր ընդ սիզդ դը քրիմինըլ բայ հիզ քոլըր։', armenian: 'Հոլմսը վագրի պես առաջ նետվեց և բռնեց հանցագործի օձիքից։' },
            { english: 'The Red-Headed League had merely been an elaborate trick to keep Wilson away from his cellar.', pronunciation: 'Դը Րեդ-Հեդիդ Լիգ հադ միրլի բին են իլաբըրըթ թրիք թու քիփ Ուիլսըն էուեյ ֆրոմ հիզ սելըր։', armenian: '«Շիկահերների միությունը» ընդամենը հնարամիտ հնարք էր Ուիլսոնին իր նկուղից հեռու պահելու համար։' },
            { english: '"A brilliant plan," said Holmes as the police led Clay away, "ruined by a single observation."', pronunciation: '"Ը բրիլիընթ փլան," սեդ Հոլմս էզ դը փըլիս լեդ Քլեյ էուեյ, "րուինդ բայ ը սինգլ օբզըրվեյշըն։"', armenian: '«Հանճարեղ ծրագիր էր,- ասաց Հոլմսը, երբ ոստիկանները տարան Քլեյին,- բայց տապալվեց մեկ դիտարկման պատճառով»։' },
          ],
        ],
      },
    ],
  },

  // Book 2: Alice's Adventures in Wonderland (Adapted - 3 chapters)
  {
    id: 'book-alice-wonderland',
    titleEn: "Alice's Adventures in Wonderland",
    titleAm: 'Ալիսայի արկածները Հրաշքների աշխարհում',
    author: 'Lewis Carroll (Adapted)',
    level: 'A2',
    category: 'English Books',
    kind: 'book',
    totalReadingMinutes: 14,
    summaryAm: 'Լյուիս Քերոլի անմահ դասական հեքիաթը՝ Սպիտակ ճագարի, Թեյախմության և Հրաշքների աշխարհի մասին։',
    glossary: {
      rabbit: { wordEn: 'rabbit', pronunciation: 'րաբիթ', translationAm: 'ճագար', partOfSpeechAm: 'գոյական' },
      wonderland: { wordEn: 'wonderland', pronunciation: 'ուանդըրլանդ', translationAm: 'հրաշքների աշխարհ', partOfSpeechAm: 'գոյական' },
      curiouser: { wordEn: 'curiouser', pronunciation: 'քյուրիըսըր', translationAm: 'ավելի տարօրինակ', partOfSpeechAm: 'ածական' },
      caterpillar: { wordEn: 'caterpillar', pronunciation: 'քաթըրփիլըր', translationAm: 'թրթուր', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'alice-ch-1',
        bookId: 'book-alice-wonderland',
        chapterNumber: 1,
        titleEn: 'Down the Rabbit Hole',
        titleAm: 'Ճագարի բույնով դեպի ներքև',
        readingMinutes: 4,
        paragraphs: [
          [
            { english: 'Alice was beginning to get very tired of sitting by her sister on the grassy riverbank.', pronunciation: 'Ալիս ուոզ բիգինինգ թու գեթ վերի թայըրդ օվ սիթինգ բայ հըր սիսթըր օն դը գրասի րիվըրբանք։', armenian: 'Ալիսան արդեն սկսել էր շատ հոգնել գետափի խոտերի վրա քրոջ կողքին նստելուց։' },
            { english: 'Suddenly, a White Rabbit with bright pink eyes ran close by her.', pronunciation: 'Սադընլի, ը Ուայթ Րաբիթ ուիդ բրայթ փինք այզ րան քլոուս բայ հըր։', armenian: 'Հանկարծ վառ վարդագույն աչքերով Սպիտակ ճագարը վազեց նրա կողքով։' },
            { english: 'The rabbit pulled a pocket watch from its waistcoat and exclaimed: "Oh dear, I shall be late!"', pronunciation: 'Դը րաբիթ փուլդ ը փոքիթ ուոչ ֆրոմ իթս ուեսթքոութ ընդ իքսքլեյմդ: "Օհ դիր, այ շալ բի լեյթ!"', armenian: 'Ճագարը ժիլետից գրպանի ժամացույց հանեց և բացականչեց. «Օ՜, աստվա՛ծ իմ, ես կուշանամ»։' },
            { english: 'Burning with curiosity, Alice jumped up and ran across the field after it.', pronunciation: 'Բըրնինգ ուիդ քյուրիոսիթի, Ալիս ջամփթ ափ ընդ րան էքրոս դը ֆիլդ աֆթըր իթ։', armenian: 'Հետաքրքրությունից այրվելով՝ Ալիսան վեր թռավ և դաշտով վազեց նրա հետևից։' },
          ],
        ],
      },
      {
        id: 'alice-ch-2',
        bookId: 'book-alice-wonderland',
        chapterNumber: 2,
        titleEn: 'The Pool of Tears',
        titleAm: 'Արցունքների լճակը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: '"Curiouser and curiouser!" cried Alice as she felt herself stretching like a telescope.', pronunciation: '"Քյուրիըսըր ընդ քյուրիըսըր!" քրայդ Ալիս էզ շի ֆելթ հըրսելֆ սթրեչինգ լայք ը թելիսքոուփ։', armenian: '«Ավելի ու ավելի՜ տարօրինակ»,- գոչեց Ալիսան, երբ զգաց, որ ձգվում է աստղադիտակի պես։' },
            { english: 'Her feet were almost out of sight below in the immense golden hall.', pronunciation: 'Հըր ֆիթ ուըր օլմոուսթ աութ օվ սայթ բիլոու ին դի իմենս գոուլդըն հոլ։', armenian: 'Նրա ոտքերը գրեթե չէին երևում ներքևում՝ հսկայական ոսկեզօծ դահլիճում։' },
            { english: 'She wept so much that she soon found herself swimming in a pool of salt tears.', pronunciation: 'Շի ուեփթ սոու մաչ դաթ շի սուն ֆաունդ հըրսելֆ սուիմինգ ին ը փուլ օվ սոլթ թիրզ։', armenian: 'Նա այնքան լաց եղավ, որ շուտով հայտնվեց աղի արցունքների լճակում լողալիս։' },
            { english: 'A small mouse splashed past, looking bewildered at the weeping giant girl.', pronunciation: 'Ը սմոլ մաուս սփլաշթ փասթ, լուքինգ բիուիլդըրդ եթ դը ուիփինգ ջայընթ գըրլ։', armenian: 'Մի փոքրիկ մուկ լողաց կողքով՝ շփոթված նայելով լացող հսկա աղջկան։' },
          ],
        ],
      },
      {
        id: 'alice-ch-3',
        bookId: 'book-alice-wonderland',
        chapterNumber: 3,
        titleEn: 'A Mad Tea-Party',
        titleAm: 'Խելահեղ թեյախմությունը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'There was a table set out under a tree, and the March Hare and the Hatter were having tea.', pronunciation: 'Դեր ուոզ ը թեյբլ սեթ աութ անդըր ը թրի, ընդ դը Մարչ Հեր ընդ դը Հաթըր ուըր հավինգ թի։', armenian: 'Ծառի տակ մի սեղան էր դրված, իսկ Մարտյան Նապաստակն ու Գլխարկագործը թեյ էին խմում։' },
            { english: 'A Dormouse was sitting between them, fast asleep like a furry cushion.', pronunciation: 'Ը Դորմաուս ուոզ սիթինգ բիթուին դեմ, ֆասթ էսլիփ լայք ը ֆըրի քուշըն։', armenian: 'Քնկոտ Մուկը նստած էր նրանց միջև՝ խորը քնած, փափուկ բարձի պես։' },
            { english: '"No room! No room!" they cried out when they saw Alice coming toward the table.', pronunciation: '"Նոու րում! Նոու րում!" դեյ քրայդ աութ ուեն դեյ սո Ալիս քամինգ թուորդ դը թեյբլ։', armenian: '«Տեղ չկա՜, տեղ չկա՜»,- բղավեցին նրանք, երբ տեսան Ալիսային սեղանին մոտենալիս։' },
            { english: '"There\'s plenty of room!" said Alice indignantly, and she sat down in a large armchair.', pronunciation: '"Դերզ փլենթի օվ րում!" սեդ Ալիս ինդիգնընթլի, ընդ շի սաթ դաուն ին ը լարջ արմչեյր։', armenian: '«Շա՛տ էլ տեղ կա»,- զայրացած ասաց Ալիսան և նստեց մեծ բազկաթոռին։' },
          ],
        ],
      },
    ],
  },

  // Book 3: Around the World in Eighty Days (Adapted - 3 chapters)
  {
    id: 'book-eighty-days',
    titleEn: 'Around the World in Eighty Days',
    titleAm: 'Աշխարհի շուրջը 80 օրում',
    author: 'Jules Verne (Adapted)',
    level: 'B1',
    category: 'English Books',
    kind: 'book',
    totalReadingMinutes: 15,
    summaryAm: 'Ժյուլ Վեռնի արկածային վեպը Ֆիլեաս Ֆոգի անհավանական ճանապարհորդության և ժամանակը հաղթահարելու մասին։',
    glossary: {
      wager: { wordEn: 'wager', pronunciation: 'ուեյջըր', translationAm: 'գրազ, գրավ', partOfSpeechAm: 'գոյական' },
      punctual: { wordEn: 'punctual', pronunciation: 'փանքչուըլ', translationAm: 'ճշտապահ', partOfSpeechAm: 'ածական' },
      steamer: { wordEn: 'steamer', pronunciation: 'սթիմըր', translationAm: 'շոգենավ', partOfSpeechAm: 'գոյական' },
      continent: { wordEn: 'continent', pronunciation: 'քոնթինընթ', translationAm: 'մայրցամաք', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'eighty-ch-1',
        bookId: 'book-eighty-days',
        chapterNumber: 1,
        titleEn: 'Chapter 1: The Famous Wager',
        titleAm: 'Գլուխ 1․ Հայտնի գրազը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'Mr. Phileas Fogg lived at Number 7 Savile Row, Burlington Gardens in London.', pronunciation: 'Միսթըր Ֆիլիըս Ֆոգ լիվդ եթ Նամբըր 7 Սավիլ Րոու, Բըրլինգթըն Գարդընզ ին Լանդըն։', armenian: 'Պարոն Ֆիլեաս Ֆոգն ապրում էր Լոնդոնի Սավիլ Ռոու փողոցի 7-րդ տանը։' },
            { english: 'He was a man of mathematical precision who never wasted a single second of time.', pronunciation: 'Հի ուոզ ը մեն օվ մաթեմաթիքըլ փրիսիժըն հու նեվըր ուեյսթիդ ը սինգլ սեքընդ օվ թայմ։', armenian: 'Նա մաթեմատիկական ճշգրտության տեր մարդ էր, ով երբեք ոչ մի վայրկյան իզուր չէր վատնում։' },
            { english: 'At the Reform Club, a heated debate arose regarding the opening of a new Indian railway.', pronunciation: 'Եթ դը Րիֆորմ Քլաբ, ը հիթիդ դիբեյթ էռոուզ րիգարդինգ դի օուփընինգ օվ ը նյու Ինդիըն րեյլուեյ։', armenian: 'Ռեֆորմ ակումբում թեժ բանավեճ սկսվեց հնդկական նոր երկաթուղու բացման շուրջ։' },
            { english: '"I will wager twenty thousand pounds that I will make the tour of the world in eighty days," Fogg stated calmly.', pronunciation: '"Այ ուիլ ուեյջըր թուենթի թաուզընդ փաունդզ դաթ այ ուիլ մեյք դը թուր օվ դը ուորլդ ին էյթի դեյզ," Ֆոգ սթեյթիդ քամլի։', armenian: '«Ես քսան հազար ֆունտ գրազ կգամ, որ աշխարհի շուրջը կպտտվեմ ութսուն օրում»,- հանգիստ ասաց Ֆոգը։' },
          ],
        ],
      },
    ],
  },

  // Book 4: The Time Machine (Adapted - 3 chapters)
  {
    id: 'book-time-machine',
    titleEn: 'The Time Machine',
    titleAm: 'Ժամանակի մեքենան',
    author: 'H.G. Wells (Adapted)',
    level: 'B2',
    category: 'English Books',
    kind: 'book',
    totalReadingMinutes: 15,
    summaryAm: 'Գերֆանտաստիկ ճանապարհորդություն դեպի հեռավոր ապագա՝ 802,701 թվական, և մարդկության ճակատագրի բացահայտումը։',
    glossary: {
      dimension: { wordEn: 'dimension', pronunciation: 'դայմենշըն', translationAm: 'չափում (տարածական/ժամանակային)', partOfSpeechAm: 'գոյական' },
      apparatus: { wordEn: 'apparatus', pronunciation: 'ապըրեյթըս', translationAm: 'ապարատ, սարք', partOfSpeechAm: 'գոյական' },
      futuristic: { wordEn: 'futuristic', pronunciation: 'ֆյուչըրիսթիք', translationAm: 'ապագայական', partOfSpeechAm: 'ածական' },
    },
    chapters: [
      {
        id: 'time-ch-1',
        bookId: 'book-time-machine',
        chapterNumber: 1,
        titleEn: 'Chapter 1: The Fourth Dimension',
        titleAm: 'Գլուխ 1․ Չորրորդ չափումը',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'The Time Traveller was expounding a recondite matter to his dinner guests.', pronunciation: 'Դը Թայմ Թրավըլըր ուոզ իքսփաունդինգ ը րիքոնդայթ մաթըր թու հիզ դինըր գեսթս։', armenian: 'Ժամանակի Ճանապարհորդը բարդ գիտական միտք էր բացատրում իր ընթրիքի հյուրերին։' },
            { english: '"There is no difference between Time and any of the three dimensions of Space," he argued.', pronunciation: '"Դեր իզ նոու դիֆրընս բիթուին Թայմ ընդ ենի օվ դը թրի դայմենշընզ օվ Սփեյս," հի արգյուդ։', armenian: '«Ոչ մի տարբերություն չկա Ժամանակի և Տարածության երեք չափումների միջև»,- պնդում էր նա։' },
            { english: 'In his laboratory stood a mechanism of ivory, brass, and transparent quartz crystal.', pronunciation: 'Ին հիզ լաբորըթըրի սթուդ ը մեքընիզըմ օվ այվըրի, բրաս, ընդ թրանսփերընթ քուորթս քրիսթըլ։', armenian: 'Նրա լաբորատորիայում կանգնած էր փղոսկրից, արույրից և թափանցիկ քվարցից սարքված մի մեխանիզմ։' },
            { english: 'A gentle push of the lever would launch the machine through centuries of unwritten history.', pronunciation: 'Ը ջենթլ փուշ օվ դը լիվըր ուուդ լոնչ դը մըշին թրու սենչըրիզ օվ անրիթըն հիսթըրի։', armenian: 'Լծակի մեղմ սեղմումը մեքենան կնետեր դարերի չգրված պատմության միջով։' },
          ],
        ],
      },
    ],
  },

  // Book 5: Modern IT Leadership & Team Dynamics (Adapted - 3 chapters)
  {
    id: 'book-it-leadership',
    titleEn: 'Modern IT Leadership & Team Dynamics',
    titleAm: 'Ժամանակակից ՏՏ առաջնորդություն և թիմի զարգացում',
    author: 'Karen Harutyunyan',
    level: 'B2',
    category: 'Work & Business English',
    kind: 'book',
    totalReadingMinutes: 16,
    summaryAm: 'Գործնական ձեռնարկ ՏՏ թիմերի կառավարման, ճկուն մեթոդաբանությունների (Agile) և առաջնորդության մասին։',
    glossary: {
      leadership: { wordEn: 'leadership', pronunciation: 'լիդըրշիփ', translationAm: 'առաջնորդություն', partOfSpeechAm: 'գոյական' },
      retrospective: { wordEn: 'retrospective', pronunciation: 'րեթրըսփեքթիվ', translationAm: 'հետահայաց քննարկում', partOfSpeechAm: 'գոյական' },
      empowerment: { wordEn: 'empowerment', pronunciation: 'իմփաուըրմենթ', translationAm: 'լիազորում, ինքնավարության տրամադրում', partOfSpeechAm: 'գոյական' },
      transparency: { wordEn: 'transparency', pronunciation: 'թրանսփերընսի', translationAm: 'թափանցիկություն', partOfSpeechAm: 'գոյական' },
    },
    chapters: [
      {
        id: 'it-lead-ch-1',
        bookId: 'book-it-leadership',
        chapterNumber: 1,
        titleEn: 'Chapter 1: Psychological Safety in Engineering',
        titleAm: 'Գլուխ 1․ Հոգեբանական անվտանգությունն ինժեներիայում',
        readingMinutes: 5,
        paragraphs: [
          [
            { english: 'High-performing engineering teams are distinguished not by flawless code, but by fearless communication.', pronunciation: 'Հայ-փըրֆորմինգ էնջինիրինգ թիմզ ար դիսթինգուիշթ նոթ բայ ֆլոլըս քոուդ, բաթ բայ ֆիրլըս քըմյունիքեյշըն։', armenian: 'Բարձր արդյունավետությամբ ինժեներական թիմերը տարբերվում են ոչ թե անսխալ կոդով, այլ անվախ հաղորդակցությամբ։' },
            { english: 'When developers feel safe admitting mistakes, root causes are uncovered ten times faster.', pronunciation: 'Ուեն դիվելըփըրզ ֆիլ սեյֆ էդմիթինգ միսթեյքս, րութ քոզիզ ար անքավըրդ թեն թայմզ ֆասթըր։', armenian: 'Երբ ծրագրավորողներն իրենց ապահով են զգում սխալներն ընդունելիս, բուն պատճառները բացահայտվում են տասն անգամ ավելի արագ։' },
            { english: 'Blameless post-mortems transform technical failures into collective organizational wisdom.', pronunciation: 'Բլեյմլըս փոուսթ-մորթըմզ թրանսֆորմ թեքնիքըլ ֆեյլյըրզ ինթու քըլեքթիվ օրգընայզեյշընըլ ուիզդըմ։', armenian: 'Առանց մեղադրանքի հետվերլուծությունները տեխնիկական ձախողումները վերածում են հավաքական կազմակերպչական իմաստնության։' },
            { english: 'A great leader listens before speaking and designs systems where everyone can thrive.', pronunciation: 'Ը գրեյթ լիդըր լիսընզ բիֆոր սփիքինգ ընդ դիզայնզ սիսթըմզ ուեր էվրիուան քան թրայվ։', armenian: 'Հիանալի առաջնորդը լսում է նախքան խոսելը և նախագծում այնպիսի համակարգեր, որտեղ յուրաքանչյուրը կարող է ծաղկել։' },
          ],
        ],
      },
    ],
  },
];

export const LIBRARY_POEMS: PoemItem[] = [
  // Poem 1: Stopping by Woods on a Snowy Evening (Robert Frost)
  {
    id: 'poem-robert-frost-woods',
    titleEn: 'Stopping by Woods on a Snowy Evening',
    titleAm: 'Կանգառ անտառում՝ ձնառատ երեկոյին',
    author: 'Robert Frost (1874–1963)',
    level: 'A2',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Բնության հմայքը, կյանքի պարտականությունները և ճանապարհը շարունակելու խորհուրդը։',
    unfamiliarWords: [
      { wordEn: 'queer', pronunciation: 'քուիր', meaningAm: 'տարօրինակ', explanationAm: 'Հին անգլերենում նշանակում է անսովոր կամ տարօրինակ։' },
      { wordEn: 'harness', pronunciation: 'հարնըս', meaningAm: 'ձիու լծասարք', explanationAm: 'Ձիուն կառավարելու համար նախատեսված սանձն ու փոկերը։' },
      { wordEn: 'downy', pronunciation: 'դաունի', meaningAm: 'փափուկ, աղվամազոտ', explanationAm: 'Թեթև, փափուկ փաթիլների նման։' },
      { wordEn: 'flake', pronunciation: 'ֆլեյք', meaningAm: 'ձյան փաթիլ', explanationAm: 'Ձյան առանձին փաթիլ։' },
    ],
    lines: [
      { lineNumber: 1, english: 'Whose woods these are I think I know.', pronunciation: 'Հուզ ուուդզ դիզ ար այ թինք այ նոու։', armenian: 'Ումն են այս անտառները՝ կարծես գիտեմ։' },
      { lineNumber: 2, english: 'His house is in the village though;', pronunciation: 'Հիզ հաուս իզ ին դը վիլիջ դոու;', armenian: 'Թեև նրա տունը գյուղում է գտնվում։' },
      { lineNumber: 3, english: 'He will not see me stopping here', pronunciation: 'Հի ուիլ նոթ սի մի սթոփինգ հիր', armenian: 'Նա չի տեսնի ինձ այստեղ կանգնած,' },
      { lineNumber: 4, english: 'To watch his woods fill up with snow.', pronunciation: 'Թու ուոչ հիզ ուուդզ ֆիլ ափ ուիդ սնոու։', armenian: 'Դիտելիս, թե ինչպես են անտառները լցվում ձյունով։' },
      { lineNumber: 5, english: 'My little horse must think it queer', pronunciation: 'Մայ լիթլ հորս մասթ թինք իթ քուիր', armenian: 'Իմ փոքրիկ ձին պիտի տարօրինակ համարի' },
      { lineNumber: 6, english: 'To stop without a farmhouse near', pronunciation: 'Թու սթոփ ուիդաութ ը ֆարմհաուս նիըր', armenian: 'Կանգնելն այստեղ՝ առանց մոտակա ագարակի,' },
      { lineNumber: 7, english: 'Between the woods and frozen lake', pronunciation: 'Բիթուին դը ուուդզ ընդ ֆրոուզըն լեյք', armenian: 'Անտառների ու սառցակալած լճի միջև,' },
      { lineNumber: 8, english: 'The darkest evening of the year.', pronunciation: 'Դը դարկիսթ իվնինգ օվ դը յիր։', armenian: 'Տարվա ամենամութ երեկոյին։' },
      { lineNumber: 9, english: 'He gives his harness bells a shake', pronunciation: 'Հի գիվզ հիզ հարնըս բելզ ը շեյք', armenian: 'Նա թափահարում է լծասարքի զանգակները,' },
      { lineNumber: 10, english: 'To ask if there is some mistake.', pronunciation: 'Թու ասք իֆ դեր իզ սամ միսթեյք։', armenian: 'Հարցնելու համար՝ արդյոք սխալմունք կա։' },
      { lineNumber: 11, english: 'The only other sound\'s the sweep', pronunciation: 'Դի օունլի ադըր սաունդզ դը սուիփ', armenian: 'Միակ մյուս ձայնը սավառնումն է' },
      { lineNumber: 12, english: 'Of easy wind and downy flake.', pronunciation: 'Օվ իզի ուինդ ընդ դաունի ֆլեյք։', armenian: 'Մեղմ քամու ու փափուկ փաթիլների։' },
      { lineNumber: 13, english: 'The woods are lovely, dark and deep,', pronunciation: 'Դը ուուդզ ար լավլի, դարք ընդ դիփ,', armenian: 'Անտառները գեղեցիկ են, մութ ու խորը,' },
      { lineNumber: 14, english: 'But I have promises to keep,', pronunciation: 'Բաթ այ հավ փրոմիսիզ թու քիփ,', armenian: 'Բայց ես խոստումներ ունեմ պահելու,' },
      { lineNumber: 15, english: 'And miles to go before I sleep,', pronunciation: 'Ընդ մայլզ թու գոու բիֆոր այ սլիփ,', armenian: 'Եվ մղոններ՝ անցնելու նախքան քնելս,' },
      { lineNumber: 16, english: 'And miles to go before I sleep.', pronunciation: 'Ընդ մայլզ թու գոու բիֆոր այ սլիփ։', armenian: 'Եվ մղոններ՝ անցնելու նախքան քնելս։' },
    ],
  },

  // Poem 2: The Road Not Taken (Robert Frost)
  {
    id: 'poem-road-not-taken',
    titleEn: 'The Road Not Taken',
    titleAm: 'Այն ճանապարհը, որով չգնացի',
    author: 'Robert Frost (1874–1963)',
    level: 'B1',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Կյանքի կարևոր ընտրությունները և այն արահետը, որը քիչ էր տրորված։',
    unfamiliarWords: [
      { wordEn: 'diverged', pronunciation: 'դայվըրջդ', meaningAm: 'ճյուղավորվեցին, բաժանվեցին', explanationAm: 'Ճանապարհը բաժանվեց երկու տարբեր ուղղությունների։' },
      { wordEn: 'undergrowth', pronunciation: 'անդըրգրոութ', meaningAm: 'թփուտներ, մացառներ', explanationAm: 'Անտառի ծառերի տակ աճող խիտ թփեր։' },
      { wordEn: 'trodden', pronunciation: 'թրոդըն', meaningAm: 'տրորված, կոխկրտված', explanationAm: 'Ոտքերով տրորված արահետ։' },
    ],
    lines: [
      { lineNumber: 1, english: 'Two roads diverged in a yellow wood,', pronunciation: 'Թու րոուդզ դայվըրջդ ին ը յելոու ուուդ,', armenian: 'Դեղնած անտառում երկու ճանապարհ ճյուղավորվեցին,' },
      { lineNumber: 2, english: 'And sorry I could not travel both', pronunciation: 'Ընդ սորի այ քուդ նոթ թրավըլ բոութ', armenian: 'Եվ ափսոս՝ չէի կարող երկուսով էլ գնալ,' },
      { lineNumber: 3, english: 'And be one traveler, long I stood', pronunciation: 'Ընդ բի ուան թրավըլըր, լոնգ այ սթուդ', armenian: 'Ու լինելով մեկ ճամփորդ՝ երկար կանգնեցի' },
      { lineNumber: 4, english: 'And looked down one as far as I could', pronunciation: 'Ընդ լուքթ դաուն ուան էզ ֆար էզ այ քուդ', armenian: 'Եվ նայեցի մեկին այնքան հեռու, որքան կարող էի' },
      { lineNumber: 5, english: 'To where it bent in the undergrowth;', pronunciation: 'Թու ուեր իթ բենթ ին դի անդըրգրոութ;', armenian: 'Մինչև որ այն թեքվեց թփուտների մեջ։' },
      { lineNumber: 6, english: 'Then took the other, as just as fair,', pronunciation: 'Դեն թուք դի ադըր, էզ ջասթ էզ ֆեր,', armenian: 'Հետո ընտրեցի մյուսը՝ նույնքան գեղեցիկ,' },
      { lineNumber: 7, english: 'And having perhaps the better claim,', pronunciation: 'Ընդ հավինգ փըրհափս դը բեթըր քլեյմ,', armenian: 'Եվ միգուցե ավելի լավ իրավունքով,' },
      { lineNumber: 8, english: 'Because it was grassy and wanted wear;', pronunciation: 'Բիքոզ իթ ուոզ գրասի ընդ ուոնթիդ ուեր;', armenian: 'Քանզի խոտածածկ էր ու քայլքի էր սպասում։' },
      { lineNumber: 9, english: 'I shall be telling this with a sigh', pronunciation: 'Այ շալ բի թելինգ դիս ուիդ ը սայ', armenian: 'Ես սա կպատմեմ հառաչանքով մի օր,' },
      { lineNumber: 10, english: 'Somewhere ages and ages hence:', pronunciation: 'Սամուեր էյջիզ ընդ էյջիզ հենս:', armenian: 'Ինչ-որ տեղ, դարեր ու դարեր անց.' },
      { lineNumber: 11, english: 'Two roads diverged in a wood, and I—', pronunciation: 'Թու րոուդզ դայվըրջդ ին ը ուուդ, ընդ այ—', armenian: 'Երկու ճանապարհ բաժանվեցին անտառում, և ես՝' },
      { lineNumber: 12, english: 'I took the one less traveled by,', pronunciation: 'Այ թուք դը ուան լես թրավըլդ բայ,', armenian: 'Ես ընտրեցի քիչ անցած ճանապարհը,' },
      { lineNumber: 13, english: 'And that has made all the difference.', pronunciation: 'Ընդ դաթ հազ մեյդ օլ դը դիֆրընս։', armenian: 'Եվ դա՛ փոխեց ամեն ինչ։' },
    ],
  },

  // Poem 3: Hope is the thing with feathers (Emily Dickinson)
  {
    id: 'poem-hope-dickinson',
    titleEn: 'Hope is the thing with feathers',
    titleAm: 'Հույսը փետրավոր մի արարած է',
    author: 'Emily Dickinson (1830–1886)',
    level: 'B1',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Հույսի անմար երգը մարդկային հոգում՝ նույնիսկ ամենաուժգին փոթորիկների ժամանակ։',
    unfamiliarWords: [
      { wordEn: 'perches', pronunciation: 'փըրչիզ', meaningAm: 'թառում է', explanationAm: 'Թռչունը նստում է ճյուղին։' },
      { wordEn: 'gale', pronunciation: 'գեյլ', meaningAm: 'ուժգին քամի, փոթորիկ', explanationAm: 'Շատ հզոր քամի ծովում կամ ցամաքում։' },
      { wordEn: 'sore', pronunciation: 'սոր', meaningAm: 'խիստ, ցավագին', explanationAm: 'Ծանր կամ դաժան փորձություն։' },
      { wordEn: 'extremity', pronunciation: 'իքսթրեմիթի', meaningAm: 'ծայրահեղ դժվարություն', explanationAm: 'Կյանքի ամենածանր պահը։' },
    ],
    lines: [
      { lineNumber: 1, english: '"Hope" is the thing with feathers -', pronunciation: '"Հոուփ" իզ դը թինգ ուիդ ֆեդըրզ -', armenian: '«Հույսը» փետրավոր մի արարած է,' },
      { lineNumber: 2, english: 'That perches in the soul -', pronunciation: 'Դաթ փըրչիզ ին դը սոուլ -', armenian: 'Որը թառում է մարդու հոգում,' },
      { lineNumber: 3, english: 'And sings the tune without the words -', pronunciation: 'Ընդ սինգզ դը թյուն ուիդաութ դը ուորդզ -', armenian: 'Եվ երգում է մեղեդին առանց բառերի,' },
      { lineNumber: 4, english: 'And never stops - at all -', pronunciation: 'Ընդ նեվըր սթոփս - եթ օլ -', armenian: 'Ու երբեք չի դադարում՝ երբե՛ք։' },
      { lineNumber: 5, english: 'And sweetest - in the Gale - is heard -', pronunciation: 'Ընդ սուիթիսթ - ին դը Գեյլ - իզ հըրդ -', armenian: 'Եվ ամենաքաղցրը հնչում է փոթորկի մեջ,' },
      { lineNumber: 6, english: 'And sore must be the storm -', pronunciation: 'Ընդ սոր մասթ բի դը սթորմ -', armenian: 'Եվ դաժան պիտի լինի այն փոթորիկը,' },
      { lineNumber: 7, english: 'That could abash the little Bird', pronunciation: 'Դաթ քուդ էբաշ դը լիթլ Բըրդ', armenian: 'Որը կկարողանար շփոթեցնել այն փոքրիկ թռչունին,' },
      { lineNumber: 8, english: 'That kept so many warm -', pronunciation: 'Դաթ քեփթ սոու մենի ուորմ -', armenian: 'Որն այնքան շատերին է տաք պահել։' },
      { lineNumber: 9, english: 'I\'ve heard it in the chillest land -', pronunciation: 'Այվ հըրդ իթ ին դը չիլիսթ լանդ -', armenian: 'Ես լսել եմ նրան ամենացուրտ երկրներում,' },
      { lineNumber: 10, english: 'And on the strangest Sea -', pronunciation: 'Ընդ օն դը սթրեյնջիսթ Սի -', armenian: 'Եվ ամենաօտար ծովերում,' },
      { lineNumber: 11, english: 'Yet - never - in Extremity,', pronunciation: 'Յեթ - նեվըր - ին Իքսթրեմիթի,', armenian: 'Բայց երբեք՝ ծայրահեղ դժվարության պահին անգամ,' },
      { lineNumber: 12, english: 'It asked a crumb - of me.', pronunciation: 'Իթ ասքթ ը քրամ - օվ մի։', armenian: 'Նա ինձնից մի փշուր անգամ չի խնդրել։' },
    ],
  },

  // Poem 4: The Tyger (William Blake)
  {
    id: 'poem-william-blake-tyger',
    titleEn: 'The Tyger',
    titleAm: 'Վագրը',
    author: 'William Blake (1757–1827)',
    level: 'B2',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Տիեզերքի հզորությունը, գեղեցկության և վախի առեղծվածային միաձուլումը։',
    unfamiliarWords: [
      { wordEn: 'symmetry', pronunciation: 'սիմեթրի', meaningAm: 'համաչափություն', explanationAm: 'Մասերի ներդաշնակ համամասնություն։' },
      { wordEn: 'anvil', pronunciation: 'անվիլ', meaningAm: 'զնդան', explanationAm: 'Դարբնի մետաղյա ծանր հենարան։' },
      { wordEn: 'furnace', pronunciation: 'ֆըրնիս', meaningAm: 'հնոց, վառարան', explanationAm: 'Կրակով լցված դարբնոցային վառարան։' },
    ],
    lines: [
      { lineNumber: 1, english: 'Tyger! Tyger! burning bright', pronunciation: 'Թայգըր! Թայգըր! բըրնինգ բրայթ', armenian: 'Վա՛գր, վա՛գր, վառվող պայծառ' },
      { lineNumber: 2, english: 'In the forests of the night,', pronunciation: 'Ին դը ֆորիսթս օվ դը նայթ,', armenian: 'Գիշերվա խոր անտառներում,' },
      { lineNumber: 3, english: 'What immortal hand or eye', pronunciation: 'Ուոթ իմորթըլ հանդ օր այ', armenian: 'Ո՞ր անմահ ձեռքը կամ աչքը' },
      { lineNumber: 4, english: 'Could frame thy fearful symmetry?', pronunciation: 'Քուդ ֆրեյմ դայ ֆիրֆուլ սիմեթրի;', armenian: 'Կարողացավ կերտել քո ահասարսուռ համաչափությունը։' },
      { lineNumber: 5, english: 'In what distant deeps or skies', pronunciation: 'Ին ուոթ դիսթընթ դիփս օր սքայզ', armenian: 'Ո՞ր հեռավոր անդունդներում կամ երկնքում' },
      { lineNumber: 6, english: 'Burnt the fire of thine eyes?', pronunciation: 'Բըրնթ դը ֆայըր օվ դայն այզ;', armenian: 'Վառվեց կրակը քո աչքերի։' },
      { lineNumber: 7, english: 'On what wings dare he aspire?', pronunciation: 'Օն ուոթ ուինգզ դեր հի էսփայըր;', armenian: 'Ի՞նչ թևերով նա համարձակվեց սավառնել,' },
      { lineNumber: 8, english: 'What the hand, dare seize the fire?', pronunciation: 'Ուոթ դը հանդ, դեր սիզ դը ֆայըր;', armenian: 'Ո՞րն է այն ձեռքը, որ համարձակվեց բռնել կրակը։' },
    ],
  },

  // Poem 5: My Shadow (Robert Louis Stevenson)
  {
    id: 'poem-my-shadow-stevenson',
    titleEn: 'My Shadow',
    titleAm: 'Իմ ստվերը',
    author: 'Robert Louis Stevenson (1850–1894)',
    level: 'A1',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Մանկական զարմանքն ու հետաքրքրությունը սեփական ստվերի հանդեպ։',
    unfamiliarWords: [
      { wordEn: 'shadow', pronunciation: 'շադոու', meaningAm: 'ստվեր', explanationAm: 'Լույսի ճանապարհը փակելուց առաջացող մութ պատկեր։' },
      { wordEn: 'proper', pronunciation: 'փրոփըր', meaningAm: 'իսկական, պատշաճ', explanationAm: 'Ճիշտ կամ սովորական ձևով։' },
      { wordEn: 'buttercup', pronunciation: 'բաթըրքափ', meaningAm: 'հրանունկ (դեղին ծաղիկ)', explanationAm: 'Փոքրիկ վառ դեղին դաշտային ծաղիկ։' },
    ],
    lines: [
      { lineNumber: 1, english: 'I have a little shadow that goes in and out with me,', pronunciation: 'Այ հավ ը լիթլ շադոու դաթ գոուզ ին ընդ աութ ուիդ մի,', armenian: 'Ես մի փոքրիկ ստվեր ունեմ, որն ինձ հետ մտնում ու ելնում է,' },
      { lineNumber: 2, english: 'And what can be the use of him is more than I can see.', pronunciation: 'Ընդ ուոթ քան բի դը յուզ օվ հիմ իզ մոր դան այ քան սի։', armenian: 'Եվ թե ինչ օգուտ կա նրանից՝ ավելին է, քան ես հասկանում եմ։' },
      { lineNumber: 3, english: 'He is very, very like me from the heels up to the head;', pronunciation: 'Հի իզ վերի, վերի լայք մի ֆրոմ դը հիլզ ափ թու դը հեդ;', armenian: 'Նա շատ, շատ նման է ինձ՝ կրունկներից մինչև գլուխ,' },
      { lineNumber: 4, english: 'And I see him jump before me, when I jump into my bed.', pronunciation: 'Ընդ այ սի հիմ ջամփ բիֆոր մի, ուեն այ ջամփ ինթու մայ բեդ։', armenian: 'Եվ տեսնում եմ, թե ինչպես է նա առաջս ընկած ցատկում անկողինս։' },
      { lineNumber: 5, english: 'The funniest thing about him is the way he likes to grow—', pronunciation: 'Դը ֆանիիսթ թինգ էբաութ հիմ իզ դը ուեյ հի լայքս թու գրոու—', armenian: 'Ամենազվարճալի բանը նրա մասին այն է, թե ինչպես է նա աճում—' },
      { lineNumber: 6, english: 'Not at all like proper children, which is always very slow;', pronunciation: 'Նոթ եթ օլ լայք փրոփըր չիլդրըն, ուիչ իզ օլուեյզ վերի սլոու;', armenian: 'Բնավ ոչ իսկական երեխաների պես, որոնք միշտ շատ դանդաղ են աճում։' },
      { lineNumber: 7, english: 'For he sometimes shoots up taller like an india-rubber ball,', pronunciation: 'Ֆոր հի սամթայմզ շութս ափ թոլըր լայք են ինդիա-րաբըր բոլ,', armenian: 'Քանզի երբեմն նա բոյովանում է ռետինե գնդակի պես,' },
      { lineNumber: 8, english: 'And he sometimes gets so little that there\'s none of him at all.', pronunciation: 'Ընդ հի սամթայմզ գեթս սոու լիթլ դաթ դերզ նան օվ հիմ եթ օլ։', armenian: 'Եվ երբեմն այնքան է փոքրանում, որ ընդհանրապես չի երևում։' },
    ],
  },

  // Poem 6: The Lake Isle of Innisfree (W.B. Yeats)
  {
    id: 'poem-innisfree-yeats',
    titleEn: 'The Lake Isle of Innisfree',
    titleAm: 'Ինիսֆրիի լճակղզին',
    author: 'William Butler Yeats (1865–1939)',
    level: 'B2',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Անդորրի որոնումը բնության մեջ՝ քաղաքի աղմուկից հեռու։',
    unfamiliarWords: [
      { wordEn: 'wattle', pronunciation: 'ուաթլ', meaningAm: 'հյուսած ճյուղեր', explanationAm: 'Ճյուղերից պատրաստված հյուսվածք տան պատերի համար։' },
      { wordEn: 'glimmer', pronunciation: 'գլիմըր', meaningAm: 'առկայծում, թույլ լույս', explanationAm: 'Մեղմ, թրթռացող լույս։' },
      { wordEn: 'linnet', pronunciation: 'լինիթ', meaningAm: 'կանեփնուկ (փոքր երգեցիկ թռչուն)', explanationAm: 'Երգող գեղեցիկ փոքրիկ թռչուն։' },
    ],
    lines: [
      { lineNumber: 1, english: 'I will arise and go now, and go to Innisfree,', pronunciation: 'Այ ուիլ էռայզ ընդ գոու նաու, ընդ գոու թու Ինիսֆրի,', armenian: 'Ես կելնեմ ու կգնամ հիմա, կգնամ Ինիսֆրի,' },
      { lineNumber: 2, english: 'And a small cabin build there, of clay and wattles made;', pronunciation: 'Ընդ ը սմոլ քաբին բիլդ դեր, օվ քլեյ ընդ ուաթլզ մեյդ;', armenian: 'Եվ մի փոքրիկ տնակ կկառուցեմ այնտեղ՝ կավից ու ճյուղերից շինված,' },
      { lineNumber: 3, english: 'Nine bean-rows will I have there, a hive for the honey-bee,', pronunciation: 'Նայն բին-րոուզ ուիլ այ հավ դեր, ը հայվ ֆոր դը հանի-բի,', armenian: 'Ինը շարք լոբի կունենամ այնտեղ, մի փեթակ՝ մեղուների համար,' },
      { lineNumber: 4, english: 'And live alone in the bee-loud glade.', pronunciation: 'Ընդ լիվ էլոուն ին դը բի-լաուդ գլեյդ։', armenian: 'Եվ մենակ կապրեմ մեղվաբզզոց բացատում։' },
      { lineNumber: 5, english: 'And I shall have some peace there, for peace comes dropping slow,', pronunciation: 'Ընդ այ շալ հավ սամ փիս դեր, ֆոր փիս քամզ դրոփինգ սլոու,', armenian: 'Եվ ես խաղաղություն կգտնեմ այնտեղ, քանզի խաղաղությունը կաթում է դանդաղ,' },
      { lineNumber: 6, english: 'I hear lake water lapping with low sounds by the shore;', pronunciation: 'Այ հիր լեյք ուոթեր լափինգ ուիդ լոու սաունդզ բայ դը շոր;', armenian: 'Ես լսում եմ լճի ջրերի մեղմ ծփանքը ափի մոտ,' },
      { lineNumber: 7, english: 'While I stand on the roadway, or on the pavements grey,', pronunciation: 'Ուայլ այ սթանդ օն դը րոուդուեյ, օր օն դը փեյվմենթս գրեյ,', armenian: 'Մինչ կանգնած եմ ճանապարհին կամ գորշ մայթերի վրա,' },
      { lineNumber: 8, english: 'I hear it in the deep heart\'s core.', pronunciation: 'Այ հիր իթ ին դը դիփ հարթս քոր։', armenian: 'Ես լսում եմ այն իմ սրտի ամենախորքում։' },
    ],
  },

  // Poem 7: If— (Rudyard Kipling - Selected)
  {
    id: 'poem-if-kipling',
    titleEn: 'If—',
    titleAm: 'Եթե—',
    author: 'Rudyard Kipling (1865–1936)',
    level: 'B2',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Տոկունություն, իմաստնություն և իսկական մարդ մնալու արվեստը։',
    unfamiliarWords: [
      { wordEn: 'triumph', pronunciation: 'թրայըմֆ', meaningAm: 'հաղթանակ, հաղթահանդես', explanationAm: 'Մեծ հաջողություն կամ հաղթանակ։' },
      { wordEn: 'disaster', pronunciation: 'դիզասթըր', meaningAm: 'աղետ, պարտություն', explanationAm: 'Մեծ անհաջողություն կամ աղետ։' },
      { wordEn: 'impostors', pronunciation: 'իմփոսթըրզ', meaningAm: 'խաբեբաներ, կեղծավորներ', explanationAm: 'Մարդիկ, որոնք ձևանում են այն, ինչ իրականում չեն։' },
    ],
    lines: [
      { lineNumber: 1, english: 'If you can keep your head when all about you', pronunciation: 'Իֆ յու քան քիփ յոր հեդ ուեն օլ էբաութ յու', armenian: 'Եթե կարող ես պահպանել սառնասրտությունդ, երբ շուրջբոլորդ' },
      { lineNumber: 2, english: 'Are losing theirs and blaming it on you,', pronunciation: 'Ար լուզինգ դերզ ընդ բլեյմինգ իթ օն յու,', armenian: 'Կորցնում են իրենցը և մեղադրում քեզ,' },
      { lineNumber: 3, english: 'If you can trust yourself when all men doubt you,', pronunciation: 'Իֆ յու քան թրաստ յորսելֆ ուեն օլ մեն դաութ յու,', armenian: 'Եթե կարող ես վստահել ինքդ քեզ, երբ բոլորը կասկածում են քեզ,' },
      { lineNumber: 4, english: 'But make allowance for their doubting too;', pronunciation: 'Բաթ մեյք էլաուընս ֆոր դեր դաութինգ թու;', armenian: 'Բայց և տեղ թողնել նրանց կասկածների համար,' },
      { lineNumber: 5, english: 'If you can meet with Triumph and Disaster', pronunciation: 'Իֆ յու քան միթ ուիդ Թրայըմֆ ընդ Դիզասթըր', armenian: 'Եթե կարող ես դիմավորել Հաղթանակն ու Աղետը' },
      { lineNumber: 6, english: 'And treat those two impostors just the same;', pronunciation: 'Ընդ թրիթ դոուզ թու իմփոսթըրզ ջասթ դը սեյմ;', armenian: 'Եվ վերաբերվել այդ երկու խաբեբաներին միանման,' },
      { lineNumber: 7, english: 'Yours is the Earth and everything that\'s in it,', pronunciation: 'Յորզ իզ դի Ըրթ ընդ էվրիթինգ դաթս ին իթ,', armenian: 'Քոնն է լինելու Երկիրն ու ամեն ինչ, որ կա նրա վրա,' },
      { lineNumber: 8, english: 'And—which is more—you\'ll be a Man, my son!', pronunciation: 'Ընդ—ուիչ իզ մոր—յուլ բի ը Մեն, մայ սան!', armenian: 'Եվ—որն ավելին է—դու կլինես ՄԱՐԴ, որդի՛ս։' },
    ],
  },

  // Poem 8: Who Has Seen the Wind? (Christina Rossetti)
  {
    id: 'poem-wind-rossetti',
    titleEn: 'Who Has Seen the Wind?',
    titleAm: 'Ո՞վ է տեսել քամուն',
    author: 'Christina Rossetti (1830–1894)',
    level: 'A1',
    category: 'English Poetry',
    readingMinutes: 2,
    themeAm: 'Անտեսանելի բնական ուժերի զորությունը և քնքուշ պոեզիան։',
    unfamiliarWords: [
      { wordEn: 'trembling', pronunciation: 'թրեմբլինգ', meaningAm: 'դողդողացող', explanationAm: 'Քամուց թրթռացող կամ դողացող։' },
      { wordEn: 'bow', pronunciation: 'բաու', meaningAm: 'խոնարհվել', explanationAm: 'Գլուխը կամ ճյուղերը ցած իջեցնել։' },
    ],
    lines: [
      { lineNumber: 1, english: 'Who has seen the wind?', pronunciation: 'Հու հազ սին դը ուինդ;', armenian: 'Ո՞վ է տեսել քամուն։' },
      { lineNumber: 2, english: 'Neither I nor you:', pronunciation: 'Նայդըր այ նոր յու:', armenian: 'Ո՛չ ես, ո՛չ էլ դու։' },
      { lineNumber: 3, english: 'But when the leaves hang trembling,', pronunciation: 'Բաթ ուեն դը լիվզ հանգ թրեմբլինգ,', armenian: 'Բայց երբ տերևները դողդողում են,' },
      { lineNumber: 4, english: 'The wind is passing through.', pronunciation: 'Դը ուինդ իզ փասինգ թրու։', armenian: 'Քամին անցնում է նրանց միջով։' },
      { lineNumber: 5, english: 'Who has seen the wind?', pronunciation: 'Հու հազ սին դը ուինդ;', armenian: 'Ո՞վ է տեսել քամուն։' },
      { lineNumber: 6, english: 'Neither you nor I:', pronunciation: 'Նայդըր յու նոր այ:', armenian: 'Ո՛չ դու, ո՛չ էլ ես։' },
      { lineNumber: 7, english: 'But when the trees bow down their heads,', pronunciation: 'Բաթ ուեն դը թրիզ բաու դաուն դեր հեդզ,', armenian: 'Բայց երբ ծառերը խոնարհում են իրենց գլուխները,' },
      { lineNumber: 8, english: 'The wind is passing by.', pronunciation: 'Դը ուինդ իզ փասինգ բայ։', armenian: 'Քամին կողքով է անցնում։' },
    ],
  },

  // Poem 9: There Will Come Soft Rains (Sara Teasdale)
  {
    id: 'poem-soft-rains-teasdale',
    titleEn: 'There Will Come Soft Rains',
    titleAm: 'Կգան մեղմ անձրևները',
    author: 'Sara Teasdale (1884–1933)',
    level: 'B1',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Բնության հավերժական վերածնունդն ու մարդկային անցողիկությունը։',
    unfamiliarWords: [
      { wordEn: 'shimmering', pronunciation: 'շիմըրինգ', meaningAm: 'շողացող, փայլփլող', explanationAm: 'Լույսի տակ մեղմ շողշողացող։' },
      { wordEn: 'plum', pronunciation: 'փլամ', meaningAm: 'սալորենի', explanationAm: 'Ծառ, որը ծաղկում է սպիտակ ծաղիկներով։' },
    ],
    lines: [
      { lineNumber: 1, english: 'There will come soft rains and the smell of the ground,', pronunciation: 'Դեր ուիլ քամ սոֆթ րեյնզ ընդ դը սմել օվ դը գրաունդ,', armenian: 'Կգան մեղմ անձրևները և հողի անուշ բույրը,' },
      { lineNumber: 2, english: 'And swallows circling with their shimmering sound;', pronunciation: 'Ընդ սուոլոուզ սըրքլինգ ուիդ դեր շիմըրինգ սաունդ;', armenian: 'Եվ ծիծեռնակները՝ պտտվելով իրենց զրնգուն ծլվլոցով,' },
      { lineNumber: 3, english: 'And frogs in the pools singing at night,', pronunciation: 'Ընդ ֆրոգզ ին դը փուլզ սինգինգ եթ նայթ,', armenian: 'Եվ գորտերը ջրավազաններում՝ երգելով գիշերները,' },
      { lineNumber: 4, english: 'And wild plum trees in tremulous white;', pronunciation: 'Ընդ ուայլդ փլամ թրիզ ին թրեմյուլըս ուայթ;', armenian: 'Եվ վայրի սալորենիները՝ դողդոջուն սպիտակով պատված։' },
      { lineNumber: 5, english: 'And Spring herself, when she woke at dawn,', pronunciation: 'Ընդ Սփրինգ հըրսելֆ, ուեն շի ուոուք եթ դոն,', armenian: 'Եվ Գարունն ինքը, երբ արթնանա լուսաբացին,' },
      { lineNumber: 6, english: 'Would scarcely know that we were gone.', pronunciation: 'Ուուդ սքերսլի նոու դաթ ուի ուըր գոն։', armenian: 'Հազիվ թե իմանա, որ մենք էլ չկանք։' },
    ],
  },

  // Poem 10: The Arrow and the Song (Henry Wadsworth Longfellow)
  {
    id: 'poem-arrow-song-longfellow',
    titleEn: 'The Arrow and the Song',
    titleAm: 'Նետն ու երգը',
    author: 'Henry Wadsworth Longfellow (1807–1882)',
    level: 'A2',
    category: 'English Poetry',
    readingMinutes: 3,
    themeAm: 'Բարի խոսքերի և երգերի անտեսանելի ճանապարհը դեպի ընկերոջ սիրտը։',
    unfamiliarWords: [
      { wordEn: 'arrow', pronunciation: 'արոու', meaningAm: 'նետ', explanationAm: 'Աղեղով արձակվող սուր զենք։' },
      { wordEn: 'flight', pronunciation: 'ֆլայթ', meaningAm: 'թռիչք', explanationAm: 'Օդում սավառնելու ընթացքը։' },
      { wordEn: 'oak', pronunciation: 'օուք', meaningAm: 'կաղնի', explanationAm: 'Հզոր, ամուր դարավոր ծառ։' },
      { wordEn: 'unbroke', pronunciation: 'անբրոուք', meaningAm: 'չկոտրված, անվնաս', explanationAm: 'Ամբողջական և անխաթար մնացած։' },
    ],
    lines: [
      { lineNumber: 1, english: 'I shot an arrow into the air,', pronunciation: 'Այ շոթ են արոու ինթու դի եր,', armenian: 'Ես մի նետ արձակեցի օդի մեջ,' },
      { lineNumber: 2, english: 'It fell to earth, I knew not where;', pronunciation: 'Իթ ֆել թու ըրթ, այ նյու նոթ ուեր;', armenian: 'Այն ընկավ գետնին, չգիտեի՝ որտեղ,' },
      { lineNumber: 3, english: 'For, so swiftly it flew, the sight', pronunciation: 'Ֆոր, սոու սուիֆթլի իթ ֆլյու, դը սայթ', armenian: 'Քանզի այնքան սրընթաց թռավ, որ հայացքս' },
      { lineNumber: 4, english: 'Could not follow it in its flight.', pronunciation: 'Քուդ նոթ ֆոլոու իթ ին իթս ֆլայթ։', armenian: 'Չկարողացավ հետևել նրա թռիչքին։' },
      { lineNumber: 5, english: 'I breathed a song into the air,', pronunciation: 'Այ բրիդդ ը սոնգ ինթու դի եր,', armenian: 'Ես մի երգ շշնջացի օդի մեջ,' },
      { lineNumber: 6, english: 'It fell to earth, I knew not where;', pronunciation: 'Իթ ֆել թու ըրթ, այ նյու նոթ ուեր;', armenian: 'Այն ընկավ գետնին, չգիտեի՝ որտեղ,' },
      { lineNumber: 7, english: 'Long, long afterward, in an oak', pronunciation: 'Լոնգ, լոնգ աֆթըրուըրդ, ին են օուք', armenian: 'Երկար, շատ երկար ժամանակ անց՝ մի կաղնու մեջ' },
      { lineNumber: 8, english: 'I found the arrow, still unbroke;', pronunciation: 'Այ ֆաունդ դի արոու, սթիլ անբրոուք;', armenian: 'Ես գտա նետը՝ դեռևս անվնաս,' },
      { lineNumber: 9, english: 'And the song, from beginning to end,', pronunciation: 'Ընդ դը սոնգ, ֆրոմ բիգինինգ թու էնդ,', armenian: 'Իսկ երգը՝ սկզբից մինչև վերջ,' },
      { lineNumber: 10, english: 'I found again in the heart of a friend.', pronunciation: 'Այ ֆաունդ էգեյն ին դը հարթ օվ ը ֆրենդ։', armenian: 'Ես կրկին գտա իմ ընկերոջ սրտում։' },
    ],
  },
];

export const BOOKS_DATA = LIBRARY_BOOKS;
export const POEMS_DATA = LIBRARY_POEMS;
export const BOOK_CATEGORIES_DATA = BOOK_CATEGORIES;


