import { ADDITIONAL_EXERCISES } from './additional-lessons';
import { ExerciseItem } from '../lib/types';

export const EXERCISE_ITEMS: ExerciseItem[] = [
  // ============================================================================
  // EXERCISE A — FILL IN THE BLANK ('fill-blank') — ex-1 to ex-18
  // ============================================================================
  {
    id: 'ex-1',
    type: 'fill-blank',
    level: 'A1',
    skill: 'reading',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'I wake up at ___ in the morning.',
    promptAm: 'Ես արթնանում եմ առավոտյան ժամը յոթին։ (Լրացրեք բաց թողնված բառը՝ seven)',
    correctAnswer: 'seven',
    acceptedAnswers: [
      'seven',
      '7',
      '7:00',
      'seven o\'clock',
      'I wake up at seven in the morning.',
      'I wake up at 7 in the morning.',
      'I wake up at seven o\'clock in the morning.'
    ],
    hintAm: '«Յոթ» անգլերեն՝ seven (կարող եք գրել նաև ամբողջ նախադասությունը)։',
    explanationAm: 'Ժամերի հետ օգտագործում ենք «at» նախդիրը՝ at seven (ժամը յոթին), իսկ օրվա հատվածների հետ՝ «in the morning»։'
  },
  {
    id: 'ex-2',
    type: 'fill-blank',
    level: 'A1',
    skill: 'reading',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'We have a team meeting ___ Monday.',
    promptAm: 'Մենք թիմային հանդիպում ունենք երկուշաբթի օրը։',
    correctAnswer: 'on',
    acceptedAnswers: [
      'on',
      'every',
      'this',
      'next',
      'We have a team meeting on Monday.',
      'We have a team meeting every Monday.'
    ],
    hintAm: 'Շաբաթվա օրերի հետ ո՞ր նախդիրն է օգտագործվում (in / on / at)։',
    explanationAm: 'Շաբաթվա բոլոր օրերի (Monday, Tuesday և այլն) առջև անգլերենում միշտ դրվում է «on» նախդիրը։'
  },
  {
    id: 'ex-3',
    type: 'fill-blank',
    level: 'A1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'She ___ as a system administrator at our company.',
    promptAm: 'Նա աշխատում է որպես համակարգային ադմինիստրատոր մեր ընկերությունում։',
    correctAnswer: 'works',
    acceptedAnswers: [
      'works',
      'is working',
      'She works as a system administrator at our company.',
      'She is working as a system administrator at our company.'
    ],
    hintAm: 'Եզակի երրորդ դեմքի (He / She / It) դեպքում բային ավելանում է -s վերջավորությունը։',
    explanationAm: 'Present Simple ժամանակաձևում «she» դերանվան հետ «work» բայը ստանում է «-s» վերջավորություն՝ «works»։'
  },
  {
    id: 'ex-4',
    type: 'fill-blank',
    level: 'A1',
    skill: 'reading',
    category: 'Քերականություն',
    promptEn: 'I usually go to work ___ bus.',
    promptAm: 'Ես սովորաբար աշխատանքի եմ գնում ավտոբուսով։',
    correctAnswer: 'by',
    acceptedAnswers: [
      'by',
      'I usually go to work by bus.',
      'I usually go to work by bus'
    ],
    hintAm: 'Տրանսպորտային միջոցների հետ օգտագործվում է «by» նախդիրը։',
    explanationAm: 'Երբ նշում ենք տրանսպորտի տեսակը (bus, car, train, metro), օգտագործում ենք «by» նախդիրը առանց հոդի՝ by bus։'
  },
  {
    id: 'ex-5',
    type: 'fill-blank',
    level: 'A2',
    skill: 'reading',
    category: 'IT Անգլերեն',
    promptEn: 'Please ___ your computer after installing the update.',
    promptAm: 'Խնդրում եմ վերագործարկեք ձեր համակարգիչը թարմացումը տեղադրելուց հետո։',
    correctAnswer: 'restart',
    acceptedAnswers: [
      'restart',
      'reboot',
      'Please restart your computer after installing the update.',
      'Please reboot your computer after installing the update.'
    ],
    hintAm: '«Վերագործարկել» անգլերեն՝ restart կամ reboot։',
    explanationAm: 'Տեխնիկական աջակցության ժամանակ համակարգիչը վերագործարկելու համար օգտագործվում են «restart» կամ «reboot» բայերը։'
  },
  {
    id: 'ex-6',
    type: 'fill-blank',
    level: 'A2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'I cannot connect ___ the office Wi-Fi network.',
    promptAm: 'Ես չեմ կարողանում միանալ գրասենյակի Wi-Fi ցանցին։',
    correctAnswer: 'to',
    acceptedAnswers: [
      'to',
      'I cannot connect to the office Wi-Fi network.',
      'I can\'t connect to the office Wi-Fi network.'
    ],
    hintAm: '«Connect» բայի հետ միշտ օգտագործվում է ուղղություն ցույց տվող նախդիր։',
    explanationAm: 'Անգլերենում «միանալ ինչ-որ բանի» ասելիս օգտագործում ենք «connect to» կառույցը (օրինակ՝ connect to the server / network)։'
  },
  {
    id: 'ex-7',
    type: 'fill-blank',
    level: 'A2',
    skill: 'reading',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Our company was founded ___ 2018.',
    promptAm: 'Մեր ընկերությունը հիմնադրվել է 2018 թվականին։',
    correctAnswer: 'in',
    acceptedAnswers: [
      'in',
      'Our company was founded in 2018.',
      'Our company was founded in 2018'
    ],
    hintAm: 'Տարեթվերի և ամիսների հետ օգտագործվում է «in» նախդիրը։',
    explanationAm: 'Ամիսների, տարիների և դարերի հետ ժամանակ նշելիս միշտ օգտագործում ենք «in» նախդիրը (in May, in 2018)։'
  },
  {
    id: 'ex-8',
    type: 'fill-blank',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Let me ___ your IP address and DNS settings.',
    promptAm: 'Թույլ տվեք ստուգել ձեր IP հասցեն և DNS կարգավորումները։',
    correctAnswer: 'check',
    acceptedAnswers: [
      'check',
      'verify',
      'inspect',
      'Let me check your IP address and DNS settings.',
      'Let me verify your IP address and DNS settings.'
    ],
    hintAm: '«Ստուգել» անգլերեն՝ check կամ verify։',
    explanationAm: '«Let me + բայի ուղիղ ձև» կառույցը (օրինակ՝ Let me check) շատ քաղաքավարի և բնական արտահայտություն է IT մասնագետի համար։'
  },
  {
    id: 'ex-9',
    type: 'fill-blank',
    level: 'B1',
    skill: 'reading',
    category: 'Քերականություն',
    promptEn: 'Have you ___ restarted the router today?',
    promptAm: 'Դուք այսօր արդեն վերագործարկե՞լ եք ռոութերը։',
    correctAnswer: 'already',
    acceptedAnswers: [
      'already',
      'ever',
      'Have you already restarted the router today?',
      'Have you ever restarted the router today?'
    ],
    hintAm: '«Արդեն» բառը Present Perfect ժամանակաձևում՝ already։',
    explanationAm: 'Present Perfect ժամանակաձևում «already» (արդեն) մակբայը դրվում է հիմնական բայից առաջ՝ գործողության ավարտված լինելը շեշտելու համար։'
  },
  {
    id: 'ex-10',
    type: 'fill-blank',
    level: 'B1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'I am looking ___ to hearing from you soon.',
    promptAm: 'Անհամբեր սպասում եմ ձեզանից շուտով պատասխան ստանալուն։',
    correctAnswer: 'forward',
    acceptedAnswers: [
      'forward',
      'I am looking forward to hearing from you soon.',
      'I\'m looking forward to hearing from you soon.'
    ],
    hintAm: 'Գործնական նամակների հայտնի արտահայտություն՝ look ___ to։',
    explanationAm: '«Look forward to + բայ (-ing)» կառույցը նշանակում է «անհամբեր սպասել» և լայնորեն կիրառվում է գործնական էլ. նամակների վերջում։'
  },
  {
    id: 'ex-11',
    type: 'fill-blank',
    level: 'B1',
    skill: 'reading',
    category: 'Ճանապարհորդություն',
    promptEn: 'Could you tell me where the boarding ___ is?',
    promptAm: 'Կարո՞ղ եք ասել՝ որտեղ է նստեցման ելքը (դարպասը)։',
    correctAnswer: 'gate',
    acceptedAnswers: [
      'gate',
      'area',
      'Could you tell me where the boarding gate is?',
      'Could you tell me where the boarding area is?'
    ],
    hintAm: 'Օդանավակայանում նստեցման ելքը կոչվում է boarding ___։',
    explanationAm: 'Օդանավակայանում ինքնաթիռ նստելու ելքը կոչվում է «boarding gate», իսկ նստեցման կտրոնը՝ «boarding pass»։'
  },
  {
    id: 'ex-12',
    type: 'fill-blank',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'I have reset your password in Active ___ and unlocked your account.',
    promptAm: 'Ես զրոյացրել եմ ձեր գաղտնաբառը Active Directory-ում և ապաբլոկավորել ձեր հաշիվը։',
    correctAnswer: 'Directory',
    acceptedAnswers: [
      'Directory',
      'directory',
      'I have reset your password in Active Directory and unlocked your account.',
      'I\'ve reset your password in Active Directory and unlocked your account.'
    ],
    hintAm: 'Microsoft-ի օգտատերերի կառավարման համակարգը՝ Active ___։',
    explanationAm: 'Active Directory (AD) համակարգում IT ադմինիստրատորները կառավարում են օգտատերերի հաշիվները (user accounts), գաղտնաբառերը և խմբային քաղաքականությունները (Group Policy)։'
  },
  {
    id: 'ex-13',
    type: 'fill-blank',
    level: 'B2',
    skill: 'reading',
    category: 'Քերականություն',
    promptEn: 'If the server ___ down again, we will switch to the backup system.',
    promptAm: 'Եթե սերվերը կրկին անջատվի (խափանվի), մենք կանցնենք պահուստային համակարգին։',
    correctAnswer: 'goes',
    acceptedAnswers: [
      'goes',
      'is',
      'shuts',
      'If the server goes down again, we will switch to the backup system.',
      'If the server is down again, we will switch to the backup system.'
    ],
    hintAm: 'Առաջին պայմանական նախադասության (First Conditional) «if» մասում օգտագործվում է Present Simple (go down -> goes down)։',
    explanationAm: 'First Conditional-ում «if»-ով սկսվող երկրորդական նախադասության մեջ ապագայի փոխարեն օգտագործվում է Present Simple՝ «If the server goes down...»։'
  },
  {
    id: 'ex-14',
    type: 'fill-blank',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'The printer is not working because there is a paper ___ inside the tray.',
    promptAm: 'Տպիչը չի աշխատում, որովհետև սկուտեղի ներսում թղթի խցանում կա։',
    correctAnswer: 'jam',
    acceptedAnswers: [
      'jam',
      'The printer is not working because there is a paper jam inside the tray.',
      'The printer isn\'t working because there is a paper jam inside the tray.'
    ],
    hintAm: 'Տպիչի մեջ թղթի լռվելը (խցանումը) անգլերեն կոչվում է paper ___։',
    explanationAm: '«Paper jam» տերմինը նշանակում է տպիչի մեջ թղթի խցանում, իսկ «out of toner» նշանակում է, որ ներկը վերջացել է։'
  },
  {
    id: 'ex-15',
    type: 'fill-blank',
    level: 'C1',
    skill: 'reading',
    category: 'IT Անգլերեն',
    promptEn: 'We need to configure a ___ on the switch to separate guest traffic from the internal network.',
    promptAm: 'Մենք պետք է կարգավորենք VLAN կոմուտատորի (switch-ի) վրա՝ հյուրերի տրաֆիկը ներքին ցանցից առանձնացնելու համար։',
    correctAnswer: 'VLAN',
    acceptedAnswers: [
      'VLAN',
      'vlan',
      'virtual LAN',
      'firewall rule',
      'We need to configure a VLAN on the switch to separate guest traffic from the internal network.'
    ],
    hintAm: 'Վիրտուալ լոկալ ցանցի հապավումը՝ V___։',
    explanationAm: 'VLAN (Virtual Local Area Network) տեխնոլոգիան թույլ է տալիս մեկ ֆիզիկական switch-ի վրա տրամաբանորեն առանձնացնել տարբեր ցանցային տիրույթներ։'
  },
  {
    id: 'ex-16',
    type: 'fill-blank',
    level: 'C1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Had we known about the firmware bug earlier, we would have ___ the deployment.',
    promptAm: 'Եթե մենք ավելի վաղ իմանայինք ծրագրային սխալի մասին, մենք կհետաձգեինք ներդրումը (deployment-ը)։',
    correctAnswer: 'postponed',
    acceptedAnswers: [
      'postponed',
      'delayed',
      'canceled',
      'cancelled',
      'stopped',
      'Had we known about the firmware bug earlier, we would have postponed the deployment.',
      'Had we known about the firmware bug earlier, we would have delayed the deployment.'
    ],
    hintAm: '«Հետաձգել» բայի երրորդ ձևը (Past Participle)՝ postponed կամ delayed։',
    explanationAm: 'Third Conditional-ի շրջուն (ինվերսիոն) ձևում՝ «Had we known..., we would have + V3», օգտագործվում է բայի երրորդ ձևը՝ անցյալում չիրականացած պայման նկարագրելու համար։'
  },
  {
    id: 'ex-17',
    type: 'fill-blank',
    level: 'C2',
    skill: 'reading',
    category: 'IT Անգլերեն',
    promptEn: 'To prevent single points of failure, we implemented high ___ across all critical database servers.',
    promptAm: 'Խափանման եզակի կետերը կանխելու համար մենք ներդրեցինք բարձր հասանելիություն (high availability) բոլոր կրիտիկական տվյալների բազայի սերվերներում։',
    correctAnswer: 'availability',
    acceptedAnswers: [
      'availability',
      'redundancy',
      'resilience',
      'To prevent single points of failure, we implemented high availability across all critical database servers.'
    ],
    hintAm: 'IT ճարտարապետության մեջ HA հապավումը բացվում է որպես High ___։',
    explanationAm: '«High availability» (HA) և «redundancy» տերմինները նկարագրում են համակարգի անխափան աշխատանքը նույնիսկ առանձին հանգույցների խափանման դեպքում։'
  },
  {
    id: 'ex-18',
    type: 'fill-blank',
    level: 'C2',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Not only ___ he resolve the outage within ten minutes, but he also documented the root cause.',
    promptAm: 'Նա ոչ միայն լուծեց խափանումը տասը րոպեի ընթացքում, այլև փաստաթղթավորեց հիմնական պատճառը։',
    correctAnswer: 'did',
    acceptedAnswers: [
      'did',
      'Not only did he resolve the outage within ten minutes, but he also documented the root cause.'
    ],
    hintAm: 'Երբ նախադասությունը սկսվում է «Not only»-ով, կիրառվում է հարցական շրջուն շարադասություն (ինվերսիա) անցյալ ժամանակով։',
    explanationAm: '«Not only»-ով սկսվող նախադասություններում շեշտադրման համար կիրառվում է ինվերսիա՝ օժանդակ բայը (did) դրվում է ենթակայից (he) առաջ։'
  },

  // ============================================================================
  // EXERCISE B — TRANSLATE TO ENGLISH ('translate') — ex-19 to ex-36
  // ============================================================================
  {
    id: 'ex-19',
    type: 'translate',
    level: 'A1',
    skill: 'writing',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Translate into English:',
    promptAm: 'Ես ավարտում եմ աշխատանքը ժամը վեցին։',
    correctAnswer: 'I finish work at six o\'clock.',
    acceptedAnswers: [
      'I finish work at six o\'clock.',
      'I finish work at 6 o\'clock.',
      'I finish work at six.',
      'I finish work at 6.',
      'I finish my work at six o\'clock.',
      'I finish my work at 6.'
    ],
    hintAm: 'Օգտագործեք «finish work» և «at six o\'clock» (կամ «at 6»)։',
    explanationAm: 'Առօրյա գործողությունների համար օգտագործում ենք Present Simple, իսկ ժամից առաջ՝ «at» նախդիրը։'
  },
  {
    id: 'ex-20',
    type: 'translate',
    level: 'A1',
    skill: 'writing',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Translate into English:',
    promptAm: 'Այսօր չորեքշաբթի է։',
    correctAnswer: 'Today is Wednesday.',
    acceptedAnswers: [
      'Today is Wednesday.',
      'It is Wednesday today.',
      'It\'s Wednesday today.',
      'Today\'s Wednesday.'
    ],
    hintAm: '«Չորեքշաբթի» անգլերեն գրվում է Wednesday (ուշադրություն դարձրեք d տառին)։',
    explanationAm: 'Շաբաթվա օրերը անգլերենում միշտ գրվում են մեծատառով՝ Monday, Tuesday, Wednesday...'
  },
  {
    id: 'ex-21',
    type: 'translate',
    level: 'A1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Translate into English:',
    promptAm: 'Ես IT մասնագետ եմ։',
    correctAnswer: 'I am an IT specialist.',
    acceptedAnswers: [
      'I am an IT specialist.',
      'I\'m an IT specialist.',
      'I am an IT professional.',
      'I\'m an IT professional.',
      'I work as an IT specialist.'
    ],
    hintAm: 'Մասնագիտություն նշելիս մի մոռացեք «an» անորոշ հոդը (քանի որ IT-ն արտասանվում է «այ-թի»՝ ձայնավորով)։',
    explanationAm: 'Անգլերենում մասնագիտություն նշելիս պարտադիր օգտագործվում է «a» կամ «an» հոդը՝ «I am an IT specialist»։'
  },
  {
    id: 'ex-22',
    type: 'translate',
    level: 'A2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Իմ համակարգիչը շատ դանդաղ է աշխատում։',
    correctAnswer: 'My computer is working very slowly.',
    acceptedAnswers: [
      'My computer is working very slowly.',
      'My computer works very slowly.',
      'My computer is running very slowly.',
      'My computer is very slow.',
      'My PC is running very slowly.',
      'My PC is very slow.'
    ],
    hintAm: 'Կարող եք օգտագործել «My computer is running very slowly» կամ «My computer is very slow»։',
    explanationAm: 'Համակարգչի կամ ծրագրի աշխատանքի մասին խոսելիս անգլերենում հաճախ օգտագործվում է «run» բայը՝ «My computer is running slowly»։'
  },
  {
    id: 'ex-23',
    type: 'translate',
    level: 'A2',
    skill: 'writing',
    category: 'Ճանապարհորդություն',
    promptEn: 'Translate into English:',
    promptAm: 'Որտե՞ղ է մոտակա մետրոյի կայարանը։',
    correctAnswer: 'Where is the nearest metro station?',
    acceptedAnswers: [
      'Where is the nearest metro station?',
      'Where\'s the nearest metro station?',
      'Where is the nearest subway station?',
      'Where is the closest metro station?',
      'Where is the closest subway station?',
      'Where is the nearest underground station?'
    ],
    hintAm: '«Մոտակա»՝ the nearest կամ the closest, «մետրոյի կայարան»՝ metro / subway station։',
    explanationAm: 'Ուղղություն հարցնելիս օգտագործում ենք հարցական շարադասություն՝ «Where is the nearest...?»։'
  },
  {
    id: 'ex-24',
    type: 'translate',
    level: 'A2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Ես մոռացել եմ իմ գաղտնաբառը։',
    correctAnswer: 'I forgot my password.',
    acceptedAnswers: [
      'I forgot my password.',
      'I have forgotten my password.',
      'I\'ve forgotten my password.',
      'I forgot my passcode.'
    ],
    hintAm: '«Մոռանալ»՝ forget (անցյալը՝ forgot կամ have forgotten), «գաղտնաբառ»՝ password։',
    explanationAm: 'Խոսակցական անգլերենում հավասարապես կիրառելի են թե՛ «I forgot my password», թե՛ «I have forgotten my password» տարբերակները։'
  },
  {
    id: 'ex-25',
    type: 'translate',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Փորձե՞լ եք անջատել և նորից միացնել համակարգիչը։',
    correctAnswer: 'Have you tried turning your computer off and on again?',
    acceptedAnswers: [
      'Have you tried turning your computer off and on again?',
      'Have you tried turning the computer off and on again?',
      'Have you tried to turn off and turn on the computer?',
      'Did you try turning your computer off and on again?',
      'Have you tried restarting your computer?',
      'Have you tried rebooting your computer?'
    ],
    hintAm: 'IT աջակցության ամենահայտնի հարցը՝ «Have you tried turning it off and on again?» կամ «Have you tried restarting...?»։',
    explanationAm: '«Try + բայ (-ing)» կառույցը նշանակում է փորձարկել ինչ-որ մեթոդ կամ լուծում՝ տեսնելու համար, թե արդյոք այն կաշխատի։'
  },
  {
    id: 'ex-26',
    type: 'translate',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Առաջին հարկում ինտերնետ կապ չկա։',
    correctAnswer: 'There is no internet connection on the first floor.',
    acceptedAnswers: [
      'There is no internet connection on the first floor.',
      'There\'s no internet connection on the first floor.',
      'There is no internet on the first floor.',
      'The internet is down on the first floor.',
      'We have no internet connection on the first floor.'
    ],
    hintAm: 'Օգտագործեք «There is no internet connection...» և հարկերի համար «on the first floor»։',
    explanationAm: 'Շենքի հարկերի հետ միշտ օգտագործվում է «on» նախդիրը՝ on the first floor, on the second floor։'
  },
  {
    id: 'ex-27',
    type: 'translate',
    level: 'B1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Translate into English:',
    promptAm: 'Ես հիմա կստուգեմ սերվերի կարգավիճակը։',
    correctAnswer: 'I will check the server status now.',
    acceptedAnswers: [
      'I will check the server status now.',
      'I\'ll check the server status now.',
      'I will check the status of the server now.',
      'I\'ll check the status of the server right now.',
      'Let me check the server status now.'
    ],
    hintAm: 'Խոսելու պահին կայացրած որոշման կամ խոստման համար օգտագործեք «I will check...» (I\'ll check)։',
    explanationAm: 'Երբ հաճախորդին կամ գործընկերոջը խոստանում ենք հենց այդ պահին ինչ-որ բան անել, օգտագործում ենք Future Simple (will / \'ll)։'
  },
  {
    id: 'ex-28',
    type: 'translate',
    level: 'B1',
    skill: 'writing',
    category: 'Ճանապարհորդություն',
    promptEn: 'Translate into English:',
    promptAm: 'Ես ամրագրում ունեմ Արմեն Հակոբյանի անունով։',
    correctAnswer: 'I have a reservation under the name Armen Hakobyan.',
    acceptedAnswers: [
      'I have a reservation under the name Armen Hakobyan.',
      'I have a reservation under the name of Armen Hakobyan.',
      'I have a booking under the name Armen Hakobyan.',
      'I have a reservation in the name of Armen Hakobyan.'
    ],
    hintAm: '«Ամրագրում ունենալ ... անունով»՝ I have a reservation under the name...։',
    explanationAm: 'Հյուրանոցում գրանցվելիս (check-in) ամրագրման անունը նշելու համար ասում ենք «under the name...»։'
  },
  {
    id: 'ex-29',
    type: 'translate',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Խնդրում եմ բացեք հայտ (ticket) տեխնիկական աջակցության համակարգում։',
    correctAnswer: 'Please open a ticket in the helpdesk system.',
    acceptedAnswers: [
      'Please open a ticket in the helpdesk system.',
      'Please submit a ticket in the helpdesk system.',
      'Please create a ticket in the technical support system.',
      'Please log a ticket in the support system.',
      'Could you please open a ticket in the helpdesk system?'
    ],
    hintAm: '«Բացել հայտ»՝ open / create / submit a ticket, «տեխնիկական աջակցության համակարգ»՝ helpdesk / support system։',
    explanationAm: 'IT Helpdesk աշխատանքում խնդիրը գրանցելու համար օգտագործվում են «open a ticket», «create a ticket» կամ «submit a ticket» արտահայտությունները։'
  },
  {
    id: 'ex-30',
    type: 'translate',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'DHCP սերվերը ավտոմատ կերպով նշանակում է IP հասցեներ։',
    correctAnswer: 'The DHCP server automatically assigns IP addresses.',
    acceptedAnswers: [
      'The DHCP server automatically assigns IP addresses.',
      'The DHCP server assigns IP addresses automatically.',
      'A DHCP server automatically assigns IP addresses.',
      'DHCP servers automatically assign IP addresses.'
    ],
    hintAm: '«Նշանակել / հատկացնել»՝ assign, «ավտոմատ կերպով»՝ automatically։',
    explanationAm: 'Ցանցային ադմինիստրավորման մեջ IP հասցե տրամադրելու գործողությունը կոչվում է «assign an IP address»։'
  },
  {
    id: 'ex-31',
    type: 'translate',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Կարո՞ղ եմ միանալ ձեր համակարգչին հեռահար կապով՝ խնդիրը ստուգելու համար։',
    correctAnswer: 'Can I connect to your computer remotely to check the issue?',
    acceptedAnswers: [
      'Can I connect to your computer remotely to check the issue?',
      'May I connect to your computer remotely to check the problem?',
      'Could I connect to your PC remotely to check the issue?',
      'Can I access your computer remotely to check the problem?'
    ],
    hintAm: '«Հեռահար կերպով»՝ remotely, «խնդիր»՝ issue կամ problem։',
    explanationAm: '«Connect remotely» կամ «remote into your computer» արտահայտությունները ամենօրյա կիրառություն ունեն հեռահար IT աջակցության ժամանակ։'
  },
  {
    id: 'ex-32',
    type: 'translate',
    level: 'B2',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Translate into English:',
    promptAm: 'Ես հինգ տարվա փորձ ունեմ ցանցային ադմինիստրավորման ոլորտում։',
    correctAnswer: 'I have five years of experience in network administration.',
    acceptedAnswers: [
      'I have five years of experience in network administration.',
      'I have 5 years of experience in network administration.',
      'I\'ve got five years of experience in network administration.',
      'I have five years\' experience in network administration.'
    ],
    hintAm: '«Հինգ տարվա փորձ ... ոլորտում»՝ five years of experience in...։',
    explanationAm: 'Աշխատանքային հարցազրույցի ժամանակ փորձի մասին խոսելիս օգտագործում ենք «have X years of experience in [ոլորտ]» կառույցը։'
  },
  {
    id: 'ex-33',
    type: 'translate',
    level: 'C1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Մենք պետք է թարմացնենք երթուղիչի (router-ի) ներկառուցված ծրագրակազմը՝ անվտանգության խոցելիությունը շտկելու համար։',
    correctAnswer: 'We need to update the router firmware to fix the security vulnerability.',
    acceptedAnswers: [
      'We need to update the router firmware to fix the security vulnerability.',
      'We need to upgrade the router firmware to patch the security vulnerability.',
      'We have to update the router\'s firmware to fix the security vulnerability.',
      'We must update the router firmware to resolve the security vulnerability.'
    ],
    hintAm: '«Ներկառուցված ծրագրակազմ»՝ firmware, «անվտանգության խոցելիություն»՝ security vulnerability։',
    explanationAm: 'Սարքավորումների ծրագրային ապահովումը կոչվում է «firmware», իսկ խոցելիությունը շտկելը՝ «fix / patch a vulnerability»։'
  },
  {
    id: 'ex-34',
    type: 'translate',
    level: 'C1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Ցանցի խափանումը պայմանավորված էր սխալ կարգավորված DNS սերվերով։',
    correctAnswer: 'The network outage was caused by a misconfigured DNS server.',
    acceptedAnswers: [
      'The network outage was caused by a misconfigured DNS server.',
      'The network downtime was caused by a misconfigured DNS server.',
      'The network failure was caused by an incorrectly configured DNS server.'
    ],
    hintAm: '«Ցանցի խափանում»՝ network outage, «սխալ կարգավորված»՝ misconfigured։',
    explanationAm: 'Խափանման պատճառը պաշտոնական հաշվետվություններում (incident reports) նկարագրվում է «was caused by...» կրավորական կառուցվածքով։'
  },
  {
    id: 'ex-35',
    type: 'translate',
    level: 'C2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Translate into English:',
    promptAm: 'Մինչև վաղը առավոտյան մենք կավարտենք բոլոր փոստարկղերի տեղափոխումը Microsoft 365։',
    correctAnswer: 'By tomorrow morning, we will have completed the migration of all mailboxes to Microsoft 365.',
    acceptedAnswers: [
      'By tomorrow morning, we will have completed the migration of all mailboxes to Microsoft 365.',
      'By tomorrow morning we will have migrated all mailboxes to Microsoft 365.',
      'We will have completed migrating all mailboxes to Microsoft 365 by tomorrow morning.',
      'By tomorrow morning, we\'ll have finished migrating all mailboxes to Microsoft 365.'
    ],
    hintAm: 'Օգտագործեք Future Perfect ժամանակաձևը (will have completed / migrated) և «migration of all mailboxes»։',
    explanationAm: 'Ապագայի կոնկրետ պահից առաջ ավարտվող գործողությունը (By tomorrow morning) արտահայտվում է Future Perfect (will have + V3) ժամանակաձևով։'
  },
  {
    id: 'ex-36',
    type: 'translate',
    level: 'C2',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Translate into English:',
    promptAm: 'Չնայած սեղմ ժամկետներին՝ մեր ինժեներական թիմը կարողացավ առանց ընդհատումների գործարկել նոր ենթակառուցվածքը։',
    correctAnswer: 'Despite the tight deadlines, our engineering team managed to deploy the new infrastructure without any downtime.',
    acceptedAnswers: [
      'Despite the tight deadlines, our engineering team managed to deploy the new infrastructure without any downtime.',
      'Despite tight deadlines, our engineering team managed to roll out the new infrastructure seamlessly.',
      'In spite of the tight deadlines, our engineering team managed to launch the new infrastructure without interruptions.'
    ],
    hintAm: '«Չնայած սեղմ ժամկետներին»՝ Despite the tight deadlines, «առանց ընդհատումների»՝ without any downtime / interruptions։',
    explanationAm: '«Despite»-ից հետո դրվում է գոյական կամ բայական գոյական (-ing), իսկ «managed to»-ն ընդգծում է դժվարությամբ, բայց հաջողությամբ կատարված գործողությունը։'
  },

  // ============================================================================
  // EXERCISE C — CORRECT THE MISTAKE ('correct-mistake') — ex-37 to ex-54
  // ============================================================================
  {
    id: 'ex-37',
    type: 'correct-mistake',
    level: 'A1',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք նախադասության քերականական սխալը (Ես տուն եմ գնում մեքենայով)․',
    incorrectSentence: 'I go home my car.',
    correctAnswer: 'I go home by car.',
    acceptedAnswers: [
      'I go home by car.',
      'I go home in my car.',
      'I go home with my car.'
    ],
    hintAm: 'Տրանսպորտային միջոցի հետ պետք է օգտագործել «by car» կամ «in my car»։',
    explanationAm: 'Անգլերենում «մեքենայով» ասում ենք «by car» (առանց դերանվան) կամ «in my car» (եթե կա «my» բառը)։'
  },
  {
    id: 'ex-38',
    type: 'correct-mistake',
    level: 'A1',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Նա աշխատում է բանկում)․',
    incorrectSentence: 'He work in a bank.',
    correctAnswer: 'He works in a bank.',
    acceptedAnswers: [
      'He works in a bank.',
      'He works at a bank.',
      'He is working in a bank.'
    ],
    hintAm: 'Երրորդ դեմքի եզակի թվի (He) դեպքում բայն ի՞նչ վերջավորություն է ստանում։',
    explanationAm: 'Present Simple ժամանակաձևում «he», «she», «it» դերանունների հետ բային ավելանում է «-s»՝ «He works»։'
  },
  {
    id: 'ex-39',
    type: 'correct-mistake',
    level: 'A1',
    skill: 'writing',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Հանդիպումը ուրբաթ օրն է)․',
    incorrectSentence: 'The meeting is in Friday.',
    correctAnswer: 'The meeting is on Friday.',
    acceptedAnswers: [
      'The meeting is on Friday.',
      'The meeting\'s on Friday.'
    ],
    hintAm: 'Շաբաթվա օրերի հետ «in» չի օգտագործվում։',
    explanationAm: 'Շաբաթվա օրերի հետ միշտ օգտագործվում է «on» նախդիրը՝ on Friday։'
  },
  {
    id: 'ex-40',
    type: 'correct-mistake',
    level: 'A2',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ես երեկ վերանորոգեցի համակարգիչը)․',
    incorrectSentence: 'I fix the computer yesterday.',
    correctAnswer: 'I fixed the computer yesterday.',
    acceptedAnswers: [
      'I fixed the computer yesterday.',
      'I repaired the computer yesterday.'
    ],
    hintAm: '«Yesterday» (երեկ) բառը պահանջում է անցյալ ժամանակաձև (Past Simple)։',
    explanationAm: 'Անցյալում ավարտված գործողության համար (yesterday) կանոնավոր բայերին ավելանում է «-ed»՝ fixed։'
  },
  {
    id: 'ex-41',
    type: 'correct-mistake',
    level: 'A2',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Նա չունի նոութբուք)․',
    incorrectSentence: 'She doesn\'t has a laptop.',
    correctAnswer: 'She doesn\'t have a laptop.',
    acceptedAnswers: [
      'She doesn\'t have a laptop.',
      'She does not have a laptop.',
      'She has no laptop.'
    ],
    hintAm: '«Doesn\'t» օժանդակ բայից հետո հիմնական բայը դրվում է ուղիղ ձևով։',
    explanationAm: 'Ժխտական և հարցական նախադասություններում «does / doesn\'t»-ից հետո միշտ օգտագործվում է «have», ոչ թե «has»։'
  },
  {
    id: 'ex-42',
    type: 'correct-mistake',
    level: 'A2',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ես 28 տարեկան եմ)․',
    incorrectSentence: 'I have 28 years old.',
    correctAnswer: 'I am 28 years old.',
    acceptedAnswers: [
      'I am 28 years old.',
      'I\'m 28 years old.',
      'I am twenty-eight years old.',
      'I am 28.'
    ],
    hintAm: 'Անգլերենում տարիքը նշելիս «have» չի օգտագործվում։',
    explanationAm: 'Տարիք նշելիս անգլերենում օգտագործվում է «to be» (am / is / are) բայը՝ «I am 28 years old»։'
  },
  {
    id: 'ex-43',
    type: 'correct-mistake',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ես կզանգեմ ձեզ, երբ սերվերը պատրաստ լինի)․',
    incorrectSentence: 'I will call you when the server will be ready.',
    correctAnswer: 'I will call you when the server is ready.',
    acceptedAnswers: [
      'I will call you when the server is ready.',
      'I\'ll call you when the server is ready.',
      'I will call you as soon as the server is ready.'
    ],
    hintAm: '«When»-ից հետո ժամանակի պարագա երկրորդական նախադասության մեջ «will» չի դրվում։',
    explanationAm: 'Ապագային վերաբերող նախադասություններում «when», «as soon as», «after», «before» շաղկապներից հետո օգտագործվում է Present Simple (is ready)։'
  },
  {
    id: 'ex-44',
    type: 'correct-mistake',
    level: 'B1',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ես աշխատում եմ այստեղ 2021 թվականից)․',
    incorrectSentence: 'I work here since 2021.',
    correctAnswer: 'I have worked here since 2021.',
    acceptedAnswers: [
      'I have worked here since 2021.',
      'I\'ve worked here since 2021.',
      'I have been working here since 2021.',
      'I\'ve been working here since 2021.'
    ],
    hintAm: 'Անցյալում սկսված և մինչև հիմա շարունակվող գործողության համար (since 2021) պետք է Present Perfect։',
    explanationAm: '«Since» և «for» բառերի հետ, երբ գործողությունը դեռ շարունակվում է, օգտագործվում է Present Perfect կամ Present Perfect Continuous, ոչ թե Present Simple։'
  },
  {
    id: 'ex-45',
    type: 'correct-mistake',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Խնդրում եմ ուղարկեք ինձ այդ տեղեկատվությունը)․',
    incorrectSentence: 'Please send me these informations.',
    correctAnswer: 'Please send me this information.',
    acceptedAnswers: [
      'Please send me this information.',
      'Please send me the information.',
      'Could you please send me this information?'
    ],
    hintAm: '«Information» բառը անգլերենում անհաշվելի գոյական է։',
    explanationAm: '«Information», «advice», «equipment» և «software» բառերը անհաշվելի են և երբեք չեն ստանում «-s» հոգնակի վերջավորություն։'
  },
  {
    id: 'ex-46',
    type: 'correct-mistake',
    level: 'B1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Մենք քննարկեցինք նոր նախագծի մասին)․',
    incorrectSentence: 'We discussed about the new project.',
    correctAnswer: 'We discussed the new project.',
    acceptedAnswers: [
      'We discussed the new project.',
      'We talked about the new project.'
    ],
    hintAm: '«Discuss» բայից հետո «about» նախդիր չի դրվում։',
    explanationAm: 'Անգլերենում «discuss» բայը ներառում է «մասին» իմաստը, ուստի ասում ենք «discuss something» (առանց about-ի) կամ «talk about something»։'
  },
  {
    id: 'ex-47',
    type: 'correct-mistake',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Մենք երեկ տեղադրեցինք նոր ծրագրային ապահովումներ)․',
    incorrectSentence: 'We installed new softwares yesterday.',
    correctAnswer: 'We installed new software yesterday.',
    acceptedAnswers: [
      'We installed new software yesterday.',
      'We installed new software programs yesterday.',
      'We installed new applications yesterday.'
    ],
    hintAm: '«Software» և «hardware» բառերը անհաշվելի են։',
    explanationAm: 'IT անգլերենում «software» և «hardware» գոյականները միշտ օգտագործվում են եզակի թվով՝ առանց «-s» վերջավորության։'
  },
  {
    id: 'ex-48',
    type: 'correct-mistake',
    level: 'B2',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Կարո՞ղ եք ասել՝ ինչու է սերվերը անջատված)․',
    incorrectSentence: 'Can you tell me why is the server down?',
    correctAnswer: 'Can you tell me why the server is down?',
    acceptedAnswers: [
      'Can you tell me why the server is down?',
      'Could you tell me why the server is down?'
    ],
    hintAm: 'Անուղղակի հարցերում (Can you tell me why...) երկրորդ մասում հարցական շրջուն շարադասություն չի կիրառվում։',
    explanationAm: 'Անուղղակի հարցերում հարցական բառից (why, where, what) հետո պահպանվում է պատմողական շարադասություն՝ «why the server is down»։'
  },
  {
    id: 'ex-49',
    type: 'correct-mistake',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ես սովոր եմ աշխատել Linux սերվերների հետ)․',
    incorrectSentence: 'I am used to work with Linux servers.',
    correctAnswer: 'I am used to working with Linux servers.',
    acceptedAnswers: [
      'I am used to working with Linux servers.',
      'I\'m used to working with Linux servers.'
    ],
    hintAm: '«Be used to» (սովոր լինել) կառույցից հետո բայը ստանում է -ing վերջավորություն։',
    explanationAm: '«Be used to + V-ing» նշանակում է «սովոր լինել ինչ-որ բանի», մինչդեռ «used to + V» նշանակում է նախկինում արված գործողություն։'
  },
  {
    id: 'ex-50',
    type: 'correct-mistake',
    level: 'B2',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Մենեջերը առաջարկեց, որ մենք թարմացնենք firewall-ը)․',
    incorrectSentence: 'The manager suggested us to upgrade the firewall.',
    correctAnswer: 'The manager suggested that we upgrade the firewall.',
    acceptedAnswers: [
      'The manager suggested that we upgrade the firewall.',
      'The manager suggested upgrading the firewall.',
      'The manager suggested we upgrade the firewall.'
    ],
    hintAm: '«Suggest» բայից հետո «somebody to do» կառույց երբեք չի օգտագործվում։',
    explanationAm: '«Suggest» բայից հետո կիրառվում է կա՛մ «suggest + V-ing», կա՛մ «suggest (that) somebody do something»։'
  },
  {
    id: 'ex-51',
    type: 'correct-mistake',
    level: 'C1',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Եթե ես ավելի վաղ տեսնեի նամակը, ես կվերականգնեի պահուստային պատճենը)․',
    incorrectSentence: 'If I would have seen the email earlier, I would have restored the backup.',
    correctAnswer: 'If I had seen the email earlier, I would have restored the backup.',
    acceptedAnswers: [
      'If I had seen the email earlier, I would have restored the backup.',
      'Had I seen the email earlier, I would have restored the backup.',
      'If I\'d seen the email earlier, I would have restored the backup.'
    ],
    hintAm: 'Երրորդ պայմանական նախադասության «if» մասում «would have»-ի փոխարեն օգտագործվում է Past Perfect (had seen)։',
    explanationAm: 'Third Conditional-ում «if» մասում դրվում է «had + V3» (If I had seen), իսկ գլխավոր նախադասության մեջ՝ «would have + V3»։'
  },
  {
    id: 'ex-52',
    type: 'correct-mistake',
    level: 'C1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Ցանցային սարքավորումներիից ոչ մեկը վնասված չէր)․',
    incorrectSentence: 'None of the network equipments were damaged.',
    correctAnswer: 'None of the network equipment was damaged.',
    acceptedAnswers: [
      'None of the network equipment was damaged.',
      'No network equipment was damaged.'
    ],
    hintAm: '«Equipment» բառը անհաշվելի է և պահանջում է եզակի բայ (was)։',
    explanationAm: '«Equipment»-ը անհաշվելի գոյական է (չունի -s հոգնակի), ուստի «None of the equipment»-ի հետ բայը դրվում է եզակի թվով՝ «was damaged»։'
  },
  {
    id: 'ex-53',
    type: 'correct-mistake',
    level: 'C2',
    skill: 'writing',
    category: 'Քերականություն',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Հազիվ էինք մենք վերագործարկել սերվերը, երբ տագնապը կրկին միացավ)․',
    incorrectSentence: 'Hardly we had rebooted the server when the alert triggered again.',
    correctAnswer: 'Hardly had we rebooted the server when the alert triggered again.',
    acceptedAnswers: [
      'Hardly had we rebooted the server when the alert triggered again.',
      'Scarcely had we rebooted the server when the alert triggered again.',
      'No sooner had we rebooted the server than the alert triggered again.'
    ],
    hintAm: '«Hardly» բառով սկսվող նախադասության մեջ պարտադիր է ինվերսիան՝ «Hardly had we...»։',
    explanationAm: 'Երբ նախադասությունը սկսվում է բացասական կամ սահմանափակող մակբայով (Hardly, Scarcely, Never), օժանդակ բայը (had) անցնում է ենթակայից (we) առաջ։'
  },
  {
    id: 'ex-54',
    type: 'correct-mistake',
    level: 'C2',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Find and fix the grammar mistake in the sentence:',
    promptAm: 'Գտեք և ուղղեք սխալը (Կարևոր է, որ յուրաքանչյուր ադմինիստրատոր միացնի երկգործոն նույնականացումը)․',
    incorrectSentence: 'It is essential that every administrator enables two-factor authentication.',
    correctAnswer: 'It is essential that every administrator enable two-factor authentication.',
    acceptedAnswers: [
      'It is essential that every administrator enable two-factor authentication.',
      'It is essential that every administrator should enable two-factor authentication.'
    ],
    hintAm: 'Պաշտոնական անգլերենում «It is essential that...» կառույցը պահանջում է Subjunctive Mood (բայի ուղիղ ձև՝ առանց -s)։',
    explanationAm: 'Subjunctive Mood-ում «It is essential / vital / recommended that...» արտահայտություններից հետո բայը դրվում է ուղիղ ձևով (enable) նույնիսկ երրորդ դեմքի եզակի թվի համար։'
  },

  // ============================================================================
  // EXERCISE D — BUILD A SENTENCE ('build-sentence') — ex-55 to ex-72
  // ============================================================================
  {
    id: 'ex-55',
    type: 'build-sentence',
    level: 'A1',
    skill: 'writing',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ես ամեն առավոտ սուրճ եմ խմում)․',
    wordsBank: ['every', 'drink', 'I', 'morning', 'coffee'],
    correctAnswer: 'I drink coffee every morning.',
    acceptedAnswers: [
      'I drink coffee every morning.',
      'I drink coffee every morning',
      'Every morning I drink coffee.'
    ],
    hintAm: 'Անգլերեն նախադասության դասական շարադասությունն է՝ Ենթակա (I) + Բայ (drink) + Խնդիր (coffee) + Ժամանակ (every morning)։',
    explanationAm: 'Անգլերենում ժամանակ ցույց տվող բառակապակցությունը (every morning) սովորաբար դրվում է նախադասության վերջում։'
  },
  {
    id: 'ex-56',
    type: 'build-sentence',
    level: 'A1',
    skill: 'writing',
    category: 'Աշխատանք',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Մենք սկսում ենք աշխատանքը ժամը իննին)․',
    wordsBank: ['at', 'work', 'We', 'nine', 'start'],
    correctAnswer: 'We start work at nine.',
    acceptedAnswers: [
      'We start work at nine.',
      'We start work at nine',
      'We start work at 9.'
    ],
    hintAm: 'Սկսեք «We start...»-ով, իսկ վերջում նշեք ժամը՝ «at nine»։',
    explanationAm: '«Start work» և «finish work» արտահայտություններում «work» բառից առաջ հոդ չի դրվում։'
  },
  {
    id: 'ex-57',
    type: 'build-sentence',
    level: 'A1',
    skill: 'reading',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Arrange the words in the correct order to form a question:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ժամը քանի՞սն է հիմա)․',
    wordsBank: ['time', 'is', 'What', 'now', 'it'],
    correctAnswer: 'What time is it now?',
    acceptedAnswers: [
      'What time is it now?',
      'What time is it now',
      'What time is it?'
    ],
    hintAm: 'Հարցը սկսվում է «What time...» բառակապակցությամբ։',
    explanationAm: 'Ժամը հարցնելու ամենատարածված ձևն է «What time is it?» կամ «What time is it now?»։'
  },
  {
    id: 'ex-58',
    type: 'build-sentence',
    level: 'A2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Տպիչը միացված է ցանցին)․',
    wordsBank: ['connected', 'The', 'network', 'is', 'to', 'printer', 'the'],
    correctAnswer: 'The printer is connected to the network.',
    acceptedAnswers: [
      'The printer is connected to the network.',
      'The printer is connected to the network',
      'The network is connected to the printer.'
    ],
    hintAm: 'Սկսեք «The printer is connected...»-ով։',
    explanationAm: '«Be connected to» կառույցը ցույց է տալիս, որ սարքը միացված է ցանցին կամ համակարգչին։'
  },
  {
    id: 'ex-59',
    type: 'build-sentence',
    level: 'A2',
    skill: 'writing',
    category: 'Ճանապարհորդություն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Թեքվեք ձախ լուսացույցի մոտ)․',
    wordsBank: ['the', 'at', 'left', 'lights', 'Turn', 'traffic'],
    correctAnswer: 'Turn left at the traffic lights.',
    acceptedAnswers: [
      'Turn left at the traffic lights.',
      'Turn left at the traffic lights',
      'At the traffic lights turn left.'
    ],
    hintAm: 'Հրամայական նախադասությունը սկսվում է բայով՝ «Turn left...»։',
    explanationAm: 'Ուղղություն ցույց տալիս օգտագործում ենք «Turn left / right at the...» կառուցվածքը։'
  },
  {
    id: 'ex-60',
    type: 'build-sentence',
    level: 'A2',
    skill: 'reading',
    category: 'Աշխատանք',
    promptEn: 'Arrange the words in the correct order to form a question:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Կարո՞ղ եք կրկնել դա դանդաղ)․',
    wordsBank: ['repeat', 'slowly', 'you', 'Can', 'that'],
    correctAnswer: 'Can you repeat that slowly?',
    acceptedAnswers: [
      'Can you repeat that slowly?',
      'Can you repeat that slowly',
      'Can you slowly repeat that?'
    ],
    hintAm: 'Հարցական նախադասությունը սկսվում է մոդալ բայով՝ «Can you...»։',
    explanationAm: 'Երբ զրուցակիցը արագ է խոսում, շատ օգտակար է հարցնել՝ «Can you repeat that slowly?»։'
  },
  {
    id: 'ex-61',
    type: 'build-sentence',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ես նոր եմ վերագործարկել գլխավոր երթուղիչը)․',
    wordsBank: ['restarted', 'just', 'main', 'I', 'have', 'the', 'router'],
    correctAnswer: 'I have just restarted the main router.',
    acceptedAnswers: [
      'I have just restarted the main router.',
      'I have just restarted the main router',
      'I\'ve just restarted the main router.'
    ],
    hintAm: 'Present Perfect-ում «just» մակբայը դրվում է «have»-ի և «restarted»-ի միջև։',
    explanationAm: 'Հենց նոր ավարտված գործողության համար օգտագործվում է «have + just + V3» կառույցը։'
  },
  {
    id: 'ex-62',
    type: 'build-sentence',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Խնդրում եմ ստուգեք, թե արդյոք մալուխը միացված է)․',
    wordsBank: ['cable', 'if', 'plugged', 'check', 'the', 'Please', 'is', 'in'],
    correctAnswer: 'Please check if the cable is plugged in.',
    acceptedAnswers: [
      'Please check if the cable is plugged in.',
      'Please check if the cable is plugged in',
      'Check if the cable is plugged in please.'
    ],
    hintAm: 'Սկսեք «Please check if...»-ով, իսկ վերջում՝ «is plugged in»։',
    explanationAm: '«Plugged in» նշանակում է միացված վարդակից կամ պորտին (հակառակը՝ unplugged)։'
  },
  {
    id: 'ex-63',
    type: 'build-sentence',
    level: 'B1',
    skill: 'reading',
    category: 'Աշխատանք',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ես պատասխանատու եմ ցանցային անվտանգության համար)․',
    wordsBank: ['responsible', 'network', 'am', 'for', 'I', 'security'],
    correctAnswer: 'I am responsible for network security.',
    acceptedAnswers: [
      'I am responsible for network security.',
      'I am responsible for network security',
      'I\'m responsible for network security.'
    ],
    hintAm: '«Պատասխանատու լինել ինչ-որ բանի համար»՝ be responsible for...։',
    explanationAm: '«I am responsible for...» կառույցը լայնորեն օգտագործվում է ինքնաներկայացման և հարցազրույցների ժամանակ։'
  },
  {
    id: 'ex-64',
    type: 'build-sentence',
    level: 'B1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Օգտատերը չի կարողանում մուտք գործել իր փոստարկղ)․',
    wordsBank: ['access', 'The', 'cannot', 'mailbox', 'user', 'their'],
    correctAnswer: 'The user cannot access their mailbox.',
    acceptedAnswers: [
      'The user cannot access their mailbox.',
      'The user cannot access their mailbox',
      'The user can\'t access their mailbox.'
    ],
    hintAm: 'Սկսեք «The user cannot access...»-ով։',
    explanationAm: '«Access» բայից հետո «to» նախդիր չի դրվում (access their mailbox, access the server)։'
  },
  {
    id: 'ex-65',
    type: 'build-sentence',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Մենք պետք է նշանակենք ստատիկ IP հասցե այս սերվերին)․',
    wordsBank: ['static', 'assign', 'We', 'a', 'need', 'to', 'IP', 'server', 'address', 'this', 'to'],
    correctAnswer: 'We need to assign a static IP address to this server.',
    acceptedAnswers: [
      'We need to assign a static IP address to this server.',
      'We need to assign a static IP address to this server'
    ],
    hintAm: 'Սկսեք «We need to assign a static IP address...»-ով։',
    explanationAm: 'Ցանցային սարքերին ֆիքսված հասցե տալու համար օգտագործվում է «assign a static IP address to...» արտահայտությունը։'
  },
  {
    id: 'ex-66',
    type: 'build-sentence',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Տվյալների բազայի պահուստային պատճենումը կատարվում է ամեն գիշեր)․',
    wordsBank: ['runs', 'backup', 'every', 'database', 'The', 'automatically', 'night'],
    correctAnswer: 'The database backup runs automatically every night.',
    acceptedAnswers: [
      'The database backup runs automatically every night.',
      'The database backup runs automatically every night',
      'Every night the database backup runs automatically.',
      'The database backup automatically runs every night.'
    ],
    hintAm: 'Ենթական է «The database backup», իսկ բայը՝ «runs automatically»։',
    explanationAm: 'Կրկնվող ավտոմատ գործընթացների (cron jobs, backups) համար օգտագործվում է Present Simple՝ «runs automatically»։'
  },
  {
    id: 'ex-67',
    type: 'build-sentence',
    level: 'B2',
    skill: 'reading',
    category: 'Քերականություն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Եթե դուք ունենաք որևէ հարց, խնդրում եմ տեղեկացրեք ինձ)․',
    wordsBank: ['any', 'know', 'you', 'If', 'questions', 'let', 'have', 'please', 'me'],
    correctAnswer: 'If you have any questions please let me know.',
    acceptedAnswers: [
      'If you have any questions please let me know.',
      'If you have any questions, please let me know.',
      'If you have any questions please let me know',
      'Please let me know if you have any questions.'
    ],
    hintAm: 'Սկսեք «If you have any questions...»-ով և ավարտեք «please let me know»-ով։',
    explanationAm: '«Please let me know if you have any questions»-ը գործնական հաղորդակցության ամենաօգտակար եզրափակիչ նախադասություններից է։'
  },
  {
    id: 'ex-68',
    type: 'build-sentence',
    level: 'B2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ես թարմացրել եմ խմբային քաղաքականությունը դոմեյն կոնտրոլերում)․',
    wordsBank: ['Group', 'updated', 'controller', 'I', 'the', 'on', 'Policy', 'have', 'domain', 'the'],
    correctAnswer: 'I have updated the Group Policy on the domain controller.',
    acceptedAnswers: [
      'I have updated the Group Policy on the domain controller.',
      'I have updated the Group Policy on the domain controller',
      'I\'ve updated the Group Policy on the domain controller.'
    ],
    hintAm: 'Սկսեք «I have updated the Group Policy...»-ով։',
    explanationAm: 'Windows Server միջավայրում կենտրոնացված կարգավորումները կատարվում են «Group Policy»-ի միջոցով «domain controller»-ի վրա։'
  },
  {
    id: 'ex-69',
    type: 'build-sentence',
    level: 'C1',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Մենք հետաքննում ենք ցանցի բարձր հապաղման հիմնական պատճառը)․',
    wordsBank: ['root', 'investigating', 'latency', 'We', 'the', 'high', 'are', 'of', 'cause', 'network'],
    correctAnswer: 'We are investigating the root cause of high network latency.',
    acceptedAnswers: [
      'We are investigating the root cause of high network latency.',
      'We are investigating the root cause of high network latency',
      'We\'re investigating the root cause of high network latency.'
    ],
    hintAm: '«Հիմնական պատճառ»՝ the root cause, «բարձր ցանցային հապաղում»՝ high network latency։',
    explanationAm: '«Root cause» (արմատական/հիմնական պատճառ) և «network latency» (ցանցային ուշացում/հապաղում) տերմինները կարևոր են ավագ IT մասնագետների համար։'
  },
  {
    id: 'ex-70',
    type: 'build-sentence',
    level: 'C1',
    skill: 'reading',
    category: 'Աշխատանք',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Թարմացումը կտեղադրվի աշխատանքային ժամերից հետո՝ խափանումներից խուսափելու համար)․',
    wordsBank: ['hours', 'deployed', 'update', 'after', 'be', 'business', 'The', 'will'],
    correctAnswer: 'The update will be deployed after business hours.',
    acceptedAnswers: [
      'The update will be deployed after business hours.',
      'The update will be deployed after business hours',
      'After business hours the update will be deployed.'
    ],
    hintAm: 'Օգտագործեք կրավորական սեռ ապագա ժամանակով՝ «The update will be deployed...»։',
    explanationAm: '«After business hours» նշանակում է աշխատանքային ժամերից հետո, երբ սերվերների ծանրաբեռնվածությունը նվազագույն է։'
  },
  {
    id: 'ex-71',
    type: 'build-sentence',
    level: 'C2',
    skill: 'writing',
    category: 'IT Անգլերեն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Անսպասելի խափանման դեպքում տրաֆիկը ավտոմատ կուղղորդվի պահուստային սերվեր)․',
    wordsBank: ['automatically', 'backup', 'rerouted', 'to', 'Traffic', 'be', 'the', 'will', 'server'],
    correctAnswer: 'Traffic will be automatically rerouted to the backup server.',
    acceptedAnswers: [
      'Traffic will be automatically rerouted to the backup server.',
      'Traffic will be automatically rerouted to the backup server',
      'Traffic will automatically be rerouted to the backup server.'
    ],
    hintAm: 'Սկսեք «Traffic will be automatically rerouted...»-ով։',
    explanationAm: '«Reroute traffic» նշանակում է ցանցային հոսքը վերաուղղորդել այլ երթուղով կամ սերվերով (failover)։'
  },
  {
    id: 'ex-72',
    type: 'build-sentence',
    level: 'C2',
    skill: 'reading',
    category: 'Քերականություն',
    promptEn: 'Arrange the words in the correct order to form a sentence:',
    promptAm: 'Դասավորեք բառերը ճիշտ հերթականությամբ (Ոչ մի դեպքում չպետք է կիսվեք ձեր ադմինիստրատորի գաղտնաբառով)․',
    wordsBank: ['share', 'circumstances', 'you', 'Under', 'should', 'password', 'no', 'admin', 'your'],
    correctAnswer: 'Under no circumstances should you share your admin password.',
    acceptedAnswers: [
      'Under no circumstances should you share your admin password.',
      'Under no circumstances should you share your admin password'
    ],
    hintAm: '«Under no circumstances»-ով սկսելիս կիրառվում է ինվերսիա՝ «should you share...»։',
    explanationAm: 'Անվտանգության խիստ կանոններ շարադրելիս «Under no circumstances should you...» կառույցը հաղորդում է առավելագույն պաշտոնականություն և շեշտադրում։'
  },

  // ============================================================================
  // EXERCISE E — LISTENING ('listening') — ex-73 to ex-90
  // ============================================================================
  {
    id: 'ex-73',
    type: 'listening',
    level: 'A1',
    skill: 'listening',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք ձայնագրությունը և գրեք այն նախադասությունը, որը լսում եք․',
    audioText: 'Good morning, how are you today?',
    correctAnswer: 'Good morning, how are you today?',
    acceptedAnswers: [
      'Good morning, how are you today?',
      'Good morning how are you today',
      'Good morning! How are you today?'
    ],
    hintAm: 'Բարի առավոտ, ինչպե՞ս եք այսօր (6 բառ)։',
    explanationAm: '«Good morning, how are you today?»-ը ամենաբնական առավոտյան ողջույնն է գործընկերների հետ հանդիպելիս։'
  },
  {
    id: 'ex-74',
    type: 'listening',
    level: 'A1',
    skill: 'listening',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Our meeting starts at ten o\'clock.',
    correctAnswer: 'Our meeting starts at ten o\'clock.',
    acceptedAnswers: [
      'Our meeting starts at ten o\'clock.',
      'Our meeting starts at 10 o\'clock.',
      'Our meeting starts at ten.',
      'Our meeting starts at 10:00.'
    ],
    hintAm: 'Մեր հանդիպումը սկսվում է ժամը տասին (Our meeting starts...)։',
    explanationAm: 'Պաշտոնական ժամանակացույցով նախատեսված իրադարձությունների համար (meeting, flight, train) օգտագործվում է Present Simple (starts)։'
  },
  {
    id: 'ex-75',
    type: 'listening',
    level: 'A1',
    skill: 'listening',
    category: 'Աշխատանք',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'My office is on the second floor.',
    correctAnswer: 'My office is on the second floor.',
    acceptedAnswers: [
      'My office is on the second floor.',
      'My office is on the 2nd floor.',
      'My office\'s on the second floor.'
    ],
    hintAm: 'Իմ գրասենյակը երկրորդ հարկում է (on the second floor)։',
    explanationAm: 'Դասական թվականների (first, second, third) առջև դրվում է «the» որոշյալ հոդը։'
  },
  {
    id: 'ex-76',
    type: 'listening',
    level: 'A2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Can you please restart your computer?',
    correctAnswer: 'Can you please restart your computer?',
    acceptedAnswers: [
      'Can you please restart your computer?',
      'Can you please restart your computer',
      'Could you please restart your computer?'
    ],
    hintAm: 'Կարո՞ղ եք խնդրում եմ վերագործարկել ձեր համակարգիչը։',
    explanationAm: '«Can you please...» կառույցը քաղաքավարի խնդրանք է հաճախորդին կամ գործընկերոջը դիմելիս։'
  },
  {
    id: 'ex-77',
    type: 'listening',
    level: 'A2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'The Wi-Fi password is on the whiteboard.',
    correctAnswer: 'The Wi-Fi password is on the whiteboard.',
    acceptedAnswers: [
      'The Wi-Fi password is on the whiteboard.',
      'The wifi password is on the whiteboard.',
      'The WiFi password is on the whiteboard.'
    ],
    hintAm: 'Wi-Fi-ի գաղտնաբառը սպիտակ գրատախտակի վրա է (whiteboard)։',
    explanationAm: 'Մակերևույթների վրա գտնվող բաների համար (էկրանին, գրատախտակին, պատին) օգտագործվում է «on» նախդիրը (on the whiteboard, on the screen)։'
  },
  {
    id: 'ex-78',
    type: 'listening',
    level: 'A2',
    skill: 'listening',
    category: 'Ճանապարհորդություն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Excuse me, how can I get to the airport?',
    correctAnswer: 'Excuse me, how can I get to the airport?',
    acceptedAnswers: [
      'Excuse me, how can I get to the airport?',
      'Excuse me how can I get to the airport?'
    ],
    hintAm: 'Ներեցեք, ինչպե՞ս կարող եմ հասնել օդանավակայան (get to the airport)։',
    explanationAm: '«Get to [վայր]» արտահայտությունը նշանակում է «հասնել ինչ-որ տեղ»։'
  },
  {
    id: 'ex-79',
    type: 'listening',
    level: 'B1',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'I will reset your password and send you a temporary one.',
    correctAnswer: 'I will reset your password and send you a temporary one.',
    acceptedAnswers: [
      'I will reset your password and send you a temporary one.',
      'I\'ll reset your password and send you a temporary one.'
    ],
    hintAm: 'Ես կզրոյացնեմ ձեր գաղտնաբառը և կուղարկեմ ժամանակավորը (temporary one)։',
    explanationAm: 'Կրկնությունից խուսափելու համար «temporary password»-ի փոխարեն նախադասության երկրորդ մասում օգտագործվում է «a temporary one»։'
  },
  {
    id: 'ex-80',
    type: 'listening',
    level: 'B1',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'It looks like the network cable is unplugged.',
    correctAnswer: 'It looks like the network cable is unplugged.',
    acceptedAnswers: [
      'It looks like the network cable is unplugged.',
      'It looks like the network cable\'s unplugged.'
    ],
    hintAm: 'Կարծես թե ցանցային մալուխը անջատված է (It looks like...)։',
    explanationAm: '«It looks like...» (Կարծես թե / Ըստ երևույթին) արտահայտությունը շատ հարմար է խնդրի նախնական ախտորոշումը հայտնելու համար։'
  },
  {
    id: 'ex-81',
    type: 'listening',
    level: 'B1',
    skill: 'listening',
    category: 'Աշխատանք',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Could you please share your screen with me?',
    correctAnswer: 'Could you please share your screen with me?',
    acceptedAnswers: [
      'Could you please share your screen with me?',
      'Can you please share your screen with me?'
    ],
    hintAm: 'Կարո՞ղ եք խնդրում եմ կիսվել ձեր էկրանով ինձ հետ (share your screen)։',
    explanationAm: 'Հեռավար զանգերի և տեխնիկական աջակցության ժամանակ էկրանը ցույց տալու համար ասում ենք «share your screen»։'
  },
  {
    id: 'ex-82',
    type: 'listening',
    level: 'B1',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'What error message do you see on your screen?',
    correctAnswer: 'What error message do you see on your screen?',
    acceptedAnswers: [
      'What error message do you see on your screen?',
      'What error message do you see on the screen?'
    ],
    hintAm: 'Ի՞նչ սխալի հաղորդագրություն եք տեսնում ձեր էկրանին (error message)։',
    explanationAm: 'Օգտատիրոջից խնդրի մանրամասները ճշտելու համար IT մասնագետը հարցնում է՝ «What error message do you see on your screen?»։'
  },
  {
    id: 'ex-83',
    type: 'listening',
    level: 'B2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'The printer is offline because its IP address has changed.',
    correctAnswer: 'The printer is offline because its IP address has changed.',
    acceptedAnswers: [
      'The printer is offline because its IP address has changed.',
      'The printer\'s offline because its IP address has changed.',
      'The printer is offline because its IP address changed.'
    ],
    hintAm: 'Տպիչը offline է, որովհետև նրա IP հասցեն փոխվել է (its IP address has changed)։',
    explanationAm: 'Ուշադրություն դարձրեք «its» (նրա՝ առանց ապոստրոֆի) պատկանելության դերանվանը և Present Perfect ժամանակաձևին (has changed)։'
  },
  {
    id: 'ex-84',
    type: 'listening',
    level: 'B2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'I have added your account to the security group in Active Directory.',
    correctAnswer: 'I have added your account to the security group in Active Directory.',
    acceptedAnswers: [
      'I have added your account to the security group in Active Directory.',
      'I\'ve added your account to the security group in Active Directory.'
    ],
    hintAm: 'Ես ավելացրել եմ ձեր հաշիվը անվտանգության խմբում Active Directory-ի մեջ։',
    explanationAm: 'Թույլտվություններ տրամադրելիս օգտագործվում է «add an account to a security group» արտահայտությունը։'
  },
  {
    id: 'ex-85',
    type: 'listening',
    level: 'B2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'We need to flush the DNS cache and renew the DHCP lease.',
    correctAnswer: 'We need to flush the DNS cache and renew the DHCP lease.',
    acceptedAnswers: [
      'We need to flush the DNS cache and renew the DHCP lease.',
      'We need to flush the dns cache and renew the dhcp lease.'
    ],
    hintAm: 'Մենք պետք է մաքրենք DNS քեշը (flush the DNS cache) և թարմացնենք DHCP վարձակալությունը (renew the DHCP lease)։',
    explanationAm: '«Flush the DNS cache» (ipconfig /flushdns) և «renew the DHCP lease» (ipconfig /renew) արտահայտությունները ցանցային ախտորոշման հիմնական տերմիններ են։'
  },
  {
    id: 'ex-86',
    type: 'listening',
    level: 'B2',
    skill: 'listening',
    category: 'Աշխատանք',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'We are currently experiencing a temporary service outage.',
    correctAnswer: 'We are currently experiencing a temporary service outage.',
    acceptedAnswers: [
      'We are currently experiencing a temporary service outage.',
      'We\'re currently experiencing a temporary service outage.'
    ],
    hintAm: 'Մենք ներկայումս ունենք ծառայության ժամանակավոր խափանում (experiencing a temporary service outage)։',
    explanationAm: 'Պաշտոնական հաղորդագրություններում «ունենք խնդիր/խափանում» իմաստով օգտագործվում է «We are currently experiencing...» կառույցը։'
  },
  {
    id: 'ex-87',
    type: 'listening',
    level: 'C1',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'The firewall blocked the incoming connection on port 443.',
    correctAnswer: 'The firewall blocked the incoming connection on port 443.',
    acceptedAnswers: [
      'The firewall blocked the incoming connection on port 443.',
      'The firewall blocked the incoming connection on port four four three.'
    ],
    hintAm: 'Firewall-ը արգելափակեց մուտքային միացումը 443 պորտի վրա (incoming connection on port 443)։',
    explanationAm: 'Ցանցային պորտերի հետ օգտագործվում է «on» նախդիրը (on port 80, on port 443), իսկ մուտքային և ելքային կապերը կոչվում են «incoming / outgoing connections»։'
  },
  {
    id: 'ex-88',
    type: 'listening',
    level: 'C1',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Please make sure that multi-factor authentication is enabled for all users.',
    correctAnswer: 'Please make sure that multi-factor authentication is enabled for all users.',
    acceptedAnswers: [
      'Please make sure that multi-factor authentication is enabled for all users.',
      'Please make sure that multifactor authentication is enabled for all users.',
      'Please make sure multi-factor authentication is enabled for all users.'
    ],
    hintAm: 'Խնդրում եմ համոզվեք, որ բազմագործոն նույնականացումը (multi-factor authentication) միացված է բոլոր օգտատերերի համար։',
    explanationAm: 'Microsoft 365 և Azure AD միջավայրերում անվտանգության հիմնական պահանջն է «enable multi-factor authentication (MFA)»։'
  },
  {
    id: 'ex-89',
    type: 'listening',
    level: 'C2',
    skill: 'listening',
    category: 'IT Անգլերեն',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'Once the root cause was identified, the engineering team deployed a hotfix immediately.',
    correctAnswer: 'Once the root cause was identified, the engineering team deployed a hotfix immediately.',
    acceptedAnswers: [
      'Once the root cause was identified, the engineering team deployed a hotfix immediately.',
      'Once the root cause was identified the engineering team deployed a hotfix immediately.'
    ],
    hintAm: 'Հենց որ հիմնական պատճառը հայտնաբերվեց (Once the root cause was identified), ինժեներական թիմը անմիջապես տեղադրեց հրատապ շտկում (hotfix)։',
    explanationAm: '«Once»-ը որպես շաղկապ նշանակում է «հենց որ / այն բանից հետո, երբ», իսկ «hotfix»-ը արտակարգ իրավիճակում թողարկվող արագ ծրագրային շտկումն է։'
  },
  {
    id: 'ex-90',
    type: 'listening',
    level: 'C2',
    skill: 'listening',
    category: 'Աշխատանք',
    promptEn: 'Listen carefully and type the exact sentence you hear:',
    promptAm: 'Ուշադիր լսեք և գրեք նախադասությունը․',
    audioText: 'We have implemented automated monitoring alerts to detect anomalies before they impact end users.',
    correctAnswer: 'We have implemented automated monitoring alerts to detect anomalies before they impact end users.',
    acceptedAnswers: [
      'We have implemented automated monitoring alerts to detect anomalies before they impact end users.',
      'We\'ve implemented automated monitoring alerts to detect anomalies before they impact end users.',
      'We have implemented automated monitoring alerts to detect anomalies before they impact end-users.'
    ],
    hintAm: 'Մենք ներդրել ենք ավտոմատ մոնիթորինգային ծանուցումներ՝ անոմալիաները հայտնաբերելու համար, նախքան դրանք կազդեն վերջնական օգտատերերի վրա։',
    explanationAm: '«Impact end users» նշանակում է ազդել վերջնական օգտատերերի աշխատանքի վրա, իսկ «implement automated monitoring»՝ ներդնել ավտոմատ վերահսկողություն։'
  },

  // ============================================================================
  // EXERCISE F — SPEAKING ('speaking') — ex-91 to ex-108
  // ============================================================================
  {
    id: 'ex-91',
    type: 'speaking',
    level: 'A1',
    skill: 'speaking',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'What time do you start work?',
    promptAm: 'Պատասխանեք հարցին բարձրաձայն կամ գրավոր՝ «Ժամը քանիսի՞ն եք սկսում աշխատանքը» (օրինակ՝ ժամը իննին)․',
    audioText: 'What time do you start work?',
    correctAnswer: 'I start work at nine o\'clock.',
    acceptedAnswers: [
      'I start work at nine o\'clock.',
      'I start work at 9 o\'clock.',
      'I start work at nine.',
      'I start work at 9.',
      'I start work at 9 am.',
      'I usually start work at nine.',
      'I start work at eight thirty.',
      'I start work at 8:30.',
      'I start my work at nine o\'clock.',
      'At nine o\'clock.'
    ],
    hintAm: 'Ասեք՝ «I start work at nine o\'clock» կամ «I usually start work at 9 AM»։',
    explanationAm: 'Աշխատանքի սկսման ժամը նշելիս ասում ենք «I start work at [ժամ]»՝ օգտագործելով «at» նախդիրը։'
  },
  {
    id: 'ex-92',
    type: 'speaking',
    level: 'A1',
    skill: 'speaking',
    category: 'Աշխատանք',
    promptEn: 'What is your job?',
    promptAm: 'Պատասխանեք հարցին անգլերեն՝ «Ի՞նչ է ձեր մասնագիտությունը / աշխատանքը» (օրինակ՝ Ես IT մասնագետ եմ)․',
    audioText: 'What is your job?',
    correctAnswer: 'I am an IT specialist.',
    acceptedAnswers: [
      'I am an IT specialist.',
      'I\'m an IT specialist.',
      'I work as an IT specialist.',
      'I am a system administrator.',
      'I\'m a system administrator.',
      'I am a network administrator.',
      'I am an IT engineer.',
      'I work in IT.'
    ],
    hintAm: 'Ասեք՝ «I am an IT specialist» կամ «I work as a system administrator»։',
    explanationAm: 'Մասնագիտության մասին հարցին պատասխանում ենք «I am a/an [մասնագիտություն]» կամ «I work as a/an [մասնագիտություն]»։'
  },
  {
    id: 'ex-93',
    type: 'speaking',
    level: 'A1',
    skill: 'speaking',
    category: 'Ժամանակ և Առօրյա',
    promptEn: 'What days do you work during the week?',
    promptAm: 'Պատասխանեք հարցին՝ «Շաբաթվա ո՞ր օրերին եք աշխատում» (օրինակ՝ երկուշաբթիից ուրբաթ)․',
    audioText: 'What days do you work during the week?',
    correctAnswer: 'I work from Monday to Friday.',
    acceptedAnswers: [
      'I work from Monday to Friday.',
      'I usually work from Monday to Friday.',
      'I work Monday through Friday.',
      'I work five days a week from Monday to Friday.',
      'From Monday to Friday.'
    ],
    hintAm: 'Ասեք՝ «I work from Monday to Friday»։',
    explanationAm: 'Օրերի միջակայք նշելու համար օգտագործվում է «from Monday to Friday» կամ ամերիկյան անգլերենում՝ «Monday through Friday»։'
  },
  {
    id: 'ex-94',
    type: 'speaking',
    level: 'A2',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'How can you help a colleague whose computer is frozen?',
    promptAm: 'Ի՞նչ կասեք գործընկերոջը, ում համակարգիչը կախվել է (օրինակ՝ խնդրեք վերագործարկել համակարգիչը)․',
    audioText: 'How can you help a colleague whose computer is frozen?',
    correctAnswer: 'Please restart your computer.',
    acceptedAnswers: [
      'Please restart your computer.',
      'Let me check your computer.',
      'Please try restarting your computer.',
      'Can you restart your computer?',
      'Please reboot your computer.',
      'Let me restart your computer and check Task Manager.'
    ],
    hintAm: 'Ասեք՝ «Please restart your computer» կամ «Let me check your computer»։',
    explanationAm: 'Երբ համակարգիչը կախվում է («is frozen / not responding»), առաջին քայլը Task Manager-ը ստուգելն է կամ համակարգիչը վերագործարկելը։'
  },
  {
    id: 'ex-95',
    type: 'speaking',
    level: 'A2',
    skill: 'speaking',
    category: 'Ճանապարհորդություն',
    promptEn: 'How do you ask for the Wi-Fi password at a hotel?',
    promptAm: 'Ինչպե՞ս կհարցնեք Wi-Fi-ի գաղտնաբառը հյուրանոցում․',
    audioText: 'How do you ask for the Wi-Fi password at a hotel?',
    correctAnswer: 'Could you please give me the Wi-Fi password?',
    acceptedAnswers: [
      'Could you please give me the Wi-Fi password?',
      'Can you give me the Wi-Fi password?',
      'What is the Wi-Fi password?',
      'What\'s the Wi-Fi password?',
      'Could you tell me the Wi-Fi password please?',
      'May I have the Wi-Fi password?'
    ],
    hintAm: 'Ասեք՝ «Could you please give me the Wi-Fi password?» կամ «What is the Wi-Fi password?»։',
    explanationAm: 'Հյուրանոցում կամ գրասենյակում քաղաքավարի հարցնելու համար օգտագործեք «Could you please tell me the Wi-Fi password?» կամ «What is the Wi-Fi password?»։'
  },
  {
    id: 'ex-96',
    type: 'speaking',
    level: 'A2',
    skill: 'speaking',
    category: 'Աշխատանք',
    promptEn: 'What do you say when you answer a support phone call?',
    promptAm: 'Ի՞նչ եք ասում, երբ պատասխանում եք IT աջակցության հեռախոսազանգին․',
    audioText: 'What do you say when you answer a support phone call?',
    correctAnswer: 'Hello, this is IT support, how can I help you?',
    acceptedAnswers: [
      'Hello, this is IT support, how can I help you?',
      'Hello this is IT support how can I help you',
      'Good morning, IT helpdesk, how can I help you?',
      'Hello, how can I help you today?',
      'Hi, this is IT support, how may I help you?'
    ],
    hintAm: 'Ասեք՝ «Hello, this is IT support, how can I help you?»։',
    explanationAm: 'Հեռախոսով ներկայանալիս անգլերենում օգտագործվում է «This is [անուն / բաժին]» և «How can I help you?» արտահայտությունը։'
  },
  {
    id: 'ex-97',
    type: 'speaking',
    level: 'B1',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'What do you do when the network is down?',
    promptAm: 'Պատասխանեք հարցին՝ «Ի՞նչ եք անում, երբ ցանցը չի աշխատում (անջատված է)»․',
    audioText: 'What do you do when the network is down?',
    correctAnswer: 'I check the router and the network switches.',
    acceptedAnswers: [
      'I check the router and the network switches.',
      'I check the router and switches.',
      'I check the cables and restart the router.',
      'First I check the router and then I test the internet connection.',
      'I check the network cables and router status.',
      'I ping the gateway and check the switch.'
    ],
    hintAm: 'Ասեք՝ «I check the router and the network switches» կամ «I check the cables and restart the router»։',
    explanationAm: 'Տեխնիկական գործողությունների հաջորդականությունը նկարագրելիս օգտագործեք պարզ և հստակ բայեր՝ check, test, ping, restart։'
  },
  {
    id: 'ex-98',
    type: 'speaking',
    level: 'B1',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'What do you say to a user who forgot their Windows password?',
    promptAm: 'Ի՞նչ կասեք օգտատիրոջը, ով մոռացել է իր Windows-ի գաղտնաբառը․',
    audioText: 'What do you say to a user who forgot their Windows password?',
    correctAnswer: 'I will reset your password in Active Directory.',
    acceptedAnswers: [
      'I will reset your password in Active Directory.',
      'I\'ll reset your password in Active Directory.',
      'I can reset your password and give you a temporary one.',
      'Let me reset your password for you.',
      'I will reset your password right now.'
    ],
    hintAm: 'Ասեք՝ «I will reset your password in Active Directory» կամ «Let me reset your password for you»։',
    explanationAm: 'Օգտատիրոջը հանգստացնելու և արագ լուծում առաջարկելու համար օգտագործեք «I will reset your password...» կամ «Let me reset your password for you»։'
  },
  {
    id: 'ex-99',
    type: 'speaking',
    level: 'B1',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'How do you ask a colleague if you can connect to their computer remotely?',
    promptAm: 'Ինչպե՞ս կհարցնեք գործընկերոջը՝ արդյոք կարող եք հեռահար միանալ նրա համակարգչին․',
    audioText: 'How do you ask a colleague if you can connect to their computer remotely?',
    correctAnswer: 'Can I connect to your computer remotely?',
    acceptedAnswers: [
      'Can I connect to your computer remotely?',
      'May I connect to your computer remotely?',
      'Could I connect to your PC remotely to check the issue?',
      'Can I remote into your computer?',
      'Could you send me your AnyDesk ID so I can connect remotely?'
    ],
    hintAm: 'Ասեք՝ «Can I connect to your computer remotely?»։',
    explanationAm: 'Հեռահար միացման թույլտվություն հարցնելը («Can I connect to your computer remotely?») IT էթիկայի կարևոր մաս է։'
  },
  {
    id: 'ex-100',
    type: 'speaking',
    level: 'B1',
    skill: 'speaking',
    category: 'Աշխատանք',
    promptEn: 'Tell me briefly about your daily responsibilities at work.',
    promptAm: 'Հակիրճ պատմեք աշխատավայրում ձեր ամենօրյա պարտականությունների մասին․',
    audioText: 'Tell me briefly about your daily responsibilities at work.',
    correctAnswer: 'I manage the company network and help users with computer problems.',
    acceptedAnswers: [
      'I manage the company network and help users with computer problems.',
      'I support employees and maintain our servers and network.',
      'I am responsible for technical support and network administration.',
      'I troubleshoot hardware and software issues for our team.',
      'I manage Active Directory, Microsoft 365, and office network equipment.'
    ],
    hintAm: 'Ասեք՝ «I manage the company network and help users with computer problems»։',
    explanationAm: 'Պարտականությունները նկարագրելիս օգտագործեք գործողության բայեր՝ manage, maintain, support, troubleshoot, configure։'
  },
  {
    id: 'ex-101',
    type: 'speaking',
    level: 'B2',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'Can you explain the difference between a router and a switch?',
    promptAm: 'Բացատրեք անգլերենով երթուղիչի (router) և կոմուտատորի (switch) տարբերությունը․',
    audioText: 'Can you explain the difference between a router and a switch?',
    correctAnswer: 'A switch connects devices within one local network, while a router connects different networks together.',
    acceptedAnswers: [
      'A switch connects devices within one local network, while a router connects different networks together.',
      'A switch connects devices on a local network and a router connects the network to the internet.',
      'Switches connect devices in a LAN, whereas routers connect different networks.',
      'A router connects different networks and a switch connects computers in the same network.'
    ],
    hintAm: 'Ասեք՝ «A switch connects devices on a local network, while a router connects different networks together»։',
    explanationAm: 'Համեմատություն կատարելիս շատ հարմար է օգտագործել «while» կամ «whereas» (մինչդեռ) շաղկապները։'
  },
  {
    id: 'ex-102',
    type: 'speaking',
    level: 'B2',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'What does DNS do in a computer network?',
    promptAm: 'Բացատրեք անգլերենով, թե ինչ է անում DNS-ը համակարգչային ցանցում․',
    audioText: 'What does DNS do in a computer network?',
    correctAnswer: 'DNS translates domain names into IP addresses.',
    acceptedAnswers: [
      'DNS translates domain names into IP addresses.',
      'It translates domain names into IP addresses.',
      'DNS converts website names into IP addresses so computers can connect.',
      'DNS resolves domain names to IP addresses.'
    ],
    hintAm: 'Ասեք՝ «DNS translates domain names into IP addresses» (կամ resolves domain names to IP addresses)։',
    explanationAm: 'Տեխնիկական հարցազրույցներում DNS-ի ամենահստակ սահմանումն է՝ «DNS translates (or resolves) domain names into IP addresses»։'
  },
  {
    id: 'ex-103',
    type: 'speaking',
    level: 'B2',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'How do you troubleshoot a network printer that is not printing?',
    promptAm: 'Ինչպե՞ս եք ախտորոշում և լուծում ցանցային տպիչի խնդիրը, երբ այն չի տպում․',
    audioText: 'How do you troubleshoot a network printer that is not printing?',
    correctAnswer: 'First I check if the printer is online and ping its IP address, then I restart the print spooler service.',
    acceptedAnswers: [
      'First I check if the printer is online and ping its IP address, then I restart the print spooler service.',
      'I check the paper tray, ping the printer IP address, and clear the print queue.',
      'I check if the printer is connected to the network and restart the print spooler.',
      'First I check the network connection and print queue, then I reinstall the printer driver.'
    ],
    hintAm: 'Նշեք քայլերը՝ «First I check if the printer is online and ping its IP address, then I restart the print spooler service»։',
    explanationAm: 'Տպիչների խնդիրների լուծման հիմնական տերմիններն են՝ print queue (տպման հերթ), print spooler service, printer driver և ping the IP address։'
  },
  {
    id: 'ex-104',
    type: 'speaking',
    level: 'B2',
    skill: 'speaking',
    category: 'Աշխատանք',
    promptEn: 'Why do you want to work as an IT specialist at an international company?',
    promptAm: 'Պատասխանեք հարցազրույցի հարցին՝ «Ինչո՞ւ եք ցանկանում աշխատել որպես IT մասնագետ միջազգային ընկերությունում»․',
    audioText: 'Why do you want to work as an IT specialist at an international company?',
    correctAnswer: 'I want to work with modern technologies and grow professionally in an international team.',
    acceptedAnswers: [
      'I want to work with modern technologies and grow professionally in an international team.',
      'I want to improve my skills, work on large-scale infrastructure, and collaborate with global teams.',
      'Because I enjoy solving complex technical challenges and working in a global environment.',
      'I would like to apply my experience in network administration and grow in an international company.'
    ],
    hintAm: 'Ասեք՝ «I want to work with modern technologies and grow professionally in an international team»։',
    explanationAm: 'Հարցազրույցի ժամանակ շեշտեք մասնագիտական աճը (grow professionally), ժամանակակից տեխնոլոգիաները (modern technologies) և թիմային աշխատանքը։'
  },
  {
    id: 'ex-105',
    type: 'speaking',
    level: 'C1',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'How would you explain a server outage to a non-technical manager?',
    promptAm: 'Ինչպե՞ս կբացատրեք սերվերի խափանումը ոչ տեխնիկական մենեջերին պարզ և հանգիստ լեզվով․',
    audioText: 'How would you explain a server outage to a non-technical manager?',
    correctAnswer: 'Our main server experienced a temporary issue, and our team is actively working to restore service within thirty minutes.',
    acceptedAnswers: [
      'Our main server experienced a temporary issue, and our team is actively working to restore service within thirty minutes.',
      'The system is temporarily unavailable due to a hardware issue, and we are switching to the backup server right now.',
      'We are experiencing a brief system outage, and we expect everything to be back online shortly.',
      'Our team has identified the issue with the main server and we are restoring access now.'
    ],
    hintAm: 'Նշեք, որ խնդիրը հայտնաբերված է և նշեք վերականգնման ժամկետ՝ «Our main server experienced a temporary issue, and our team is actively working to restore service...»։',
    explanationAm: 'Ոչ տեխնիկական ղեկավարության հետ խոսելիս կարևոր է խուսափել բարդ ժարգոնից և նշել ազդեցությունն ու լուծման սպասվող ժամանակը (ETA)։'
  },
  {
    id: 'ex-106',
    type: 'speaking',
    level: 'C1',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'What steps do you take when onboarding a new employee in IT?',
    promptAm: 'Ի՞նչ քայլեր եք կատարում նոր աշխատակցի համար IT հաշիվներ և համակարգիչ պատրաստելիս (IT onboarding)․',
    audioText: 'What steps do you take when onboarding a new employee in IT?',
    correctAnswer: 'I create their user account in Active Directory, assign a Microsoft 365 license, and configure their laptop.',
    acceptedAnswers: [
      'I create their user account in Active Directory, assign a Microsoft 365 license, and configure their laptop.',
      'First I set up their Active Directory account and email, then I install the required software on their workstation.',
      'I prepare their laptop, create their domain account, and grant access to the necessary security groups.',
      'I configure their computer, set up their Microsoft 365 mailbox, and explain our security policies.'
    ],
    hintAm: 'Ասեք՝ «I create their user account in Active Directory, assign a Microsoft 365 license, and configure their laptop»։',
    explanationAm: 'Նոր աշխատակցի ընդունման գործընթացը կոչվում է «onboarding», իսկ հաշիվների և սարքերի տրամադրումը՝ «user provisioning»։'
  },
  {
    id: 'ex-107',
    type: 'speaking',
    level: 'C2',
    skill: 'speaking',
    category: 'IT Անգլերեն',
    promptEn: 'How do you handle a suspected phishing attack reported by an employee?',
    promptAm: 'Ի՞նչ գործողություններ եք ձեռնարկում, երբ աշխատակիցը հայտնում է կասկածելի ֆիշինգային նամակի մասին․',
    audioText: 'How do you handle a suspected phishing attack reported by an employee?',
    correctAnswer: 'I immediately isolate the affected workstation, reset the user credentials, and block the sender domain across the mail server.',
    acceptedAnswers: [
      'I immediately isolate the affected workstation, reset the user credentials, and block the sender domain across the mail server.',
      'First I check if the user clicked the link, then I reset their password, revoke active sessions, and block the malicious email.',
      'I quarantine the phishing email in Microsoft 365, reset the compromised credentials, and scan the computer for malware.',
      'I reset the user password immediately, check sign-in logs in Azure AD, and block the malicious sender.'
    ],
    hintAm: 'Նշեք անվտանգության քայլերը՝ «I immediately isolate the affected workstation, reset the user credentials, and block the sender domain...»։',
    explanationAm: 'Տեղեկատվական անվտանգության միջադեպերի (incident response) ժամանակ կարևոր բառապաշարն է՝ isolate the workstation, reset credentials, revoke active sessions, quarantine the email։'
  },
  {
    id: 'ex-108',
    type: 'speaking',
    level: 'C2',
    skill: 'speaking',
    category: 'Աշխատանք',
    promptEn: 'Describe a challenging technical problem you solved and what you learned from it.',
    promptAm: 'Պատմեք մի բարդ տեխնիկական խնդրի մասին, որը լուծել եք, և թե ինչ եք սովորել դրանից․',
    audioText: 'Describe a challenging technical problem you solved and what you learned from it.',
    correctAnswer: 'When our primary switch failed unexpectedly, I reconfigured the backup switch to restore connectivity and later implemented automated configuration backups.',
    acceptedAnswers: [
      'When our primary switch failed unexpectedly, I reconfigured the backup switch to restore connectivity and later implemented automated configuration backups.',
      'I resolved a critical DHCP conflict that affected the entire office, and it taught me the importance of network monitoring and documentation.',
      'During a server outage, I restored the system from backups within an hour and afterward improved our disaster recovery procedure.',
      'I diagnosed a complex VPN routing issue between two branch offices and documented the solution for the entire support team.'
    ],
    hintAm: 'Օգտագործեք STAR մեթոդը (Իրավիճակ, Գործողություն, Արդյունք)՝ օրինակ՝ «When our primary switch failed, I reconfigured the backup switch to restore connectivity...»։',
    explanationAm: 'Ավագ մասնագետի հարցազրույցներում նման հարցերին պատասխանելիս կարևոր է նշել ոչ միայն արագ լուծումը, այլև հետագա կանխարգելիչ քայլերը (preventive measures & documentation)։'
  }
  ,...ADDITIONAL_EXERCISES,
];
