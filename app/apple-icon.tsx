import { ImageResponse } from "next/og";
import { BRAND_MARK_PATH } from "@/components/motifs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the gold mark (as in /public/brand/favicon.svg) on the night background
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171A2E" }}>
        <svg width={66} height={133} viewBox="0 -22 120 242">
          <path d={BRAND_MARK_PATH} fill="#B8924A" />
        </svg>
      </div>
    ),
    size
  );
}
