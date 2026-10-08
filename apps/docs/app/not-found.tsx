import Link from 'next/link';
import { DocsPage } from '../components/docs-page';

export default function NotFound() {
  return (
    <DocsPage active="" title="Page not found" eyebrow="404" description="This page has not been written yet, or the address has changed.">
      <p>
        Try the <Link href="/components">component index</Link> or start from the <Link href="/">overview</Link>.
      </p>
    </DocsPage>
  );
}
