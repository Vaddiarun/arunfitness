import { useState } from 'react';
import { wa } from '../lib/config';
import { quizGoals, quizWhens, faqs } from '../data';

export function Quiz() {
  const [goal, setGoal] = useState(null);
  const [when, setWhen] = useState(null);

  const chip = (active) =>
    `px-[18px] py-[13px] min-h-[44px] rounded-md text-[13px] tracking-[0.06em] border transition-colors ${
      active ? 'bg-accent-900 border-accent text-accent-100' : 'bg-transparent border-neutral-700 text-neutral-300 hover:border-accent'
    }`;

  const href = wa(
    `Hi Arun, I found you through your website. My goal is ${goal || 'a transformation'} and I want to start ${(when || 'soon').toLowerCase()}. I'd like to know more.`
  );

  return (
    <section className="section">
      <div className="max-w-[900px] mx-auto flex flex-col gap-10">
        <h2 className="h-display text-[clamp(32px,4.4vw,60px)] m-0">FIND YOUR PROGRAM</h2>

        <div className="flex flex-col gap-4">
          <div className="text-xs tracking-[0.22em] uppercase text-neutral-500">What are you trying to achieve?</div>
          <div className="flex flex-wrap gap-2.5">
            {quizGoals.map((g) => (
              <button key={g} type="button" onClick={() => setGoal(g)} className={chip(goal === g)}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xs tracking-[0.22em] uppercase text-neutral-500">How soon do you want to start?</div>
          <div className="flex flex-wrap gap-2.5">
            {quizWhens.map((w) => (
              <button key={w} type="button" onClick={() => setWhen(w)} className={chip(when === w)}>
                {w}
              </button>
            ))}
          </div>
        </div>

        <a href={href} target="_blank" rel="noopener" className="btn-primary self-start">
          Get my recommendation <span className="text-base">→</span>
        </a>
        <p className="m-0 text-[13px] text-neutral-600">Opens WhatsApp with your answers already written out.</p>
      </div>
    </section>
  );
}

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'age', label: 'Age', inputMode: 'numeric' },
  { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Prefer not to say'] },
  { name: 'height', label: 'Height', placeholder: 'cm' },
  { name: 'weight', label: 'Current weight', placeholder: 'kg' },
  { name: 'goal', label: 'Goal', options: ['Fat loss', 'Muscle gain', 'Wedding transformation', 'Body recomposition', 'General fitness', 'Other'] },
  { name: 'level', label: 'Current fitness level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { name: 'whatsapp', label: 'WhatsApp number', required: true, inputMode: 'tel' },
  { name: 'instagram', label: 'Instagram username', placeholder: '@' },
  { name: 'start', label: 'When do you want to start?', options: ['Immediately', 'Within 2 weeks', 'This month', 'Just exploring'] },
];

export function ApplyForm() {
  const [applicant, setApplicant] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k) => (f.get(k) || '').toString().trim();
    setApplicant({ name: g('name'), goal: g('goal'), start: g('start') });
  };

  if (applicant) {
    const href = wa(
      `Hi Arun, I just submitted the application on your website. I'm ${applicant.name || 'ready to start'} — goal: ${applicant.goal}, starting ${applicant.start.toLowerCase()}.`
    );
    return (
      <section id="apply" className="section">
        <div className="max-w-[900px] mx-auto flex flex-col gap-6 py-12">
          <h2 className="h-display text-[clamp(32px,4.4vw,56px)] leading-[1.02] m-0">APPLICATION RECEIVED.</h2>
          <p className="m-0 text-lg leading-relaxed text-neutral-300">
            Your transformation starts with one decision. Arun will connect with you on WhatsApp.
          </p>
          <a href={href} target="_blank" rel="noopener" className="btn-primary self-start">
            Message Arun now
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section">
      <form onSubmit={submit} className="max-w-[900px] mx-auto flex flex-col gap-[34px]">
        <div className="flex flex-col gap-3.5">
          <h2 className="h-display text-[clamp(32px,4.4vw,60px)] m-0">TRANSFORMATION APPLICATION</h2>
          <p className="m-0 text-base text-neutral-400">Six lines about you. Arun replies on WhatsApp.</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {FIELDS.map((f) => (
            <label key={f.name} className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-500">
              {f.label}
              {f.options ? (
                <select name={f.name} className="field">
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input name={f.name} required={f.required} inputMode={f.inputMode} placeholder={f.placeholder} className="field" />
              )}
            </label>
          ))}
        </div>

        <button type="submit" className="btn-primary self-start cursor-pointer">
          Build my transformation plan
        </button>
      </form>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="max-w-[900px] mx-auto flex flex-col gap-9">
        <h2 className="reveal h-display text-[clamp(32px,4.4vw,60px)] m-0">FAQ</h2>
        <div className="flex flex-col">
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-t border-divider">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-baseline justify-between gap-5 py-[22px] bg-transparent border-0 text-left font-heading font-medium text-[19px] text-ink cursor-pointer hover:text-accent-200"
              >
                <span>{q}</span>
                <span className="text-accent-300 text-xl leading-none">{open === i ? '−' : '+'}</span>
              </button>
              <div
                className="overflow-hidden transition-[max-height,opacity,padding] duration-[350ms] text-base leading-relaxed text-neutral-400 max-w-[68ch]"
                style={{
                  maxHeight: open === i ? 260 : 0,
                  opacity: open === i ? 1 : 0,
                  paddingBottom: open === i ? 24 : 0,
                }}
              >
                {a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
