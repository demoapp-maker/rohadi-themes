import { DocsPage } from '../../components/docs-page';

const principles = [
  {
    id: 'separate-kinds',
    title: '1. Keep different kinds of claim visibly different',
    body: 'An observation, an insight and a decision are different things. Each has its own card, label and icon, so a reader always knows what kind of statement they are looking at.',
    wrong: 'Using one generic “card” with a coloured border for everything.',
  },
  {
    id: 'confidence',
    title: '2. Show confidence, not only conclusions',
    body: 'An insight carries its confidence and the number of evidence items behind it. Lowering confidence is a legitimate update; hiding the uncertainty is not.',
    wrong: 'A bold conclusion with no way to see how sure anyone was.',
  },
  {
    id: 'source',
    title: '3. Every number should know where it came from',
    body: 'Observations record source and time. Charts include a data table and a plain-language summary. Provenance is part of the component, not an afterthought.',
    wrong: 'A chart with no caption, no date range and no way to read the values.',
  },
  {
    id: 'text',
    title: '4. Meaning is never carried by colour alone',
    body: 'Each intent has a name and a glyph. Status is written out. Colour reinforces meaning, and every colour pairing meets WCAG AA in both light and dark mode.',
    wrong: 'A red dot standing in for “failed”.',
  },
  {
    id: 'calm',
    title: '5. Calm by default, emphasis on purpose',
    body: 'Neutral paper, restrained colour, and motion only where it explains a change. Emphasis is reserved for things the reader must act on.',
    wrong: 'Animated counters and gradients on every metric.',
  },
  {
    id: 'loop',
    title: '6. Navigate by how people think, not by file structure',
    body: 'Navigation groups content as Observe, Interpret, Decide and Learn. A reader who is interpreting evidence should find the evidence, not a settings menu.',
    wrong: 'Sidebars organised around database tables or admin areas.',
  },
  {
    id: 'humble-defaults',
    title: '7. Defaults should be safe, and changes should be reversible',
    body: 'Decisions can be revisited and reversed; the status model includes “revisited” and “reversed”. Destructive actions are never the default focus.',
    wrong: 'A one-click “delete decision” next to “record decision”.',
  },
  {
    id: 'accessible-first',
    title: '8. Accessible by construction, verified by test',
    body: 'Native elements first. Keyboard, screen-reader and reduced-motion behaviour is part of each component’s contract, and tests check it with axe-core as well as unit assertions.',
    wrong: 'A custom widget with a click handler and no keyboard support.',
  },
];

export default function PrinciplesPage() {
  return (
    <DocsPage
      active="/principles"
      title="Design principles"
      eyebrow="Foundations"
      description="Eight principles that decide what a FieldNote component does, and what it refuses to do."
    >
      <p className="docs-lede">
        When a new component is proposed, it has to be justified against these principles. If it cannot be, it does not
        belong in the library.
      </p>

      {principles.map((p) => (
        <section key={p.id} className="docs-principle" aria-labelledby={p.id}>
          <h2 id={p.id}>{p.title}</h2>
          <p>{p.body}</p>
          <p className="docs-principle__wrong">
            <strong>Not this:</strong> {p.wrong}
          </p>
        </section>
      ))}
    </DocsPage>
  );
}
