import { useEffect, useRef, useState } from 'preact/hooks';
import type { Lang } from '../lib/i18n';
import { EDGES, NODES, type NodeId } from '../lib/mindmap';

interface Props {
  lang: Lang;
  hint: string;
}

const PHONE_BREAKPOINT = 560;

/** Mind map of interests. Hover, focus or tap a topic to light up its links. */
export default function MindMap({ lang, hint }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<NodeId | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const phone = size.w > 0 && size.w < PHONE_BREAKPOINT;
  const pos = (id: NodeId) => {
    const node = NODES.find((n) => n.id === id)!;
    return phone ? node.phone : node.desk;
  };

  const linked = (id: NodeId) =>
    active === id || EDGES.some((e) => (e.a === active && e.b === id) || (e.b === active && e.a === id));
  const activeLinks = active ? EDGES.filter((e) => e.a === active || e.b === active) : [];
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <div>
      <p className="mind-cap" aria-live="polite">
        {activeNode ? (
          <>
            <b>{activeNode.label[lang]}</b> → {activeLinks.map((e) => e.link[lang]).join(' · ')}
          </>
        ) : (
          hint
        )}
      </p>
      <div
        ref={box}
        className={`mind-map${active ? ' focus' : ''}${phone ? ' phone' : ''}`}
        onMouseLeave={() => setActive(null)}
      >
        <svg aria-hidden="true">
          {size.w > 0 &&
            EDGES.map((e) => {
              const a = pos(e.a);
              const b = pos(e.b);
              const on = active !== null && (e.a === active || e.b === active);
              return (
                <line
                  key={e.a + e.b}
                  className={on ? 'on' : undefined}
                  x1={(a[0] / 100) * size.w}
                  y1={(a[1] / 100) * size.h}
                  x2={(b[0] / 100) * size.w}
                  y2={(b[1] / 100) * size.h}
                />
              );
            })}
        </svg>
        {NODES.map((n) => {
          const [left, top] = pos(n.id);
          return (
            <button
              key={n.id}
              type="button"
              className={`mind-node${active && linked(n.id) ? ' on' : ''}`}
              style={{ left: `${left}%`, top: `${top}%`, background: n.color }}
              aria-pressed={active === n.id}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
            >
              {n.label[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
