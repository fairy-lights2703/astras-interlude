"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Category, Movement, products } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useTheme } from "./providers";
import { Horizon } from "./motifs";

const CATS: Category[] = ["Garments", "Jewellery", "Accessories"];

const INTRO: Record<Movement | "all", { title: string; body: string }> = {
  all: { title: "All pieces", body: "Twelve pieces across two movements. Six for the first light, six for after dark." },
  aubade: {
    title: "Aubade",
    body: "The dawn movement. Pale gold, milk lilac, dusty rose, soft silver-blue. Clothes for leaving something behind, and for beginning again.",
  },
  nocturne: {
    title: "Nocturne",
    body: "The night movement. Midnight indigo, deep plum, gunmetal silver, black flecked with silver thread. Clothes for what you carry quietly.",
  },
};

export function CollectionsView() {
  const params = useSearchParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const m = params.get("movement");
  const movement: Movement | null = m === "aubade" || m === "nocturne" ? m : null;
  const c = params.get("category");
  const category = CATS.find((x) => x === c) ?? null;

  // Arriving on a movement's collection (by any link) sets the theme to match
  useEffect(() => {
    if (movement && movement !== document.documentElement.dataset.theme) setTheme(movement);
  }, [movement, theme, setTheme]);

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "movement" && (value === "aubade" || value === "nocturne")) setTheme(value);
    const qs = next.toString();
    router.replace(qs ? `/collections?${qs}` : "/collections", { scroll: false });
  };

  const list = products.filter((p) => (!movement || p.movement === movement) && (!category || p.category === category));
  const intro = INTRO[movement ?? "all"];

  const pill = (on: boolean) =>
    `chip ${on ? "!bg-ink !text-bg !border-ink" : ""}`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <h1 className="text-5xl sm:text-6xl">{intro.title}</h1>
          <p className="mt-5 text-lg text-muted prose-measure">{intro.body}</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10" role="group" aria-label="Filters">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Movement</legend>
          <span className="text-sm text-muted mr-1">Movement</span>
          <button type="button" aria-pressed={!movement} className={pill(!movement)} onClick={() => set("movement", null)}>Both</button>
          <button type="button" aria-pressed={movement === "aubade"} className={pill(movement === "aubade")} onClick={() => set("movement", "aubade")}>Aubade</button>
          <button type="button" aria-pressed={movement === "nocturne"} className={pill(movement === "nocturne")} onClick={() => set("movement", "nocturne")}>Nocturne</button>
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Category</legend>
          <span className="text-sm text-muted mr-1">Category</span>
          <button type="button" aria-pressed={!category} className={pill(!category)} onClick={() => set("category", null)}>All</button>
          {CATS.map((x) => (
            <button key={x} type="button" aria-pressed={category === x} className={pill(category === x)} onClick={() => set("category", x)}>
              {x}
            </button>
          ))}
        </fieldset>
      </div>

      <Horizon className="mt-8" />

      {list.length ? (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} className={i % 3 === 1 ? "lg:mt-20" : ""} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-lg text-muted">Nothing in this corner of the sky yet. Try another category.</p>
      )}
    </div>
  );
}
