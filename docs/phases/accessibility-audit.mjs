import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = process.env.BASE || 'http://localhost:3000';
const routes = (process.env.ROUTES || '/,/philosophy,/principles,/getting-started,/foundations,/components,/components/observation-card,/components/evidence-card,/components/insight-card,/components/decision-card,/components/learning-card,/components/field-note,/components/notebook-card,/components/experiment-card,/components/research-card,/components/knowledge-node,/components/insight-cluster,/components/learning-record,/components/evidence-timeline,/components/decision-panel,/components/primitives,/layouts,/navigation,/charts,/accessibility,/examples,/migration,/versioning,/nope').split(',');
const theme = process.env.THEME || 'light';
const shots = process.env.SHOTS || '';
const shotDir = process.env.SHOT_DIR || '';

const browser = await puppeteer.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true, defaultViewport: { width: 1280, height: 900 } });
const results = [];
for (const route of routes) {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('fieldnote-theme', t); } catch (e) {} }, theme);
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  const resp = await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.addScriptTag({ content: axeSource });
  const axeRes = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes.slice(0, 2).map((n) => n.target.join(' ')) }));
  });
  const scheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  results.push({ route, status: resp.status(), theme: scheme, violations: axeRes, consoleErrors });
  if (shots && shotDir) {
    const name = (route === '/' ? 'index' : route.replace(/^\//, '').replace(/\//g, '--')) + '.png';
    await page.screenshot({ path: `${shotDir}/${theme}-${name}`, fullPage: shots === 'full' });
  }
  await page.close();
}
await browser.close();
writeFileSync(process.env.OUT || '/tmp/shot/audit.json', JSON.stringify(results, null, 2));
for (const r of results) console.log(r.status, r.route, 'theme=' + r.theme, 'violations=' + r.violations.length, r.violations.map((v) => v.id + '(' + v.impact + ',' + v.nodes + ')').join(' ') || '', r.consoleErrors.length ? 'CONSOLE:' + r.consoleErrors.slice(0,2).join(' | ') : '');
