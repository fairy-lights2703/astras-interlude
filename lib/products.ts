export type Movement = "aubade" | "nocturne";
export type Category = "Garments" | "Jewellery" | "Accessories";
export type Shape =
  | "slip"
  | "trench"
  | "earrings"
  | "sash"
  | "bell"
  | "gloves"
  | "gown"
  | "cape"
  | "rest"
  | "veil"
  | "rings"
  | "clutch";

export type Product = {
  slug: string;
  name: string;
  movement: Movement;
  category: Category;
  kind: string;
  priceMin: number;
  priceMax: number;
  hook: string;
  story: string;
  notes: string;
  constellationFit: boolean;
  palette: [string, string, string];
  shape: Shape;
};

export const products: Product[] = [
  // Aubade — dawn movement
  {
    slug: "the-last-star-slip-dress",
    name: "The Last Star Slip Dress",
    movement: "aubade",
    category: "Garments",
    kind: "Garment",
    priceMin: 18000,
    priceMax: 24000,
    hook: "For the version of you that's leaving something behind on purpose.",
    story:
      "A silk slip that shifts from lilac at the shoulder to pale gold at the hem, with hand-embroidered stars that thin out near the bottom, as if the night is emptying into morning. Made for the version of you that's leaving something behind on purpose — a city, a version of yourself, a person — and looks almost peaceful doing it.",
    notes:
      "The gradient runs top to bottom so the wearer literally stands in the moment night turns to morning. Stars were placed densely at the shoulder and thinned toward the hem to suggest departure without sadness. The embroidery can be re-mapped to a personal sky through Constellation Fit.",
    constellationFit: true,
    palette: ["#C9B8DA", "#E9D6B0", "#D9A9A6"],
    shape: "slip",
  },
  {
    slug: "threshold-trench",
    name: "Threshold Trench",
    movement: "aubade",
    category: "Garments",
    kind: "Garment",
    priceMin: 32000,
    priceMax: 42000,
    hook: "It doesn't ask you to choose a side — it holds both.",
    story:
      "An oversized coat, indigo at the collar fading to pale gold at the hem, worn like stepping through a doorway from one hour into another. For people who have lived in more than one city or language, or never felt fully finished becoming who they are. It doesn't ask you to choose a side — it holds both.",
    notes:
      "Indigo was kept at the collar, closest to the face, so the night side is what people meet first. The oversized cut leaves room for the unfinished; nothing about it is fitted to a single version of you. The fade is deliberately slow so there is no line where one hour ends.",
    constellationFit: false,
    palette: ["#3A3F72", "#9C8FB5", "#E4CC96"],
    shape: "trench",
  },
  {
    slug: "dew-drop-earrings",
    name: "Dew Drop Earrings",
    movement: "aubade",
    category: "Jewellery",
    kind: "Jewellery",
    priceMin: 6500,
    priceMax: 9000,
    hook: "A small daily practice of noticing something before it's gone.",
    story:
      "Freshwater pearl and pale citrine clusters, cut to catch light the way dew does in the ten minutes before it evaporates. A small daily practice of noticing something before it's gone.",
    notes:
      "Pearl and citrine were paired because one diffuses light and the other sharpens it, which is how dew looks just before it burns off. The clusters are small enough to be forgotten until they catch the light, which is the point.",
    constellationFit: false,
    palette: ["#F3EDE4", "#E8D48F", "#BFC9DA"],
    shape: "earrings",
  },
  {
    slug: "parting-ribbon-sash",
    name: "Parting Ribbon Sash",
    movement: "aubade",
    category: "Accessories",
    kind: "Accessory (belt)",
    priceMin: 4500,
    priceMax: 6500,
    hook: "Some things you wear only for yourself.",
    story:
      "A raw-silk sash printed with the constellation over your city on the morning you bought it. A private detail no one else will notice — some things you wear only for yourself.",
    notes:
      "Raw silk keeps the print slightly soft, so the constellation reads as texture from a distance and as a map only up close. The print is generated from the date and place of purchase, making each sash a record of one specific morning.",
    constellationFit: true,
    palette: ["#D9A9A6", "#EFE3E6", "#B8924A"],
    shape: "sash",
  },
  {
    slug: "morning-bell-pendant",
    name: "Morning Bell Pendant",
    movement: "aubade",
    category: "Jewellery",
    kind: "Jewellery (necklace)",
    priceMin: 8500,
    priceMax: 12000,
    hook: "Something to physically mark the moment you decided to begin again.",
    story:
      "A small sealed gold bell that doesn't ring. Inside, invisible to anyone, is a line generated the day you bought it — something to physically mark the moment you decided to begin again.",
    notes:
      "A bell usually announces; this one keeps quiet, so the beginning belongs only to the wearer. The sealed line is written for the day of purchase, turning an ordinary morning into a date worth keeping.",
    constellationFit: false,
    palette: ["#E9D6B0", "#B8924A", "#F7F0EE"],
    shape: "bell",
  },
  {
    slug: "first-light-gloves",
    name: "First Light Gloves",
    movement: "aubade",
    category: "Accessories",
    kind: "Accessory",
    priceMin: 5000,
    priceMax: 7500,
    hook: "For people who don't like to say goodnight, only good morning.",
    story:
      "Opera-length silk gloves fading from gold at the fingertips to near-white at the elbow, like light climbing a wall at sunrise. For people who don't like to say goodnight, only good morning.",
    notes:
      "The gold sits at the fingertips because that is where light arrives first when you reach toward a window. Opera length gives the fade enough distance to feel like time passing rather than a colour change.",
    constellationFit: false,
    palette: ["#B8924A", "#E9D6B0", "#FBF7F2"],
    shape: "gloves",
  },
  // Nocturne — night movement
  {
    slug: "deep-sky-gown",
    name: "Deep Sky Gown",
    movement: "nocturne",
    category: "Garments",
    kind: "Garment",
    priceMin: 38000,
    priceMax: 55000,
    hook: "Feeling small under the night sky and feeling known by it are the same feeling.",
    story:
      "A floor-length indigo silk gown hand-embroidered with a real constellation map, personalizable to the exact sky above your birthplace. Built on the idea that feeling small under a vast night sky and feeling specifically known by it are the same feeling, depending how you wear it.",
    notes:
      "Floor length gives the embroidery a full sky's worth of space. The map is designed to be personalized, so the vastness is still specific to one person. Indigo was chosen over black so the stars read as light rather than decoration.",
    constellationFit: true,
    palette: ["#1E2250", "#3B2142", "#C6CBD8"],
    shape: "gown",
  },
  {
    slug: "eclipse-cape",
    name: "Eclipse Cape",
    movement: "nocturne",
    category: "Garments",
    kind: "Garment (outerwear)",
    priceMin: 28000,
    priceMax: 36000,
    hook: "For people who contain a version of themselves most people never see.",
    story:
      "A dramatic floor-sweeping cape, matte black on one side and brushed silver on the other, reversible so you choose which self you're presenting. For people who contain a version of themselves most people never see, and occasionally let it show.",
    notes:
      "Reversibility is the whole design: two finished faces, neither of them the lining. Matte black and brushed silver were chosen to behave like an eclipse, one absorbing light and one returning it.",
    constellationFit: false,
    palette: ["#0F1020", "#6E7385", "#C6CBD8"],
    shape: "cape",
  },
  {
    slug: "treblemaker-cuffs",
    name: "Treblemaker Cuffs",
    movement: "nocturne",
    category: "Jewellery",
    kind: "Jewellery / accessory",
    priceMin: 5500,
    priceMax: 8000,
    hook: "A rest isn't an absence of music; it's still part of the song.",
    story:
      "Gunmetal cufflinks shaped like a musical rest — the symbol telling a musician to play nothing, on purpose, for a measured length of time. For people who are bad at stopping. A rest isn't an absence of music; it's still part of the song.",
    notes:
      "The musical rest was chosen as a reminder worn at the wrist, where people check the time. Gunmetal keeps it quiet and unshowy, the way a pause should be.",
    constellationFit: false,
    palette: ["#4A4E5C", "#8B7897", "#C6CBD8"],
    shape: "rest",
  },
  {
    slug: "stardust-veil",
    name: "Stardust Veil",
    movement: "nocturne",
    category: "Accessories",
    kind: "Accessory (scarf)",
    priceMin: 9000,
    priceMax: 13000,
    hook: "For the quiet grief you carry but don't announce.",
    story:
      "A sheer, weightless scarf scattered with sequins like a long-exposure photo of the night sky. Designed for quiet grief — the kind you carry but don't announce — turning a private heaviness into something soft enough to wear in public.",
    notes:
      "Weightlessness was the brief: something heavy made light enough to carry. The sequins are scattered in trails, like stars in a long exposure, so the scarf records time passing rather than a single moment.",
    constellationFit: false,
    palette: ["#232742", "#8B7897", "#EDEAF2"],
    shape: "veil",
  },
  {
    slug: "orbit-rings",
    name: "Orbit Rings (set of 3)",
    movement: "nocturne",
    category: "Jewellery",
    kind: "Jewellery",
    priceMin: 7500,
    priceMax: 11000,
    hook: "For relationships that work like orbits.",
    story:
      "Three thin bands, each etched with a different moon phase, worn stacked or split across two people. For relationships that work like orbits — never touching, always circling, never quite leaving each other's pull.",
    notes:
      "Three bands let the set be divided between people without breaking it. Each moon phase is a different point in the same cycle, so the rings belong together even when apart.",
    constellationFit: false,
    palette: ["#6E7385", "#C6CBD8", "#3B2142"],
    shape: "rings",
  },
  {
    slug: "whisper-clutch",
    name: "Whisper Clutch",
    movement: "nocturne",
    category: "Accessories",
    kind: "Accessory (bag)",
    priceMin: 10500,
    priceMax: 15000,
    hook: "For the private sentence you carry through an evening.",
    story:
      "A structured plum satin clutch with a hidden pocket sewn shut on one side — big enough for a folded note, nothing else. For the private sentence you carry through an evening without anyone knowing it's there.",
    notes:
      "The hidden pocket is sized for a folded note and nothing else, so it cannot become storage. Plum satin was chosen for its low shine, a bag that holds attention without asking for it.",
    constellationFit: false,
    palette: ["#3B2142", "#5E3A66", "#B8924A"],
    shape: "clutch",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

export const priceRange = (p: Product) => `${formatINR(p.priceMin)}–${formatINR(p.priceMax)}`;

export const movementName = (m: Movement) => (m === "aubade" ? "Aubade" : "Nocturne");
