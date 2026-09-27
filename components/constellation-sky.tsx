import { generateSky, describeSky, SkyInput } from "@/lib/sky";
import { MoonPhase } from "./motifs";

const W = 600;
const H = 400;

export function ConstellationSky({ input, className = "" }: { input: SkyInput; className?: string }) {
  const sky = generateSky(input, W, H);
  return (
    <figure className={className}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-sm block" role="img" aria-label={`A generated star map named ${sky.name}`}>
          <defs>
            <radialGradient id={`sky-${sky.seed}`} cx="0.5" cy="1" r="1">
              <stop offset="0" stopColor="#2B2347" />
              <stop offset="1" stopColor="#0C0E22" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#sky-${sky.seed})`} />
          {sky.field.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#EDEAF2" opacity={s.o} />
          ))}
          {sky.lines.map(([a, b], i) => (
            <line
              key={i}
              x1={sky.bright[a].x}
              y1={sky.bright[a].y}
              x2={sky.bright[b].x}
              y2={sky.bright[b].y}
              stroke="#B8924A"
              strokeWidth={1}
              opacity={0.85}
            />
          ))}
          {sky.bright.map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r={s.r * 2.6} fill="#EDEAF2" opacity={0.12} />
              <circle cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" />
            </g>
          ))}
          <line x1={0} y1={H - 30} x2={W} y2={H - 30} stroke="#C6CBD8" strokeWidth={0.5} opacity={0.4} />
        </svg>
        <MoonPhase phase={sky.moonPhase} size={30} className="absolute top-4 right-4 text-[#EDEAF2]" />
      </div>
      <figcaption className="mt-4">
        <span className="display text-2xl capitalize-first">{sky.name}</span>
        <span className="block text-sm text-muted mt-1">The sky over {describeSky(input)}</span>
      </figcaption>
    </figure>
  );
}
