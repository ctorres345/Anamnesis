import { useEffect, useId, useState } from 'preact/hooks';

interface Props {
  /** "en/yuyay": language folder + file name. */
  post: string;
  question: string;
  options: [string, string, string, string, string];
  thanks: string;
  hint: string;
  countLabel: string;
  countOneLabel: string;
  error: string;
}

type Counts = [number, number, number, number, number];
const API = '/api/reactions';
const storageKey = (post: string) => `answered:${post}`;

function readAnswered(post: string): number | null {
  try {
    const v = Number(localStorage.getItem(storageKey(post)));
    return v >= 1 && v <= 5 ? v : null;
  } catch {
    return null;
  }
}

/**
 * 1–5 scale at the end of an entry, in place of "likes".
 * Sends one anonymous answer to the Worker (only counts are stored) and remembers in this
 * browser that the post was answered, so the same visitor isn't counted twice.
 */
export default function Likert({ post, question, options, thanks, hint, countLabel, countOneLabel, error }: Props) {
  const name = useId();
  const [value, setValue] = useState<number | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const prev = readAnswered(post);
    if (prev) setValue(prev);
    fetch(`${API}?post=${encodeURIComponent(post)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.counts && setCounts(d.counts))
      .catch(() => {});
  }, [post]);

  async function answer(v: number) {
    if (value) return; // one answer per visitor
    setValue(v);
    try {
      localStorage.setItem(storageKey(post), String(v));
    } catch {
      // private mode: still send the answer
    }
    try {
      const r = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ post, answer: v }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setCounts((await r.json()).counts);
    } catch {
      setFailed(true);
    }
  }

  const total = counts ? counts.reduce((a, b) => a + b, 0) : 0;
  const max = counts ? Math.max(1, ...counts) : 1;
  const showResults = value !== null && counts !== null && total > 0;

  return (
    <form className="likert" onSubmit={(e) => e.preventDefault()}>
      <fieldset disabled={value !== null}>
        <legend>{question}</legend>
        <div className="likert-scale">
          {options.map((label, i) => (
            <label key={label}>
              {showResults && (
                <span className="likert-bar" aria-hidden="true">
                  <span style={{ height: `${(counts![i] / max) * 100}%` }} />
                </span>
              )}
              <input type="radio" name={name} value={i + 1} checked={value === i + 1} onChange={() => answer(i + 1)} />
              <span className="likert-dot" aria-hidden="true" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="likert-out" aria-live="polite">
        {failed ? error : value ? (showResults ? `${thanks} ${total} ${total === 1 ? countOneLabel : countLabel}.` : thanks) : hint}
      </p>
    </form>
  );
}
