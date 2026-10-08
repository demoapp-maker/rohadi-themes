import { contrastRatio, lightColors, darkColors, WCAG_MINIMUM } from 'fieldnote-ui/server';
import { DocsPage } from '../../components/docs-page';

const checks = [
  ['Text contrast', `Normal text meets ${WCAG_MINIMUM.text}:1 in both schemes. Each text colour is checked by the token test suite.`],
  ['Non-text contrast', `Focus rings and control borders meet ${WCAG_MINIMUM.nonText}:1 against their background.`],
  ['Colour is not the only cue', 'Intents are named in text with a glyph. Status, outcome and strength are written out, and meters expose their values.'],
  ['Keyboard', 'Every interactive element is a native control or has equivalent keyboard behaviour. Decision options use a radio group, so arrow keys work.'],
  ['Focus visible', 'Focus rings use a dedicated colour token in both schemes and are never removed without a replacement.'],
  ['Skip link', 'Every layout renders a skip link to its main landmark, and the docs site uses the same pattern.'],
  ['Reduced motion', 'Chart animations are disabled. Other motion is shortened to near-instant when the reader prefers reduced motion.'],
  ['Structure', 'One h1 per page, headings in order, labelled landmarks, and cards as labelled articles.'],
  ['Status messages', 'Recorded decisions are announced through a status region.'],
];

export default function AccessibilityPage() {
  const rows = [
    ['Primary text on paper', lightColors.textPrimary, lightColors.paper, WCAG_MINIMUM.text],
    ['Secondary text on surface', lightColors.textSecondary, lightColors.surface, WCAG_MINIMUM.text],
    ['Primary action on paper', lightColors.primary, lightColors.paper, WCAG_MINIMUM.text],
    ['Focus ring on paper (light)', lightColors.focus, lightColors.paper, WCAG_MINIMUM.nonText],
    ['Primary text on paper (dark)', darkColors.textPrimary, darkColors.paper, WCAG_MINIMUM.text],
    ['Primary action on paper (dark)', darkColors.primary, darkColors.paper, WCAG_MINIMUM.text],
    ['Focus ring on paper (dark)', darkColors.focus, darkColors.paper, WCAG_MINIMUM.nonText],
  ] as const;

  return (
    <DocsPage
      active="/accessibility"
      title="Accessibility"
      eyebrow="Practice"
      description="WCAG 2.2 AA is the minimum for every component, layout and chart. It is a requirement for release, not a later pass."
    >
      <p className="docs-lede">
        Decision tools are used under pressure, by people with very different ways of reading a screen. If a component
        can only be understood by sight or by mouse, it is not finished.
      </p>

      <h2>What we commit to</h2>
      <div className="docs-table-wrap" role="region" aria-label="Accessibility commitments, scrollable" tabIndex={0}>
        <table className="docs-table">
          <caption>Commitments checked for every component</caption>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Commitment</th>
            </tr>
          </thead>
          <tbody>
            {checks.map(([area, text]) => (
              <tr key={area}>
                <th scope="row">{area}</th>
                <td>{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Contrast, computed</h2>
      <p>
        These ratios come from the same functions the test suite uses. If a token changes and a pairing falls below its
        minimum, the tokens test suite fails.
      </p>
      <div className="docs-table-wrap" role="region" aria-label="Selected contrast results, scrollable" tabIndex={0}>
        <table className="docs-table">
          <caption>Selected contrast results</caption>
          <thead>
            <tr>
              <th scope="col">Pairing</th>
              <th scope="col">Ratio</th>
              <th scope="col">Minimum</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fg, bg, min]) => {
              const ratio = contrastRatio(fg, bg);
              const ok = ratio >= min;
              return (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{ratio.toFixed(2)}:1</td>
                  <td>{min}:1</td>
                  <td className={ok ? 'docs-contrast-pass' : 'docs-contrast-fail'}>{ok ? 'Pass' : 'Fail'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>How it is tested</h2>
      <ul>
        <li>
          <strong>Automated rules.</strong> The UI and layout suites run <code>axe-core</code> against rendered components.
          A negative control confirms the check really fails on broken markup. Contrast is excluded from those jsdom runs
          because jsdom cannot compute it; contrast is tested separately, below.
        </li>
        <li>
          <strong>Behaviour.</strong> Tests use role-based queries, the same way assistive technology finds elements, and
          exercise interaction with user-event. Chart tests check that each figure has a summary and a data table.
        </li>
        <li>
          <strong>Tokens.</strong> Contrast of the text and non-text pairings in the token set is asserted in the tokens test suite.
        </li>
        <li>
          <strong>Review.</strong> A manual keyboard and screen-reader pass is planned before each release. It is not yet
          part of the release process, and it does not replace the automated tests.
        </li>
      </ul>

      <h2>Known limits</h2>
      <p>These are stated plainly so that you can plan around them.</p>
      <ul>
        <li>Manual screen-reader testing has not yet been run across all browser and assistive technology pairs. It is planned for the release review.</li>
        <li>Right-to-left layout is not yet verified.</li>
        <li>Charts summarise data in one sentence. Long series should also be described in the surrounding text.</li>
        <li>Forced-colours (Windows High Contrast) mode has not been verified.</li>
      </ul>

      <h2>When you build your own component</h2>
      <div className="docs-callout">
        <p>
          Use a native element first. Give it a visible name. Make sure every state is available by keyboard. Do not use
          colour as the only signal. Test it with the same axe-core setup the library uses, and add a case to your own test
          suite before you ship.
        </p>
      </div>
    </DocsPage>
  );
}
