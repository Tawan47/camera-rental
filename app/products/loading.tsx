import ProductCardSkeleton from "@/app/components/product-card-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-40 h-[57px] animate-pulse border-b border-zinc-200 bg-white/90" />
      <main className="flex-1">
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-zinc-900">รายการสินค้าทั้งหมด</h1>
            <p className="mt-1 text-sm text-zinc-500">ค้นหาหรือเลือกหมวดหมู่ที่ต้องการ</p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="hidden animate-pulse space-y-3 lg:block">
              <div className="h-9 w-full rounded-lg bg-zinc-100" />
              <div className="h-4 w-16 rounded bg-zinc-100" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-7 w-full rounded-lg bg-zinc-100" />
              ))}
            </aside>
            <div>
              <div className="mb-4 h-11 w-full animate-pulse rounded-xl bg-zinc-100" />
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
