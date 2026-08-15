import ProductCardSkeleton from "@/app/components/product-card-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-40 h-[57px] animate-pulse border-b border-zinc-200 bg-white/90" />
      <main className="flex-1">
        <section className="border-b border-zinc-200 bg-gradient-to-b from-sky-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-2xl animate-pulse space-y-4 text-center">
              <div className="mx-auto h-6 w-40 rounded-full bg-sky-100" />
              <div className="mx-auto h-10 w-3/4 rounded bg-zinc-100" />
              <div className="mx-auto h-4 w-2/3 rounded bg-zinc-100" />
              <div className="mx-auto mt-6 h-14 w-full max-w-xl rounded-2xl bg-white" />
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto mb-6 flex max-w-6xl animate-pulse items-end justify-between px-4 sm:px-6">
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-zinc-100" />
              <div className="h-3 w-48 rounded bg-zinc-100" />
            </div>
          </div>
          <div className="mx-auto flex max-w-6xl gap-4 overflow-hidden px-4 sm:px-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-72 shrink-0">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
