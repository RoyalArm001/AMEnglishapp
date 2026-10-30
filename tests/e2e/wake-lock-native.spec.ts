import {test,expect} from '@playwright/test';

test('native Chrome wake lock reports the real browser result and releases on pause',async({page},testInfo)=>{
 await page.goto('/');
 await page.getByRole('textbox').nth(0).fill('Native');await page.getByRole('textbox').nth(1).fill('Browser');
 await page.getByRole('button',{name:'Պահպանել և անցնել գլխավոր վահանակ',exact:true}).click();
 await expect(page.locator('main')).toBeVisible();await page.goto('/?tab=lessons');
 const supported=await page.evaluate(()=>isSecureContext && Boolean(navigator.wakeLock?.request));
 if(supported)await page.evaluate(()=>{
  const request=navigator.wakeLock.request.bind(navigator.wakeLock);
  (window as any).__nativeLocks=[];
  navigator.wakeLock.request=async(type)=>{const lock=await request(type);(window as any).__nativeLocks.push(lock);return lock;};
 });
 await page.getByRole('button',{name:'Սկսել պարապմունքը',exact:true}).click();
 const indicator=page.locator('[data-wake-status]');
 await expect(indicator).toHaveAttribute('data-wake-status',supported?/^(active|denied|released)$/:/^unsupported$/);
 const status=await indicator.getAttribute('data-wake-status');
 testInfo.annotations.push({type:'native-wake-result',description:String(status)});
 await testInfo.attach('native-wake-result',{body:JSON.stringify({supported,status,project:testInfo.project.name}),contentType:'application/json'});
 await page.getByRole('button',{name:'Ընդմիջել դասը',exact:true}).click();
 await expect(indicator).toHaveAttribute('data-wake-status','inactive');
 if(supported)await expect.poll(()=>page.evaluate(()=>(window as any).__nativeLocks.every((lock:WakeLockSentinel)=>lock.released))).toBe(true);
});
