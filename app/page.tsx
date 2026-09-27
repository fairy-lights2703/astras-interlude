import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { ConstellationMark, Horizon, MoonPhase } from "@/components/motifs";
import { getProduct } from "@/lib/products";
import { EntryLink } from "@/components/entry-link";

const featured = ["the-last-star-slip-dress", "deep-sky-gown", "morning-bell-pendant", "rest-note-cufflinks"].map((s) => getProduct(s)!);

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 sm:px-8 pt-24 grid md:grid-cols-12 gap-8">
        <p className="md:col-span-7 md:col-start-2 text-2xl sm:text-3xl display leading-snug">
          Astra&apos;s Interlude doesn&apos;t release seasons. We release movements, named for the two halves of a day. Every
          piece starts from a feeling, and an AI collaborator helps us find its shape. You can see that reasoning on every page.
        </p>
      </section>

      <Horizon className="mx-auto max-w-6xl px-4 sm:px-8 mt-20" />

      <section aria-label="The two movements" className="mx-auto max-w-6xl px-4 sm:px-8 mt-16 grid md:grid-cols-12 gap-6">
        <EntryLink
          movement="aubade"
          className="md:col-span-7 min-h-[360px] p-8 sm:p-10 flex flex-col justify-between bg-bg text-ink border border-line rounded-sm"
        >
          <MoonPhase phase={0.3} className="text-accent" size={28} />
          <div>
            <h2 className="text-4xl sm:text-5xl">Aubade</h2>
            <p className="mt-3 max-w-sm text-muted">The dawn movement. Pale gold, milk lilac, dusty rose. For leaving, and for beginning again.</p>
            <span className="mt-6 inline-block link">Enter Aubade</span>
          </div>
        </EntryLink>
        <EntryLink
          movement="nocturne"
          className="md:col-span-5 md:mt-24 min-h-[360px] p-8 sm:p-10 flex flex-col justify-between bg-bg text-ink border border-line rounded-sm"
        >
          <ConstellationMark className="text-accent" size={48} />
          <div>
            <h2 className="text-4xl sm:text-5xl">Nocturne</h2>
            <p className="mt-3 max-w-sm text-muted">The night movement. Midnight indigo, deep plum, gunmetal. For what you carry quietly.</p>
            <span className="mt-6 inline-block link">Enter Nocturne</span>
          </div>
        </EntryLink>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-8 mt-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl">A few pieces to begin with</h2>
          <Link href="/collections" className="link shrink-0">
            See all pieces
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} className={i % 2 === 1 ? "lg:mt-16" : ""} />
          ))}
        </div>
      </section>
    </>
  );
}
