import { test, expect } from '@playwright/test';
import { DEFAULT_USER_PROGRESS } from '../../lib/storage';

const loginButton = 'Արդեն հաշիվ ունեմ․ մուտք գործել';
const savedProgress = {
  ...structuredClone(DEFAULT_USER_PROGRESS),
  onboardingCompleted: true,
  profile: { ...DEFAULT_USER_PROGRESS.profile, firstName: 'Ani', lastName: 'Saved', updatedAt: 1000 },
  settings: { ...DEFAULT_USER_PROGRESS.settings, updatedAt: 1000 },
  correctAnswersCount: 7,
  lastActiveTimestamp: 1000,
};

test('an existing account signs in from a fresh device without filling the profile', async ({ page }) => {
  let loginRequests = 0;
  let registerRequests = 0;
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/auth/register', async route => {
    registerRequests++;
    await route.fulfill({ status: 500, json: { ok: false } });
  });
  await page.route('**/api/auth/login', async route => {
    loginRequests++;
    expect(route.request().postDataJSON()).toEqual({ email: 'ani@example.com', password: 'test-password' });
    await route.fulfill({ json: { ok: true, user: { id: 'saved-user', email: 'ani@example.com' }, token: 'test-token', progressData: savedProgress } });
  });
  await page.route('**/api/sync*', route => route.fulfill({ json: { ok: true, progressData: savedProgress } }));
  await page.goto('/');
  await expect(page.getByPlaceholder('Օրինակ՝ Արմեն')).toHaveValue('');
  await page.getByRole('button', { name: loginButton, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading')).toHaveText('Մուտք գործել հաշիվ');
  await expect(dialog.getByRole('button', { name: 'Գրանցում (Նոր հաշիվ)' })).toHaveCount(0);
  await dialog.getByLabel('Էլ. փոստ (Email)').fill('ani@example.com');
  await dialog.getByLabel('Գաղտնաբառ (Password)').fill('test-password');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await dialog.getByRole('button', { name: 'Մուտք գործել առցանց բազա', exact: true }).click();
  await expect(page.locator('main#learning-main')).toBeVisible();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem('am_english_learning_snapshot_v3') || '{}');
    return [data.profile?.firstName, data.profile?.lastName, data.correctAnswersCount];
  })).toEqual(['Ani', 'Saved', 7]);
  await page.reload();
  await expect(page.locator('main#learning-main')).toBeVisible();
  expect(loginRequests).toBe(1);
  expect(registerRequests).toBe(0);
  expect(errors).toEqual([]);
});

test('invalid credentials show an error and closing preserves the unfinished profile', async ({ page }) => {
  await page.route('**/api/auth/login', route => route.fulfill({ status: 401, json: { ok: false, errorAm: 'Սխալ էլ. փոստ կամ գաղտնաբառ։' } }));
  await page.goto('/');
  await page.getByPlaceholder('Օրինակ՝ Արմեն').fill('Draft');
  await page.getByRole('button', { name: loginButton, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Էլ. փոստ (Email)').fill('ani@example.com');
  await dialog.getByLabel('Գաղտնաբառ (Password)').fill('wrong-password');
  await dialog.getByRole('button', { name: 'Մուտք գործել առցանց բազա', exact: true }).click();
  await expect(dialog.getByRole('alert')).toHaveText('Սխալ էլ. փոստ կամ գաղտնաբառ։');
  expect(await page.evaluate(() => localStorage.getItem('haylingo_cloud_session_v1'))).toBeNull();
  await dialog.getByRole('button', { name: 'Փակել', exact: true }).click();
  await expect(page.getByPlaceholder('Օրինակ՝ Արմեն')).toHaveValue('Draft');
});

test('an account without saved progress signs in and can complete its profile', async ({ page }) => {
  let writes = 0;
  await page.route('**/api/auth/login', route => route.fulfill({ json: { ok: true, user: { id: 'empty-user', email: 'empty@example.com' }, token: 'test-token', progressData: null } }));
  await page.route('**/api/sync*', async route => {
    if (route.request().method() === 'POST') writes++;
    await route.fulfill({ json: { ok: true, progressData: null } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: loginButton, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Էլ. փոստ (Email)').fill('empty@example.com');
  await dialog.getByLabel('Գաղտնաբառ (Password)').fill('test-password');
  await dialog.getByRole('button', { name: 'Մուտք գործել առցանց բազա', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('empty@example.com');
  expect(writes).toBe(0);
  await page.getByPlaceholder('Օրինակ՝ Արմեն').fill('New');
  await page.getByPlaceholder('Օրինակ՝ Հակոբյան').fill('Learner');
  await page.getByRole('button', { name: 'Պահպանել և անցնել գլխավոր վահանակ', exact: true }).click();
  await expect(page.locator('main#learning-main')).toBeVisible();
});
