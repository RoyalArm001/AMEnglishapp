# HayLingo AI — English Learning Web Application (Հայախոս օգտատերերի համար)

Ժամանակակից, ինտերակտիվ անգլերենի ուսուցման վեբ հավելված՝ ստեղծված Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons և Web Speech API տեխնոլոգիաներով։

## Հիմնական հնարավորություններ

1. **Գլխավոր վահանակ (Dashboard)** — հայերեն ինտերֆեյս, այսօրվա դասը, ընտրված մակարդակը (`A1–C2`), սովորած բառերի քանակը, ավարտած դասերը, ճիշտ/սխալ պատասխանները, օրական ժամանակը, streak-ը և արագ անցումը ձայնային պարապմունքի։
2. **English Lessons (15 բաժին · 22 դաս · 111 նախադասություն)** — յուրաքանչյուր նախադասության համար ցուցադրվում է **English**, **Pronunciation (հայերեն տառերով)** և **Armenian**, ինչպես նաև `🔊 Listen`, `🎙️ Speak`, `⭐ Save` և `Next` գործողությունները։
3. **Interactive Exercises (108 առաջադրանք՝ A–F տեսակներով)** — Fill in the blank, Translate to English, Correct the mistake, Build a sentence, Listening, Speaking՝ այլընտրանքային պատասխանների ընդունմամբ, թաքնված `Hint` կոճակով և հայերեն բացատրություններով։
4. **My AI Teacher (`/api/teacher`)** — server-side provider abstraction (պատրաստ OpenAI / Gemini API բանալիների համար Vercel Environment Variables-ում) և լիարժեք աշխատող **Կանոնահեն Ադապտիվ Ուսուցիչ** (առանց API key-ի)։
5. **Voice Conversation & Morning Practice** — Web Speech API (Speech-to-Text և Text-to-Speech), `Slow / Normal` արագության փոփոխում, ճանաչված տեքստի բառային համեմատում, առավոտյան պարապմունքի ժամի ընտրություն և տեքստային fallback։
6. **IT Specialist English (13 թեմա · 21 երկխոսություն և Roleplay)** — մասնագիտական արտահայտություններ և ինտերակտիվ դերային խաղեր (AI = Աշխատակից, Սովորող = IT Specialist)։
7. **Vocabulary (210 բառ · Flashcards · Spaced Repetition)** — բառարան, ընտրյալներ, քարտեր և ինտերվալային կրկնության համակարգ։
8. **Personal Learning System** — մակարդակի նախնական թեստ (Placement Test), Reading / Listening / Speaking / Writing հմտությունների առանձին հաշվառում, սխալների պահոց և ուսուցման պատմություն։
9. **Local Data Abstraction (`lib/storage.ts`)** — պահպանում է տվյալները `LocalStorage`-ում և `IndexedDB`-ում՝ Repository շերտով, որպեսզի հետագայում հեշտությամբ միացվի PostgreSQL, MySQL կամ Supabase։

## Տեղադրում և Գործարկում (Local Development)

```bash
npm install
npm run dev
```

Բացեք `http://localhost:3000` հասցեն բրաուզերում (խոսքի ճանաչման համար խորհուրդ է տրվում Google Chrome կամ Microsoft Edge)։

## Production Build և Vercel Deployment

```bash
npm run build
npm start
```

### Vercel և armeng.royalarm.store

1. Vercel-ում ներմուծեք `RoyalArm001/AMEnglishapp` GitHub պահոցը։
2. Ընտրեք **Next.js**, root directory՝ `./`, production branch՝ `main`։ Build command՝ `npm run build`, install command՝ `npm ci`։
3. Հրապարակումից հետո **Settings → Domains** բաժնում ավելացրեք `armeng.royalarm.store`։
4. Դոմեյնի DNS կառավարման վահանակում ավելացրեք `CNAME` գրառում՝ անունը `armeng`, արժեքը՝ Vercel-ի ցուցադրած ճշգրիտ target-ը։ Սպասեք **Valid Configuration** կարգավիճակին և HTTPS վկայականի ակտիվացմանը։
5. GitHub-ի `main` ճյուղի հաջորդ push-երը Vercel-ը կհրապարակի ինքնաշխատ՝ Git ինտեգրացումը միացված լինելու դեպքում։

Հավելվածն օգտագործում է `/api/teacher` server route-ը, ուստի պետք է գործարկել Next.js runtime-ով։ GitHub Pages-ի ստատիկ հրապարակումը այս հավելվածի համար բավարար չէ։

### Environment Variables (`.env.example`)

Առանց API բանալու հավելվածն ամբողջությամբ աշխատում է կանոնահեն ադապտիվ ռեժիմով։ Հետագայում OpenAI կամ Gemini միացնելու համար Vercel-ի կարգավորումներում ավելացրեք․

```env
AI_PROVIDER=rule-based # կամ openai / gemini
OPENAI_API_KEY=
GEMINI_API_KEY=
```
