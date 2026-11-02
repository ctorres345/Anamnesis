import { useId, useState } from 'preact/hooks';

interface Props {
  question: string;
  options: [string, string, string, string, string];
  thanks: string;
  hint: string;
}

/**
 * 1-5 scale at the end of an entry, in place of "likes".
 * For now the answer stays in the page. Phase 5 sends an anonymous count to a Worker + KV.
 */
export default function Likert({ question, options, thanks, hint }: Props) {
  const name = useId();
  const [value, setValue] = useState<number | null>(null);

  return (
    <form className="likert" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>{question}</legend>
        <div className="likert-scale">
          {options.map((label, i) => (
            <label key={label}>
              <input type="radio" name={name} value={i + 1} checked={value === i + 1} onChange={() => setValue(i + 1)} />
              <span className="likert-dot" aria-hidden="true" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="likert-out" aria-live="polite">
        {value ? thanks : hint}
      </p>
    </form>
  );
}
