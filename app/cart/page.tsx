"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers";
import { getProduct, formatINR, movementName } from "@/lib/products";
import { describeSky } from "@/lib/sky";
import { ProductPlate } from "@/components/product-plate";
import { MoonPhase } from "@/components/motifs";

export default function CartPage() {
  const { items, subtotal, remove, setQty, clear } = useCart();
  const router = useRouter();

  const confirm = () => {
    try {
      sessionStorage.setItem("ai-last-order", JSON.stringify({ count: items.reduce((n, i) => n + i.qty, 0), total: subtotal }));
    } catch {}
    clear();
    router.push("/checkout/confirmed");
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-24 min-h-[50vh]">
        <MoonPhase phase={0} size={36} className="text-accent" />
        <h1 className="mt-6 text-4xl sm:text-5xl">Nothing here yet.</h1>
        <p className="mt-4 text-lg text-muted">The night is still empty.</p>
        <Link href="/collections" className="btn mt-10">
          Browse the pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16">
      <h1 className="text-4xl sm:text-5xl">Your cart</h1>
      <div className="mt-10 grid lg:grid-cols-12 gap-12">
        <ul className="lg:col-span-8 divide-y divide-[var(--line)] border-y border-line">
          {items.map((item) => {
            const p = getProduct(item.slug);
            if (!p) return null;
            return (
              <li key={item.key} className="py-6 grid grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr_auto] gap-5">
                <Link href={`/product/${p.slug}`}>
                  <ProductPlate product={p} className="w-full h-auto rounded-sm" />
                </Link>
                <div>
                  <Link href={`/product/${p.slug}`} className="display text-xl hover:underline underline-offset-4">
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted mt-1">
                    {movementName(p.movement)} · {item.fit === "ready" ? "Ready to wear" : "Made to measure"}
                  </p>
                  {item.sky && <p className="text-sm mt-1">Your sky: {describeSky(item.sky)}</p>}
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    <label htmlFor={`qty-${item.key}`} className="text-muted">Quantity</label>
                    <select
                      id={`qty-${item.key}`}
                      value={item.qty}
                      onChange={(e) => setQty(item.key, Number(e.target.value))}
                      className="field !w-auto !py-1"
                    >
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => remove(item.key)} className="underline underline-offset-4 text-muted hover:text-ink">
                      Remove
                    </button>
                  </div>
                </div>
                <p className="col-start-2 sm:col-start-auto sm:text-right">{formatINR(item.price * item.qty)}</p>
              </li>
            );
          })}
        </ul>

        <aside className="lg:col-span-4">
          <div className="bg-surface border border-line rounded-sm p-6">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <p className="mt-2 text-sm text-muted">Shipping is included. Personalized pieces take 3–4 weeks.</p>
            <button type="button" className="btn w-full mt-6" onClick={confirm}>
              Confirm order
            </button>
            <p className="mt-3 text-xs text-muted">This is a prototype. No payment is taken.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
