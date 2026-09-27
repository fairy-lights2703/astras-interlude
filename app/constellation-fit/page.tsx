import { Suspense } from "react";
import type { Metadata } from "next";
import { ConstellationFit } from "@/components/constellation-fit";

export const metadata: Metadata = { title: "Constellation Fit · Astra's Interlude" };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ConstellationFit />
    </Suspense>
  );
}
