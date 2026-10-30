# HayLingo — տարբերակների պատմություն / Changelog

Փոփոխությունների վայրը նշված է յուրաքանչյուր տարբերակի տակ։ Տարբերակի համարը պահվում է `package.json`, `lib/pwa.ts` և `public/sw.js` ֆայլերում։

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
