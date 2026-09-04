import { useRef, useState } from 'react';
import BeforeAfter from './BeforeAfter';
import { LogoMark } from './Chrome';
import { useCountUp } from '../hooks/useReveal';
import { wa, INSTAGRAM_URL, INSTAGRAM_HANDLE, EMAIL, PHONE } from '../lib/config';
import {
  transformations,
  categories,
  timeline,
  weddingBits,
  systemSteps,
  dashboard,
  chatThread,
  testimonials,
  programs,
} from '../data';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end px-6 pt-[96px] md:pt-[120px] pb-[112px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="images/hero.jpeg" alt="Arun Kumar at the gym" className="w-full h-full object-cover object-[72%_15%] md:object-contain md:object-right-bottom opacity-[.85]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,24,38,.96)_0%,rgba(22,24,38,.86)_38%,rgba(22,24,38,.35)_68%,rgba(22,24,38,.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,24,38,.7)_0%,rgba(22,24,38,0)_26%,rgba(22,24,38,0)_70%,rgba(22,24,38,.9)_100%)]" />
      </div>
      <div className="relative z-10 wrap w-full">
        <div className="max-w-[720px] flex flex-col gap-[34px]">
          <div className="eyebrow">Online fitness, nutrition &amp; personal training</div>
          <h1 className="h-display text-[clamp(48px,9vw,118px)] leading-[0.92] tracking-[-0.045em] m-0 text-pretty">
            DON'T JUST
            <br />
            GET FIT.
            <br />
            <span className="text-accent-300">TRANSFORM.</span>
          </h1>
          <p className="m-0 max-w-[52ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-neutral-300">
            Personalized fitness, nutrition &amp; online coaching built around your body, your lifestyle and your goals.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a href="#apply" className="btn-primary">
              Start my transformation <span className="text-base">→</span>
            </a>
            <a href="#transformations" className="btn-ghost">
              View transformations
            </a>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3 pt-3 text-[11px] tracking-[0.2em] uppercase text-neutral-400">
            <span>1000+ transformations</span>
            <span>Personalized coaching</span>
            <span className="text-accent-300">100% money back if no results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ big, small, sub }) {
  return (
    <div className="reveal flex flex-col gap-2.5">
      <div className="h-display text-[clamp(44px,6vw,76px)] tabular-nums">
        {big}
        {small && <span className="text-[0.5em] text-neutral-400"> {small}</span>}
      </div>
      <div className="text-[11px] tracking-[0.22em] uppercase text-neutral-500">{sub}</div>
    </div>
  );
}

export function Counters() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useCountUp(ref, 1000, 1400, setCount);

  return (
    <section ref={ref} className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12">
        <Stat big={count >= 1000 ? '1000+' : String(count)} sub="Client transformations" />
        <Stat big="45" small="DAYS" sub="Structured transformation program" />
        <Stat big="1:1" sub="Personalized coaching" />
        <Stat big="ONLINE" sub="Training & accountability" />
      </div>
    </section>
  );
}

export function Results() {
  return (
    <section id="transformations" className="px-6 py-[90px]">
      <div className="wrap flex flex-col gap-14">
        <div className="reveal flex flex-col gap-4">
          <h2 className="h-display text-[clamp(38px,6vw,82px)] leading-[0.95] m-0">THE RESULTS SPEAK.</h2>
          <p className="m-0 text-[17px] text-neutral-400">Real people. Real discipline. Real transformations. Drag any photo to compare.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {transformations.map((t) => (
            <div key={t.id} className="reveal flex flex-col gap-4">
              <BeforeAfter before={t.before} after={t.after} />
              <div className="flex items-baseline justify-between gap-4">
                <div className={`font-heading font-medium text-[21px] ${t.muted ? 'text-neutral-400' : ''}`}>{t.name}</div>
                <div className={`text-[11px] tracking-[0.18em] uppercase ${t.highlight ? 'text-accent-200' : 'text-neutral-500'}`}>{t.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="reveal m-0 text-[13px] text-neutral-600">
          Some faces blurred for client privacy. Names, durations and pairings to be confirmed by Arun.
        </p>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="section">
      <div className="wrap pb-11">
        <h2 className="reveal h-display text-[clamp(36px,5.4vw,74px)] leading-[0.96] m-0">
          WHATEVER YOUR GOAL,
          <br />
          WE BUILD THE PLAN.
        </h2>
      </div>
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {categories.map((c) => (
          <div key={c.no} className="flex flex-col justify-between gap-8 min-h-[260px] p-7 bg-surface rounded-md shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="text-xs tracking-[0.2em] text-accent-300 tabular-nums">{c.no}</div>
              <div className="font-heading font-medium text-[25px] leading-tight tracking-[-0.02em]">{c.title}</div>
              <div className="text-[15px] leading-relaxed text-neutral-400">{c.body}</div>
            </div>
            <a
              href={c.href}
              target="_blank"
              rel="noopener"
              className="self-start px-[18px] py-3 border border-neutral-700 rounded-md text-[11px] tracking-[0.18em] uppercase text-neutral-200 transition-colors hover:border-accent hover:text-accent-200"
            >
              {c.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FortyFive() {
  return (
    <section className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-16 items-start">
        <div className="reveal flex flex-col gap-7">
          <div className="h-display text-[clamp(120px,18vw,220px)] leading-[0.82] tracking-[-0.06em] text-accent-300 tabular-nums">45</div>
          <div className="text-xs tracking-[0.26em] uppercase text-neutral-400">Days to build momentum</div>
          <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-neutral-300">
            You don't need another random workout plan. You need structure, accountability and a plan built around you.
          </p>
          <a href={wa("Hi Arun, I'm interested in your 45-day transformation program.")} target="_blank" rel="noopener" className="btn-primary self-start">
            I'm ready — start my 45 days <span className="text-base">→</span>
          </a>
        </div>
        <div className="reveal flex flex-col">
          {timeline.map((s) => (
            <div key={s.when} className="grid grid-cols-[96px_1fr] gap-6 py-5 border-b border-divider">
              <div className="text-[11px] tracking-[0.18em] text-accent-300 tabular-nums pt-1">{s.when}</div>
              <div className="font-heading font-medium text-xl">{s.what}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Wedding() {
  return (
    <section className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-14 items-center">
        <div className="reveal flex flex-col gap-6">
          <div className="eyebrow">Wedding transformation</div>
          <h2 className="h-display text-[clamp(34px,4.6vw,62px)] leading-none tracking-[-0.035em] m-0">
            YOUR WEDDING IS A DATE.
            <br />
            YOUR TRANSFORMATION
            <br />
            STARTS NOW.
          </h2>
          <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-neutral-300">
            Look sharper. Feel stronger. Walk into your wedding with confidence.
          </p>
          <a href={wa("Hi Arun, I'm interested in a wedding transformation.")} target="_blank" rel="noopener" className="btn-outline self-start">
            Plan my wedding transformation
          </a>
        </div>
        <div className="reveal grid grid-cols-2 gap-px bg-divider rounded-md overflow-hidden">
          {weddingBits.map((b) => (
            <div key={b} className="px-[22px] py-7 bg-bg text-sm tracking-[0.14em] uppercase text-neutral-300">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FatToFit() {
  return (
    <section className="section">
      <div className="wrap flex flex-col gap-12">
        <h2 className="reveal h-display text-[clamp(34px,5vw,70px)] leading-[0.98] m-0">
          FROM “I SHOULD START”
          <br />
          TO “I DID IT.”
        </h2>
        <div className="reveal grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="flex flex-col gap-3.5">
            <img src="images/client-05.png" alt="Before" className="w-full aspect-[4/5] object-cover rounded-md saturate-[.7] brightness-[.85]" />
            <span className="text-[11px] tracking-[0.24em] text-neutral-500">BEFORE</span>
          </div>
          <div className="text-[clamp(28px,5vw,56px)] text-accent-300">→</div>
          <div className="flex flex-col gap-3.5">
            <img src="images/client-02.png" alt="After" className="w-full aspect-[4/5] object-cover rounded-md" />
            <span className="text-[11px] tracking-[0.24em] text-accent-200">AFTER</span>
          </div>
        </div>
        <p className="reveal m-0 max-w-[56ch] text-lg leading-relaxed text-neutral-300">
          Your starting point doesn't matter as much as the system you follow consistently.
        </p>
        <a href={wa('Hi Arun, I want to start my fat-loss transformation.')} target="_blank" rel="noopener" className="reveal btn-outline self-start">
          Start from where you are
        </a>
      </div>
    </section>
  );
}

export function System() {
  return (
    <section id="how" className="section">
      <div className="wrap flex flex-col gap-14">
        <h2 className="reveal h-display text-[clamp(34px,5vw,70px)] leading-[0.98] m-0">
          NOT A PDF.
          <br />
          NOT A GENERIC DIET.
          <br />
          <span className="text-accent-300">A COACHING SYSTEM.</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-px bg-divider">
          {systemSteps.map((s) => (
            <div key={s.no} className="flex flex-col gap-4 px-[26px] py-[34px] bg-bg">
              <div className="text-xs tracking-[0.2em] text-accent-300 tabular-nums">{s.no}</div>
              <div className="font-heading font-medium text-xl">{s.title}</div>
              <div className="text-[15px] leading-relaxed text-neutral-400">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BAR_TONE = { accent: 'bg-accent', 'accent-500': 'bg-accent-500', 'accent-600': 'bg-accent-600' };

export function Personalization() {
  return (
    <section className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-14 items-center">
        <div className="reveal flex flex-col gap-[22px]">
          <div className="eyebrow">Personalized coaching</div>
          <h2 className="h-display text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.035em] m-0">
            YOUR PLAN CHANGES
            <br />
            AS YOU CHANGE.
          </h2>
          <p className="m-0 max-w-[44ch] text-[17px] leading-relaxed text-neutral-300">
            You aren't buying a workout PDF. Training, nutrition and daily targets are set for you, reviewed against your progress and adjusted.
          </p>
        </div>
        <div className="reveal p-[26px] bg-surface rounded-lg shadow-md flex flex-col gap-5">
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-medium text-lg tracking-[0.06em]">TODAY</span>
            <span className="text-[11px] tracking-[0.16em] text-neutral-500">DAY 12 / 45</span>
          </div>
          {dashboard.map((row) => (
            <div key={row.label} className="flex flex-col gap-2.5 pt-3.5 border-t border-divider">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm tracking-[0.1em] uppercase text-neutral-300">{row.label}</span>
                <span className="text-[13px] text-neutral-400 tabular-nums">{row.value}</span>
              </div>
              <div className="h-[3px] rounded-full bg-neutral-800 overflow-hidden">
                <div className={`h-full ${BAR_TONE[row.tone]}`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatsAppCoaching() {
  return (
    <section className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-14 items-center">
        <div className="reveal flex flex-col gap-6">
          <h2 className="h-display text-[clamp(34px,4.8vw,68px)] leading-none m-0">
            YOUR COACH.
            <br />
            IN YOUR POCKET.
          </h2>
          <p className="m-0 max-w-[42ch] text-[17px] leading-relaxed text-neutral-300">
            Accessibility, accountability and personal coaching — on the app you already use every day.
          </p>
          <a href={wa('Hi Arun, I want to know about your online personal training.')} target="_blank" rel="noopener" className="btn-outline self-start">
            Chat with Arun
          </a>
        </div>
        <div className="reveal w-full max-w-[420px] p-[22px] bg-surface rounded-lg shadow-md flex flex-col gap-3.5">
          {chatThread.map((m, i) => (
            <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] px-4 py-3.5 ${
                  m.me ? 'rounded-lg rounded-br-sm bg-accent-900 text-accent-100' : 'rounded-lg rounded-bl-sm bg-neutral-900 text-neutral-200'
                }`}
              >
                <div className="text-[10px] tracking-[0.18em] mb-[7px] opacity-70">{m.who}</div>
                <div className="text-[15px] leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-14 items-center">
        <div className="reveal">
          <img src="images/client-01.png" alt="Arun Kumar" className="w-full aspect-[4/5] object-cover object-[50%_20%] rounded-md" />
        </div>
        <div className="reveal flex flex-col gap-6">
          <h2 className="h-display text-[clamp(32px,4.4vw,60px)] leading-[1.02] tracking-[-0.035em] m-0">
            I DON'T SELL WORKOUTS.
            <br />
            I BUILD TRANSFORMATIONS.
          </h2>
          <p className="m-0 max-w-[50ch] text-lg leading-[1.7] text-neutral-300">
            I'm Arun Kumar, a fitness, nutrition and personal training coach focused on helping people transform their bodies through structured
            training, personalized nutrition and consistent accountability.
          </p>
          <div className="flex flex-col">
            {['1000+ client transformations', 'Fitness & nutrition experience from the U.S.', 'Experience with MyProtein & GNC'].map((line, i, arr) => (
              <div
                key={line}
                className={`py-4 border-t border-divider text-[13px] tracking-[0.18em] uppercase text-neutral-300 ${
                  i === arr.length - 1 ? 'border-b' : ''
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section">
      <div className="wrap flex flex-col gap-10">
        <h2 className="reveal h-display text-[clamp(32px,4.4vw,60px)] m-0">WHAT MY CLIENTS SAY</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col gap-[18px] p-7 bg-surface rounded-md shadow-sm">
              <div className="tracking-[0.3em] text-accent-300 text-[13px]">★★★★★</div>
              <div className="text-base leading-relaxed text-neutral-400 italic">{t.quote}</div>
              <div className="flex flex-col gap-1.5 pt-2 border-t border-divider">
                <span className="text-sm text-neutral-300">{t.name}</span>
                <span className="text-[11px] tracking-[0.16em] uppercase text-neutral-600">{t.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GRID_IMAGES = ['01', '02', '06', '03', '05', '04'];

export function Instagram() {
  return (
    <section className="section">
      <div className="wrap flex flex-col gap-9">
        <div className="reveal flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="h-display text-[clamp(32px,4.4vw,60px)] m-0">FOLLOW THE JOURNEY.</h2>
            <p className="m-0 text-base text-neutral-400">Daily fitness. Nutrition. Transformations. Mindset.</p>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="px-6 py-[15px] border border-accent rounded-md text-xs tracking-[0.18em] uppercase text-accent-200 transition-colors hover:bg-accent-900 hover:text-accent-100">
            Follow {INSTAGRAM_HANDLE}
          </a>
        </div>
        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
          {GRID_IMAGES.map((n) => (
            <img key={n} src={`images/client-${n}.png`} alt="" className="w-full aspect-square object-cover rounded-sm" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Programs() {
  return (
    <section id="programs" className="section">
      <div className="wrap flex flex-col gap-11">
        <h2 className="reveal h-display text-[clamp(32px,4.4vw,60px)] m-0">PROGRAMS</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5">
          {programs.map((p) => (
            <div key={p.no} className="flex flex-col justify-between gap-7 p-[30px] bg-surface rounded-md shadow-sm">
              <div className="flex flex-col gap-[18px]">
                <div className="text-[11px] tracking-[0.22em] text-accent-300 tabular-nums">{p.no}</div>
                <div className="font-heading font-medium text-[26px] leading-tight tracking-[-0.02em]">{p.title}</div>
                <div className="text-[15px] leading-relaxed text-neutral-400">{p.who}</div>
                <div className="flex flex-col gap-2 pt-1.5">
                  {p.includes.map((inc) => (
                    <div key={inc} className="text-sm text-neutral-300">
                      — {inc}
                    </div>
                  ))}
                </div>
              </div>
              <a href={p.href} target="_blank" rel="noopener" className="self-start px-[22px] py-3.5 border border-accent rounded-md text-xs tracking-[0.16em] uppercase text-accent-200 transition-colors hover:bg-accent-900 hover:text-accent-100">
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="px-6 py-[134px] border-t border-divider bg-[radial-gradient(120%_80%_at_50%_0%,#2b2741_0%,#161826_62%)]">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-[30px] text-center">
        <h2 className="reveal h-display text-[clamp(38px,6.4vw,92px)] leading-[0.96] tracking-[-0.045em] m-0">
          YOUR TRANSFORMATION
          <br />
          STARTS WITH ONE DECISION.
        </h2>
        <p className="m-0 text-lg leading-relaxed text-neutral-300">
          You don't need to be ready.
          <br />
          You need to start.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a href="#apply" className="btn-primary">
            Start my transformation →
          </a>
          <a href={wa('Hi Arun, I want to know about your online personal training.')} target="_blank" rel="noopener" className="btn-ghost">
            WhatsApp Arun
          </a>
        </div>
        <div className="flex flex-col items-center gap-2.5 px-[26px] py-5 border border-accent rounded-md">
          <div className="font-heading font-medium text-[clamp(20px,2.6vw,28px)] tracking-[-0.01em] text-accent-200">100% MONEY BACK</div>
          <div className="text-sm leading-relaxed text-neutral-300">If results are not visible, you get a full refund.</div>
        </div>
        <div className="text-[11px] tracking-[0.26em] uppercase text-neutral-500">1000+ transformations</div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pt-[68px] pb-[134px] border-t border-divider">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
        <div className="flex flex-col gap-3">
          <LogoMark width={60} height={42} />
          <div className="font-heading font-medium text-sm tracking-[0.2em]">ARUN KUMAR</div>
          <div className="text-[10px] tracking-[0.26em] text-neutral-500">ONLINE TRANSFORMATION COACH</div>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <a href="#transformations">Transformations</a>
          <a href="#programs">Programs</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Instagram
          </a>
          <a href={wa('Hi Arun, I want to know about your online personal training.')} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href="#apply">Apply</a>
        </div>
        <div className="flex flex-col gap-2.5 text-sm text-neutral-400">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
          <span className="text-xs text-neutral-600">Privacy Policy · Terms</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingCtas() {
  return (
    <>
      <a
        href={wa('Hi Arun, I want to know about your online personal training.')}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp Arun"
        className="fixed right-5 bottom-[88px] z-[60] w-14 h-14 flex items-center justify-center border border-accent rounded-full bg-accent-900 shadow-md transition-colors hover:bg-accent-800"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e7e5fe" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
        </svg>
      </a>
      <div className="fixed inset-x-0 bottom-0 z-[55] flex gap-2.5 px-4 py-3 bg-bg/90 backdrop-blur-md border-t border-divider">
        <a
          href="#apply"
          className="flex-1 flex items-center justify-center min-h-[48px] border border-accent rounded-md bg-accent-900 text-xs tracking-[0.16em] uppercase text-accent-100"
        >
          Start my transformation →
        </a>
      </div>
    </>
  );
}
