export interface LearningSource {
  id: string;
  title: string;
  url: string;
  credit: string;
  useAm: string;
  license?: {label: string; url: string};
}
const pcc = {
  credit: 'Eric Dodson, Davida Jordan, Timothy Krause · Portland Community College · 2018',
  useAm: 'Թեմայի ու վարժության մոտեցման հիմք։ Օրինակները, հայերեն բացատրությունն ու ծրագրային իրականացումը՝ HayLingo։ Բնօրինակի տեսանյութերն ու պատկերները չեն ներառվել։',
  license: {label: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/'},
};

export const LEARNING_SOURCES: LearningSource[] = [
  {...pcc, id: 'pcc-sounds', title: 'Beginning ESOL · Vowels, Nouns and Articles', url: 'https://opentextbc.ca/testing/chapter/2/'},
  {...pcc, id: 'pcc-colors', title: 'Beginning ESOL · Questions and Colors', url: 'https://opentextbc.ca/testing/chapter/7/'},
  {...pcc, id: 'pcc-be', title: 'Beginning ESOL · Be and Subject Pronouns', url: 'https://opentextbc.ca/testing/chapter/4/'},
  {...pcc, id: 'pcc-have', title: 'Beginning ESOL · Have', url: 'https://opentextbc.ca/testing/chapter/6/'},
  {...pcc, id: 'pcc-routine', title: 'Beginning ESOL · Daily Routine', url: 'https://opentextbc.ca/testing/chapter/9/'},
  {id: 'british-a1', title: 'British Council · A1 Elementary', url: 'https://learnenglish.britishcouncil.org/level/understand-your-level/a1-elementary', credit: 'British Council', useAm: 'Մակարդակի նպատակների տեղեկատու և լրացուցիչ արտաքին նյութ։ HayLingo-ի օրինակները ինքնուրույն են գրված։'},
  {id: 'voa-welcome', title: 'VOA · Lesson 1: Welcome!', url: 'https://learningenglish.voanews.com/a/lets-learn-english-lesson-one/3111026.html', credit: 'VOA Learning English · 2019', useAm: 'Երկխոսության կրճատված հատված։ Հայերեն թարգմանությունը և արտասանության հուշումները՝ HayLingo։', license: {label: 'VOA · օգտագործման պայմաններ', url: 'https://www.voanews.com/p/5338.html'}},
  {id: 'cambridge-young', title: 'Cambridge · A1 Movers', url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/movers/preparation/', credit: 'Cambridge English', useAm: 'Երեխաների համար նախատեսված լրացուցիչ բառացանկեր և վարժություններ։ Բացվում են արտաքին կայքում։'},
];

// A short, abridged excerpt from VOA's own lesson transcript. No media is republished.
export const VOA_WELCOME_EXCERPT = [
  {speaker: 'Pete', english: 'Hi! Are you Anna?', pronunciation: 'Հայ։ Ար յու Աննա՞', armenian: 'Բարև։ Դու Աննա՞ն ես։'},
  {speaker: 'Anna', english: 'Yes! Are you Pete?', pronunciation: 'Յես։ Ար յու Փիթ՞', armenian: 'Այո։ Դու Փի՞թն ես։'},
  {speaker: 'Pete', english: 'I am Pete.', pronunciation: 'Այ էմ Փիթ։', armenian: 'Ես Փիթն եմ։'},
  {speaker: 'Anna', english: 'Nice to meet you.', pronunciation: 'Նայս թու միթ յու։', armenian: 'Ուրախ եմ ծանոթանալու համար։'},
];
