import { brandCard } from "@/lib/og";

export const alt = "Astra's Interlude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandCard(size.width, size.height);
}
