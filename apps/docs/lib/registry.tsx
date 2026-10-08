import type { ReactNode } from 'react';
import {
  ObservationCard,
  EvidenceCard,
  InsightCard,
  DecisionCard,
  LearningCard,
  FieldNote,
  NotebookCard,
  ExperimentCard,
  ResearchCard,
  KnowledgeNode,
  InsightCluster,
  LearningRecord,
  EvidenceTimeline,
  DecisionPanel,
  IntentBadge,
  StatusChip,
  Tag,
  Meter,
  Button,
  ThemeToggle,
} from 'fieldnote-ui';
import type { PropRow } from '../components/props-table';

export type ComponentGroup = 'Cards' | 'Knowledge' | 'Structures' | 'Primitives';

export interface ComponentExample {
  title: string;
  description?: string;
  /** Source shown beneath the live preview. Kept in step with `node` by review. */
  code: string;
  node: ReactNode;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  group: ComponentGroup;
  /** One sentence: what the component is for. */
  summary: string;
  /** The thinking stage or intent this primitive belongs to. */
  stage: string;
  when: string[];
  avoid: string[];
  props: PropRow[];
  examples: ComponentExample[];
  accessibility: string[];
  related: string[];
}

const RESEARCH_DATE = '2026-09-14';

export const components: ComponentDoc[] = [
  {
    slug: 'observation-card',
    name: 'ObservationCard',
    group: 'Cards',
    stage: 'Observe',
    summary: 'Records something that happened, as seen, before anyone has said what it means.',
    when: [
      'Recording a measurement, event or quote with its source and time.',
      'Keeping raw signal separate from the interpretation that will come later.',
    ],
    avoid: ['Stating a conclusion. Use InsightCard once the observation is being interpreted.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Plain statement of what was seen.' },
      { name: 'observedAt', type: 'string | Date', description: 'When it was observed. Shown as a formatted date and machine-readable time.' },
      { name: 'source', type: 'string', description: 'Where the observation came from, e.g. an export or an interview.' },
      { name: 'subject', type: 'string', description: 'What the observation is about.' },
      { name: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', default: '3', description: 'Heading level of the title.' },
      { name: 'id, className', type: 'string', description: 'Passed to the article element.' },
    ],
    examples: [
      {
        title: 'A single observation',
        description: 'Source and date are part of the record, not decoration.',
        code: `<ObservationCard
  title="Saves rose after the Tuesday post"
  observedAt="${RESEARCH_DATE}"
  source="TikTok analytics export"
  subject="@example_account"
>
  Saves per video were 2.4× the 28-day median on Tuesday, across six posts.
</ObservationCard>`,
        node: (
          <ObservationCard
            title="Saves rose after the Tuesday post"
            observedAt={RESEARCH_DATE}
            source="TikTok analytics export"
            subject="@example_account"
          >
            Saves per video were 2.4× the 28-day median on Tuesday, across six posts.
          </ObservationCard>
        ),
      },
    ],
    accessibility: [
      'Rendered as an article labelled by its heading; the kicker row is part of the accessible description.',
      'The intent is announced as text ("Observation"), never by colour alone.',
    ],
    related: ['evidence-card', 'insight-card'],
  },
  {
    slug: 'evidence-card',
    name: 'EvidenceCard',
    group: 'Cards',
    stage: 'Interpret',
    summary: 'Ties a claim to the sources that bear on it, and states how strong they are.',
    when: ['Supporting an insight with sources that can be checked.', 'Showing that some sources are stronger than others.'],
    avoid: ['Listing sources without a claim. The claim is what gives the evidence meaning.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Name of the evidence.' },
      { name: 'claim', type: 'string', description: 'The statement this evidence bears on, in plain words.' },
      { name: 'strength', type: "'weak' | 'moderate' | 'strong'", description: 'How well the sources support the claim. Shown as text and a meter.' },
      { name: 'sources', type: 'EvidenceSource[]', description: 'Each source has label, optional href and kind (primary, secondary, data, anecdotal).' },
      { name: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', default: '3', description: 'Heading level of the title.' },
    ],
    examples: [
      {
        title: 'Claim with sources',
        code: `<EvidenceCard
  title="Tuesday reach holds across three weeks"
  claim="Posts published on Tuesday reach more new viewers than the weekly average."
  strength="moderate"
  sources={[
    { label: 'Account analytics, 21 posts', kind: 'data' },
    { label: 'Creator notes, week 38', kind: 'secondary' },
  ]}
/>`,
        node: (
          <EvidenceCard
            title="Tuesday reach holds across three weeks"
            claim="Posts published on Tuesday reach more new viewers than the weekly average."
            strength="moderate"
            sources={[
              { label: 'Account analytics, 21 posts', kind: 'data' },
              { label: 'Creator notes, week 38', kind: 'secondary' },
            ]}
          />
        ),
      },
    ],
    accessibility: [
      'Strength is conveyed as words and as a role="meter" value, so it is not carried by the bar alone.',
      'Each source kind is written out in text.',
    ],
    related: ['observation-card', 'insight-card'],
  },
  {
    slug: 'insight-card',
    name: 'InsightCard',
    group: 'Cards',
    stage: 'Interpret',
    summary: 'A conclusion, with an honest statement of how confident we are in it.',
    when: ['Stating what the evidence suggests.', 'Recording how confident the team is, so it can be revisited.'],
    avoid: ['Presenting a guess as a finding. Lower the confidence instead of hiding the uncertainty.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'The insight, stated as a sentence.' },
      { name: 'confidence', type: 'number (0–1)', description: 'Confidence as a fraction. 0.72 is shown as 72%.' },
      { name: 'evidenceCount', type: 'number', description: 'How many evidence items support it.' },
      { name: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', default: '3', description: 'Heading level of the title.' },
    ],
    examples: [
      {
        title: 'Insight with confidence',
        code: `<InsightCard
  title="Weekday timing matters more than caption length"
  confidence={0.72}
  evidenceCount={4}
>
  Caption length moved reach by less than 5% in every test window.
</InsightCard>`,
        node: (
          <InsightCard title="Weekday timing matters more than caption length" confidence={0.72} evidenceCount={4}>
            Caption length moved reach by less than 5% in every test window.
          </InsightCard>
        ),
      },
    ],
    accessibility: [
      'Confidence is written as a percentage and exposed as a meter with an explicit valuetext.',
    ],
    related: ['evidence-card', 'decision-card', 'insight-cluster'],
  },
  {
    slug: 'decision-card',
    name: 'DecisionCard',
    group: 'Cards',
    stage: 'Decide',
    summary: 'Records a choice: the question, the options considered, what was chosen, and when to review it.',
    when: ['Keeping a record of a decision and the reasons behind it.', 'Scheduling a review of a decision once there is more evidence.'],
    avoid: ['Using it as a to-do item. A decision card records a choice that has been made or is being made.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'The decision, as a short label.' },
      { name: 'status', type: "'open' | 'deciding' | 'decided' | 'revisited' | 'reversed'", default: "'open'", description: 'Current state, shown as a status chip.' },
      { name: 'question', type: 'string', description: 'The question the decision answers.' },
      { name: 'options', type: 'string[]', description: 'Options that were considered.' },
      { name: 'chosen', type: 'string', description: 'The option that was chosen.' },
      { name: 'decidedOn, reviewOn', type: 'string | Date', description: 'Dates for the decision and its planned review.' },
    ],
    examples: [
      {
        title: 'A decision with a review date',
        code: `<DecisionCard
  title="Post twice a week, not daily"
  status="decided"
  question="How often should the account publish?"
  options={['Daily', 'Three times a week', 'Twice a week']}
  chosen="Twice a week"
  decidedOn="2026-09-20"
  reviewOn="2026-11-01"
/>`,
        node: (
          <DecisionCard
            title="Post twice a week, not daily"
            status="decided"
            question="How often should the account publish?"
            options={['Daily', 'Three times a week', 'Twice a week']}
            chosen="Twice a week"
            decidedOn="2026-09-20"
            reviewOn="2026-11-01"
          />
        ),
      },
    ],
    accessibility: ['The status is text in a chip, and the review date is a machine-readable time element.'],
    related: ['decision-panel', 'learning-card'],
  },
  {
    slug: 'learning-card',
    name: 'LearningCard',
    group: 'Cards',
    stage: 'Learn',
    summary: 'Compares what was expected with what happened, and keeps the lesson.',
    when: ['Closing the loop after a decision or experiment.', 'Recording whether a hypothesis was confirmed, mixed or refuted.'],
    avoid: ['Recording only successes. A refuted outcome is still a lesson.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'The lesson, stated plainly.' },
      { name: 'outcome', type: "'pending' | 'confirmed' | 'mixed' | 'refuted'", default: "'pending'", description: 'What happened relative to the expectation.' },
      { name: 'recordedOn', type: 'string | Date', description: 'When the lesson was recorded.' },
      { name: 'appliedTo', type: 'string', description: 'Where the lesson is being applied next.' },
    ],
    examples: [
      {
        title: 'A confirmed lesson',
        code: `<LearningCard
  title="Carousels held reach better than single images"
  outcome="confirmed"
  recordedOn="2026-10-02"
  appliedTo="Next month's content plan"
>
  Across eight posts, carousels kept 18% more viewers past the second slide.
</LearningCard>`,
        node: (
          <LearningCard
            title="Carousels held reach better than single images"
            outcome="confirmed"
            recordedOn="2026-10-02"
            appliedTo="Next month's content plan"
          >
            Across eight posts, carousels kept 18% more viewers past the second slide.
          </LearningCard>
        ),
      },
    ],
    accessibility: ['The outcome is written as text, never only as a colour.'],
    related: ['learning-record', 'decision-card'],
  },
  {
    slug: 'field-note',
    name: 'FieldNote',
    group: 'Knowledge',
    stage: 'Observe',
    summary: 'A short marginal note: a thought written down while it is still fresh.',
    when: ['Capturing an unfinished idea next to the work it came from.', 'Adding context that does not justify a full card.'],
    avoid: ['Long-form writing. Use a notebook page or a research card.'],
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The note itself.' },
      { name: 'title', type: 'string', description: 'Optional short heading.' },
      { name: 'date', type: 'string | Date', description: 'When the note was written.' },
      { name: 'tone', type: "'margin' | 'plain'", default: "'margin'", description: 'Margin notes sit slightly apart from the page.' },
    ],
    examples: [
      {
        title: 'Margin note',
        code: `<FieldNote title="Something to check" date="2026-10-03">
  The spike on Thursday may be a repost, not new viewers. Look at follower split first.
</FieldNote>`,
        node: (
          <FieldNote title="Something to check" date="2026-10-03">
            The spike on Thursday may be a repost, not new viewers. Look at follower split first.
          </FieldNote>
        ),
      },
    ],
    accessibility: ['A note is an <aside>-style region with its own label; it does not interrupt reading order.'],
    related: ['notebook-card'],
  },
  {
    slug: 'notebook-card',
    name: 'NotebookCard',
    group: 'Knowledge',
    stage: 'Observe',
    summary: 'A page of a research notebook: eyebrow, title, page number and actions.',
    when: ['Grouping related notes, observations and sketches into a page.', 'Giving a working document a calm, editorial frame.'],
    avoid: ['Using it for data tables or dense forms.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Page title.' },
      { name: 'eyebrow', type: 'string', description: 'Small label above the title, e.g. the project name.' },
      { name: 'actions', type: 'ReactNode', description: 'Buttons or links placed in the page header.' },
      { name: 'page', type: 'number | string', description: 'Page number shown in the margin.' },
      { name: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level of the title.' },
    ],
    examples: [
      {
        title: 'Notebook page',
        code: `<NotebookCard eyebrow="Account study" title="Week 38 notes" page={12}>
  Reach rose on Tuesday; comments did not follow. Revisit next week.
</NotebookCard>`,
        node: (
          <NotebookCard eyebrow="Account study" title="Week 38 notes" page={12}>
            Reach rose on Tuesday; comments did not follow. Revisit next week.
          </NotebookCard>
        ),
      },
    ],
    accessibility: ['The page number is announced with the title, so screen-reader users can navigate by page.'],
    related: ['field-note', 'research-card'],
  },
  {
    slug: 'experiment-card',
    name: 'ExperimentCard',
    group: 'Knowledge',
    stage: 'Decide',
    summary: 'A hypothesis under test, what it is measured by, and its result when concluded.',
    when: ['Stating a hypothesis before a change is made.', 'Keeping the result next to the question it answered.'],
    avoid: ['Starting an experiment without a metric. Without one there is nothing to conclude.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Short name of the experiment.' },
      { name: 'hypothesis', type: 'string', required: true, description: 'What is expected to happen, and why.' },
      { name: 'metric', type: 'string', description: 'What will be measured.' },
      { name: 'status', type: "'planned' | 'running' | 'concluded' | 'abandoned'", default: "'planned'", description: 'Current state.' },
      { name: 'startedOn, endsOn', type: 'string | Date', description: 'Dates of the test window.' },
      { name: 'result', type: 'string', description: 'What was observed, once concluded.' },
    ],
    examples: [
      {
        title: 'Running experiment',
        code: `<ExperimentCard
  title="Hook in the first two seconds"
  hypothesis="A question hook will hold more viewers past three seconds."
  metric="Viewers past 3 s"
  status="running"
  startedOn="2026-09-28"
  endsOn="2026-10-12"
/>`,
        node: (
          <ExperimentCard
            title="Hook in the first two seconds"
            hypothesis="A question hook will hold more viewers past three seconds."
            metric="Viewers past 3 s"
            status="running"
            startedOn="2026-09-28"
            endsOn="2026-10-12"
          />
        ),
      },
    ],
    accessibility: ['Dates are rendered as time elements; status is text.'],
    related: ['learning-card', 'decision-card'],
  },
  {
    slug: 'research-card',
    name: 'ResearchCard',
    group: 'Knowledge',
    stage: 'Interpret',
    summary: 'A research question, its progress and the sources gathered so far.',
    when: ['Tracking an open question across several sessions.', 'Showing whether a question is still exploring or has settled.'],
    avoid: ['Using it for a single fact. Use an EvidenceCard.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Name of the research thread.' },
      { name: 'question', type: 'string', required: true, description: 'The question being answered.' },
      { name: 'status', type: "'exploring' | 'synthesizing' | 'settled'", default: "'exploring'", description: 'Progress of the question.' },
      { name: 'tags', type: 'string[]', description: 'Short topic tags.' },
      { name: 'sourceCount, updatedOn', type: 'number, string | Date', description: 'How many sources, and when they were last updated.' },
      { name: 'href', type: 'string', description: 'Link to the full research page. Makes the whole card a link.' },
    ],
    examples: [
      {
        title: 'Research thread',
        code: `<ResearchCard
  title="Why do viewers leave in the first second?"
  question="Which opening frames are linked with early exits?"
  status="synthesizing"
  tags={['retention', 'editing']}
  sourceCount={9}
  updatedOn="2026-10-04"
/>`,
        node: (
          <ResearchCard
            title="Why do viewers leave in the first second?"
            question="Which opening frames are linked with early exits?"
            status="synthesizing"
            tags={['retention', 'editing']}
            sourceCount={9}
            updatedOn="2026-10-04"
          />
        ),
      },
    ],
    accessibility: ['When `href` is set, the title is the single link, and the card remains a region for its content.'],
    related: ['notebook-card', 'evidence-card'],
  },
  {
    slug: 'knowledge-node',
    name: 'KnowledgeNode',
    group: 'Knowledge',
    stage: 'Interpret',
    summary: 'A compact entry in a knowledge garden: a concept with its kind and how connected it is.',
    when: ['Listing concepts in a digital garden or wiki index.', 'Showing how many links a concept has.'],
    avoid: ['Using it as a navigation menu. It describes a concept, it does not route the user.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Name of the concept.' },
      { name: 'summary', type: 'string', description: 'One line describing it.' },
      { name: 'kind', type: 'string', description: 'What kind of thing it is, e.g. "Principle".' },
      { name: 'intent', type: 'Intent', description: 'Colours and glyph for the node.' },
      { name: 'href', type: 'string', description: 'Link to the concept. Makes the title the link.' },
      { name: 'linkCount', type: 'number', description: 'Connections to other nodes, announced as text.' },
    ],
    examples: [
      {
        title: 'Garden entry',
        code: `<KnowledgeNode
  title="Sampling bias"
  summary="When the posts we review are not the posts that performed."
  kind="Concept"
  intent="insight"
  linkCount={5}
/>`,
        node: (
          <KnowledgeNode
            title="Sampling bias"
            summary="When the posts we review are not the posts that performed."
            kind="Concept"
            intent="insight"
            linkCount={5}
          />
        ),
      },
    ],
    accessibility: ['Link count is announced as text ("5 links").'],
    related: ['insight-cluster'],
  },
  {
    slug: 'insight-cluster',
    name: 'InsightCluster',
    group: 'Knowledge',
    stage: 'Interpret',
    summary: 'A group of related insights, shown together so patterns across them are visible.',
    when: ['Grouping insights that point at the same underlying question.', 'Showing a theme across several research threads.'],
    avoid: ['Grouping unrelated insights just to fill space.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Name of the cluster.' },
      { name: 'summary', type: 'string', description: 'What the insights have in common.' },
      { name: 'insights', type: 'ClusterInsight[]', required: true, description: 'Each has id, title, optional summary and href.' },
      { name: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level of the title.' },
    ],
    examples: [
      {
        title: 'Cluster of insights',
        code: `<InsightCluster
  title="Timing and reach"
  summary="Three insights that point the same way."
  insights={[
    { id: 'a', title: 'Tuesday outperforms Friday', summary: 'Across 21 posts.' },
    { id: 'b', title: 'Morning posts keep early viewers', href: '/insights/morning' },
    { id: 'c', title: 'Reach follows the first hook' },
  ]}
/>`,
        node: (
          <InsightCluster
            title="Timing and reach"
            summary="Three insights that point the same way."
            insights={[
              { id: 'a', title: 'Tuesday outperforms Friday', summary: 'Across 21 posts.' },
              { id: 'b', title: 'Morning posts keep early viewers', href: '#morning' },
              { id: 'c', title: 'Reach follows the first hook' },
            ]}
          />
        ),
      },
    ],
    accessibility: ['The insights are a list; each linked insight is a single link.'],
    related: ['insight-card', 'knowledge-node'],
  },
  {
    slug: 'learning-record',
    name: 'LearningRecord',
    group: 'Structures',
    stage: 'Learn',
    summary: 'A permanent, dated record of a lesson, linked back to the decision that produced it.',
    when: ['Keeping a log of what the team learned, for future readers.', 'Linking a lesson to the decision it came from.'],
    avoid: ['Using it for in-progress thoughts. Those belong in a FieldNote.'],
    props: [
      { name: 'title', type: 'string', required: true, description: 'The lesson.' },
      { name: 'outcome', type: "'pending' | 'confirmed' | 'mixed' | 'refuted'", required: true, description: 'Result relative to the expectation.' },
      { name: 'recordedOn', type: 'string | Date', required: true, description: 'When the lesson was recorded.' },
      { name: 'decision', type: '{ label: string; href?: string }', description: 'The decision this lesson came from.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Explanation of the lesson.' },
    ],
    examples: [
      {
        title: 'Recorded lesson',
        code: `<LearningRecord
  title="Twice-weekly posting kept reach steady"
  outcome="mixed"
  recordedOn="2026-10-06"
  decision={{ label: 'Post twice a week, not daily', href: '#decision' }}
>
  Reach held, but follower growth slowed. Review in November with the follower split.
</LearningRecord>`,
        node: (
          <LearningRecord
            title="Twice-weekly posting kept reach steady"
            outcome="mixed"
            recordedOn="2026-10-06"
            decision={{ label: 'Post twice a week, not daily', href: '#decision' }}
          >
            Reach held, but follower growth slowed. Review in November with the follower split.
          </LearningRecord>
        ),
      },
    ],
    accessibility: ['Rendered as an article with its outcome in text and a link to the originating decision.'],
    related: ['learning-card', 'decision-card'],
  },
  {
    slug: 'evidence-timeline',
    name: 'EvidenceTimeline',
    group: 'Structures',
    stage: 'Observe',
    summary: 'An ordered list of observations, evidence and decisions over time, each marked with its intent.',
    when: ['Showing how a question developed across observations and decisions.', 'Reviewing the history behind a decision.'],
    avoid: ['Plotting numeric series. Use a chart from @fieldnote-ui/charts.'],
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible name of the timeline.' },
      { name: 'items', type: 'TimelineItem[]', required: true, description: 'Each has id, at, intent, title, description and optional href.' },
      { name: 'emptyMessage', type: 'ReactNode', description: 'Shown when there are no items.' },
    ],
    examples: [
      {
        title: 'Timeline of a question',
        code: `<EvidenceTimeline
  label="History of the posting-time question"
  items={[
    { id: '1', at: '2026-09-02', intent: 'observation', title: 'Reach data exported' },
    { id: '2', at: '2026-09-09', intent: 'evidence', title: 'Tuesday lift confirmed across 3 weeks' },
    { id: '3', at: '2026-09-20', intent: 'decision', title: 'Posting schedule set to twice weekly' },
    { id: '4', at: '2026-10-06', intent: 'learning', title: 'Reach steady, growth slower' },
  ]}
/>`,
        node: (
          <EvidenceTimeline
            label="History of the posting-time question"
            items={[
              { id: '1', at: '2026-09-02', intent: 'observation', title: 'Reach data exported' },
              { id: '2', at: '2026-09-09', intent: 'evidence', title: 'Tuesday lift confirmed across 3 weeks' },
              { id: '3', at: '2026-09-20', intent: 'decision', title: 'Posting schedule set to twice weekly' },
              { id: '4', at: '2026-10-06', intent: 'learning', title: 'Reach steady, growth slower' },
            ]}
          />
        ),
      },
    ],
    accessibility: ['An ordered list with a label. Each item states its intent in text and its date in a time element.'],
    related: ['decision-panel', 'learning-record'],
  },
  {
    slug: 'decision-panel',
    name: 'DecisionPanel',
    group: 'Structures',
    stage: 'Decide',
    summary: 'An interactive decision point: options as a radio group, a rationale field and a recorded result.',
    when: ['Asking a person to choose between defined options and record why.', 'Capturing the reasoning at the moment of choice.'],
    avoid: ['Choices with more than about seven options. Group them first.'],
    props: [
      { name: 'question', type: 'string', required: true, description: 'The question being decided.' },
      { name: 'options', type: 'DecisionOption[]', required: true, description: 'Each option has id, label and optional description.' },
      { name: 'defaultOptionId', type: 'string', description: 'Pre-selected option.' },
      { name: 'submitLabel', type: 'string', default: "'Record decision'", description: 'Label of the submit button.' },
      { name: 'rationaleLabel', type: 'string', default: "'Rationale (optional)'", description: 'Label of the rationale field.' },
      { name: 'onDecide', type: '(result: DecisionResult) => void', description: 'Called when a decision is recorded. Client components only.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents changes to a closed decision.' },
    ],
    examples: [
      {
        title: 'Recording a choice',
        description: 'Try the arrow keys inside the option group. Recording announces the result through a live region.',
        code: `<DecisionPanel
  question="Which reach metric should guide next month's plan?"
  options={[
    { id: 'reach', label: 'Reach', description: 'New viewers per post.' },
    { id: 'saves', label: 'Saves', description: 'A proxy for intent to return.' },
    { id: 'follows', label: 'Follows', description: 'Converts viewers into an audience.' },
  ]}
  defaultOptionId="saves"
/>`,
        node: (
          <DecisionPanel
            question="Which reach metric should guide next month's plan?"
            options={[
              { id: 'reach', label: 'Reach', description: 'New viewers per post.' },
              { id: 'saves', label: 'Saves', description: 'A proxy for intent to return.' },
              { id: 'follows', label: 'Follows', description: 'Converts viewers into an audience.' },
            ]}
            defaultOptionId="saves"
          />
        ),
      },
    ],
    accessibility: [
      'Options are a native radio group, so arrow keys, Space and screen-reader group announcements work without custom code.',
      'Each option is labelled by its name and described by its description.',
      'The recorded result is announced in a polite live region.',
    ],
    related: ['decision-card', 'evidence-timeline'],
  },
  {
    slug: 'primitives',
    name: 'Primitives',
    group: 'Primitives',
    stage: 'All stages',
    summary: 'The small parts the cards are built from: intent badges, status chips, tags, meters, buttons and the theme toggle.',
    when: ['Labelling something with an intent or status.', 'Showing a bounded value such as confidence or progress.'],
    avoid: ['Using a chip as a button. Chips are labels; use Button for actions.'],
    props: [
      { name: 'IntentBadge: intent', type: 'Intent', required: true, description: 'observation, evidence, insight, decision or learning.' },
      { name: 'StatusChip: tone', type: "'positive' | 'negative' | 'caution' | 'info' | 'neutral'", default: "'neutral'", description: 'Colour role. Text always states the meaning.' },
      { name: 'Tag: href', type: 'string', description: 'Makes the tag a link.' },
      { name: 'Meter: value, max, label', type: 'number, number, string', required: true, description: 'Exposed as role="meter".' },
      { name: 'Button: variant, size', type: "'primary' | 'secondary' | 'ghost'; 'sm' | 'md'", description: 'Native button, forwards all props.' },
      { name: 'ThemeToggle: label', type: 'string', description: 'Switches between light, dark and system. Needs FieldNoteProvider.' },
    ],
    examples: [
      {
        title: 'Intent badges',
        description: 'Each intent has a glyph and a name. Colour reinforces them; it never replaces them.',
        code: `<IntentBadge intent="observation" />
<IntentBadge intent="evidence" />
<IntentBadge intent="insight" />
<IntentBadge intent="decision" />
<IntentBadge intent="learning" />`,
        node: (
          <div className="docs-row">
            <IntentBadge intent="observation" />
            <IntentBadge intent="evidence" />
            <IntentBadge intent="insight" />
            <IntentBadge intent="decision" />
            <IntentBadge intent="learning" />
          </div>
        ),
      },
      {
        title: 'Status, tags, meter and buttons',
        code: `<StatusChip tone="positive">On track</StatusChip>
<StatusChip tone="caution">Needs review</StatusChip>
<Tag href="/topics/retention">retention</Tag>
<Meter label="Confidence" value={0.64} max={1} valueText="64%" />
<Button variant="primary">Record decision</Button>
<Button variant="secondary">Compare</Button>`,
        node: (
          <div className="docs-stack">
            <div className="docs-row">
              <StatusChip tone="positive">On track</StatusChip>
              <StatusChip tone="caution">Needs review</StatusChip>
              <Tag href="#retention">retention</Tag>
            </div>
            <Meter label="Confidence" value={0.64} max={1} valueText="64%" />
            <div className="docs-row">
              <Button variant="primary">Record decision</Button>
              <Button variant="secondary">Compare</Button>
            </div>
          </div>
        ),
      },
      {
        title: 'Theme toggle',
        description: 'Requires a FieldNoteProvider above it. The docs layout provides one.',
        code: `<ThemeToggle />`,
        node: <ThemeToggle />,
      },
    ],
    accessibility: [
      'Status and intent are always text. Meter exposes role="meter" with min, max, now and a readable valuetext.',
      'Buttons are native elements with visible focus rings in both colour schemes.',
    ],
    related: ['observation-card', 'decision-card'],
  },
];

export function getComponent(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug);
}

export const componentGroups: ComponentGroup[] = ['Cards', 'Knowledge', 'Structures', 'Primitives'];
