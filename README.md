# HayLingo — Սովորիր անգլերեն հայերենով

![HayLingo app icon](public/favicon.svg)

**English learning for Armenian speakers · v1.2.0**

[Փոփոխությունների պատմություն / Changelog](CHANGELOG.md) · [Իրականացման հաշվետվություն](CODEX_IMPLEMENTATION_REPORT.md)

Նոր՝ էկրանը միացված պահել, Համակարգչային/Բջջային/Ավտոմատ ռեժիմ և չորս անկախ տառաչափեր (14–30px)։ [Ստուգման հաշվետվություն](DISPLAY_SETTINGS_REPORT.md)։

New: study-session screen wake lock, Desktop/Mobile/Auto layouts, and independent interface, English, pronunciation and Armenian font sizes with live preview.

## Հայերեն

HayLingo-ն օգնում է անգլերեն սովորել հասկանալի քայլերով՝ հայերեն բացատրություններից մինչև ինքնուրույն խոսք։ Սովորիր առօրյա բառեր, հասկացիր նախադասությունների կառուցվածքը, լսիր արտասանությունը և փորձիր խոսել՝ առանց դասի իմաստը գուշակելու։

Հարթակը նրանց համար է, ովքեր անգլերենն օգտագործելու են աշխատանքում, ճանապարհորդելիս, ուսման կամ ամենօրյա շփման մեջ։ Ընտրիր մակարդակդ ու նպատակը և ամեն օր ժամանակ հատկացրու պարապմունքին։

### Ի՞նչ կստանաս

- **Հասկանալի դասեր։** Անգլերեն նախադասությունը տեսնում ես հայերեն թարգմանությամբ և հայերեն տառերով ընթերցման հուշումով։ Կարող ես լսել, կրկնել և պահպանել այն։ Տառային հուշումը մոտավոր է․ ճիշտ արտասանությունը սովորելու համար լսիր ձայնը։
- **Գործնական վարժություններ։** Լրացրու բառերը, թարգմանիր, ուղղիր սխալները, հավաքիր նախադասություններ և մարզիր լսողությունն ու խոսքը։ Ստացիր պատասխանների հայերեն բացատրություններ։
- **Բառապաշար, որը կարող ես կրկնել։** Օգտագործիր բառաքարտերը, պահպանիր դժվար բառերը և վերադարձիր դրանց պարբերաբար։
- **Անգլերեն աշխատանքի համար։** Ընտրիր մասնագիտությունդ, տես առաջարկվող դասերը և փորձիր պատրաստի երկխոսություններ՝ գործընկերների, հաճախորդների ու տեխնիկական աջակցության իրավիճակներով։
- **Հարց ու պատասխան։** Ուսումնական օգնականը տալիս է պատրաստի հարցեր և ստուգում պատասխանը օրինակների ու կանոնների օգնությամբ։ Այն ազատ զրույց չի վարում և չի հայտնաբերում բոլոր հնարավոր սխալները։
- **Տեսանելի առաջընթաց։** Հետևիր ավարտած դասերին, սովորելու ժամանակին ու պատմությանը։ Վերադարձիր սխալներին, շարունակիր կիսատ դասը և ընտրիր օրական նպատակը։
- **Թարգմանություն՝ կայքի ներսում։** Գտիր բառը մեր հայերեն–անգլերեն բազայում կամ ստացիր առցանց առաջարկ՝ առանց վճարովի բանալու։

### Ուսումնական բազան

| Բովանդակություն | Ներկա ծավալը |
| --- | ---: |
| Դասերի բաժիններ / դասեր | 16 / 28 |
| Դասերի նախադասություններ | 139 |
| Բառաքարտերի բառեր | 210 |
| Վարժություններ | 116 |
| ՏՏ թեմաներ / պատրաստի երկխոսություններ | 13 / 21 |
| Մասնագիտական ընտրություններ | 15 |
| Նոր մասնագիտական երկխոսություններ | 150 (10 յուրաքանչյուր մասնագիտության համար) |
| Թարգմանության բազայի եզակի զույգեր | 1057 |

Թարգմանության բազան միավորում է բառերը, դրանց օրինակները, դասերն ու երկխոսությունները։ Ավելացված են նաև **152 առօրյա բառ ու արտահայտություն**՝ ողջույնի, ընտանիքի, սննդի, գնումների, ճանապարհորդության, եղանակի, աշխատանքի և ուսուցման մասին։ 1057 զույգը չի նշանակում 1057 առանձին բառաքարտ․ նույն նյութը օգտագործվում է նաև թարգմանության որոնման համար։

Հաջորդ զարգացումը բազան թեմաներով և մակարդակներով ընդլայնելն է՝ ավելացնելով ստուգված թարգմանություններ, օրինակներ և վարժություններ։ Առցանց ստացված առաջարկները ինքնաբերաբար չեն դառնում դասի նյութ կամ ճիշտ պատասխան։

### Ինչպե՞ս է աշխատում թարգմանությունը

1. Գրիր հայերեն կամ անգլերեն բառ կամ կարճ նախադասություն և սեղմիր **«Թարգմանել»**։
2. Ծրագիրը նախ փնտրում է ներքին բազայում։ Էջը բեռնվելուց հետո այդ բազայի որոնումը չի պահանջում ինտերնետ։
3. Եթե համապատասխան զույգ չկա, տեքստն ուղարկվում է **MyMemory** ծառայությանը, և արդյունքը երևում է մեր կայքում՝ աղբյուրի նշումով։ Գրանցում կամ API բանալի պետք չէ։
4. Կրկնվող հաջող հարցման արդյունքը պահվում է միայն բացված էջի հիշողության մեջ, ոչ ուսումնական բազայում։
5. Խափանման կամ սահմանաչափի դեպքում նույն տեքստը կարող ես բացել **Google Translate**-ի առանձին էջում։

MyMemory-ի անանուն օգտագործման սահմանաչափը **5,000 նիշ/օր** է՝ ըստ [պաշտոնական կանոնների](https://mymemory.translated.net/doc/usagelimits.php)։ Մեր թարգմանիչն ընդունում է մինչև 200 նիշանոց կարճ հարցումներ և ստուգում նաև ծառայության [500 UTF-8 բայթ/հարցում սահմանը](https://mymemory.translated.net/doc/spec.php)։ Առցանց առաջարկները կարող են անճշտություններ պարունակել։

### Քո տվյալները

Պրոֆիլն ու առաջընթացը պահվում են տվյալ սարքի բրաուզերում։ Կարող ես արտահանել և ներմուծել պահուստային JSON ֆայլը։ Սարքերի միջև ավտոմատ համաժամացում չկա։ Բրաուզերի տվյալները մաքրելուց առաջ պահուստավորիր առաջընթացդ։ Ձայնային հնարավորությունները կախված են բրաուզերի աջակցությունից ու թույլտվություններից։

## English

HayLingo helps Armenian speakers build practical English skills through clear explanations, guided practice, and everyday examples. Learn what a sentence means, hear how it sounds, and practise using it yourself.

Use it for conversations at work, travel, study, or daily life. Choose your level and learning goal, then build a regular study habit at your own pace.

### What you get

- **Lessons you can follow:** English sentences, Armenian meanings, approximate pronunciation hints in Armenian letters, and audio playback.
- **Hands-on practice:** Gap filling, translation, sentence building, error correction, listening, and speaking exercises with Armenian explanations.
- **Vocabulary you can revisit:** Flashcards, favourites, and spaced repetition for words that need more practice.
- **English for work:** Suggested lessons for your profession and scripted workplace and technical support conversations.
- **A study assistant:** Prepared questions with example-based and rule-based feedback. It does not generate open-ended conversations or evaluate every possible mistake.
- **Visible progress:** Completed lessons, study time, history, mistakes to revisit, and a daily learning goal.
- **Translation in the app:** Search the English–Armenian collection first, then request an online suggestion without an account or paid API key.

### The learning collection

The collection includes **28 lessons across 16 sections**, **139 lesson sentences**, **210 flashcard words**, **116 exercises**, **13 IT topics**, and **21 scripted dialogues**. Learners can select from **15 professions**, each with **10 four-turn workplace dialogues**, translation, listening, and spoken or typed practice. The 150 dialogues use shared, progressively harder conversational patterns with profession-specific activities.

The dictionary contains **1057 unique bilingual pairs**, combining existing learning material with **152 added everyday words and phrases**. These are translation pairs, not 1057 separate flashcards. Growing the collection with checked examples and exercises is the next priority.

### Translation and privacy

Local dictionary matches stay in the browser. For an unknown phrase, pressing **Translate** sends the entered text directly to **MyMemory**, and its suggestion appears in the app with a source label. Nothing is sent while you type. Successful online results are cached only in the current page's memory and never automatically added to lessons or answer keys.

MyMemory is free within its [published usage limits](https://mymemory.translated.net/doc/usagelimits.php). The app accepts up to 200 characters per request and checks the provider's byte limit. Suggestions can be inaccurate. A **Google Translate** link opens the same text in a separate tab when needed; HayLingo does not scrape Google or use a paid Google translation service.

Your profile and study progress are stored locally in your browser. JSON export and import provide manual backups. Cross-device sync is not available. Speech features depend on browser support and permissions.

---

**Հասցե / Domain:** `armeng.royalarm.uk`

Տեղադրման, թեստերի և Vercel հրապարակման քայլերը՝ [Developer guide](docs/DEVELOPMENT.md)։

## Կառուցված լեզուներն ու տեխնոլոգիաները / Languages and stack

| Շերտ / Layer | Տեխնոլոգիա / Technology |
| --- | --- |
| Հիմնական կոդ / Source | TypeScript, TSX (React components) |
| Վեբ միջավայր / Framework | Next.js 15 App Router, React 18 |
| Տեսք / Styling | CSS, Tailwind CSS, Framer Motion, Lucide |
| Բրաուզեր / Browser | Web Speech API, IndexedDB v3, LocalStorage, Service Worker (JavaScript) |
| Պահուստ / Backup | JSON |
| Ստուգում / Tests | Node test runner, fake-indexeddb, Playwright + Chrome |

Տվյալները պահվում են մեկ տեղական պրոֆիլում՝ յուրաքանչյուր բրաուզերի համար։ Հիշեցումը աշխատում է բաց հավելվածի բրաուզերային հնարավորություններով. փակ հավելվածի համար երաշխավորված push չկա։ Հմտության միավորները պարապմունքների ցուցանիշներ են, ոչ հավաստագրված լեզվական գնահատական։

Data belongs to one local profile per browser. Reminders depend on browser execution while the app is open. Skill scores are practice indicators, not certified proficiency ratings.
