# Phase 4 — Layouts

## Scope
`@fieldnote-ui/layouts`: NotebookLayout, ObservatoryLayout, AssistantLayout, WorkspaceLayout,
ResearchLayout, GardenLayout, plus navigation (KnowledgeNav, ThinkingLoop, Breadcrumbs) and the
SkipLink.

## Architecture
- Every layout renders a `SkipLink` and a single `main` (`mainId`, default `main`), and one h1 from its
  `title`.
- Layouts are CSS grid, defined in `styles.css` with named regions (nav, main, aside, margin, etc.).
- Below 64rem the grid collapses to one column in reading order: heading, navigation, main, then
  supporting regions. Navigation stacks above content; it is not hidden.
- Navigation follows the thinking loop: Observe, Interpret, Decide, Learn (`THINKING_STAGES`).
  `ThinkingLoop` marks the current stage with `aria-current="step"`. `KnowledgeNav` marks the
  current page with `aria-current="page"`.
- The docs site (`apps/docs`) uses NotebookLayout and KnowledgeNav for its own frame.

## Migration
None; new package. Layouts depend on `@fieldnote-ui/ui` styles, so import the layouts stylesheet
alongside the theme and UI stylesheets (the umbrella does this in one import).

## Testing
- 13 tests: each layout renders one main and a skip link; navigation current-state attributes; WorkspaceLayout
  toolbar role; axe-core run across all layouts. Contrast is excluded from the jsdom axe run and
  covered by the browser audit (phase 5).

## Accessibility review
- Skip link targets the main landmark. Navigation regions are labelled `nav` elements.
- Focus is visible; `:focus:not(:focus-visible)` removes the outline on the main element only.

## Screenshots
`screenshots/phase-4/` — layouts page (schematics, props) and navigation page, both schemes.

## Implementation summary
Six layouts and the navigation set built and tested. Open: the layouts have not been checked in
right-to-left or forced-colours modes.
