export interface SwatchProps {
  name: string;
  token: string;
  value: string;
  /** Colour used to draw the sample's text (AA-checked by the token suite). */
  textOn?: string;
  note?: string;
}

/** A colour token shown as a chip: name, CSS variable, hex. */
export function Swatch({ name, token, value, note }: SwatchProps) {
  return (
    <li className="docs-swatch">
      <div className="docs-swatch__chip" style={{ background: value }} aria-hidden="true" />
      <div className="docs-swatch__meta">
        <p className="docs-swatch__name">{name}</p>
        <p className="docs-swatch__token">
          <code>{token}</code>
        </p>
        <p className="docs-swatch__value">
          <code>{value}</code>
        </p>
        {note ? <p className="docs-swatch__note">{note}</p> : null}
      </div>
    </li>
  );
}
