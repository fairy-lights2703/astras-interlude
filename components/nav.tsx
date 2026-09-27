"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCart, useTheme } from "./providers";
import { AudioToggle } from "./audio-toggle";
import { RestMark } from "./motifs";
import type { Movement } from "@/lib/products";

function NavInner() {
  const { theme, setTheme } = useTheme();
  const { count } = useCart();
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname, params]);

  const movementActive = (m: Movement) => pathname === "/collections" && params.get("movement") === m;

  const go = (m: Movement) => (e: React.MouseEvent) => {
    e.preventDefault();
    setTheme(m);
    router.push(`/collections?movement=${m}`);
  };

  const item = "py-1 border-b border-transparent hover:border-line transition-colors";
  const active = "border-b !border-accent";

  const links = (
    <>
      <a href="/collections?movement=aubade" onClick={go("aubade")} className={`${item} ${movementActive("aubade") ? active : ""}`}>
        Aubade
      </a>
      <a href="/collections?movement=nocturne" onClick={go("nocturne")} className={`${item} ${movementActive("nocturne") ? active : ""}`}>
        Nocturne
      </a>
      <Link href="/collections" className={`${item} ${pathname === "/collections" && !params.get("movement") ? active : ""}`}>
        All pieces
      </Link>
      <Link href="/constellation-fit" className={`${item} ${pathname === "/constellation-fit" ? active : ""}`}>
        Constellation Fit
      </Link>
      <Link href="/journal" className={`${item} ${pathname === "/journal" ? active : ""}`}>
        The Movements
      </Link>
      <Link href="/about" className={`${item} ${pathname === "/about" ? active : ""}`}>
        About
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Astra's Interlude, home">
          <RestMark size={18} className="text-accent" />
          <span className="display text-xl">Astra&apos;s Interlude</span>
        </Link>
        <nav aria-label="Main" className="hidden lg:flex items-center gap-6 text-[0.95rem] ml-6">
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <AudioToggle />
          <Link href="/cart" className="px-3 py-1.5 rounded-full hover:bg-surface text-[0.95rem]" aria-label={`Cart, ${count} items`}>
            Cart{count > 0 && <span className="ml-1 text-accent-ink">({count})</span>}
          </Link>
          <button
            type="button"
            className="lg:hidden px-3 py-1.5 rounded-full border border-line text-[0.95rem]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="lg:hidden flex flex-col gap-3 px-4 pb-5 pt-2 text-lg border-t border-line">
          {links}
        </nav>
      )}
      <span className="sr-only" aria-live="polite">
        {theme === "aubade" ? "Dawn theme" : "Night theme"}
      </span>
    </header>
  );
}

export function Nav() {
  return (
    <Suspense fallback={<div className="h-16 border-b border-line" />}>
      <NavInner />
    </Suspense>
  );
}
