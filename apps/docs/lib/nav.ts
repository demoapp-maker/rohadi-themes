/** Documentation navigation. Grouped by how a reader uses the system, not by file layout. */
export interface DocsLink {
  label: string;
  href: string;
}

export interface DocsSection {
  id: string;
  label: string;
  description: string;
  links: DocsLink[];
}

export const docsSections: DocsSection[] = [
  {
    id: 'begin',
    label: 'Begin',
    description: 'Why FieldNote exists, and how to start.',
    links: [
      { label: 'Overview', href: '/' },
      { label: 'Philosophy', href: '/philosophy' },
      { label: 'Getting started', href: '/getting-started' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    description: 'Principles and the tokens they become.',
    links: [
      { label: 'Design principles', href: '/principles' },
      { label: 'Tokens and colour', href: '/foundations' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    description: 'Primitives for thinking, and the controls around them.',
    links: [
      { label: 'All components', href: '/components' },
      { label: 'Observation card', href: '/components/observation-card' },
      { label: 'Evidence card', href: '/components/evidence-card' },
      { label: 'Insight card', href: '/components/insight-card' },
      { label: 'Decision card', href: '/components/decision-card' },
      { label: 'Learning card', href: '/components/learning-card' },
      { label: 'Field note', href: '/components/field-note' },
      { label: 'Notebook card', href: '/components/notebook-card' },
      { label: 'Experiment card', href: '/components/experiment-card' },
      { label: 'Research card', href: '/components/research-card' },
      { label: 'Knowledge node', href: '/components/knowledge-node' },
      { label: 'Insight cluster', href: '/components/insight-cluster' },
      { label: 'Learning record', href: '/components/learning-record' },
      { label: 'Evidence timeline', href: '/components/evidence-timeline' },
      { label: 'Decision panel', href: '/components/decision-panel' },
      { label: 'Primitives', href: '/components/primitives' },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    description: 'Layouts, navigation and charts.',
    links: [
      { label: 'Layouts', href: '/layouts' },
      { label: 'Navigation', href: '/navigation' },
      { label: 'Charts', href: '/charts' },
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    description: 'Accessibility, examples, migration and releases.',
    links: [
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Example applications', href: '/examples' },
      { label: 'Migration guides', href: '/migration' },
      { label: 'Versioning', href: '/versioning' },
    ],
  },
];

export const allDocsLinks = docsSections.flatMap((s) => s.links);
