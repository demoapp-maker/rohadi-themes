import { DocsPage } from '../../components/docs-page';

const examples = [
  {
    name: 'Decision Workspace',
    path: 'examples/decision-workspace',
    summary: 'Triage observations, weigh evidence and record decisions in one workspace.',
    shows: 'WorkspaceLayout, DecisionPanel, EvidenceTimeline, DecisionCard.',
  },
  {
    name: 'Research Observatory',
    path: 'examples/observatory',
    summary: 'Track research threads and the signals behind them.',
    shows: 'ObservatoryLayout, ResearchCard, InsightCluster, ObservationChart.',
  },
  {
    name: 'Personal Assistant',
    path: 'examples/assistant',
    summary: 'A conversation that shows the evidence behind every answer.',
    shows: 'AssistantLayout, EvidenceCard, FieldNote.',
  },
  {
    name: 'Digital Garden Dashboard',
    path: 'examples/digital-garden',
    summary: 'A garden of connected notes, with a view of what was tended recently.',
    shows: 'GardenLayout, KnowledgeNode, LearningRecord, KnowledgeNav.',
  },
  {
    name: 'TikTok Analyzer Mock',
    path: 'examples/tiktok-analyzer-mock',
    summary: 'A mock account analysis with synthetic data: observations, insights and a posting decision.',
    shows: 'NotebookLayout, ObservationCard, InsightCard, DecisionCard, LearningChart.',
  },
];

export default function ExamplesPage() {
  return (
    <DocsPage
      active="/examples"
      title="Example applications"
      eyebrow="Practice"
      description="Five applications that show the system in use, each built on one layout and the primitives it suggests."
    >
      <div className="docs-callout">
        <p>
          <strong>Status: planned.</strong> The example applications are part of Phase 6 and are not built yet. This page
          lists what they will cover so you can plan around them. Nothing here links to a running preview.
        </p>
      </div>

      {examples.map((e) => (
        <section key={e.path} className="docs-principle" aria-labelledby={e.path}>
          <h2 id={e.path}>{e.name}</h2>
          <p>{e.summary}</p>
          <p>
            <strong>Shows:</strong> {e.shows}
          </p>
          <p className="docs-principle__wrong">
            Source location: <code>{e.path}</code>
          </p>
        </section>
      ))}
    </DocsPage>
  );
}
