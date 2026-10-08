import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsPage } from '../../../components/docs-page';
import { Example } from '../../../components/example';
import { PropsTable } from '../../../components/props-table';
import { components, getComponent } from '../../../lib/registry';

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponent(slug);
  return { title: doc ? doc.name : 'Component not found' };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponent(slug);
  if (!doc) notFound();

  const related = doc.related.map((r) => getComponent(r)).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <DocsPage
      active={`/components/${doc.slug}`}
      title={doc.name}
      eyebrow={`${doc.group} · ${doc.stage}`}
      description={doc.summary}
    >
      <div className="docs-two-col">
        <section aria-labelledby="when-heading">
          <h2 id="when-heading">Use it when</h2>
          <ul>
            {doc.when.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="avoid-heading">
          <h2 id="avoid-heading">Avoid it when</h2>
          <ul>
            {doc.avoid.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </div>

      <h2>Examples</h2>
      {doc.examples.map((ex) => (
        <Example key={ex.title} title={ex.title} description={ex.description} code={ex.code}>
          {ex.node}
        </Example>
      ))}

      <h2>Props</h2>
      <p>
        Every component accepts <code>id</code> and <code>className</code>. Types come from the published package, so your
        editor autocompletes them.
      </p>
      <PropsTable caption={`${doc.name} props`} rows={doc.props} />

      <h2>Accessibility</h2>
      <ul>
        {doc.accessibility.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      {related.length > 0 ? (
        <>
          <h2>Related</h2>
          <ul className="docs-row" style={{ listStyle: 'none', padding: 0 }}>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/components/${r.slug}`}>{r.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </DocsPage>
  );
}
