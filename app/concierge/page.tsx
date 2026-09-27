import type { Metadata } from "next";
import { Concierge } from "@/components/concierge";
import { BrandMark } from "@/components/motifs";

export const metadata: Metadata = {
  title: "The Interlude Concierge · Astra's Interlude",
  description: "Ask what to wear for a moment in your life, find a piece, or get help with an order.",
};

export default function ConciergePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <BrandMark size={40} className="text-accent" />
        <h1 className="mt-6 text-4xl sm:text-5xl">The Interlude Concierge</h1>
        <p className="mt-5 text-lg text-muted prose-measure">
          Tell us about the moment you&apos;re dressing for, and we&apos;ll suggest a movement and a few pieces. You can also
          ask about a piece, an order, or how to reach us.
        </p>
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <Concierge inline />
      </div>
    </div>
  );
}
