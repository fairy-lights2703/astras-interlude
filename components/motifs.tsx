type P = { className?: string; size?: number; title?: string };

// The Astra's Interlude mark (from /public/brand/icon-mark-*.svg), coloured by currentColor
export const BRAND_MARK_PATH =
  "M 57,-15 L 59.6,-9.5 L 65,-7 L 59.6,-4.5 L 57,1 L 54.4,-4.5 L 49,-7 L 54.4,-9.5 Z M 55,6 C 68,14 70,32 50,50 C 44,32 46,16 55,6 Z M 52,58 C 74,66 112,84 64,118 C 42,106 44,76 52,58 Z M 60,126 C 48,134 10,146 32,176 C 46,158 56,140 60,126 Z";

export function BrandMark({ className, size = 18, title }: P) {
  return (
    <svg className={className} width={(size * 120) / 242} height={size} viewBox="0 -22 120 242" aria-hidden={!title} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <path d={BRAND_MARK_PATH} fill="currentColor" />
    </svg>
  );
}

export function MoonPhase({ phase, size = 22, className }: { phase: number; size?: number; className?: string }) {
  // phase 0 = new, 0.5 = full, 1 = new
  const r = 10;
  const illum = Math.cos(phase * 2 * Math.PI); // 1 new, -1 full
  const waxing = phase < 0.5;
  const rx = Math.abs(illum) * r;
  const lit = "currentColor";
  // Outer half-circle on the lit side, inner ellipse bulges based on phase
  const sweepOuter = waxing ? 1 : 0;
  const sweepInner = illum > 0 ? (waxing ? 0 : 1) : waxing ? 1 : 0;
  return (
    <svg className={className} width={size} height={size} viewBox="-12 -12 24 24" aria-hidden>
      <circle r={r} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.5} />
      <path
        d={`M0 ${-r} A ${r} ${r} 0 0 ${sweepOuter} 0 ${r} A ${rx} ${r} 0 0 ${sweepInner} 0 ${-r} Z`}
        fill={lit}
      />
    </svg>
  );
}

export function ConstellationMark({ className, size = 40 }: P) {
  const pts: [number, number][] = [
    [4, 30],
    [14, 18],
    [26, 22],
    [34, 8],
    [38, 26],
  ];
  return (
    <svg className={className} width={size} height={size * 0.85} viewBox="0 0 42 36" aria-hidden>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.7} />
      <line x1={26} y1={22} x2={38} y2={26} stroke="currentColor" strokeWidth={0.7} opacity={0.7} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 2 : 1.4} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Horizon({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg width="100%" height="14" viewBox="0 0 1000 14" preserveAspectRatio="none">
        <line x1="0" y1="7" x2="1000" y2="7" stroke="var(--line)" strokeWidth="1" />
        <circle cx="720" cy="7" r="3" fill="var(--accent-gold)" />
      </svg>
    </div>
  );
}
