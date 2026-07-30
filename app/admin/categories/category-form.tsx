import Link from "next/link";
import { createCategory, updateCategory } from "@/app/admin/categories/actions";
import type { Category } from "@/app/lib/types";

export default function CategoryForm({ category }: { category?: Category }) {
  const isEdit = Boolean(category);
  const action = isEdit ? updateCategory.bind(null, category!.id) : createCategory;

  return (
    <form action={action} className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลหมวดหมู่</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">รหัสหมวดหมู่ (id)</label>
            <input
              type="text"
              name="id"
              required
              disabled={isEdit}
              defaultValue={category?.id}
              placeholder="เช่น mirrorless"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-zinc-100 disabled:text-zinc-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ไอคอน (emoji)</label>
            <input
              type="text"
              name="icon"
              required
              defaultValue={category?.icon}
              placeholder="📷"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อหมวดหมู่</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={category?.name}
              placeholder="เช่น กล้อง Mirrorless"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/categories"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-600 transition duration-200 hover:bg-zinc-50"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
        >
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่"}
        </button>
      </div>
    </form>
  );
}
