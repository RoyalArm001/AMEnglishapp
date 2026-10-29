import { PROFESSIONAL_DIALOGUES } from './professional-practice';
import type { ProfessionId } from '../lib/types';
import { CEFRLevel, SkillType } from '../lib/types';

export interface PlacementQuestion {
  id: string;
  level: CEFRLevel;
  skill: SkillType;
  questionEn: string;
  questionAm: string;
  options: string[];
  correctOptionIndex: number;
  explanationAm: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pl-1',
    level: 'A1',
    skill: 'reading',
    questionEn: 'I work as an IT specialist ___ Monday to Friday.',
    questionAm: 'Ընտրիր ճիշտ նախդիրը՝ «Ես աշխատում եմ երկուշաբթիից ուրբաթ»։',
    options: ['from', 'at', 'in', 'by'],
    correctOptionIndex: 0,
    explanationAm: '«from ... to ...» կառույցը նշանակում է «...-ից մինչև ...» (from Monday to Friday)։',
  },
  {
    id: 'pl-2',
    level: 'A1',
    skill: 'writing',
    questionEn: 'Choose the correct sentence:',
    questionAm: 'Ո՞ր նախադասությունն է քերականորեն ճիշտ՝ «Ես տուն եմ գնում մեքենայով»։',
    options: [
      'I go to home my car.',
      'I go home by car.',
      'I am go home with car.',
      'I going home by the car.',
    ],
    correctOptionIndex: 1,
    explanationAm: '«home» բառից առաջ «to» չի դրվում, իսկ տրանսպորտային միջոցի հետ օգտագործվում է «by car»։',
  },
  {
    id: 'pl-3',
    level: 'A2',
    skill: 'speaking',
    questionEn: 'Can you show me ___?',
    questionAm: 'Լրացրու անուղղակի հարցը՝ «Կարո՞ղ եք ցույց տալ, թե ինչ խնդիր կա»։',
    options: [
      'what is the problem',
      'what the problem is',
      'what problem is it',
      'how is the problem',
    ],
    correctOptionIndex: 1,
    explanationAm: '«Can you show me...»-ից հետո շարադասությունը պատմողական է՝ «what the problem is»։',
  },
  {
    id: 'pl-4',
    level: 'A2',
    skill: 'reading',
    questionEn: 'Did you ___ the email that I sent you yesterday?',
    questionAm: 'Ընտրիր բայի ճիշտ ձևը անցյալ հարցական նախադասության համար։',
    options: ['received', 'receiving', 'receive', 'to receive'],
    correctOptionIndex: 2,
    explanationAm: '«Did» օժանդակ բայից հետո հիմնական բայը միշտ դրվում է ուղիղ ձևով (receive)։',
  },
  {
    id: 'pl-5',
    level: 'B1',
    skill: 'writing',
    questionEn: 'I ___ at this IT company for three years.',
    questionAm: 'Ես աշխատում եմ այս ՏՏ ընկերությունում արդեն երեք տարի (և դեռ շարունակում եմ)։',
    options: [
      'am working',
      'have been working',
      'worked',
      'was working',
    ],
    correctOptionIndex: 1,
    explanationAm: 'Անցյալում սկսված և մինչև հիմա շարունակվող գործողության համար օգտագործվում է Present Perfect Continuous (have been working)։',
  },
  {
    id: 'pl-6',
    level: 'B1',
    skill: 'listening',
    questionEn: 'The network connection speed ___ on the router configuration.',
    questionAm: 'Ընտրիր ճիշտ բայն ու նախդիրը՝ «կախված է» իմաստով։',
    options: ['depends from', 'depends on', 'is depend of', 'depending at'],
    correctOptionIndex: 1,
    explanationAm: 'Անգլերենում «կախված լինել»-ը միշտ «depend on» է (երրորդ դեմքով՝ depends on)։',
  },
  {
    id: 'pl-7',
    level: 'B2',
    skill: 'reading',
    questionEn: 'We scheduled the server reboot for midnight ___ it would not affect users.',
    questionAm: 'Ընտրիր ճիշտ շաղկապը՝ «որպեսզի այն չխանգարի օգտատերերին»։',
    options: ['because of', 'so that', 'despite', 'unless'],
    correctOptionIndex: 1,
    explanationAm: '«so that» նշանակում է «որպեսզի» և արտահայտում է գործողության նպատակը։',
  },
  {
    id: 'pl-8',
    level: 'C1',
    skill: 'writing',
    questionEn: 'Had we noticed the firewall misconfiguration earlier, we ___ the outage.',
    questionAm: 'Եթե ավելի շուտ նկատած լինեինք firewall-ի սխալ կարգավորումը, կկանխեինք խափանումը։',
    options: [
      'will prevent',
      'would prevent',
      'would have prevented',
      'prevented',
    ],
    correctOptionIndex: 2,
    explanationAm: 'Երրորդ տիպի պայմանական նախադասության (Third Conditional) երկրորդ մասում օգտագործվում է «would have + V3»։',
  },
];

export interface VoicePracticeItem {
  id: string;
  mode: 'conversation' | 'morning';
  level: CEFRLevel;
  categoryAm: string;
  questionEn: string;
  questionPronunciation: string;
  questionAm: string;
  targetAnswerEn: string;
  targetPronunciation: string;
  targetAnswerAm: string;
  alternativesEn: string[];
}

export const VOICE_PRACTICE_ITEMS: VoicePracticeItem[] = [
  {
    id: 'vp-1',
    mode: 'morning',
    level: 'A1',
    categoryAm: 'Առավոտյան մարզում · Աշխատանքային օր',
    questionEn: 'Good morning! What time do you start work today?',
    questionPronunciation: 'Գուդ մորնինգ։ Ուաթ թայմ դու յու սթարթ ուըրք թըդեյ։',
    questionAm: 'Բարի առավոտ։ Այսօր ժամը քանիսի՞ն եք սկսում աշխատանքը։',
    targetAnswerEn: 'I start work at nine o’clock in the morning.',
    targetPronunciation: 'Այ սթարթ ուըրք էթ նայն օքլոք ին դը մորնինգ։',
    targetAnswerAm: 'Ես սկսում եմ աշխատանքը առավոտյան ժամը իննին։',
    alternativesEn: [
      'I start work at nine.',
      'I start work at 9 AM.',
      'I start at nine o clock.',
    ],
  },
  {
    id: 'vp-2',
    mode: 'morning',
    level: 'A1',
    categoryAm: 'Առավոտյան մարզում · Ինքնաներկայացում',
    questionEn: 'What is your job and which days do you work?',
    questionPronunciation: 'Ուաթ իզ յուր ջոբ ընդ ուիչ դեյզ դու յու ուըրք։',
    questionAm: 'Ի՞նչ է Ձեր մասնագիտությունը և շաբաթվա ո՞ր օրերին եք աշխատում։',
    targetAnswerEn: 'I work as an IT specialist from Monday to Friday.',
    targetPronunciation: 'Այ ուըրք էզ էն այ թի սփեշըլիսթ ֆրոմ Մանդեյ թու Ֆրայդեյ։',
    targetAnswerAm: 'Ես աշխատում եմ որպես ՏՏ մասնագետ՝ երկուշաբթիից ուրբաթ։',
    alternativesEn: [
      'I am an IT specialist from Monday to Friday.',
      'I work in IT from Monday to Friday.',
    ],
  },
  {
    id: 'vp-3',
    mode: 'morning',
    level: 'A2',
    categoryAm: 'Առավոտյան մարզում · Օրվա առաջադրանքներ',
    questionEn: 'What is your main task for this morning?',
    questionPronunciation: 'Ուաթ իզ յուր մեյն թասք ֆոր դիս մորնինգ։',
    questionAm: 'Ո՞րն է այս առավոտվա Ձեր հիմնական առաջադրանքը։',
    targetAnswerEn: 'First, I will check my emails and review the support tickets.',
    targetPronunciation: 'Ֆըրսթ, այ ուիլ չեք մայ իմեյլզ ընդ րիվյու դը սըփորթ թիքեթս։',
    targetAnswerAm: 'Նախ՝ ես կստուգեմ էլ․ նամակներս և կուսումնասիրեմ աջակցության հայտերը։',
    alternativesEn: [
      'I will check my emails and support tickets.',
      'I check my emails and review support tickets.',
    ],
  },
  {
    id: 'vp-4',
    mode: 'morning',
    level: 'B1',
    categoryAm: 'Առավոտյան մարզում · Daily Standup',
    questionEn: 'Are there any blockers or urgent issues today?',
    questionPronunciation: 'Ար դեըր էնի բլոքըրզ օր ըրջընթ իշուզ թըդեյ։',
    questionAm: 'Այսօր կա՞ն խոչընդոտներ կամ հրատապ խնդիրներ։',
    targetAnswerEn: 'Everything is running smoothly, and there are no urgent issues.',
    targetPronunciation: 'Էվրիթինգ իզ րանինգ սմուդլի, ընդ դեըր ար նոու ըրջընթ իշուզ։',
    targetAnswerAm: 'Ամեն ինչ հարթ է աշխատում, և հրատապ խնդիրներ չկան։',
    alternativesEn: [
      'There are no urgent issues today.',
      'Everything is working well today.',
    ],
  },
  {
    id: 'vp-5',
    mode: 'conversation',
    level: 'A2',
    categoryAm: 'IT Helpdesk · Խնդրի պարզաբանում',
    questionEn: 'Hello! My computer is very slow today. Can you help me?',
    questionPronunciation: 'Հելոու։ Մայ քըմփյութըր իզ վերի սլոու թըդեյ։ Քեն յու հելփ մի։',
    questionAm: 'Բարև ձեզ։ Իմ համակարգիչն այսօր շատ դանդաղ է աշխատում։ Կարո՞ղ եք օգնել ինձ։',
    targetAnswerEn: 'Can you show me what the problem is?',
    targetPronunciation: 'Քեն յու շոու մի ուաթ դը փրոբլըմ իզ։',
    targetAnswerAm: 'Կարո՞ղ եք ցույց տալ, թե ինչ խնդիր կա։',
    alternativesEn: [
      'Sure, can you show me what the problem is?',
      'Of course, let me check your computer.',
    ],
  },
  {
    id: 'vp-6',
    mode: 'conversation',
    level: 'A2',
    categoryAm: 'Ցանցային աջակցություն',
    questionEn: 'The Wi-Fi in the meeting room is not working.',
    questionPronunciation: 'Դը վայ-ֆայ ին դը միթինգ րում իզ նոթ ուըրքինգ։',
    questionAm: 'Հանդիպումների սենյակում Wi-Fi-ը չի աշխատում։',
    targetAnswerEn: 'I will restart the wireless access point right now.',
    targetPronunciation: 'Այ ուիլ րիսթարթ դը ուայըրլես էքսես փոյնթ րայթ նաու։',
    targetAnswerAm: 'Ես հենց հիմա կվերագործարկեմ անլար հասանելիության կետը։',
    alternativesEn: [
      'I will restart the router right now.',
      'Let me check the wireless access point.',
    ],
  },
  {
    id: 'vp-7',
    mode: 'conversation',
    level: 'B1',
    categoryAm: 'Հեռավար միացում',
    questionEn: 'I cannot open my Outlook email on my laptop.',
    questionPronunciation: 'Այ քենոթ օուփըն մայ Աութլուք իմեյլ օն մայ լեփթոփ։',
    questionAm: 'Ես չեմ կարողանում բացել Outlook էլ․ փոստը իմ նոութբուքի վրա։',
    targetAnswerEn: 'I will connect to your laptop remotely to check the account settings.',
    targetPronunciation: 'Այ ուիլ քընեքթ թու յուր լեփթոփ րիմոութլի թու չեք դի ըքաունթ սեթինգզ։',
    targetAnswerAm: 'Ես հեռավար կմիանամ Ձեր նոութբուքին՝ հաշվի կարգավորումները ստուգելու համար։',
    alternativesEn: [
      'I will connect remotely to check your settings.',
      'Let me connect to your computer remotely.',
    ],
  },
  {
    id: 'vp-8',
    mode: 'conversation',
    level: 'B1',
    categoryAm: 'Գաղտնաբառի վերականգնում',
    questionEn: 'My Active Directory account is locked after three wrong attempts.',
    questionPronunciation: 'Մայ Էքթիվ Դայրեքթըրի ըքաունթ իզ լոքթ աֆթըր թրի րոնգ ըթեմփթս։',
    questionAm: 'Իմ Active Directory հաշիվը արգելափակվել է երեք սխալ փորձից հետո։',
    targetAnswerEn: 'I have unlocked your account and sent you a temporary password.',
    targetPronunciation: 'Այ հեվ անլոքթ յուր ըքաունթ ընդ սենթ յու ը թեմփըրերի փասուըրդ։',
    targetAnswerAm: 'Ես ապաարգելափակել եմ Ձեր հաշիվը և ուղարկել ժամանակավոր գաղտնաբառ։',
    alternativesEn: [
      'I unlocked your account and reset your password.',
      'I will unlock your account right now.',
    ],
  },
  {
    id: 'vp-9',
    mode: 'conversation',
    level: 'B2',
    categoryAm: 'Սերվերի տեխնիկական սպասարկում',
    questionEn: 'When can we install the security updates on the main server?',
    questionPronunciation: 'Ուեն քեն ուի ինսթոլ դը սիքյուրիթի ափդեյթս օն դը մեյն սըրվըր։',
    questionAm: 'Ե՞րբ կարող ենք տեղադրել անվտանգության թարմացումները գլխավոր սերվերի վրա։',
    targetAnswerEn: 'We should schedule the update for Friday night after working hours.',
    targetPronunciation: 'Ուի շուդ սքեջուլ դի ափդեյթ ֆոր Ֆրայդեյ նայթ աֆթըր ուըրքինգ աուըրզ։',
    targetAnswerAm: 'Մենք պետք է թարմացումը պլանավորենք ուրբաթ գիշերը՝ աշխատանքային ժամերից հետո։',
    alternativesEn: [
      'Let us schedule the update for Friday night.',
      'We can install the updates after working hours.',
    ],
  },
  {
    id: 'vp-10',
    mode: 'conversation',
    level: 'C1',
    categoryAm: 'Տեխնիկական խնդրի բացատրություն ղեկավարությանը',
    questionEn: 'What caused the brief network outage this morning?',
    questionPronunciation: 'Ուաթ քոզդ դը բրիֆ նեթուըրք աութիջ դիս մորնինգ։',
    questionAm: 'Ի՞նչն էր այս առավոտվա կարճատև ցանցային խափանման պատճառը։',
    targetAnswerEn: 'The outage was caused by a faulty switch, which we have already replaced.',
    targetPronunciation: 'Դի աութիջ ուոզ քոզդ բայ ը ֆոլթի սուիչ, ուիչ ուի հեվ օլրեդի րիփլեյսթ։',
    targetAnswerAm: 'Խափանումն առաջացել էր անսարք սويչի պատճառով, որը մենք արդեն փոխարինել ենք։',
    alternativesEn: [
      'A faulty network switch caused the outage, and we replaced it.',
    ],
  },
];

export interface TeacherCurriculumQuestion {
  profession?: ProfessionId;
  id: string;
  difficulty: number; // 1 to 10
  level: CEFRLevel;
  topic: string;
  skill: SkillType;
  questionEn: string;
  questionPronunciation: string;
  questionAm: string;
  idealSentenceEn: string;
  idealPronunciation: string;
  acceptedFullSentences: string[];
  requiredKeywords: string[];
  shortFragmentPatterns: {
    pattern: RegExp;
    correctedEn: string;
    explanationAm: string;
  }[];
  defaultExplanationAm: string;
}

export const TEACHER_CURRICULUM: TeacherCurriculumQuestion[] = [
  {
    id: 'tq-1',
    difficulty: 1,
    level: 'A1',
    topic: 'IT Troubleshooting',
    skill: 'writing',
    questionEn: 'What do you do if the internet is not working?',
    questionPronunciation: 'Ուաթ դու յու դու իֆ դի ինթըրնեթ իզ նոթ ուըրքինգ։',
    questionAm: 'Ի՞նչ եք անում, եթե ինտերնետը չի աշխատում։',
    idealSentenceEn: 'I restart the router.',
    idealPronunciation: 'Այ րիսթարթ դը րաութըր։',
    acceptedFullSentences: [
      'I restart the router.',
      'I check the router and restart it.',
      'I check the network cable and restart the router.',
      'I reboot the router.',
    ],
    requiredKeywords: ['restart', 'router', 'check', 'cable', 'reboot', 'modem'],
    shortFragmentPatterns: [
      {
        pattern: /^(restart|reboot)\s+(the\s+)?router\.?$/i,
        correctedEn: 'I restart the router.',
        explanationAm: 'Անգլերենում պատմողական նախադասության մեջ պարտադիր պետք է նշել ենթական («I») և որոշիչ հոդը («the router»)։',
      },
      {
        pattern: /^i\s+(restart|reboot)\s+router\.?$/i,
        correctedEn: 'I restart the router.',
        explanationAm: 'Շատ լավ է, պարզապես «router» գոյականից առաջ անհրաժեշտ է «the» որոշիչ հոդը՝ «I restart the router.»։',
      },
    ],
    defaultExplanationAm: 'Ամբողջական նախադասություն կազմելու համար սկսեք «I» ենթակայով, օրինակ՝ «I restart the router.» (Ես վերագործարկում եմ երթուղիչը)։',
  },
  {
    id: 'tq-2',
    difficulty: 2,
    level: 'A1',
    topic: 'Work Schedule',
    skill: 'writing',
    questionEn: 'Which days of the week do you work?',
    questionPronunciation: 'Ուիչ դեյզ օվ դը ուիք դու յու ուըրք։',
    questionAm: 'Շաբաթվա ո՞ր օրերին եք դուք աշխատում։',
    idealSentenceEn: 'I work from Monday to Friday.',
    idealPronunciation: 'Այ ուըրք ֆրոմ Մանդեյ թու Ֆրայդեյ։',
    acceptedFullSentences: [
      'I work from Monday to Friday.',
      'I work as an IT specialist from Monday to Friday.',
      'I work five days a week from Monday to Friday.',
    ],
    requiredKeywords: ['monday', 'friday', 'work', 'every day', 'week'],
    shortFragmentPatterns: [
      {
        pattern: /^(from\s+)?monday\s+(to|-)\s+friday\.?$/i,
        correctedEn: 'I work from Monday to Friday.',
        explanationAm: 'Կարճ պատասխանը հասկանալի է, բայց լիարժեք նախադասության համար ավելացրեք «I work» սկզբում՝ «I work from Monday to Friday.»։',
      },
    ],
    defaultExplanationAm: 'Օրերի միջակայքը նշելու համար օգտագործեք «from Monday to Friday» կառույցը՝ «I work from Monday to Friday.»։',
  },
  {
    id: 'tq-3',
    difficulty: 3,
    level: 'A2',
    topic: 'Daily Routine & Prepositions',
    skill: 'writing',
    questionEn: 'How do you usually go to work or go home?',
    questionPronunciation: 'Հաու դու յու յուժուըլի գոու թու ուըրք օր գոու հոում։',
    questionAm: 'Ինչպե՞ս եք սովորաբար գնում աշխատանքի կամ տուն։',
    idealSentenceEn: 'I go to work by car, and I go home at six o’clock.',
    idealPronunciation: 'Այ գոու թու ուըրք բայ քար, ընդ այ գոու հոում էթ սիքս օքլոք։',
    acceptedFullSentences: [
      'I go to work by car.',
      'I go home by car.',
      'I go to work by bus.',
      'I go to the office by metro.',
      'I work from home.',
    ],
    requiredKeywords: ['car', 'bus', 'metro', 'walk', 'taxi', 'home', 'foot'],
    shortFragmentPatterns: [
      {
        pattern: /my\s+car/i,
        correctedEn: 'I go home by car. (կամ՝ I go in my car.)',
        explanationAm: 'Տրանսպորտային միջոցի հետ օգտագործվում է «by car» (առանց my/the) կամ «in my car»։ Նաև հիշեք՝ «go home» (առանց «to»)։',
      },
      {
        pattern: /go\s+to\s+home/i,
        correctedEn: 'I go home by car.',
        explanationAm: '«home» բառից առաջ «to» նախդիրը չի դրվում․ ճիշտ է՝ «I go home»։',
      },
    ],
    defaultExplanationAm: 'Տրանսպորտով տեղաշարժվելիս օգտագործեք «by car / by bus / by metro», իսկ «home»-ից առաջ «to» մի դրեք։',
  },
  {
    id: 'tq-4',
    difficulty: 4,
    level: 'A2',
    topic: 'Helpdesk Conversation',
    skill: 'speaking',
    questionEn: 'An employee says: "My screen is black." What question do you ask first?',
    questionPronunciation: 'Էն իմփլոյի սեյզ՝ «Մայ սքրին իզ բլեք»։ Ուաթ քուեսչըն դու յու ասք ֆըրսթ։',
    questionAm: 'Աշխատակիցն ասում է․ «Էկրանս սև է»։ Ի՞նչ հարց կտաք առաջին հերթին։',
    idealSentenceEn: 'Can you check if the monitor power cable is plugged in?',
    idealPronunciation: 'Քեն յու չեք իֆ դը մոնիթըր փաուըր քեյբըլ իզ փլագդ ին։',
    acceptedFullSentences: [
      'Can you show me what the problem is?',
      'Is the monitor turned on?',
      'Can you check the power cable?',
      'Can you check if the monitor power cable is plugged in?',
      'Have you tried restarting your computer?',
    ],
    requiredKeywords: ['cable', 'power', 'monitor', 'show', 'problem', 'turned on', 'plugged', 'restart'],
    shortFragmentPatterns: [
      {
        pattern: /^check\s+(the\s+)?cable\.?$/i,
        correctedEn: 'Can you please check the power cable?',
        explanationAm: 'Աշխատակցի հետ քաղաքավարի խոսելու համար հրամայականի փոխարեն օգտագործեք «Can you please check...»։',
      },
    ],
    defaultExplanationAm: 'Հարցը քաղաքավարի ձևակերպելու համար սկսեք «Can you check...» կամ «Can you show me what the problem is?» արտահայտությամբ։',
  },
  {
    id: 'tq-5',
    difficulty: 5,
    level: 'B1',
    topic: 'Active Directory & Accounts',
    skill: 'writing',
    questionEn: 'A colleague cannot log in because their password expired. How do you explain what you will do?',
    questionPronunciation: 'Ը քոլիգ քենոթ լոգ ին բիքոզ դեըր փասուըրդ իքսփայըրդ։ Հաու դու յու իքսփլեյն ուաթ յու ուիլ դու։',
    questionAm: 'Գործընկերը չի կարողանում մուտք գործել, քանի որ գաղտնաբառի ժամկետը լրացել է։ Ինչպե՞ս կբացատրեք, թե ինչ եք անելու։',
    idealSentenceEn: 'I will reset your password in Active Directory and send you a temporary one.',
    idealPronunciation: 'Այ ուիլ րիսեթ յուր փասուըրդ ին Էքթիվ Դայրեքթըրի ընդ սենդ յու ը թեմփըրերի ուան։',
    acceptedFullSentences: [
      'I will reset your password in Active Directory.',
      'I will reset your password right now.',
      'I will reset your password and send you a temporary password.',
      'I will unlock your account and reset your password.',
    ],
    requiredKeywords: ['reset', 'password', 'change', 'temporary', 'unlock', 'active directory'],
    shortFragmentPatterns: [
      {
        pattern: /^(i\s+)?reset\s+password\.?$/i,
        correctedEn: 'I will reset your password right now.',
        explanationAm: 'Ապագայում (հենց հիմա) կատարվելիք խոստման համար օգտագործեք «I will reset your password»։',
      },
    ],
    defaultExplanationAm: 'Օգտատիրոջը գործողության մասին տեղեկացնելիս օգտագործեք «I will + բայ» (օր.՝ «I will reset your password in Active Directory.»)։',
  },
  {
    id: 'tq-6',
    difficulty: 6,
    level: 'B1',
    topic: 'Network & DNS Troubleshooting',
    skill: 'writing',
    questionEn: 'A user can ping an IP address, but websites do not open by name. What is the problem and solution?',
    questionPronunciation: 'Ը յուզըր քեն փինգ էն այ փի ըդրես, բաթ ուեբսայթս դու նոթ օուփըն բայ նեյմ։ Ուաթ իզ դը փրոբլըմ ընդ սըլուշըն։',
    questionAm: 'Օգտատերը կարողանում է ping անել IP հասցեն, բայց կայքերը անունով չեն բացվում։ Ո՞րն է խնդիրը և լուծումը։',
    idealSentenceEn: 'It is a DNS issue, so we need to check the DNS server and flush the DNS cache.',
    idealPronunciation: 'Իթ իզ ը դի էն էս իշու, սոու ուի նիդ թու չեք դը դի էն էս սըրվըր ընդ ֆլաշ դը դի էն էս քեշ։',
    acceptedFullSentences: [
      'It is a DNS problem, so I will flush the DNS cache.',
      'There is a DNS issue, and we need to check the DNS settings.',
      'It is a DNS issue, so we need to check the DNS server and flush the DNS cache.',
    ],
    requiredKeywords: ['dns', 'cache', 'flush', 'server', 'settings', 'resolve'],
    shortFragmentPatterns: [
      {
        pattern: /^(dns|dns\s+problem|flush\s+dns)\.?$/i,
        correctedEn: 'It is a DNS problem, so we need to flush the DNS cache.',
        explanationAm: 'Տեխնիկապես ճիշտ եք, իսկ ամբողջական նախադասությամբ կլինի՝ «It is a DNS problem, so we need to flush the DNS cache.»։',
      },
    ],
    defaultExplanationAm: 'Խնդիրը և լուծումը կապելու համար օգտագործեք «so we need to...» կառույցը՝ «It is a DNS issue, so we need to flush the DNS cache.»։',
  },
  {
    id: 'tq-7',
    difficulty: 7,
    level: 'B2',
    topic: 'Professional Experience & Interviews',
    skill: 'speaking',
    questionEn: 'How long have you been working in your field, and what are your main responsibilities?',
    questionPronunciation: 'Հաու լոնգ հեվ յու բին ուըրքինգ ին յուր ֆիլդ, ընդ ուաթ ար յուր մեյն րիսփոնսիբիլիթիզ։',
    questionAm: 'Որքա՞ն ժամանակ է, ինչ աշխատում եք Ձեր ոլորտում, և որո՞նք են Ձեր հիմնական պարտականությունները։',
    idealSentenceEn: 'I have been working in IT for three years, and I manage networks and user support.',
    idealPronunciation: 'Այ հեվ բին ուըրքինգ ին այ թի ֆոր թրի յիրզ, ընդ այ մենիջ նեթուըրքս ընդ յուզըր սըփորթ։',
    acceptedFullSentences: [
      'I have been working in IT for three years, and I manage networks and user support.',
      'I have worked as an IT specialist for two years, and I support users and servers.',
    ],
    requiredKeywords: ['have', 'work', 'years', 'manage', 'support', 'network', 'server', 'system'],
    shortFragmentPatterns: [
      {
        pattern: /i\s+am\s+working\s+.*(for|since)\s+\d+/i,
        correctedEn: 'I have been working in IT for three years.',
        explanationAm: 'Երբ նշում եք՝ քանի տարի է աշխատում եք (և շարունակում եք), «I am working»-ի փոխարեն օգտագործեք «I have been working ... for ... years»։',
      },
    ],
    defaultExplanationAm: 'Փորձի տևողությունը նշելու համար օգտագործեք «I have been working in IT for ... years, and I manage ...»։',
  },
  {
    id: 'tq-8',
    difficulty: 8,
    level: 'C1',
    topic: 'Incident Reporting & Complex Sentences',
    skill: 'writing',
    questionEn: 'How would you explain to management why you scheduled a server reboot for midnight?',
    questionPronunciation: 'Հաու ուուդ յու իքսփլեյն թու մենիջմընթ ուայ յու սքեջուլդ ը սըրվըր րիբութ ֆոր միդնայթ։',
    questionAm: 'Ինչպե՞ս կբացատրեք ղեկավարությանը, թե ինչու եք սերվերի վերագործարկումը պլանավորել կեսգիշերին։',
    idealSentenceEn: 'We scheduled the server reboot for midnight so that it would not interrupt employees during working hours.',
    idealPronunciation: 'Ուի սքեջուլդ դը սըրվըր րիբութ ֆոր միդնայթ սոու դեթ իթ ուուդ նոթ ինթըրափթ իմփլոյիզ դյուրինգ ուըրքինգ աուըրզ։',
    acceptedFullSentences: [
      'We scheduled the server reboot for midnight so that it would not interrupt employees during working hours.',
      'We scheduled it for midnight to avoid any downtime during working hours.',
    ],
    requiredKeywords: ['midnight', 'schedule', 'working hours', 'avoid', 'interrupt', 'downtime', 'affect', 'users', 'employees'],
    shortFragmentPatterns: [],
    defaultExplanationAm: 'Նպատակը գրագետ հիմնավորելու համար օգտագործեք «so that it does not affect...» կամ «in order to avoid downtime during working hours»։',
  },
  ...PROFESSIONAL_DIALOGUES.map((d, i): TeacherCurriculumQuestion => ({
    id: d.id, profession: d.profession, difficulty: Math.min(8, 1 + (i % 10)), level: d.level,
    topic: d.profession + ' · ' + d.title, skill: 'writing', questionEn: d.question[0],
    questionPronunciation: d.question[1], questionAm: d.question[2], idealSentenceEn: d.answer[0],
    idealPronunciation: d.answer[1], acceptedFullSentences: [d.answer[0]], requiredKeywords: [],
    shortFragmentPatterns: [], defaultExplanationAm: 'Օրինակելի պատասխանը՝ ' + d.answer[2] + ' Համեմատեք բառերի հերթականությունն ու բայի ձևը։',
  })),
];

