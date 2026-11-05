import { test, expect, Page } from '@playwright/test';
import { DEFAULT_USER_PROGRESS, normalizeAndValidateState } from '../../lib/storage';
import { getCourseLessons } from '../../lib/learning-path';
import { A1_CHAPTERS, A1_FINAL_QUESTIONS } from '../../data/a1-course';
import { EXERCISE_ITEMS } from '../../data/exercises';

async function seedExercises(page: Page, pendingId: string, autoAdvance = false) {
  const state = normalizeAndValidateState(structuredClone(DEFAULT_USER_PROGRESS));
  const lessons = getCourseLessons('A1');
  state.onboardingCompleted = true;
  state.profile.firstName = 'Test';
  state.profile.lastName = 'Learner';
  state.completedLessonIds = lessons.map(lesson => lesson.id);
  state.learningPath.writtenSentenceIds = lessons.flatMap(lesson => lesson.sentences.map(sentence => sentence.id));
  state.learningPath.verifiedSentenceIds = [...state.learningPath.writtenSentenceIds];
  state.learningPath.readingAnswerIds = A1_CHAPTERS.flatMap(chapter => chapter.questions.map(question => question.id));
  state.learningPath.assessmentAnswerIds = A1_FINAL_QUESTIONS.map(question => question.id);
  state.completedExerciseIds = EXERCISE_ITEMS.filter(ex => ex.level === 'A1' && ex.id !== pendingId).map(ex => ex.id);
  state.settings.autoAdvanceExercises = autoAdvance;
  await page.addInitScript(data => {
    if (!localStorage.getItem('am_english_learning_snapshot_v3')) {
      localStorage.setItem('am_english_learning_snapshot_v3', JSON.stringify(data));
    }
  }, state);
  await page.goto('/?tab=exercises');
}

test('completed exercises stay collapsed, respect filters, and remain available for repetition', async ({ page }) => {
  await seedExercises(page, 'ex-2');
  const list = page.locator('details').filter({ hasText: 'Կատարված առաջադրանքներ' });
  const card = page.locator('#current-exercise');
  const total = EXERCISE_ITEMS.filter(ex => ex.level === 'A1').length;
  await expect(list.locator('summary')).toContainText(`(${total - 1})`);
  await expect(list).not.toHaveAttribute('open', '');
  await expect(list.getByRole('button').first()).toBeHidden();
  await expect(card).toContainText('Մենք թիմային հանդիպում ունենք երկուշաբթի օրը։');

  await page.getByRole('button', { name: /Վարժություն Բ:\s*Թարգմանել անգլերեն/ }).click();
  await expect(card).toHaveCount(0);
  await expect(list.locator('summary')).toContainText(`(${EXERCISE_ITEMS.filter(ex => ex.level === 'A1' && ex.type === 'translate').length})`);
  await page.getByRole('button', { name: /Բոլորը:\s*Բոլոր տեսակները/ }).click();
  await card.locator('input').fill('on');
  await card.getByRole('button', { name: 'Ստուգել պատասխանը', exact: true }).click();
  await expect(card).toContainText('Ճիշտ է!');
  await expect(list.locator('summary')).toContainText(`(${total})`);
  await card.getByRole('button', { name: 'Հաջորդ առաջադրանքը', exact: true }).click();
  await expect(card).toHaveCount(0);
  await expect(page.getByText(/Այս ընտրության բոլոր առաջադրանքները կատարված են/)).toBeVisible();

  await list.locator('summary').click();
  await expect(list.getByRole('listitem')).toHaveCount(total);
  await list.getByRole('button').first().click();
  await expect(card).toContainText('Կատարված առաջադրանք');
  await card.locator('input').fill('seven');
  await card.getByRole('button', { name: 'Ստուգել պատասխանը', exact: true }).click();
  await expect(list.locator('summary')).toContainText(`(${total})`);
  await list.locator('summary').click();
  await expect(list.getByRole('button').first()).toBeHidden();
  await page.reload();
  await expect(list.locator('summary')).toContainText(`(${total})`);
  await expect(card).toHaveCount(0);
  await expect(list).not.toHaveAttribute('open', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('auto advance finishes the pending queue without reopening a completed exercise', async ({ page }) => {
  await seedExercises(page, 'ex-1', true);
  const card = page.locator('#current-exercise');
  await card.locator('input').fill('wrong');
  await card.getByRole('button', { name: 'Ստուգել պատասխանը', exact: true }).click();
  await expect(card).toContainText('Ուշադրություն դարձրեք ուղղմանը');
  await card.getByRole('button', { name: 'Հաջորդ առաջադրանքը', exact: true }).click();
  await card.locator('input').fill('seven');
  await card.getByRole('button', { name: 'Ստուգել պատասխանը', exact: true }).click();
  await expect(card).toContainText('Ճիշտ է!');
  await expect(card).toHaveCount(0);
  await expect(page.getByText(/Այս ընտրության բոլոր առաջադրանքները կատարված են/)).toBeVisible();
});
