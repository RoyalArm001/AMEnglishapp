import { LessonItem, ExerciseItem } from '../lib/types';
export const ADDITIONAL_LESSONS: LessonItem[] = [
 {id:'lesson-27-plans',categoryId:'daily-conversations',order:27,titleAm:'Օրվա պլանների փոփոխություն',titleEn:'Changing daily plans',descriptionAm:'Համաձայնեցրեք հանդիպումը և բացատրեք փոփոխությունը։',level:'A2',estimatedMinutes:6,grammarTipAm:'«Could we ...?» կառույցով քաղաքավարի առաջարկ ենք անում։',sentences:[
  {id:'daily-plan-1',english:'Could we meet a little later?',pronunciation:'Քուդ ուի միթ ը լիթըլ լեյթըր՞',armenian:'Կարո՞ղ ենք մի փոքր ավելի ուշ հանդիպել։'},
  {id:'daily-plan-2',english:'The bus is late, so I will walk to the station.',pronunciation:'Դը բաս իզ լեյթ, սոու այ ուիլ ուոք թու դը սթեյշըն։',armenian:'Ավտոբուսն ուշանում է, ուստի ես ոտքով կգնամ կայարան։'},
  {id:'daily-plan-3',english:'Please let me know when you arrive.',pronunciation:'Փլիզ լեթ մի նոու ուեն յու ըրայվ։',armenian:'Խնդրում եմ տեղեկացրեք ինձ, երբ հասնեք։'},
  {id:'daily-plan-4',english:'If it rains, we can have lunch indoors.',pronunciation:'Իֆ իթ րեյնզ, ուի քեն հեվ լանչ ինդորզ։',armenian:'Եթե անձրև գա, կարող ենք ներսում ճաշել։'},
 ]},
 {id:'lesson-28-handover',categoryId:'work-conversations',order:28,titleAm:'Աշխատանքի փոխանցում գործընկերոջը',titleEn:'A clear work handover',descriptionAm:'Բացատրեք կատարվածը, մնացած քայլերն ու ժամկետները։',level:'B1',estimatedMinutes:8,grammarTipAm:'Կատարված աշխատանքի համար օգտագործում ենք «have + past participle»։',sentences:[
  {id:'handover-1',english:'I have completed the first part of the report.',pronunciation:'Այ հեվ քըմփլիթիդ դը ֆըրսթ փարթ օվ դը րիփորթ։',armenian:'Ես ավարտել եմ հաշվետվության առաջին մասը։'},
  {id:'handover-2',english:'The remaining figures need to be checked before Friday.',pronunciation:'Դը րիմեյնինգ ֆիգյըրզ նիդ թու բի չեքթ բիֆոր Ֆրայդեյ։',armenian:'Մնացած թվերը պետք է ստուգվեն մինչև ուրբաթ։'},
  {id:'handover-3',english:'Could you send me your comments by tomorrow afternoon?',pronunciation:'Քուդ յու սենդ մի յոր քոմենթս բայ թըմորոու աֆթըրնուն՞',armenian:'Կարո՞ղ եք ձեր մեկնաբանություններն ուղարկել մինչև վաղը կեսօրից հետո։'},
  {id:'handover-4',english:'Once we agree on the changes, I will share the final version with the team.',pronunciation:'Ուանս ուի ըգրի օն դը չեյնջիզ, այ ուիլ շեր դը ֆայնըլ վըրժըն ուիդ դը թիմ։',armenian:'Երբ համաձայնեցնենք փոփոխությունները, վերջնական տարբերակը կուղարկեմ թիմին։'},
 ]},
];
export const ADDITIONAL_EXERCISES: ExerciseItem[] = ADDITIONAL_LESSONS.flatMap(lesson=>lesson.sentences.map((s,i)=>({
 id:`practice-${s.id}`,type:i%2?'listening':'translate',level:lesson.level,skill:i%2?'listening':'writing',category:lesson.titleAm,
 promptEn:i%2?'Listen and write the sentence.':'Translate the Armenian sentence into English.',
 promptAm:i%2?'Լսեք և գրեք նախադասությունը։':s.armenian,audioText:s.english,
 correctAnswer:s.english,acceptedAnswers:[s.english],hintAm:`Սկիզբը՝ ${s.english.split(' ').slice(0,2).join(' ')}`,
 explanationAm:`${s.armenian} Կարդացվում է՝ ${s.pronunciation} ${lesson.grammarTipAm}`,
})));
