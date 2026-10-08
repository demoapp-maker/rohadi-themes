export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

/** Typed API reference. Presentational only; kept in sync with source by review and tests. */
export function PropsTable({ rows, caption }: { rows: PropRow[]; caption: string }) {
  return (
    <div className="docs-table-wrap" tabIndex={0} role="region" aria-label={`${caption}, scrollable`}>
      <table className="docs-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">
                <code>{row.name}</code>
                {row.required ? <span className="docs-required"> required</span> : null}
              </th>
              <td>
                <code>{row.type}</code>
              </td>
              <td>{row.default ? <code>{row.default}</code> : <span aria-label="none">—</span>}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
