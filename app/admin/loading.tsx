export default function Loading() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200 bg-white md:flex" />
      <div className="flex flex-1 flex-col">
        <header className="flex h-[57px] items-center border-b border-zinc-200 bg-white px-4 md:hidden" />
        <main className="flex-1 animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="space-y-2">
            <div className="h-6 w-32 rounded bg-zinc-100" />
            <div className="h-3 w-56 rounded bg-zinc-100" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl border border-zinc-200 bg-white" />
            ))}
          </div>
          <div className="h-64 rounded-2xl border border-zinc-200 bg-white" />
        </main>
      </div>
    </div>
  );
}
