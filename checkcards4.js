const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const box = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('section'));
    const el = secs.find(s => getComputedStyle(s).backgroundColor.includes('219') || s.className.includes('DBDBDB'));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  if (box) {
    await page.evaluate((y) => window.scrollTo(0, y - 20), box.top);
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'C:/Users/anton/AppData/Local/Temp/claude/c--Users-anton-Desktop-b2b-polarizedx/8d01d2ec-2a3b-424b-a06e-874de392e334/scratchpad/cards4.png', clip: { x: 0, y: 0, width: 1440, height: Math.min(900, box.height + 60) } });
    console.log('screenshot taken');
  }
  await browser.close();
})();
