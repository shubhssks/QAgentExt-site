// Render tools/social-card.html to public/assets/social-card.png at the
// Open Graph size, 1200 x 630. Playwright comes from the extension repository:
//
//   node tools/render-social-card.cjs D:/Workplace/QAgentExt
//
// Run it again whenever the card's copy, palette or screenshot changes.
const path = require('path');
const { pathToFileURL } = require('url');

const extensionRepo = process.argv[2];
if (!extensionRepo) { console.error('usage: node tools/render-social-card.cjs <path to the QAgentExt repository>'); process.exit(2); }
const { chromium } = require(path.join(path.resolve(extensionRepo), 'node_modules', '@playwright', 'test'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(__dirname, 'social-card.html')).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, '..', 'public', 'assets', 'social-card.png');
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log(`wrote ${out}`);
})().catch(error => { console.error(error); process.exit(1); });
