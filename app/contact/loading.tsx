export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-40 h-[57px] animate-pulse border-b border-zinc-200 bg-white/90" />
      <main className="flex-1">
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-zinc-900">ฟอร์มติดต่อ / จองสินค้า</h1>
            <p className="mt-1 text-sm text-zinc-500">
              กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="animate-pulse space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="h-16 rounded-lg bg-zinc-100" />
              <div className="h-16 rounded-lg bg-zinc-100" />
            </div>
            <div className="h-16 rounded-lg bg-zinc-100" />
            <div className="h-16 rounded-lg bg-zinc-100" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="h-16 rounded-lg bg-zinc-100" />
              <div className="h-16 rounded-lg bg-zinc-100" />
            </div>
            <div className="h-28 rounded-lg bg-zinc-100" />
            <div className="h-12 rounded-xl bg-zinc-100" />
          </div>
        </div>
      </main>
    </div>
  );
}
