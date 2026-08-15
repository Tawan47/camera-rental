export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-40 h-[57px] animate-pulse border-b border-zinc-200 bg-white/90" />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6 h-4 w-48 animate-pulse rounded bg-zinc-100" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-3xl border border-zinc-200 bg-zinc-100" />

            <div className="animate-pulse space-y-4">
              <div className="h-3 w-24 rounded bg-zinc-100" />
              <div className="h-8 w-3/4 rounded bg-zinc-100" />
              <div className="h-4 w-40 rounded bg-zinc-100" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-zinc-100" />
                <div className="h-3 w-5/6 rounded bg-zinc-100" />
              </div>
              <div className="h-20 w-full rounded-2xl bg-zinc-100" />
              <div className="h-12 w-full rounded-xl bg-zinc-100" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
