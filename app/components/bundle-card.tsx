import Link from "next/link";
import Image from "next/image";
import type { Bundle } from "@/app/lib/types";
import { isImagePath } from "@/app/lib/image";

export default function BundleCard({
  bundle,
  priority = false,
}: {
  bundle: Bundle;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${bundle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/60"
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white text-4xl sm:text-6xl">
        {isImagePath(bundle.image) ? (
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50">
            {bundle.image}
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-sky-500 px-2.5 py-1 text-[10px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
          SET
        </span>
        {!bundle.available && (
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/80 px-2.5 py-1 text-[10px] font-medium text-white sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
            ไม่ว่าง
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-4">
        <span className="text-[10px] font-medium uppercase tracking-wide text-sky-600 sm:text-xs">
          {bundle.brand ?? "เซ็ตครบชุด"}
        </span>
        <h3 className="text-sm font-semibold text-zinc-900 transition-colors duration-200 group-hover:text-sky-600 sm:text-base">
          {bundle.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-1 pt-1 sm:pt-2">
          <span className="text-base font-bold text-zinc-900 sm:text-lg">
            ฿{bundle.pricePerDay.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-500 sm:text-sm">/ วัน</span>
        </div>
      </div>
    </Link>
  );
}
