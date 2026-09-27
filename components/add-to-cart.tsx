"use client";

import Link from "next/link";
import { useState } from "react";
import { formatINR, Product } from "@/lib/products";
import { describeSky, SkyInput } from "@/lib/sky";
import { Fit, useCart, useSky } from "./providers";

export function AddToCart({ product, sky: forcedSky }: { product: Product; sky?: SkyInput }) {
  const { add } = useCart();
  const { sky: savedSky } = useSky();
  const [fit, setFit] = useState<Fit>("ready");
  const [useSaved, setUseSaved] = useState(true);
  const [added, setAdded] = useState(false);

  const sky = forcedSky ?? (product.constellationFit && useSaved ? savedSky ?? undefined : undefined);
  const price = fit === "ready" ? product.priceMin : product.priceMax;

  return (
    <div>
      <fieldset>
        <legend className="text-sm text-muted mb-2">Fit</legend>
        <div className="flex flex-col gap-2">
          {(["ready", "measure"] as Fit[]).map((f) => (
            <label key={f} className="flex items-center justify-between gap-4 border border-line rounded-md px-4 py-3 cursor-pointer has-[:checked]:border-ink">
              <span className="flex items-center gap-3">
                <input type="radio" name={`fit-${product.slug}`} checked={fit === f} onChange={() => setFit(f)} className="accent-[var(--accent-gold)]" />
                {f === "ready" ? "Ready to wear" : "Made to measure"}
              </span>
              <span>{formatINR(f === "ready" ? product.priceMin : product.priceMax)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {product.constellationFit && !forcedSky && savedSky && (
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input type="checkbox" checked={useSaved} onChange={(e) => setUseSaved(e.target.checked)} className="mt-1 accent-[var(--accent-gold)]" />
          <span>Embroider with your sky: {describeSky(savedSky)}</span>
        </label>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="btn"
          onClick={() => {
            add({ slug: product.slug, fit, price, sky });
            setAdded(true);
          }}
        >
          Add to cart
        </button>
        {added && (
          <p role="status" className="text-sm">
            Added. <Link href="/cart" className="link">View your cart</Link>
          </p>
        )}
      </div>
    </div>
  );
}
