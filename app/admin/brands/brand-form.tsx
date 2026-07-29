import Link from "next/link";
import { createBrand, updateBrand } from "@/app/admin/brands/actions";
import type { Brand } from "@/app/lib/types";

export default function BrandForm({ brand }: { brand?: Brand }) {
  const isEdit = Boolean(brand);
  const action = isEdit ? updateBrand.bind(null, brand!.id) : createBrand;

  return (
    <form action={action} className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลยี่ห้อ</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">รหัสยี่ห้อ (id)</label>
            <input
              type="text"
              name="id"
              required
              disabled={isEdit}
              defaultValue={brand?.id}
              placeholder="เช่น sony"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-zinc-100 disabled:text-zinc-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อยี่ห้อ</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={brand?.name}
              placeholder="เช่น Sony"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">โลโก้ (ข้อความ)</label>
            <input
              type="text"
              name="logo"
              required
              defaultValue={brand?.logo}
              placeholder="เช่น SONY"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/brands"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-50"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มยี่ห้อ"}
        </button>
      </div>
    </form>
  );
}
