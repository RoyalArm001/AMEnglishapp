import { PronunciationModule } from '@/lib/types';

export const PRONUNCIATION_MODULES_DATA: PronunciationModule[] = [
  {
    id: 'th-sound',
    order: 1,
    titleEn: 'TH Sound (/θ/ and /ð/)',
    titleAm: 'TH հնչյունը (Խուլ /θ/ և Ձայնեղ /ð/)',
    level: 'A1',
    descriptionAm: 'Անգլերենի «TH» տառակապակցությունն ունի երկու հիմնական արտասանություն՝ խուլ /θ/ (ինչպես «think», «three») և ձայնեղ /ð/ (ինչպես «this», «mother»)։ Լեզվի ծայրը պետք է թեթևակի հպվի վերին ատամներին։',
    usVsGbDiffAm: 'Ամերիկյան և բրիտանական անգլերենում TH-ի հիմնական դիրքը նույնն է, սակայն բրիտանական որոշ առօրյա ակցենտներում (օրինակ՝ Cockney) այն կարող է փոխարինվել /f/ կամ /v/ հնչյուններով։ Ստանդարտ Received Pronunciation (RP) և General American տարբերակներում երկուսն էլ հստակ միջատամնային են։',
    items: [
      {
        id: 'th-1',
        moduleId: 'th-sound',
        kind: 'word',
        targetEn: 'Think',
        pronunciationUS: '/θɪŋk/ (սինք՝ միջատամնային ս)',
        pronunciationGB: '/θɪŋk/ (սինք՝ միջատամնային ս)',
        armenian: 'Մտածել',
        tipAm: 'Խուլ /θ/ հնչյուն։ Ձայնալարերը չեն թրթռում, միայն օդի շիթ է անցնում ատամների արանքով։'
      },
      {
        id: 'th-2',
        moduleId: 'th-sound',
        kind: 'word',
        targetEn: 'This',
        pronunciationUS: '/ðɪs/ (դիս՝ միջատամնային ձայնեղ զ/դ)',
        pronunciationGB: '/ðɪs/ (դիս՝ միջատամնային ձայնեղ զ/դ)',
        armenian: 'Սա / Այս',
        tipAm: 'Ձայնեղ /ð/ հնչյուն։ Զգացեք կոկորդի ձայնալարերի թրթիռը։'
      },
      {
        id: 'th-3',
        moduleId: 'th-sound',
        kind: 'minimal-pair',
        targetEn: 'Breath vs Breathe',
        pronunciationUS: '/breθ/ vs /briːð/',
        pronunciationGB: '/breθ/ vs /briːð/',
        armenian: 'Շունչ (գոյական) vs Շնչել (բայ)',
        tipAm: 'Գոյականում խուլ /θ/ է կարճ e-ով, իսկ բայում՝ երկար /iː/ և ձայնեղ /ð/։'
      },
      {
        id: 'th-4',
        moduleId: 'th-sound',
        kind: 'word',
        targetEn: 'Weather',
        pronunciationUS: '/ˈweð.ɚ/ (ուե՛դըր)',
        pronunciationGB: '/ˈweð.ə/ (ուե՛դը)',
        armenian: 'Եղանակ',
        tipAm: 'Մեջտեղի ձայնեղ /ð/ հնչյուն։ ԱՄՆ-ում r-ը լսվում է, Բրիտանիայում՝ ավարտվում է շվա /ə/ հնչյունով։'
      },
      {
        id: 'th-5',
        moduleId: 'th-sound',
        kind: 'sentence',
        targetEn: 'I think that this weather is healthy.',
        pronunciationUS: '/aɪ θɪŋk ðæt ðɪs ˈweð.ɚ ɪz ˈhel.θi/',
        pronunciationGB: '/aɪ θɪŋk ðæt ðɪs ˈweð.ə ɪz ˈhel.θi/',
        armenian: 'Կարծում եմ, որ այս եղանակը առողջարար է։',
        tipAm: 'Հերթափոխեք խուլ /θ/ (think, healthy) և ձայնեղ /ð/ (that, this, weather) հնչյունները։'
      },
      {
        id: 'th-6',
        moduleId: 'th-sound',
        kind: 'sentence',
        targetEn: 'Three brothers thought through their plans.',
        pronunciationUS: '/θriː ˈbrʌð.ɚz θɑːt θruː ðer plænz/',
        pronunciationGB: '/θriː ˈbrʌð.əz θɔːt θruː ðeə plænz/',
        armenian: 'Երեք եղբայրները մտածեցին իրենց ծրագրերի մասին։',
        tipAm: 'Կատարյալ վարժություն TH-ի վարժ արտասանության համար։'
      }
    ]
  },
  {
    id: 'r-sound',
    order: 2,
    titleEn: 'The R Sound (Rhotic vs Non-rhotic)',
    titleAm: 'R հնչյունը (Ռոտիկ ԱՄՆ vs Ոչ ռոտիկ Բրիտանիա)',
    level: 'A2',
    descriptionAm: 'Անգլերենի «R»-ը հայերենի կոշտ «Ռ» կամ փափուկ «Ր» չէ։ Լեզվի ծայրը ետ է ծալվում կամ ետ է քաշվում դեպի քիմքը՝ առանց քիմքին հպվելու։',
    usVsGbDiffAm: 'Գլխավոր տարբերությունը. Ամերիկյան անգլերենը ռոտիկ է (Rhotic), այսինքն «r»-ը միշտ արտասանվում է (car, bird, water): Բրիտանական RP-ն ոչ ռոտիկ է (Non-rhotic), «r»-ը հնչում է ՄԻԱՅՆ այն դեպքում, երբ նրանից հետո անմիջապես ձայնավոր է գալիս (red, right, far away), իսկ բառավերջում կամ բաղաձայնից առաջ վերածվում է երկար ձայնավորի կամ շվայի։',
    items: [
      {
        id: 'r-1',
        moduleId: 'r-sound',
        kind: 'word',
        targetEn: 'Car',
        pronunciationUS: '/kɑːr/ (քաար - լսելի r)',
        pronunciationGB: '/kɑː/ (քաա - առանց r)',
        armenian: 'Մեքենա',
        tipAm: 'ԱՄՆ տարբերակում լեզուն ետ քաշեք r-ի համար, բրիտանականում՝ պարզապես երկարացրեք ձայնավորը։'
      },
      {
        id: 'r-2',
        moduleId: 'r-sound',
        kind: 'word',
        targetEn: 'Water',
        pronunciationUS: '/ˈwɑː.t̬ɚ/ (ուա՛դըր)',
        pronunciationGB: '/ˈwɔː.tə/ (ուո՛ոթը)',
        armenian: 'Ջուր',
        tipAm: 'ԱՄՆ տարբերակում r-colored vowel է վերջում, բրիտանականում՝ մաքուր /ə/ առանց r-ի։'
      },
      {
        id: 'r-3',
        moduleId: 'r-sound',
        kind: 'word',
        targetEn: 'Bird',
        pronunciationUS: '/bɝːd/ (բըըրդ)',
        pronunciationGB: '/bɜːd/ (բըըդ)',
        armenian: 'Թռչուն',
        tipAm: 'Մի՛ հպեք լեզվով ատամներին կամ քիմքին, մի՛ դարձրեք հայերեն ռ/ր։'
      },
      {
        id: 'r-4',
        moduleId: 'r-sound',
        kind: 'minimal-pair',
        targetEn: 'Hard vs Heart',
        pronunciationUS: '/hɑːrd/ vs /hɑːrt/',
        pronunciationGB: '/hɑːd/ vs /hɑːt/',
        armenian: 'Դժվար/կոշտ vs Սիրտ',
        tipAm: 'Վերջավորության /d/ և /t/ հնչյունների մաքրությունը շատ կարևոր է։'
      },
      {
        id: 'r-5',
        moduleId: 'r-sound',
        kind: 'sentence',
        targetEn: 'Her car was parked near the river.',
        pronunciationUS: '/hɚ kɑːr wʌz pɑːrkt nɪr ðə ˈrɪv.ɚ/',
        pronunciationGB: '/hɜː kɑː wɒz pɑːkt nɪə ðə ˈrɪv.ə/',
        armenian: 'Նրա մեքենան կայանված էր գետի մոտ։',
        tipAm: 'Ուշադրություն դարձրեք, թե ինչպես բոլոր r-երը հնչում են ԱՄՆ-ում և բաց թողնվում Բրիտանիայում։'
      },
      {
        id: 'r-6',
        moduleId: 'r-sound',
        kind: 'sentence',
        targetEn: 'Are you sure our teacher is right?',
        pronunciationUS: '/ɑːr juː ʃʊr ˈaʊ.ɚ ˈtiː.tʃɚ ɪz raɪt/',
        pronunciationGB: '/ɑː juː ʃɔː ˈaʊ.ə ˈtiː.tʃə z raɪt/',
        armenian: 'Վստա՞հ ես, որ մեր ուսուցիչը ճիշտ է։',
        tipAm: '«Right» բառի սկզբի R-ը հնչում է երկու ակցենտներում էլ, քանի որ այն բառասկզբում է։'
      }
    ]
  },
  {
    id: 'w-vs-v',
    order: 3,
    titleEn: 'W vs V (/w/ and /v/)',
    titleAm: 'W ընդդեմ V (/w/ և /v/)',
    level: 'A2',
    descriptionAm: 'Շատ սովորողներ շփոթում են /w/ և /v/ հնչյունները։ /w/-ի դեպքում շուրթերը կլորանում են առաջ (ինչպես սուլելիս կամ «ու» ասելիս), իսկ /v/-ի դեպքում վերին ատամները թեթև հպվում են ստորին շրթունքին։',
    usVsGbDiffAm: 'Երկու տարբերակներում էլ հնչյունաբանական կանոնը նույնն է։ Ամերիկյան անգլերենում wh- բառերը (when, where) մեծ մասամբ հնչում են պարզ /w/, իսկ որոշ շոտլանդական և ավանդական բրիտանական խոսվածքներում կարող է լինել շնչեղ /hw/։',
    items: [
      {
        id: 'wv-1',
        moduleId: 'w-vs-v',
        kind: 'minimal-pair',
        targetEn: 'Wine vs Vine',
        pronunciationUS: '/waɪn/ vs /vaɪn/',
        pronunciationGB: '/waɪn/ vs /vaɪn/',
        armenian: 'Գինի vs Խաղողի վազ',
        tipAm: 'Wine -> շուրթերը կլորացրեք առաջ։ Vine -> վերին ատամները ստորին շրթունքին։'
      },
      {
        id: 'wv-2',
        moduleId: 'w-vs-v',
        kind: 'minimal-pair',
        targetEn: 'West vs Vest',
        pronunciationUS: '/west/ vs /vest/',
        pronunciationGB: '/west/ vs /vest/',
        armenian: 'Արևմուտք vs Ժիլետ',
        tipAm: 'Մի՛ փոխարինեք /w/-ն /v/-ով. vest նշանակում է ժիլետ, իսկ west՝ արևմուտք։'
      },
      {
        id: 'wv-3',
        moduleId: 'w-vs-v',
        kind: 'word',
        targetEn: 'Very',
        pronunciationUS: '/ˈver.i/ (վե՛րի)',
        pronunciationGB: '/ˈver.i/ (վե՛րի)',
        armenian: 'Շատ',
        tipAm: 'Մաքուր /v/ հնչյուն, ատամները ստորին շրթունքին։ Մի՛ ասեք "ուերի"։'
      },
      {
        id: 'wv-4',
        moduleId: 'w-vs-v',
        kind: 'word',
        targetEn: 'Wonderful',
        pronunciationUS: '/ˈwʌn.dɚ.fəl/ (ուա՛նդըրֆուլ)',
        pronunciationGB: '/ˈwʌn.də.fəl/ (ուա՛նդըֆուլ)',
        armenian: 'Հրաշալի',
        tipAm: 'Սկսեք կլորացված շուրթերով /w/։'
      },
      {
        id: 'wv-5',
        moduleId: 'w-vs-v',
        kind: 'sentence',
        targetEn: 'We visited a very lovely village in the west.',
        pronunciationUS: '/wiː ˈvɪz.ɪ.t̬ɪd ə ˈver.i ˈlʌv.li ˈvɪl.ɪdʒ ɪn ðə west/',
        pronunciationGB: '/wiː ˈvɪz.ɪ.tɪd ə ˈver.i ˈlʌv.li ˈvɪl.ɪdʒ ɪn ðə west/',
        armenian: 'Մենք այցելեցինք արևմուտքում գտնվող շատ գեղեցիկ մի գյուղ։',
        tipAm: 'Ուշադրություն. We (W), visited (V), very (V), lovely (V), village (V), west (W)։'
      },
      {
        id: 'wv-6',
        moduleId: 'w-vs-v',
        kind: 'sentence',
        targetEn: 'Why was Victor waiting for wet weather?',
        pronunciationUS: '/waɪ wʌz ˈvɪk.tɚ ˈweɪ.t̬ɪŋ fɔːr wet ˈweð.ɚ/',
        pronunciationGB: '/waɪ wɒz ˈvɪk.tə ˈweɪ.tɪŋ fɔː wet ˈweð.ə/',
        armenian: 'Ինչո՞ւ էր Վիկտորը սպասում խոնավ եղանակի։',
        tipAm: 'Անցումներ W -> V -> W -> W -> W։'
      }
    ]
  },
  {
    id: 'vowel-lengths',
    order: 4,
    titleEn: 'Short & Long Vowels',
    titleAm: 'Կարճ և երկար ձայնավորներ',
    level: 'B1',
    descriptionAm: 'Անգլերենում ձայնավորի տևողությունն ու բերանի բացվածքը փոխում են բառի իմաստը։ Օրինակ՝ կարճ /ɪ/ (ship) ընդդեմ երկար /iː/ (sheep)։',
    usVsGbDiffAm: 'Ամերիկյան անգլերենում շատ ձայնավորներ մի փոքր ավելի բաց են (օրինակ՝ hot բառում ԱՄՆ-ում հնչում է /hɑːt/, իսկ Բրիտանիայում՝ կլորացված կարճ /hɒt/)։',
    items: [
      {
        id: 'vl-1',
        moduleId: 'vowel-lengths',
        kind: 'minimal-pair',
        targetEn: 'Ship vs Sheep',
        pronunciationUS: '/ʃɪp/ vs /ʃiːp/',
        pronunciationGB: '/ʃɪp/ vs /ʃiːp/',
        armenian: 'Նավ vs Ոչխար',
        tipAm: 'Ship -> հանգիստ, կարճ /ɪ/։ Sheep -> լարված ժպտացող երկար /iː/։'
      },
      {
        id: 'vl-2',
        moduleId: 'vowel-lengths',
        kind: 'minimal-pair',
        targetEn: 'Fit vs Feet',
        pronunciationUS: '/fɪt/ vs /fiːt/',
        pronunciationGB: '/fɪt/ vs /fiːt/',
        armenian: 'Համապատասխան/մարզված vs Ոտքեր',
        tipAm: 'Կարճ /ɪ/ vs երկար /iː/ տարբերակումը կանխում է կոպիտ իմաստային շփոթությունները։'
      },
      {
        id: 'vl-3',
        moduleId: 'vowel-lengths',
        kind: 'minimal-pair',
        targetEn: 'Pull vs Pool',
        pronunciationUS: '/pʊl/ vs /puːl/',
        pronunciationGB: '/pʊl/ vs /puːl/',
        armenian: 'Քաշել vs Լողավազան',
        tipAm: 'Pull -> կարճ, թուլացած /ʊ/։ Pool -> երկար, շուրթերը սեղմված /uː/։'
      },
      {
        id: 'vl-4',
        moduleId: 'vowel-lengths',
        kind: 'word',
        targetEn: 'Coffee',
        pronunciationUS: '/ˈkɑː.fi/ (քա՛աֆի)',
        pronunciationGB: '/ˈkɒf.i/ (քո՛ֆի)',
        armenian: 'Սուրճ',
        tipAm: 'ԱՄՆ-ում բաց /ɑː/, Բրիտանիայում կարճ կլորացված /ɒ/։'
      },
      {
        id: 'vl-5',
        moduleId: 'vowel-lengths',
        kind: 'sentence',
        targetEn: 'Please sit in this seat until you leave.',
        pronunciationUS: '/pliːz sɪt ɪn ðɪs siːt ənˈtɪl juː liːv/',
        pronunciationGB: '/pliːz sɪt ɪn ðɪs siːt ənˈtɪl juː liːv/',
        armenian: 'Խնդրում եմ նստեք այս տեղում, մինչև մեկնեք։',
        tipAm: 'Հերթափոխեք՝ sit (/ɪ/) և seat (/iː/)։'
      },
      {
        id: 'vl-6',
        moduleId: 'vowel-lengths',
        kind: 'sentence',
        targetEn: 'He slipped on the ship and injured his feet.',
        pronunciationUS: '/hiː slɪpt ɑːn ðə ʃɪp ænd ˈɪn.dʒɚd hɪz fiːt/',
        pronunciationGB: '/hiː slɪpt ɒn ðə ʃɪp ənd ˈɪn.dʒəd hɪz fiːt/',
        armenian: 'Նա սայթաքեց նավի վրա և վնասեց ոտքերը։',
        tipAm: 'Slipped /ɪ/, ship /ɪ/, feet /iː/։'
      }
    ]
  },
  {
    id: 'word-stress',
    order: 5,
    titleEn: 'Word Stress & Syllables',
    titleAm: 'Բառային շեշտադրություն',
    level: 'B1',
    descriptionAm: 'Անգլերենում շեշտված վանկն արտասանվում է ավելի բարձր, երկար և հստակ, իսկ չշեշտված վանկերը կրճատվում են (հաճախ դառնալով /ə/ schwa)։ Շատ բառերում շեշտի տեղը փոխում է խոսքի մասը (գոյական vs բայ)։',
    usVsGbDiffAm: 'Որոշ բառերում շեշտադրությունը տարբերվում է. օրինակ՝ «garage» ԱՄՆ-ում շեշտվում է 2-րդ վանկի վրա (/ɡəˈrɑːʒ/), իսկ Բրիտանիայում՝ 1-ին (/ˈɡær.ɑːʒ/)։',
    items: [
      {
        id: 'ws-1',
        moduleId: 'word-stress',
        kind: 'stress',
        targetEn: 'REcord vs reCORD',
        stressPattern: 'RE-cord (noun) vs re-CORD (verb)',
        pronunciationUS: '/ˈrek.ɚd/ vs /rɪˈkɔːrd/',
        pronunciationGB: '/ˈrek.ɔːd/ vs /rɪˈkɔːd/',
        armenian: 'Ձայնագրություն/ռեկորդ vs Ձայնագրել/գրանցել',
        tipAm: 'Գոյականի դեպքում շեշտը 1-ին վանկի վրա է, բայի դեպքում՝ 2-րդ վանկի։'
      },
      {
        id: 'ws-2',
        moduleId: 'word-stress',
        kind: 'stress',
        targetEn: 'PREsent vs preSENT',
        stressPattern: 'PRE-sent (noun/adj) vs pre-SENT (verb)',
        pronunciationUS: '/ˈprez.ənt/ vs /prɪˈzent/',
        pronunciationGB: '/ˈprez.ənt/ vs /prɪˈzent/',
        armenian: 'Նվեր/ներկա vs Ներկայացնել',
        tipAm: 'Նվեր՝ PREsent, Ներկայացնել՝ preSENT։'
      },
      {
        id: 'ws-3',
        moduleId: 'word-stress',
        kind: 'stress',
        targetEn: 'PHOtograph vs phoTOgraphy',
        stressPattern: 'PHO-to-graph vs pho-TO-gra-phy',
        pronunciationUS: '/ˈfoʊ.t̬oʊ.ɡræf/ vs /fəˈtɑː.ɡrə.fi/',
        pronunciationGB: '/ˈfəʊ.tə.ɡrɑːf/ vs /fəˈtɒɡ.rə.fi/',
        armenian: 'Լուսանկար vs Լուսանկարչություն',
        tipAm: 'Ուշադրություն դարձրեք շեշտի տեղաշարժին և ձայնավորների փոփոխությանը։'
      },
      {
        id: 'ws-4',
        moduleId: 'word-stress',
        kind: 'word',
        targetEn: 'Important',
        stressPattern: 'im-POR-tant',
        pronunciationUS: '/ɪmˈpɔːr.tənt/',
        pronunciationGB: '/ɪmˈpɔː.tənt/',
        armenian: 'Կարևոր',
        tipAm: 'Շեշտը 2-րդ վանկի վրա է (POR)։ Առաջին և երրորդ վանկերը չեզոք են։'
      },
      {
        id: 'ws-5',
        moduleId: 'word-stress',
        kind: 'sentence',
        targetEn: 'I want to present this present to my manager.',
        pronunciationUS: '/aɪ wɑːnt tə prɪˈzent ðɪs ˈprez.ənt tə maɪ ˈmæn.ə.dʒɚ/',
        pronunciationGB: '/aɪ wɒnt tə prɪˈzent ðɪs ˈprez.ənt tə maɪ ˈmæn.ɪ.dʒə/',
        armenian: 'Ես ուզում եմ ներկայացնել այս նվերը իմ ղեկավարին։',
        tipAm: 'Առաջինը բայն է (prɪˈzent), երկրորդը՝ գոյականը (ˈprez.ənt)։'
      },
      {
        id: 'ws-6',
        moduleId: 'word-stress',
        kind: 'sentence',
        targetEn: 'They will record a new record in the studio.',
        pronunciationUS: '/ðeɪ wɪl rɪˈkɔːrd ə nuː ˈrek.ɚd ɪn ðə ˈstuː.di.oʊ/',
        pronunciationGB: '/ðeɪ wɪl rɪˈkɔːd ə njuː ˈrek.ɔːd ɪn ðə ˈstjuː.di.əʊ/',
        armenian: 'Նրանք ստուդիայում նոր ձայնագրություն/ռեկորդ կգրանցեն։',
        tipAm: 'Բայ՝ rɪˈkɔːrd, Գոյական՝ ˈrek.ɚd։'
      }
    ]
  },
  {
    id: 'sentence-stress',
    order: 6,
    titleEn: 'Sentence Stress & Rhythm',
    titleAm: 'Նախադասության շեշտ և ռիթմ',
    level: 'B2',
    descriptionAm: 'Անգլերենը stress-timed լեզու է։ Կարևոր իմաստակիր բառերը (գոյականներ, հիմնական բայեր, ածականներ) շեշտվում են, իսկ քերականական օժանդակ բառերը (դերանուններ, նախդիրներ, հոդեր) արտասանվում են թույլ և արագ։',
    usVsGbDiffAm: 'Երկու ակցենտներում էլ ռիթմիկ կառուցվածքը նույնն է, սակայն ամերիկյան խոսքում շեշտված ձայնավորները մի փոքր ավելի ձգված են։',
    items: [
      {
        id: 'ss-1',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'I BOUGHT a CAR for my SISTER.',
        stressPattern: '•   *   •   *   •  •   *  •',
        pronunciationUS: '/aɪ ˈbɑːt ə ˈkɑːr fɚ maɪ ˈsɪs.tɚ/',
        pronunciationGB: '/aɪ ˈbɔːt ə ˈkɑː fə maɪ ˈsɪs.tə/',
        armenian: 'Ես մեքենա գնեցի իմ քրոջ համար։',
        tipAm: 'Շեշտեք bought, car, sister բառերը։ I, a, for, my բառերն անցնում են արագ ու թույլ։'
      },
      {
        id: 'ss-2',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'CAN you SEND me the REPORT toDAY?',
        stressPattern: '•   •    *   •  •   •   *    •  *',
        pronunciationUS: '/kæn juː ˈsend mi ðə rɪˈpɔːrt təˈdeɪ/',
        pronunciationGB: '/kən juː ˈsend mi ðə rɪˈpɔːt təˈdeɪ/',
        armenian: 'Կարո՞ղ ես ինձ այսօր ուղարկել հաշվետվությունը։',
        tipAm: 'Շեշտը ընկնում է SEND, REPORT (երկրորդ վանկ) և DAY վրա։'
      },
      {
        id: 'ss-3',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'SHE did not SAY that.',
        stressPattern: 'Շեշտը փոխում է ենթատեքստը',
        pronunciationUS: '/ʃiː dɪd nɑːt ˈseɪ ðæt/',
        pronunciationGB: '/ʃiː dɪd nɒt ˈseɪ ðæt/',
        armenian: 'Նա այդ բանը չի ասել (այլ ուրիշ մեկն է ասել)։',
        tipAm: 'Երբ շեշտում եք «SHE»-ն, նշանակում է՝ «նա՛ չի ասել, այլ ուրիշը»։'
      },
      {
        id: 'ss-4',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'She did NOT say that.',
        stressPattern: 'Հերքումը շեշտադրված',
        pronunciationUS: '/ʃiː dɪd ˈnɑːt seɪ ðæt/',
        pronunciationGB: '/ʃiː dɪd ˈnɒt seɪ ðæt/',
        armenian: 'Նա ընդհանրապես չի՛ ասել նման բան։',
        tipAm: '«NOT»-ը շեշտելիս ընդգծում եք կատեգորիկ ժխտումը։'
      },
      {
        id: 'ss-5',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'We NEED to FINISH the PROJECT before FRIDAY.',
        stressPattern: '•   *   •    *   •   •    *   •  •    *  •',
        pronunciationUS: '/wiː ˈniːd tə ˈfɪn.ɪʃ ðə ˈprɑː.dʒekt bɪˈfɔːr ˈfraɪ.deɪ/',
        pronunciationGB: '/wiː ˈniːd tə ˈfɪn.ɪʃ ðə ˈprɒdʒ.ekt bɪˈfɔː ˈfraɪ.deɪ/',
        armenian: 'Մենք պետք է ավարտենք նախագիծը մինչև ուրբաթ։',
        tipAm: 'Պահպանեք բնական ռիթմը՝ չընդհատելով խոսքի հոսքը։'
      },
      {
        id: 'ss-6',
        moduleId: 'sentence-stress',
        kind: 'sentence',
        targetEn: 'Dogs eat bones.',
        stressPattern: '*   *   *',
        pronunciationUS: '/dɔːɡz iːt boʊnz/',
        pronunciationGB: '/dɒɡz iːt bəʊnz/',
        armenian: 'Շները ոսկորներ են ուտում։',
        tipAm: 'Բոլոր երեք բառերն էլ իմաստակիր են, ուստի երեքն էլ հավասարապես շեշտվում են։'
      }
    ]
  },
  {
    id: 'intonation',
    order: 7,
    titleEn: 'Intonation (Rising ↗ vs Falling ↘)',
    titleAm: 'Ինտոնացիա (Բարձրացող ↗ և Իջնող ↘)',
    level: 'B2',
    descriptionAm: 'Ինտոնացիան խոսքի մեղեդայնությունն է։ Հարցերն ու հաստատական նախադասություններն ունեն հստակ ելևէջներ. Yes/No հարցերում ձայնը բարձրանում է վերջում (Rising ↗), իսկ Wh- հարցերում և հաստատական նախադասություններում՝ իջնում (Falling ↘)։',
    usVsGbDiffAm: 'Ամերիկյան անգլերենում հաճախ հանդիպում է «High Rising Terminal» (Upbeat), երբ նույնիսկ հաստատական նախադասությունների վերջում ձայնը մի փոքր բարձրանում է։ Բրիտանական RP-ում իջնող ինտոնացիան ավելի կտրուկ ու ցայտուն է։',
    items: [
      {
        id: 'in-1',
        moduleId: 'intonation',
        kind: 'intonation',
        targetEn: 'Are you ready to start? ↗',
        intonationArrow: 'rising',
        pronunciationUS: '/ɑːr juː ˈred.i tə stɑːrt/ ↗',
        pronunciationGB: '/ɑː juː ˈred.i tə stɑːt/ ↗',
        armenian: 'Պատրա՞ստ ես սկսելու։ (Yes/No հարց)',
        tipAm: 'Ձայնի տոնը բարձրանում է «start» բառի վրա ↗։'
      },
      {
        id: 'in-2',
        moduleId: 'intonation',
        kind: 'intonation',
        targetEn: 'Where do you live? ↘',
        intonationArrow: 'falling',
        pronunciationUS: '/wer duː juː lɪv/ ↘',
        pronunciationGB: '/weə duː juː lɪv/ ↘',
        armenian: 'Որտե՞ղ ես ապրում։ (Wh- հարց)',
        tipAm: 'Հատուկ հարցերում ձայնի տոնը նախադասության վերջում իջնում է ↘։'
      },
      {
        id: 'in-3',
        moduleId: 'intonation',
        kind: 'intonation',
        targetEn: 'I like coffee, tea, and juice.',
        intonationArrow: 'fall-rise',
        pronunciationUS: '/aɪ laɪk ˈkɑː.fi ↗ tiː ↗ ænd dʒuːs ↘/',
        pronunciationGB: '/aɪ laɪk ˈkɒf.i ↗ tiː ↗ ənd dʒuːs ↘/',
        armenian: 'Ես սիրում եմ սուրճ, թեյ և հյութ։ (Թվարկում)',
        tipAm: 'Թվարկելիս առաջին անդամները բարձրանում են ↗, իսկ վերջինը՝ իջնում ↘։'
      },
      {
        id: 'in-4',
        moduleId: 'intonation',
        kind: 'intonation',
        targetEn: 'You are coming tomorrow, aren\'t you? ↘',
        intonationArrow: 'falling',
        pronunciationUS: '/jʊr ˈkʌm.ɪŋ təˈmɑːr.oʊ ˈɑːrnt juː/ ↘',
        pronunciationGB: '/jʊə ˈkʌm.ɪŋ təˈmɒr.əʊ ˈɑːnt juː/ ↘',
        armenian: 'Վաղը գալու ես, չէ՞։ (Հաստատման ակնկալիքով)',
        tipAm: 'Երբ վստահ ես պատասխանի մեջ, պոչիկային հարցի տոնն իջնում է ↘։'
      },
      {
        id: 'in-5',
        moduleId: 'intonation',
        kind: 'intonation',
        targetEn: 'Really? ↗',
        intonationArrow: 'rising',
        pronunciationUS: '/ˈriː.ə.li/ ↗',
        pronunciationGB: '/ˈrɪə.li/ ↗',
        armenian: 'Իրա՞վ։ (Զարմանք)',
        tipAm: 'Կարճ զարմանքի կամ կասկածի արտահայտման ժամանակ տոնը կտրուկ բարձրանում է ↗։'
      },
      {
        id: 'in-6',
        moduleId: 'intonation',
        kind: 'sentence',
        targetEn: 'Can I help you, or do you know the way?',
        intonationArrow: 'fall-rise',
        pronunciationUS: '/kæn aɪ help juː ↗ ɔːr duː juː noʊ ðə weɪ ↘/',
        pronunciationGB: '/kən aɪ help juː ↗ ɔː duː juː nəʊ ðə weɪ ↘/',
        armenian: 'Կարո՞ղ եմ օգնել, թե՞ գիտեք ճանապարհը։',
        tipAm: 'Առաջին ընտրությունը բարձրանում է ↗, երկրորդը՝ իջնում ↘։'
      }
    ]
  },
  {
    id: 'connected-speech',
    order: 8,
    titleEn: 'Connected Speech & Linking',
    titleAm: 'Կապակցված խոսք և հնչյունների միացում',
    level: 'C1',
    descriptionAm: 'Բնիկ խոսողները բառերն առանձին-առանձին չեն ասում. բառերի վերջին և հաջորդ բառի սկզբի հնչյունները միաձուլվում են (linking, assimilation, elision)։ Օրինակ՝ «want to» դառնում է «wanna», իսկ ձայնավորների միջև ամերիկյան /t/-ն դառնում է flap /ɾ/։',
    usVsGbDiffAm: 'ԱՄՆ-ում «water», «better», «city» բառերում /t/-ն արտասանվում է որպես արագ Flap T [ɾ] (հնչում է ինչպես թեթև Ր)։ Բրիտանիայում շատերը կամ մաքուր /t/ են ասում, կամ օգտագործում են Glottal Stop [ʔ] (կոկորդային դադար)։',
    items: [
      {
        id: 'cs-1',
        moduleId: 'connected-speech',
        kind: 'word',
        targetEn: 'Better',
        pronunciationUS: '/ˈbet̬.ɚ/ (բե՛դըր / բե՛րըր - flap T)',
        pronunciationGB: '/ˈbet.ə/ (բե՛թը կամ բե՛ʔը - glottal)',
        armenian: 'Ավելի լավ',
        tipAm: 'ԱՄՆ-ում T-ն դառնում է թեթև /ɾ/, Բրիտանիայում՝ հստակ T կամ կոկորդային կանգ։'
      },
      {
        id: 'cs-2',
        moduleId: 'connected-speech',
        kind: 'sentence',
        targetEn: 'Turn it off.',
        pronunciationUS: '/tɝːn ɪt ɑːf/ -> [tɜː-nɪ-tɑːf]',
        pronunciationGB: '/tɜːn ɪt ɒf/ -> [tɜː-nɪ-tɒf]',
        armenian: 'Անջատի՛ր այն։ (Consonant to Vowel Linking)',
        tipAm: 'Բաղաձայնը միանում է հաջորդ ձայնավորին՝ «տըռ-նի-տաֆ»։'
      },
      {
        id: 'cs-3',
        moduleId: 'connected-speech',
        kind: 'sentence',
        targetEn: 'I want to go to the party.',
        pronunciationUS: '/aɪ ˈwɑː.nə ɡoʊ tə ðə ˈpɑːr.t̬i/',
        pronunciationGB: '/aɪ wɒnt tə ɡəʊ tə ðə ˈpɑː.ti/',
        armenian: 'Ես ուզում եմ գնալ խնջույքին։',
        tipAm: 'Խոսակցականում «want to» -> «wanna», «party» -> «par-ti» (ԱՄՆ-ում flap t)։'
      },
      {
        id: 'cs-4',
        moduleId: 'connected-speech',
        kind: 'sentence',
        targetEn: 'What do you think?',
        pronunciationUS: '/wʌt də jə θɪŋk/ -> [wha-də-yə θɪŋk]',
        pronunciationGB: '/wɒt djuː θɪŋk/',
        armenian: 'Ի՞նչ ես կարծում։',
        tipAm: 'ԱՄՆ-ում հաճախ հնչում է «Whaddya think»։'
      },
      {
        id: 'cs-5',
        moduleId: 'connected-speech',
        kind: 'sentence',
        targetEn: 'Put it in the box.',
        pronunciationUS: '/pʊt̬ ɪt̬ ɪn ðə bɑːks/ -> [pʊ-dɪ-dɪn]',
        pronunciationGB: '/pʊt ɪt ɪn ðə bɒks/',
        armenian: 'Դի՛ր այն տուփի մեջ։',
        tipAm: 'Երկու Flap T անընդմեջ՝ «պու-դի-դին»։'
      },
      {
        id: 'cs-6',
        moduleId: 'connected-speech',
        kind: 'sentence',
        targetEn: 'See you later alligator!',
        pronunciationUS: '/siː jə ˈleɪ.t̬ɚ ˈæl.ə.ɡeɪ.t̬ɚ/',
        pronunciationGB: '/siː jə ˈleɪ.tə ˈæl.ɪ.ɡeɪ.tə/',
        armenian: 'Առայժմ, կտեսնվենք։',
        tipAm: 'Հիանալի օրինակ՝ ամերիկյան կրկնակի Flap T-ի համար։'
      }
    ]
  },
  {
    id: 'minimal-pairs',
    order: 9,
    titleEn: 'Minimal Pairs Practice',
    titleAm: 'Մինիմալ զույգերի մարզում',
    level: 'C1',
    descriptionAm: 'Մինիմալ զույգերը բառեր են, որոնք տարբերվում են ընդամենը մեկ հնչյունով։ Դրանց ճշգրիտ զանազանումը զարգացնում է լսողական և խոսքային ճշգրտությունը։',
    usVsGbDiffAm: 'Որոշ զույգեր ԱՄՆ-ում և Բրիտանիայում տարբեր կերպ են հնչում (օրինակ՝ can vs can\'t տարբերությունը բրիտանականում շատ ավելի մեծ է. /kæn/ vs /kɑːnt/)։',
    items: [
      {
        id: 'mp-1',
        moduleId: 'minimal-pairs',
        kind: 'minimal-pair',
        targetEn: 'Bat vs Bet',
        pronunciationUS: '/bæt/ vs /bet/',
        pronunciationGB: '/bæt/ vs /bet/',
        armenian: 'Չղջիկ/բիթա vs Գրազ գալ',
        tipAm: '/æ/ հնչյունի դեպքում բերանը բացվում է լայն վար, /e/-ի դեպքում՝ միջին։'
      },
      {
        id: 'mp-2',
        moduleId: 'minimal-pairs',
        kind: 'minimal-pair',
        targetEn: 'Bad vs Bed',
        pronunciationUS: '/bæd/ vs /bed/',
        pronunciationGB: '/bæd/ vs /bed/',
        armenian: 'Վատ vs Մահճակալ',
        tipAm: 'Bad -> լայն /æ/ + երկարացված ձայնեղ /d/, Bed -> կարճ /e/։'
      },
      {
        id: 'mp-3',
        moduleId: 'minimal-pairs',
        kind: 'minimal-pair',
        targetEn: 'Bit vs Beat',
        pronunciationUS: '/bɪt/ vs /biːt/',
        pronunciationGB: '/bɪt/ vs /biːt/',
        armenian: 'Կտոր/թեթև vs Հաղթել/հարվածել',
        tipAm: 'Կարճ /ɪ/ ընդդեմ երկար /iː/։'
      },
      {
        id: 'mp-4',
        moduleId: 'minimal-pairs',
        kind: 'minimal-pair',
        targetEn: 'Can vs Can\'t',
        pronunciationUS: '/kæn/ vs /kænt/',
        pronunciationGB: '/kən/ կամ /kæn/ vs /kɑːnt/',
        armenian: 'Կարողանալ vs Չկարողանալ',
        tipAm: 'Բրիտանականում can\'t-ն ունի խորը երկար /ɑː/, իսկ ԱՄՆ-ում՝ /æ/ + T-ի կանգ։'
      },
      {
        id: 'mp-5',
        moduleId: 'minimal-pairs',
        kind: 'minimal-pair',
        targetEn: 'Live (verb) vs Leave',
        pronunciationUS: '/lɪv/ vs /liːv/',
        pronunciationGB: '/lɪv/ vs /liːv/',
        armenian: 'Ապրել vs Լքել/հեռանալ',
        tipAm: 'Մի՛ շփոթեք. «I live here» (/lɪv/) և «I leave at 5» (/liːv/)։'
      },
      {
        id: 'mp-6',
        moduleId: 'minimal-pairs',
        kind: 'sentence',
        targetEn: 'The bad man had a red pen in bed.',
        pronunciationUS: '/ðə bæd mæn hæd ə red pen ɪn bed/',
        pronunciationGB: '/ðə bæd mæn hæd ə red pen ɪn bed/',
        armenian: 'Վատ մարդը մահճակալում կարմիր գրիչ ուներ։',
        tipAm: 'Հերթագայեք /æ/ (bad, man, had) և /e/ (red, pen, bed)։'
      }
    ]
  },
  {
    id: 'common-mistakes',
    order: 10,
    titleEn: 'Common Pronunciation Mistakes & Silent Letters',
    titleAm: 'Տարածված սխալներ և համր տառեր',
    level: 'C2',
    descriptionAm: 'Անգլերենում բազմաթիվ բառեր գրվում են տառերով, որոնք ընդհանրապես չեն արտասանվում (Silent Letters), ինչպես նաև կանոնավոր բայերի -ed վերջավորության 3 տարբեր հնչյուններ՝ /t/, /d/ և /ɪd/։',
    usVsGbDiffAm: 'Օրինակ՝ «herb» (խոտաբույս) բառում ամերիկացիները H-ը չեն արտասանում (/ɝːb/), իսկ բրիտանացիները արտասանում են (/hɜːb/)։ «Schedule» ԱՄՆ-ում սկսվում է /sk/ հնչյունով, Բրիտանիայում՝ /ʃ/ (շեդյուլ)։',
    items: [
      {
        id: 'cm-1',
        moduleId: 'common-mistakes',
        kind: 'word',
        targetEn: 'Receipt',
        pronunciationUS: '/rɪˈsiːt/ (ռիսի՛թ - P-ն համր է)',
        pronunciationGB: '/rɪˈsiːt/ (ռիսի՛թ - P-ն համր է)',
        armenian: 'Անդորրագիր / Կտրոն',
        tipAm: '«P» տառը համր է. երբեք մի՛ ասեք ռիսիպտ։'
      },
      {
        id: 'cm-2',
        moduleId: 'common-mistakes',
        kind: 'word',
        targetEn: 'Doubt & Debt',
        pronunciationUS: '/daʊt/ & /det/ (B-ն համր է)',
        pronunciationGB: '/daʊt/ & /det/ (B-ն համր է)',
        armenian: 'Կասկած & Պարտք',
        tipAm: '«B» տառը երկուսում էլ համր է։ Արտասանեք դաութ և դեթ։'
      },
      {
        id: 'cm-3',
        moduleId: 'common-mistakes',
        kind: 'word',
        targetEn: 'Island',
        pronunciationUS: '/ˈaɪ.lənd/ (S-ը համր է)',
        pronunciationGB: '/ˈaɪ.lənd/ (S-ը համր է)',
        armenian: 'Կղզի',
        tipAm: '«S» տառը համր է։ Մի՛ ասեք իսլանդ, այլ ա՛յլընդ։'
      },
      {
        id: 'cm-4',
        moduleId: 'common-mistakes',
        kind: 'word',
        targetEn: 'Subtle',
        pronunciationUS: '/ˈsʌt̬.əl/ (սա՛դըլ - B-ն համր է)',
        pronunciationGB: '/ˈsʌt.əl/ (սա՛թըլ - B-ն համր է)',
        armenian: 'Նուրբ / Թաքնված',
        tipAm: '«B» տառը համր է։ Արտասանվում է պարզապես sat-l։'
      },
      {
        id: 'cm-5',
        moduleId: 'common-mistakes',
        kind: 'sentence',
        targetEn: 'He worked hard, called his friend, and decided to rest.',
        pronunciationUS: '/hiː wɝːkt hɑːrd kɑːld hɪz frend ænd dɪˈsaɪ.dɪd tə rest/',
        pronunciationGB: '/hiː wɜːkt hɑːd kɔːld hɪz frend ənd dɪˈsaɪ.dɪd tə rest/',
        armenian: 'Նա շատ աշխատեց, զանգեց ընկերոջը և որոշեց հանգստանալ։',
        tipAm: '-ed վերջավորության 3 կանոնները. worked (/t/), called (/d/), decided (/ɪd/)։'
      },
      {
        id: 'cm-6',
        moduleId: 'common-mistakes',
        kind: 'sentence',
        targetEn: 'The honest knight knew how to climb the island hill.',
        pronunciationUS: '/ði ˈɑː.nɪst naɪt nuː haʊ tə klaɪm ði ˈaɪ.lənd hɪl/',
        pronunciationGB: '/ði ˈɒn.ɪst naɪt njuː haʊ tə klaɪm ði ˈaɪ.lənd hɪl/',
        armenian: 'Ազնիվ ասպետը գիտեր, թե ինչպես բարձրանալ կղզու բլուրը։',
        tipAm: 'Համր տառեր. honest (h), knight (k, gh), knew (k), climb (b), island (s)։'
      }
    ]
  }
];

