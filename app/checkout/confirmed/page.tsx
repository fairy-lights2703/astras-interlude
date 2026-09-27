"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ConstellationMark } from "@/components/motifs";

export default function ConfirmedPage() {
  const reduce = useReducedMotion();
  const [ref, setRef] = useState("");
  useEffect(() => setRef("ASTRA-" + Math.random().toString(36).slice(2, 8).toUpperCase()), []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-24 min-h-[60vh]">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl bg-surface border border-line rounded-sm p-8 sm:p-12"
      >
        <ConstellationMark size={56} className="text-accent" />
        <h1 className="mt-8 text-4xl sm:text-5xl pullquote">Your interlude has begun.</h1>
        <p className="mt-6 text-lg prose-measure">
          Thank you. We&apos;ve started on your pieces, and we&apos;ll write when they leave the atelier. Until then, nothing
          is asked of you.
        </p>
        {ref && <p className="mt-6 text-sm text-muted">A note for your records: {ref}</p>}
        <Link href="/" className="btn btn-ghost mt-10">
          Return home
        </Link>
      </motion.div>
    </div>
  );
}
