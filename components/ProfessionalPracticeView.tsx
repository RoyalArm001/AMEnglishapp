'use client';
import {useStudyActivity} from '../lib/study-activity';
import React,{useEffect,useRef,useState} from 'react';
import {PROFESSIONAL_ACTIVITIES,PROFESSIONAL_DIALOGUES} from '../data/professional-practice';
import {PROFESSIONS_LIST} from '../data/professions';
import {ProfessionId,SkillType} from '../lib/types';
import {normalizeEnglishText,startSpeechRecognition} from '../lib/speech';
export default function ProfessionalPracticeView({profession,onSpeak,onComplete}:{profession:ProfessionId;onSpeak:(text:string,speed?:'slow'|'normal')=>void;onComplete:(id:string,correct:boolean,prompt:string,answer:string,target:string,skill?:SkillType)=>void}){
 const studyActivity=useStudyActivity();
 const [selected,setSelected]=useState(profession);const [index,setIndex]=useState(0);const [answer,setAnswer]=useState('');const [mode,setMode]=useState('study');const [feedback,setFeedback]=useState('');const stop=useRef<(()=>void)|null>(null);const [listening,setListening]=useState(false);
 useEffect(()=>{setSelected(profession);setIndex(0);setAnswer('');setFeedback('')},[profession]);
 useEffect(()=>()=>stop.current?.(),[]);
 const dialogs=PROFESSIONAL_DIALOGUES.filter(d=>d.profession===selected);const current=dialogs[index];
 const target=mode==='extended'?`$<span data-learning-text="english">{current.answer[0]}</span> ${current.followUpAnswer[0]}`:current.answer[0];
 const reset=()=>{stop.current?.();setListening(false);setAnswer('');setFeedback('')};
 return <section className="rounded-3xl border border-emerald-300 bg-white dark:bg-slate-900 p-5 space-y-4">
  <h2 className="text-xl font-bold">Մասնագիտական պարապմունք՝ 15 մասնագիտության համար</h2>
  <p className="text-sm text-slate-500">Յուրաքանչյուր մասնագիտություն՝ 10 կարճ աշխատանքային երկխոսություն, A1–B2։ Տառադարձումը մոտավոր հուշում է։</p>
  <label className="block">Մասնագիտություն <select aria-label="Պարապմունքի մասնագիտությունը" value={selected} onChange={e=>{reset();setSelected(e.target.value as ProfessionId);setIndex(0)}} className="block w-full max-w-full min-w-0 p-2 border rounded-lg dark:bg-slate-800">{PROFESSIONS_LIST.map(p=><option key={p.id} value={p.id}>{p.titleAm}</option>)}</select></label>
  <div className="flex flex-wrap gap-2">{dialogs.map((d,i)=><button key={d.id} onClick={()=>{reset();setIndex(i)}} className={`p-2 rounded-lg text-sm ${index===i?'bg-emerald-600 text-white':'bg-slate-100 dark:bg-slate-800'}`}>{i+1}. {d.title}</button>)}</div>
  <details><summary>Աշխատանքային արտահայտություններ</summary>{PROFESSIONAL_ACTIVITIES[selected].map(([e,p,a])=><p key={e} className="p-2"><span data-learning-text="english">{e}</span> · <span data-learning-text="pronunciation">{p}</span> · <span data-learning-text="armenian">{a}</span></p>)}</details>
  <label>Ռեժիմ <select aria-label="Մասնագիտական վարժության ռեժիմ" value={mode} onChange={e=>{reset();setMode(e.target.value)}} className="block w-full max-w-full min-w-0 p-2 border rounded-lg dark:bg-slate-800"><option value="study">Ուսումնասիրել</option><option value="translate">Թարգմանել անգլերեն</option><option value="listen">Լսել և գրել</option><option value="extended">Երկար պատասխան՝ երկու քայլով</option><option value="speak">Պատասխանել ձայնով</option></select></label>
  <p className="font-bold">{current.level} · <span data-learning-text="english">{current.question[0]}</span></p><p><span data-learning-text="pronunciation">{current.question[1]}</span></p><p><span data-learning-text="armenian">{current.question[2]}</span></p>
  <button onClick={()=>onSpeak(current.question[0])} className="text-emerald-600">Լսել հարցը</button>
  {mode==='study'?<div className="rounded-xl bg-emerald-500/10 p-4">{[...current.answer,...current.followUp,...current.followUpAnswer].map((line,i)=><p key={i} data-learning-text={['english','pronunciation','armenian'][i%3]}>{line}</p>)}</div>:<>
   {mode==='translate'&&<p><span data-learning-text="armenian">{current.answer[2]}</span></p>}
   {mode==='extended'&&<p><span data-learning-text="english">{current.followUp[0]}</span> · <span data-learning-text="pronunciation">{current.followUp[1]}</span> · <span data-learning-text="armenian">{current.followUp[2]}</span><br />Պատասխանեք երկու հարցին՝ <span data-learning-text="armenian">{current.answer[2]}</span> <span data-learning-text="armenian">{current.followUpAnswer[2]}</span></p>}
   <label className="block">Ձեր պատասխանը <input data-learning-text="english" aria-label="Մասնագիտական պատասխանը" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback('')}} className="w-full p-3 border rounded-xl dark:bg-slate-800" /></label>
   {(mode==='speak'||mode==='extended')&&<button onClick={()=>{studyActivity.start();if(listening){stop.current?.();setListening(false);return;}stop.current=startSpeechRecognition({onStart:()=>setListening(true),onResult:setAnswer,onEnd:()=>setListening(false),onError:()=>{setListening(false);setFeedback('Խոսափողն անհասանելի է։ Կարող եք գրել պատասխանը։')}});if(!stop.current)setFeedback('Խոսքի ճանաչումը հասանելի չէ։ Գրեք պատասխանը։')}}>{listening?'Կանգնեցնել':'Պատասխանել խոսափողով'}</button>}
   <button disabled={!answer.trim()||Boolean(feedback)} onClick={()=>{studyActivity.start();const correct=normalizeEnglishText(answer)===normalizeEnglishText(target);setFeedback(correct?'Ճիշտ է։':`Օրինակելի պատասխանը՝ ${target}`);onComplete(current.id,correct,current.question[0],answer,target,mode==='translate'?'writing':mode==='listen'?'listening':'speaking')}} className="px-4 py-2 bg-emerald-600 text-white rounded-xl disabled:opacity-50">Ստուգել</button>
  </>}
  <div className="flex gap-4"><button onClick={()=>onSpeak(target)}>Լսել պատասխանը</button><button onClick={()=>onSpeak(target,'slow')}>Լսել դանդաղ</button></div>
  {feedback&&<p role="status">{feedback}</p>}
 </section>
}
