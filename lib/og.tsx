import { ImageResponse } from "next/og";
import { BRAND_MARK_PATH } from "@/components/motifs";

// Pulls a TTF subset from Google Fonts (satori can't read woff2). Falls back to the default font if offline.
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

const NAME = "Astra’s Interlude";
const TAGLINE = "Ad Astra Abyssosque"; // as set in the stacked logo

// Social preview, laid out like /public/brand/logo-stacked-cream.svg on the night background
export async function brandCard(width: number, height: number) {
  const [fraunces, workSans] = await Promise.all([loadFont("Fraunces:wght@400", NAME), loadFont("Work+Sans:wght@400", TAGLINE)]);
  const fonts = [
    ...(fraunces ? [{ name: "Fraunces", data: fraunces, weight: 400 as const }] : []),
    ...(workSans ? [{ name: "Work Sans", data: workSans, weight: 400 as const }] : []),
  ];
  const s = height / 630;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0C0E22 0%, #171A2E 60%, #2B2347 100%)",
        }}
      >
        <svg width={150 * s} height={302 * s} viewBox="0 -22 120 242">
          <path d={BRAND_MARK_PATH} fill="#EDEAF2" />
        </svg>
        <div style={{ marginTop: 36 * s, fontFamily: "Fraunces", fontSize: 96 * s, color: "#EDEAF2", letterSpacing: 1 }}>{NAME}</div>
        <div style={{ marginTop: 18 * s, fontFamily: "Work Sans", fontSize: 28 * s, color: "#A99BB5", letterSpacing: 6 * s }}>{TAGLINE}</div>
      </div>
    ),
    { width, height, fonts }
  );
}
