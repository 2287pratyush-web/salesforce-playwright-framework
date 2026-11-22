import { test, expect } from '@playwright/test';

test('Heading appears after the spinner (flaky)', async ({ page }) => {
  await page.setContent(`<p id="spinner">Loading...</p>
      <script>setTimeout(() => {
        document.body.insertAdjacentHTML('beforeend', '<h1>Account saved</h1>');
      }, 300 + Math.random() * 600);</script>`);
  await expect(page.getByRole('heading', { name: 'Account saved' })).toBeVisible();

  await page.setContent(`<button id="b" disabled>Save</button>
      <script>setTimeout(() => { document.getElementById('b').disabled = false; },
      300 + Math.random() * 600);</script>`);
  await page.getByRole('button', { name: 'Save' }).click();
});

test('Save shows the success message (solo)', async ({ page }) => {
  await page.setContent(`<button id="b">Save</button>
    <script>document.getElementById('b').addEventListener('click', () => {
      setTimeout(() => { document.body.insertAdjacentHTML('beforeend', '<div role="alert">Record saved</div>'); },
      300 + Math.random() * 600);
    });</script>`);

  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText('Record saved');
});
