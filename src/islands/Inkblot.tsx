import { useMemo, useState } from 'react';
import { cardNumeral, makeBlot } from '../lib/inkblot';

interface Props {
  labels: { card: string; label: string; question: string; next: string; fine: string; aria: string };
}

const FIRST_SEED = 1847;
const SEED_STEP = 7919;

/** Pixel inkblot card. Decorative: "just for fun, not a test". */
export default function Inkblot({ labels }: Props) {
  const [n, setN] = useState(0);
  const cells = useMemo(() => makeBlot(FIRST_SEED + n * SEED_STEP), [n]);

  return (
    <figure className="ink-card" aria-label={labels.aria}>
      <div className="ink-top">
        <span>
          {labels.card} {cardNumeral(n)}
        </span>
        <span>{labels.label}</span>
      </div>
      <div className="ink-wrap">
        <div className="ink-blot" aria-hidden="true">
          {cells.map((c, i) => (
            <i key={i} className={c} />
          ))}
        </div>
      </div>
      <div className="ink-bottom">
        <span className="hand">{labels.question}</span>
        <button type="button" className="ink-btn" onClick={() => setN((v) => v + 1)}>
          {labels.next} ↻
        </button>
      </div>
      <figcaption className="ink-fine">{labels.fine}</figcaption>
    </figure>
  );
}
