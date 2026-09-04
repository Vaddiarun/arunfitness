import { useEffect, useState } from 'react';

export default function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-[opacity,visibility] duration-500 ${done ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
    >
      <div className="flex flex-col items-center gap-[18px] animate-rise">
        <svg width="150" height="104" viewBox="0 0 180 120" aria-label="AK">
          <text x="90" y="52" textAnchor="middle" dominantBaseline="central" fill="#e9e9ed"
            fontFamily="Inter, sans-serif" fontSize="62" fontWeight="500" letterSpacing="-3">AK</text>
          <path d="M18 100 L120 100 L162 62" fill="none" stroke="#9184d9" strokeWidth="3" strokeLinecap="square"
            className="origin-left animate-line" />
          <path d="M146 62 L162 62 L162 78" fill="none" stroke="#9184d9" strokeWidth="3" strokeLinecap="square" />
        </svg>
        <div className="text-[17px] font-medium tracking-[0.28em] text-neutral-100">ARUN KUMAR</div>
        <div className="text-[10px] tracking-[0.32em] text-neutral-500">TRANSFORMATION COACH</div>
      </div>
    </div>
  );
}
