import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionsView } from "@/components/collections-view";

export const metadata: Metadata = { title: "Collections · Astra's Interlude" };

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CollectionsView />
    </Suspense>
  );
}
