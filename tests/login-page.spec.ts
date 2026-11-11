import { test, expect } from '@playwright/test';
test('Login Page Test', async ({ page }) => {
    await page.goto('https://login.salesforce.com/?login=1');
    await expect(page).toHaveTitle(/Salesforce/);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
});

test('Forgot password link opens the reset page', async ({ page }) => {
    await page.goto('https://login.salesforce.com/?login=1');
    await page.getByRole('link', { name: 'Forgot Your Password?' }).click();
    await expect(page).toHaveURL(/forgotpassword/);
    await expect(page.getByRole('heading', { name: 'Reset Your Password' })).toBeVisible();
});

test('Password screen appears after entering a username', async ({ page }) => {
    await page.goto('https://login.salesforce.com/?login=1');
    // Act like a user: fake username, then Log In
    await page.getByRole('textbox', { name: 'Username' }).fill('demo.user@example.com');
    await page.getByRole('button', { name: 'Log In' }).click();
    // Priority 1: password box by its role and name
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});
