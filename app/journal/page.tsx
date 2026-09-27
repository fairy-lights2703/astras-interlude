import type { Metadata } from "next";
import Link from "next/link";
import { Countdown, NotifyForm } from "@/components/countdown";
import { Horizon, MoonPhase, BrandMark } from "@/components/motifs";

export const metadata: Metadata = { title: "The Movements · Astra's Interlude" };

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-16">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <h1 className="text-5xl sm:text-6xl">The Movements</h1>
          <p className="mt-8 text-lg prose-measure">
            Fashion usually runs on seasons: spring, summer, autumn, winter, and a rush to be first to each. We work on a
            smaller clock. A day has two halves, and most of what happens to a person happens in one or the other: the
            decision made at dawn, the thing said after dark.
          </p>
          <p className="mt-5 text-lg prose-measure">
            So we release movements instead of seasons, the way a piece of music is divided. Each movement is named for a
            half of the day, and each one arrives with the sky, on a solstice, an equinox or a night of falling stars.
            Nothing is rushed to meet a calendar.
          </p>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-6">
        <section data-theme="aubade" className="bg-bg text-ink border border-line rounded-sm p-8 sm:p-10">
          <MoonPhase phase={0.25} size={28} className="text-accent" />
          <h2 className="mt-6 text-3xl">
            <Link href="/collections?movement=aubade" className="hover:underline underline-offset-4">Aubade</Link>
          </h2>
          <p className="mt-3 text-muted prose-measure">
            An aubade is a song for the dawn, sung by someone who has to leave. The first movement is for leaving and for
            beginning, often the same morning.
          </p>
        </section>
        <section data-theme="nocturne" className="bg-bg text-ink border border-line rounded-sm p-8 sm:p-10 md:mt-16">
          <MoonPhase phase={0.5} size={28} className="text-accent" />
          <h2 className="mt-6 text-3xl">
            <Link href="/collections?movement=nocturne" className="hover:underline underline-offset-4">Nocturne</Link>
          </h2>
          <p className="mt-3 text-muted prose-measure">
            A nocturne is a piece written for the night. The second movement is for what you carry quietly: grief, love,
            the version of you most people never see.
          </p>
        </section>
      </div>

      <Horizon className="mt-24" />

      <section className="mt-16 grid md:grid-cols-12 gap-10" aria-labelledby="next-heading">
        <div className="md:col-span-5">
          <BrandMark size={40} className="text-accent" />
          <h2 id="next-heading" className="mt-6 text-3xl sm:text-4xl">The next movement</h2>
          <p className="mt-4 text-muted prose-measure">
            The third movement opens at the December solstice, the longest night of the year. Leave your email and
            we&apos;ll tell you the moment it arrives.
          </p>
          <NotifyForm />
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-12">
          <Countdown />
        </div>
      </section>
    </div>
  );
}
