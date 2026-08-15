export default function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="aspect-[4/5] bg-zinc-100" />
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <div className="h-2.5 w-16 rounded bg-zinc-100" />
        <div className="h-4 w-full rounded bg-zinc-100" />
        <div className="mt-1 h-5 w-20 rounded bg-zinc-100" />
      </div>
    </div>
  );
}
