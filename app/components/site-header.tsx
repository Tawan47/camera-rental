import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/app/lib/settings";

export default async function SiteHeader() {
  const settings = await getSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
          <Image
            src={settings.logoImage}
            alt={settings.shopName}
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl object-cover"
          />
          <span className="text-lg tracking-tight">{settings.shopName}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          <Link
            href="/products"
            className="relative py-1 transition duration-200 hover:text-sky-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            สินค้าทั้งหมด
          </Link>
          <Link
            href="/#categories"
            className="relative py-1 transition duration-200 hover:text-sky-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            หมวดหมู่
          </Link>
          <Link
            href="/#brands"
            className="relative py-1 transition duration-200 hover:text-sky-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            ยี่ห้อ
          </Link>
          <Link
            href="/contact"
            className="relative py-1 transition duration-200 hover:text-sky-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            ติดต่อเรา
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://instagram.com/${settings.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:brightness-95 sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {settings.instagramHandle}
          </a>
          <Link
            href="/admin/login"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition duration-200 hover:scale-[1.03] hover:border-zinc-400 hover:text-zinc-900"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
