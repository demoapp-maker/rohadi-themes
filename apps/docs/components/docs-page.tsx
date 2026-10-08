import type { ReactNode } from 'react';
import { KnowledgeNav, NotebookLayout } from 'fieldnote-ui';
import { docsSections } from '../lib/nav';

export interface DocsPageProps {
  /** href of this page, used to mark it current in navigation. */
  active: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Marginal note (FieldNote) shown beside the page. */
  margin?: ReactNode;
  children: ReactNode;
}

/** Shared frame for every documentation page: navigation, reading column and margin. */
export function DocsPage({ active, eyebrow = 'FieldNote UI', title, description, margin, children }: DocsPageProps) {
  const sections = docsSections.map((section) => ({
    id: section.id,
    label: section.label,
    description: section.description,
    items: section.links.map((link) => ({
      label: link.label,
      href: link.href,
      current: link.href === active,
    })),
  }));
  return (
    <NotebookLayout
      title={title}
      eyebrow={eyebrow}
      description={description}
      navigation={<KnowledgeNav label="Documentation" title="FieldNote UI" sections={sections} />}
      margin={margin}
    >
      {children}
    </NotebookLayout>
  );
}
