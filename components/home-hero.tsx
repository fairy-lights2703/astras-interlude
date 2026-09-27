"use client";

import { useEffect, useRef, useState } from "react";
import { generateSky } from "@/lib/sky";
import { BrandMark } from "./motifs";

const W = 1200;
const H = 700;
const sky = generateSky({ date: "2026-12-21", time: "02:20", place: "astra" }, W, H * 0.62);

// The site's one signature motion: scrolling through the hero takes it from dawn into night, once.
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      let v = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      if (reduce.matches) v = v > 0.5 ? 1 : 0;
      setP(v);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ease = (t: number) => t * t * (3 - 2 * t);
  const night = ease(Math.min(1, p / 0.7));
  const draw = ease(Math.min(1, Math.max(0, (p - 0.6) / 0.35)));
  const dark = night > 0.5;
  const sunY = 470 + night * 200;

  return (
    <section ref={ref} className="relative h-[230vh]" aria-label="Dawn into night">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #E6D4E4 0%, #F1DCD4 55%, #F2D9A8 100%)" }} />
        <div
          className="absolute inset-0"
          style={{ opacity: night, background: "linear-gradient(to bottom, #0C0E22 0%, #171A2E 55%, #2B2347 100%)" }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx={W * 0.62} cy={sunY} r={60} fill="#F4D58D" opacity={1 - night * 0.9} />
          <g opacity={night}>
            {sky.field.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#EDEAF2" opacity={s.o} />
            ))}
          </g>
          <g transform={`translate(${W * 0.12} 20)`}>
            {sky.lines.map(([a, b], i) => {
              const A = sky.bright[a];
              const B = sky.bright[b];
              const len = Math.hypot(A.x - B.x, A.y - B.y);
              return (
                <line
                  key={i}
                  x1={A.x * 0.8}
                  y1={A.y * 0.8}
                  x2={A.x * 0.8 + (B.x - A.x) * 0.8 * draw}
                  y2={A.y * 0.8 + (B.y - A.y) * 0.8 * draw}
                  stroke="#B8924A"
                  strokeWidth={1}
                  opacity={draw > 0 ? 0.9 : 0}
                  data-len={len}
                />
              );
            })}
            {sky.bright.map((s, i) => (
              <circle key={i} cx={s.x * 0.8} cy={s.y * 0.8} r={s.r} fill="#EDEAF2" opacity={night} />
            ))}
          </g>
          <rect x={0} y={H * 0.72} width={W} height={H * 0.28} fill={dark ? "#171A2E" : "#EFE3E6"} opacity={0.55} />
          <line x1={0} y1={H * 0.72} x2={W} y2={H * 0.72} stroke={dark ? "#C6CBD8" : "#3B2142"} strokeWidth={0.6} opacity={0.5} />
        </svg>

        <div
          className="relative h-full mx-auto max-w-6xl px-4 sm:px-8 flex flex-col justify-end pb-[18vh]"
          style={{ color: dark ? "#EDEAF2" : "#3B2142", transition: "color 500ms ease" }}
        >
          <BrandMark size={48} className="mb-6 text-[#B8924A]" />
          <h1 className="text-5xl sm:text-7xl max-w-3xl">
            {dark ? (
              <>
                And this is <em className="pullquote">Nocturne</em>.
              </>
            ) : (
              <>
                This is <em className="pullquote">Aubade</em>.
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-lg opacity-90">
            {dark
              ? "The hours after dark, for what you keep to yourself."
              : "A day has two halves. We make clothes for both. Keep scrolling into the evening."}
          </p>
        </div>
      </div>
    </section>
  );
}
