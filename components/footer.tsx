import Link from "next/link";
import { RestMark } from "./motifs";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 grid gap-6 sm:grid-cols-[2fr_1fr_1fr] text-sm text-muted">
        <div className="flex items-start gap-3">
          <RestMark size={20} className="text-accent mt-1" />
          <p className="max-w-sm">
            Astra&apos;s Interlude is an online-only atelier. A person replies to messages 10am–8pm IST, every day.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-1">
          <Link href="/collections" className="hover:text-ink">Collections</Link>
          <Link href="/constellation-fit" className="hover:text-ink">Constellation Fit</Link>
          <Link href="/journal" className="hover:text-ink">The Movements</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
        </nav>
        <p className="pullquote text-base">ad astra abyssosque</p>
      </div>
    </footer>
  );
}
