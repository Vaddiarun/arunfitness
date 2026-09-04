import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

const LINKS = [
  ['#transformations', 'Transformations'],
  ['#programs', 'Programs'],
  ['#how', 'How it works'],
  ['#about', 'About'],
  ['#faq', 'FAQ']
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[70] transition-colors duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-lg border-b border-neutral-800' : 'border-b border-transparent'}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-center gap-3 text-ink">
          <Logo />
          <span className="text-[13px] font-medium tracking-[0.22em]">ARUN KUMAR</span>
        </a>
        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-[26px] lg:flex">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} className="text-xs uppercase tracking-[0.16em] text-neutral-300 hover:text-accent-200">
                {label}
              </a>
            ))}
          </div>
          <a href="#apply"
            className="whitespace-nowrap rounded-md border border-accent px-5 py-[11px] text-xs uppercase tracking-[0.16em] text-accent-200 hover:bg-accent-900 hover:text-accent-100">
            Start now
          </a>
        </div>
      </div>
    </nav>
  );
}
