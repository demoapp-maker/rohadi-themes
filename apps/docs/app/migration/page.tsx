import { DocsPage } from '../../components/docs-page';
import { CodeBlock } from '../../components/code-block';

function Map({ caption, rows }: { caption: string; rows: Array<[string, string, string]> }) {
  return (
    <div className="docs-table-wrap" role="region" aria-label={`${caption}, scrollable`} tabIndex={0}>
      <table className="docs-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Before</th>
            <th scope="col">After</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([before, after, notes]) => (
            <tr key={before}>
              <th scope="row">{before}</th>
              <td>
                <code>{after}</code>
              </td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MigrationPage() {
  return (
    <DocsPage
      active="/migration"
      title="Migration guides"
      eyebrow="Practice"
      description="How to move an existing screen, card or dashboard to FieldNote without losing the meaning of what it shows."
    >
      <p className="docs-lede">
        Migration is mostly a matter of naming. Once each card says what kind of claim it makes, the styling follows from
        the component rather than from your CSS.
      </p>

      <h2>From a generic card</h2>
      <p>
        Most apps have one card component with a title, a description and a badge. Split it by the kind of thing it shows,
        so that the intent is no longer a colour you pick by hand.
      </p>
      <Map
        caption="Generic card to FieldNote cards"
        rows={[
          ['Card showing a metric or a raw event', 'ObservationCard', 'Keep the source and the time. Add them if they are missing.'],
          ['Card listing sources or proof', 'EvidenceCard', 'Give the claim a sentence of its own.'],
          ['Card with a conclusion', 'InsightCard', 'Add a confidence value. If you cannot estimate one, say so in the text.'],
          ['Card with a choice or a status like "approved"', 'DecisionCard', 'Use the options and chosen fields, not free text.'],
          ['Card for a retrospective or post-mortem', 'LearningCard or LearningRecord', 'LearningRecord when the lesson should link to its decision.'],
          ['Card with a coloured badge only', 'IntentBadge or StatusChip', 'Badges must carry text. Colour alone does not pass.'],
        ]}
      />
      <CodeBlock
        label="Before and after"
        code={`// Before: a generic card where the badge colour carries the meaning
<Card>
  <Badge color="green">Insight</Badge>
  <h3>Weekday timing matters</h3>
  <p>Tuesday reach held for three weeks.</p>
</Card>

// After: the component names the kind of claim and states its confidence
<InsightCard title="Weekday timing matters" confidence={0.72} evidenceCount={4}>
  Tuesday reach held for three weeks.
</InsightCard>`}
      />

      <h2>From a KPI dashboard</h2>
      <p>
        A KPI tile shows one number. In FieldNote that number is an observation: record it with its source and date, and
        draw its history with a chart that includes the data table.
      </p>
      <Map
        caption="Dashboard widgets to FieldNote"
        rows={[
          ['KPI tile with a delta arrow', 'ObservationCard + Meter', 'Show the delta in words first ("up 12% from last week"); the arrow is decoration.'],
          ['Line or bar chart of a metric', 'ObservationChart', 'Add a unit and a description. The table is generated from the data.'],
          ['Chart of confidence or score over time', 'InsightTrendChart', 'Values are 0 to 1; the axis is fixed to 0–100%.'],
          ['Before/after impact chart', 'DecisionImpactChart', 'Use signed values around zero. Positive helped, negative hurt.'],
          ['Pie or donut chart', 'EvidenceChart', 'Bars are easier to compare. Donuts are not provided.'],
        ]}
      />

      <h2>From shadcn/ui or another component library</h2>
      <p>
        FieldNote does not depend on shadcn/ui, and it does not map shadcn&rsquo;s theme variables onto its own tokens. Keep your
        existing library for controls it already does well. Use FieldNote for the surfaces where people interpret, decide and
        learn, and avoid mixing the two inside a single card.
      </p>
      <ul>
        <li>Replace <code>Card</code> + <code>Badge</code> pairs with the primitives in the table above.</li>
        <li>Keep your app&rsquo;s own buttons until you are ready; <code>Button</code> from FieldNote is a plain native button with the same focus rules.</li>
        <li>Remove shadcn utility classes from the FieldNote component&rsquo;s parent only if they change the layout.</li>
      </ul>

      <h2>From a custom dark-mode class</h2>
      <p>
        FieldNote reads a single attribute, <code>data-theme</code>, set on <code>&lt;html&gt;</code> by the provider. Replace a
        <code>.dark</code> class with it, or use the provider and let it manage the attribute.
      </p>
      <CodeBlock
        label="Dark mode"
        code={`// Remove: document.documentElement.classList.toggle('dark', isDark)
// Use the provider. It writes data-theme="light" or "dark" to <html>.
<FieldNoteProvider defaultPreference="system">{children}</FieldNoteProvider>

// Read or change the preference from any client component
const { preference, setPreference, resolvedTheme } = useFieldNoteTheme();`}
      />

      <h2>Tokens moved to server-safe entries</h2>
      <p>
        In this release the root <code>fieldnote-ui</code> entry is a client module. Tokens and the theme script are
        available from <code>fieldnote-ui/server</code> (or <code>fieldnote-ui/tokens</code> for tokens alone), which can be
        imported in server components.
      </p>
      <CodeBlock
        label="Import changes"
        code={`// Before (client root, not callable from a server component)
import { tokens, themeInitScript } from 'fieldnote-ui';

// After
import { tokens } from 'fieldnote-ui/tokens';
import { themeInitScript } from 'fieldnote-ui/server';`}
      />

      <h2>Tailwind</h2>
      <p>
        The preset is for Tailwind CSS 3, as a JavaScript preset. Tailwind 4 users can keep using FieldNote&rsquo;s stylesheet
        and <code>--fn-*</code> variables without the preset, which is what the components themselves rely on.
      </p>
    </DocsPage>
  );
}
