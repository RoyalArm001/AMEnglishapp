# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: learning.spec.ts >> previously loaded lessons remain usable offline
- Location: tests\e2e\learning.spec.ts:101:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Հաջորդ նախադասությունը', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Հաջորդ նախադասությունը', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Հաջորդ նախադասությունը', exact: true })

```

```yaml
- link "Անցնել պարապմունքին":
  - /url: "#learning-main"
- complementary "Ձախ ընտրացանկ":
  - img "HayLingo Logo"
  - text: HayLingo v1.2.1 Անգլերենի ինտերակտիվ ուսուցում
  - navigation "Բաժինների ընտրություն":
    - button "Գլխավոր վահանակ Օրվա ամփոփում":
      - img
      - text: Գլխավոր վահանակ Օրվա ամփոփում
    - button "Օրվա 3 բառերը Օրական մարտահրավեր":
      - img
      - text: Օրվա 3 բառերը Օրական մարտահրավեր
    - button "Օրվա հարցերը 10 ամենօրյա հարց":
      - img
      - text: Օրվա հարցերը 10 ամենօրյա հարց
    - button "Առօրյա զրույցներ 12 կենդանի թեմա":
      - img
      - text: Առօրյա զրույցներ 12 կենդանի թեմա
    - button "Գրադարան & Պոեզիա 15 գիրք & 10 պոեմ":
      - img
      - text: Գրադարան & Պոեզիա 15 գիրք & 10 պոեմ
    - button "Քերականություն 18 թեմա (A1–C2)":
      - img
      - text: Քերականություն 18 թեմա (A1–C2)
    - button "Արտասանություն & ակցենտ 🇺🇸 US vs 🇬🇧 UK":
      - img
      - text: Արտասանություն & ակցենտ 🇺🇸 US vs 🇬🇧 UK
    - button "Անգլերենի դասեր 16 բաժին · 28 դաս":
      - img
      - text: Անգլերենի դասեր 16 բաժին · 28 դաս
    - button "Առաջադրանքներ Վարժություններ Ա–Զ":
      - img
      - text: Առաջադրանքներ Վարժություններ Ա–Զ
    - button "Ուսումնական օգնական Հարց ու պատասխան":
      - img
      - text: Ուսումնական օգնական Հարց ու պատասխան
    - button "Ձայնային պարապմունք Խոսք և Առավոտյան ռեժիմ":
      - img
      - text: Ձայնային պարապմունք Խոսք և Առավոտյան ռեժիմ
    - button "Մասնագիտական և ՏՏ 15 մասնագիտություն · երկխոսություն":
      - img
      - text: Մասնագիտական և ՏՏ 15 մասնագիտություն · երկխոսություն
    - button "Բառապաշար 210 բառ և Քարտեր":
      - img
      - text: Բառապաշար 210 բառ և Քարտեր
    - button "Թարգմանություն Հայերեն ↔ Անգլերեն":
      - img
      - text: Թարգմանություն Հայերեն ↔ Անգլերեն
    - button "Ուսուցման պատմություն Գրաֆիկներ և Սխալներ":
      - img
      - text: Ուսուցման պատմություն Գրաֆիկներ և Սխալներ
    - button "Իմ պրոֆիլը Անձնական տվյալներ":
      - img
      - text: Իմ պրոֆիլը Անձնական տվյալներ
    - button "Կարգավորումներ Տեսք, Ժամ և Տվյալներ":
      - img
      - text: Կարգավորումներ Տեսք, Ժամ և Տվյալներ
  - img
  - text: 0 օր անընդմեջ A2
  - button "☀️ Ցերեկային տեսք Փոխել":
    - img
    - text: ☀️ Ցերեկային տեսք Փոխել
- main:
  - text: ԱՆԳԼԵՐԵՆԻ ՈՒՍՈՒՑՄԱՆ ԱՆՁՆԱԿԱՆ ՀԱՐԹԱԿ · 16:37 (Asia/Yerevan) Բարի գալուստ, Test Learner 👋
  - button "Test Learner":
    - img
    - text: Test Learner
  - img
  - text: 0 օր
  - img
  - text: Մակարդակ՝ A2
  - button "Կարգավորումներ":
    - img
  - img
  - text: Անհատական ուսուցման համակարգ
  - heading "Պարզի՛ր քո անգլերենի ճշգրիտ մակարդակը (A1–C2) 2 րոպեում" [level=3]
  - paragraph: Անցիր կարճ մակարդակի ստուգումը, որպեսզի դասերն ու վարժությունները հարմարվեն քո գիտելիքներին։
  - button "Սկսել մակարդակի թեստը":
    - text: Սկսել մակարդակի թեստը
    - img
  - img
  - text: ԱՅՍՕՐՎԱ ԴԱՍԸ · ՄԱԿԱՐԴԱԿ B1 · ՏՏ մասնագետ (IT Specialist)
  - heading "Աշխատանքային ժողովներ և թիմային քննարկումներ" [level=1]
  - paragraph: Ինչպես ներկայացնել կատարված աշխատանքը և հարցեր բարձրացնել ժողովների ժամանակ։
  - paragraph: English:Let me share my screen so everyone can see the current status.
  - button "Լսել արտասանությունը":
    - img
  - paragraph:
    - strong: "Կարդացվում է:"
    - text: Լեթ մի շեըր մայ սքրին սոու էվրիուան քեն սի դը քարընթ սթեյթըս։
  - paragraph:
    - strong: "Հայերեն:"
    - text: Թույլ տվեք կիսվել իմ էկրանով, որպեսզի բոլորը տեսնեն ընթացիկ վիճակը։
  - button "Սկսել այսօրվա դասը":
    - text: Սկսել այսօրվա դասը
    - img
  - button "Շարունակել նախորդ դասը (Նախադասություն 1)":
    - img
    - text: Շարունակել նախորդ դասը (Նախադասություն 1)
  - text: ԻՄ ՄԱԿԱՐԴԱԿԸ ԵՎ ՄԱՍՆԱԳԻՏՈՒԹՅՈՒՆԸ
  - heading "Մակարդակ՝ A2" [level=2]
  - button "Իմ պրոֆիլը":
    - img
    - text: Իմ պրոֆիլը
  - button "A1"
  - button "A2"
  - button "B1"
  - button "B2"
  - button "C1"
  - button "C2"
  - paragraph: Առօրյա խոսակցություններ, պարզ աշխատանքային և ճանապարհորդական թեմաներ
  - img
  - text: Օրական ուսուցման ժամանակ 0 / 15 րոպե (0%) Ձայնային պարապմունք · 08:30 Արագ սկսել ձայնային պարապմունք
  - button "Սկսել":
    - img
    - text: Սկսել
  - img
  - text: Ձեր մասնագիտության առաջարկվող ուղղությունները (ՏՏ մասնագետ (IT Specialist)) Համակարգչային խնդիրների լուծում · Computer Troubleshooting Ցանցային խնդիրներ · Network Problems Շփում գործընկերների հետ · Talking to Colleagues Տեխնիկական աջակցություն · Technical Support ՏՏ աշխատանքային հարցազրույց · IT Job Interview
  - button "Տեսնել բոլոր մասնագիտությունների դասերը →"
  - text: Շարունակական օրեր
  - img
  - text: 0 օր Անընդմեջ պարապմունք Օրական ժամանակ
  - img
  - text: 0 ր Այսօրվա ուսուցումը Ավարտած դասեր
  - img
  - text: 0 / 28 16 թեմատիկ բաժին Սովորած բառեր
  - img
  - text: 0 Ընտրյալ՝ 0 բառ Ճիշտ պատասխաններ
  - img
  - text: 0 Ճշգրտություն՝ 0% Սխալ պատասխաններ
  - img
  - text: 0 Կրկնության ենթակա՝ 0
  - heading "Հմտությունների զարգացում" [level=2]
  - paragraph: Ընթերցանություն, Լսողական, Խոսակցական և Գրավոր հմտություններ
  - button "Ուսուցման պատմություն →"
  - text: 📖 Ընթերցանություն (Reading) 0% 🎧 Լսողական ընկալում (Listening) 0% 🎙️ Խոսակցական հմտություն (Speaking) 0% ✍️ Գրավոր և Քերականություն (Writing) 0%
  - button "Ինտերակտիվ Առաջադրանքներ (A–F) 116 վարժություն՝ լրացում, թարգմանություն, սխալի ուղղում, լսողական և ձայնային։":
    - img
    - heading "Ինտերակտիվ Առաջադրանքներ (A–F)" [level=3]
    - paragraph: 116 վարժություն՝ լրացում, թարգմանություն, սխալի ուղղում, լսողական և ձայնային։
  - button "Մասնագիտական և ՏՏ Անգլերեն 13 ՏՏ թեմաներ և 21 աշխատանքային դերային խաղեր (Helpdesk, Network, AD, M365)։":
    - img
    - heading "Մասնագիտական և ՏՏ Անգլերեն" [level=3]
    - paragraph: 13 ՏՏ թեմաներ և 21 աշխատանքային դերային խաղեր (Helpdesk, Network, AD, M365)։
  - button "Ուսումնական օգնական Հարց ու պատասխան, քերականական սխալների ուղղում և հայերեն բացատրություն։":
    - img
    - heading "Ուսումնական օգնական" [level=3]
    - paragraph: Հարց ու պատասխան, քերականական սխալների ուղղում և հայերեն բացատրություն։
  - button "Բառապաշար և Քարտեր (210 բառ) Հայերեն արտասանությամբ բառարան, ընտրյալներ և ինտերվալային կրկնություն։":
    - img
    - heading "Բառապաշար և Քարտեր (210 բառ)" [level=3]
    - paragraph: Հայերեն արտասանությամբ բառարան, ընտրյալներ և ինտերվալային կրկնություն։
  - text: ԱՄԵՆՕՐՅԱ ՊԱՐԱՊՄՈՒՆՔՆԵՐ ԵՎ ԱԿԱԴԵՄԻԱ
  - heading "Օրվա մարտահրավերներ, Գրադարան և Քերականություն" [level=2]
  - button "0 / 3 բառ Օրվա 3 բառերը Հայերենից անգլերեն ինտերակտիվ գրավոր մարտահրավեր՝ հուշումներով և անսահմանափակ փորձերով։":
    - img
    - text: 0 / 3 բառ
    - heading "Օրվա 3 բառերը" [level=3]
    - paragraph: Հայերենից անգլերեն ինտերակտիվ գրավոր մարտահրավեր՝ հուշումներով և անսահմանափակ փորձերով։
  - button "0 / 10 հարց Օրվա հարցերը 10 ամենօրյա հարցաշար՝ մակարդակին և մասնագիտությանը համապատասխան, հայերեն բացատրություններով։":
    - img
    - text: 0 / 10 հարց
    - heading "Օրվա հարցերը" [level=3]
    - paragraph: 10 ամենօրյա հարցաշար՝ մակարդակին և մասնագիտությանը համապատասխան, հայերեն բացատրություններով։
  - button "12 թեմա • 8 քայլ Առօրյա զրույցներ Կենդանի երկխոսություններ՝ առավոտ, աշխատանք, սրճարան, հեռախոսազանգ և IT Support։":
    - img
    - text: 12 թեմա • 8 քայլ
    - heading "Առօրյա զրույցներ" [level=3]
    - paragraph: Կենդանի երկխոսություններ՝ առավոտ, աշխատանք, սրճարան, հեռախոսազանգ և IT Support։
  - button "15 գիրք • 10 պոեմ Գրադարան և Պոեզիա Բառի սեղմումով թարգմանություն, ձայնային արտասանություն, էկրանի ակտիվություն (Wake Lock)։":
    - img
    - text: 15 գիրք • 10 պոեմ
    - heading "Գրադարան և Պոեզիա" [level=3]
    - paragraph: Բառի սեղմումով թարգմանություն, ձայնային արտասանություն, էկրանի ակտիվություն (Wake Lock)։
  - button "18 թեմա • 72 վարժություն Քերականության Ակադեմիա A1-ից մինչև C2 ամբողջական քերականություն՝ կանոններով, բանաձևերով և վարժություններով։":
    - img
    - text: 18 թեմա • 72 վարժություն
    - heading "Քերականության Ակադեմիա" [level=3]
    - paragraph: A1-ից մինչև C2 ամբողջական քերականություն՝ կանոններով, բանաձևերով և վարժություններով։
  - button "🇺🇸 US vs 🇬🇧 UK Արտասանություն և ակցենտ 10 արտասանական մոդուլներ՝ TH, R, W vs V, շեշտադրություն, ինտոնացիա և խոսքի ստուգում։":
    - img
    - text: 🇺🇸 US vs 🇬🇧 UK
    - heading "Արտասանություն և ակցենտ" [level=3]
    - paragraph: 10 արտասանական մոդուլներ՝ TH, R, W vs V, շեշտադրություն, ինտոնացիա և խոսքի ստուգում։
- alert
```

# Test source

```ts
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
  32  |  await page.getByLabel('Ավտոմատ արտասանություն',{exact:true}).check();
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
> 105 |  await page.reload();await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
      |                                                                                                        ^ Error: expect(locator).toBeVisible() failed
  106 |  await context.setOffline(true);await page.reload();
  107 |  await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
  108 |  await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  109 |  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!).currentSentenceIndex)).toBeGreaterThan(0);
  110 | });
  111 | 
```