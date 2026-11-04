# HayLingo — տարբերակների պատմություն / Changelog

Փոփոխությունների վայրը նշված է յուրաքանչյուր տարբերակի տակ։ Տարբերակի համարը պահվում է `package.json`, `lib/pwa.ts` և `public/sw.js` ֆայլերում։

## v1.7.0 — 2026-11-04 — Միջազգային նյութերով լրացված սկսնակների ծրագիր

- `data/international-lessons.ts`, `data/lessons.ts` — 8 նոր A1 դաս և 47 գրավոր քայլ՝ հնչյուններ, ընտանիք, գույներ, a/an և հոգնակի, be-ով հարցեր, have/has, սնունդ ու առօրյա։ Թեմաների հիմք՝ բաց ESOL աշխատագիրք և A1 նպատակներ, օրինակներն ու հայերեն բացատրությունները՝ HayLingo։
- `data/international-chapters.ts`, `data/a1-course.ts` — 8 նոր ընթերցանության գլուխ և 16 հարց։ A1-ի ընդհանուր ծավալը՝ 29 դաս/գլուխ, 58 ընթերցանության հարց և 33 պարտադիր ամփոփիչ առաջադրանք։ Նախկին ամփոփիչ հարցերի ID-ներն ու տեսակները պահպանված են։
- `components/LearningPlanView.tsx` — դասի նպատակի ցուցադրում, հնչյունների պարզ բացատրություններ և գույնի տեսանելի օրինակներ։
- `components/LessonSources.tsx`, `components/A1CourseStudy.tsx`, `data/international-sources.ts` — դասին համապատասխան աղբյուրներ, հեղինակներ և լիցենզիա, VOA-ի կրճատված երկխոսություն՝ հայերեն աջակցությամբ։ Cambridge մանկական նյութերի հղումը ցուցադրվում է համապատասխան տարիքին։ Արտաքին մեդիա կամ API չի ներմուծվել։
- `lib/learning-path.ts`, `lib/types.ts`, `lib/progress-validation.ts` — ծրագրի revision-ի migration․ հին ճիշտ պատասխանները, պրոֆիլն ու ձեռք բերած բարձր մակարդակը չեն վերացվում։ A1-ում նոր դասերն անցնում են նույն պարտադիր հերթականությամբ։
- `CONTENT_SOURCES.md`, `README.md`, `LEARNING_PATH_REPORT.md`, `data/site-updates.ts` — սկզբնաղբյուրների և կատարված փոփոխությունների նկարագրություն։ Տարբերակները՝ v1.7.0, առանց կախվածությունների փոփոխության։
- Կատարվել է կոդի ընթերցում։ Թեստեր, typecheck, build, նկարներ և production deployment չեն կատարվել՝ օգտատիրոջ սահմանափակման համաձայն։

## v1.6.0 — 2026-11-04 — A1 դասագրքեր, ամփոփիչ աշխատանք և պրոֆիլի սևագիր

- `data/a1-course.ts`, `components/A1CourseStudy.tsx` — երեք հեղինակային HayLingo դասագիրք՝ 21 գլուխ, հայերեն աջակցություն, ձայն և 42 ընթերցանության հարց։ Լրացուցիչ British Council A1 նյութերը բացվում են առանձին հղումներով․ արտաքին գրքերի տեքստերը չեն պատճենվել։
- `components/LearningPlanView.tsx`, `lib/learning-path.ts`, `app/page.tsx` — դասի ավարտը պահանջում է գրավոր քայլերն ու դասագրքի ստուգումը։ 25 առաջադրանքով պարտադիր A1 ամփոփիչը ստուգում է բոլոր դասերի նյութը, լսողությունն ու նոր կարճ տեքստի ընկալումը։ Բոլոր ճիշտ պատասխաններից հետո միայն բացվում են A2-ն ու մյուս էջերը։
- `components/DashboardView.tsx`, համապատասխան CSS — նոր գլխավոր էջ՝ փուլային ճանապարհով, ընթացիկ դասով և միայն հասանելի դասագրքերի մուտքերով։
- `components/ProfileView.tsx`, `lib/profile-draft.ts`, `lib/types.ts`, `lib/progress-validation.ts` — օգտատիրոջը կապված սևագրի ինքնաշխատ պահպանում, վերականգնում էջափոխումից հետո, առանձին պահպանում և սևագրի ջնջում։
- `lib/storage.ts`, `app/page.tsx` — IndexedDB գրառումների հերթականացում, անմիջական տեղական snapshot, ուշացած բեռնումից նոր փոփոխությունների վերագրումից պաշտպանություն և unmount-ի cleanup։ Հին առաջընթացն ու պրոֆիլը չեն մաքրվում։
- Տարբերակները՝ v1.6.0։ Կախվածությունների տարբերակները չեն փոխվել։ Կատարվել է կոդի ընթերցում․ թեստեր, typecheck, build և նկարներ չեն գործարկվել՝ պահպանելով օգտատիրոջ հրահանգը։ Production deployment չի կատարվել։

## v1.5.0 — 2026-11-04 — Զրոյից ուսուցում և պարտադիր գրավոր քայլեր

- `data/foundation-lessons.ts` — A1-ի 14 սկզբնական դաս՝ 26 տառ, մարդիկ («տղա», «աղջիկ» և այլն), առօրյա բառեր, ողջույններ, 0–20 թվեր, տասնյակներ, հարյուր, հազար, ինքնաներկայացում, տարեթվեր և երեք կարճ զրույց։ Առկա սկզբնական դասերի ID-ները պահպանված են։
- `components/LearningPlanView.tsx` — սովորել → լսել → ինքնուրույն գրել → ստուգել ընթացք։ Գրելու ժամանակ օրինակը թաքցվում է, հասանելի են ձայնն ու նյութին վերադառնալը։ Սխալ կամ դատարկ պատասխանը չի բացում հաջորդ քայլը։
- `lib/learning-path.ts`, `app/page.tsx` — միասնական գրավոր ստուգում՝ ճիշտ տառերով և բառերի հերթականությամբ, թույլատրելի այլընտրանքներով։ Այբուբենում ստուգվում են մեծատառն ու փոքրատառը։ Թվանշանը չի փոխարինում անգլերեն բառին։ Դասի և մակարդակի ավարտը պահանջում է գրավոր անցած բոլոր քայլերը։
- `lib/types.ts`, `lib/progress-validation.ts` — `writtenSentenceIds`-ի պահպանում օգտատիրոջ գործող snapshot-ում և պահուստում։ Հին պատասխանների ու ավարտների պատմությունը չի ջնջվում, նախկին ընտրովի ստուգումները չեն հաշվվում որպես գրավոր պատասխաններ։ Միանգամյա migration-ը պահպանում է նախկինում ձեռք բերած մակարդակը։
- `README.md`, `LEARNING_PATH_REPORT.md`, `data/site-updates.ts` — նոր ընթացքի նկարագրություն։ Տարբերակները՝ v1.5.0, կախվածությունների տարբերակները չեն փոխվել։
- Միայն տեղական կոդ․ թեստեր, typecheck, build, նկարներ, Git push և deployment չեն կատարվել՝ ըստ օգտատիրոջ հրահանգի։

## v1.4.1 — 2026-11-04 — Փակ բաժինների թաքցնում

- `app/page.tsx` — փակ ուսումնական բաժինները չեն ցուցադրվում կողային և բջջային ներքևի մենյուներում։ Դատարկ խմբերի վերնագրերը նույնպես թաքցված են։ Դասապլանի ավարտից հետո հասանելի բաժիններն ինքնաշխատ հայտնվում են՝ առանց refresh-ի։
- `components/DashboardView.tsx` — փակ բաժինների քարտերն ու դրանց արագ մուտքերը թաքցված են նաև գլխավոր էջում։
- Տեսանելիությունը հաշվարկվում է գործող `isCoursePageUnlocked` կանոնով։ Ուղիղ հղումների մուտքի պաշտպանությունը պահպանված է։
- Տարբերակները՝ v1.4.1։ Միայն տեղական փոփոխություններ․ թեստեր, build, նկարներ, Git push և deployment չեն կատարվել։

## v1.4.0 — 2026-11-04 — Հերթական դասապլան և մակարդակի սահմանափակումներ

- `data/foundation-lessons.ts`, `data/lessons.ts`, `components/LearningPlanView.tsx` — A1-ի հինգ սկզբնական դաս՝ այբուբեն, առաջին բառեր և ինքնաներկայացում։ Դասերը բացվում են հերթականությամբ՝ յուրաքանչյուր քայլի ճիշտ ստուգումից հետո։
- `lib/learning-path.ts`, `app/page.tsx` — մակարդակի ավարտի միասնական կանոններ, բոլոր մուտքերի համար ուսումնական էջերի կողպում և հաջորդ մակարդակի բացում միայն ընթացիկի ավարտից հետո։ Դատարկ դասընթացը չի համարվում ավարտված։
- `lib/types.ts`, `lib/storage.ts`, `lib/progress-validation.ts` — userId-ին կապված ստուգումների պահպանում գործող LocalStorage/IndexedDB snapshot-ում, հին տվյալների անվտանգ լրացում։ Հին պատմությունը պահպանվում է, իսկ հերթական անցման համար պահանջվում են նոր ստուգումները։
- `components/SettingsView.tsx`, `components/ProfileView.tsx`, `components/LearningHistoryView.tsx`, `components/OnboardingView.tsx` — նոր օգտատիրոջ սկզբնական A1 մակարդակ, կարգավորումներից/պրոֆիլից կամ մակարդակի ստուգումից դասապլանը շրջանցելու կանխում։
- Ուսումնական բաղադրիչներ, `data/daily-questions-and-words.ts`, `data/professional-practice.ts`, `lib/teacher-engine.ts` — հասանելի մակարդակից բարձր նյութերի հեռացում ընտրություններից, հարցերի գեներացումից և անմիջական բացումից։
- `components/DashboardView.tsx`, `lib/i18n.ts`, `data/site-updates.ts` — գլխավոր մուտքը դեպի «Իմ դասապլանը»։ Տարբերակները համապատասխանեցվել են v1.4.0-ին։
- `README.md`, `app/manifest.ts` — նկարագրությունները համապատասխանեցվել են այբուբենով սկսվող դասապլանին։ Օրվա առաջադրանքների մակարդակը պահպանվում է, որպեսզի refresh-ը չվերացնի տվյալ մակարդակի առաջընթացը։
- Սահմանափակումներ և չգործարկված ստուգումներ՝ [LEARNING_PATH_REPORT.md](LEARNING_PATH_REPORT.md)։ Թեստեր, build, պատկերներ, Git push և deployment չեն կատարվել։

## v1.3.5 — 2026-11-04 — Տեղադրման կոճակը վերին գոտում

- `components/PWAManager.tsx`, `app/page.tsx` — տեղադրման և թաքցնելու կոճակները տեղափոխվել են ընդհանուր top bar՝ թեմայի ընտրության կողքին։ Հեռացվել է տեղադրման առանձին լայն գոտին։ Տեղադրման գործողությունն ու iOS ուղեցույցը պահպանված են։
- `app/globals.css` — կոմպակտ վերին գործողություններ, հեռախոսում տեղադրման պատկերակ և փոքր էկրանի դասավորություն։
- `data/site-updates.ts` — փոփոխության նկարագրություն գլխավոր էջում։ Տարբերակները՝ v1.3.5, առանց կախվածությունների փոփոխության։
- Միայն տեղական կոդ։ Թեստեր, build, նկարներ, Git push և deployment չեն կատարվել՝ ըստ օգտատիրոջ հրահանգի։

## v1.3.4 — 2026-11-04 — Մասնագիտական անգլերեն բոլոր ոլորտների համար

- `app/page.tsx`, `lib/i18n.ts`, `app/layout.tsx` — ընդհանուր «Մասնագիտական անգլերեն» անվանում, աշխատանքի պատկերակ և տարբեր ոլորտների ներկայացում։
- `components/ITEnglishView.tsx`, `components/ProfessionalPracticeView.tsx` — ոլորտի ընդհանուր ընտրիչ և համապատասխան երկխոսություններ։ ՏՏ լրացուցիչ նյութերը ցուցադրվում են միայն տեխնոլոգիական ոլորտ ընտրելուց և բացելու գործողությունից հետո։ Ուղղվել է երկար պատասխանի մեջ պատահմամբ ներառված HTML տեքստը։
- `data/professions.ts`, `components/OnboardingView.tsx`, `components/ProfileView.tsx`, `components/LessonsView.tsx`, `lib/storage.ts`, `lib/sqlite-server.ts` — նոր/բացակայող մասնագիտության լռելյայն արժեքը ընդհանուր ոլորտն է։ Մասնագիտությունները դասավորված են այբբենական կարգով, ազատ դաշտը պարտադիր չէ։ Պահպանված վավեր մասնագիտությունները չեն փոխարինվում։
- `data/daily-questions-and-words.ts` — նոր օրվա հարցերը ընտրվում են ընդհանուր թեմաներից և ընտրված ոլորտից՝ նախ համապատասխան մակարդակից, պակասելու դեպքում՝ մոտակա մակարդակներից։
- `data/placement-and-teacher.ts`, `lib/teacher-engine.ts`, `components/TeacherView.tsx` — ՏՏ հարցերը նշված են համապատասխան մասնագիտությամբ, ուսումնական օգնականի մեկնարկային և հաջորդ հարցերը հաշվի են առնում ոլորտը։
- `data/site-updates.ts` — փոփոխության նկարագրություն գլխավոր էջում։ Տարբերակները համապատասխանեցվել են v1.3.4-ին՝ առանց կախվածությունների փոփոխության։
- Միայն տեղական կոդի փոփոխություններ։ Ըստ օգտատիրոջ հրահանգի՝ թեստեր, build, նկարներ, Git push և deployment չեն կատարվել։

## v1.3.3 — 2026-11-04 — HayLingo-ն բացահայտելու գլխավոր էջ

- `components/DashboardView.tsx`, `components/DashboardView.module.css` — գլխավոր էջը վերակառուցվել է՝ ընդգծված գլխավոր հատվածով, գունային քարտերով և բաժինների ներկայացմամբ։ Ավելացվել են իրական անցումներ դեպի գրադարան, քերականություն, խոսքի պարապմունքներ, բառապաշար և օրվա բառեր։
- Ավելացվել են երեք հերթափոխվող խորհուրդներ։ Թարմացումները տեղադրված են փոքր հատվածում՝ բացվող մանրամասներով։ Անձնական վիճակագրությունը գլխավոր էջում չի վերադարձվել։
- `app/page.tsx`, `data/site-updates.ts` — միացվել են գլխավոր էջի անցումները և վերանայվել է թարմացման նկարագրությունը։
- Դիզայնի CSS-ը սահմանափակված է գլխավոր էջով․ նախատեսված են բջջային, մեծ տառաչափի և մուգ ռեժիմի դասավորություններ։
- `package.json`, `package-lock.json`, `lib/pwa.ts`, `public/sw.js`, `README.md` — v1.3.3, առանց կախվածությունների տարբերակները փոխելու։
- Օգտատիրոջ հրահանգով թեստեր, build և պատկերային ստուգումներ չեն գործարկվել։ Միայն տեղական փոփոխություններ՝ առանց Git push-ի կամ deployment-ի։

## v1.3.2 — 2026-11-04 — Գլխավոր էջի լուրեր և թարմացումներ

- `components/DashboardView.tsx` — գլխավոր էջում ցուցադրվում են միայն կայքի լուրերը, վերջին փոփոխություններն ու HayLingo-ի մասին տեղեկությունները։ Հեռացվել են ուսուցման քարտերն ու անձնական վիճակագրությունը։
- `data/site-updates.ts` — թարմացումների առանձին ցանկ՝ ամսաթվով, բաժնով և փոփոխության նկարագրությամբ։
- `app/page.tsx` — գլխավոր էջի անվանումը դարձել է «Գլխավոր», անձնական ողջույնն ու վիճակագրության վերին գոտին այդ էջում չեն ցուցադրվում։
- `package.json`, `package-lock.json`, `lib/pwa.ts`, `public/sw.js`, `README.md` — տարբերակները համապատասխանեցվել են v1.3.2-ին՝ առկա v1.3.1 cache համարից հետո։ Կախվածությունների տարբերակները չեն փոխվել։
- Փոփոխությունները տեղական են։ Օգտատիրոջ հրահանգով թեստեր, build և բրաուզերային ստուգումներ չեն գործարկվել։ Git push և production deployment չեն կատարվել։

## v1.2.2 — 2026-10-30 — E2E Ուղղումներ, Արտադրական Օպտիմալացում և Տվյալների Լիարժեքություն

- **E2E Թեստերի Ուղղում.** `components/SettingsView.tsx`-ում ավելացվել է «Ավտոմատ արտասանություն» (`autoPlayAudio`) կարգավորման UI վերահսկիչը, որը կապված է `LessonsView.tsx`-ի ավտոմատ հնչեցման հետ։
- **PWA Service Worker Offline Նավիգացիա.** `public/sw.js`-ում navigation request-ների fallback-ը թարմացվել է `{ ignoreSearch: true }` տարբերակով, ինչը երաշխավորում է, որ ցանկացած SPA URL query (`/?tab=lessons` և այլն) անցանց ռեժիմում ակնթարթորեն բեռնվում է քեշավորված shell-ից։
- **Արտադրական Օպտիմալացում (Code Splitting).** `app/page.tsx`-ում ծանր ուսումնական բաժինները (`BookLibraryView`, `GrammarAcademyView`, `AccentAcademyView`, `DailyQuestionsView`, `DailyConversationsView`, `ITEnglishView`, `TeacherView`, `VoicePracticeView`, `LearningHistoryView`) վերածվել են `dynamic()` lazy-load բաղադրիչների։ First Load JS-ը կրճատվել է **450 kB**-ից մինչև **295 kB** (-34.4%), իսկ հիմնական էջի չափը՝ **347 kB**-ից **192 kB** (-44.7%)։
- **Desktop / Mobile / Auto Ռեժիմների Ձեռքով Կառավարում.** `lib/use-display-settings.ts`-ում ներդրվել է հստակ գերակայություն. օգտատիրոջ ձեռքով ընտրած `desktop` կամ `mobile` ռեժիմն անմիջապես ակտիվացնում է համապատասխան դասավորությունը, իսկ `auto` ռեժիմը հետևում է էկրանի չափսերին։
- **SQLite Տվյալների Լիարժեք Պահուստավորում.** `lib/sqlite-server.ts`-ում ավելացվել է `cefr_level` դաշտը `user_profile` և `haylingo_meta` աղյուսակներում, որպեսզի օգտատիրոջ CEFR մակարդակը (`A1`–`C2`) անխաթար պահպանվի SQLite `.db` արտահանման և ներմուծման ընթացքում։
- **Ավտոմատացված Թեստեր.** `tests/final-fix-verification.test.cjs` ֆայլով հաստատվել է SQLite ամբողջական round-trip-ը, Wake Lock-ը, Display Mode-ը և `autoPlayAudio` դրոշակը։ Ընդհանուր միավորային և ինտեգրացիոն թեստերը կազմում են **93/93 Passed (100%)**։

## v1.2.0 — 2026-10-30 — էկրանի և տառաչափի կարգավորումներ

- Screen Wake Lock՝ դասի lifecycle, hide/show, release, retry և հայերեն fallback. `lib/wake-lock.ts`, `lib/use-wake-lock.ts`, `app/page.tsx`։
- Համակարգչային / Բջջային / Ավտոմատ ցուցադրում, keyboard navigation. `app/globals.css`, `lib/use-display-settings.ts`։
- Անգլերեն, արտասանություն, թարգմանություն և UI՝ առանձին 14–30px չափերով ու live preview. `components/DisplaySettings.tsx` և ուսումնական բաղադրիչներ։
- Local userId-ին կապված կարգավորումներ, անվտանգ legacy defaults, IndexedDB persistence. `lib/storage.ts`, `lib/display-settings.ts`, `lib/progress-validation.ts`։
- Թեստերը և սահմանափակումները՝ [DISPLAY_SETTINGS_REPORT.md](DISPLAY_SETTINGS_REPORT.md)։ Production-ում չի հրապարակվել։

## v1.1.4 — 2026-10-29 — պատրաստված փոփոխություններ, production-ում չհրապարակված

- **Ուսումնական նյութեր.** `data/additional-lessons.ts`, `data/lessons.ts`, `data/exercises.ts`: 2 նոր դաս, 8 նախադասություն և 8 լսողական/թարգմանական վարժություն։ Ընդամենը՝ 28 դաս, 139 նախադասություն, 116 վարժություն։
- **Բոլոր մասնագիտությունները.** `data/professional-practice.ts`, `components/ProfessionalPracticeView.tsx`, `components/ITEnglishView.tsx`: 15 մասնագիտություն × 10 քառատող երկխոսություն, մասնագիտական արտահայտություններ, լսում, թարգմանություն, ձայնային և երկար պատասխաններ։
- **Ուսումնական օգնական.** `data/placement-and-teacher.ts`, `lib/teacher-engine.ts`, `components/TeacherView.tsx`: մասնագիտության հարցաշար, մասնակի պատասխանների ճիշտ գնահատում, քերականական ուղղումներ, կրկնության թեմաներ։ Արտաքին AI չի միացվել։
- **Իրական առաջընթաց.** `app/page.tsx`, `lib/use-study-timer.ts`, `lib/study-statistics.ts`, `components/LearningHistoryView.tsx`, `components/DashboardView.tsx`: ակտիվ ժամանակ, գործողությամբ հաշվվող streak, կրկնակի ավարտից պաշտպանություն, պատմությունից հաշվվող գրաֆիկներ։
- **Տվյալների պահպանում.** `lib/storage.ts`, `lib/progress-validation.ts`: հին/նոր պահուստների համադրում, JSON ստուգում, IndexedDB վերականգնում, պահման ձախողման հաղորդագրություն։ Schema v3 և 12 store-երը պահպանված են։
- **Խոսք և վարժություններ.** `lib/speech.ts`, `lib/exercise-validation.ts`, `components/ExercisesView.tsx`, `components/VoicePracticeView.tsx`, `components/LessonsView.tsx`: բառերի հերթականություն և ժխտում, միկրոֆոնի մաքրում, գործող դժվարության/կրկնության կարգավորումներ։
- **Հեռախոս, պլանշետ, PWA.** `components/SettingsView.tsx`, `components/PWAManager.tsx`, `lib/pwa.ts`, `public/sw.js`: լայնության ուղղումներ, հիշեցումների և cache տարբերակի ուղղումներ։
- **Փաստաթղթեր ու բրենդ.** `README.md`, `docs/DEVELOPMENT.md`, `components/Logo.tsx`, `app/layout.tsx`, `app/manifest.ts`: լեզուներ, տեխնոլոգիաներ, փաստացի քանակներ, `.uk` դոմեյն, HayLingo անվանում։ Նախորդ տարբերակի հավելվածային H լոգոն պահպանված է։
- **Ստուգում.** `tests/storage.test.cjs`, `tests/e2e/learning.spec.ts`, `playwright.config.ts`: unit/integration և Chrome desktop/tablet/mobile E2E։ Փաստացի արդյունքները՝ [հաշվետվությունում](CODEX_IMPLEMENTATION_REPORT.md)։

English: expands profession practice and learning content; fixes grading, local persistence, real study statistics, responsive controls and PWA behavior; adds automated database and browser tests. This version is prepared on a review branch and has not been deployed to production.

## v1.1.3 — commit `49c019a`

Հեռախոսի ներքևի նավիգացիա, favicon-ի միացում և responsive բարելավումներ՝ `app/page.tsx`, `app/layout.tsx`, `public/favicon.svg`։

## v1.1.2 — commit `a71110e`

HayLingo հավելվածային H լոգո և վեկտորային պատկերակներ՝ `components/Logo.tsx`, `public/icons/`, `app/icon.tsx`, `app/apple-icon.tsx`։ Ավելացվել է բացակայող էջի տեսքը՝ `app/not-found.tsx`։

## v1.1.1 — commit `b5212d7`

Vercel Next.js կարգավորում՝ `vercel.json`։ Դոմեյնի հասցեն փոխվել է `armeng.royalarm.uk`՝ հավելվածի metadata-ում։

## v1.1.0 — commit `127599a`

Onboarding, պրոֆիլ, կարգավորումներ, IndexedDB v3, PWA և SEO։ Բաժինները՝ `components/`, տվյալների շերտը՝ `lib/storage.ts`, PWA՝ `lib/pwa.ts`, `public/sw.js`, SEO՝ `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`։

## Սկզբնական հավելված — commit `0fec28a`

Անգլերենի ուսուցման հավելված և Vercel տեղադրման սկզբնական կարգավորումներ։
