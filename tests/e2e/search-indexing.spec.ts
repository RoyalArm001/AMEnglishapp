import { test, expect } from '@playwright/test';
import { SITE_URL } from '../../lib/site';

test('the public description and canonical are readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    const response = await page.goto('http://127.0.0.1:3015/');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('HayLingo — սովորիր անգլերեն հայերենով');
    await expect(page.getByText(/Անգլերենի անվճար ուսուցում հայախոսների համար/)).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE_URL);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  } finally {
    await context.close();
  }
});

test('sitemap advertises only public canonical content and robots allows it', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])).toEqual([SITE_URL]);
  expect(xml).not.toContain('<lastmod>');
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  expect(await robots.text()).toContain('Allow: /');
});

test('public content remains after hydration and onboarding still saves', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('textbox').nth(0).fill('Search');
  await page.getByRole('textbox').nth(1).fill('Learner');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HayLingo — սովորիր անգլերեն հայերենով');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const submit = page.getByRole('button', { name: 'Պահպանել և անցնել գլխավոր վահանակ', exact: true });
  await submit.click();
  await expect(submit).toHaveCount(0);
  await page.reload();
  await expect(page.locator('main#learning-main')).toBeVisible();
  await expect(submit).toHaveCount(0);
  expect(errors).toEqual([]);
});
