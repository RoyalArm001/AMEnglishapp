import {
  ExerciseItem,
  LessonItem,
  ProfessionId,
  ProfessionTrackMeta,
  VocabularyItem,
} from '../lib/types';

export const PROFESSIONS_LIST: ProfessionTrackMeta[] = [
  {
    id: 'IT Specialist',
    titleEn: 'IT Specialist',
    titleAm: 'ՏՏ մասնագետ (IT Specialist)',
    icon: '💻',
    descriptionAm: 'Համակարգչային խնդիրների ախտորոշում, ցանցեր, գործընկերների աջակցություն և IT հարցազրույցներ։',
    topics: [
      { titleEn: 'Computer Troubleshooting', titleAm: 'Համակարգչային խնդիրների լուծում' },
      { titleEn: 'Network Problems', titleAm: 'Ցանցային խնդիրներ' },
      { titleEn: 'Talking to Colleagues', titleAm: 'Շփում գործընկերների հետ' },
      { titleEn: 'Technical Support', titleAm: 'Տեխնիկական աջակցություն' },
      { titleEn: 'IT Job Interview', titleAm: 'ՏՏ աշխատանքային հարցազրույց' },
    ],
    sampleSentences: [
      {
        id: 'prof-it-1',
        english: 'I am checking your computer right now.',
        pronunciation: 'Այ եմ չեքինգ յոր քոմփյութըր րայթ նաու։',
        armenian: 'Ես հենց հիմա ստուգում եմ ձեր համակարգիչը։',
      },
      {
        id: 'prof-it-2',
        english: 'Please restart your laptop after the security update finishes.',
        pronunciation: 'Փլիզ րիսթարթ յոր լեփթոփ աֆթըր դը սիքյուրիթի ափդեյթ ֆինիշիզ։',
        armenian: 'Խնդրում եմ վերագործարկեք ձեր նոութբուքը անվտանգության թարմացման ավարտից հետո։',
      },
    ],
  },
  {
    id: 'Software Developer',
    titleEn: 'Software Developer',
    titleAm: 'Ծրագրավորող (Software Developer)',
    icon: '🧑‍💻',
    descriptionAm: 'Կոդի քննարկում (Code Review), Git, API ինտեգրում, Daily Standup և տեխնիկական ճարտարապետություն։',
    topics: [
      { titleEn: 'Daily Standup & Agile', titleAm: 'Ամենօրյա Standup և Agile' },
      { titleEn: 'Code Review & Pull Requests', titleAm: 'Կոդի ստուգում և Pull Request-ներ' },
      { titleEn: 'Debugging & APIs', titleAm: 'Սխալների շտկում և API-ներ' },
    ],
    sampleSentences: [
      {
        id: 'prof-dev-1',
        english: 'I pushed the bug fix to the main branch and opened a pull request.',
        pronunciation: 'Այ փուշթ դը բագ ֆիքս թու դը մեյն բրենչ ընդ օուփընդ ը փուլ րիքուեսթ։',
        armenian: 'Ես ուղարկեցի սխալի ուղղումը հիմնական ճյուղ և բացեցի pull request։',
      },
    ],
  },
  {
    id: 'Network Administrator',
    titleEn: 'Network Administrator',
    titleAm: 'Ցանցային ադմինիստրատոր (Network Administrator)',
    icon: '🌐',
    descriptionAm: 'Երթուղիչներ (Routers), կոմուտատորներ (Switches), VPN, VLAN, DNS, DHCP և firewall անվտանգություն։',
    topics: [
      { titleEn: 'Router & Switch Configuration', titleAm: 'Router-ի և Switch-ի կարգավորում' },
      { titleEn: 'VPN, DNS & DHCP', titleAm: 'VPN, DNS և DHCP կառավարում' },
      { titleEn: 'Network Outage Response', titleAm: 'Ցանցային խափանումների արձագանքում' },
    ],
    sampleSentences: [
      {
        id: 'prof-net-1',
        english: 'We configured a separate VLAN for the guest Wi-Fi network.',
        pronunciation: 'Ուի քընֆիգյուրդ ը սեփըրեյթ վի լեն ֆոր դը գեսթ վայ-ֆայ նեթուըրք։',
        armenian: 'Մենք կարգավորեցինք առանձին VLAN հյուրերի Wi-Fi ցանցի համար։',
      },
    ],
  },
  {
    id: 'System Administrator',
    titleEn: 'System Administrator',
    titleAm: 'Համակարգային ադմինիստրատոր (System Administrator)',
    icon: '🖥️',
    descriptionAm: 'Windows/Linux սերվերներ, Active Directory, պահուստային պատճեններ (Backups) և ամպային համակարգեր։',
    topics: [
      { titleEn: 'Active Directory & Permissions', titleAm: 'Active Directory և իրավունքներ' },
      { titleEn: 'Server Maintenance & Backups', titleAm: 'Սերվերների սպասարկում և Backup-ներ' },
      { titleEn: 'Microsoft 365 & Cloud', titleAm: 'Microsoft 365 և ամպային ծառայություններ' },
    ],
    sampleSentences: [
      {
        id: 'prof-sys-1',
        english: 'All nightly server backups completed without any errors.',
        pronunciation: 'Օլ նայթլի սըրվըր բեքափս քըմփլիթիդ ուիդաութ էնի էրըրզ։',
        armenian: 'Սերվերի բոլոր գիշերային պահուստային պատճենումները ավարտվել են առանց սխալների։',
      },
    ],
  },
  {
    id: 'Engineer',
    titleEn: 'Engineer',
    titleAm: 'Ինժեներ (Engineer)',
    icon: '⚙️',
    descriptionAm: 'Տեխնիկական գծագրեր, նախագծերի պլանավորում, անվտանգության ստանդարտներ և սարքավորումների փորձարկում։',
    topics: [
      { titleEn: 'Technical Specifications', titleAm: 'Տեխնիկական բնութագրեր' },
      { titleEn: 'Project Quality & Safety', titleAm: 'Նախագծի որակ և անվտանգություն' },
    ],
    sampleSentences: [
      {
        id: 'prof-eng-1',
        english: 'We need to test the equipment according to safety standards.',
        pronunciation: 'Ուի նիդ թու թեսթ դի իքուիփմընթ ըքորդինգ թու սեյֆթի սթենդըրդզ։',
        armenian: 'Մենք պետք է փորձարկենք սարքավորումը՝ անվտանգության ստանդարտներին համապատասխան։',
      },
    ],
  },
  {
    id: 'Doctor',
    titleEn: 'Doctor',
    titleAm: 'Բժիշկ (Doctor)',
    icon: '🩺',
    descriptionAm: 'Շփում հիվանդների հետ, բժշկական տերմինաբանություն, ախտանիշների հարցում և հիվանդանոցային զրույցներ։',
    topics: [
      { titleEn: 'Speaking with Patients', titleAm: 'Շփում բուժառուների հետ' },
      { titleEn: 'Medical Terminology', titleAm: 'Բժշկական տերմինաբանություն' },
      { titleEn: 'Hospital Conversations', titleAm: 'Հիվանդանոցային խոսակցություններ' },
    ],
    sampleSentences: [
      {
        id: 'prof-doc-1',
        english: 'Where do you feel the pain, and when did the symptoms start?',
        pronunciation: 'Ուեըր դու յու ֆիլ դը փեյն, ընդ ուեն դիդ դը սիմփթըմզ սթարթ։',
        armenian: 'Որտե՞ղ եք ցավ զգում, և ե՞րբ են սկսվել ախտանիշները։',
      },
      {
        id: 'prof-doc-2',
        english: 'Take this medicine twice a day after meals.',
        pronunciation: 'Թեյք դիս մեդիսին թուայս ը դեյ աֆթըր միլզ։',
        armenian: 'Ընդունեք այս դեղը օրական երկու անգամ՝ ուտելուց հետո։',
      },
    ],
  },
  {
    id: 'Teacher',
    titleEn: 'Teacher',
    titleAm: 'Ուսուցիչ / Դասախոս (Teacher)',
    icon: '📚',
    descriptionAm: 'Դասարանի կառավարում, նյութի բացատրություն, ուսանողների գնահատում և ակադեմիական հաղորդակցում։',
    topics: [
      { titleEn: 'Classroom Instructions', titleAm: 'Դասարանային ցուցումներ' },
      { titleEn: 'Explaining New Topics', titleAm: 'Նոր թեմաների բացատրություն' },
    ],
    sampleSentences: [
      {
        id: 'prof-tch-1',
        english: 'Let us review the main points of today’s lesson together.',
        pronunciation: 'Լեթ աս րիվյու դը մեյն փոյնթս օվ թըդեյզ լեսըն թըգեդըր։',
        armenian: 'Եկեք միասին կրկնենք այսօրվա դասի հիմնական կետերը։',
      },
    ],
  },
  {
    id: 'Student',
    titleEn: 'Student',
    titleAm: 'Ուսանող (Student)',
    icon: '🎓',
    descriptionAm: 'Համալսարանական կյանք, լսարանային խոսակցություններ, քննություններ և առօրյա անգլերեն։',
    topics: [
      { titleEn: 'University', titleAm: 'Համալսարան և դասախոսություններ' },
      { titleEn: 'Classroom Conversations', titleAm: 'Լսարանային խոսակցություններ' },
      { titleEn: 'Daily English', titleAm: 'Առօրյա ուսանողական անգլերեն' },
    ],
    sampleSentences: [
      {
        id: 'prof-stu-1',
        english: 'When is the deadline for submitting our research project?',
        pronunciation: 'Ուեն իզ դը դեդլայն ֆոր սըբմիթինգ աուըր րիսըրչ փրոջեքթ։',
        armenian: 'Ե՞րբ է մեր հետազոտական աշխատանքը հանձնելու վերջնաժամկետը։',
      },
    ],
  },
  {
    id: 'Accountant',
    titleEn: 'Accountant',
    titleAm: 'Հաշվապահ (Accountant)',
    icon: '📊',
    descriptionAm: 'Ֆինանսական հաշվետվություններ, հաշիվ-ապրանքագրեր (Invoices), հարկեր, բյուջե և աուդիտ։',
    topics: [
      { titleEn: 'Financial Reports & Budgets', titleAm: 'Ֆինանսական հաշվետվություններ և բյուջե' },
      { titleEn: 'Invoices & Payments', titleAm: 'Հաշիվ-ապրանքագրեր և վճարումներ' },
    ],
    sampleSentences: [
      {
        id: 'prof-acc-1',
        english: 'We have verified all the invoices for the third quarter.',
        pronunciation: 'Ուի հեվ վերիֆայդ օլ դի ինվոյսիզ ֆոր դը թըրդ քուորթըր։',
        armenian: 'Մենք ստուգել ենք երրորդ եռամսյակի բոլոր հաշիվ-ապրանքագրերը։',
      },
    ],
  },
  {
    id: 'Driver',
    titleEn: 'Driver',
    titleAm: 'Վարորդ (Driver)',
    icon: '🚗',
    descriptionAm: 'Ուղղություններ, տրանսպորտ, երթևեկություն, առաքում և ուղևորների հետ շփում։',
    topics: [
      { titleEn: 'Directions', titleAm: 'Ուղղություններ և տեղորոշում' },
      { titleEn: 'Transport', titleAm: 'Տրանսպորտ և ուղևորափոխադրում' },
      { titleEn: 'Road Conversations', titleAm: 'Ճանապարհային խոսակցություններ' },
    ],
    sampleSentences: [
      {
        id: 'prof-drv-1',
        english: 'Should I take the highway or go through the city center?',
        pronunciation: 'Շուդ այ թեյք դը հայուեյ օր գոու թրու դը սիթի սենթըր։',
        armenian: 'Մայրուղո՞վ գնամ, թե՞ քաղաքի կենտրոնով։',
      },
    ],
  },
  {
    id: 'Manager',
    titleEn: 'Manager',
    titleAm: 'Մենեջեր / Ղեկավար (Manager)',
    icon: '👔',
    descriptionAm: 'Թիմի կառավարում, ժողովների վարում, KPI-ներ, բանակցություններ և նախագծերի վերահսկում։',
    topics: [
      { titleEn: 'Team Management & Meetings', titleAm: 'Թիմի կառավարում և ժողովներ' },
      { titleEn: 'Project Deadlines & Goals', titleAm: 'Նախագծի ժամկետներ և նպատակներ' },
    ],
    sampleSentences: [
      {
        id: 'prof-mgr-1',
        english: 'Let us review our weekly targets and assign the new tasks.',
        pronunciation: 'Լեթ աս րիվյու աուըր ուիքլի թարգեթս ընդ ըսայն դը նյու թասքս։',
        armenian: 'Եկեք վերանայենք մեր շաբաթական թիրախները և բաշխենք նոր առաջադրանքները։',
      },
    ],
  },
  {
    id: 'Business Owner',
    titleEn: 'Business Owner',
    titleAm: 'Բիզնեսի սեփականատեր (Business Owner)',
    icon: '🏢',
    descriptionAm: 'Գործընկերների հետ բանակցություններ, պայմանագրեր, ներդրումներ և միջազգային համագործակցություն։',
    topics: [
      { titleEn: 'Business Negotiations', titleAm: 'Գործարար բանակցություններ' },
      { titleEn: 'Contracts & Partnerships', titleAm: 'Պայմանագրեր և գործընկերություն' },
    ],
    sampleSentences: [
      {
        id: 'prof-own-1',
        english: 'We are looking for reliable partners to expand our services.',
        pronunciation: 'Ուի ար լուքինգ ֆոր րիլայըբըլ փարթնըրզ թու իքսփենդ աուըր սըրվիսիզ։',
        armenian: 'Մենք փնտրում ենք վստահելի գործընկերներ՝ մեր ծառայությունները ընդլայնելու համար։',
      },
    ],
  },
  {
    id: 'Sales Specialist',
    titleEn: 'Sales Specialist',
    titleAm: 'Վաճառքի մասնագետ (Sales Specialist)',
    icon: '🤝',
    descriptionAm: 'Ապրանքի ներկայացում, հաճախորդների սպասարկում, գնային առաջարկներ և գործարքների փակում։',
    topics: [
      { titleEn: 'Product Presentation', titleAm: 'Ապրանքի և ծառայության ներկայացում' },
      { titleEn: 'Client Communication', titleAm: 'Հաղորդակցում հաճախորդների հետ' },
    ],
    sampleSentences: [
      {
        id: 'prof-sls-1',
        english: 'This package includes full technical support and a twenty percent discount.',
        pronunciation: 'Դիս փեքիջ ինքլուդզ ֆուլ թեքնիքըլ սըփորթ ընդ ը թուենթի փըրսենթ դիսքաունթ։',
        armenian: 'Այս փաթեթը ներառում է լիարժեք տեխնիկական աջակցություն և քսան տոկոս զեղչ։',
      },
    ],
  },
  {
    id: 'Designer',
    titleEn: 'Designer',
    titleAm: 'Դիզայներ (Designer)',
    icon: '🎨',
    descriptionAm: 'UI/UX դիզայն, գունային լուծումներ, նախատիպերի (Prototypes) ներկայացում և պատվիրատուի հետ քննարկում։',
    topics: [
      { titleEn: 'UI/UX & Design Reviews', titleAm: 'UI/UX և դիզայնի քննարկում' },
      { titleEn: 'Client Feedback & Revisions', titleAm: 'Պատվիրատուի կարծիք և փոփոխություններ' },
    ],
    sampleSentences: [
      {
        id: 'prof-dsg-1',
        english: 'I updated the mobile layout to make the navigation clearer for users.',
        pronunciation: 'Այ ափդեյթիդ դը մոբայլ լեյաութ թու մեյք դը նեվիգեյշըն քլիըրըր ֆոր յուզըրզ։',
        armenian: 'Ես թարմացրի բջջային դասավորությունը՝ նավիգացիան օգտատերերի համար ավելի պարզ դարձնելու նպատակով։',
      },
    ],
  },
  {
    id: 'Other',
    titleEn: 'Other — Այլ մասնագիտություն',
    titleAm: 'Այլ մասնագիտություն (Other)',
    icon: '✨',
    descriptionAm: 'Ընդհանուր գործնական, աշխատանքային և առօրյա անգլերեն՝ հարմարեցված Ձեր նշած մասնագիտությանը։',
    topics: [
      { titleEn: 'Workplace Communication', titleAm: 'Աշխատանքային հաղորդակցում' },
      { titleEn: 'Everyday Conversations', titleAm: 'Առօրյա խոսակցություններ' },
    ],
    sampleSentences: [
      {
        id: 'prof-oth-1',
        english: 'I want to use English confidently in my daily work.',
        pronunciation: 'Այ ուոնթ թու յուզ Ինգլիշ քոնֆիդընթլի ին մայ դեյլի ուըրք։',
        armenian: 'Ես ուզում եմ վստահորեն օգտագործել անգլերենը իմ ամենօրյա աշխատանքում։',
      },
    ],
  },
];

/**
 * Additional Profession-Focused Lessons integrated into the main lessons catalog
 */
export const PROFESSION_LESSONS: LessonItem[] = [
  {
    id: 'lesson-23-doctor-medical',
    categoryId: 'professional-english',
    order: 23,
    titleAm: 'Բժշկական անգլերեն՝ Շփում բուժառուների հետ և Ախտանիշներ',
    titleEn: 'Doctor English: Speaking with Patients & Medical Terms',
    descriptionAm: 'Հիվանդանոցային երկխոսություններ, գանգատների հարցում և բժշկական ցուցումներ։',
    level: 'B1',
    estimatedMinutes: 10,
    grammarTipAm: 'Բուժառուի վիճակը հարցնելիս օգտագործիր «How long have you had...» (Որքա՞ն ժամանակ է՝ ունեք...)։',
    recommendedProfessions: ['Doctor'],
    sentences: [
      {
        id: 's-doc-1',
        english: 'Good morning. Please sit down and tell me what brings you here today.',
        pronunciation: 'Գուդ մորնինգ։ Փլիզ սիթ դաուն ընդ թել մի ուաթ բրինգզ յու հիըր թըդեյ։',
        armenian: 'Բարի առավոտ։ Խնդրում եմ նստեք և ասեք՝ ինչ գանգատով եք այսօր դիմել։',
      },
      {
        id: 's-doc-2',
        english: 'How long have you had this fever and headache?',
        pronunciation: 'Հաու լոնգ հեվ յու հեդ դիս ֆիվըր ընդ հեդեյք։',
        armenian: 'Որքա՞ն ժամանակ է, ինչ ունեք այս ջերմությունը և գլխացավը։',
      },
      {
        id: 's-doc-3',
        english: 'I will check your blood pressure and listen to your lungs.',
        pronunciation: 'Այ ուիլ չեք յոր բլադ փրեշըր ընդ լիսըն թու յոր լանգզ։',
        armenian: 'Ես կչափեմ Ձեր արյան ճնշումը և կլսեմ Ձեր թոքերը։',
      },
      {
        id: 's-doc-4',
        english: 'Are you allergic to any medications?',
        pronunciation: 'Ար յու ըլըրջիք թու էնի մեդիքեյշընզ։',
        armenian: 'Դուք որևէ դեղամիջոցից ալերգիա ունե՞ք։',
      },
      {
        id: 's-doc-5',
        english: 'Take one tablet twice a day after meals and drink plenty of water.',
        pronunciation: 'Թեյք ուան թեբլեթ թուայս ը դեյ աֆթըր միլզ ընդ դրինք փլենթի օվ ուոթըր։',
        armenian: 'Ընդունեք մեկ հաբ օրական երկու անգամ՝ ուտելուց հետո, և խմեք շատ ջուր։',
      },
    ],
  },
  {
    id: 'lesson-24-driver-transport',
    categoryId: 'professional-english',
    order: 24,
    titleAm: 'Վարորդի անգլերեն՝ Ուղղություններ, Տրանսպորտ և Ճանապարհային զրույցներ',
    titleEn: 'Driver English: Directions, Transport & Road Conversations',
    descriptionAm: 'Ուղևորների հետ շփում, հասցեների ճշտում, երթևեկություն և առաքում։',
    level: 'A2',
    estimatedMinutes: 9,
    grammarTipAm: 'Հասցեն կամ երթուղին ճշտելիս օգտագործիր «Would you like me to...» կամ «It will take about...»։',
    recommendedProfessions: ['Driver'],
    sentences: [
      {
        id: 's-drv-1',
        english: 'Hello! Please confirm your destination address on the map.',
        pronunciation: 'Հելոու։ Փլիզ քընֆըրմ յոր դեսթինեյշըն ըդրես օն դը մեփ։',
        armenian: 'Բարև ձեզ։ Խնդրում եմ հաստատեք Ձեր նպատակակետի հասցեն քարտեզի վրա։',
      },
      {
        id: 's-drv-2',
        english: 'There is heavy traffic on the main street, so I will take a faster route.',
        pronunciation: 'Դեըր իզ հեվի թրեֆիք օն դը մեյն սթրիթ, սոու այ ուիլ թեյք ը ֆեսթըր րութ։',
        armenian: 'Գլխավոր փողոցում խիտ երթևեկություն է, ուստի ես կգնամ ավելի արագ երթուղով։',
      },
      {
        id: 's-drv-3',
        english: 'We will arrive at the airport terminal in about fifteen minutes.',
        pronunciation: 'Ուի ուիլ ըրայվ էթ դի էըրփորթ թըրմինըլ ին ըբաութ ֆիֆթին մինիթս։',
        armenian: 'Մենք կհասնենք օդանավակայանի տերմինալ մոտ տասնհինգ րոպեից։',
      },
      {
        id: 's-drv-4',
        english: 'Where should I park the car to unload the delivery boxes?',
        pronunciation: 'Ուեըր շուդ այ փարք դը քար թու անլոուդ դը դիլիվըրի բոքսիզ։',
        armenian: 'Որտե՞ղ կայանեմ մեքենան՝ առաքման տուփերը բեռնաթափելու համար։',
      },
      {
        id: 's-drv-5',
        english: 'You can pay either by card or in cash. Thank you for riding with me!',
        pronunciation: 'Յու քեն փեյ իդըր բայ քարդ օր ին քեշ։ Թենք յու ֆոր րայդինգ ուիդ մի։',
        armenian: 'Կարող եք վճարել քարտով կամ կանխիկ։ Շնորհակալություն ուղևորության համար։',
      },
    ],
  },
  {
    id: 'lesson-25-student-university',
    categoryId: 'professional-english',
    order: 25,
    titleAm: 'Ուսանողական անգլերեն՝ Համալսարան, Դասախոսություններ և Քննություններ',
    titleEn: 'Student English: University & Classroom Conversations',
    descriptionAm: 'Հարցեր դասախոսին, խմբային նախագծեր, գրադարան և ակադեմիական շփում։',
    level: 'A2',
    estimatedMinutes: 9,
    grammarTipAm: 'Դասախոսին դիմելիս օգտագործիր «Could you please clarify...» (Կարո՞ղ եք պարզաբանել...)։',
    recommendedProfessions: ['Student', 'Teacher'],
    sentences: [
      {
        id: 's-stu-1',
        english: 'Excuse me, professor, could you please explain the second formula again?',
        pronunciation: 'Իքսքյուզ մի, փրըֆեսըր, քուդ յու փլիզ իքսփլեյն դը սեքընդ ֆորմյուլա ըգեն։',
        armenian: 'Ներեցեք, պրոֆեսոր, կարո՞ղ եք, խնդրում եմ, երկրորդ բանաձևը նորից բացատրել։',
      },
      {
        id: 's-stu-2',
        english: 'When is the deadline for submitting our semester assignment?',
        pronunciation: 'Ուեն իզ դը դեդլայն ֆոր սըբմիթինգ աուըր սիմեսթըր ըսայնմընթ։',
        armenian: 'Ե՞րբ է մեր կիսամյակային առաջադրանքը հանձնելու վերջնաժամկետը։',
      },
      {
        id: 's-stu-3',
        english: 'Let us meet at the university library at three o’clock to prepare our presentation.',
        pronunciation: 'Լեթ աս միթ էթ դը յունիվըրսիթի լայբրերի էթ թրի օքլոք թու փրիփեըր աուըր փրեզընթեյշըն։',
        armenian: 'Եկեք հանդիպենք համալսարանի գրադարանում ժամը երեքին՝ մեր պրեզենտացիան պատրաստելու համար։',
      },
      {
        id: 's-stu-4',
        english: 'I passed my final English exam with a high score.',
        pronunciation: 'Այ փասթ մայ ֆայնըլ Ինգլիշ իգզեմ ուիդ ը հայ սքոր։',
        armenian: 'Ես հանձնեցի անգլերենի իմ ավարտական քննությունը բարձր գնահատականով։',
      },
      {
        id: 's-stu-5',
        english: 'Can you share your lecture notes with me by email?',
        pronunciation: 'Քեն յու շեըր յոր լեքչըր նոութս ուիդ մի բայ իմեյլ։',
        armenian: 'Կարո՞ղ ես դասախոսության քո նշումները էլ․ փոստով ուղարկել ինձ։',
      },
    ],
  },
  {
    id: 'lesson-26-business-finance-design',
    categoryId: 'professional-english',
    order: 26,
    titleAm: 'Բիզնես, Վաճառք, Հաշվապահություն և Դիզայն',
    titleEn: 'Business, Sales, Finance & Design Communication',
    descriptionAm: 'Պայմանագրեր, հաճախորդների սպասարկում, ֆինանսական հաշվետվություններ և նախագծերի ներկայացում։',
    level: 'B1',
    estimatedMinutes: 10,
    grammarTipAm: 'Գործնական առաջարկ անելիս օգտագործիր «We would be happy to offer...» կամ «Please find attached...»։',
    recommendedProfessions: [
      'Accountant',
      'Manager',
      'Business Owner',
      'Sales Specialist',
      'Designer',
      'Engineer',
    ],
    sentences: [
      {
        id: 's-biz-1',
        english: 'Please find attached the financial report and invoice for October.',
        pronunciation: 'Փլիզ ֆայնդ ըթեչթ դը ֆայնենշըլ րիփորթ ընդ ինվոյս ֆոր Օքթոուբըր։',
        armenian: 'Կից ներկայացնում եմ հոկտեմբեր ամսվա ֆինանսական հաշվետվությունը և հաշիվ-ապրանքագիրը։',
      },
      {
        id: 's-biz-2',
        english: 'We can offer a fifteen percent discount for an annual contract.',
        pronunciation: 'Ուի քեն օֆըր ը ֆիֆթին փըրսենթ դիսքաունթ ֆոր էն էնյուըլ քոնթրեքթ։',
        armenian: 'Տարեկան պայմանագրի դեպքում մենք կարող ենք առաջարկել տասնհինգ տոկոս զեղչ։',
      },
      {
        id: 's-biz-3',
        english: 'I have updated the user interface design based on the client’s feedback.',
        pronunciation: 'Այ հեվ ափդեյթիդ դը յուզըր ինթըրֆեյս դիզայն բեյսթ օն դը քլայընթս ֆիդբեք։',
        armenian: 'Ես թարմացրել եմ օգտատիրոջ ինտերֆեյսի դիզայնը՝ հիմնվելով պատվիրատուի կարծիքի վրա։',
      },
      {
        id: 's-biz-4',
        english: 'Let us schedule a short call to discuss our partnership opportunities.',
        pronunciation: 'Լեթ աս սքեջուլ ը շորթ քոլ թու դիսքաս աուըր փարթնըրշիփ օփըրթյունիթիզ։',
        armenian: 'Եկեք կարճ զանգ պլանավորենք՝ մեր գործընկերության հնարավորությունները քննարկելու համար։',
      },
      {
        id: 's-biz-5',
        english: 'Our main priority is delivering high-quality results on time.',
        pronunciation: 'Աուըր մեյն փրայորիթի իզ դիլիվըրինգ հայ-քուոլիթի րիզալթս օն թայմ։',
        armenian: 'Մեր հիմնական առաջնահերթությունը բարձրորակ արդյունքների ժամանակին ապահովումն է։',
      },
    ],
  },
];

/**
 * Maps a user's selected profession to recommended lesson IDs and categories
 */
export function getRecommendedLessonIdsForProfession(profession: ProfessionId): string[] {
  switch (profession) {
    case 'IT Specialist':
    case 'Software Developer':
    case 'Network Administrator':
    case 'System Administrator':
      return [
        'lesson-11-it-support',
        'lesson-12-it-network-systems',
        'lesson-10-work-meetings',
        'lesson-14-interviews-intro',
        'lesson-20-listening-technical',
        'lesson-22-error-correction-work',
      ];
    case 'Doctor':
      return [
        'lesson-23-doctor-medical',
        'lesson-15-questions-answers',
        'lesson-8-daily-greetings',
        'lesson-6-time-dates',
      ];
    case 'Driver':
      return [
        'lesson-24-driver-transport',
        'lesson-7-directions',
        'lesson-4-numbers-small',
        'lesson-13-travel',
      ];
    case 'Student':
    case 'Teacher':
      return [
        'lesson-25-student-university',
        'lesson-8-daily-greetings',
        'lesson-9-daily-routines',
        'lesson-17-grammar-tenses',
      ];
    case 'Accountant':
    case 'Manager':
    case 'Business Owner':
    case 'Sales Specialist':
    case 'Designer':
    case 'Engineer':
      return [
        'lesson-26-business-finance-design',
        'lesson-10-work-meetings',
        'lesson-5-numbers-large',
        'lesson-14-interviews-intro',
      ];
    default:
      return [
        'lesson-1-days',
        'lesson-8-daily-greetings',
        'lesson-10-work-meetings',
        'lesson-26-business-finance-design',
      ];
  }
}

