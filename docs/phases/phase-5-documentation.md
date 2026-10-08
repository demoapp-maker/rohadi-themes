# Phase 5 — Documentation site

## Scope
`apps/docs` (Next.js 16.4, React 19), a documentation site that explains why FieldNote exists and how to
use it: philosophy, principles, getting started, foundations, component reference, layouts, navigation,
charts, accessibility, example applications (planned), migration and versioning.

## Architecture
- App Router, statically prerendered. 28 routes, including 15 component pages generated from
  `lib/registry.tsx` through `generateStaticParams`, plus the 404 page.
- Pages are server components. They import client components from `fieldnote-ui` and server-safe
  tokens and helpers from `fieldnote-ui/server`.
- `lib/registry.tsx` holds the component docs (props, examples, accessibility notes). Each example has a
  live preview and its source (`Example` component).
- Navigation (`lib/nav.ts`) is grouped Begin, Foundations, Components, Patterns, Practice.
- The site uses the system for its own chrome (NotebookLayout, KnowledgeNav), so it is also a
  consumer-level test.
- `apps/playground` is planned in the layout but is not created yet.

## Migration
Documented in the site (Migration page): from generic cards, KPI dashboards, shadcn/ui, custom dark-mode
classes, and token import paths.

## Testing and review
- `next build` passes with no warnings. `tsc --noEmit` passes.
- Browser audit (`accessibility-audit.mjs`) with headless Chromium 153 (`@sparticuz/chromium`) and
  axe-core 4.14.0, on every route, in light and dark mode, with the WCAG 2.0/2.1/2.2 A and AA tags plus
  best-practice. Each page ran about 47 passing rules (measured on the Decision Panel page).
  - Light: 0 violations on all 28 routes; the unknown-path 404 logs one expected console error.
  - Dark: 0 violations on all 28 routes.
  - Control: an injected low-contrast element is flagged, so the zero counts are not vacuous.
- Results: `accessibility-audit-light.json`, `accessibility-audit-dark.json`.

Running the audit: install `@sparticuz/chromium`, `puppeteer-core` and `axe-core` in a scratch folder, start the
docs site, then run `node accessibility-audit.mjs` with `BASE`, `THEME` and `OUT` set as needed. On a
system without the Chromium shared libraries, point `LD_LIBRARY_PATH` at the extracted `al2023` libraries
from the package.

## Accessibility review
- Every page has one h1, a labelled navigation region, a skip link, and a main landmark.
- Code blocks and wide tables are keyboard-focusable scroll regions with labels.
- Corrections made after review: removed claims that were not implemented (a disclosure menu for
  narrow navigation; an "axe-tested every chart" claim, since charts are covered by unit tests and the
  browser audit rather than jsdom axe); corrected the ThinkingLoop `aria-current` value to `step`.
- Known limits, stated on the Accessibility page: no manual screen-reader pass yet; RTL not verified;
  forced-colours not verified; chart summaries are one sentence.

## Screenshots
`screenshots/phase-5/` — philosophy, principles, accessibility (both schemes), migration, versioning,
examples.

## Implementation summary
Documentation site complete for the phase scope, building and passing the browser audit in both schemes.
Open: manual screen-reader and keyboard review; example applications (phase 6) are listed as planned.
