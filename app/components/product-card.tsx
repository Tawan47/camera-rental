import Link from "next/link";
import type { Product } from "@/app/lib/mock-data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/60"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50 text-6xl">
        {product.image}
        {!product.available && (
          <span className="absolute right-3 top-3 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-white">
            ไม่ว่าง
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
          {product.brand}
        </span>
        <h3 className="font-semibold text-zinc-900 group-hover:text-orange-600">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span className="text-zinc-300">·</span>
          <span>{product.reviewCount} รีวิว</span>
        </div>
        <div className="mt-auto flex items-baseline gap-1 pt-2">
          <span className="text-lg font-bold text-zinc-900">
            ฿{product.pricePerDay.toLocaleString()}
          </span>
          <span className="text-sm text-zinc-500">/ วัน</span>
        </div>
      </div>
    </Link>
  );
}
