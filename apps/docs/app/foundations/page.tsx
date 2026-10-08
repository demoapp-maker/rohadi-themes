import { contrastRatio, lightColors, darkColors, intents, space, radius, shadow, duration, textRoles, fontSize, fontFamily, WCAG_MINIMUM } from 'fieldnote-ui/server';
import { DocsPage } from '../../components/docs-page';
import { Swatch } from '../../components/swatch';
import { CodeBlock } from '../../components/code-block';

const SWATCHES = [
  { key: 'paper', name: 'Paper', note: 'Page background.' },
  { key: 'surface', name: 'Surface', note: 'Cards and panels.' },
  { key: 'textPrimary', name: 'Text primary', note: 'Body and headings.' },
  { key: 'textSecondary', name: 'Text secondary', note: 'Supporting text.' },
  { key: 'border', name: 'Border', note: 'Hairlines and decoration only.' },
  { key: 'primary', name: 'Primary', note: 'Actions and links.' },
  { key: 'success', name: 'Success', note: 'Indicator fill. Use successText for text.' },
  { key: 'focus', name: 'Focus', note: 'Focus rings.' },
] as const;

type Scheme = 'light' | 'dark';

function pairs(scheme: Scheme) {
  const c = scheme === 'light' ? lightColors : darkColors;
  const rows: Array<{ label: string; fg: string; bg: string; min: number }> = [
    { label: 'Primary text on paper', fg: c.textPrimary, bg: c.paper, min: WCAG_MINIMUM.text },
    { label: 'Secondary text on surface', fg: c.textSecondary, bg: c.surface, min: WCAG_MINIMUM.text },
    { label: 'Tertiary text on paper', fg: c.textTertiary, bg: c.paper, min: WCAG_MINIMUM.text },
    { label: 'Primary action on paper', fg: c.primary, bg: c.paper, min: WCAG_MINIMUM.text },
    { label: 'Text on primary button', fg: c.onPrimary, bg: c.primary, min: WCAG_MINIMUM.text },
    { label: 'Success text on paper', fg: c.successText, bg: c.paper, min: WCAG_MINIMUM.text },
    { label: 'Danger text on paper', fg: c.dangerText, bg: c.paper, min: WCAG_MINIMUM.text },
    { label: 'Focus ring on paper', fg: c.focus, bg: c.paper, min: WCAG_MINIMUM.nonText },
    { label: 'Control border on surface', fg: c.borderStrong, bg: c.surface, min: WCAG_MINIMUM.nonText },
  ];
  for (const intent of intents) {
    const i = c.intents[intent];
    rows.push({ label: `${intent} text on its tint`, fg: i.text, bg: i.tint, min: WCAG_MINIMUM.text });
    rows.push({ label: `${intent} accent (graphics) on paper`, fg: i.accent, bg: c.paper, min: WCAG_MINIMUM.nonText });
  }
  return rows.map((r) => ({ ...r, ratio: contrastRatio(r.fg, r.bg) }));
}

export default function FoundationsPage() {
  const lightPairs = pairs('light');
  const darkPairs = pairs('dark');
  return (
    <DocsPage
      active="/foundations"
      title="Tokens and colour"
      eyebrow="Foundations"
      description="Every value in FieldNote is a token. Components read CSS variables, so a token change reaches every component, and both colour schemes are generated from one source."
    >
      <h2>Colour</h2>
      <p>
        The brief’s paper, text and primary colours are kept as the fills and surfaces they were chosen for. Where a colour
        is also used for text, a slightly deeper variant is used so the text meets WCAG AA. The pairings below are
        computed from the shipped tokens, not typed in by hand.
      </p>

      <h3>Light</h3>
      <ul className="docs-swatches">
        {SWATCHES.map((s) => (
          <Swatch key={s.key} name={s.name} token={`--fn-color-${kebab(s.key)}`} value={lightColors[s.key]} note={s.note} />
        ))}
      </ul>

      <h3>Dark</h3>
      <ul className="docs-swatches" data-theme="dark">
        {SWATCHES.map((s) => (
          <Swatch key={s.key} name={s.name} token={`--fn-color-${kebab(s.key)}`} value={darkColors[s.key]} note={s.note} />
        ))}
      </ul>

      <h2>Intent colours</h2>
      <p>
        Each intent has four values: an accent for marks and chart series, a text colour, a tint for backgrounds, and a
        border. Intent is always named in text and marked with a glyph, so these colours are never the only signal.
      </p>
      <div className="docs-table-wrap" role="region" aria-label="Intent colours, scrollable" tabIndex={0}>
        <table className="docs-table">
          <caption>Intent palette, light mode</caption>
          <thead>
            <tr>
              <th scope="col">Intent</th>
              <th scope="col">Accent</th>
              <th scope="col">Text</th>
              <th scope="col">Tint</th>
              <th scope="col">Border</th>
            </tr>
          </thead>
          <tbody>
            {intents.map((intent) => {
              const i = lightColors.intents[intent];
              return (
                <tr key={intent}>
                  <th scope="row">{intent}</th>
                  <td>
                    <code>{i.accent}</code>
                  </td>
                  <td>
                    <code>{i.text}</code>
                  </td>
                  <td>
                    <code>{i.tint}</code>
                  </td>
                  <td>
                    <code>{i.border}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Contrast</h2>
      <p>
        Text needs at least {WCAG_MINIMUM.text}:1 against its background. Non-text indicators, focus rings and control
        borders need {WCAG_MINIMUM.nonText}:1. Results are computed with <code>contrastRatio</code> from{' '}
        <code>fieldnote-ui/server</code>, the same function the test suite uses.
      </p>
      <ContrastTable title="Light mode contrast" rows={lightPairs} />
      <ContrastTable title="Dark mode contrast" rows={darkPairs} />

      <h2>Typography</h2>
      <p>
        Headings use a serif (Source Serif 4) to make notebook pages feel like pages. Interface text uses Inter, and
        measurements use JetBrains Mono so numbers line up.
      </p>
      <div className="docs-stack">
        <p style={{ fontFamily: fontFamily.display, fontSize: fontSize.xl.size, margin: 0 }}>Display: what the evidence suggests</p>
        <p style={{ fontFamily: fontFamily.body, margin: 0 }}>Body: Interface and running text read in Inter at comfortable line length.</p>
        <p style={{ fontFamily: fontFamily.mono, fontSize: fontSize.sm.size, margin: 0 }}>Data: 2.4× · 0.72 · 2026-10-08</p>
      </div>
      <p>Text roles defined by the tokens:</p>
      <ul>
        {Object.entries(textRoles).map(([role, r]) => (
          <li key={role}>
            <code>{role}</code>: {r.family}, {r.size}, {r.weight}
          </li>
        ))}
      </ul>

      <h2>Space, radius, shadow and motion</h2>
      <div className="docs-two-col">
        <div>
          <h3>Spacing</h3>
          <ul>
            {Object.entries(space)
              .filter(([k]) => /^\d+(\.\d+)?$|^px$/.test(k))
              .slice(0, 12)
              .map(([k, v]) => (
                <li key={k}>
                  <code>--fn-space-{k.replace('.', '-')}</code>: {v}px
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h3>Radius</h3>
          <ul>
            {Object.entries(radius).map(([k, v]) => (
              <li key={k}>
                <code>{k}</code>: {v}
              </li>
            ))}
          </ul>
          <h3>Motion</h3>
          <ul>
            {Object.entries(duration).map(([k, v]) => (
              <li key={k}>
                <code>duration.{k}</code>: {v}
              </li>
            ))}
          </ul>
          <p>
            Shadows are soft and warm, and there are {Object.keys(shadow.light).length} steps per scheme. Motion is
            disabled under <code>prefers-reduced-motion</code>.
          </p>
        </div>
      </div>

      <h2>Using tokens in your code</h2>
      <CodeBlock
        label="Tokens in TypeScript and CSS"
        code={`import { tokens, intents } from 'fieldnote-ui/server';

// TypeScript: typed, autocompleted, safe for server components
const paper = tokens.color.light.paper;

// CSS: the same values as variables
.my-note {
  background: var(--fn-color-surface);
  border: 1px solid var(--fn-intent-evidence-border);
}`}
      />
    </DocsPage>
  );
}

function kebab(s: string) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function ContrastTable({ title, rows }: { title: string; rows: Array<{ label: string; fg: string; bg: string; min: number; ratio: number }> }) {
  return (
    <div className="docs-table-wrap" role="region" aria-label={`${title}, scrollable`} tabIndex={0}>
      <table className="docs-table">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Pairing</th>
            <th scope="col">Foreground</th>
            <th scope="col">Background</th>
            <th scope="col">Ratio</th>
            <th scope="col">Required</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ok = r.ratio >= r.min;
            return (
              <tr key={`${r.label}-${r.fg}-${r.bg}`}>
                <th scope="row">{r.label}</th>
                <td>
                  <code>{r.fg}</code>
                </td>
                <td>
                  <code>{r.bg}</code>
                </td>
                <td>{r.ratio.toFixed(2)}:1</td>
                <td>{r.min}:1</td>
                <td className={ok ? 'docs-contrast-pass' : 'docs-contrast-fail'}>{ok ? 'Pass' : 'Fail'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
