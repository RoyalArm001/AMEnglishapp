const {test,beforeEach}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
const {IDBFactory}=require('fake-indexeddb');
const {createWakeLock}=require('../lib/wake-lock.ts');
const {normalizeDisplaySettings}=require('../lib/display-settings.ts');
const {learningRepository:repo,DEFAULT_USER_PROGRESS,normalizeAndValidateState}=require('../lib/storage.ts');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function fakeWake(requestOverride) {
  let visible=true,listener=()=>{},requests=0;
  const held=[];const statuses=[];
  const makeSentinel=()=>{const lock=new EventTarget();lock.released=false;lock.release=async()=>{lock.released=true;lock.dispatchEvent(new Event('release'));};held.push(lock);return lock;};
  const env={visible:()=>visible,subscribe:fn=>{listener=fn;return()=>{listener=()=>{}}},request:async()=>{requests++;return requestOverride?requestOverride(makeSentinel):makeSentinel()}};
  const controller=createWakeLock(env,s=>statuses.push(s));
  return {controller,held,statuses,get requests(){return requests},setVisible:v=>{visible=v;listener()}};
}
beforeEach(()=>{const map=new Map();global.window={indexedDB:new IDBFactory(),localStorage:{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}};});
test('wake lock acquired once and released on study exit',async()=>{const f=fakeWake();await tick();assert.equal(f.statuses.at(-1),'active');await f.controller.retry();assert.equal(f.requests,1);f.controller.dispose();await tick();assert.equal(f.held[0].released,true);});
test('hidden page releases and returning page reacquires',async()=>{const f=fakeWake();await tick();f.setVisible(false);await tick();assert.equal(f.held[0].released,true);assert.equal(f.statuses.at(-1),'hidden');f.setVisible(true);await tick();assert.equal(f.requests,2);assert.equal(f.statuses.at(-1),'active');f.controller.dispose();});
test('system release is reflected without an endless retry loop',async()=>{const f=fakeWake();await tick();await f.held[0].release();assert.equal(f.statuses.at(-1),'released');assert.equal(f.requests,1);await f.controller.retry();assert.equal(f.requests,2);f.controller.dispose();});
test('unsupported API does not throw',()=>{const states=[];const c=createWakeLock({visible:()=>true,subscribe:()=>()=>{}},s=>states.push(s));assert.equal(states.at(-1),'unsupported');c.dispose();});
test('denied request gives a recoverable status',async()=>{const f=fakeWake(()=>Promise.reject(new Error('NotAllowedError')));await tick();assert.equal(f.statuses.at(-1),'denied');f.controller.dispose();});
test('pending request resolving after exit releases immediately',async()=>{let resolve;const f=fakeWake(make=>new Promise(r=>{resolve=()=>r(make())}));await tick();f.controller.dispose();resolve();await tick();assert.ok(f.held[0].released);assert.ok(!f.statuses.includes('active'));});
test('hidden-visible round trip while request pending obtains a fresh lock',async()=>{let finish;let first=true;const f=fakeWake(make=>{if(!first)return make();first=false;return new Promise(resolve=>{finish=()=>resolve(make())})});await tick();f.setVisible(false);f.setVisible(true);finish();await tick();assert.equal(f.requests,2);assert.ok(f.held[0].released);assert.equal(f.statuses.at(-1),'active');f.controller.dispose();});
test('legacy settings migrate with local owner and preserve learning data',()=>{const s=structuredClone(DEFAULT_USER_PROGRESS);delete s.settings.fontSizes;delete s.settings.keepScreenAwake;delete s.settings.displayMode;delete s.settings.userId;s.completedLessonIds=['lesson-1-days'];s.profile.id='local-person-1';const n=normalizeAndValidateState(s);assert.equal(n.settings.userId,'local-person-1');assert.equal(n.settings.displayMode,'auto');assert.equal(n.settings.keepScreenAwake,true);assert.deepEqual(n.settings.fontSizes,{interface:16,english:16,pronunciation:16,armenian:16});assert.deepEqual(n.completedLessonIds,s.completedLessonIds);});
test('display settings use the current local owner rather than another profile',()=>{const s=structuredClone(DEFAULT_USER_PROGRESS);s.settings.userId='other-person';s.settings.fontSizes.english=30;s.profile.id='current-person';const n=normalizeAndValidateState(s);assert.equal(n.settings.userId,'current-person');assert.equal(n.settings.fontSizes.english,16);});
test('partial font preferences merge defaults and clamp corrupt stored values',()=>{const n=normalizeDisplaySettings({fontSizes:{english:100,armenian:10}},'owner');assert.equal(n.fontSizes.english,30);assert.equal(n.fontSizes.armenian,14);assert.equal(n.fontSizes.pronunciation,16);});
test('IndexedDB-only recovery preserves settings and owner-scoped settings record',async()=>{const s=structuredClone(DEFAULT_USER_PROGRESS);s.settings.displayMode='desktop';s.settings.keepScreenAwake=false;s.settings.fontSizes={interface:18,english:30,pronunciation:22,armenian:26};await repo.saveProgress(s);window.localStorage.removeItem('am_english_learning_snapshot_v3');const n=await repo.loadProgressAsync();assert.equal(n.settings.displayMode,'desktop');assert.equal(n.settings.keepScreenAwake,false);assert.deepEqual(n.settings.fontSizes,s.settings.fontSizes);const db=await new Promise(resolve=>{const r=window.indexedDB.open('AMEnglishLearningDB_v3');r.onsuccess=()=>resolve(r.result)});const record=await new Promise(resolve=>{const r=db.transaction('settings').objectStore('settings').get('settings-user-main');r.onsuccess=()=>resolve(r.result)});assert.equal(record.userId,'user-main');assert.equal(record.fontSizes.english,30);db.close();});
test('display settings survive export and import',async()=>{const s=structuredClone(DEFAULT_USER_PROGRESS);s.settings.displayMode='mobile';s.settings.fontSizes.english=26;const result=await repo.importFromJson(repo.exportToJson(s));assert.equal(result.ok,true);assert.equal(result.data.settings.fontSizes.english,26);assert.equal(result.data.settings.displayMode,'mobile');});
for(const [field,value] of [['displayMode','invalid'],['keepScreenAwake','true'],['fontSizes',{english:31}],['fontSizes',{english:'22'}],['fontSizes',[]]])test(`invalid ${field} ${JSON.stringify(value)} is rejected without replacing progress`,async()=>{const s=structuredClone(DEFAULT_USER_PROGRESS);await repo.saveProgress(s);s.settings[field]=value;assert.equal((await repo.importFromJson(JSON.stringify(s))).ok,false);assert.equal(repo.loadProgressSync().settings.displayMode,'auto');});

test('pause, resume and settings OFF/ON share one controller without duplicate requests',async()=>{
 const f=fakeWake();await tick();
 for(let i=0;i<2;i++){
  f.controller.setActive(false);await tick();assert.ok(f.held.every(l=>l.released));assert.equal(f.statuses.at(-1),'inactive');
  f.setVisible(false);f.setVisible(true);await f.controller.retry();assert.equal(f.requests,i+1);
  f.controller.setActive(true);f.controller.setActive(true);await tick();assert.equal(f.requests,i+2);assert.equal(f.statuses.at(-1),'active');
 }
 f.controller.dispose();await tick();
});
test('pending request stays inactive after OFF, then reacquires only when enabled',async()=>{
 let finish;const f=fakeWake(make=>new Promise(resolve=>{finish=()=>resolve(make())}));await tick();
 assert.equal(f.statuses.at(-1),'requesting');assert.ok(!f.statuses.includes('active'));
 f.controller.setActive(false);finish();await tick();assert.ok(f.held[0].released);assert.equal(f.statuses.at(-1),'inactive');assert.equal(f.requests,1);
 f.controller.dispose();
});
test('rapid controller unmount/remount serializes requests and detaches sentinel listeners',async()=>{
 let finish;const old=fakeWake(make=>new Promise(resolve=>{finish=()=>resolve(make())}));await tick();old.controller.dispose();const next=fakeWake();
 await tick();assert.equal(next.requests,0);finish();await tick();assert.ok(old.held[0].released);assert.equal(next.requests,1);
 const states=next.statuses.length;next.controller.dispose();await tick();next.setVisible(false);next.setVisible(true);
 assert.equal(next.statuses.length,states);assert.ok(next.held[0].released);
});
test('denial does not retry until a new visibility or user event',async()=>{
 const f=fakeWake(()=>Promise.reject(new Error('Battery Saver')));await tick();await tick();assert.equal(f.requests,1);
 f.controller.setActive(true);await tick();assert.equal(f.requests,1);
 f.setVisible(false);f.setVisible(true);await tick();assert.equal(f.requests,2);assert.equal(f.statuses.at(-1),'denied');f.controller.dispose();
});
test('initially inactive and hidden sessions never request a lock',async()=>{
 const states=[];let requests=0,visible=false,change;const c=createWakeLock({request:async()=>{requests++;throw Error('denied')},visible:()=>visible,subscribe:fn=>{change=fn;return()=>{}}},s=>states.push(s),false);
 await c.retry();assert.equal(requests,0);c.setActive(true);assert.equal(states.at(-1),'hidden');visible=true;change();await tick();assert.equal(requests,1);c.dispose();
});
