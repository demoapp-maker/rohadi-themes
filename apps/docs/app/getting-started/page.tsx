import Link from 'next/link';
import { DocsPage } from '../../components/docs-page';
import { CodeBlock } from '../../components/code-block';

const install = `pnpm add fieldnote-ui
# or
npm install fieldnote-ui`;

const providerSetup = `// app/layout.tsx (Next.js App Router)
import { FieldNoteProvider } from 'fieldnote-ui';
import { themeInitScript } from 'fieldnote-ui/server';
import 'fieldnote-ui/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>
        <FieldNoteProvider>{children}</FieldNoteProvider>
      </body>
    </html>
  );
}`;

const firstPage = `// app/page.tsx
import { NotebookLayout, DecisionPanel, InsightCard } from 'fieldnote-ui';

export default function Page() {
  return (
    <NotebookLayout title="Posting schedule" eyebrow="Account study">
      <InsightCard title="Tuesday reach holds" confidence={0.72} evidenceCount={4}>
        Reach on Tuesday posts stayed above the weekly average for three weeks.
      </InsightCard>
      <DecisionPanel
        question="How often should the account post?"
        options={[
          { id: 'daily', label: 'Daily' },
          { id: 'twice', label: 'Twice a week', description: 'Matches the Tuesday evidence.' },
        ]}
      />
    </NotebookLayout>
  );
}`;

const tailwindPreset = `// tailwind.config.cjs
module.exports = {
  presets: [require('fieldnote-ui/tailwind-preset')],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
};`;

export default function GettingStartedPage() {
  return (
    <DocsPage
      active="/getting-started"
      title="Getting started"
      eyebrow="Begin"
      description="From an empty app to a decision page in four steps. You do not need to design the UI first."
    >
      <h2>Requirements</h2>
      <ul>
        <li>Node.js 22 or later, with pnpm, npm or yarn.</li>
        <li>React 19 and React DOM 19. Next.js 15 or later for the App Router examples.</li>
        <li>No Tailwind is required. Tailwind users can add the preset, described below.</li>
      </ul>

      <h2>1. Install</h2>
      <p>
        The <code>fieldnote-ui</code> package contains everything: tokens, theme, components, layouts and charts. You can
        also install individual <code>@fieldnote-ui/*</code> packages if you only need part of it.
      </p>
      <CodeBlock code={install} label="Install" language="sh" />

      <h2>2. Add the provider and the stylesheet</h2>
      <p>
        The provider owns the light and dark preference and writes it to <code>data-theme</code> on <code>&lt;html&gt;</code>.
        The init script sets that attribute before first paint, so people who prefer dark mode do not see a flash of light
        paper. Import the server-safe helpers from <code>fieldnote-ui/server</code>; the root entry is a client module.
      </p>
      <CodeBlock code={providerSetup} label="Root layout" />

      <h2>3. Build a page</h2>
      <p>
        Use a layout for the frame, then compose primitives inside it. The layout provides the single <code>main</code>{' '}
        landmark, a skip link and the page heading.
      </p>
      <CodeBlock code={firstPage} label="First page" />

      <h2>4. Optional: Tailwind preset</h2>
      <p>
        If your app already uses Tailwind CSS 3, the preset maps FieldNote colours, type and spacing onto utility names.
        Components still style themselves, so the preset is only needed for your own layout code.
      </p>
      <CodeBlock code={tailwindPreset} label="tailwind.config.cjs" language="js" />

      <div className="docs-callout">
        <p>
          <strong>Server components.</strong> Use <code>fieldnote-ui/server</code> for tokens and <code>themeInitScript</code>.
          Components from <code>fieldnote-ui</code> are client components and can be rendered from server components
          with plain props. Pass data, not functions, across that boundary; for example, use <code>DecisionPanel</code>
          without <code>onDecide</code> and read its result from the page instead.
        </p>
      </div>

      <h2>Next</h2>
      <ul>
        <li>
          <Link href="/components">Browse the components</Link> and their props.
        </li>
        <li>
          <Link href="/layouts">Choose a layout</Link> for the kind of page you are building.
        </li>
        <li>
          <Link href="/accessibility">Read the accessibility notes</Link> before shipping a custom variant.
        </li>
      </ul>
    </DocsPage>
  );
}
