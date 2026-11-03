import { useEffect, useRef, useState } from 'preact/hooks';
import { Search as SearchIcon, X } from 'lucide-preact';

interface Props {
  labels: { open: string; placeholder: string; empty: string; devOnly: string; close: string };
}

interface Result {
  url: string;
  title: string;
  excerpt: string;
}

interface Pagefind {
  search(q: string): Promise<{ results: { data(): Promise<{ url: string; meta: { title?: string }; excerpt: string }> }[] }>;
}

let pagefind: Promise<Pagefind | null> | null = null;
function loadPagefind(): Promise<Pagefind | null> {
  // The index is built by `pagefind` after `astro build`, so it only exists in built sites.
  pagefind ??= import(/* @vite-ignore */ `${'/pagefind/'}pagefind.js`).catch(() => null);
  return pagefind;
}

/** Search dialog. Ctrl/Cmd + K or "/" opens it. Uses the Pagefind index of the current language. */
export default function Search({ labels }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [missing, setMissing] = useState(false);

  const open = () => {
    dialog.current?.showModal();
    input.current?.focus();
    void loadPagefind().then((pf) => setMissing(!pf));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf || cancelled) return;
      const found = await pf.search(term);
      const data = await Promise.all(found.results.slice(0, 8).map((r) => r.data()));
      if (!cancelled) setResults(data.map((d) => ({ url: d.url, title: d.meta.title ?? d.url, excerpt: d.excerpt })));
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [q]);

  return (
    <>
      <button type="button" className="search-btn" onClick={open} aria-label={labels.open} title={`${labels.open} (Ctrl K)`}>
        <SearchIcon size={15} aria-hidden="true" />
      </button>
      <dialog ref={dialog} className="search-dialog" aria-label={labels.open} onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="search-box">
          <div className="search-row">
            <SearchIcon size={18} aria-hidden="true" />
            <input
              ref={input}
              type="search"
              value={q}
              placeholder={labels.placeholder}
              aria-label={labels.placeholder}
              onInput={(e) => setQ((e.target as HTMLInputElement).value)}
            />
            <button type="button" className="search-close" onClick={() => dialog.current?.close()} aria-label={labels.close}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          {missing && <p className="search-note">{labels.devOnly}</p>}
          {q.trim() && !missing && results.length === 0 && <p className="search-note">{labels.empty}</p>}
          <ul className="search-results">
            {results.map((r) => (
              <li key={r.url}>
                <a href={r.url} onClick={() => dialog.current?.close()}>
                  <b>{r.title}</b>
                  {/* Pagefind escapes the page text and only adds <mark> around matches. */}
                  <span dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
