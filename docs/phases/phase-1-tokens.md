# Phase 1 — Design tokens

## Scope
`@fieldnote-ui/tokens`: the single source of truth for colour, type, spacing, radius, shadow,
motion and breakpoints, in TypeScript, CSS custom properties and JSON.

## Architecture
- `src/` modules: `colors.ts` (intents folded in), `typography.ts`, `spacing.ts`, `radius.ts`,
  `shadow.ts`, `animation.ts`, `breakpoints.ts`, `css.ts`, `contrast.ts`, `tokens.ts`, `index.ts`.
- Outputs: `dist/index.{js,cjs,d.ts}`, `dist/variables.css` (`--fn-*`), `dist/tokens.json`.
- Light and dark schemes are generated from the same `ColorScheme` shape (`lightColors`, `darkColors`).
- Brand values from the brief are kept as fills, surfaces and borders. Where a colour is also used as
  text, a deeper `…Text` variant is used so the text meets WCAG AA. Example: brief `#5B7F6A` success
  is 4.05:1 on paper, so text uses `#466B54` (5.44:1).
- `contrastRatio`, `relativeLuminance`, `meetsContrast`, `WCAG_MINIMUM` are exported so docs and
  consumers verify pairings with the same code the tests use.

## Migration
None; first release of the tokens. Note for later readers: the root `fieldnote-ui` entry no longer
exports tokens (see the phase 2 record for why).

## Testing
- 111 tests (`pnpm --filter @fieldnote-ui/tokens test`), including a contrast suite that asserts every
  text pairing ≥ 4.5:1 and every non-text pairing ≥ 3:1 in both schemes.
- Two corrections made during the phase: a spacing expectation (`--fn-space-4` is 1rem, not 0.25rem),
  and the contrast utility tests added at the end of the phase.

## Accessibility review
- Text and non-text pairings verified; results appear on the docs Foundations and Accessibility pages.
- Intent colours are never the only signal. Each intent has a name and glyph (phase 3).

## Screenshots
`screenshots/phase-1/light-foundations.png`, `dark-foundations.png` (colour, type and contrast tables).

## Implementation summary
Token set complete for colour, type, space, radius, shadow, motion. Built, typechecked and tested.
Open: none blocking.
