import Link from 'next/link';
import { ObservationCard, EvidenceCard, InsightCard, DecisionCard, LearningCard, ThinkingLoop } from 'fieldnote-ui';
import { DocsPage } from '../components/docs-page';
import { Example } from '../components/example';

export default function OverviewPage() {
  return (
    <DocsPage
      active="/"
      title="FieldNote UI"
      eyebrow="A design system for decision intelligence"
      description={
        <>
          Components and layouts for the way people actually work with evidence: notice what is happening, weigh it,
          choose, then check what came of the choice.
        </>
      }
      margin={
        <p>
          FieldNote is not a dashboard kit. It is a vocabulary for thinking, drawn as calm, editorial interfaces.
        </p>
      }
    >
      <p className="docs-lede">
        Most products are built from screens and widgets. Decision work is built from observations, evidence,
        insights, decisions and lessons, and each of those needs to keep its meaning when it is shown on a page.
        FieldNote gives you those five primitives, plus the layouts and charts that hold them.
      </p>

      <ThinkingLoop />

      <h2>The five primitives</h2>
      <p className="docs-section-lead">
        Each primitive has an intent. The intent is always shown as text and an icon, so the meaning survives a
        grayscale screen, a screen reader, or a print.
      </p>

      <Example
        title="The decision chain"
        description="The five cards side by side, as they would appear in a decision workspace."
        code={`<ObservationCard title="Saves rose after the Tuesday post" observedAt="2026-09-14" source="Analytics export">
  Saves per video were 2.4× the 28-day median on Tuesday.
</ObservationCard>
<EvidenceCard title="Tuesday reach holds" claim="Tuesday posts reach more new viewers." strength="moderate" />
<InsightCard title="Timing matters more than caption length" confidence={0.72} evidenceCount={4} />
<DecisionCard title="Post twice a week" status="decided" chosen="Twice a week" decidedOn="2026-09-20" />
<LearningCard title="Reach held, growth slowed" outcome="mixed" recordedOn="2026-10-06" />`}
      >
        <div className="docs-stack">
          <ObservationCard title="Saves rose after the Tuesday post" observedAt="2026-09-14" source="Analytics export">
            Saves per video were 2.4× the 28-day median on Tuesday.
          </ObservationCard>
          <EvidenceCard title="Tuesday reach holds" claim="Tuesday posts reach more new viewers." strength="moderate" />
          <InsightCard title="Timing matters more than caption length" confidence={0.72} evidenceCount={4} />
          <DecisionCard title="Post twice a week" status="decided" chosen="Twice a week" decidedOn="2026-09-20" />
          <LearningCard title="Reach held, growth slowed" outcome="mixed" recordedOn="2026-10-06" />
        </div>
      </Example>

      <h2>Where to go next</h2>
      <div className="docs-grid">
        <Link className="docs-link-card" href="/philosophy">
          <p className="docs-link-card__title">Why FieldNote exists</p>
          <p className="docs-link-card__body">The problem with screen-first design for decision work.</p>
          <p className="docs-link-card__meta">Begin</p>
        </Link>
        <Link className="docs-link-card" href="/getting-started">
          <p className="docs-link-card__title">Getting started</p>
          <p className="docs-link-card__body">Install the package, add the provider and render your first card.</p>
          <p className="docs-link-card__meta">Begin</p>
        </Link>
        <Link className="docs-link-card" href="/components">
          <p className="docs-link-card__title">Components</p>
          <p className="docs-link-card__body">Every primitive, with props, examples and accessibility notes.</p>
          <p className="docs-link-card__meta">Reference</p>
        </Link>
        <Link className="docs-link-card" href="/accessibility">
          <p className="docs-link-card__title">Accessibility</p>
          <p className="docs-link-card__body">WCAG 2.2 AA commitments, testing approach and known limits.</p>
          <p className="docs-link-card__meta">Practice</p>
        </Link>
      </div>
    </DocsPage>
  );
}
