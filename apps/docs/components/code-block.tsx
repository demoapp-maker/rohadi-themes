import { cx } from '../lib/cx';

export interface CodeBlockProps {
  code: string;
  label: string;
  language?: string;
  className?: string;
}

/**
 * A static code sample. The <pre> is focusable so keyboard users can scroll
 * long lines (axe: scrollable-region-focusable), and it is labelled.
 */
export function CodeBlock({ code, label, language = 'tsx', className }: CodeBlockProps) {
  return (
    <figure className={cx('docs-code', className)}>
      <figcaption className="docs-code__caption">
        <span>{label}</span>
        <span className="docs-code__lang">{language}</span>
      </figcaption>
      <pre tabIndex={0} aria-label={label} className="docs-code__pre">
        <code>{code.trim()}</code>
      </pre>
    </figure>
  );
}
