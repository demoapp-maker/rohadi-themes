import { ObservationChart, EvidenceChart, InsightTrendChart, DecisionImpactChart, LearningChart } from 'fieldnote-ui';
import { DocsPage } from '../../components/docs-page';
import { Example } from '../../components/example';
import { PropsTable } from '../../components/props-table';

export default function ChartsPage() {
  return (
    <DocsPage
      active="/charts"
      title="Charts"
      eyebrow="Patterns"
      description="Five chart types for decision work, drawn in the notebook style. Each one states what it measures, and each one can be read without seeing it."
    >
      <p className="docs-lede">
        A chart in FieldNote answers three questions before it answers the one you asked: what is being counted, over what
        period, and how sure we are of it. Those appear in the chart, not in a footnote somewhere else.
      </p>

      <h2>Every chart is also a table</h2>
      <p>
        Each chart is a <code>figure</code> labelled by its title, with a plain-language summary as the accessible name of
        the drawing. Beneath it, <em>Show data table</em> opens the same numbers as a real table. Screen-reader users get
        the summary and the table; sighted users can check any value.
      </p>

      <h2>ObservationChart</h2>
      <Example
        title="Daily reach"
        description="Counts or measurements over time, one point per period. Use it for observations, not conclusions."
        code={`<ObservationChart
  title="Daily reach, last 7 days"
  description="New viewers per day, from the analytics export."
  unit="viewers"
  data={[
    { label: 'Mon', value: 1240 },
    { label: 'Tue', value: 1810 },
    { label: 'Wed', value: 1390 },
    { label: 'Thu', value: 1520 },
    { label: 'Fri', value: 1105 },
  ]}
/>`}
      >
        <ObservationChart
          title="Daily reach, last 7 days"
          description="New viewers per day, from the analytics export."
          unit="viewers"
          data={[
            { label: 'Mon', value: 1240 },
            { label: 'Tue', value: 1810 },
            { label: 'Wed', value: 1390 },
            { label: 'Thu', value: 1520 },
            { label: 'Fri', value: 1105 },
          ]}
        />
      </Example>

      <h2>EvidenceChart</h2>
      <Example
        title="Evidence by source"
        description="Horizontal bars, one per category. Good for comparing how much support each source gives."
        code={`<EvidenceChart
  title="Items supporting the reach claim"
  unit="items"
  data={[
    { label: 'Analytics export', value: 21 },
    { label: 'Creator notes', value: 6 },
    { label: 'Audience comments', value: 14 },
  ]}
/>`}
      >
        <EvidenceChart
          title="Items supporting the reach claim"
          unit="items"
          data={[
            { label: 'Analytics export', value: 21 },
            { label: 'Creator notes', value: 6 },
            { label: 'Audience comments', value: 14 },
          ]}
        />
      </Example>

      <h2>InsightTrendChart</h2>
      <Example
        title="Confidence over time"
        description="Confidence in one insight, from 0 to 1. The axis is fixed at 0–100%, so a change in height always means a change in confidence."
        code={`<InsightTrendChart
  title="Confidence: Tuesday reach holds"
  description="Confidence as evidence came in, from 0 to 100%."
  data={[
    { label: 'Week 36', value: 0.4 },
    { label: 'Week 37', value: 0.58 },
    { label: 'Week 38', value: 0.72 },
  ]}
/>`}
      >
        <InsightTrendChart
          title="Confidence: Tuesday reach holds"
          description="Confidence as evidence came in, from 0 to 100%."
          data={[
            { label: 'Week 36', value: 0.4 },
            { label: 'Week 37', value: 0.58 },
            { label: 'Week 38', value: 0.72 },
          ]}
        />
      </Example>

      <h2>DecisionImpactChart</h2>
      <Example
        title="Impact of decisions"
        description="Signed values around a zero baseline. Positive helped, negative hurt. The sign is written in the data table, not only shown by direction."
        code={`<DecisionImpactChart
  title="Change in reach after each decision"
  unit="%"
  data={[
    { label: 'Post twice a week', value: 12 },
    { label: 'Caption length cap', value: -3 },
    { label: 'Hook in first two seconds', value: 8 },
  ]}
/>`}
      >
        <DecisionImpactChart
          title="Change in reach after each decision"
          unit="%"
          data={[
            { label: 'Post twice a week', value: 12 },
            { label: 'Caption length cap', value: -3 },
            { label: 'Hook in first two seconds', value: 8 },
          ]}
        />
      </Example>

      <h2>LearningChart</h2>
      <Example
        title="Outcomes of lessons"
        description="Lessons recorded per period, stacked by outcome: confirmed, mixed and refuted. Refuted lessons are shown, not hidden."
        code={`<LearningChart
  title="Lessons recorded, by outcome"
  data={[
    { label: 'September', confirmed: 4, mixed: 2, refuted: 1 },
    { label: 'October', confirmed: 3, mixed: 3, refuted: 0 },
  ]}
/>`}
      >
        <LearningChart
          title="Lessons recorded, by outcome"
          data={[
            { label: 'September', confirmed: 4, mixed: 2, refuted: 1 },
            { label: 'October', confirmed: 3, mixed: 3, refuted: 0 },
          ]}
        />
      </Example>

      <h2>Styling and colour</h2>
      <p>
        Charts use the intent palette: observations in grey, evidence in steel blue, insights in muted green, decisions in
        amber, learning in purple. Colours are resolved from the tokens for the current scheme, so the same chart is readable
        in light and dark mode. Chart series also have labels in the legend and in the table, so colour is never the only
        cue.
      </p>
      <p>
        Animations are switched off. A chart is a reading aid for a moment of thought; it should not move while someone
        is reading it.
      </p>

      <h2>Props</h2>
      <PropsTable
        caption="Shared chart props"
        rows={[
          { name: 'title', type: 'string', required: true, description: 'Heading of the figure.' },
          { name: 'description', type: 'string', description: 'One sentence on what is counted or measured.' },
          { name: 'data', type: 'LabelledValue[] (or LearningOutcomeCounts[])', required: true, description: 'Ordered data points.' },
          { name: 'unit', type: 'string', description: 'Unit shown in tooltips and the table, e.g. "%".' },
          { name: 'height', type: 'number', default: '280', description: 'Height of the drawing in pixels.' },
          { name: 'className', type: 'string', description: 'Added to the figure element.' },
        ]}
      />
    </DocsPage>
  );
}
