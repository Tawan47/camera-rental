import Link from "next/link";
import LoginForm from "@/app/admin/login/login-form";

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

        <LoginForm />

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-500 transition duration-200 hover:text-sky-600">
            ← กลับสู่หน้าเว็บไซต์หลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
