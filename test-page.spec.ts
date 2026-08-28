import { test, expect } from '@playwright/test';

test('check auth page', async ({ page }) => {
  const consoleLogs: string[] = [];
  page.on('console', msg => consoleLogs.push(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', error => consoleLogs.push(`pageerror: ${error.message}`));
  
  await page.goto('http://localhost:3000/auth/register');
  await page.waitForTimeout(3000);
  
  const hasOpacity0 = await page.evaluate(() => {
    return document.querySelectorAll('[style*="opacity: 0"]').length;
  });
  
  const bodyText = await page.evaluate(() => document.body.innerText);
  
  console.log('opacity:0 count:', hasOpacity0);
  console.log('body text:', bodyText.substring(0, 300));
  console.log('logs:', consoleLogs.join('\n'));
});
