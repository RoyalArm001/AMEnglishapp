import type { LessonItem, LessonSentence } from '../lib/types';

// HayLingo examples and Armenian support; see CONTENT_SOURCES.md for the topic framework.
function step(id: string, english: string, pronunciation: string, armenian: string, note?: string, alternatives?: string[]): LessonSentence {
  return {id: `intl-${id}`, english, pronunciation, armenian, grammarNoteAm: note,
    writingTask: {promptAm: `Գրիր սովորած տարբերակը անգլերեն՝ «${armenian}»։`, acceptedAnswers: alternatives}};
}

export const INTERNATIONAL_LESSONS: LessonItem[] = [
  {
    id: 'intl-letter-sounds', categoryId: 'grammar-basics', order: -97.5, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Տառից հնչյուն՝ առաջին կարճ բառերը', titleEn: 'From letters to sounds',
    descriptionAm: 'Լսիր բառը, միացրու հնչյունները և գրիր երեք տառը։',
    outcomeAm: 'Կկարողանաս տառերը միացնել հինգ կարճ բառի մեջ։', sourceIds: ['pcc-sounds'],
    grammarTipAm: 'Տառի անունը և բառի մեջ հնչյունը տարբեր են։ Այստեղ լսում ենք կարճ ձայնավորներով բառեր։ Հայերեն հուշումը մոտավոր է․ կրկնիր լսած անգլերենը։',
    sentences: [
      step('sound-cat', 'cat', 'քեթ', 'կատու', 'c–a–t → cat։ Այստեղ a-ն /æ/ է, ոչ թե տառի «էյ» անունը։'),
      step('sound-pen', 'pen', 'փեն', 'գրիչ', 'p–e–n → pen։ Այստեղ e-ն կարճ /e/ հնչյուն է։'),
      step('sound-sit', 'sit', 'սիթ', 'նստել', 's–i–t → sit։ Այստեղ i-ն կարճ /ɪ/ է, ոչ թե «այ»։'),
      step('sound-dog', 'dog', 'դոգ', 'շուն', 'd–o–g → dog։ Ձայնավորի արտասանությունը փոքր-ինչ տարբերվում է ամերիկյան և բրիտանական տարբերակներում։'),
      step('sound-sun', 'sun', 'սան', 'արև', 's–u–n → sun։ Այստեղ u-ն /ʌ/ է, ոչ թե «յու»։'),
    ],
  },
  {
    id: 'intl-family', categoryId: 'daily-conversations', order: -96.5, level: 'A1', estimatedMinutes: 5,
    titleAm: 'Իմ ընտանիքը', titleEn: 'Family words', descriptionAm: 'Ընտանիքի անդամների վեց պարզ անվանում։',
    outcomeAm: 'Կճանաչես և կգրես ընտանիքի անդամների անունները։', sourceIds: ['british-a1'],
    grammarTipAm: 'Սկսիր մեկ բառից։ mother/father՝ մայր/հայր, brother/sister՝ եղբայր/քույր, son/daughter՝ որդի/դուստր։',
    sentences: [
      step('mother', 'mother', 'մադըր', 'մայր'), step('father', 'father', 'ֆադըր', 'հայր'),
      step('brother', 'brother', 'բրադըր', 'եղբայր'), step('sister', 'sister', 'սիսթըր', 'քույր'),
      step('son', 'son', 'սան', 'որդի'), step('daughter', 'daughter', 'դոթըր', 'դուստր'),
    ],
  },
  {
    id: 'intl-colors', categoryId: 'daily-conversations', order: -95.75, level: 'A1', estimatedMinutes: 5,
    titleAm: 'Գույները մեր շուրջը', titleEn: 'Colors', descriptionAm: 'Տես գույնը, լսիր անունը և գրիր այն։',
    outcomeAm: 'Կկարողանաս անվանել վեց հիմնական գույն։', sourceIds: ['pcc-colors'],
    grammarTipAm: 'Գույնը սովորաբար դնում ենք առարկայից առաջ՝ red pen = կարմիր գրիչ։ Այս քայլերում նախ սովորում ենք գույների անունները։',
    sentences: [
      {...step('red', 'red', 'րեդ', 'կարմիր'), colorHex: '#dc2626'},
      {...step('blue', 'blue', 'բլու', 'կապույտ'), colorHex: '#2563eb'},
      {...step('green', 'green', 'գրին', 'կանաչ'), colorHex: '#16a34a'},
      {...step('yellow', 'yellow', 'յելոու', 'դեղին'), colorHex: '#facc15'},
      {...step('black', 'black', 'բլեք', 'սև'), colorHex: '#171717'},
      {...step('white', 'white', 'ուայթ', 'սպիտակ'), colorHex: '#ffffff'},
    ],
  },
  {
    id: 'intl-articles-plurals', categoryId: 'grammar-basics', order: -95.5, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Մեկ առարկա և մի քանի առարկա', titleEn: 'A, an and plurals', descriptionAm: 'Սովորիր a/an-ը և պարզ հոգնակին։',
    outcomeAm: 'Կտարբերես մեկ առարկան և մի քանի առարկան։', sourceIds: ['pcc-sounds'],
    grammarTipAm: 'Մի հատ հաշվելի առարկայից առաջ՝ a կամ an։ An-ը դնում ենք ձայնավոր հնչյունից առաջ։ Պարզ հոգնակին հաճախ ստանում է -s։ Օրինակ՝ a pen → pens։',
    sentences: [
      step('a-book', 'a book', 'ը բուք', 'մի գիրք'), step('an-apple', 'an apple', 'ըն էփըլ', 'մի խնձոր'),
      step('a-pen', 'a pen', 'ը փեն', 'մի գրիչ'), step('books', 'books', 'բուքս', 'գրքեր'),
      step('apples', 'apples', 'էփըլզ', 'խնձորներ'), step('pens', 'pens', 'փենզ', 'գրիչներ'),
    ],
  },
  {
    id: 'intl-be-questions', categoryId: 'questions-answers', order: -90.75, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Ես եմ, դո՞ւ ես․ հարց ու պատասխան', titleEn: 'Questions with be', descriptionAm: 'Պարզ հարցեր՝ am, is, are բայաձևերով։',
    outcomeAm: 'Կկարողանաս պարզ հարց տալ և պատասխանել այո կամ ոչ։', sourceIds: ['pcc-be'],
    grammarTipAm: 'You are → Are you? She is → Is she? Կարճ պատասխաններում պահում ենք բայը՝ Yes, I am / No, I am not։',
    sentences: [
      step('are-you', 'Are you a student?', 'Ար յու ը սթյուդընթ՞', 'Դու ուսանո՞ղ ես։'),
      step('yes-i-am', 'Yes, I am.', 'Յես այ էմ։', 'Այո, ես եմ։', undefined, ['Yes I am.']),
      step('no-i-am', 'No, I am not.', 'Նոու այ էմ նոթ։', 'Ոչ, ես չեմ։', undefined, ["No, I'm not.", 'No I am not', "No I'm not"]),
      step('is-she', 'Is she a teacher?', 'Իզ շի ը թիչըր՞', 'Նա ուսուցի՞չ է։'),
      step('yes-she', 'Yes, she is.', 'Յես շի իզ։', 'Այո, նա է։', undefined, ['Yes she is.']),
      step('no-she', 'No, she is not.', 'Նոու շի իզ նոթ։', 'Ոչ, նա չէ։', undefined, ["No, she isn't.", 'No she is not', "No she isn't"]),
    ],
  },
  {
    id: 'intl-have', categoryId: 'grammar-basics', order: -90.5, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Ինչ ունեմ ես', titleEn: 'Have and has', descriptionAm: 'Խոսիր քո և ուրիշների ունեցած իրերի մասին։',
    outcomeAm: 'Կկարողանաս ասել՝ ինչ ունես, և հարցնել ուրիշին։', sourceIds: ['pcc-have'],
    grammarTipAm: 'I/you/we/they have, բայց he/she/it has։ Հարցի համար՝ Do you have…? Բացասումը՝ I do not have… կամ I don’t have…։',
    sentences: [
      step('i-have', 'I have a book.', 'Այ հեվ ը բուք։', 'Ես գիրք ունեմ։'),
      step('you-have', 'You have a pen.', 'Յու հեվ ը փեն։', 'Դու գրիչ ունես։'),
      step('he-has', 'He has a dog.', 'Հի հեզ ը դոգ։', 'Նա շուն ունի (արական)։'),
      step('she-has', 'She has a cat.', 'Շի հեզ ը քեթ։', 'Նա կատու ունի (իգական)։'),
      step('no-car', 'I do not have a car.', 'Այ դու նոթ հեվ ը քար։', 'Ես մեքենա չունեմ։', undefined, ["I don't have a car."]),
      step('have-question', 'Do you have a book?', 'Դու յու հեվ ը բուք՞', 'Դու գիրք ունե՞ս։'),
    ],
  },
  {
    id: 'intl-food', categoryId: 'daily-conversations', order: -86, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Ուտելիք և պարզ խնդրանք', titleEn: 'Food and a polite request', descriptionAm: 'Անվանիր ուտելիքը և խնդրիր ըմպելիք։',
    outcomeAm: 'Կկարողանաս ասել՝ ինչ ես սիրում, և պարզ խնդրանք անել։', sourceIds: ['british-a1'],
    grammarTipAm: 'I like… = Ես սիրում եմ…։ Tea, please = Թեյ, խնդրում եմ։ Ընդհանուր նախասիրության համար՝ I like apples (հոգնակի)։',
    sentences: [
      step('bread', 'bread', 'բրեդ', 'հաց'), step('milk', 'milk', 'միլք', 'կաթ'),
      step('apple', 'apple', 'էփըլ', 'խնձոր'), step('tea', 'tea', 'թի', 'թեյ'),
      step('like-apples', 'I like apples.', 'Այ լայք էփըլզ։', 'Ես սիրում եմ խնձոր։'),
      step('tea-please', 'Tea, please.', 'Թի փլիզ։', 'Թեյ, խնդրում եմ։', undefined, ['Tea please.']),
    ],
  },
  {
    id: 'intl-routine', categoryId: 'daily-conversations', order: 1.5, level: 'A1', estimatedMinutes: 6,
    titleAm: 'Իմ օրը՝ վեց նախադասությամբ', titleEn: 'My daily routine', descriptionAm: 'Պատմիր առավոտից մինչև երեկո կատարվող պարզ գործողությունները։',
    outcomeAm: 'Կկարողանաս կարճ պատմել քո սովորական օրվա մասին։', sourceIds: ['pcc-routine'],
    grammarTipAm: 'Սովորական գործողությունների համար՝ I get up, I eat, I read։ Նախադասությունը սկսիր I-ով։ Breakfast = նախաճաշ, every day = ամեն օր։',
    sentences: [
      step('get-up', 'I get up.', 'Այ գեթ ափ։', 'Ես վեր եմ կենում։'),
      step('breakfast', 'I eat breakfast.', 'Այ իթ բրեքֆըսթ։', 'Ես նախաճաշում եմ։'),
      step('go-school', 'I go to school.', 'Այ գոու թու սքուլ։', 'Ես գնում եմ դպրոց։'),
      step('read-book', 'I read a book.', 'Այ րիդ ը բուք։', 'Ես գիրք եմ կարդում։'),
      step('study-daily', 'I study English every day.', 'Այ սթադի Ինգլիշ էվրի դեյ։', 'Ես ամեն օր անգլերեն եմ սովորում։'),
      step('go-bed', 'I go to bed.', 'Այ գոու թու բեդ։', 'Ես գնում եմ քնելու։'),
    ],
  },
];
