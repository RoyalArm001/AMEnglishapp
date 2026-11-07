import type { CEFRLevel, DailyQuestionItem } from '../lib/types';

function wordPuzzle(id: string, clueEn: string, clueAm: string, answer: string, armenian: string, hintAm: string, alternatives: string[] = []): DailyQuestionItem {
  const article = (value: string) => ['water', 'milk'].includes(value) ? value
    : value === 'sun' ? `the ${value}` : `${/^[aeiou]/i.test(value) ? 'an' : 'a'} ${value}`;
  const values = [...new Set([answer, ...alternatives])].flatMap(value => [value, article(value), `the ${value}`]);
  return {
    id: `dq-puzzle-${id}`, topic: 'puzzles', puzzleKind: 'word', type: 'answer-question',
    level: 'A1', difficultyRank: 1, professions: [],
    questionEn: clueEn, questionPronunciation: '',
    questionAm: `${clueAm} Գուշակիր և գրիր պատասխանը անգլերեն։`,
    correctAnswer: answer, acceptableAnswers: values, hintAm,
    meaning: {values, patterns: [
      '(?:it|this|that|the answer|the object|the animal) is {not}{value}',
      '(?:it|this|that) is {not}called {value}',
      'i think (?:that )?it is {not}{value}',
    ]},
    explanationAm: `${answer} — ${armenian}։ Կարող ես պատասխանել բառով կամ օրինակ՝ «It is ${article(answer)}»։`,
  };
}

function phrasePuzzle(id: string, level: CEFRLevel, situationAm: string, sourceAm: string, answer: string, hintAm: string, alternatives: string[] = []): DailyQuestionItem {
  return {
    id: `dq-puzzle-${id}`, topic: 'puzzles', puzzleKind: 'phrase', type: 'translate-am-en',
    level, difficultyRank: level === 'A1' ? 1 : 2, professions: [],
    questionEn: 'How would you say this in English?', questionPronunciation: '',
    questionAm: `${situationAm} Թարգմանիր՝ «${sourceAm}»։`,
    correctAnswer: answer, acceptableAnswers: [answer, ...alternatives], hintAm,
    explanationAm: `${answer} — ${sourceAm}։${alternatives.length ? ` Ընդունվում է նաև՝ ${alternatives[0]}։` : ''}`,
  };
}

export const TRANSLATION_PUZZLES: DailyQuestionItem[] = [
  wordPuzzle('book', 'I have pages. You read me. What am I?', 'Ես էջեր ունեմ։ Ինձ կարդում են։ Ի՞նչ եմ ես։', 'book', 'գիրք', 'Չորս տառ․ առաջինը՝ b։'),
  wordPuzzle('pen', 'You write with me. I use ink. What am I?', 'Ինձնով գրում են։ Իմ մեջ թանաք կա։ Ի՞նչ եմ ես։', 'pen', 'գրիչ', 'Երեք տառ․ սկսվում է p-ով։'),
  wordPuzzle('cat', 'I am an animal. I say meow. What am I?', 'Կենդանի եմ և ասում եմ «մյաու»։ Ո՞վ եմ ես։', 'cat', 'կատու', 'Առաջին տառը c է։'),
  wordPuzzle('dog', 'I am an animal. I bark. What am I?', 'Կենդանի եմ։ Հաչում եմ և սիրում եմ զբոսնել։ Ո՞վ եմ ես։', 'dog', 'շուն', 'Երեք տառ․ վերջում՝ g։'),
  wordPuzzle('sun', 'You see me in the daytime. I give light. What am I?', 'Ցերեկը երկնքում եմ և լույս եմ տալիս։ Ի՞նչ եմ ես։', 'sun', 'արև', 'Սկսվում է s-ով և ունի երեք տառ։'),
  wordPuzzle('water', 'You drink me. I have no color. What am I?', 'Ինձ խմում են։ Գույն չունեմ։ Ի՞նչ եմ ես։', 'water', 'ջուր', 'Հինգ տառ․ առաջինը՝ w։'),
  wordPuzzle('milk', 'I am white. You can drink me. What am I?', 'Սպիտակ եմ։ Ինձ խմում են կամ ավելացնում թեյի մեջ։ Ի՞նչ եմ ես։', 'milk', 'կաթ', 'Սկսվում է m-ով։'),
  wordPuzzle('apple', 'I am a fruit. I can be red or green. What am I?', 'Միրգ եմ։ Կարող եմ լինել կարմիր կամ կանաչ։ Ի՞նչ եմ ես։', 'apple', 'խնձոր', 'Հինգ տառ․ սկսվում է a-ով։'),
  wordPuzzle('teacher', 'I help you learn in class. Who am I?', 'Դասարանում օգնում եմ քեզ սովորել։ Ո՞վ եմ ես։', 'teacher', 'ուսուցիչ', 'Սկսվում է teach բառով, որը նշանակում է «ուսուցանել»։'),
  wordPuzzle('school', 'You go here for lessons. What place is this?', 'Այստեղ դասեր ես ունենում և հանդիպում ուսուցիչներին։ Ի՞նչ վայր է սա։', 'school', 'դպրոց', 'Վեց տառ․ առաջին երկուսը՝ sc։'),
  phrasePuzzle('morning', 'A1', 'Առավոտյան հանդիպում ես ընկերոջդ։', 'Բարի լույս', 'Good morning.', 'Երկու բառ․ առաջինը նշանակում է «լավ»։', ['Morning!']),
  phrasePuzzle('thanks', 'A1', 'Քեզ օգնեցին։', 'Շնորհակալություն', 'Thank you.', 'Առաջին բառը սկսվում է th-ով։', ['Thanks.', 'Thanks a lot.', 'Thank you very much.']),
  phrasePuzzle('tea', 'A1', 'Սրճարանում թեյ ես խնդրում։', 'Թեյ, խնդրում եմ', 'Tea, please.', 'Ըմպելիքը՝ t…, քաղաքավարի բառը՝ p…։', ['Can I have some tea, please?', 'I would like tea, please.', "I'd like tea, please."]),
  phrasePuzzle('fine', 'A1', 'Ընկերդ հարցնում է՝ ինչպես ես։', 'Ես լավ եմ', 'I am fine.', 'Կարող ես նաև կարճ պատասխանել՝ մեկ բառով։', ["I'm fine.", 'Fine.', 'I am good.', "I'm good.", 'Good.', 'I am well.']),
  phrasePuzzle('two-books', 'A1', 'Քո սեղանին գրքեր կան։', 'Երկու գիրք', 'Two books.', '2-ի անգլերեն անունը և book բառի հոգնակին։', ['2 books', 'I have two books.', 'There are two books.']),
  phrasePuzzle('goodbye', 'A1', 'Դու գնում ես տուն։', 'Ցտեսություն', 'Goodbye.', 'Կարող ես գրել նաև երեք տառանոց կարճ տարբերակը։', ['Bye.', 'Bye bye.', 'See you.']),
  phrasePuzzle('help', 'A2', 'Մի բան չես հասկանում և օգնություն ես խնդրում։', 'Կարո՞ղ ես օգնել ինձ', 'Can you help me?', 'Կարողություն հարցնելիս հաճախ սկսում ենք Can բառով։', ['Could you help me?', 'Can you help me, please?', 'Could you please help me?']),
  phrasePuzzle('water-request', 'A2', 'Ծարավ ես։', 'Ես մի քիչ ջուր կուզեի', 'I would like some water.', 'Քաղաքավարի ցանկության համար՝ I would like…։', ["I'd like some water.", 'Can I have some water?', 'Could I have some water, please?']),
  phrasePuzzle('dont-understand', 'A2', 'Զրուցակիցդ շատ արագ է խոսում։', 'Ես չեմ հասկանում', 'I do not understand.', 'Ժխտելու համար օգտագործիր do not կամ don’t։', ["I don't understand.", 'Sorry, I do not understand.', "Sorry, I don't understand."]),
  phrasePuzzle('repeat', 'A2', 'Վերջին խոսքը չլսեցիր։', 'Խնդրում եմ, նորից ասա', 'Please say it again.', '«Նորից» բառը սկսվում է a-ով։', ['Please repeat that.', 'Could you repeat that, please?', 'Can you say that again, please?']),
  phrasePuzzle('price', 'A2', 'Խանութում գինն ես հարցնում։', 'Սա ինչքա՞ն արժե', 'How much is this?', 'Գնի համար հարցը սկսվում է How much…։', ['How much does this cost?', 'What is the price of this?', 'How much is it?']),
  phrasePuzzle('left', 'A2', 'Ճանապարհ ես ցույց տալիս։', 'Թեքվիր ձախ', 'Turn left.', '«Թեքվել» բայը սկսվում է t-ով։', ['Please turn left.', 'Go left.']),
  phrasePuzzle('where-book', 'A2', 'Գիրքդ չես գտնում։', 'Որտե՞ղ է իմ գիրքը', 'Where is my book?', 'Տեղը հարցնելիս օգտագործիր Where…։', ["Where's my book?"]),
  phrasePuzzle('tomorrow', 'A2', 'Հրաժեշտ ես տալիս մինչև հաջորդ օրը։', 'Կհանդիպենք վաղը', 'See you tomorrow.', 'Երեք բառ․ «վաղը» սկսվում է t-ով։', ["I'll see you tomorrow.", 'I will see you tomorrow.']),
];
