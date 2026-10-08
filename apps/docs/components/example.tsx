import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';

export interface ExampleProps {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
}

/** A live preview with its source beneath it. Both are part of the same section. */
export function Example({ title, description, code, children }: ExampleProps) {
  return (
    <section className="docs-example" aria-labelledby={`ex-${slug(title)}`}>
      <h3 id={`ex-${slug(title)}`} className="docs-example__title">
        {title}
      </h3>
      {description ? <p className="docs-example__description">{description}</p> : null}
      <div className="docs-example__preview">{children}</div>
      <CodeBlock code={code} label={`Source: ${title}`} />
    </section>
  );
}

export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
