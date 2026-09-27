"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

export function DesignNotes({ notes }: { notes: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <div className="mt-10 border-t border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="display text-lg">Design notes</span>
        <span aria-hidden className="text-accent-ink text-xl leading-none">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="notes"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted prose-measure">{notes}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
