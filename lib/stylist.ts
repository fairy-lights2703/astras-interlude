import { getProduct, Movement, Product } from "./products";

type Rule = {
  id: string;
  keywords: string[];
  movement: Movement;
  intro: string;
  picks: { slug: string; why: string }[];
};

const RULES: Rule[] = [
  {
    id: "leaving",
    keywords: ["leav", "moving", "move ", "goodbye", "farewell", "break up", "breakup", "ending", "quit", "last day", "relocat", "left"],
    movement: "aubade",
    intro: "It sounds like something is ending, and you're choosing it. That belongs to Aubade, the dawn movement.",
    picks: [
      { slug: "the-last-star-slip-dress", why: "The stars thin out toward the hem, like a night you're walking out of." },
      { slug: "threshold-trench", why: "For standing in the doorway between two places without choosing yet." },
      { slug: "parting-ribbon-sash", why: "The sky of the morning you left, worn only for yourself." },
    ],
  },
  {
    id: "beginning",
    keywords: ["begin", "start", "new job", "first day", "fresh", "new chapter", "again", "interview", "graduat", "launch"],
    movement: "aubade",
    intro: "A beginning. Aubade was made for mornings like this one.",
    picks: [
      { slug: "morning-bell-pendant", why: "A sealed line to mark the day you decided to begin." },
      { slug: "first-light-gloves", why: "Gold at the fingertips, where light arrives first." },
      { slug: "dew-drop-earrings", why: "A small reminder to notice this before it becomes ordinary." },
    ],
  },
  {
    id: "grief",
    keywords: ["grief", "griev", "loss", "lost", "miss", "funeral", "memorial", "passed away", "died", "sad", "heavy", "mourn"],
    movement: "nocturne",
    intro: "I'm sorry. Nocturne holds this kind of evening gently.",
    picks: [
      { slug: "stardust-veil", why: "Made for quiet grief, soft enough to wear in public." },
      { slug: "whisper-clutch", why: "A sewn-shut pocket for the one sentence you want to keep close." },
      { slug: "treblemaker-cuffs", why: "Permission to pause. The rest is still part of the song." },
    ],
  },
  {
    id: "celebration",
    keywords: ["celebrat", "party", "wedding", "gala", "birthday", "dinner", "event", "award", "reception", "night out", "festival", "diwali"],
    movement: "nocturne",
    intro: "An evening worth dressing for. That's Nocturne.",
    picks: [
      { slug: "deep-sky-gown", why: "The sky above your birthplace, embroidered floor to hem." },
      { slug: "eclipse-cape", why: "Reversible, so you decide which self walks in." },
      { slug: "orbit-rings", why: "Three moon phases, stacked or shared with someone there." },
    ],
  },
  {
    id: "love",
    keywords: ["love", "partner", "anniversary", "date", "long distance", "boyfriend", "girlfriend", "husband", "wife", "together", "someone"],
    movement: "nocturne",
    intro: "Something between two people. Nocturne understands that pull.",
    picks: [
      { slug: "orbit-rings", why: "Split the set across two hands. Never touching, always circling." },
      { slug: "whisper-clutch", why: "Room for a folded note you might or might not give them." },
      { slug: "deep-sky-gown", why: "Feeling small under the sky and feeling known by it at once." },
    ],
  },
  {
    id: "tired",
    keywords: ["tired", "burnout", "burnt", "exhaust", "busy", "overwork", "rest", "stress", "break", "slow down", "holiday"],
    movement: "nocturne",
    intro: "It sounds like you need a rest more than a look. Here are a few pieces that remind you to take one.",
    picks: [
      { slug: "treblemaker-cuffs", why: "A musical rest at the wrist, for people who are bad at stopping." },
      { slug: "dew-drop-earrings", why: "A small practice of noticing, ten minutes at a time." },
      { slug: "first-light-gloves", why: "For choosing good morning over goodnight." },
    ],
  },
  {
    id: "between",
    keywords: ["between", "two cities", "identity", "language", "belong", "home", "abroad", "immigra", "who i am", "change", "hidden", "myself"],
    movement: "aubade",
    intro: "Being more than one thing at once. There's a piece in each movement for that.",
    picks: [
      { slug: "threshold-trench", why: "It doesn't ask you to choose a side. It holds both." },
      { slug: "eclipse-cape", why: "Two finished faces, neither of them the lining." },
      { slug: "parting-ribbon-sash", why: "A private map of the sky over wherever you are now." },
    ],
  },
];

export type StylistResult = {
  movement: Movement;
  intro: string;
  picks: { product: Product; why: string }[];
};

export function stylist(text: string, hour = new Date().getHours()): StylistResult {
  const t = " " + text.toLowerCase() + " ";
  let best: Rule | null = null;
  let bestScore = 0;
  for (const r of RULES) {
    const score = r.keywords.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      best = r;
      bestScore = score;
    }
  }
  if (!best) {
    const day = hour >= 6 && hour < 18;
    best = day ? RULES[1] : RULES[3];
    const intro = day
      ? "I couldn't quite place the moment, so I'll go by the hour. It's daytime, which is Aubade."
      : "I couldn't quite place the moment, so I'll go by the hour. It's evening, which is Nocturne.";
    return build(best, intro);
  }
  return build(best, best.intro);
}

function build(r: Rule, intro: string): StylistResult {
  return {
    movement: r.movement,
    intro,
    picks: r.picks.map((p) => ({ product: getProduct(p.slug)!, why: p.why })),
  };
}
