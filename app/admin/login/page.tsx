import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/logo-plu.jpg" alt="Plu For Rent" className="h-12 w-12 rounded-2xl object-cover" />
          <h1 className="text-lg font-bold text-zinc-900">Plu For Rent Admin</h1>
          <p className="text-sm text-zinc-500">เข้าสู่ระบบเพื่อจัดการร้านค้า</p>
        </div>

        <form className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              ชื่อผู้ใช้ / อีเมล
            </label>
            <input
              type="text"
              defaultValue="admin@pluforrent.mock"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              รหัสผ่าน
            </label>
            <input
              type="password"
              defaultValue="password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" defaultChecked className="rounded border-zinc-300" />
              จดจำฉันไว้
            </label>
            <a href="#" className="font-medium text-sky-600 hover:underline">
              ลืมรหัสผ่าน?
            </a>
          </div>

          <Link
            href="/admin/dashboard"
            className="block w-full rounded-xl bg-sky-500 px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            เข้าสู่ระบบ
          </Link>
          <p className="text-center text-xs text-zinc-400">
            * หน้าตัวอย่าง (mock) — กดเข้าสู่ระบบเพื่อดู Dashboard ได้เลย
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-500 hover:text-sky-600">
            ← กลับสู่หน้าเว็บไซต์หลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
