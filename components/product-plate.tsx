import { hashString, mulberry32 } from "@/lib/sky";
import type { Product, Shape } from "@/lib/products";

// Generated line-art "plate" for each piece: palette gradient, seeded stars, a single-stroke silhouette.
const SHAPES: Record<Shape, string> = {
  slip: "M82 40 L88 70 Q70 140 62 250 L138 250 Q130 140 112 70 L118 40 M88 70 Q100 78 112 70",
  trench: "M76 40 L100 60 L124 40 L150 70 L144 250 L56 250 L50 70 Z M100 60 L100 250 M68 110 L86 110 M114 110 L132 110",
  earrings: "M78 70 A6 6 0 1 1 78.1 70 M78 76 L78 100 M122 70 A6 6 0 1 1 122.1 70 M122 76 L122 100",
  sash: "M40 140 Q100 120 160 140 L160 162 Q100 142 40 162 Z M96 150 L84 220 M104 150 L118 214",
  bell: "M100 50 L100 110 M100 110 Q78 116 76 150 L74 172 L126 172 L124 150 Q122 116 100 110 M92 182 A8 8 0 0 0 108 182",
  gloves: "M70 60 L70 110 Q64 170 74 250 L96 250 Q102 170 96 110 L96 60 M104 60 L104 110 Q98 170 108 250 L130 250 Q136 170 130 110 L130 60",
  gown: "M86 40 L92 80 Q62 170 40 260 L160 260 Q138 170 108 80 L114 40 M92 80 Q100 88 108 80",
  cape: "M84 44 Q100 36 116 44 Q150 140 168 256 Q100 240 32 256 Q50 140 84 44 Z M100 44 L100 250",
  rest: "M88 80 L112 110 L94 128 L114 152 Q98 146 104 176 Q84 162 102 140 L84 124 L102 106 Z",
  veil: "M40 80 Q80 60 100 90 Q120 120 160 100 L160 200 Q120 220 100 190 Q80 160 40 180 Z",
  rings: "M100 120 A26 26 0 1 1 100.1 120 M100 128 A18 18 0 1 1 100.1 128 M100 136 A10 10 0 1 1 100.1 136",
  clutch: "M50 120 L150 120 L150 190 L50 190 Z M50 120 L100 158 L150 120 M60 200 L140 200",
};

export function ProductPlate({ product, className = "" }: { product: Product; className?: string }) {
  const rnd = mulberry32(hashString(product.slug));
  const [a, b, c] = product.palette;
  const night = product.movement === "nocturne";
  const id = `g-${product.slug}`;
  const stars = Array.from({ length: 34 }, () => ({ x: rnd() * 200, y: rnd() * (night ? 280 : 150), r: 0.4 + rnd() * 1.2, o: 0.3 + rnd() * 0.6 }));
  const line = night ? "#C6CBD8" : "#3B2142";

  return (
    <svg viewBox="0 0 200 280" className={className} role="img" aria-label={`Illustration of ${product.name}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.6" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <rect width="200" height="280" fill={`url(#${id})`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={night ? "#EDEAF2" : "#FFFFFF"} opacity={s.o} />
      ))}
      <line x1="0" y1="232" x2="200" y2="232" stroke={line} strokeWidth="0.5" opacity="0.35" />
      <path d={SHAPES[product.shape]} fill="none" stroke={line} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
