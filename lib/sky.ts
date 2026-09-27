// Deterministic "sky" generation: same inputs → same stars. No real ephemeris.

export function hashString(s: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type SkyInput = { date: string; time: string; place: string };

export type Star = { x: number; y: number; r: number; o: number };

export type Sky = {
  seed: number;
  field: Star[];
  bright: Star[];
  lines: [number, number][];
  name: string;
  moonPhase: number; // 0 = new, 0.5 = full
};

const ADJ = ["quiet", "wandering", "patient", "second", "unsent", "lantern", "open", "far", "gentle", "late", "returning", "silver"];
const NOUN = ["heron", "doorway", "lantern", "letter", "compass", "bell", "harbour", "ribbon", "orchard", "window", "key", "boat"];

export function normalizeInput(i: SkyInput) {
  return `${i.date.trim()}|${i.time.trim()}|${i.place.trim().toLowerCase().replace(/\s+/g, " ")}`;
}

// Approximate lunar phase for a date (fraction of synodic month since a known new moon)
export function moonPhaseFor(date: string): number {
  const d = new Date(date + "T12:00:00Z");
  if (isNaN(d.getTime())) return 0.5;
  const known = Date.UTC(2000, 0, 6, 18, 14);
  const synodic = 29.530588853 * 86400000;
  const p = ((d.getTime() - known) / synodic) % 1;
  return p < 0 ? p + 1 : p;
}

export function generateSky(input: SkyInput, width = 600, height = 400): Sky {
  const seed = hashString(normalizeInput(input));
  const rnd = mulberry32(seed);

  const field: Star[] = Array.from({ length: 160 }, () => ({
    x: rnd() * width,
    y: rnd() * height,
    r: 0.4 + rnd() * 1.1,
    o: 0.25 + rnd() * 0.6,
  }));

  const count = 6 + Math.floor(rnd() * 4);
  const bright: Star[] = [];
  const pad = 60;
  while (bright.length < count) {
    const s = {
      x: pad + rnd() * (width - pad * 2),
      y: pad + rnd() * (height - pad * 2),
      r: 2 + rnd() * 1.8,
      o: 1,
    };
    if (bright.every((b) => Math.hypot(b.x - s.x, b.y - s.y) > 55)) bright.push(s);
  }

  // Connect stars with a minimum spanning tree so the figure reads as a constellation
  const lines: [number, number][] = [];
  const inTree = new Set<number>([0]);
  while (inTree.size < bright.length) {
    let best: [number, number] = [0, 0];
    let bestD = Infinity;
    inTree.forEach((i) => {
      bright.forEach((b, j) => {
        if (inTree.has(j)) return;
        const d = Math.hypot(bright[i].x - b.x, bright[i].y - b.y);
        if (d < bestD) {
          bestD = d;
          best = [i, j];
        }
      });
    });
    lines.push(best);
    inTree.add(best[1]);
  }

  const name = `The ${ADJ[Math.floor(rnd() * ADJ.length)]} ${NOUN[Math.floor(rnd() * NOUN.length)]}`;

  return { seed, field, bright, lines, name, moonPhase: moonPhaseFor(input.date) };
}

export function describeSky(i: SkyInput) {
  const d = new Date(i.date + "T00:00:00");
  const date = isNaN(d.getTime())
    ? i.date
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return `${date}, ${i.time || "an unknown hour"}, ${i.place || "somewhere"}`;
}
