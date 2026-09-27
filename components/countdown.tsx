"use client";

import { useEffect, useState } from "react";
import { NEXT_EVENT } from "@/lib/events";

export function Countdown() {
  const target = new Date(NEXT_EVENT.iso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const left = now === null ? null : Math.max(0, target - now);
  const parts =
    left === null
      ? null
      : [
          { n: Math.floor(left / 86400000), l: "days" },
          { n: Math.floor((left / 3600000) % 24), l: "hours" },
          { n: Math.floor((left / 60000) % 60), l: "minutes" },
          { n: Math.floor((left / 1000) % 60), l: "seconds" },
        ];

  return (
    <div>
      <dl className="flex flex-wrap gap-x-10 gap-y-4" aria-label={`Time until ${NEXT_EVENT.name}`}>
        {(parts ?? [{ n: 0, l: "days" }, { n: 0, l: "hours" }, { n: 0, l: "minutes" }, { n: 0, l: "seconds" }]).map((p) => (
          <div key={p.l} className="flex flex-col">
            <dt className="text-sm text-muted">{p.l}</dt>
            <dd className="display text-5xl sm:text-6xl tabular-nums">
              {parts ? String(p.n).padStart(2, "0") : "··"}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-muted">
        Until {NEXT_EVENT.name}, {NEXT_EVENT.label}.
      </p>
    </div>
  );
}

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p role="status" className="mt-8 text-lg">
        Thank you. We&apos;ll write once, on the night it opens. (Prototype: nothing is stored or sent.)
      </p>
    );
  return (
    <form
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
    >
      <label htmlFor="notify-email" className="sr-only">Email</label>
      <input id="notify-email" type="email" required className="field" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" className="btn shrink-0">Notify me</button>
    </form>
  );
}
