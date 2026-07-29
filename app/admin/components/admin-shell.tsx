import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/admin/products", label: "จัดการสินค้า", icon: "📷" },
  { href: "/admin/bundles", label: "เซ็ตเช่า", icon: "🎁" },
  { href: "/admin/categories", label: "หมวดหมู่", icon: "🗂️" },
  { href: "/admin/brands", label: "ยี่ห้อ", icon: "🏷️" },
  { href: "/admin/settings", label: "ตั้งค่าเว็บไซต์", icon: "⚙️" },
];

export default function AdminShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200 bg-white md:flex">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/logo-plu.jpg" alt="Plu For Rent" className="h-9 w-9 rounded-xl object-cover" />
          <span className="font-bold tracking-tight text-zinc-900">Plu For Rent Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-50 text-sky-700"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-200 p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <span>↩️</span> กลับสู่หน้าเว็บไซต์
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <span>🚪</span> ออกจากระบบ
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:hidden">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/products/logo-plu.jpg" alt="Plu For Rent" className="h-8 w-8 rounded-lg object-cover" />
            Plu For Rent Admin
          </div>
          <Link href="/" className="text-sm text-zinc-500">
            กลับหน้าเว็บไซต์
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
