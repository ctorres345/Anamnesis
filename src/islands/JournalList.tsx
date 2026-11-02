import { useState } from 'preact/hooks';

export interface Row {
  url: string;
  title: string;
  summary?: string;
  date: string; // YYYY-MM-DD
  kind: string;
  kindLabel: string;
  note?: string;
  sample: boolean;
}

interface Props {
  rows: Row[];
  /** Show the filter chips (needs client:load). Without it, the list renders as plain HTML. */
  filters?: { label: string; all: string; empty: string; sample: string; kinds: { kind: string; label: string }[] };
  sampleLabel: string;
}

/** Field-notes list: date, title, kind chip and a handwritten margin note. */
export default function JournalList({ rows, filters, sampleLabel }: Props) {
  const [kind, setKind] = useState<string>('all');
  const shown = kind === 'all' ? rows : rows.filter((r) => r.kind === kind);

  return (
    <div>
      {filters && (
        <div className="jl-filters" role="group" aria-label={filters.label}>
          <button type="button" aria-pressed={kind === 'all'} onClick={() => setKind('all')}>
            {filters.all}
          </button>
          {filters.kinds.map((k) => (
            <button key={k.kind} type="button" data-kind={k.kind} aria-pressed={kind === k.kind} onClick={() => setKind(k.kind)}>
              <i aria-hidden="true" />
              {k.label}
            </button>
          ))}
        </div>
      )}
      <div className="jl-rows">
        {shown.map((r) => (
          <a key={r.url} className="jl-row" href={r.url} data-kind={r.kind}>
            <span className="jl-date">{r.date}</span>
            <span className="jl-title">
              {r.title}
              {r.summary && <small>{r.summary}</small>}
            </span>
            <span className="jl-meta">
              <span className="chip-kind">{r.kindLabel}</span>
              {r.sample && <span className="badge-sample">{sampleLabel}</span>}
            </span>
            <span className="jl-note">{r.note ?? ''}</span>
          </a>
        ))}
        {shown.length === 0 && filters && <p className="jl-empty">{filters.empty}</p>}
      </div>
    </div>
  );
}
