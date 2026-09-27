"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Movement } from "@/lib/products";
import type { SkyInput } from "@/lib/sky";

/* ---------- storage helpers ---------- */
function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/* ---------- theme ---------- */
type ThemeCtx = { theme: Movement; setTheme: (t: Movement) => void };
const ThemeContext = createContext<ThemeCtx>({ theme: "aubade", setTheme: () => {} });

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Movement>("aubade");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "aubade" || t === "nocturne") setThemeState(t);
  }, []);

  const setTheme = useCallback((t: Movement) => {
    document.documentElement.dataset.theme = t;
    write("ai-theme", t);
    setThemeState(t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/* ---------- cart ---------- */
export type Fit = "ready" | "measure";
export type CartItem = {
  key: string;
  slug: string;
  fit: Fit;
  price: number;
  qty: number;
  sky?: SkyInput;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "key" | "qty">) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};
const CartContext = createContext<CartCtx | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(read<CartItem[]>("ai-cart", []));
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) write("ai-cart", items);
  }, [items, loaded]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add: (item) => {
        const key = [item.slug, item.fit, item.sky ? JSON.stringify(item.sky) : ""].join("|");
        setItems((prev) => {
          const found = prev.find((p) => p.key === key);
          if (found) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + 1 } : p));
          return [...prev, { ...item, key, qty: 1 }];
        });
      },
      remove: (key) => setItems((prev) => prev.filter((p) => p.key !== key)),
      setQty: (key, qty) =>
        setItems((prev) => prev.map((p) => (p.key === key ? { ...p, qty: Math.max(1, Math.min(9, qty)) } : p))),
      clear: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

/* ---------- saved sky (Constellation Fit) ---------- */
type SkyCtx = { sky: SkyInput | null; setSky: (s: SkyInput | null) => void };
const SkyContext = createContext<SkyCtx>({ sky: null, setSky: () => {} });

function SkyProvider({ children }: { children: React.ReactNode }) {
  const [sky, setSkyState] = useState<SkyInput | null>(null);
  useEffect(() => setSkyState(read<SkyInput | null>("ai-sky", null)), []);
  const setSky = useCallback((s: SkyInput | null) => {
    write("ai-sky", s);
    setSkyState(s);
  }, []);
  return <SkyContext.Provider value={{ sky, setSky }}>{children}</SkyContext.Provider>;
}

export const useSky = () => useContext(SkyContext);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <SkyProvider>{children}</SkyProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
