import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, movementName, priceRange, products } from "@/lib/products";
import { ProductPlate } from "@/components/product-plate";
import { DesignNotes } from "@/components/design-notes";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { ConstellationMark } from "@/components/motifs";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p ? `${p.name} · Astra's Interlude` : "Astra's Interlude", description: p?.hook };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const more = products.filter((p) => p.movement === product.movement && p.slug !== product.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href={`/collections?movement=${product.movement}`} className="hover:text-ink underline underline-offset-4">
          {movementName(product.movement)}
        </Link>
        <span className="mx-2" aria-hidden>/</span>
        <span>{product.category}</span>
      </nav>

      <div className="mt-8 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <ProductPlate product={product} className="w-full h-auto rounded-sm" />
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <h1 className="text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg">{priceRange(product)}</p>
          <p className="mt-1 text-sm text-muted">
            {product.kind} · {movementName(product.movement)}
          </p>

          <blockquote className="mt-10 pullquote text-2xl leading-snug border-l border-accent pl-5 prose-measure">
            {product.hook}
          </blockquote>

          <p className="mt-8 text-[1.05rem] prose-measure">{product.story}</p>

          <div className="mt-10">
            <AddToCart product={product} />
          </div>

          <DesignNotes notes={product.notes} />
        </div>
      </div>

      {product.constellationFit && (
        <section data-theme="nocturne" className="mt-20 bg-bg text-ink rounded-sm p-8 sm:p-12 grid md:grid-cols-12 gap-6 items-center">
          <ConstellationMark size={64} className="text-accent md:col-span-2" />
          <div className="md:col-span-7">
            <h2 className="text-3xl">Personalize with your sky</h2>
            <p className="mt-3 text-muted prose-measure">
              This piece can carry the stars above a moment that matters to you: a birth, a departure, a first morning somewhere
              new. Give us a date, a time and a place, and we&apos;ll draw that sky.
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <Link href={`/constellation-fit?for=${product.slug}`} className="btn">
              Personalize with your sky
            </Link>
          </div>
        </section>
      )}

      <section className="mt-24">
        <h2 className="text-3xl">Also in {movementName(product.movement)}</h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {more.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
