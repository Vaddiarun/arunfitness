export function LogoMark({ width = 46, height = 32, strokeWidth = 6, animate = false }) {
  return (
    <svg width={width} height={height} viewBox="0 0 180 120" aria-label="Arun Kumar">
      <text
        x="90"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f3f5fe"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="66"
        fontWeight="500"
        letterSpacing="-3"
      >
        AK
      </text>
      <path
        d="M18 100 L120 100 L162 62"
        fill="none"
        stroke="#9184d9"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        className={animate ? 'origin-left animate-akline' : undefined}
      />
    </svg>
  );
}

export function Preloader({ done }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-[opacity,visibility] duration-[600ms] ${
        done ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <div className="flex flex-col items-center gap-[18px] animate-akrise">
        <svg width="150" height="104" viewBox="0 0 180 120" aria-label="AK">
          <text x="90" y="52" textAnchor="middle" dominantBaseline="central" fill="#f3f5fe" fontFamily="Inter, system-ui, sans-serif" fontSize="62" fontWeight="500" letterSpacing="-3">
            AK
          </text>
          <path d="M18 100 L120 100 L162 62" fill="none" stroke="#9184d9" strokeWidth="3" strokeLinecap="square" className="origin-left animate-akline" />
          <path d="M146 62 L162 62 L162 78" fill="none" stroke="#9184d9" strokeWidth="3" strokeLinecap="square" />
        </svg>
        <div className="font-heading font-medium text-[17px] tracking-[0.28em] text-neutral-100">ARUN KUMAR</div>
        <div className="text-[10px] tracking-[0.32em] text-neutral-500">TRANSFORMATION COACH</div>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  ['#transformations', 'Transformations'],
  ['#programs', 'Programs'],
  ['#how', 'How it works'],
  ['#about', 'About'],
  ['#faq', 'FAQ'],
];

export function Nav({ scrolled }) {
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[70] transition-colors duration-300 ${
        scrolled ? 'bg-bg/85 backdrop-blur-md border-b border-divider' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap px-6 py-4 flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 text-ink hover:text-ink">
          <LogoMark />
          <span className="font-heading font-medium text-[13px] tracking-[0.22em]">ARUN KUMAR</span>
        </a>
        <div className="flex items-center gap-7">
          <div className="hidden lg:flex items-center gap-[26px]">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="text-xs tracking-[0.16em] uppercase text-neutral-300 hover:text-accent-200">
                {label}
              </a>
            ))}
          </div>
          <a
            href="#apply"
            className="px-5 py-[11px] border border-accent rounded-md text-xs tracking-[0.16em] uppercase text-accent-200 whitespace-nowrap transition-colors hover:bg-accent-900 hover:text-accent-100"
          >
            Start now
          </a>
        </div>
      </div>
    </nav>
  );
}
