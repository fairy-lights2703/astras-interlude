"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./providers";
import type { Movement } from "@/lib/products";

const SRC: Record<Movement, string> = { aubade: "/audio/aubade.mp3", nocturne: "/audio/nocturne.mp3" };
const MAX = 0.55;

// Hidden until the loops exist in /public/audio, so the site works before they're added.
export function AudioToggle() {
  const { theme } = useTheme();
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const tracks = useRef<Partial<Record<Movement, HTMLAudioElement>>>({});
  const current = useRef<Movement | null>(null);

  useEffect(() => {
    Promise.all(Object.values(SRC).map((s) => fetch(s, { method: "HEAD" }).then((r) => r.ok).catch(() => false))).then((ok) =>
      setAvailable(ok.every(Boolean))
    );
  }, []);

  const track = (m: Movement) => {
    if (!tracks.current[m]) {
      const a = new Audio(SRC[m]);
      a.loop = true;
      a.volume = 0;
      tracks.current[m] = a;
    }
    return tracks.current[m]!;
  };

  const fade = (a: HTMLAudioElement, to: number, ms = 1000, done?: () => void) => {
    const from = a.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      a.volume = from + (to - from) * t;
      if (t < 1) requestAnimationFrame(step);
      else done?.();
    };
    requestAnimationFrame(step);
  };

  // Crossfade when the theme changes while playing
  useEffect(() => {
    if (!playing) return;
    const prev = current.current;
    if (prev === theme) return;
    const next = track(theme);
    next.play().catch(() => {});
    fade(next, MAX);
    if (prev) {
      const old = track(prev);
      fade(old, 0, 1000, () => old.pause());
    }
    current.current = theme;
  }, [theme, playing]);

  const toggle = () => {
    if (playing) {
      const a = current.current && tracks.current[current.current];
      if (a) fade(a, 0, 400, () => a.pause());
      current.current = null;
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      className="p-2 rounded-full hover:bg-surface"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M4 9h4l5-4v14l-5-4H4z" strokeLinejoin="round" />
        {playing ? (
          <>
            <path d="M16 9.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
            <path d="M18.5 7a7 7 0 0 1 0 10" strokeLinecap="round" />
          </>
        ) : (
          <path d="M16.5 9.5l5 5m0-5l-5 5" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
