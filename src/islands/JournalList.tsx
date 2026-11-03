import { useState } from 'preact/hooks';
import { Brain, Clapperboard, CodeXml, Gamepad2, PenLine } from 'lucide-preact';

// One icon per kind. Keep in sync with src/components/KindIcon.astro.
const KIND_ICONS = { project: CodeXml, psychology: Brain, game: Gamepad2, thought: PenLine, 'video-idea': Clapperboard } as const;

function KindIcon({ kind, size = 12 }: { kind: string; size?: number }) {
  const Icon = KIND_ICONS[kind as keyof typeof KIND_ICONS] ?? PenLine;
  return <Icon size={size} aria-hidden="true" />;
}

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
              <KindIcon kind={k.kind} size={14} />
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
              <span className="chip-kind">
                <KindIcon kind={r.kind} />
                {r.kindLabel}
              </span>
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
