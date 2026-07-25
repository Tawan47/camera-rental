import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-lg text-white">
            📷
          </span>
          <span className="text-lg tracking-tight">CamRent</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          <Link href="/products" className="transition hover:text-orange-600">
            สินค้าทั้งหมด
          </Link>
          <Link href="/#categories" className="transition hover:text-orange-600">
            หมวดหมู่
          </Link>
          <Link href="/#brands" className="transition hover:text-orange-600">
            ยี่ห้อ
          </Link>
          <Link href="/contact" className="transition hover:text-orange-600">
            ติดต่อเรา
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden items-center gap-1.5 rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 sm:flex"
          >
            LINE OA
          </a>
          <Link
            href="/admin/login"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
