# Phase 2 — Theme

## Scope
`@fieldnote-ui/theme`: light and dark mode, the provider, a no-flash init script, base styles and a
Tailwind 3 preset. Icons (`@fieldnote-ui/icons`) were built alongside because the theme needed the
intent glyphs.

## Architecture
- `FieldNoteProvider` owns the preference (`light`, `dark`, `system`), persists it to `localStorage`
  (`fieldnote-theme`) and writes the resolved theme to `<html data-theme>`.
- Dark mode: `[data-theme="dark"]` sets the dark values. Without an attribute,
  `:root:not([data-theme="light"])` follows `prefers-color-scheme`.
- `themeInitScript()` runs before first paint so dark-mode readers do not see a light flash.
- `useFieldNoteTheme()` returns `preference`, `resolvedTheme` and `setPreference`.
  `useResolvedColorScheme()` is used by the charts to pick hex values.
- Entry points: `@fieldnote-ui/theme` (client, `"use client"`), `@fieldnote-ui/theme/server` (no banner,
  for server components), `styles.css`, `tailwind-preset` (Tailwind 3, JS preset).
- Components are plain CSS with `fn-` classes and `--fn-*` variables. Consumers do not need Tailwind.

## Migration
Consumers with an existing `.dark` class should replace it with the provider (documented in the docs
Migration page, "From a custom dark-mode class").

## Fix made in this phase (commit `cfa3cdc`)
The client bundle carries `"use client"`, so every export becomes a client reference. Calling
`themeInitScript()` or reading tokens from a server component threw. The fix adds banner-free
`server` entries (`@fieldnote-ui/theme/server`, `fieldnote-ui/server`, and `fieldnote-ui/tokens` in the
umbrella). The umbrella root no longer exports tokens.

## Testing
- Theme: 9 tests (provider, preference persistence, init script, system preference via matchMedia
  polyfill). Icons: 5 tests.
- Umbrella `fieldnote-ui`: 3 export tests, including a check that the server entry is banner-free.
- The Next.js docs build (phase 5) exercises the server/client split end to end.

## Accessibility review
- The init script does not change text or focus. Colour-scheme changes do not move focus.
- Focus rings use a dedicated token in both schemes (`--fn-color-focus`: `#2F5A6E` light, `#A9D0E0` dark).

## Screenshots
`screenshots/phase-2/` — overview and getting-started in both schemes. The docs site itself does not
yet expose a theme toggle in its header; the `ThemeToggle` primitive is shown on the Primitives page.

## Implementation summary
Light and dark modes work from one provider, with no flash and a server-safe entry. Built, typechecked
and tested. Open: the Tailwind preset targets v3 only.
