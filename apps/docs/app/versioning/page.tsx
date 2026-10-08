import { DocsPage } from '../../components/docs-page';

export default function VersioningPage() {
  return (
    <DocsPage
      active="/versioning"
      title="Versioning"
      eyebrow="Practice"
      description="FieldNote follows Semantic Versioning, records every user-visible change with a changeset, and deprecates before it removes."
    >
      <div className="docs-callout">
        <p>
          <strong>Status: policy, not yet automated.</strong> Publishing and the release workflow are Phase 7. This page
          states the policy that the pipeline will enforce.
        </p>
      </div>

      <h2>Semantic Versioning</h2>
      <ul>
        <li>
          <strong>Major</strong> (2.0.0): removes or renames an export, changes a prop&rsquo;s type or meaning, renames a token
          or CSS variable, or changes the markup contract that a test or selector depends on.
        </li>
        <li>
          <strong>Minor</strong> (1.1.0): adds components, props, tokens or variants. Existing usage keeps working.
        </li>
        <li>
          <strong>Patch</strong> (1.0.1): fixes bugs, including accessibility fixes, and corrects documentation. A fix that
          changes appearance is called out in the changeset.
        </li>
      </ul>

      <h2>Before 1.0</h2>
      <p>
        Until 1.0.0, minor releases may include breaking changes. Each one is listed under <em>Breaking</em> in the
        changelog, with a migration note, and the migration guides are updated in the same change. Patch releases never
        break.
      </p>

      <h2>Deprecation</h2>
      <p>
        Anything that will be removed is first marked deprecated in a minor release, with its replacement named in the
        documentation and in the type (a <code>@deprecated</code> tag). It is removed no earlier than the next major release.
      </p>

      <h2>Changesets</h2>
      <p>
        Every pull request that changes a published package includes a changeset: a short file that names the package, the
        bump and the change. The release tool combines them into version numbers and changelogs. A pull request without a
        changeset is only allowed for documentation or internal tooling.
      </p>

      <h2>Commits</h2>
      <p>
        Commits follow Conventional Commits, for example <code>feat(ui): add EvidenceTimeline</code> or{' '}
        <code>fix(theme): restore focus ring in dark mode</code>. The type helps the changelog and the review.
      </p>

      <h2>Packages and channels</h2>
      <ul>
        <li>
          <code>fieldnote-ui</code> is the umbrella package. It re-exports the scoped packages so that one install is enough.
        </li>
        <li>
          The scoped packages (<code>@fieldnote-ui/tokens</code>, <code>theme</code>, <code>icons</code>, <code>ui</code>,{' '}
          <code>layouts</code>, <code>charts</code>) are versioned together, so their versions always match.
        </li>
        <li>
          <code>latest</code> receives stable releases. <code>next</code> receives pre-releases for testing.
        </li>
      </ul>

      <h2>Support</h2>
      <p>
        The current major version receives fixes. The previous major receives critical fixes for six months after the next
        major is released. Node.js versions follow the current active LTS line.
      </p>
    </DocsPage>
  );
}
