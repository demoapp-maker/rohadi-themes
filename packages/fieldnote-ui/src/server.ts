/**
 * fieldnote-ui/server — server-safe exports (no "use client").
 * Use these in React Server Components: tokens, the CSS generator and the no-flash theme script.
 */
export * from '@fieldnote-ui/tokens';
export { themeInitScript, DEFAULT_STORAGE_KEY, THEME_PREFERENCES, type ThemePreference, type ResolvedTheme } from '@fieldnote-ui/theme/server';
