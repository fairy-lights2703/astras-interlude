import Image from "next/image";
import type { Product } from "@/lib/products";

// Product thumbnail from /public/products/<slug>.jpg, cropped to a consistent 5:7 frame.
export function ProductPlate({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div className={`relative aspect-[5/7] overflow-hidden bg-surface ${className}`}>
      <Image
        src={`/products/${product.slug}.jpg`}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
