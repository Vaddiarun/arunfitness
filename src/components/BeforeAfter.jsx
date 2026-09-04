import { useRef, useState } from 'react';

/** Draggable before/after comparison. Drag or click anywhere on the image. */
export default function BeforeAfter({ before, after, initial = 50 }) {
  const [pct, setPct] = useState(initial);
  const dragging = useRef(false);

  const update = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      className="relative aspect-[3/4] rounded-md overflow-hidden bg-neutral-900 cursor-ew-resize touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        update(e);
      }}
      onPointerMove={(e) => dragging.current && update(e)}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute inset-0 w-full h-full" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <img src={after} alt="After" className="w-full h-full object-cover pointer-events-none" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_0_1px_rgba(22,24,38,0.5)]" style={{ left: `${pct}%` }} />
      <span className="absolute left-3.5 top-3.5 px-2.5 py-1.5 rounded-sm bg-bg/70 text-[10px] tracking-[0.2em] text-neutral-300">AFTER</span>
      <span className="absolute right-3.5 top-3.5 px-2.5 py-1.5 rounded-sm bg-bg/70 text-[10px] tracking-[0.2em] text-accent-200">BEFORE</span>
    </div>
  );
}
