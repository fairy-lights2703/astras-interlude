"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products, priceRange, movementName, Product } from "@/lib/products";
import { stylist } from "@/lib/stylist";
import { NEXT_EVENT } from "@/lib/events";
import { BrandMark } from "./motifs";

type Mode = "menu" | "wear" | "product" | "contact";
type Msg = { from: "bot" | "you"; text?: string; products?: { product: Product; why?: string }[]; node?: React.ReactNode };

const CHIPS: { id: string; label: string }[] = [
  { id: "wear", label: "Find something to wear" },
  { id: "product", label: "Product info" },
  { id: "timings", label: "Store timings" },
  { id: "offers", label: "Offers" },
  { id: "orders", label: "Order & delivery help" },
  { id: "contact", label: "Contact us" },
];

const ORDER_FAQ = [
  { id: "shipping", label: "Shipping windows", text: "Ready-to-wear pieces leave the atelier in 3–5 days and reach most Indian cities within a week. Made-to-measure and Constellation Fit pieces take 3–4 weeks, because the embroidery is done by hand." },
  { id: "tracking", label: "Tracking an order", text: "Once your piece leaves us, a tracking link arrives by email. If it hasn't come within five days of ordering, write to us and a person will look into it." },
  { id: "returns", label: "Returns", text: "Ready-to-wear pieces can be returned within 14 days, unworn. Personalized pieces carry your sky, so they can't be returned, but we will always repair them." },
];

const greeting = () => {
  const h = new Date().getHours();
  return h >= 5 && h < 12 ? "Good morning" : h >= 12 && h < 17 ? "Good afternoon" : "Good evening";
};

function findProducts(q: string) {
  const stop = new Set(["the", "how", "much", "what", "tell", "about", "price", "cost", "info", "and", "for", "you", "your", "does", "this", "that", "with"]);
  const words = q.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2 && !stop.has(w));
  if (!words.length) return [];
  return products
    .map((p) => {
      const hay = `${p.name} ${p.kind} ${p.category} ${p.movement} ${p.story}`.toLowerCase();
      const name = p.name.toLowerCase();
      const score = words.reduce((n, w) => n + (name.includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
}

function detectIntent(t: string): string | null {
  const s = t.toLowerCase();
  if (/(hour|timing|open|close|when are you)/.test(s)) return "timings";
  if (/(offer|sale|discount|drop|next movement|launch)/.test(s)) return "offers";
  if (/(ship|deliver|track|return|refund|order)/.test(s)) return "orders";
  if (/(contact|email|call|human|person|talk to)/.test(s)) return "contact";
  if (findProducts(s).length && /(price|cost|how much|tell me about|what is|info)/.test(s)) return "product";
  return null;
}

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ from: "bot", text: `${greeting()}. What can I help you find?` }]);
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, msgs.length]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const say = (...m: Msg[]) => setMsgs((prev) => [...prev, ...m]);

  const choose = (id: string, label?: string) => {
    if (label) say({ from: "you", text: label });
    switch (id) {
      case "wear":
        setMode("wear");
        say({ from: "bot", text: "Tell me a little about the moment you're dressing for. What's happening, or what's about to?" });
        break;
      case "product":
        setMode("product");
        say({ from: "bot", text: "Which piece are you curious about? A name or a single word is enough, like “gown” or “pearl”." });
        break;
      case "timings":
        setMode("menu");
        say({ from: "bot", text: "We're an online-only atelier, so the shop is always open. A person replies to messages 10am–8pm IST, every day." });
        break;
      case "offers":
        setMode("menu");
        say({
          from: "bot",
          text: `We don't run sales. Our next movement arrives with ${NEXT_EVENT.name}, on ${NEXT_EVENT.label}. The Movements page has the countdown, and you can leave your email there to hear the moment it opens.`,
          node: <Link href="/journal" className="link" onClick={() => setOpen(false)}>See the countdown</Link>,
        });
        break;
      case "orders":
        setMode("menu");
        say({
          from: "bot",
          text: "Of course. What would you like to know?",
          node: (
            <div className="flex flex-wrap gap-2">
              {ORDER_FAQ.map((f) => (
                <button key={f.id} type="button" className="chip" onClick={() => { say({ from: "you", text: f.label }, { from: "bot", text: f.text }); }}>
                  {f.label}
                </button>
              ))}
            </div>
          ),
        });
        break;
      case "contact":
        setMode("contact");
        setSent(false);
        say({ from: "bot", text: "You can write to hello@astrasinterlude.example, or leave a note here and a person will reply between 10am and 8pm IST." });
        break;
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    say({ from: "you", text });

    if (mode === "wear") {
      const r = stylist(text);
      say({ from: "bot", text: `${r.intro} Here are three pieces from ${movementName(r.movement)}.`, products: r.picks });
      setMode("menu");
      return;
    }
    if (mode === "product") {
      const found = findProducts(text);
      if (found.length) {
        say({ from: "bot", text: found.length === 1 ? "Here it is." : "These are the closest pieces.", products: found.map((p) => ({ product: p })) });
        setMode("menu");
      } else {
        say({ from: "bot", text: "I couldn't find that one. Try a word like “ring”, “scarf”, “coat” or a piece's name." });
      }
      return;
    }
    if (mode === "contact") {
      say({ from: "bot", text: "Thank you. Your note is with us, and a person will reply by email. (This is a prototype, so nothing is actually sent.)" });
      setMode("menu");
      return;
    }
    const intent = detectIntent(text);
    if (intent === "product") {
      say({ from: "bot", text: "Here's what I found.", products: findProducts(text).map((p) => ({ product: p })) });
      return;
    }
    if (intent) return choose(intent);
    const r = stylist(text);
    say({ from: "bot", text: `${r.intro} A few pieces from ${movementName(r.movement)}.`, products: r.picks });
  };

  const placeholder =
    mode === "wear" ? "A new job, a farewell, a wedding…" : mode === "product" ? "A piece or a word" : mode === "contact" ? "Your email and a short note" : "Type a message";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="concierge"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-full bg-ink text-bg pl-4 pr-5 py-3 shadow-lg shadow-black/10"
      >
        <BrandMark size={20} className="text-accent" />
        {open ? "Close" : "Concierge"}
      </button>

      {open && (
        <section
          id="concierge"
          role="dialog"
          aria-label="The Interlude Concierge"
          className="fixed z-50 bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[380px] max-h-[70vh] flex flex-col rounded-2xl border border-line bg-surface shadow-xl shadow-black/15"
        >
          <header className="px-5 pt-4 pb-3 border-b border-line">
            <h2 className="text-lg">The Interlude Concierge</h2>
          </header>
          <div ref={scroller} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-[0.95rem]" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "you" ? "flex justify-end" : ""}>
                <div className={m.from === "you" ? "max-w-[85%] rounded-2xl rounded-br-sm bg-ink text-bg px-3.5 py-2" : "max-w-[95%] space-y-2"}>
                  {m.text && <p>{m.text}</p>}
                  {m.products && (
                    <ul className="space-y-2">
                      {m.products.map(({ product, why }) => (
                        <li key={product.slug} className="border-l border-accent pl-3">
                          <Link href={`/product/${product.slug}`} className="link" onClick={() => setOpen(false)}>
                            {product.name}
                          </Link>
                          <span className="block text-muted text-sm">{why ?? product.hook}</span>
                          <span className="block text-sm">{priceRange(product)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {m.node}
                </div>
              </div>
            ))}
            {mode === "menu" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map((c) => (
                  <button key={c.id} type="button" className="chip" onClick={() => choose(c.id, c.label)}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            {mode !== "menu" && (
              <button type="button" className="text-sm text-muted underline underline-offset-4" onClick={() => { setMode("menu"); say({ from: "bot", text: "What else can I help with?" }); }}>
                Back to the options
              </button>
            )}
          </div>
          <form onSubmit={submit} className="border-t border-line p-3 flex gap-2">
            <label htmlFor="concierge-input" className="sr-only">Message</label>
            <input
              id="concierge-input"
              ref={inputRef}
              className="field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
            <button type="submit" className="btn !px-4" disabled={!input.trim() || sent}>
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
}
