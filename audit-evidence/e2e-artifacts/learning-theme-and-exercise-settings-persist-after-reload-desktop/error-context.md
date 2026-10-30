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
    - complementary "Ձախ ընտրացանկ" [ref=f1e4]:
      - generic [ref=f1e5]:
        - generic [ref=f1e7]:
          - img "HayLingo Logo" [ref=f1e9]
          - generic [ref=f1e25]:
            - generic [ref=f1e26]:
              - generic [ref=f1e27]: HayLingo
              - generic [ref=f1e28]: v1.2.1
            - generic [ref=f1e29]: Անգլերենի ինտերակտիվ ուսուցում
        - navigation "Բաժինների ընտրություն" [ref=f1e30]:
          - button "Գլխավոր վահանակ Օրվա ամփոփում" [ref=f1e31] [cursor=pointer]:
            - generic [ref=f1e37]:
              - generic [ref=f1e38]: Գլխավոր վահանակ
              - generic [ref=f1e39]: Օրվա ամփոփում
          - button "Օրվա 3 բառերը Օրական մարտահրավեր" [ref=f1e40] [cursor=pointer]:
            - generic [ref=f1e43]:
              - generic [ref=f1e44]: Օրվա 3 բառերը
              - generic [ref=f1e45]: Օրական մարտահրավեր
          - button "Օրվա հարցերը 10 ամենօրյա հարց" [ref=f1e46] [cursor=pointer]:
            - generic [ref=f1e50]:
              - generic [ref=f1e51]: Օրվա հարցերը
              - generic [ref=f1e52]: 10 ամենօրյա հարց
          - button "Առօրյա զրույցներ 12 կենդանի թեմա" [ref=f1e53] [cursor=pointer]:
            - generic [ref=f1e56]:
              - generic [ref=f1e57]: Առօրյա զրույցներ
              - generic [ref=f1e58]: 12 կենդանի թեմա
          - button "Գրադարան & Պոեզիա 15 գիրք & 10 պոեմ" [ref=f1e59] [cursor=pointer]:
            - generic [ref=f1e62]:
              - generic [ref=f1e63]: Գրադարան & Պոեզիա
              - generic [ref=f1e64]: 15 գիրք & 10 պոեմ
          - button "Քերականություն 18 թեմա (A1–C2)" [ref=f1e65] [cursor=pointer]:
            - generic [ref=f1e69]:
              - generic [ref=f1e70]: Քերականություն
              - generic [ref=f1e71]: 18 թեմա (A1–C2)
          - button "Արտասանություն & ակցենտ 🇺🇸 US vs 🇬🇧 UK" [ref=f1e72] [cursor=pointer]:
            - generic [ref=f1e77]:
              - generic [ref=f1e78]: Արտասանություն & ակցենտ
              - generic [ref=f1e79]: 🇺🇸 US vs 🇬🇧 UK
          - button "Անգլերենի դասեր 16 բաժին · 28 դաս" [ref=f1e80] [cursor=pointer]:
            - generic [ref=f1e83]:
              - generic [ref=f1e84]: Անգլերենի դասեր
              - generic [ref=f1e85]: 16 բաժին · 28 դաս
          - button "Առաջադրանքներ Վարժություններ Ա–Զ" [ref=f1e86] [cursor=pointer]:
            - generic [ref=f1e97]:
              - generic [ref=f1e98]: Առաջադրանքներ
              - generic [ref=f1e99]: Վարժություններ Ա–Զ
          - button "Ուսումնական օգնական Հարց ու պատասխան" [ref=f1e100] [cursor=pointer]:
            - generic [ref=f1e103]:
              - generic [ref=f1e104]: Ուսումնական օգնական
              - generic [ref=f1e105]: Հարց ու պատասխան
          - button "Ձայնային պարապմունք Խոսք և Առավոտյան ռեժիմ" [ref=f1e106] [cursor=pointer]:
            - generic [ref=f1e110]:
              - generic [ref=f1e111]: Ձայնային պարապմունք
              - generic [ref=f1e112]: Խոսք և Առավոտյան ռեժիմ
          - button "Մասնագիտական և ՏՏ 15 մասնագիտություն · երկխոսություն" [ref=f1e113] [cursor=pointer]:
            - generic [ref=f1e116]:
              - generic [ref=f1e117]: Մասնագիտական և ՏՏ
              - generic [ref=f1e118]: 15 մասնագիտություն · երկխոսություն
          - button "Բառապաշար 210 բառ և Քարտեր" [ref=f1e119] [cursor=pointer]:
            - generic [ref=f1e123]:
              - generic [ref=f1e124]: Բառապաշար
              - generic [ref=f1e125]: 210 բառ և Քարտեր
          - button "Թարգմանություն Հայերեն ↔ Անգլերեն" [ref=f1e126] [cursor=pointer]:
            - generic [ref=f1e131]:
              - generic [ref=f1e132]: Թարգմանություն
              - generic [ref=f1e133]: Հայերեն ↔ Անգլերեն
          - button "Ուսուցման պատմություն Գրաֆիկներ և Սխալներ" [ref=f1e134] [cursor=pointer]:
            - generic [ref=f1e139]:
              - generic [ref=f1e140]: Ուսուցման պատմություն
              - generic [ref=f1e141]: Գրաֆիկներ և Սխալներ
          - button "Իմ պրոֆիլը Անձնական տվյալներ" [ref=f1e142] [cursor=pointer]:
            - generic [ref=f1e146]:
              - generic [ref=f1e147]: Իմ պրոֆիլը
              - generic [ref=f1e148]: Անձնական տվյալներ
          - button "Կարգավորումներ Տեսք, Ժամ և Տվյալներ" [ref=f1e149] [cursor=pointer]:
            - generic [ref=f1e153]:
              - generic [ref=f1e154]: Կարգավորումներ
              - generic [ref=f1e155]: Տեսք, Ժամ և Տվյալներ
      - generic [ref=f1e156]:
        - generic [ref=f1e157]:
          - generic [ref=f1e158]: 0 օր անընդմեջ
          - generic [ref=f1e161]: A2
        - button "🌙 Գիշերային տեսք Փոխել" [ref=f1e162] [cursor=pointer]:
          - generic [ref=f1e163]: 🌙 Գիշերային տեսք
          - generic [ref=f1e167]: Փոխել
    - main [ref=f1e168]:
      - generic [ref=f1e169]:
        - generic [ref=f1e170]:
          - generic [ref=f1e171]:
            - generic [ref=f1e172]: ԱՆԳԼԵՐԵՆԻ ՈՒՍՈՒՑՄԱՆ ԱՆՁՆԱԿԱՆ ՀԱՐԹԱԿ · 16:36 (Asia/Yerevan)
            - generic [ref=f1e173]: Բարի գալուստ, Test Learner 👋
          - generic [ref=f1e174]:
            - button "Test Learner" [ref=f1e175] [cursor=pointer]
            - generic [ref=f1e180]: 0 օր
            - generic [ref=f1e184]: Մակարդակ՝ A2
            - button "Կարգավորումներ" [ref=f1e189] [cursor=pointer]
        - generic [ref=f1e193]:
          - generic [ref=f1e194]:
            - text: ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ · ԱՐՏԱՔԻՆ ՏԵՍՔ, ԺԱՄԱՅԻՆ ԳՈՏԻ, ՁԱՅՆ ԵՎ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ
            - heading "Համակարգի և ուսուցման կարգավորումներ" [level=1] [ref=f1e195]
          - region [ref=f1e196]:
            - heading "Էկրան և տառաչափ" [level=2] [ref=f1e197]
            - generic [ref=f1e198]:
              - checkbox "Դասի ընթացքում էկրանը միացված պահել" [checked] [ref=f1e199]
              - generic [ref=f1e200]: Դասի ընթացքում էկրանը միացված պահել
            - paragraph [ref=f1e201]: Գործում է պարապմունքի ընթացքում։ Էջից դուրս գալուց կամ պարապմունքն ավարտելուց հետո անջատվում է։ Համակարգը կարող է մերժել կամ ընդհատել այն, օրինակ՝ մարտկոցի խնայման պատճառով։
            - generic [ref=f1e202]:
              - text: Ցուցադրման ռեժիմ
              - combobox "Ցուցադրման ռեժիմ" [ref=f1e203]:
                - option "Ավտոմատ" [selected]
                - option "Համակարգչային"
                - option "Բջջային"
            - paragraph [ref=f1e204]: Համակարգչային ռեժիմը լայն է՝ ձախ ընտրացանկով։ Փոքր էկրանին ընտրացանկը բացվում է «Մենյու»-ից։ Բջջային ռեժիմը կենտրոնացված մեկ սյունակ ունի։ Tab-ով շարժվեք, Enter-ով ընտրեք, Escape-ով փակեք ընտրացանկը։
            - heading "Տառաչափ" [level=3] [ref=f1e205]
            - group "Ընդհանուր ինտերֆեյս" [ref=f1e206]:
              - generic [ref=f1e208]:
                - button "Ընդհանուր ինտերֆեյս՝ Փոքր, 14px" [ref=f1e209] [cursor=pointer]: Փոքր · 14px
                - button "Ընդհանուր ինտերֆեյս՝ Սովորական, 16px" [pressed] [ref=f1e210] [cursor=pointer]: Սովորական · 16px
                - button "Ընդհանուր ինտերֆեյս՝ Միջին, 18px" [ref=f1e211] [cursor=pointer]: Միջին · 18px
                - button "Ընդհանուր ինտերֆեյս՝ Մեծ, 22px" [ref=f1e212] [cursor=pointer]: Մեծ · 22px
                - button "Ընդհանուր ինտերֆեյս՝ Շատ մեծ, 26px" [ref=f1e213] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e214]:
                - generic [ref=f1e215]: Ընդհանուր ինտերֆեյս՝ 16px
                - slider "Ընդհանուր ինտերֆեյսի չափը" [ref=f1e216]: "16"
            - group "Անգլերեն տեքստ" [ref=f1e217]:
              - generic [ref=f1e219]:
                - button "Անգլերեն տեքստ՝ Փոքր, 14px" [ref=f1e220] [cursor=pointer]: Փոքր · 14px
                - button "Անգլերեն տեքստ՝ Սովորական, 16px" [pressed] [ref=f1e221] [cursor=pointer]: Սովորական · 16px
                - button "Անգլերեն տեքստ՝ Միջին, 18px" [ref=f1e222] [cursor=pointer]: Միջին · 18px
                - button "Անգլերեն տեքստ՝ Մեծ, 22px" [ref=f1e223] [cursor=pointer]: Մեծ · 22px
                - button "Անգլերեն տեքստ՝ Շատ մեծ, 26px" [ref=f1e224] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e225]:
                - generic [ref=f1e226]: Անգլերեն տեքստ՝ 16px
                - slider "Անգլերեն տեքստի չափը" [ref=f1e227]: "16"
            - group "Հայերեն արտասանություն" [ref=f1e228]:
              - generic [ref=f1e230]:
                - button "Հայերեն արտասանություն՝ Փոքր, 14px" [ref=f1e231] [cursor=pointer]: Փոքր · 14px
                - button "Հայերեն արտասանություն՝ Սովորական, 16px" [pressed] [ref=f1e232] [cursor=pointer]: Սովորական · 16px
                - button "Հայերեն արտասանություն՝ Միջին, 18px" [ref=f1e233] [cursor=pointer]: Միջին · 18px
                - button "Հայերեն արտասանություն՝ Մեծ, 22px" [ref=f1e234] [cursor=pointer]: Մեծ · 22px
                - button "Հայերեն արտասանություն՝ Շատ մեծ, 26px" [ref=f1e235] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e236]:
                - generic [ref=f1e237]: Հայերեն արտասանություն՝ 16px
                - slider "Հայերեն արտասանությունի չափը" [ref=f1e238]: "16"
            - group "Հայերեն թարգմանություն" [ref=f1e239]:
              - generic [ref=f1e241]:
                - button "Հայերեն թարգմանություն՝ Փոքր, 14px" [ref=f1e242] [cursor=pointer]: Փոքր · 14px
                - button "Հայերեն թարգմանություն՝ Սովորական, 16px" [pressed] [ref=f1e243] [cursor=pointer]: Սովորական · 16px
                - button "Հայերեն թարգմանություն՝ Միջին, 18px" [ref=f1e244] [cursor=pointer]: Միջին · 18px
                - button "Հայերեն թարգմանություն՝ Մեծ, 22px" [ref=f1e245] [cursor=pointer]: Մեծ · 22px
                - button "Հայերեն թարգմանություն՝ Շատ մեծ, 26px" [ref=f1e246] [cursor=pointer]: Շատ մեծ · 26px
              - generic [ref=f1e247]:
                - generic [ref=f1e248]: Հայերեն թարգմանություն՝ 16px
                - slider "Հայերեն թարգմանությունի չափը" [ref=f1e249]: "16"
            - generic "Տառաչափի նախադիտում" [ref=f1e250]:
              - paragraph [ref=f1e251]: Նախադիտում · Փոփոխությունները կիրառվում են անմիջապես։
              - paragraph [ref=f1e252]: I am learning English every day.
              - paragraph [ref=f1e253]: Այ եմ լըրնինգ Ինգլիշ էվրի դեյ։
              - paragraph [ref=f1e254]: Ես ամեն օր անգլերեն եմ սովորում։
          - generic [ref=f1e255]:
            - generic [ref=f1e256]:
              - generic [ref=f1e257]:
                - heading "Ա. Արտաքին տեսք (Ցերեկային / Գիշերային / Ավտոմատ)" [level=2] [ref=f1e258]
                - paragraph [ref=f1e265]: Ավտոմատ ռեժիմն օգտագործում է Ձեր ընտրված ժամային գոտին (Asia/Yerevan) և տեղական ժամանակը (16:36)։
              - generic [ref=f1e266]: Ակտիվ տեսք՝ 🌙 Գիշերային
            - generic [ref=f1e267]:
              - button "☀️ Ցերեկային — Light Mode" [ref=f1e268] [cursor=pointer]
              - button "🌙 Գիշերային — Dark Mode" [active] [ref=f1e270] [cursor=pointer]
              - button "🕒 Ավտոմատ — Auto Mode" [ref=f1e275] [cursor=pointer]
          - generic [ref=f1e277]:
            - generic [ref=f1e278]:
              - heading "Բ. Ժամային գոտի և օրական հաշվարկ" [level=2] [ref=f1e279]
              - paragraph [ref=f1e283]: Օրական շարունակականության (Streak) և ուսումնական րոպեների ճշգրիտ հաշվարկ ըստ Ձեր բնակության վայրի։
            - generic [ref=f1e284]:
              - generic [ref=f1e285]:
                - generic [ref=f1e286]: Ժամային գոտի (Timezone)
                - combobox [ref=f1e287]:
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
              - generic [ref=f1e288]:
                - generic [ref=f1e289]: Օրական ուսումնական նպատակ
                - combobox [ref=f1e290]:
                  - option "10 րոպե / օրական (Թեթև)"
                  - option "15 րոպե / օրական (Խորհուրդ տրվող)" [selected]
                  - option "25 րոպե / օրական (Ինտենսիվ)"
                  - option "45 րոպե / օրական (Խորացված)"
            - generic [ref=f1e291]:
              - generic [ref=f1e292]:
                - text: Ընտրված գոտու տեղական ամսաթիվն ու ժամը․
                - strong [ref=f1e293]: 2026-10-30 16:36
              - button "Ավտոմատ որոշել" [ref=f1e294] [cursor=pointer]
          - generic [ref=f1e295]:
            - generic [ref=f1e296]:
              - heading "Գ. Ձայն և արտասանություն (TTS & STT)" [level=2] [ref=f1e297]
              - paragraph [ref=f1e302]: Անգլերեն խոսքի արագության կարգավորում (0.7x – 1.2x), ձայնի ընտրություն և միկրոֆոնի թեստավորում։
            - generic [ref=f1e303]:
              - generic [ref=f1e304]:
                - generic [ref=f1e305]:
                  - generic [ref=f1e306]: Ձայնի արագություն (1.00x)
                  - button "Լսել օրինակը" [ref=f1e307] [cursor=pointer]
                - slider [ref=f1e312]: "1"
                - generic [ref=f1e313]:
                  - generic [ref=f1e314]: 0.7x (Դանդաղ)
                  - generic [ref=f1e315]: 1.0x (Բնական)
                  - generic [ref=f1e316]: 1.2x (Արագ)
              - generic [ref=f1e317]:
                - generic [ref=f1e318]: Անգլերեն ձայն (Բրաուզերի հասանելի TTS ձայներ)
                - combobox [ref=f1e319]:
                  - option "Ավտոմատ բնական ձայն (Default)" [selected]
                  - option "Microsoft David - English (United States) (en-US)"
                  - option "Microsoft Mark - English (United States) (en-US)"
                  - option "Microsoft Zira - English (United States) (en-US)"
            - generic [ref=f1e320]:
              - paragraph [ref=f1e326]: Միկրոֆոնի և խոսքի ճանաչման թեստավորում
              - button "Ստուգել միկրոֆոնը" [ref=f1e327] [cursor=pointer]
          - generic [ref=f1e328]:
            - generic [ref=f1e329]:
              - generic [ref=f1e335]:
                - heading "Դ. Առավոտյան հիշեցումներ" [level=2] [ref=f1e336]
                - paragraph [ref=f1e337]: Կարգավորիր ամենօրյա հիշեցման ժամը, առաջադրանքների քանակը և թեման։
              - checkbox [ref=f1e339]
            - generic [ref=f1e341]:
              - generic [ref=f1e342]:
                - generic [ref=f1e343]: Հիշեցման ժամը
                - textbox [ref=f1e344]: 08:00
              - generic [ref=f1e345]:
                - generic [ref=f1e346]: Օրական առաջադրանքներ
                - combobox [ref=f1e347]:
                  - option "3 առաջադրանք (արագ)" [selected]
                  - option "5 առաջադրանք (ստանդարտ)"
                  - option "10 առաջադրանք (ինտենսիվ)"
              - generic [ref=f1e348]:
                - generic [ref=f1e349]: Հիշեցման թեման
                - combobox [ref=f1e350]:
                  - option "Օրվա բառերը (3 Words)"
                  - option "Քերականություն (Grammar)"
                  - option "Առօրյա զրույցներ (Conversations)"
                  - option "Բոլոր առաջադրանքները" [selected]
            - generic [ref=f1e351]:
              - generic [ref=f1e352] [cursor=pointer]:
                - checkbox "Հիշեցման ձայնային ազդանշան" [checked] [ref=f1e353]
                - generic [ref=f1e354]: Հիշեցման ձայնային ազդանշան
              - button "Փորձարկել հիշեցումը հիմա" [ref=f1e355] [cursor=pointer]
          - generic [ref=f1e360]:
            - generic [ref=f1e361]:
              - heading "Ե. Ուսումնական մակարդակ և ադապտիվություն" [level=2] [ref=f1e362]
              - paragraph [ref=f1e364]: Փոխեք Ձեր CEFR մակարդակը կամ ադապտիվ դժվարության կանոնները։
            - generic [ref=f1e365]:
              - generic [ref=f1e366]:
                - generic [ref=f1e367]: Ընթացիկ CEFR մակարդակ
                - combobox [ref=f1e368]:
                  - option "A1 · Սկսնակ (Beginner)"
                  - option "A2 · Տարրական (Elementary)" [selected]
                  - option "B1 · Միջին (Intermediate)"
                  - option "B2 · Միջինից բարձր (Upper-Int)"
                  - option "C1 · Առաջադեմ (Advanced)"
                  - option "C2 · Վարպետ (Proficiency)"
              - generic [ref=f1e369]:
                - generic [ref=f1e370]: Վարժությունների բարդություն
                - combobox [ref=f1e371]:
                  - option "Ադապտիվ (ըստ առաջադիմության)" [selected]
                  - option "Հեշտ (A1–A2)"
                  - option "Միջին (B1–B2)"
                  - option "Խորացված (C1–C2)"
            - generic [ref=f1e372]:
              - generic [ref=f1e373] [cursor=pointer]:
                - generic [ref=f1e374]: Հուշումների ցուցադրում (Hints)
                - checkbox "Հուշումների ցուցադրում (Hints)" [checked] [ref=f1e375]
              - generic [ref=f1e376] [cursor=pointer]:
                - generic [ref=f1e377]: Սխալների ավտոմատ կրկնում
                - checkbox "Սխալների ավտոմատ կրկնում" [checked] [ref=f1e378]
              - generic [ref=f1e379] [cursor=pointer]:
                - generic [ref=f1e380]: Ավտոմատ անցում հաջորդին
                - checkbox "Ավտոմատ անցում հաջորդին" [ref=f1e381]
          - generic [ref=f1e382]:
            - generic [ref=f1e383]:
              - heading "Զ. Լոկալ տվյալների բազա (IndexedDB & SQLite .db)" [level=2] [ref=f1e384]
              - paragraph [ref=f1e390]: Ձեր պրոֆիլը, դասերի առաջընթացը, բառապաշարը և պատմությունը պահպանվում են բրաուզերի IndexedDB-ում (24 առանձին աղյուսակներով)։ Կարող եք արտահանել իրական SQLite (.db) կամ JSON ֆայլով։
            - generic [ref=f1e391]:
              - button "Արտահանել SQLite (.db)" [ref=f1e392] [cursor=pointer]
              - button "Վերականգնել SQLite (.db)" [ref=f1e396] [cursor=pointer]
              - button "Արտահանել տվյալները (JSON)" [ref=f1e400] [cursor=pointer]
              - button "Ներմուծել տվյալները (JSON)" [ref=f1e404] [cursor=pointer]
              - button "Պրոֆիլի և տվյալների ամբողջական ջնջում" [ref=f1e408] [cursor=pointer]
            - generic [ref=f1e415]:
              - strong [ref=f1e416]: Գաղտնիության երաշխիք․
              - text: Ձեր անձնական տվյալները պահվում են բացառապես Ձեր սարքի մեջ և չեն փոխանցվում արտաքին ծառայությունների առանց Ձեր տեղեկացված համաձայնության։
          - generic [ref=f1e417]:
            - generic [ref=f1e418]:
              - generic [ref=f1e422]:
                - heading "Է. PWA Հավելված, Offline Քեշ և Ծանուցումներ (v1.2.1)" [level=2] [ref=f1e423]
                - paragraph [ref=f1e424]: Progressive Web App ֆունկցիոնալություն՝ անցանց աշխատանք, ծանուցումներ և արագ կիսվելու հնարավորություն
              - generic [ref=f1e425]: 🌐 Բրաուզերային ռեժիմ (PWA Ready)
            - generic [ref=f1e426]:
              - generic [ref=f1e427]:
                - text: Հավելվածի տարբերակ
                - paragraph [ref=f1e428]: HayLingo v1.2.1
              - generic [ref=f1e429]:
                - text: Offline քեշավորված ռեսուրսներ
                - paragraph [ref=f1e430]: 14 ֆայլ (2 պահոց)
              - generic [ref=f1e431]:
                - text: Ծանուցումների կարգավիճակ
                - paragraph [ref=f1e432]: 🔔 Սպասում է թույլտվության
            - generic [ref=f1e433]:
              - button "Միացնել / Թեստավորել Ծանուցումը" [ref=f1e434] [cursor=pointer]
              - button "Թարմացնել Offline Քեշը" [ref=f1e438] [cursor=pointer]
              - button "Կիսվել Առաջընթացով (Web Share)" [ref=f1e444] [cursor=pointer]
  - alert [ref=f1e451]
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