"use client";

import Link from "next/link";
import { useTheme } from "./providers";
import type { Movement } from "@/lib/products";

// Entry cards on Home always render in their own movement's colours, and entering one sets the site theme.
export function EntryLink({ movement, className, children }: { movement: Movement; className?: string; children: React.ReactNode }) {
  const { setTheme } = useTheme();
  return (
    <Link href={`/collections?movement=${movement}`} data-theme={movement} className={className} onClick={() => setTheme(movement)}>
      {children}
    </Link>
  );
}
