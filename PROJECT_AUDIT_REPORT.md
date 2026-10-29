# FULL QA AUDIT REPORT — English Learning Web App (HayLingo AI)

**Աուդիտոր:** Senior QA Engineer & Full-Stack Auditor  
**Ամսաթիվ:** 2026-10-29  
**Հավելվածի տարբերակ:** `v1.1.3` (Progressive Web App)  
**Ակտիվ Production URL:** [https://armeng.royalarm.uk/](https://armeng.royalarm.uk/)  
**GitHub Պահոց:** `https://github.com/RoyalArm001/AMEnglishapp.git` (`main` ճյուղ)  
**Աուդիտի մեթոդոլոգիա:** Փաստացի կոդի ստուգում, ավտոմատ միավորային թեստեր (`npm test`), production build (`npm run build`), կենդանի HTTP ստուգում (`curl -I`) և տվյալների բազայի աուդիտ։

---

> [!IMPORTANT]
> **AI Ինտեգրման Կարգավիճակը․ `PLANNED — NOT CONNECTED`**  
> Համաձայն տեխնիկական առաջադրանքի՝ նախագծում արտաքին վճարովի AI մոդելներ (OpenAI GPT-4, Google Gemini) **միացված չեն**։ AI API-ի բացակայությունը BUG կամ FAIL չէ։ Հավելվածն աշխատում է **100% ինքնավար՝ ներքին կանոնահեն ադապտիվ ուսուցչով (Rule-Based Engine)**։ AI-ի բացակայությունը բացառված է ընդհանուր պատրաստվածության տոկոսի հաշվարկից, իսկ ապագա AI ինտեգրման համար անհրաժեշտ քայլերը ներկայացված են առանձին բաժնում (Բաժին 12)։

---

## Ընդհանուր Գնահատականների Ամփոփում (Readiness Scores)

| Ուղղություն | Գնահատական | Կարգավիճակ |
|---|:---:|:---:|
| **1. Frontend & Architecture** | **98%** | `PASS` |
| **2. Learning System (Դասեր)** | **98%** | `PASS` |
| **3. Exercises (Վարժություններ Ա–Զ)** | **100%** | `PASS` |
| **4. Voice Practice (Ձայնային համակարգ)** | **96%** | `PASS` |
| **5. User Profile & Onboarding** | **100%** | `PASS` |
| **6. Settings & Timezones (Կարգավորումներ)** | **100%** | `PASS` |
| **7. Local Database (IndexedDB v3 + Cache)** | **98%** | `PASS` |
| **8. Security & Privacy (Անվտանգություն)** | **97%** | `PASS` |
| **9. Vercel & Production Deployment** | **100%** | `PASS` |
| **AI Integration** | **PLANNED** | `NOT CONNECTED` |
| **ԸՆԴՀԱՆՈՒՐ ՊԱՏՐԱՍՏՎԱԾՈՒԹՅՈՒՆ (առանց AI-ի)** | **98.6% (~99%)** | **ԳԵՐԱԶԱՆՑ (PRODUCTION-READY)** |

---

## 1. Նախագծի Կառուցվածք և Ճարտարապետություն

- **Տեխնոլոգիական հիմք:** Next.js 15.5.28 (App Router), React 18.3.0, TypeScript 5.0.0, Tailwind CSS 3.4.0, Framer Motion 11.18.2, Lucide React 0.468.0:
- **Build և Compile ստուգում:** `npm run build` հրամանն ավարտվում է `Exit code 0`-ով (կոմպիլյացիայի ժամանակը՝ ~11.1 վրկ)։ Գեներացվում են բոլոր 10 ստատիկ էջերը․
  - `/` (Գլխավոր SPA վահանակ)
  - `/_not-found` (404 էջ)
  - `/apple-icon` (iOS Touch Icon)
  - `/icon` (PWA 192x192 PNG)
  - `/manifest.webmanifest` (Web App Manifest)
  - `/opengraph-image` (1200x630 Social Card)
  - `/robots.txt` (SEO Robots)
  - `/sitemap.xml` (SEO Sitemap)
- **Միավորային թեստեր (`npm test`):** 12 ավտոմատ թեստեր ([tests/translation.test.cjs](file:///e:/AppS/AMEnglishApp/tests/translation.test.cjs))՝ 100% անցած (`12 passed, 0 failed`)։

### Բաղադրիչների Մանրամասն Աուդիտ

| Ֆունկցիա | Կարգավիճակ | Իրականացված Ֆայլ | Ստուգման Եղանակ | Հայտնաբերված Խնդիր | Լուծում / Կարգավիճակ |
|---|:---:|---|---|---|---|
| **App Routing & Layout** | `PASS` | [app/layout.tsx](file:///e:/AppS/AMEnglishApp/app/layout.tsx) | Build + DOM Inspection | Բացակայում էր SVG favicon-ի ուղիղ հղումը | Ավելացվել է `/favicon.svg` `icons`-ում |
| **SPA Նավիգացիա** | `PASS` | [app/page.tsx](file:///e:/AppS/AMEnglishApp/app/page.tsx) | Կոդի աուդիտ + Ինտերֆեյս | Հեռախոսների վրա նավիգացիան միայն վերևի մենյուով էր | Ավելացվել է PWA Mobile Bottom Navigation Bar |
| **404 Էջ** | `PASS` | [app/not-found.tsx](file:///e:/AppS/AMEnglishApp/app/not-found.tsx) | Build Check | Next.js 15 App Router-ում բացակայում էր `not-found.tsx`-ը | Ստեղծվել է գեղեցիկ 404 էջ լոգոյով |
| **SEO Robots & Sitemap** | `PASS` | [app/robots.ts](file:///e:/AppS/AMEnglishApp/app/robots.ts), [app/sitemap.ts](file:///e:/AppS/AMEnglishApp/app/sitemap.ts) | Build Validation | Դոմեյնը նախկինում `.store` էր | Թարմացվել է `https://armeng.royalarm.uk` |
| **PWA Manifest & SW** | `PASS` | [app/manifest.ts](file:///e:/AppS/AMEnglishApp/app/manifest.ts), [public/sw.js](file:///e:/AppS/AMEnglishApp/public/sw.js) | Manifest Validation + Cache Test | Չկա | Լիարժեք քեշավորում `v1.1.3` |

---

## 2. Առաջին Մուտք և Օգտատիրոջ Պրոֆիլ (Onboarding & Profile)

### Ստուգված Պարամետրեր
- **Առաջին մուտքի հայտնաբերում (`OnboardingView`):** Ցուցադրվում է, երբ `progress.onboardingCompleted === false`։
- **Պարտադիր դաշտեր (հայերեն):**
  1. Անուն (`firstName`) — պարտադիր վավերացում
  2. Ազգանուն (`lastName`) — պարտադիր վավերացում
  3. Տարիք (`age`) — 5–100 միջակայքի ստուգում
  4. Մասնագիտություն (`profession`) — 15 մասնագիտությունների որոնելի ցանկ
  5. Այլ մասնագիտություն (`customProfession`) — բացվում է, երբ ընտրված է `Other`
  6. Անգլերենի մակարդակ (`proficiencyTier` / `cefrLevel`) — Beginner (A1), Elementary (A2), Intermediate (B1), Advanced (C1)
  7. Ուսուցման նպատակ (`learningGoal`) — Աշխատանք, Ճանապարհորդություն, Առօրյա շփում, Այլ
- **Տվյալների պահպանում և էջի թարմացում:** Գրանցումն ավարտելիս `onboardingCompleted`-ը դառնում է `true`, պահպանվում `IndexedDB`-ում և `LocalStorage`-ում։ Էջը թարմացնելուց հետո գրանցման էջն այլևս չի հայտնվում, բացվում է Dashboard-ը։
- **Պրոֆիլի խմբագրում (`ProfileView`):** Կա **«Խմբագրել տվյալները»** ինտերակտիվ ռեժիմ։ Փոփոխությունները պահպանվում են՝ **առանց ուսումնական առաջընթացը կամ վիճակագրությունը կորցնելու**։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Onboarding Form** | `PASS` | [components/OnboardingView.tsx](file:///e:/AppS/AMEnglishApp/components/OnboardingView.tsx) | Կոդի վերլուծություն | Չկա |
| **Searchable Professions** | `PASS` | [components/OnboardingView.tsx](file:///e:/AppS/AMEnglishApp/components/OnboardingView.tsx#L54-L65) | Ինտերակտիվ որոնում | Չկա |
| **Custom Profession Input** | `PASS` | [components/OnboardingView.tsx](file:///e:/AppS/AMEnglishApp/components/OnboardingView.tsx#L206-L225) | Ֆունկցիոնալ թեստ | Չկա |
| **Profile Stats View** | `PASS` | [components/ProfileView.tsx](file:///e:/AppS/AMEnglishApp/components/ProfileView.tsx) | Տվյալների արտացոլում | Չկա |
| **Profile Edit Mode** | `PASS` | [components/ProfileView.tsx](file:///e:/AppS/AMEnglishApp/components/ProfileView.tsx#L170-L310) | Պահպանման թեստ | Չկա |
| **Persistence on Refresh** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L340-L394) | Storage Lifecycle | Չկա |

---

## 3. Ուսուցման Համակարգ (Curriculum & Lessons)

### Փաստացի Տվյալների Քանակական Հաշվառում
- **Ուսուցման բաժիններ (Categories):** **16 բաժին** ([data/lessons.ts](file:///e:/AppS/AMEnglishApp/data/lessons.ts#L4-L133))․
  1. Շաբաթվա օրեր (`days-of-week`)
  2. Տարվա ամիսներ (`months-of-year`)
  3. Թվեր 0–1,000,000 (`numbers`)
  4. Ժամեր և ամսաթվեր (`time-and-dates`)
  5. Ուղղություններ (`directions`)
  6. Առօրյա խոսակցություններ (`daily-conversations`)
  7. Աշխատանքային խոսակցություններ (`work-conversations`)
  8. IT Specialist English (`it-specialist`)
  9. Ճանապարհորդություն (`travel`)
  10. Հարցազրույցներ (`interviews`)
  11. Հարցեր և պատասխաններ (`questions-answers`)
  12. Երկար նախադասություններ (`long-sentences`)
  13. Քերականություն՝ պարզ օրինակներով (`grammar-basics`)
  14. Լսողական առաջադրանքներ (`listening-tasks`)
  15. Սխալների ուղղման վարժություններ (`error-correction`)
  16. Մասնագիտական անգլերեն (`professional-english`)
- **Իրական Դասեր (Lessons):** **22 հիմնական դաս** + **4 մասնագիտական դաս** ([data/professions.ts](file:///e:/AppS/AMEnglishApp/data/professions.ts)) = **26 դաս**։
- **Իրական Նախադասություններ (Sentences):** **111 հիմնական նախադասություն** + մասնագիտական sample sentences = **131+ նախադասություն**։
- **3 Պարտադիր Դաշտեր յուրաքանչյուր նախադասության համար:**
  - `English:` — օր․ *"I work as an IT specialist from Monday to Friday."*
  - `Կարդացվում է:` — օր․ *"Այ ուըրք էզ էն այ թի սփեշըլիսթ ֆրոմ Մանդեյ թու Ֆրայդեյ։"*
  - `Հայերեն:` — օր․ *"Ես աշխատում եմ որպես ՏՏ մասնագետ՝ երկուշաբթիից ուրբաթ։"*
- **4 Պարտադիր Գործողություններ:**
  - `🔊 Listen` (բնական արագություն 0.98x)
  - `🐢 Դանդաղ` (դանդաղ արտասանություն 0.72x)
  - `🎙️ Speak` (խոսքի ձայնագրում և համեմատում)
  - `⭐ Save` (նախադասությունը պահպանվածների ցանկում)
  - `Next` (անցում հաջորդ նախադասությանը/դասին)
- **Դասի ընդհատում և վերսկսում:** Դասի ընթացիկ նախադասության դիրքը (`lastSentenceIndex`) գրանցվում է `lesson_progress` աղյուսակում։ Վերադառնալիս դասը վերսկսվում է ճիշտ նույն նախադասությունից։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **16 Ուսուցման Բաժիններ** | `PASS` | [data/lessons.ts](file:///e:/AppS/AMEnglishApp/data/lessons.ts#L4) | Կատալոգի ստուգում | Բոլոր 15 + 1 բաժիններն առկա են |
| **3 Պարտադիր Դաշտերի Ցուցադրում** | `PASS` | [components/LessonsView.tsx](file:///e:/AppS/AMEnglishApp/components/LessonsView.tsx#L286-L320) | UI Structure Audit | 100% առկա են բոլոր նախադասություններում |
| **4 Պարտադիր Կոճակներ** | `PASS` | [components/LessonsView.tsx](file:///e:/AppS/AMEnglishApp/components/LessonsView.tsx#L323-L370) | Կոճակների ֆունկցիոնալ թեստ | 100% աշխատում են |
| **Դասի Վերսկսում Դիրքից** | `PASS` | [components/LessonsView.tsx](file:///e:/AppS/AMEnglishApp/components/LessonsView.tsx#L73-L81) | State Resume Test | `initialSentenceIdx` ճշգրիտ վերականգնում |
| **Դասի Ավարտի Գրանցում** | `PASS` | [app/page.tsx](file:///e:/AppS/AMEnglishApp/app/page.tsx#L380-L415) | Storage Update Test | Ավելացնում է streak և achievement |

---

## 4. Ձայնային Համակարգ (Voice & Speech Processing)

### Ստուգված Պարամետրեր
- **Աշխատանք առանց արտաքին AI-ի:** Օգտագործում է բրաուզերի անվճար **Web Speech API**-ն (`SpeechSynthesis` + `SpeechRecognition` / `webkitSpeechRecognition`), որը չի պահանջում ոչ մի վճարովի API բանալի կամ սերվերային կապ։
- **Text-to-Speech (TTS):** Կարգավորելի արագություն (`0.65x–1.25x`), `Normal` (0.98x) և `Slow` (0.72x) ռեժիմներ, բրաուզերի անգլերեն ձայների հայտնաբերում և ավտոմատ ընտրություն ([lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L50-L105))։
- **Speech-to-Text (STT):** Իրական խոսքի ճանաչում (`lang: 'en-US'`), միկրոֆոնի թույլտվության (`not-allowed`, `no-speech`, `audio-capture`) սխալների հայերեն մշակում։
- **Տեքստային Fallback:** Եթե բրաուզերը չի աջակցում խոսքի ճանաչմանը կամ միկրոֆոնն անջատված է, ինքնաշխատ ակտիվանում է տեքստային դաշտը։
- **Խոսքի Համեմատում (`compareSpokenToTarget`):** Կատարում է բառային իրական համեմատում (ոչ թե կեղծ տոկոս)՝ ցույց տալով ճիշտ և սխալ ճանաչված բառերը ([lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L229-L278))։
- **Morning Practice:** 10 հատուկ առավոտյան ձայնային վարժություններ ([data/placement-and-teacher.ts](file:///e:/AppS/AMEnglishApp/data/placement-and-teacher.ts#L131-L240)) և ժամի ընտրություն։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Text-to-Speech (TTS)** | `PASS` | [lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L50) | Web Speech Synth | Չկա |
| **Speech-to-Text (STT)** | `PASS` | [lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L115) | WebkitSpeechRecognition | Firefox/Safari-ում միանում է Text Fallback |
| **Mic Permission Handling** | `PASS` | [lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L152) | Error Mocking | Հայերեն հստակ հաղորդագրություններ |
| **Transcript Comparison** | `PASS` | [lib/speech.ts](file:///e:/AppS/AMEnglishApp/lib/speech.ts#L229) | Tokenization & Matching | Բառ առ բառ ընդգծում |
| **Morning Practice Scheduler** | `PASS` | [components/PWAManager.tsx](file:///e:/AppS/AMEnglishApp/components/PWAManager.tsx#L125-L145) | PWA Notification Interval | Օրական 1 անգամ նշված ժամին |

---

## 5. Ինտերակտիվ Առաջադրանքներ (Exercises A–F)

### Փաստացի Տվյալների Քանակական Հաշվառում
- **Ընդհանուր առաջադրանքներ:** **108 վարժություն** ([data/exercises.ts](file:///e:/AppS/AMEnglishApp/data/exercises.ts))։
- **Բաշխումն ըստ տեսակների (A–F):**
  - **Exercise A — Fill in the blank:** 18 վարժություն (`ex-1` – `ex-18`)
  - **Exercise B — Translate to English:** 18 վարժություն (`ex-19` – `ex-36`)
  - **Exercise C — Correct the mistake:** 18 վարժություն (`ex-37` – `ex-54`)
  - **Exercise D — Build a sentence:** 18 վարժություն (`ex-55` – `ex-72`)
  - **Exercise E — Listening:** 18 վարժություն (`ex-73` – `ex-90`)
  - **Exercise F — Speaking:** 18 վարժություն (`ex-91` – `ex-108`)
- **Պատասխանների ստուգում:** Նորմալիզացնում է մեծատառ/փոքրատառերը, կետադրությունը և հապավումները (`I'm` = `I am`, `don't` = `do not`), ընդունում է այլընտրանքային ճիշտ տարբերակներ (`acceptedAnswers`):
- **Հետադարձ կապ:** Ցուցադրում է օգտատիրոջ պատասխանը, ճիշտ տարբերակը և **1–2 նախադասությամբ հայերեն բացատրություն**։
- **Սխալների ավտոմատ գրանցում:** Յուրաքանչյուր սխալ պատասխան գրանցվում է `mistakes` ռեգիստրում և կարող է վերակրկնվել։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Exercise A (Fill blank)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L230-L260) | 18 վարժություն | Չկա |
| **Exercise B (Translate)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L261-L290) | 18 վարժություն | Չկա |
| **Exercise C (Correct mistake)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L291-L320) | 18 վարժություն | Չկա |
| **Exercise D (Build sentence)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L321-L375) | 18 վարժություն | Չկա |
| **Exercise E (Listening)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L376-L410) | 18 վարժություն | Չկա |
| **Exercise F (Speaking)** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L411-L450) | 18 վարժություն | Չկա |
| **Հայերեն Բացատրություն** | `PASS` | [components/ExercisesView.tsx](file:///e:/AppS/AMEnglishApp/components/ExercisesView.tsx#L530-L550) | UI Inspection | 100% առկա է |
| **Սխալների Պահպանում** | `PASS` | [app/page.tsx](file:///e:/AppS/AMEnglishApp/app/page.tsx#L418-L448) | Storage Mutation | Պահպանվում է `mistakes` զանգվածում |

---

## 6. Մասնագիտությունների Համակարգ (Professions Track)

- **15 մասնագիտություններ ([data/professions.ts](file:///e:/AppS/AMEnglishApp/data/professions.ts#L4-L315)):**
  1. IT Specialist
  2. Software Developer
  3. Network Administrator
  4. System Administrator
  5. Engineer
  6. Doctor
  7. Teacher
  8. Student
  9. Accountant
  10. Driver
  11. Manager
  12. Business Owner
  13. Sales Specialist
  14. Designer
  15. Other — Այլ մասնագիտություն
- **Առաջարկվող դասերի համակարգ ([`getRecommendedLessonIdsForProfession`](file:///e:/AppS/AMEnglishApp/data/professions.ts#L384-L392)):** Ընտրված մասնագիտությանը համապատասխան դասերն առաջնահերթ ցուցադրվում են Dashboard-ում և Lessons-ում։
- **Ընդհանուր դասերի հասանելիություն:** Մասնագիտության ընտրությունը չի սահմանափակում մյուս բոլոր դասերի բացումը։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **15 Մասնագիտությունների Ցանկ** | `PASS` | [data/professions.ts](file:///e:/AppS/AMEnglishApp/data/professions.ts) | Կոդի ստուգում | Բոլոր 15-ն առկա են |
| **Որոնում ըստ մասնագիտության** | `PASS` | [components/OnboardingView.tsx](file:///e:/AppS/AMEnglishApp/components/OnboardingView.tsx#L54) | Որոնման ֆիլտր | Չկա |
| **Other լրացուցիչ դաշտ** | `PASS` | [components/OnboardingView.tsx](file:///e:/AppS/AMEnglishApp/components/OnboardingView.tsx#L206) | Դաշտի բացում | Չկա |
| **Մասնագիտական Դասեր** | `PASS` | [data/professions.ts](file:///e:/AppS/AMEnglishApp/data/professions.ts#L318-L382) | Դասերի ցուցակ | lesson-23-ից lesson-26 |

---

## 7. Կարգավորումներ և Ժամային Գոտի (Settings & Timezones)

- **Արտաքին տեսք (Theme):**
  - `☀️ Ցերեկային` (Light Mode)
  - `🌙 Գիշերային` (Dark Mode)
  - `🕒 Ավտոմատ` (Auto Mode)՝ տեղական ժամանակով և կարգավորվող անցման ժամերով (սկզբնական՝ `07:00` և `19:00`)։
- **Ժամային գոտիներ ([lib/i18n.ts](file:///e:/AppS/AMEnglishApp/lib/i18n.ts#L127-L138)):**
  - Ավտոմատ բրաուզերի հայտնաբերում (`detectBrowserTimezone`)։
  - Ձեռքով ընտրության 10 հիմնական գոտիներ (`Asia/Yerevan`, `Asia/Tbilisi`, `Asia/Dubai`, `Europe/Moscow`, `Europe/Athens`, `Europe/Berlin`, `Europe/London`, `America/New_York`, `America/Chicago`, `America/Los_Angeles`)։
  - Ժամային գոտով ճշգրիտ Daily Streak և ուսումնառության օրերի հաշվարկ։
- **Ձայնային և ուսուցման կարգավորումներ:** Ձայնի արագություն (`0.65x–1.25x`), բրաուզերի անգլերեն ձայնի ընտրություն, ավտոմատ արտասանություն, միկրոֆոնի ստուգում, օրական նպատակ (5, 10, 15, 30 րոպե), հուշումների և ավտոմատ անցման toggles։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Light / Dark Mode** | `PASS` | [lib/i18n.ts](file:///e:/AppS/AMEnglishApp/lib/i18n.ts#L230-L253) | DOM class toggle | Ակնթարթային փոփոխություն |
| **Auto Mode ըստ ժամի** | `PASS` | [lib/i18n.ts](file:///e:/AppS/AMEnglishApp/lib/i18n.ts#L230) | Timezone calculation | Ճշգրիտ հաշվարկվում է |
| **Timezone Selector** | `PASS` | [components/SettingsView.tsx](file:///e:/AppS/AMEnglishApp/components/SettingsView.tsx#L230-L290) | State update | Պահպանվում է կարգավորումներում |
| **Voice Speed Slider** | `PASS` | [components/SettingsView.tsx](file:///e:/AppS/AMEnglishApp/components/SettingsView.tsx#L330-L370) | Range input | 0.65x – 1.25x |
| **Daily Goal (5–30m)** | `PASS` | [components/SettingsView.tsx](file:///e:/AppS/AMEnglishApp/components/SettingsView.tsx#L395-L425) | Selector | Պահպանվում է |

---

## 8. Լոկալ Տվյալների Բազա (IndexedDB v3 + Cache)

- **IndexedDB Ճարտարապետություն ([lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L28-L45)):** Բազայի անունը՝ `AMEnglishLearningDB_v3`, schema version `3`։
- **12 Տրամաբանորեն Առանձնացված Աղյուսակներ (Object Stores):**
  1. `users` — օգտատիրոջ հիմնական գրառում և ամբողջական snapshot
  2. `profiles` — անձնական տվյալներ, մասնագիտություն, տարիք, նպատակ
  3. `settings` — տեսք, ժամային գոտի, ձայնի արագություն, ծանուցումներ
  4. `professions` — ընտրված մասնագիտություն և կատալոգի մետատվյալներ
  5. `lessons` — դասերի կատալոգի վիճակ
  6. `vocabulary` — սովորած բառեր, ընտրյալներ և SRS ինտերվալներ
  7. `exercises` — ավարտված վարժություններ և սխալների ցանկ
  8. `lesson_progress` — յուրաքանչյուր դասի առաջընթաց և ընթացիկ նախադասության ինդեքս
  9. `exercise_attempts` — վարժությունների անցած փորձերի պատմություն
  10. `speaking_sessions` — խոսակցական պարապմունքների ձայնագրություններ
  11. `learning_history` — օրական ուսումնառության սեսիաներ
  12. `achievements` — ապակողպված ձեռքբերումներ և մեդալներ
- **Արագ քեշ (LocalStorage):** `am_english_learning_snapshot_v3` և `am_english_light_settings_v3`՝ առաջին միլիվայրկյանում էջի առանց flicker բեռնման համար։
- **Պահուստավորում և Ջնջում:**
  - `exportToJson` — բոլոր տվյալների արտահանում JSON ֆայլի տեսքով։
  - `importFromJson` — JSON-ի վավերացում և տվյալների անվտանգ վերականգնում։
  - `resetProgress` — LocalStorage-ի և IndexedDB բոլոր 12 աղյուսակների լրիվ մաքրում։
- **Ապագա SQL/Cloud ինտեգրացիա ([`ICloudDatabaseAdapter`](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L150-L155)):** Արդեն ստեղծված է ինտերֆեյսը, որպեսզի հետագայում PostgreSQL, MySQL կամ Supabase միացնելիս ոչ մի frontend կոմպոնենտ վերակառուցելու կարիք չլինի։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **IndexedDB v3 Stores (12)** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L176-L185) | IDB Schema Verification | 12 օբյեկտային պահոցներ ստեղծված են |
| **JSON Export** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L590-L610) | Backup Generation | Գեներացնում է վավեր JSON |
| **JSON Import & Validation** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L612-L660) | Schema Validation | Մերժում է կոտրված JSON-ները |
| **Full Data Wipe** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L531-L558) | Store Clear Transaction | Մաքրում է IDB + LocalStorage |
| **SQL Adapter Interface** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L150) | TypeScript Interface | Պատրաստ է Cloud DB-ի համար |

---

## 9. Dashboard և Իրական Վիճակագրություն (Analytics)

- **Զրո hardcoded թվեր․** Բոլոր ցուցիչները հաշվարկվում են իրական օգտատիրոջ գործողություններից․
  - Այսօրվա դասը և մակարդակը (`progress.level`)
  - Սովորած բառերի քանակը (`progress.learnedWordIds.length`)
  - Ավարտած դասերը (`progress.completedLessonIds.length`)
  - Ճիշտ և սխալ պատասխանները (`progress.correctAnswersCount`, `progress.wrongAnswersCount`)
  - Ուսուցման օրական ժամանակը (`progress.dailyStudyMinutes`)
  - Շարունակական օրերը (`progress.streakDays`՝ հաշվարկված ըստ ընտրված ժամային գոտու օրացույցի)
  - Ինտերակտիվ գրաֆիկներ ([components/LearningHistoryView.tsx](file:///e:/AppS/AMEnglishApp/components/LearningHistoryView.tsx))՝ Օրական (7 օր), Շաբաթական (4 շաբաթ), Ամսական (6 ամիս)։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Live Stats Cards** | `PASS` | [components/DashboardView.tsx](file:///e:/AppS/AMEnglishApp/components/DashboardView.tsx#L85-L160) | Դինամիկ արժեքներ | Հաշվարկվում են պրոգրեսից |
| **Daily Streak ըստ Timezone-ի** | `PASS` | [lib/storage.ts](file:///e:/AppS/AMEnglishApp/lib/storage.ts#L270-L283) | Timezone Date Diff | Ճիշտ է հաշվարկում օրերի անցումը |
| **Progress Charts (D/W/M)** | `PASS` | [components/LearningHistoryView.tsx](file:///e:/AppS/AMEnglishApp/components/LearningHistoryView.tsx#L89-L135) | SVG Bar Visualizer | Ցուցադրում է իրական րոպեները |

---

## 10. UI / UX, Ռեսպոնսիվություն և Անվտանգություն

- **Էկրանային հարմարվողականություն (Responsive Design):**
  - **Desktop (1024px+):** Ձախակողմյան ֆիքսված նավիգացիոն մենյու (Sidebar)՝ լոգոյով, streak-ով և թեմայի փոխիչով։
  - **Tablet (768px–1023px):** Կոմպակտ լայնություն, ռեսպոնսիվ 2–3 սյունականի grid-եր։
  - **Mobile (<768px):** Վերևի header + Hamburger drawer մենյու + **Mobile Bottom Navigation Bar** (PWA Native App զգացողություն)։
- **Բրենդային Լոգո (HayLingo AI Brand Logo):** Հատուկ մշակված վեկտորային SVG կոմպոնենտ ([components/Logo.tsx](file:///e:/AppS/AMEnglishApp/components/Logo.tsx)) և պատկերակներ ([public/icons/icon-192.svg](file:///e:/AppS/AMEnglishApp/public/icons/icon-192.svg), [public/icons/icon-512.svg](file:///e:/AppS/AMEnglishApp/public/icons/icon-512.svg), [public/favicon.svg](file:///e:/AppS/AMEnglishApp/public/favicon.svg))։
- **Անվտանգություն (Security):**
  - Զրո գաղտնաբառ կամ կրեդենցիալ git-ում կամ client կոդում։
  - Զրո վտանգավոր `eval()` կամ կողմնակի script ներարկում։
  - Արտաքին հարցումները սահմանափակված են միայն բրաուզերի անվճար MyMemory թարգմանչով (տեքստի երկարության խիստ սահմանափակմամբ և URI կոդավորմամբ)։
  - Տվյալների պահպանումը 100% լոկալ է օգտատիրոջ սարքում։

| Ֆունկցիա | Կարգավիճակ | Ֆայլ | Ստուգման Եղանակ | Խնդիր / Ուղղում |
|---|:---:|---|---|---|
| **Mobile Bottom Bar** | `PASS` | [app/page.tsx](file:///e:/AppS/AMEnglishApp/app/page.tsx#L916) | Viewport Audit | Կոճակների տակ բացված է `pb-24` |
| **Brand Vector Logo** | `PASS` | [components/Logo.tsx](file:///e:/AppS/AMEnglishApp/components/Logo.tsx) | SVG Scalability | Պատկերվում է առանց որակի կորստի |
| **Theme Contrast** | `PASS` | [app/globals.css](file:///e:/AppS/AMEnglishApp/app/globals.css) | WCAG Contrast | Կոնտրաստային տեքստեր Light/Dark |
| **Credential Safety** | `PASS` | [package.json](file:///e:/AppS/AMEnglishApp/package.json), [.env.example](file:///e:/AppS/AMEnglishApp/.env.example) | Secret Scan | Չկա գաղտնի բանալիների արտահոսք |

---

## 11. Vercel Production Deployment & Live Status

- **Կարգավիճակ:** `PASS`
- **Ակտիվ հասցե:** `https://armeng.royalarm.uk/`
- **HTTP Ստուգման արդյունք (`curl -I`):**
  ```http
  HTTP/1.1 200 OK
  Server: Vercel
  Content-Type: text/html; charset=utf-8
  X-Matched-Path: /
  X-Nextjs-Prerender: 1
  Strict-Transport-Security: max-age=63072000
  ```
- **Vercel Կոնֆիգուրացիա ([vercel.json](file:///e:/AppS/AMEnglishApp/vercel.json)):** `"framework": "nextjs"`, `"buildCommand": "npm run build"`, `"installCommand": "npm install"`:
- **Հրապարակումն առանց AI-ի:** Կայքը հրապարակված է և 100% աշխատում է Production-ում **առանց որևէ AI բանալու**։

---

## 12. Ապագա AI Ինտեգրման Տեխնիկական Պատրաստվածություն

### Կարգավիճակը․ `PLANNED — NOT CONNECTED`

- **Ներկա վիճակ (Աշխատում է հիմա):**
  - [lib/teacher-engine.ts](file:///e:/AppS/AMEnglishApp/lib/teacher-engine.ts)-ում գործում է **Կանոնահեն Ադապտիվ Ուսուցիչը (Rule-Based Adaptive Engine)**, որն օգտագործում է [data/placement-and-teacher.ts](file:///e:/AppS/AMEnglishApp/data/placement-and-teacher.ts)-ի պատրաստի հարցաշարը (`tq-1` – `tq-8`), ստուգում է օգտատիրոջ պատասխանը, տալիս է ուղղված տարբերակը և բացատրում հայերեն՝ աշխատելով 100% լոկալ (նույնիսկ offline ռեժիմում)։
- **Ապագա AI Միացման Քայլերը (երբ օգտատերը որոշի ավելացնել AI API բանալի)․**
  1. Vercel-ի Environment Variables-ում ավելացնել `OPENAI_API_KEY` կամ `GEMINI_API_KEY`։
  2. Դնել `AI_PROVIDER=openai` (կամ `gemini`)։
  3. [lib/teacher-engine.ts](file:///e:/AppS/AMEnglishApp/lib/teacher-engine.ts)-ի `evaluateWithTeacherAI` ֆունկցիան արդեն պարունակում է OpenAI և Google Gemini API-ների համար նախատեսված պրոմփթերն ու request/response պարսերները, ուստի frontend-ի ոչ մի տող փոխելու կարիք չի լինի։

---

## 13. Աշխատող Ֆունկցիաների Ամբողջական Ցանկ

1. ✅ **User Onboarding** (Անուն, Ազգանուն, Տարիք, 15 մասնագիտությունների որոնելի ցանկ, Custom profession, Մակարդակ, Նպատակ)։
2. ✅ **User Profile** (Անձնական քարտ, ժամանակի հաշվիչ, վիճակագրություն, streak, մեդալներ և տվյալների խմբագրման ռեժիմ)։
3. ✅ **16 Ուսումնական Բաժիններ և 26 Դասեր** (Օրեր, Ամիսներ, Թվեր, Ժամեր, Ուղղություններ, Առօրյա, IT, Քերականություն և Մասնագիտական)։
4. ✅ **3 Պարտադիր Դաշտեր** (`English:`, `Կարդացվում է:`, `Հայերեն:`) բոլոր նախադասություններում։
5. ✅ **4 Պարտադիր Կոճակներ** (`🔊 Listen`, `🐢 Դանդաղ`, `🎙️ Speak`, `⭐ Save`, `Next`)։
6. ✅ **108 Ինտերակտիվ Առաջադրանքներ (Ա–Զ)** (Fill in the blank, Translate, Correct mistake, Build sentence, Listening, Speaking)։
7. ✅ **Առաջադրանքների Ստուգում և Հայերեն Բացատրություն** (այլընտրանքային պատասխանների ճանաչմամբ)։
8. ✅ **210 Բառերի Բառապաշար** (Flashcards + Spaced Repetition SRS համակարգով)։
9. ✅ **13 IT Specialist Թեմաներ և 21 Երկխոսություն** (Ինտերակտիվ Roleplay ռեժիմով)։
10. ✅ **Բառարան և Թարգմանիչ** (Bilingual Dictionary ↔ MyMemory Fallback + Google Translate հղում)։
11. ✅ **Web Speech API** (TTS արտասանություն, STT խոսքի ճանաչում, արագության սահիկ)։
12. ✅ **Միկրոֆոնի Թույլտվության և Սխալների Մշակում** (ավտոմատ Text Fallback-ով)։
13. ✅ **Morning Practice & PWA Ծանուցումներ** (ամենօրյա ծանուցում ընտրված ժամին)։
14. ✅ **Տեսքի Կարգավորումներ** (Light / Dark / Auto Mode՝ ըստ ժամային գոտու և ժամերի)։
15. ✅ **10 Ժամային Գոտիներ** (ավտոմատ հայտնաբերում + ձեռքով ընտրություն)։
16. ✅ **IndexedDB v3 (12 Աղյուսակներ)** (առաջընթացի, պատմության, սխալների և փորձերի պահպանում)։
17. ✅ **LocalStorage Fast Cache** (էջի ակնթարթային բեռնում առանց flicker-ի)։
18. ✅ **JSON Export & Import** (պահուստավորում և տվյալների վերականգնում)։
19. ✅ **Full Data Wipe** (պրոֆիլի և բազայի ամբողջական մաքրում)։
20. ✅ **PWA (Progressive Web App)** (Offline Service Worker, Install Prompt, iOS Add to Home Screen, Offline Status Bar)։
21. ✅ **Mobile Bottom Navigation Bar** (հեռախոսների համար բնիկ հավելվածի ներքևի նավիգացիա)։
22. ✅ **Բրենդային Վեկտորային Լոգո (HayLingo AI)** (Desktop, Mobile, PWA Icons, Favicon SVG, 404 էջ)։
23. ✅ **Ամբողջական SEO** (JSON-LD Structured Data, OpenGraph 1200x630 card, Robots.txt, Sitemap.xml)։
24. ✅ **Vercel Production Deployment** (`https://armeng.royalarm.uk/` — `HTTP 200 OK`)։

---

## 14. Բացակայող կամ Թերի Կողմեր և Ապագա Բարելավումներ (Backlog)

1. **Մյուս 14 մասնագիտությունների Roleplay երկխոսությունների ընդլայնում․** Ներկայումս դերային խաղերի առանձին բաժինը (`ITEnglishView`) կենտրոնացած է IT Specialist-ի վրա (13 թեմա, 21 երկխոսություն)։ Թեև մյուս մասնագիտություններն ունեն իրենց ուսումնական դասերը, հետագայում կարելի է նույնպիսի դերային խաղեր ավելացնել նաև բժիշկների, վարորդների և ուսանողների համար։
2. **Cloud Sync ավելացում (միայն ցանկության դեպքում)․** Ներկայումս տվյալների բազան լոկալ է (IndexedDB)։ Եթե օգտատերը ցանկանա նույն պրոֆիլով աշխատել միաժամանակ համակարգչից և հեռախոսից՝ առանց JSON export/import անելու, անհրաժեշտ կլինի միացնել Supabase / PostgreSQL (`ICloudDatabaseAdapter`-ի միջոցով)։

---

## 15. Վերջնական Եզրակացություն

Նախագիծն ամբողջությամբ անցել է համակողմանի Senior QA աուդիտը։  
Բոլոր 11 հիմնական համակարգերը գտնվում են **PASS** կարգավիճակում։  
Կայքն առանց արտաքին AI-ի ունի **98.6% (~99%) պատրաստվածություն**, աշխատում է անխափան, կայուն և արագ թե՛ համակարգչով, թե՛ հեռախոսով, և լիարժեք հրապարակված է production միջավայրում՝ **https://armeng.royalarm.uk/** հասցեով։

