import {LESSONS_DATA} from '../../data/lessons';
import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{
 await page.goto('/');
 await page.getByRole('textbox').nth(0).fill('Test');
 await page.getByRole('textbox').nth(1).fill('Learner');
 await page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true}).click();
 await expect(page.getByText('ԲԱՐԻ ԳԱԼՈՒՍՏ HAYLINGO',{exact:true})).toHaveCount(0);
});
test('profile persists after reload without horizontal overflow',async({page})=>{
 await page.reload();await expect(page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true})).toHaveCount(0);
 await expect(page.getByText(/Test Learner/).filter({visible:true}).first()).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('local translator works and reverse direction stays in the app',async({page})=>{
 await page.goto('/?tab=translation');
 await page.getByLabel('Թարգմանվող տեքստը',{exact:true}).fill('I am learning English.');
 await page.getByRole('button',{name:'Թարգմանել',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Ես անգլերեն եմ սովորում');
 await page.getByRole('button',{name:'Փոխել թարգմանության ուղղությունը',exact:true}).click();
 await page.getByRole('button',{name:'Թարգմանել',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('I am learning English.');
});
test('PWA manifest and service worker are available',async({page,request})=>{
 const manifest=await request.get('/manifest.webmanifest');expect(manifest.ok()).toBe(true);expect((await manifest.json()).icons.length).toBeGreaterThan(0);
 await expect.poll(()=>page.evaluate(async()=>Boolean(await navigator.serviceWorker.getRegistration()))).toBe(true);
});

test('theme and exercise settings persist after reload',async({page})=>{
 await page.goto('/?tab=settings');
 await page.getByRole('button',{name:/Գիշերային — Dark Mode/}).click();
 await page.getByLabel('Ավտոմատ արտասանություն',{exact:true}).check();
 await page.reload();
 await expect(page.locator('html')).toHaveClass(/dark/);
 await expect(page.getByLabel('Ավտոմատ արտասանություն',{exact:true})).toBeChecked();
 await page.getByRole('button',{name:/Ցերեկային — Light Mode/}).click();
 await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('lesson position resumes and completion is recorded only once',async({page})=>{
 await page.goto('/?tab=lessons');
 const snapshot=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
 await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
 const first=await snapshot();
 const lesson = LESSONS_DATA.find(l=>l.id===first.currentLessonId)!;
 await page.reload();
 await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
 expect((await snapshot()).currentSentenceIndex).toBe(first.currentSentenceIndex);
 for(let i=first.currentSentenceIndex;i<lesson.sentences.length-1;i++) await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
 await page.getByRole('button',{name:'Ավարտել դասը և անցնել առաջ',exact:true}).click();
 const done=await snapshot();
 expect(done.completedLessonIds).toContain(first.currentLessonId);
 expect(done.completedLessonIds.filter((id:string)=>id===first.currentLessonId)).toHaveLength(1);
 expect(done.totalStudyMinutes).toBeLessThan(2);
 expect(done.streakDays).toBe(1);
 await page.getByRole('button',{name:'Բացել դասը՝ '+lesson.titleAm,exact:true}).click();
 for(let i=0;i<lesson.sentences.length-1;i++) await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
 await page.getByRole('button',{name:'Ավարտել դասը և անցնել առաջ',exact:true}).click();
 const repeated = await snapshot();expect(repeated.skills.reading).toBe(done.skills.reading);
 expect(repeated.history.filter((h:any)=>h.activityType==='lesson'&&h.referenceId===lesson.id)).toHaveLength(1);
});

test('professional exercises reject wrong answers and save a correct answer',async({page},testInfo)=>{
 await page.goto('/?tab=it-english');
 await page.getByLabel('Պարապմունքի մասնագիտությունը').selectOption('Doctor');
 await page.getByLabel('Մասնագիտական վարժության ռեժիմ').selectOption('translate');
 const check=page.getByRole('button',{name:'Ստուգել',exact:true}).first();
 await expect(check).toBeDisabled();
 await page.getByLabel('Մասնագիտական պատասխանը').fill('I eat the router every day.');await check.click();
 await expect(page.getByRole('status')).toContainText('Օրինակելի պատասխանը');
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
 expect(before.completedRoleplayIds).not.toContain('professional-5-0');
 await page.getByLabel('Մասնագիտական պատասխանը').fill('I can review the test results.');await check.click();
 await expect(page.getByRole('status')).toContainText('Ճիշտ է');
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!));
 expect(after.completedRoleplayIds).toContain('professional-5-0');
 expect(after.wrongAnswersCount).toBe(1);expect(after.correctAnswersCount).toBe(1);
 await page.screenshot({path:testInfo.outputPath('professional-practice.png'),fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('all main views load without JavaScript errors or horizontal overflow',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const tab of ['dashboard','lessons','exercises','teacher','voice','it-english','vocabulary','translation','history','profile','settings']){
  await page.goto(`/?tab=${tab}`);
  await expect(page.locator('main')).toBeVisible();
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),{message:`overflow in ${tab}`}).toBe(true);
 }
 expect(errors).toEqual([]);
});

test('unsupported microphone provides a usable text fallback',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'SpeechRecognition',{value:undefined,configurable:true});Object.defineProperty(window,'webkitSpeechRecognition',{value:undefined,configurable:true});});
 await page.goto('/?tab=it-english');
 await page.getByLabel('Մասնագիտական վարժության ռեժիմ').selectOption('speak');
 await page.getByRole('button',{name:'Պատասխանել խոսափողով',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Գրեք պատասխանը');
 await expect(page.getByLabel('Մասնագիտական պատասխանը')).toBeEditable();
});

test('previously loaded lessons remain usable offline',async({page,context})=>{
 await page.goto('/?tab=lessons');
 await expect.poll(()=>page.evaluate(()=>Boolean(navigator.serviceWorker.controller))).toBe(true);
 // The second visit loads route chunks under service-worker control.
 await page.reload();await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
 await context.setOffline(true);await page.reload();
 await expect(page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Հաջորդ նախադասությունը',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3')!).currentSentenceIndex)).toBeGreaterThan(0);
});
