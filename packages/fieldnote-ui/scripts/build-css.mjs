// Concatenates every package stylesheet into one dist/styles.css, in dependency order:
// tokens + base (theme) → icons (none) → ui → layouts → charts.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(resolve(root, 'package.json'));
const sheets = [
  '@fieldnote-ui/theme/styles.css',
  '@fieldnote-ui/ui/styles.css',
  '@fieldnote-ui/layouts/styles.css',
  '@fieldnote-ui/charts/styles.css',
];
const parts = sheets.map((id) => `/* ===== ${id} ===== */\n${readFileSync(require.resolve(id), 'utf8')}`);
mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(resolve(root, 'dist/styles.css'), `/* fieldnote-ui — complete stylesheet */\n${parts.join('\n\n')}\n`);
console.log(`[fieldnote-ui] wrote dist/styles.css from ${sheets.length} sheets`);
