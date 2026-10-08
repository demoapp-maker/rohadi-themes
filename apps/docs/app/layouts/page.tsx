import type { CSSProperties } from 'react';
import { DocsPage } from '../../components/docs-page';
import { PropsTable, type PropRow } from '../../components/props-table';
import { CodeBlock } from '../../components/code-block';

interface Box {
  area: string;
  label: string;
  main?: boolean;
}

interface LayoutDoc {
  id: string;
  name: string;
  summary: string;
  use: string;
  areas: string[];
  columns: string;
  boxes: Box[];
  props: PropRow[];
  code: string;
}

const common: PropRow[] = [
  { name: 'title', type: 'string', required: true, description: 'Page heading (h1).' },
  { name: 'eyebrow', type: 'string', description: 'Small label above the heading.' },
  { name: 'actions', type: 'ReactNode', description: 'Actions placed beside the heading.' },
  { name: 'mainId', type: 'string', default: "'main'", description: 'id of the main landmark; the skip link targets it.' },
  { name: 'className', type: 'string', description: 'Added to the outer element.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Main content.' },
];

const layouts: LayoutDoc[] = [
  {
    id: 'notebook',
    name: 'NotebookLayout',
    summary: 'A research notebook page: navigation on the left, reading column in the middle, margin notes on the right.',
    use: 'Documentation, long-form working notes, anything read top to bottom with side remarks.',
    areas: ['head head head', 'nav main margin'],
    columns: '12rem minmax(0, 1fr) 13rem',
    boxes: [
      { area: 'head', label: 'Eyebrow · Title · Description' },
      { area: 'nav', label: 'Navigation' },
      { area: 'main', label: 'Reading column', main: true },
      { area: 'margin', label: 'Margin notes' },
    ],
    props: [
      ...common,
      { name: 'description', type: 'ReactNode', description: 'Standfirst under the title.' },
      { name: 'navigation', type: 'ReactNode', description: 'Usually a KnowledgeNav. Hidden at narrow widths behind a disclosure.' },
      { name: 'margin', type: 'ReactNode', description: 'FieldNote-style marginalia.' },
    ],
    code: `<NotebookLayout
  eyebrow="Account study"
  title="Week 38 notes"
  description="What the numbers showed, and what we did next."
  navigation={<KnowledgeNav label="Study" sections={sections} />}
  margin={<FieldNote>Check follower split before drawing conclusions.</FieldNote>}
>
  <InsightCard title="Tuesday reach holds" confidence={0.72} />
</NotebookLayout>`,
  },
  {
    id: 'observatory',
    name: 'ObservatoryLayout',
    summary: 'A monitoring page for ongoing signals: a header, navigation, the main reading area, and separate rows for readings and instruments.',
    use: 'Watching a set of signals over time, such as an account, a research topic or a product metric, with the current readings at a glance.',
    areas: ['head head', 'nav main', 'readings instruments'],
    columns: '12rem minmax(0, 1fr)',
    boxes: [
      { area: 'head', label: 'Title · Description · Actions' },
      { area: 'nav', label: 'Navigation' },
      { area: 'main', label: 'Main reading', main: true },
      { area: 'readings', label: 'Current readings' },
      { area: 'instruments', label: 'Charts and instruments' },
    ],
    props: [
      ...common,
      { name: 'description', type: 'ReactNode', description: 'What is being observed and why.' },
      { name: 'navigation', type: 'ReactNode', description: 'Navigation for the observatory.' },
      { name: 'readings', type: 'ReactNode', description: 'Headline values, typically ObservationCards.' },
      { name: 'instruments', type: 'ReactNode', description: 'Charts or detailed panels.' },
    ],
    code: `<ObservatoryLayout
  title="Account reach"
  eyebrow="Devira Observatory"
  navigation={<KnowledgeNav label="Observatory" sections={sections} />}
  readings={<ObservationCard title="Reach, last 7 days" observedAt="2026-10-07" />}
  instruments={<ObservationChart title="Daily reach" data={points} />}
>
  <EvidenceTimeline label="Recent events" items={events} />
</ObservatoryLayout>`,
  },
  {
    id: 'assistant',
    name: 'AssistantLayout',
    summary: 'A conversation with an assistant: threads on the left, the conversation in the middle, context and sources on the right, and a composer at the bottom.',
    use: 'Personal assistants and AI tools where the answer must be read alongside the evidence it used.',
    areas: ['threads main context', 'threads composer context'],
    columns: '14rem minmax(0, 1fr) 15rem',
    boxes: [
      { area: 'threads', label: 'Threads' },
      { area: 'main', label: 'Conversation', main: true },
      { area: 'context', label: 'Context and sources' },
      { area: 'composer', label: 'Composer' },
    ],
    props: [
      ...common,
      { name: 'threads', type: 'ReactNode', description: 'List of conversations.' },
      { name: 'context', type: 'ReactNode', description: 'Sources and facts the assistant is using.' },
      { name: 'composer', type: 'ReactNode', description: 'Input area, kept at the bottom.' },
      { name: 'conversationLabel', type: 'string', description: 'Accessible name of the conversation region.' },
    ],
    code: `<AssistantLayout
  title="Plan my week"
  threads={<KnowledgeNav label="Conversations" sections={threads} />}
  context={<EvidenceCard title="Calendar, next 7 days" strength="strong" />}
  composer={<form>{/* input and send button */}</form>}
>
  {messages}
</AssistantLayout>`,
  },
  {
    id: 'workspace',
    name: 'WorkspaceLayout',
    summary: 'A working tool: navigation, a toolbar above the work, and an optional inspector for the item selected.',
    use: 'Decision workspaces, triage queues and editors where the user moves between items and inspects one at a time.',
    areas: ['nav toolbar inspector', 'nav main inspector'],
    columns: '12rem minmax(0, 1fr) 16rem',
    boxes: [
      { area: 'nav', label: 'Navigation' },
      { area: 'toolbar', label: 'Toolbar' },
      { area: 'main', label: 'Work area', main: true },
      { area: 'inspector', label: 'Inspector' },
    ],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Workspace name, used as the page heading.' },
      { name: 'navigation', type: 'ReactNode', required: true, description: 'Primary navigation.' },
      { name: 'toolbar', type: 'ReactNode', description: 'Tools for the work area. Rendered as a group.' },
      { name: 'inspector', type: 'ReactNode', description: 'Details of the selected item.' },
      { name: 'inspectorLabel', type: 'string', description: 'Accessible name of the inspector.' },
      { name: 'mainId', type: 'string', default: "'main'", description: 'id of the main landmark.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Work area content.' },
    ],
    code: `<WorkspaceLayout
  title="Decision workspace"
  navigation={<KnowledgeNav label="Workspace" sections={sections} />}
  toolbar={<Button variant="secondary">Filter</Button>}
  inspector={<DecisionCard title="Post twice a week" status="decided" />}
>
  <DecisionPanel question="Which metric guides next month?" options={options} />
</WorkspaceLayout>`,
  },
  {
    id: 'research',
    name: 'ResearchLayout',
    summary: 'A research page: the question at the top, sections for the findings, and a sources column beside them.',
    use: 'A research thread or synthesis page, where the question frames everything and sources must stay visible.',
    areas: ['head head', 'main sources'],
    columns: 'minmax(0, 1fr) 16rem',
    boxes: [
      { area: 'head', label: 'Eyebrow · Title · Research question' },
      { area: 'main', label: 'Sections and findings', main: true },
      { area: 'sources', label: 'Sources' },
    ],
    props: [
      ...common,
      { name: 'question', type: 'ReactNode', description: 'The research question, shown under the title.' },
      { name: 'sources', type: 'ReactNode', description: 'Sources list, placed beside the findings.' },
      { name: 'sections', type: 'ReactNode', description: 'Section navigation.' },
    ],
    code: `<ResearchLayout
  eyebrow="Retention"
  title="Why do viewers leave in the first second?"
  question="Which opening frames are linked with early exits?"
  sources={<EvidenceCard title="Retention export, 9 videos" strength="moderate" />}
>
  <InsightCard title="Faces in frame 1 hold attention" confidence={0.6} />
</ResearchLayout>`,
  },
  {
    id: 'garden',
    name: 'GardenLayout',
    summary: 'A digital garden: a header, navigation, the main page, and a grid of recently tended notes.',
    use: 'Knowledge gardens and personal wikis that grow over time, where a reader should see both structure and what changed recently.',
    areas: ['head head', 'nav main', 'recent recent'],
    columns: '12rem minmax(0, 1fr)',
    boxes: [
      { area: 'head', label: 'Title · Description' },
      { area: 'nav', label: 'Navigation' },
      { area: 'main', label: 'Page', main: true },
      { area: 'recent', label: 'Recently tended' },
    ],
    props: [
      ...common,
      { name: 'eyebrow', type: 'string', description: 'Garden name or section.' },
      { name: 'description', type: 'ReactNode', description: 'Standfirst.' },
      { name: 'navigation', type: 'ReactNode', description: 'Garden navigation, usually KnowledgeNav.' },
      { name: 'recent', type: 'ReactNode', description: 'Recently updated notes. Use GardenGrid for the list.' },
    ],
    code: `<GardenLayout
  eyebrow="Digital garden"
  title="Attention"
  navigation={<KnowledgeNav label="Garden" sections={sections} />}
  recent={
    <GardenGrid label="Recently tended">
      <KnowledgeNode title="Sampling bias" kind="Concept" intent="insight" />
    </GardenGrid>
  }
>
  {page}
</GardenLayout>`,
  },
];

function Schematic({ areas, columns, boxes, label }: { areas: string[]; columns: string; boxes: Box[]; label: string }) {
  const style: CSSProperties = {
    gridTemplateAreas: areas.map((r) => `"${r}"`).join(' '),
    gridTemplateColumns: columns,
  };
  return (
    <div className="docs-diagram" style={style} aria-hidden="true" data-diagram={label}>
      {boxes.map((b) => (
        <div
          key={b.area}
          className={b.main ? 'docs-diagram__box docs-diagram__box--main' : 'docs-diagram__box'}
          style={{ gridArea: b.area }}
        >
          {b.label}
        </div>
      ))}
    </div>
  );
}

export default function LayoutsPage() {
  return (
    <DocsPage
      active="/layouts"
      title="Layouts"
      eyebrow="Patterns"
      description="Six page structures, each shaped around a way of working. Every layout renders one main landmark, a skip link and a page heading."
    >
      <p className="docs-lede">
        A layout decides where things go; the components decide what they mean. Pick the layout that matches the work,
        then fill it with primitives. You should not need to position cards with your own CSS.
      </p>

      <h2>Choosing a layout</h2>
      <div className="docs-table-wrap" role="region" aria-label="Layout summary, scrollable" tabIndex={0}>
        <table className="docs-table">
          <caption>Layouts at a glance</caption>
          <thead>
            <tr>
              <th scope="col">Layout</th>
              <th scope="col">Use it for</th>
            </tr>
          </thead>
          <tbody>
            {layouts.map((l) => (
              <tr key={l.id}>
                <th scope="row">
                  <a href={`#${l.id}`}>{l.name}</a>
                </th>
                <td>{l.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {layouts.map((l) => (
        <section key={l.id} id={l.id} className="docs-example" aria-labelledby={`${l.id}-heading`}>
          <h2 id={`${l.id}-heading`}>{l.name}</h2>
          <p>{l.summary}</p>
          <p>
            <strong>Use it for:</strong> {l.use}
          </p>
          <Schematic areas={l.areas} columns={l.columns} boxes={l.boxes} label={l.name} />
          <p className="docs-principle__wrong">
            The diagram is a schematic; the regions are described in text above, so the layout reads the same without it.
          </p>
          <PropsTable caption={`${l.name} props`} rows={l.props} />
          <CodeBlock code={l.code} label={`Usage: ${l.name}`} />
        </section>
      ))}

      <h2>Rules every layout follows</h2>
      <ul className="docs-checklist">
        <li>One <code>main</code> landmark, with <code>id</code> set by <code>mainId</code> so the skip link can reach it.</li>
        <li>One <code>h1</code>, from the layout&rsquo;s title. Sections inside start at <code>h2</code>.</li>
        <li>Navigation is a labelled <code>nav</code>. Below 64rem it stacks above the content rather than being hidden, so every reader can still reach it.</li>
        <li>Below 64rem the columns collapse to one, in reading order: heading, navigation, main, then supporting regions.</li>
      </ul>
    </DocsPage>
  );
}
