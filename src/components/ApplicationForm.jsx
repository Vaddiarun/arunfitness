import { useState } from 'react';
import { wa } from '../data.js';

const input =
  'min-h-[48px] rounded-md border border-neutral-800 bg-surface px-3.5 py-3.5 text-[15px] text-ink';
const label = 'flex flex-col gap-2.5 text-[11px] uppercase tracking-[0.2em] text-neutral-500';

export default function ApplicationForm() {
  const [sent, setSent] = useState(null);

  if (sent) {
    return (
      <div className="flex flex-col gap-6 py-12">
        <h2 className="m-0 text-[clamp(32px,4.4vw,56px)] font-medium leading-[1.02] tracking-[-0.035em]">APPLICATION RECEIVED.</h2>
        <p className="m-0 text-lg leading-relaxed text-neutral-300">
          Your transformation starts with one decision. Arun will connect with you on WhatsApp.
        </p>
        <a
          href={wa(`Hi Arun, I just submitted the application on your website. I'm ${sent.name || 'ready to start'} — goal: ${sent.goal}, starting ${String(sent.start).toLowerCase()}.`)}
          target="_blank" rel="noopener noreferrer"
          className="self-start rounded-md border border-accent bg-accent-900 px-7 py-4 text-[13px] uppercase tracking-[0.16em] text-accent-100 hover:bg-accent-800"
        >
          Message Arun now
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget));
        setSent(d);
      }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3.5">
        <h2 className="m-0 text-[clamp(32px,4.4vw,60px)] font-medium leading-none tracking-[-0.035em]">TRANSFORMATION APPLICATION</h2>
        <p className="m-0 text-base text-neutral-400">Six lines about you. Arun replies on WhatsApp.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        <label className={label}>Name<input name="name" required className={input} /></label>
        <label className={label}>Age<input name="age" inputMode="numeric" className={input} /></label>
        <label className={label}>Gender
          <select name="gender" className={input}><option>Male</option><option>Female</option><option>Prefer not to say</option></select>
        </label>
        <label className={label}>Height<input name="height" placeholder="cm" className={input} /></label>
        <label className={label}>Current weight<input name="weight" placeholder="kg" className={input} /></label>
        <label className={label}>Goal
          <select name="goal" className={input}>
            <option>Fat loss</option><option>Muscle gain</option><option>Wedding transformation</option>
            <option>Body recomposition</option><option>General fitness</option><option>Other</option>
          </select>
        </label>
        <label className={label}>Current fitness level
          <select name="level" className={input}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
        </label>
        <label className={label}>WhatsApp number<input name="whatsapp" required inputMode="tel" className={input} /></label>
        <label className={label}>Instagram username<input name="instagram" placeholder="@" className={input} /></label>
        <label className={label}>When do you want to start?
          <select name="start" className={input}>
            <option>Immediately</option><option>Within 2 weeks</option><option>This month</option><option>Just exploring</option>
          </select>
        </label>
      </div>
      <button type="submit"
        className="self-start cursor-pointer rounded-md border border-accent bg-accent-900 px-7 py-4 text-[13px] uppercase tracking-[0.16em] text-accent-100 hover:bg-accent-800">
        Build my transformation plan
      </button>
    </form>
  );
}
