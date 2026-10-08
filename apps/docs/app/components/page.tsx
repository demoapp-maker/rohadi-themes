import Link from 'next/link';
import { DocsPage } from '../../components/docs-page';
import { components, componentGroups } from '../../lib/registry';

export default function ComponentsIndexPage() {
  return (
    <DocsPage
      active="/components"
      title="Components"
      eyebrow="Reference"
      description="Fifteen building blocks. The first five are the decision-intelligence primitives; the rest give them a place to live."
    >
      <p className="docs-lede">
        Components are named for the thinking they support, not for their markup. If you can name the kind of claim a
        piece of UI makes, you can usually find the component for it.
      </p>

      {componentGroups.map((group) => {
        const items = components.filter((c) => c.group === group);
        return (
          <section key={group} aria-labelledby={`group-${group}`}>
            <h2 id={`group-${group}`}>{group}</h2>
            <div className="docs-grid">
              {items.map((c) => (
                <Link key={c.slug} className="docs-link-card" href={`/components/${c.slug}`}>
                  <p className="docs-link-card__title">{c.name}</p>
                  <p className="docs-link-card__body">{c.summary}</p>
                  <p className="docs-link-card__meta">{c.stage}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </DocsPage>
  );
}
