import Link from "next/link";
import type { Bundle } from "@/app/lib/types";
import { isImagePath } from "@/app/lib/image";

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link
      href={`/products/${bundle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/60"
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white text-6xl">
        {isImagePath(bundle.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bundle.image}
            alt={bundle.name}
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50">
            {bundle.image}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
          SET
        </span>
        {!bundle.available && (
          <span className="absolute right-3 top-3 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-white">
            ไม่ว่าง
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-sky-600">
          {bundle.brand ?? "เซ็ตครบชุด"}
        </span>
        <h3 className="font-semibold text-zinc-900 transition-colors duration-200 group-hover:text-sky-600">
          {bundle.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <span className="text-amber-500">★</span>
          <span>{bundle.rating}</span>
          <span className="text-zinc-300">·</span>
          <span>{bundle.reviewCount} รีวิว</span>
        </div>
        <div className="mt-auto flex items-baseline gap-1 pt-2">
          <span className="text-lg font-bold text-zinc-900">
            ฿{bundle.pricePerDay.toLocaleString()}
          </span>
          <span className="text-sm text-zinc-500">/ วัน</span>
        </div>
      </div>
    </Link>
  );
}
