import {test,expect,Page} from '@playwright/test';
import {LESSONS_DATA} from '../../data/lessons';

test.beforeEach(async({page})=>{
  await page.addInitScript(()=>{
    const state={requests:0,releases:0,deny:false,locks:[] as any[]};
    (window as any).__wake=state;
    Object.defineProperty(navigator,'wakeLock',{configurable:true,value:{request:async(type:string)=>{
      if(type!=='screen')throw new Error('wrong lock type');
      state.requests++;
      if(state.deny)throw new DOMException('Unavailable','NotAllowedError');
      const lock=new EventTarget() as any;lock.released=false;
      lock.release=async()=>{if(!lock.released){lock.released=true;state.releases++;lock.dispatchEvent(new Event('release'));}};
      state.locks.push(lock);return lock;
    }}});
  });
  await page.goto('/');
  await page.getByRole('textbox').nth(0).fill('Display');
  await page.getByRole('textbox').nth(1).fill('Learner');
  await page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true}).click();
  await expect(page.locator('main')).toBeVisible();
});
const wakeStatus=(page:Page)=>page.locator('[data-wake-status]');
const fontInput=(page:Page,label:string)=>page.getByRole('slider',{name:label+'ի չափը',exact:true});
async function chooseFont(page:Page,label:string,value:number){const input=fontInput(page,label);await input.focus();await input.press('Home');for(let i=14;i<value;i++)await input.press('ArrowRight');await expect(input).toHaveValue(String(value));}

test('wake lock starts for learning, stops on lesson completion and leaving the section',async({page})=>{
  await page.goto('/?tab=lessons');await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
  const id=await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!).currentLessonId);
  const lesson=LESSONS_DATA.find(l=>l.id===id)!;
  for(let i=1;i<lesson.sentences.length;i++)await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
  await page.getByRole('button',{name:'Ավարտել դասը և անցնել առաջ',exact:true}).click();
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','inactive');
  expect(await page.evaluate(()=>(window as any).__wake.locks.every((l:any)=>l.released))).toBe(true);
  await page.getByRole('button',{name:'Սկսել պարապմունքը',exact:true}).click();await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
  if(await page.getByRole('button',{name:'Մենյու',exact:true}).isVisible()){await page.getByRole('button',{name:'Մենյու',exact:true}).click();await page.getByRole('navigation',{name:'Բջջային ընտրացանկ'}).getByRole('button',{name:/Կարգավորումներ/}).click();}
  else await page.getByRole('navigation',{name:'Բաժինների ընտրություն'}).getByRole('button',{name:/Կարգավորումներ/}).click();
  await expect(page.getByRole('heading',{name:'Էկրան և տառաչափ'})).toBeVisible();
  await expect.poll(()=>page.evaluate(()=>(window as any).__wake.locks.every((l:any)=>l.released))).toBe(true);
});

test('wake lock handles visibility, system release and denied request',async({page})=>{
  await page.goto('/?tab=voice');await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
  await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'));});
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','hidden');
  await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'});document.dispatchEvent(new Event('visibilitychange'));});
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
  expect(await page.evaluate(()=>(window as any).__wake.requests)).toBe(2);
  await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','hidden');
  await page.evaluate(()=>window.dispatchEvent(new Event('pageshow')));
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
  await page.evaluate(()=>{(window as any).__wake.deny=true;return (window as any).__wake.locks.at(-1).release();});
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','released');
  await page.getByRole('button',{name:'Կրկին միացնել էկրանի պահումը'}).click();
  await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','denied');
});

test('unsupported API and disabled setting allow normal learning',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(navigator,'wakeLock',{configurable:true,value:undefined}));
  await page.goto('/?tab=teacher');await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','unsupported');
  await page.goto('/?tab=settings');await expect(page.getByRole('note')).toContainText('չի աջակցում');
  await page.getByLabel('Էկրանը միացված պահել',{exact:true}).uncheck();
  await page.goto('/?tab=it-english');await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','inactive');
  await page.goto('/?tab=settings');await expect(page.getByLabel('Էկրանը միացված պահել',{exact:true})).not.toBeChecked();
});

test('reading listening speaking questions and conversations share the study lifecycle',async({page})=>{
  for(const tab of ['lessons','exercises','teacher','voice','it-english','vocabulary']){
    await page.goto('/?tab='+tab);
    await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','active');
    await page.getByRole('button',{name:'Ավարտել պարապմունքը',exact:true}).click();
    await expect(wakeStatus(page)).toHaveAttribute('data-wake-status','inactive');
    expect(await page.evaluate(()=>(window as any).__wake.locks.every((l:any)=>l.released))).toBe(true);
  }
});

test('desktop mobile and auto layouts persist and keyboard navigation works',async({page})=>{
  await page.goto('/?tab=settings');
  for(const mode of ['mobile','desktop','auto']){
    await page.getByLabel('Ցուցադրման ռեժիմ',{exact:true}).selectOption(mode);
    await expect(page.locator('html')).toHaveAttribute('data-display-mode',mode);
    await page.reload();await expect(page.getByLabel('Ցուցադրման ռեժիմ',{exact:true})).toHaveValue(mode);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  await page.setViewportSize({width:1440,height:1000});await expect(page.locator('html')).toHaveAttribute('data-layout','desktop');
  const nav=page.getByRole('navigation',{name:'Բաժինների ընտրություն'});await nav.getByRole('button').nth(0).focus();await page.keyboard.press('ArrowDown');await expect(nav.getByRole('button').nth(1)).toBeFocused();
  await page.setViewportSize({width:390,height:844});await expect(page.locator('html')).toHaveAttribute('data-layout','mobile');
  await page.getByRole('button',{name:'Մենյու',exact:true}).click();await expect(page.getByRole('navigation',{name:'Բջջային ընտրացանկ'})).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('navigation',{name:'Բջջային ընտրացանկ'})).toHaveCount(0);
});

test('independent font controls update live preview and recover from IndexedDB after reload',async({page})=>{
  await page.goto('/?tab=settings');
  await page.getByRole('button',{name:'Անգլերեն տեքստ՝ Մեծ, 22px',exact:true}).click();
  await chooseFont(page,'Հայերեն արտասանություն',26);await chooseFont(page,'Հայերեն թարգմանություն',18);
  await chooseFont(page,'Ընդհանուր ինտերֆեյս',18);
  const preview=page.getByLabel('Տառաչափի նախադիտում',{exact:true});
  await expect(preview.locator('[data-learning-text="english"]')).toHaveCSS('font-size','22px');
  await expect(preview.locator('[data-learning-text="pronunciation"]')).toHaveCSS('font-size','26px');
  await expect(preview.locator('[data-learning-text="armenian"]')).toHaveCSS('font-size','18px');
  await expect(page.locator('html')).toHaveCSS('font-size','18px');
  await expect.poll(()=>page.evaluate(async()=>{const db=await new Promise<IDBDatabase>(r=>{const q=indexedDB.open('AMEnglishLearningDB_v3');q.onsuccess=()=>r(q.result)});const record=await new Promise<any>(r=>{const q=db.transaction('settings').objectStore('settings').get('settings-user-main');q.onsuccess=()=>r(q.result)});db.close();return record?.fontSizes?.interface})).toBe(18);
  await page.evaluate(()=>{localStorage.removeItem('am_english_learning_snapshot_v3');localStorage.removeItem('am_english_light_settings_v3');});
  await page.reload();await expect(fontInput(page,'Անգլերեն տեքստ')).toHaveValue('22');
  await page.goto('/?tab=lessons');await expect(page.locator('main [data-learning-text="english"]').first()).toHaveCSS('font-size','22px');
  await expect(page.locator('main [data-learning-text="pronunciation"]').first()).toHaveCSS('font-size','26px');
});

test('30px fonts remain usable across learning pages in desktop mode and dark theme',async({page},testInfo)=>{
  await page.goto('/?tab=settings');await page.getByLabel('Ցուցադրման ռեժիմ',{exact:true}).selectOption('desktop');
  for(const label of ['Անգլերեն տեքստ','Հայերեն արտասանություն','Հայերեն թարգմանություն','Ընդհանուր ինտերֆեյս'])await chooseFont(page,label,30);
  await page.getByRole('button',{name:/Գիշերային — Dark Mode/}).click();
  for(const tab of ['settings','dashboard','lessons','exercises','teacher','voice','it-english','vocabulary','translation','history','profile']){
    await page.goto('/?tab='+tab);await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('html')).toHaveCSS('font-size','30px');
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),{message:'overflow at 30px: '+tab}).toBe(true);
    if(tab==='lessons')await page.screenshot({path:testInfo.outputPath('large-font-lessons.png')});
  }
});
