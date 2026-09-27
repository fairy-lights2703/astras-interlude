import type { Metadata } from "next";
import { BrandMark } from "@/components/motifs";

export const metadata: Metadata = { title: "About · Astra's Interlude" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-7 md:col-start-2">
        <BrandMark size={44} className="text-accent" />
        <h1 className="mt-8 text-5xl sm:text-6xl">About</h1>
        <p className="mt-10 pullquote text-2xl sm:text-3xl leading-snug prose-measure">
          Astra is a star. An interlude is the short piece played between two longer ones.
        </p>
        <p className="mt-8 text-lg prose-measure">
          We make clothes for the in-between: the hour between night and morning, the months between one life and the next.
          Each piece begins with a feeling rather than a trend.
        </p>
        <p className="mt-5 text-lg prose-measure">
          We work the way a composer might: a feeling first, then a shape, then the quiet between the notes. Every page
          carries a note on why its piece exists, because we&apos;d rather you knew.
        </p>
      </div>
    </div>
  );
}
