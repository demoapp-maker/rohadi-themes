# Phase 3 — Components

## Scope
`@fieldnote-ui/ui` (cards, primitives, decision panel, evidence timeline) and `@fieldnote-ui/charts`
(five notebook-styled charts). Umbrella `fieldnote-ui` re-exports them.

## Architecture
- Cards share one frame (`CardFrame`): an `<article>` labelled by its heading, a kicker row with
  `IntentBadge` (icon + text) and an optional status chip, a body and a footer.
- Primary cards: ObservationCard, EvidenceCard, InsightCard, DecisionCard, LearningCard.
  Knowledge and research: FieldNote, NotebookCard, ExperimentCard, ResearchCard, KnowledgeNode,
  InsightCluster, LearningRecord. Structures: EvidenceTimeline (ordered list), DecisionPanel (native
  radio group, rationale field, status region).
- Primitives: IntentBadge, StatusChip, Tag, Meter (`role="meter"`), Button, ThemeToggle.
- Charts wrap Recharts 3.10.1 in `ChartFigure`: a `figure` with a `role="img"` canvas named by a
  plain-language summary, and a `details` data table. Series colours resolve from the tokens for the
  current scheme (SVG `var()` is unreliable). Animations are disabled.
- Chart API: ObservationChart, EvidenceChart (horizontal bars), InsightTrendChart (0–1 axis fixed
  at 0–100%), DecisionImpactChart (signed around zero), LearningChart (stacked confirmed/mixed/refuted).

## Migration
No prior API. Mapping from generic cards is in the docs Migration page.

## Testing
- ui: 30 tests. Role-based queries, user-event interactions, and axe-core on every component as a page
  section. A negative control confirms axe fails on an inaccessible control.
- charts: 9 tests (figure labelling, summaries, signed values, empty data, palette per scheme).
- Test stack: vitest 3.2.7, jsdom 26, @testing-library/react 16.3, @testing-library/dom 10.4,
  user-event 14.6, @testing-library/jest-dom 7.0.1, axe-core 4.14.0.
- Decision made: charts do not run axe in jsdom. Their accessibility is covered by the figure/table
  tests and by the browser audit in phase 5, which runs colour-contrast checks jsdom cannot.

## Accessibility review
- Intent and status are text, never colour alone. Meter exposes its value. Clickable cards use a single
  stretched link. Decision options are native radios; arrow keys work without custom code.
- Reduced motion: base styles shorten animation under `prefers-reduced-motion`.

## Screenshots
`screenshots/phase-3/` — components index, decision panel, primitives, decision card, charts, in both
schemes.

## Implementation summary
Fifteen primitives and five charts built, typed, documented in the docs site and tested. Known gaps:
manual screen-reader testing not yet run (see phase 5); forced-colours mode not verified.
