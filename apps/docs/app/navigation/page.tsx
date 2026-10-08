import { KnowledgeNav, ThinkingLoop, Breadcrumbs } from 'fieldnote-ui';
import { DocsPage } from '../../components/docs-page';
import { Example } from '../../components/example';
import { PropsTable } from '../../components/props-table';

const sections = [
  {
    id: 'observe',
    items: [
      { label: 'Account export', href: '#observe-export', count: 3 },
      { label: 'Field notes', href: '#observe-notes' },
    ],
  },
  {
    id: 'interpret',
    items: [
      { label: 'Reach evidence', href: '#interpret-reach', current: true },
      { label: 'Open questions', href: '#interpret-questions', count: 2 },
    ],
  },
  {
    id: 'decide',
    items: [{ label: 'Posting schedule', href: '#decide-schedule' }],
  },
  {
    id: 'learn',
    items: [{ label: 'Lessons', href: '#learn-lessons' }],
  },
];

const code = `<KnowledgeNav
  label="Study"
  title="Account study"
  sections={[
    {
      id: 'observe',              // a thinking stage: gets its glyph and description
      items: [
        { label: 'Account export', href: '/observe/export', count: 3 },
        { label: 'Field notes', href: '/observe/notes' },
      ],
    },
    {
      id: 'interpret',
      items: [{ label: 'Reach evidence', href: '/interpret/reach', current: true }],
    },
    { id: 'decide', items: [{ label: 'Posting schedule', href: '/decide/schedule' }] },
    { id: 'learn', items: [{ label: 'Lessons', href: '/learn/lessons' }] },
  ]}
/>`;

export default function NavigationPage() {
  return (
    <DocsPage
      active="/navigation"
      title="Navigation"
      eyebrow="Patterns"
      description="Navigation follows the thinking loop, not the org chart. People look for the evidence when they are interpreting, and for the record when they are learning."
    >
      <p className="docs-lede">
        The four stages are fixed: Observe, Interpret, Decide and Learn. A section can be any stage or a custom group, but
        the stages keep their meaning in every product that uses FieldNote.
      </p>

      <h2>The thinking loop</h2>
      <p>
        <code>ThinkingLoop</code> shows where a page sits in the loop. It is a list of text links, and the current stage is
        marked with <code>aria-current=&quot;step&quot;</code>, not with colour.
      </p>
      <Example
        title="Thinking loop, on the Interpret stage"
        description="Pass hrefs to link each stage. Without them the stages are shown as plain text."
        code={`<ThinkingLoop current="interpret" hrefs={{ observe: '/observe', interpret: '/interpret', decide: '/decide', learn: '/learn' }} />`}
      >
        <ThinkingLoop current="interpret" hrefs={{ observe: '#observe', interpret: '#interpret', decide: '#decide', learn: '#learn' }} />
      </Example>

      <h2>Knowledge navigation</h2>
      <p>
        <code>KnowledgeNav</code> is a labelled navigation region with grouped sections. Items with a <code>count</code> announce
        it as text, and the current page is marked with <code>aria-current=&quot;page&quot;</code>.
      </p>
      <Example
        title="Study navigation"
        description="The navigation is a real nav landmark. Use Tab to move through it; links have visible focus."
        code={code}
      >
        <KnowledgeNav label="Example navigation" title="Account study" sections={sections} />
      </Example>

      <h2>Breadcrumbs</h2>
      <Example
        title="Breadcrumbs"
        description="The last item is the current page, so it is not a link."
        code={`<Breadcrumbs items={[
  { label: 'Studies', href: '/studies' },
  { label: 'Account study', href: '/studies/account' },
  { label: 'Reach evidence' },
]} />`}
      >
        <Breadcrumbs
          items={[
            { label: 'Studies', href: '#studies' },
            { label: 'Account study', href: '#account' },
            { label: 'Reach evidence' },
          ]}
        />
      </Example>

      <h2>API</h2>
      <PropsTable
        caption="KnowledgeNav props"
        rows={[
          { name: 'label', type: 'string', required: true, description: 'Accessible name of the navigation region.' },
          { name: 'sections', type: 'KnowledgeNavSection[]', required: true, description: 'Each section has an id (a stage or a custom id), an optional label and description, and items.' },
          { name: 'title', type: 'ReactNode', description: 'Heading shown above the sections.' },
        ]}
      />
      <PropsTable
        caption="ThinkingLoop props"
        rows={[
          { name: 'current', type: "'observe' | 'interpret' | 'decide' | 'learn'", description: 'The stage the page is on. Marked with aria-current.' },
          { name: 'hrefs', type: 'Partial<Record<Stage, string>>', default: '{}', description: 'Links for each stage.' },
        ]}
      />
      <PropsTable
        caption="Breadcrumbs props"
        rows={[
          { name: 'items', type: '{ label: string; href?: string }[]', required: true, description: 'Path from the top. The last item is the current page.' },
        ]}
      />

      <h2>Keyboard and screen readers</h2>
      <ul>
        <li>Navigation regions are real <code>nav</code> elements with labels. Screen-reader users can jump between them.</li>
        <li>Every link has visible focus in both colour schemes, and nothing opens on hover alone.</li>
        <li>On narrow screens (below 64rem) navigation stacks above the content rather than being hidden, so it stays available to every reader.</li>
      </ul>
    </DocsPage>
  );
}
