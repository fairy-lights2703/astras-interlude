"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products, priceRange } from "@/lib/products";
import type { SkyInput } from "@/lib/sky";
import { ConstellationSky } from "./constellation-sky";
import { ProductPlate } from "./product-plate";
import { useCart, useSky } from "./providers";

const eligible = products.filter((p) => p.constellationFit);

export function ConstellationFit() {
  const params = useSearchParams();
  const forSlug = params.get("for");
  const { sky, setSky } = useSky();
  const { add } = useCart();
  const [form, setForm] = useState<SkyInput>({ date: "", time: "", place: "" });
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    if (sky) setForm(sky);
  }, [sky]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.place.trim()) return;
    setSky({ date: form.date, time: form.time, place: form.place.trim() });
    setAdded(null);
  };

  const ordered = forSlug ? [...eligible].sort((a) => (a.slug === forSlug ? -1 : 1)) : eligible;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <h1 className="text-5xl sm:text-6xl">Constellation Fit</h1>
          <p className="mt-5 text-lg text-muted prose-measure">
            Tell us about a moment: when you were born, when you left, when you began. We&apos;ll draw the sky above it, and
            that sky can be embroidered into a piece made for you. The same moment always gives the same sky.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="cf-date" className="block text-sm mb-1.5">Date</label>
              <input id="cf-date" type="date" required className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cf-time" className="block text-sm mb-1.5">Time <span className="text-muted">(if you know it)</span></label>
              <input id="cf-time" type="time" className="field" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cf-place" className="block text-sm mb-1.5">Place</label>
              <input
                id="cf-place"
                type="text"
                required
                placeholder="A city, a town, a street you remember"
                className="field"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
            </div>
            <button type="submit" className="btn">Draw my sky</button>
          </form>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sky ? (
            <ConstellationSky input={sky} />
          ) : (
            <div data-theme="nocturne" className="aspect-[3/2] bg-bg rounded-sm flex items-center justify-center p-8 text-center">
              <p className="pullquote text-2xl text-ink max-w-xs">Your sky will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {sky && (
        <section className="mt-24" aria-labelledby="apply-heading">
          <h2 id="apply-heading" className="text-3xl">Wear this sky</h2>
          <p className="mt-3 text-muted prose-measure">Three pieces can carry it. Your sky is saved, so you can also choose it later from the piece&apos;s own page.</p>
          <ul className="mt-10 grid sm:grid-cols-3 gap-8">
            {ordered.map((p) => (
              <li key={p.slug} className={p.slug === forSlug ? "sm:-mt-4" : ""}>
                <Link href={`/product/${p.slug}`}>
                  <ProductPlate product={p} className="w-full h-auto rounded-sm" />
                </Link>
                <h3 className="mt-4 text-xl">{p.name}</h3>
                <p className="text-sm mt-1">{priceRange(p)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      add({ slug: p.slug, fit: "ready", price: p.priceMin, sky });
                      setAdded(p.slug);
                    }}
                  >
                    Add with this sky
                  </button>
                  {added === p.slug && (
                    <span role="status" className="text-sm">
                      Added. <Link href="/cart" className="link">View cart</Link>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
