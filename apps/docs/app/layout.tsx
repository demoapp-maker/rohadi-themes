import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { FieldNoteProvider } from 'fieldnote-ui';
import { themeInitScript } from 'fieldnote-ui/server';
import '@fontsource-variable/inter/index.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/600.css';
import '@fontsource/jetbrains-mono/400.css';
import 'fieldnote-ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FieldNote UI',
    template: '%s · FieldNote UI',
  },
  description:
    'A design system for decision intelligence. Observe, interpret, decide and learn, with calm, accessible components.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so dark-mode readers never see a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>
        <FieldNoteProvider>{children}</FieldNoteProvider>
      </body>
    </html>
  );
}
