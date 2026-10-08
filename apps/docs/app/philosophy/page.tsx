import { DocsPage } from '../../components/docs-page';

export default function PhilosophyPage() {
  return (
    <DocsPage
      active="/philosophy"
      title="Why FieldNote exists"
      eyebrow="Begin"
      description="Screens show numbers. Decisions need the reasoning that connects the numbers to a choice."
      margin={<p>The name is the practice: a field note records what was seen before anyone decides what it means.</p>}
    >
      <h2>The problem</h2>
      <p>
        Analytics products are built around dashboards. A dashboard shows a number, a trend and sometimes a colour that
        says whether the number is good. It rarely shows where the number came from, how sure anyone is about it, what
        was decided because of it, or whether that decision worked out. The reasoning is somewhere else, usually in a
        document, a chat thread or someone's head.
      </p>
      <p>
        When a team later asks &ldquo;why did we post twice a week?&rdquo;, the answer should be one click away from the
        chart, not a search through old messages.
      </p>

      <h2>The loop</h2>
      <p>
        Good decisions tend to follow the same loop, whether the work is a product roadmap, a research project or a
        personal plan. FieldNote is organised around it.
      </p>
      <ol className="docs-checklist">
        <li>
          <strong>Observe.</strong> Notice what is happening, and record it with its source, before deciding what it
          means.
        </li>
        <li>
          <strong>Interpret.</strong> Weigh the evidence, and form insights with an honest level of confidence.
        </li>
        <li>
          <strong>Decide.</strong> Choose a course of action, and record the options and the reasons.
        </li>
        <li>
          <strong>Learn.</strong> Compare what happened with what was expected, and keep the lesson where the next
          person will find it.
        </li>
      </ol>

      <h2>Why these five primitives</h2>
      <p>
        ObservationCard, EvidenceCard, InsightCard, DecisionCard and LearningCard are not arbitrary. Each one names a
        different kind of claim. An observation is not an insight, and treating them the same is how teams end up acting
        on noise. Keeping the kinds distinct, visually and in the markup, makes that mistake harder to make.
      </p>
      <p>
        Everything else in the system supports those five: notebook pages to hold them, timelines to order them, and
        charts that show the same numbers with the reasoning attached.
      </p>

      <h2>Why it looks the way it does</h2>
      <p>
        The visual language is borrowed from places where people have thought carefully for a long time: research
        notebooks, field guides, observatory logs and digital gardens. Paper-toned backgrounds, serif headings and generous
        margins make reading comfortable over long sessions. Colour is restrained, so that when something does stand out,
        it means something.
      </p>
      <p>
        It deliberately avoids crypto-style dashboards, growth-hacking visuals and neon SaaS design. Those patterns are
        built to create urgency. Decision work needs the opposite: time to read the evidence, and a way to tell when
        confidence is low.
      </p>

      <h2>What FieldNote is not</h2>
      <ul>
        <li>A dashboard framework. It provides structures for reasoning; it does not ship chart presets for every metric.</li>
        <li>An analytics template. It has no data layer, no connectors and no opinions about your data model.</li>
        <li>A generic component library. Buttons and inputs exist, but they are supporting parts, not the point.</li>
      </ul>

      <h2>Who it is for</h2>
      <p>
        FieldNote is built for products where people weigh evidence and make choices: a personal assistant that helps plan
        a week, an analyzer that explains why a creator&rsquo;s reach moved, an observatory that tracks research threads.
        It is shared across the Rohadi and Devira product family, and is open for anyone building in the same space.
      </p>
    </DocsPage>
  );
}
