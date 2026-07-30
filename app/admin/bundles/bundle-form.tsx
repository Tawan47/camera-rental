"use client";

import { useState } from "react";
import Link from "next/link";
import { createBundle, updateBundle } from "@/app/admin/bundles/actions";
import type { Bundle, Brand, Category, Product } from "@/app/lib/types";
import { isImagePath } from "@/app/lib/image";

type ItemRow = { productId: string; quantity: number; note: string };

export default function BundleForm({
  bundle,
  brands,
  categories,
  products,
}: {
  bundle?: Bundle;
  brands: Brand[];
  categories: Category[];
  products: Product[];
}) {
  const isEdit = Boolean(bundle);
  const action = isEdit ? updateBundle.bind(null, bundle!.id) : createBundle;

  const [items, setItems] = useState<ItemRow[]>(
    bundle?.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      note: item.note ?? "",
    })) ?? [{ productId: products[0]?.id ?? "", quantity: 1, note: "" }],
  );

  function addRow() {
    setItems((prev) => [...prev, { productId: products[0]?.id ?? "", quantity: 1, note: "" }]);
  }

  function removeRow(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateRow(index: number, patch: Partial<ItemRow>) {
    setItems((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  return (
    <form action={action} className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลทั่วไป</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อเซ็ต</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={bundle?.name}
              placeholder="เช่น SET M CAMERA SONY FX30"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">ยี่ห้อหลัก</label>
            <select
              name="brandId"
              defaultValue={bundle?.brandId ?? ""}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">ไม่ระบุ</option>
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
              defaultValue={bundle?.categoryId ?? ""}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">ไม่ระบุ</option>
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
              defaultValue={bundle?.pricePerDay}
              placeholder="2200"
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
              defaultValue={bundle?.deposit ?? 0}
              placeholder="0"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">รายละเอียดเซ็ต</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={bundle?.description}
              placeholder="อธิบายจุดเด่นของเซ็ตนี้..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">รูปภาพเซ็ต</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-4xl transition duration-200 hover:border-sky-300">
            {bundle?.image ? (
              isImagePath(bundle.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bundle.image} alt={bundle.name} className="h-full w-full object-cover" />
              ) : (
                bundle.image
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
              defaultValue={bundle?.image}
              placeholder="🎬"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900">สินค้าในเซ็ต</h2>
          <button
            type="button"
            onClick={addRow}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-600 transition duration-200 hover:bg-zinc-50"
          >
            + เพิ่มสินค้า
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-200 p-3 transition duration-200 hover:border-sky-200 sm:grid-cols-[1fr_auto_1fr_auto]"
            >
              <select
                name="itemProductId"
                required
                value={item.productId}
                onChange={(e) => updateRow(index, { productId: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="itemQuantity"
                min={1}
                required
                value={item.quantity}
                onChange={(e) => updateRow(index, { quantity: Number(e.target.value) })}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:w-20"
                placeholder="จำนวน"
              />
              <input
                type="text"
                name="itemNote"
                value={item.note}
                onChange={(e) => updateRow(index, { note: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="หมายเหตุ เช่น เลือก 1 ชิ้น"
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                disabled={items.length === 1}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-red-500 transition duration-200 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">สถานะ</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="available"
              defaultChecked={bundle?.available ?? true}
              className="rounded border-zinc-300"
            />
            พร้อมให้เช่า
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={bundle?.published ?? true}
              className="rounded border-zinc-300"
            />
            แสดงผลบนหน้าเว็บไซต์
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/bundles"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-600 transition duration-200 hover:bg-zinc-50"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
        >
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มเซ็ต"}
        </button>
      </div>
    </form>
  );
}
