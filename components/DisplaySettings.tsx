'use client';
import { useEffect, useState } from 'react';
import type { UserSettingsRecord } from '../lib/types';
import { FONT_LABELS } from '../lib/display-settings';

export default function DisplaySettings({settings,onChange}:{settings:UserSettingsRecord;onChange:(settings:Partial<UserSettingsRecord>)=>void}) {
  const [wakeSupported,setWakeSupported] = useState<boolean | null>(null);
  useEffect(()=>setWakeSupported(window.isSecureContext && Boolean(navigator.wakeLock?.request)),[]);
  return <section aria-labelledby="display-settings-title" className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
    <h2 id="display-settings-title" className="text-lg font-bold">Էկրան և տառաչափ</h2>
    <label className="flex items-start gap-3"><input type="checkbox" checked={settings.keepScreenAwake} onChange={e=>onChange({keepScreenAwake:e.target.checked})} /><span>Դասի ընթացքում էկրանը միացված պահել</span></label>
    <p className="text-sm text-slate-500">Գործում է պարապմունքի ընթացքում։ Էջից դուրս գալուց կամ պարապմունքն ավարտելուց հետո անջատվում է։ Համակարգը կարող է մերժել կամ ընդհատել այն, օրինակ՝ մարտկոցի խնայման պատճառով։</p>
    {wakeSupported===false && <p role="note">Այս բրաուզերը կամ կապը չի աջակցում Screen Wake Lock-ին։ Պարապմունքները շարունակում են աշխատել։</p>}
    <label className="block space-y-2"><span>Ցուցադրման ռեժիմ</span><select aria-label="Ցուցադրման ռեժիմ" className="w-full rounded-xl border p-3 dark:bg-slate-800" value={settings.displayMode} onChange={e=>onChange({displayMode:e.target.value as UserSettingsRecord['displayMode']})}>
      <option value="auto">Ավտոմատ</option><option value="desktop">Համակարգչային</option><option value="mobile">Բջջային</option>
    </select></label>
    <p className="text-sm text-slate-500">Համակարգչային ռեժիմը լայն է՝ ձախ ընտրացանկով։ Փոքր էկրանին ընտրացանկը բացվում է «Մենյու»-ից։ Բջջային ռեժիմը կենտրոնացված մեկ սյունակ ունի։ Tab-ով շարժվեք, Enter-ով ընտրեք, Escape-ով փակեք ընտրացանկը։</p>
    <h3 className="font-bold">Տառաչափ</h3>
    {(Object.keys(FONT_LABELS) as (keyof typeof FONT_LABELS)[]).map(key=><fieldset key={key} className="min-w-0 border rounded-xl p-3 space-y-3">
      <legend className="px-1 font-semibold">{FONT_LABELS[key]}</legend>
      <div className="flex flex-wrap gap-2">{[[14,'Փոքր'],[16,'Սովորական'],[18,'Միջին'],[22,'Մեծ'],[26,'Շատ մեծ']].map(([size,label])=><button type="button" key={size} aria-label={`${FONT_LABELS[key]}՝ ${label}, ${size}px`} aria-pressed={settings.fontSizes[key]===size} onClick={()=>onChange({fontSizes:{...settings.fontSizes,[key]:Number(size)}})} className={`rounded-lg border p-2 ${settings.fontSizes[key]===size?'bg-emerald-600 text-white':'dark:bg-slate-800'}`}>{label} · {size}px</button>)}</div>
      <label className="block"><span>{FONT_LABELS[key]}՝ {settings.fontSizes[key]}px</span><input aria-label={`${FONT_LABELS[key]}ի չափը`} className="block w-full mt-2" type="range" min="14" max="30" step="1" value={settings.fontSizes[key]} onChange={e=>onChange({fontSizes:{...settings.fontSizes,[key]:Number(e.target.value)}})} /></label>
    </fieldset>)}
    <div aria-label="Տառաչափի նախադիտում" className="rounded-xl bg-emerald-500/10 p-4 space-y-3">
      <p>Նախադիտում · Փոփոխությունները կիրառվում են անմիջապես։</p>
      <p data-learning-text="english" lang="en">I am learning English every day.</p>
      <p data-learning-text="pronunciation">Այ եմ լըրնինգ Ինգլիշ էվրի դեյ։</p>
      <p data-learning-text="armenian" lang="hy">Ես ամեն օր անգլերեն եմ սովորում։</p>
    </div>
  </section>;
}
