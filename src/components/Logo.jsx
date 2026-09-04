export default function Logo({ width = 46, height = 32, stroke = 6 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 180 120" aria-label="Arun Kumar">
      <text x="90" y="50" textAnchor="middle" dominantBaseline="central" fill="#e9e9ed"
        fontFamily="Inter, sans-serif" fontSize="66" fontWeight="500" letterSpacing="-3">AK</text>
      <path d="M18 100 L120 100 L162 62" fill="none" stroke="#9184d9" strokeWidth={stroke} strokeLinecap="square" />
    </svg>
  );
}
