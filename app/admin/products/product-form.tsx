import Link from "next/link";
import { createProduct, updateProduct } from "@/app/admin/products/actions";
import type { Brand, Category, Product } from "@/app/lib/types";
import { isImagePath } from "@/app/lib/image";

export default function ProductForm({
  product,
  brands,
  categories,
}: {
  product?: Product;
  brands: Brand[];
  categories: Category[];
}) {
  const isEdit = Boolean(product);
  const action = isEdit ? updateProduct.bind(null, product!.id) : createProduct;

  return (
    <form action={action} className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลทั่วไป</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อสินค้า</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={product?.name}
              placeholder="เช่น Sony Alpha A7 IV"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ยี่ห้อ</label>
            <select
              name="brandId"
              required
              defaultValue={product?.brandId}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">หมวดหมู่</label>
            <select
              name="categoryId"
              required
              defaultValue={product?.category}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
              name="pricePerDay"
              required
              min={0}
              defaultValue={product?.pricePerDay}
              placeholder="890"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ค่ามัดจำ (บาท)</label>
            <input
              type="number"
              name="deposit"
              required
              min={0}
              defaultValue={product?.deposit}
              placeholder="5000"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">รายละเอียดสินค้า</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={product?.description}
              placeholder="อธิบายจุดเด่นของสินค้า..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">รูปภาพสินค้า</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-4xl transition duration-200 hover:border-sky-300">
            {product?.image ? (
              isImagePath(product.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                product.image
              )
            ) : (
              "🖼️"
            )}
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              รูป (emoji หรือ URL)
            </label>
            <input
              type="text"
              name="image"
              required
              defaultValue={product?.image}
              placeholder="🎞️"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">สถานะ</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="available"
              defaultChecked={product?.available ?? true}
              className="rounded border-zinc-300"
            />
            พร้อมให้เช่า
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={product?.published ?? true}
              className="rounded border-zinc-300"
            />
            แสดงผลบนหน้าเว็บไซต์
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/products"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-600 transition duration-200 hover:bg-zinc-50"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
        >
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </button>
      </div>
    </form>
  );
}
