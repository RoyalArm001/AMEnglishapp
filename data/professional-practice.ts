import { ProfessionId, CEFRLevel } from '../lib/types';
type Phrase = [english: string, pronunciation: string, armenian: string];
// Original work activities; reused across progressively harder conversational situations.
export const PROFESSIONAL_ACTIVITIES: Record<ProfessionId, Phrase[]> = {
  'IT Specialist': [['restart the computer','րիսթարթ դը քոմփյութըր','վերագործարկել համակարգիչը'],['check the connection','չեք դը քընեքշըն','ստուգել կապը'],['update the software','ափդեյթ դը սոֆթուեր','թարմացնել ծրագրակազմը']],
  'Software Developer': [['review the code','րիվյու դը քոուդ','վերանայել կոդը'],['fix the bug','ֆիքս դը բագ','ուղղել ծրագրային սխալը'],['run the tests','րան դը թեսթս','գործարկել թեստերը']],
  'Network Administrator': [['check the router','չեք դը րաութըր','ստուգել երթուղիչը'],['monitor the network','մոնիթըր դը նեթուորք','վերահսկել ցանցը'],['replace the cable','րիպլեյս դը քեյբըլ','փոխարինել մալուխը']],
  'System Administrator': [['back up the files','բեք ափ դը ֆայլզ','պահուստավորել ֆայլերը'],['check the server','չեք դը սըրվըր','ստուգել սերվերը'],['review the permissions','րիվյու դը փըրմիշընզ','վերանայել թույլտվությունները']],
  Engineer: [['review the design','րիվյու դը դիզայն','վերանայել նախագիծը'],['test the equipment','թեսթ դի իքուիփմընթ','փորձարկել սարքավորումը'],['check the measurements','չեք դը մեժըրմընթս','ստուգել չափումները']],
  Doctor: [['review the test results','րիվյու դը թեսթ րիզալթս','վերանայել հետազոտության արդյունքները'],['examine the patient','իգզեմին դը փեյշընթ','զննել հիվանդին'],['explain the treatment','իքսփլեյն դը թրիթմընթ','բացատրել բուժումը']],
  Teacher: [['prepare the lesson','փրիփեր դը լեսըն','պատրաստել դասը'],['check the homework','չեք դը հոումուորք','ստուգել տնային աշխատանքը'],['explain the exercise','իքսփլեյն դի էքսըրսայզ','բացատրել վարժությունը']],
  Student: [['finish the assignment','ֆինիշ դի ըսայնմընթ','ավարտել առաջադրանքը'],['review the notes','րիվյու դը նոութս','վերանայել գրառումները'],['prepare the presentation','փրիփեր դը փրեզընթեյշըն','պատրաստել ներկայացումը']],
  Accountant: [['check the invoice','չեք դի ինվոյս','ստուգել հաշիվը'],['prepare the report','փրիփեր դը րիփորթ','պատրաստել հաշվետվությունը'],['review the expenses','րիվյու դի իքսփենսիզ','վերանայել ծախսերը']],
  Driver: [['check the route','չեք դը րութ','ստուգել երթուղին'],['inspect the vehicle','ինսփեքթ դը վիիըքըլ','զննել մեքենան'],['confirm the address','քընֆըրմ դի ըդրես','հաստատել հասցեն']],
  Manager: [['organize the meeting','օրգընայզ դը միթինգ','կազմակերպել հանդիպումը'],['review the schedule','րիվյու դը սքեջուլ','վերանայել ժամանակացույցը'],['assign the tasks','ըսայն դը թասքս','բաշխել առաջադրանքները']],
  'Business Owner': [['review the budget','րիվյու դը բաջիթ','վերանայել բյուջեն'],['contact the supplier','քոնթաքթ դը սըփլայըր','կապվել մատակարարի հետ'],['improve the service','իմփրուվ դը սըրվիս','բարելավել ծառայությունը']],
  'Sales Specialist': [['confirm the order','քընֆըրմ դի օրդըր','հաստատել պատվերը'],['explain the offer','իքսփլեյն դի օֆըր','բացատրել առաջարկը'],['contact the customer','քոնթաքթ դը քասթըմըր','կապվել հաճախորդի հետ']],
  Designer: [['review the layout','րիվյու դը լեյաութ','վերանայել դասավորությունը'],['choose the colors','չուզ դը քալըրզ','ընտրել գույները'],['prepare the draft','փրիփեր դը դրաֆթ','պատրաստել նախնական տարբերակը']],
  Other: [['organize the documents','օրգընայզ դը դոքյումընթս','դասավորել փաստաթղթերը'],['confirm the appointment','քընֆըրմ դի ըփոյնթմընթ','հաստատել հանդիպման ժամը'],['help the customer','հելփ դը քասթըմըր','օգնել հաճախորդին']],
};
const situations: {title: string; level: CEFRLevel; question: Phrase; answer: (a: Phrase) => Phrase}[] = [
  {title:'Կարողություններ',level:'A1',question:['Can you help me?','Քեն յու հելփ մի՞','Կարո՞ղ եք օգնել ինձ։'],answer:([e,p,a])=>[`I can ${e}.`,`Այ քեն ${p}։`,`Ես կարող եմ ${a}։`]},
  {title:'Օրվա պարտականություն',level:'A1',question:['What do you need to do?','Ուաթ դու յու նիդ թու դու՞','Ի՞նչ պետք է անեք։'],answer:([e,p,a])=>[`I need to ${e}.`,`Այ նիդ թու ${p}։`,`Ես պետք է ${a}։`]},
  {title:'Գործողությունների պլան',level:'A2',question:['What will you do today?','Ուաթ ուիլ յու դու թըդեյ՞','Ի՞նչ եք անելու այսօր։'],answer:([e,p,a])=>[`I will ${e} today.`,`Այ ուիլ ${p} թըդեյ։`,`Այսօր պատրաստվում եմ ${a}։`]},
  {title:'Ժամկետի համաձայնեցում',level:'A2',question:['Can you finish before lunch?','Քեն յու ֆինիշ բիֆոր լանչ՞','Կարո՞ղ եք ավարտել մինչև ճաշը։'],answer:([e,p,a])=>[`I can ${e} before lunch.`,`Այ քեն ${p} բիֆոր լանչ։`,`Ես կարող եմ ${a} մինչև ճաշը։`]},
  {title:'Լրացուցիչ ժամանակ',level:'A2',question:['Why do you need more time?','Ուայ դու յու նիդ մոր թայմ՞','Ինչո՞ւ է ձեզ ավելի շատ ժամանակ պետք։'],answer:([e,p,a])=>[`I need more time to ${e}.`,`Այ նիդ մոր թայմ թու ${p}։`,`Ինձ ավելի շատ ժամանակ է պետք, որպեսզի կարողանամ ${a}։`]},
  {title:'Առաջնահերթություն',level:'A2',question:['What should we do first?','Ուաթ շուդ ուի դու ֆըրսթ՞','Ի՞նչ պետք է անենք առաջին հերթին։'],answer:([e,p,a])=>[`We should ${e} first.`,`Ուի շուդ ${p} ֆըրսթ։`,`Առաջին հերթին մենք պետք է ${a}։`]},
  {title:'Հաջորդ քայլը',level:'B1',question:['What is the next step?','Ուաթ իզ դը նեքսթ սթեփ՞','Ո՞րն է հաջորդ քայլը։'],answer:([e,p,a])=>[`The next step is to ${e}.`,`Դը նեքսթ սթեփ իզ թու ${p}։`,`Հաջորդ քայլն է՝ ${a}։`]},
  {title:'Պայման և արդյունք',level:'B1',question:['Can we finish today?','Քեն ուի ֆինիշ թըդեյ՞','Կարո՞ղ ենք այսօր ավարտել։'],answer:([e,p,a])=>[`We can finish today if we ${e} now.`,`Ուի քեն ֆինիշ թըդեյ իֆ ուի ${p} նաու։`,`Կկարողանանք այսօր ավարտել, եթե հիմա մեզ հաջողվի ${a}։`]},
  {title:'Առաջարկ հանդիպման ժամանակ',level:'B1',question:['What do you suggest?','Ուաթ դու յու սըջեսթ՞','Ի՞նչ եք առաջարկում։'],answer:([e,p,a])=>[`I suggest that we ${e} before the meeting.`,`Այ սըջեսթ դեթ ուի ${p} բիֆոր դը միթինգ։`,`Ես առաջարկում եմ ${a} հանդիպումից առաջ։`]},
  {title:'Ուշացման կանխարգելում',level:'B2',question:['How can we prevent another delay?','Հաու քեն ուի փրիվենթ ընադըր դիլեյ՞','Ինչպե՞ս կարող ենք կանխել հերթական ուշացումը։'],answer:([e,p,a])=>[`We should ${e} in advance so that we have time to make changes.`,`Ուի շուդ ${p} ին ըդվանս սոու դեթ ուի հեվ թայմ թու մեյք չեյնջիզ։`,`Մենք պետք է նախապես ${a}, որպեսզի փոփոխություններ անելու ժամանակ ունենանք։`]},
];
export const PROFESSIONAL_DIALOGUES = (Object.keys(PROFESSIONAL_ACTIVITIES) as ProfessionId[]).flatMap((profession, p) =>
  situations.map((s,i)=>({id:`professional-${p}-${i}`,profession,title:s.title,level:s.level,question:s.question,answer:s.answer(PROFESSIONAL_ACTIVITIES[profession][i%3]),followUp:situations[(i+1)%situations.length].question,followUpAnswer:situations[(i+1)%situations.length].answer(PROFESSIONAL_ACTIVITIES[profession][(i+1)%3])})));
