import Link from "next/link";
import { brands, categories, type Product } from "@/app/lib/mock-data";

export default function ProductForm({ product }: { product?: Product }) {
  const isEdit = Boolean(product);

  return (
    <form className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลทั่วไป</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อสินค้า</label>
            <input
              type="text"
              defaultValue={product?.name}
              placeholder="เช่น Sony Alpha A7 IV"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ยี่ห้อ</label>
            <select
              defaultValue={product?.brand}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">หมวดหมู่</label>
            <select
              defaultValue={product?.category}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ราคาเช่า/วัน (บาท)</label>
            <input
              type="number"
              defaultValue={product?.pricePerDay}
              placeholder="890"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ค่ามัดจำ (บาท)</label>
            <input
              type="number"
              defaultValue={product?.deposit}
              placeholder="5000"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">รายละเอียดสินค้า</label>
            <textarea
              rows={4}
              defaultValue={product?.description}
              placeholder="อธิบายจุดเด่นของสินค้า..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">รูปภาพสินค้า</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-4xl">
            {product?.image ?? "🖼️"}
          </div>
          <button
            type="button"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            อัปโหลดรูปภาพ
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">สถานะ</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" defaultChecked={product?.available ?? true} className="rounded border-zinc-300" />
            พร้อมให้เช่า
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" defaultChecked={product?.published ?? true} className="rounded border-zinc-300" />
            แสดงผลบนหน้าเว็บไซต์
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/products"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-50"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </button>
      </div>
      <p className="text-center text-xs text-zinc-400">
        * นี่คือฟอร์มตัวอย่าง (mock) ยังไม่มีการบันทึกข้อมูลจริง
      </p>
    </form>
  );
}
