# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: learning.spec.ts >> theme and exercise settings persist after reload
- Location: tests\e2e\learning.spec.ts:29:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Ավտոմատ արտասանություն', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - generic [ref=f1e2]:
    - link "Անցնել պարապմունքին" [ref=f1e3] [cursor=pointer]:
      - /url: "#learning-main"
    - banner [ref=f1e4]:
      - generic [ref=f1e5]:
        - img "HayLingo Logo" [ref=f1e6]
        - generic [ref=f1e22]:
          - generic [ref=f1e23]: HayLingo
          - generic [ref=f1e24]: Test Learner · Մակարդակ A2 · 0 օր
      - generic [ref=f1e25]:
        - button "Փոխել թեման" [ref=f1e26] [cursor=pointer]
        - button "Մենյու" [ref=f1e29] [cursor=pointer]
    - main [ref=f1e31]:
      - generic [ref=f1e32]:
        - generic [ref=f1e33]:
          - generic [ref=f1e34]:
            - generic [ref=f1e35]: ԱՆԳԼԵՐԵՆԻ ՈՒՍՈՒՑՄԱՆ ԱՆՁՆԱԿԱՆ ՀԱՐԹԱԿ · 16:38 (Asia/Yerevan)
            - generic [ref=f1e36]: Բարի գալուստ, Test Learner 👋
          - generic [ref=f1e37]:
            - button "Test Learner" [ref=f1e38] [cursor=pointer]
            - generic [ref=f1e43]: 0 օր
            - generic [ref=f1e47]: Մակարդակ՝ A2
            - button "Կարգավորումներ" [ref=f1e52] [cursor=pointer]
        - generic [ref=f1e56]:
          - generic [ref=f1e57]:
            - text: ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ · ԱՐՏԱՔԻՆ ՏԵՍՔ, ԺԱՄԱՅԻՆ ԳՈՏԻ, ՁԱՅՆ ԵՎ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ
            - heading "Համակարգի և ուսուցման կարգավորումներ" [level=1] [ref=f1e58]
          - region [ref=f1e59]:
            - heading "Էկրան և տառաչափ" [level=2] [ref=f1e60]
            - generic [ref=f1e61]:
              - checkbox "Դասի ընթացքում էկրանը միացված պահել" [checked] [ref=f1e62]
              - generic [ref=f1e63]: Դասի ընթացքում էկրանը միացված պահել
            - paragraph [ref=f1e64]: Գործում է պարապմունքի ընթացքում։ Էջից դուրս գալուց կամ պարապմունքն ավարտելուց հետո անջատվում է։ Համակարգը կարող է մերժել կամ ընդհատել այն, օրինակ՝ մարտկոցի խնայման պատճառով։
            - generic [ref=f1e65]:
              - text: Ցուցադրման ռեժիմ
              - combobox "Ցուցադրման ռեժիմ" [ref=f1e66]:
                - option "Ավտոմատ" [selected]
                - option "Համակարգչային"
                - option "Բջջային"
            - paragraph [ref=f1e67]: Համակարգչային ռեժիմը լայն է՝ ձախ ընտրացանկով։ Փոքր էկրանին ընտրացանկը բացվում է «Մենյու»-ից։ Բջջային ռեժիմը կենտրոնացված մեկ սյունակ ունի։ Tab-ով շարժվեք, Enter-ով ընտրեք, Escape-ով փակեք ընտրացանկը։
            - heading "Տառաչափ" [level=3] [ref=f1e68]
            - group "Ընդհանուր ինտերֆեյս" [ref=f1e69]:
              - generic [ref=f1e71]:
                - button "Ընդհանուր ինտերֆեյս՝ Փոքր, 14px" [ref=f1e72] [cursor=pointer]: Փոքր · 14px
                - button "Ընդհանուր ինտերֆեյս՝ Սովորական, 16px" [pressed] [ref=f1e73] [cursor=pointer]: Սովորական · 16px
                - button "Ընդհանուր ինտերֆեյս՝ Միջին, 18px" [ref=f1e74] [cursor=pointer]: Միջին · 18px
                - button "Ընդհանուր ինտերֆեյս՝ Մեծ, 22px" [ref=f1e75] [cursor=pointer]: Մեծ · 22px
                - button "Ընդհանուր ինտերֆեյս՝ Շատ մեծ, 26px" [ref=f1e76] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e77]:
                - generic [ref=f1e78]: Ընդհանուր ինտերֆեյս՝ 16px
                - slider "Ընդհանուր ինտերֆեյսի չափը" [ref=f1e79]: "16"
            - group "Անգլերեն տեքստ" [ref=f1e80]:
              - generic [ref=f1e82]:
                - button "Անգլերեն տեքստ՝ Փոքր, 14px" [ref=f1e83] [cursor=pointer]: Փոքր · 14px
                - button "Անգլերեն տեքստ՝ Սովորական, 16px" [pressed] [ref=f1e84] [cursor=pointer]: Սովորական · 16px
                - button "Անգլերեն տեքստ՝ Միջին, 18px" [ref=f1e85] [cursor=pointer]: Միջին · 18px
                - button "Անգլերեն տեքստ՝ Մեծ, 22px" [ref=f1e86] [cursor=pointer]: Մեծ · 22px
                - button "Անգլերեն տեքստ՝ Շատ մեծ, 26px" [ref=f1e87] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e88]:
                - generic [ref=f1e89]: Անգլերեն տեքստ՝ 16px
                - slider "Անգլերեն տեքստի չափը" [ref=f1e90]: "16"
            - group "Հայերեն արտասանություն" [ref=f1e91]:
              - generic [ref=f1e93]:
                - button "Հայերեն արտասանություն՝ Փոքր, 14px" [ref=f1e94] [cursor=pointer]: Փոքր · 14px
                - button "Հայերեն արտասանություն՝ Սովորական, 16px" [pressed] [ref=f1e95] [cursor=pointer]: Սովորական · 16px
                - button "Հայերեն արտասանություն՝ Միջին, 18px" [ref=f1e96] [cursor=pointer]: Միջին · 18px
                - button "Հայերեն արտասանություն՝ Մեծ, 22px" [ref=f1e97] [cursor=pointer]: Մեծ · 22px
                - button "Հայերեն արտասանություն՝ Շատ մեծ, 26px" [ref=f1e98] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e99]:
                - generic [ref=f1e100]: Հայերեն արտասանություն՝ 16px
                - slider "Հայերեն արտասանությունի չափը" [ref=f1e101]: "16"
            - group "Հայերեն թարգմանություն" [ref=f1e102]:
              - generic [ref=f1e104]:
                - button "Հայերեն թարգմանություն՝ Փոքր, 14px" [ref=f1e105] [cursor=pointer]: Փոքր · 14px
                - button "Հայերեն թարգմանություն՝ Սովորական, 16px" [pressed] [ref=f1e106] [cursor=pointer]: Սովորական · 16px
                - button "Հայերեն թարգմանություն՝ Միջին, 18px" [ref=f1e107] [cursor=pointer]: Միջին · 18px
                - button "Հայերեն թարգմանություն՝ Մեծ, 22px" [ref=f1e108] [cursor=pointer]: Մեծ · 22px
                - button "Հայերեն թարգմանություն՝ Շատ մեծ, 26px" [ref=f1e109] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e110]:
                - generic [ref=f1e111]: Հայերեն թարգմանություն՝ 16px
                - slider "Հայերեն թարգմանությունի չափը" [ref=f1e112]: "16"
            - generic "Տառաչափի նախադիտում" [ref=f1e113]:
              - paragraph [ref=f1e114]: Նախադիտում · Փոփոխությունները կիրառվում են անմիջապես։
              - paragraph [ref=f1e115]: I am learning English every day.
              - paragraph [ref=f1e116]: Այ եմ լըրնինգ Ինգլիշ էվրի դեյ։
              - paragraph [ref=f1e117]: Ես ամեն օր անգլերեն եմ սովորում։
          - generic [ref=f1e118]:
            - generic [ref=f1e119]:
              - generic [ref=f1e120]:
                - heading "Ա. Արտաքին տեսք (Ցերեկային / Գիշերային / Ավտոմատ)" [level=2] [ref=f1e121]
                - paragraph [ref=f1e128]: Ավտոմատ ռեժիմն օգտագործում է Ձեր ընտրված ժամային գոտին (Asia/Yerevan) և տեղական ժամանակը (16:38)։
              - generic [ref=f1e129]: Ակտիվ տեսք՝ 🌙 Գիշերային
            - generic [ref=f1e130]:
              - button "☀️ Ցերեկային — Light Mode" [ref=f1e131] [cursor=pointer]
              - button "🌙 Գիշերային — Dark Mode" [active] [ref=f1e133] [cursor=pointer]
              - button "🕒 Ավտոմատ — Auto Mode" [ref=f1e138] [cursor=pointer]
          - generic [ref=f1e140]:
            - generic [ref=f1e141]:
              - heading "Բ. Ժամային գոտի և օրական հաշվարկ" [level=2] [ref=f1e142]
              - paragraph [ref=f1e146]: Օրական շարունակականության (Streak) և ուսումնական րոպեների ճշգրիտ հաշվարկ ըստ Ձեր բնակության վայրի։
            - generic [ref=f1e147]:
              - generic [ref=f1e148]:
                - generic [ref=f1e149]: Ժամային գոտի (Timezone)
                - combobox [ref=f1e150]:
                  - option "Երևան (Asia/Yerevan · UTC+4)" [selected]
                  - option "Թբիլիսի (Asia/Tbilisi · UTC+4)"
                  - option "Դուբայ (Asia/Dubai · UTC+4)"
                  - option "Մոսկվա (Europe/Moscow · UTC+3)"
                  - option "Աթենք / Կիպրոս (Europe/Athens · UTC+2/3)"
                  - option "Բեռլին / Փարիզ (Europe/Berlin · UTC+1/2)"
                  - option "Լոնդոն (Europe/London · UTC+0/1)"
                  - option "Նյու Յորք (America/New_York · UTC-5/4)"
                  - option "Չիկագո (America/Chicago · UTC-6/5)"
                  - option "Լոս Անջելես / Գլենդել (America/Los_Angeles · UTC-8/7)"
              - generic [ref=f1e151]:
                - generic [ref=f1e152]: Օրական ուսումնական նպատակ
                - combobox [ref=f1e153]:
                  - option "10 րոպե / օրական (Թեթև)"
                  - option "15 րոպե / օրական (Խորհուրդ տրվող)" [selected]
                  - option "25 րոպե / օրական (Ինտենսիվ)"
                  - option "45 րոպե / օրական (Խորացված)"
            - generic [ref=f1e154]:
              - generic [ref=f1e155]:
                - text: Ընտրված գոտու տեղական ամսաթիվն ու ժամը․
                - strong [ref=f1e156]: 2026-10-30 16:38
              - button "Ավտոմատ որոշել" [ref=f1e157] [cursor=pointer]
          - generic [ref=f1e158]:
            - generic [ref=f1e159]:
              - heading "Գ. Ձայն և արտասանություն (TTS & STT)" [level=2] [ref=f1e160]
              - paragraph [ref=f1e165]: Անգլերեն խոսքի արագության կարգավորում (0.7x – 1.2x), ձայնի ընտրություն և միկրոֆոնի թեստավորում։
            - generic [ref=f1e166]:
              - generic [ref=f1e167]:
                - generic [ref=f1e168]:
                  - generic [ref=f1e169]: Ձայնի արագություն (1.00x)
                  - button "Լսել օրինակը" [ref=f1e170] [cursor=pointer]
                - slider [ref=f1e175]: "1"
                - generic [ref=f1e176]:
                  - generic [ref=f1e177]: 0.7x (Դանդաղ)
                  - generic [ref=f1e178]: 1.0x (Բնական)
                  - generic [ref=f1e179]: 1.2x (Արագ)
              - generic [ref=f1e180]:
                - generic [ref=f1e181]: Անգլերեն ձայն (Բրաուզերի հասանելի TTS ձայներ)
                - combobox [ref=f1e182]:
                  - option "Ավտոմատ բնական ձայն (Default)" [selected]
                  - option "Microsoft David - English (United States) (en-US)"
                  - option "Microsoft Mark - English (United States) (en-US)"
                  - option "Microsoft Zira - English (United States) (en-US)"
            - generic [ref=f1e183]:
              - paragraph [ref=f1e189]: Միկրոֆոնի և խոսքի ճանաչման թեստավորում
              - button "Ստուգել միկրոֆոնը" [ref=f1e190] [cursor=pointer]
          - generic [ref=f1e191]:
            - generic [ref=f1e192]:
              - generic [ref=f1e198]:
                - heading "Դ. Առավոտյան հիշեցումներ" [level=2] [ref=f1e199]
                - paragraph [ref=f1e200]: Կարգավորիր ամենօրյա հիշեցման ժամը, առաջադրանքների քանակը և թեման։
              - checkbox [ref=f1e202]
            - generic [ref=f1e204]:
              - generic [ref=f1e205]:
                - generic [ref=f1e206]: Հիշեցման ժամը
                - textbox [ref=f1e207]: 08:00
              - generic [ref=f1e208]:
                - generic [ref=f1e209]: Օրական առաջադրանքներ
                - combobox [ref=f1e210]:
                  - option "3 առաջադրանք (արագ)" [selected]
                  - option "5 առաջադրանք (ստանդարտ)"
                  - option "10 առաջադրանք (ինտենսիվ)"
              - generic [ref=f1e211]:
                - generic [ref=f1e212]: Հիշեցման թեման
                - combobox [ref=f1e213]:
                  - option "Օրվա բառերը (3 Words)"
                  - option "Քերականություն (Grammar)"
                  - option "Առօրյա զրույցներ (Conversations)"
                  - option "Բոլոր առաջադրանքները" [selected]
            - generic [ref=f1e214]:
              - generic [ref=f1e215] [cursor=pointer]:
                - checkbox "Հիշեցման ձայնային ազդանշան" [checked] [ref=f1e216]
                - generic [ref=f1e217]: Հիշեցման ձայնային ազդանշան
              - button "Փորձարկել հիշեցումը հիմա" [ref=f1e218] [cursor=pointer]
          - generic [ref=f1e223]:
            - generic [ref=f1e224]:
              - heading "Ե. Ուսումնական մակարդակ և ադապտիվություն" [level=2] [ref=f1e225]
              - paragraph [ref=f1e227]: Փոխեք Ձեր CEFR մակարդակը կամ ադապտիվ դժվարության կանոնները։
            - generic [ref=f1e228]:
              - generic [ref=f1e229]:
                - generic [ref=f1e230]: Ընթացիկ CEFR մակարդակ
                - combobox [ref=f1e231]:
                  - option "A1 · Սկսնակ (Beginner)"
                  - option "A2 · Տարրական (Elementary)" [selected]
                  - option "B1 · Միջին (Intermediate)"
                  - option "B2 · Միջինից բարձր (Upper-Int)"
                  - option "C1 · Առաջադեմ (Advanced)"
                  - option "C2 · Վարպետ (Proficiency)"
              - generic [ref=f1e232]:
                - generic [ref=f1e233]: Վարժությունների բարդություն
                - combobox [ref=f1e234]:
                  - option "Ադապտիվ (ըստ առաջադիմության)" [selected]
                  - option "Հեշտ (A1–A2)"
                  - option "Միջին (B1–B2)"
                  - option "Խորացված (C1–C2)"
            - generic [ref=f1e235]:
              - generic [ref=f1e236] [cursor=pointer]:
                - generic [ref=f1e237]: Հուշումների ցուցադրում (Hints)
                - checkbox "Հուշումների ցուցադրում (Hints)" [checked] [ref=f1e238]
              - generic [ref=f1e239] [cursor=pointer]:
                - generic [ref=f1e240]: Սխալների ավտոմատ կրկնում
                - checkbox "Սխալների ավտոմատ կրկնում" [checked] [ref=f1e241]
              - generic [ref=f1e242] [cursor=pointer]:
                - generic [ref=f1e243]: Ավտոմատ անցում հաջորդին
                - checkbox "Ավտոմատ անցում հաջորդին" [ref=f1e244]
          - generic [ref=f1e245]:
            - generic [ref=f1e246]:
              - heading "Զ. Լոկալ տվյալների բազա (IndexedDB & SQLite .db)" [level=2] [ref=f1e247]
              - paragraph [ref=f1e253]: Ձեր պրոֆիլը, դասերի առաջընթացը, բառապաշարը և պատմությունը պահպանվում են բրաուզերի IndexedDB-ում (24 առանձին աղյուսակներով)։ Կարող եք արտահանել իրական SQLite (.db) կամ JSON ֆայլով։
            - generic [ref=f1e254]:
              - button "Արտահանել SQLite (.db)" [ref=f1e255] [cursor=pointer]
              - button "Վերականգնել SQLite (.db)" [ref=f1e259] [cursor=pointer]
              - button "Արտահանել տվյալները (JSON)" [ref=f1e263] [cursor=pointer]
              - button "Ներմուծել տվյալները (JSON)" [ref=f1e267] [cursor=pointer]
              - button "Պրոֆիլի և տվյալների ամբողջական ջնջում" [ref=f1e271] [cursor=pointer]
            - generic [ref=f1e278]:
              - strong [ref=f1e279]: Գաղտնիության երաշխիք․
              - text: Ձեր անձնական տվյալները պահվում են բացառապես Ձեր սարքի մեջ և չեն փոխանցվում արտաքին ծառայությունների առանց Ձեր տեղեկացված համաձայնության։
          - generic [ref=f1e280]:
            - generic [ref=f1e281]:
              - generic [ref=f1e285]:
                - heading "Է. PWA Հավելված, Offline Քեշ և Ծանուցումներ (v1.2.1)" [level=2] [ref=f1e286]
                - paragraph [ref=f1e287]: Progressive Web App ֆունկցիոնալություն՝ անցանց աշխատանք, ծանուցումներ և արագ կիսվելու հնարավորություն
              - generic [ref=f1e288]: 🌐 Բրաուզերային ռեժիմ (PWA Ready)
            - generic [ref=f1e289]:
              - generic [ref=f1e290]:
                - text: Հավելվածի տարբերակ
                - paragraph [ref=f1e291]: HayLingo v1.2.1
              - generic [ref=f1e292]:
                - text: Offline քեշավորված ռեսուրսներ
                - paragraph [ref=f1e293]: 14 ֆայլ (2 պահոց)
              - generic [ref=f1e294]:
                - text: Ծանուցումների կարգավիճակ
                - paragraph [ref=f1e295]: 🔔 Սպասում է թույլտվության
            - generic [ref=f1e296]:
              - button "Միացնել / Թեստավորել Ծանուցումը" [ref=f1e297] [cursor=pointer]
              - button "Թարմացնել Offline Քեշը" [ref=f1e301] [cursor=pointer]
              - button "Կիսվել Առաջընթացով (Web Share)" [ref=f1e307] [cursor=pointer]
    - navigation "Հիմնական բաժիններ" [ref=f1e314]:
      - button "Վահանակ" [ref=f1e315] [cursor=pointer]
      - button "Դասեր" [ref=f1e322] [cursor=pointer]
      - button "Վարժանք" [ref=f1e326] [cursor=pointer]
      - button "Ձայնային" [ref=f1e338] [cursor=pointer]
      - button "Պրոֆիլ" [ref=f1e343] [cursor=pointer]
  - alert [ref=f1e348]
```

# Test source

```ts
  1   | import {LESSONS_DATA} from '../../data/lessons';
  2   | import {test,expect} from '@playwright/test';
  3   | test.beforeEach(async({page})=>{
  4   |  await page.goto('/');
  5   |  await page.getByRole('textbox').nth(0).fill('Test');
  6   |  await page.getByRole('textbox').nth(1).fill('Learner');
  7   |  await page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true}).click();
  8   |  await expect(page.getByText('ԲԱՐԻ ԳԱԼՈՒՍՏ HAYLINGO',{exact:true})).toHaveCount(0);
  9   | });
  10  | test('profile persists after reload without horizontal overflow',async({page})=>{
  11  |  await page.reload();await expect(page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true})).toHaveCount(0);
  12  |  await expect(page.getByText(/Test Learner/).filter({visible:true}).first()).toBeVisible();
  13  |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  14  | });
  15  | test('local translator works and reverse direction stays in the app',async({page})=>{
  16  |  await page.goto('/?tab=translation');
  17  |  await page.getByLabel('Թարգմանվող տեքստը',{exact:true}).fill('I am learning English.');
  18  |  await page.getByRole('button',{name:'Թարգմանել',exact:true}).click();
  19  |  await expect(page.getByRole('status')).toContainText('Ես անգլերեն եմ սովորում');
  20  |  await page.getByRole('button',{name:'Փոխել թարգմանության ուղղությունը',exact:true}).click();
  21  |  await page.getByRole('button',{name:'Թարգմանել',exact:true}).click();
  22  |  await expect(page.getByRole('status')).toContainText('I am learning English.');
  23  | });
  24  | test('PWA manifest and service worker are available',async({page,request})=>{
  25  |  const manifest=await request.get('/manifest.webmanifest');expect(manifest.ok()).toBe(true);expect((await manifest.json()).icons.length).toBeGreaterThan(0);
  26  |  await expect.poll(()=>page.evaluate(async()=>Boolean(await navigator.serviceWorker.getRegistration()))).toBe(true);
  27  | });
  28  | 
  29  | test('theme and exercise settings persist after reload',async({page})=>{
  30  |  await page.goto('/?tab=settings');
  31  |  await page.getByRole('button',{name:/Գիշերային — Dark Mode/}).click();
> 32  |  await page.getByLabel('Ավտոմատ արտասանություն',{exact:true}).check();
      |                                                               ^ Error: locator.check: Test timeout of 30000ms exceeded.
  33  |  await page.reload();
  34  |  await expect(page.locator('html')).toHaveClass(/dark/);
  35  |  await expect(page.getByLabel('Ավտոմատ արտասանություն',{exact:true})).toBeChecked();
  36  |  await page.getByRole('button',{name:/Ցերեկային — Light Mode/}).click();
  37  |  await expect(page.locator('html')).not.toHaveClass(/dark/);
  38  | });
  39  | 
  40  | test('lesson position resumes and completion is recorded only once',async({page})=>{
  41  |  await page.goto('/?tab=lessons');
  42  |  const snapshot=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
  43  |  await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  44  |  const first=await snapshot();
  45  |  const lesson = LESSONS_DATA.find(l=>l.id===first.currentLessonId)!;
  46  |  await page.reload();
  47  |  await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
  48  |  expect((await snapshot()).currentSentenceIndex).toBe(first.currentSentenceIndex);
  49  |  for(let i=first.currentSentenceIndex;i<lesson.sentences.length-1;i++) await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  50  |  await page.getByRole('button',{name:'Ավարտել դասը և անցնել առաջ',exact:true}).click();
  51  |  const done=await snapshot();
  52  |  expect(done.completedLessonIds).toContain(first.currentLessonId);
  53  |  expect(done.completedLessonIds.filter((id:string)=>id===first.currentLessonId)).toHaveLength(1);
  54  |  expect(done.totalStudyMinutes).toBeLessThan(2);
  55  |  expect(done.streakDays).toBe(1);
  56  |  await page.getByRole('button',{name:'Բացել դասը՝ '+lesson.titleAm,exact:true}).click();
  57  |  for(let i=0;i<lesson.sentences.length-1;i++) await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  58  |  await page.getByRole('button',{name:'Ավարտել դասը և անցնել առաջ',exact:true}).click();
  59  |  const repeated = await snapshot();expect(repeated.skills.reading).toBe(done.skills.reading);
  60  |  expect(repeated.history.filter((h:any)=>h.activityType==='lesson'&&h.referenceId===lesson.id)).toHaveLength(1);
  61  | });
  62  | 
  63  | test('professional exercises reject wrong answers and save a correct answer',async({page},testInfo)=>{
  64  |  await page.goto('/?tab=it-english');
  65  |  await page.getByLabel('Պարապմունքի մասնագիտությունը').selectOption('Doctor');
  66  |  await page.getByLabel('Մասնագիտական վարժության ռեժիմ').selectOption('translate');
  67  |  const check=page.getByRole('button',{name:'Ստուգել',exact:true}).first();
  68  |  await expect(check).toBeDisabled();
  69  |  await page.getByLabel('Մասնագիտական պատասխանը').fill('I eat the router every day.');await check.click();
  70  |  await expect(page.getByRole('status')).toContainText('Օրինակելի պատասխանը');
  71  |  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
  72  |  expect(before.completedRoleplayIds).not.toContain('professional-5-0');
  73  |  await page.getByLabel('Մասնագիտական պատասխանը').fill('I can review the test results.');await check.click();
  74  |  await expect(page.getByRole('status')).toContainText('Ճիշտ է');
  75  |  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
  76  |  expect(after.completedRoleplayIds).toContain('professional-5-0');
  77  |  expect(after.wrongAnswersCount).toBe(1);expect(after.correctAnswersCount).toBe(1);
  78  |  await page.screenshot({path:testInfo.outputPath('professional-practice.png'),fullPage:true});
  79  |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  80  | });
  81  | 
  82  | test('all main views load without JavaScript errors or horizontal overflow',async({page})=>{
  83  |  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  84  |  for(const tab of ['dashboard','lessons','exercises','teacher','voice','it-english','vocabulary','translation','history','profile','settings']){
  85  |   await page.goto(`/?tab=${tab}`);
  86  |   await expect(page.locator('main')).toBeVisible();
  87  |   await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),{message:`overflow in ${tab}`}).toBe(true);
  88  |  }
  89  |  expect(errors).toEqual([]);
  90  | });
  91  | 
  92  | test('unsupported microphone provides a usable text fallback',async({page})=>{
  93  |  await page.addInitScript(()=>{Object.defineProperty(window,'SpeechRecognition',{value:undefined,configurable:true});Object.defineProperty(window,'webkitSpeechRecognition',{value:undefined,configurable:true});});
  94  |  await page.goto('/?tab=it-english');
  95  |  await page.getByLabel('Մասնագիտական վարժության ռեժիմ').selectOption('speak');
  96  |  await page.getByRole('button',{name:'Պատասխանել խոսափողով',exact:true}).click();
  97  |  await expect(page.getByRole('status')).toContainText('Գրեք պատասխանը');
  98  |  await expect(page.getByLabel('Մասնագիտական պատասխանը')).toBeEditable();
  99  | });
  100 | 
  101 | test('previously loaded lessons remain usable offline',async({page,context})=>{
  102 |  await page.goto('/?tab=lessons');
  103 |  await expect.poll(()=>page.evaluate(()=>Boolean(navigator.serviceWorker.controller))).toBe(true);
  104 |  // The second visit loads route chunks under service-worker control.
  105 |  await page.reload();await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
  106 |  await context.setOffline(true);await page.reload();
  107 |  await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
  108 |  await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  109 |  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!).currentSentenceIndex)).toBeGreaterThan(0);
  110 | });
  111 | 
```