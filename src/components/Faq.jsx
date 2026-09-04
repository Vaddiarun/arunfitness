import { useState } from 'react';
import { faqs } from '../data.js';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {faqs.map(([q, a], i) => (
        <div key={q} className="border-t border-neutral-800">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-baseline justify-between gap-5 py-[22px] text-left text-[19px] font-medium text-ink hover:text-accent-200"
          >
            <span>{q}</span>
            <span className="text-xl leading-none text-accent-300">{open === i ? '−' : '+'}</span>
          </button>
          <div
            className="max-w-[68ch] overflow-hidden text-base leading-relaxed text-neutral-400 transition-all duration-300"
            style={{ maxHeight: open === i ? 260 : 0, opacity: open === i ? 1 : 0, paddingBottom: open === i ? 24 : 0 }}
          >
            {a}
          </div>
        </div>
      ))}
    </div>
  );
}
