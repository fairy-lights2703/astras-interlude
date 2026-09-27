import Link from "next/link";
import { Product, priceRange } from "@/lib/products";
import { ProductPlate } from "./product-plate";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <Link href={`/product/${product.slug}`} className={`group block ${className}`}>
      <div className="overflow-hidden rounded-sm">
        <ProductPlate product={product} className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <h3 className="mt-4 text-xl">{product.name}</h3>
      <p className="mt-1 text-muted text-[0.95rem] max-w-[36ch]">{product.hook}</p>
      <p className="mt-2 text-sm">{priceRange(product)}</p>
    </Link>
  );
}
