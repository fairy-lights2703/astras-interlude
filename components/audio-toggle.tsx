"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./providers";
import type { Movement } from "@/lib/products";

const SRC: Record<Movement, string> = { aubade: "/audio/aubade.mp3", nocturne: "/audio/nocturne.mp3" };
const MASTER = 0.14; // quiet by design
const PREF = "ai-sound";

type Voice = { gain: GainNode };

/* Ambient pads synthesized in the browser, used until real loops exist in /public/audio. */
function synthPad(ctx: AudioContext, m: Movement, out: AudioNode) {
  const notes = m === "aubade" ? [293.66, 440, 659.25, 739.99] : [110, 164.81, 261.63, 392];
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = m === "aubade" ? 2400 : 900;
  filter.connect(out);
  notes.forEach((f, i) => {
    for (const detune of [-6, 6]) {
      const osc = ctx.createOscillator();
      osc.type = m === "aubade" ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.value = 0.12 / notes.length;
      // Slow swell so the pad breathes
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.023;
      const depth = ctx.createGain();
      depth.gain.value = 0.05 / notes.length;
      lfo.connect(depth).connect(g.gain);
      osc.connect(g).connect(filter);
      osc.start();
      lfo.start();
    }
  });
}

function chime(ctx: AudioContext, out: AudioNode, m: Movement) {
  const base = m === "aubade" ? 1046.5 : 783.99;
  const now = ctx.currentTime;
  [1, 2.76, 5.4].forEach((ratio, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = base * ratio;
    const g = ctx.createGain();
    const peak = [0.5, 0.18, 0.07][i];
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(peak, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 - i * 0.6);
    osc.connect(g).connect(out);
    osc.start(now);
    osc.stop(now + 3);
  });
}

export function AudioToggle() {
  const { theme } = useTheme();
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const voices = useRef<Partial<Record<Movement, Voice>>>({});
  const files = useRef<Record<Movement, boolean>>({ aubade: false, nocturne: false });
  const active = useRef<Movement | null>(null);
  const chimed = useRef(false);
  const lastChime = useRef(-10);

  // Remembered preference; default is on
  useEffect(() => {
    try {
      if (localStorage.getItem(PREF) === "off") setOn(false);
    } catch {}
    Promise.all(
      (Object.keys(SRC) as Movement[]).map((m) =>
        fetch(SRC[m], { method: "HEAD" })
          .then((r) => (files.current[m] = r.ok && (r.headers.get("content-type") ?? "").includes("audio")))
          .catch(() => false)
      )
    ).finally(() => setReady(true));
  }, []);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const g = ctx.createGain();
      g.gain.value = MASTER;
      g.connect(ctx.destination);
      ctxRef.current = ctx;
      master.current = g;
    }
    return ctxRef.current;
  };

  const voice = (m: Movement) => {
    const ctx = ensureCtx();
    if (!voices.current[m]) {
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(master.current!);
      if (files.current[m]) {
        const el = new Audio(SRC[m]);
        el.loop = true;
        el.crossOrigin = "anonymous";
        ctx.createMediaElementSource(el).connect(gain);
        el.play().catch(() => {});
      } else {
        synthPad(ctx, m, gain);
      }
      voices.current[m] = { gain };
    }
    return voices.current[m]!;
  };

  const ramp = (g: GainNode, to: number, secs: number) => {
    const ctx = ctxRef.current!;
    const now = ctx.currentTime;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(g.gain.value, now);
    g.gain.linearRampToValueAtTime(to, now + secs);
  };

  // Start (or crossfade to) the current movement's track whenever sound is on
  useEffect(() => {
    if (!ready || !on) return;
    const ctx = ensureCtx();

    const start = () => {
      if (ctx.state !== "running") return false;
      const firstChime = !chimed.current;
      const switching = !!active.current && active.current !== theme;
      if ((firstChime || switching) && ctx.currentTime - lastChime.current > 1.5) {
        chime(ctx, master.current!, theme);
        lastChime.current = ctx.currentTime;
      }
      chimed.current = true;
      if (active.current !== theme) {
        if (active.current) ramp(voice(active.current).gain, 0, 1);
        ramp(voice(theme).gain, 1, active.current ? 1 : 3);
        active.current = theme;
      }
      return true;
    };

    ctx.resume().catch(() => {}).finally(() => {
      if (start()) return;
      // Browsers hold audio until the first interaction; begin then
      const unlock = () => {
        ctx.resume().then(start).catch(() => {});
        events.forEach((e) => window.removeEventListener(e, unlock));
      };
      const events = ["pointerdown", "keydown", "touchstart"];
      events.forEach((e) => window.addEventListener(e, unlock, { once: true }));
    });
  }, [ready, on, theme]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(PREF, next ? "on" : "off");
    } catch {}
    if (!next && active.current && ctxRef.current) {
      ramp(voice(active.current).gain, 0, 0.4);
      active.current = null;
      chimed.current = true;
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      title={on ? "Mute ambient sound" : "Play ambient sound"}
      className="p-2 rounded-full hover:bg-surface"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M4 9h4l5-4v14l-5-4H4z" strokeLinejoin="round" />
        {on ? (
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
