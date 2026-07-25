import Link from "next/link";
import AdminShell from "@/app/admin/components/admin-shell";
import { products } from "@/app/lib/mock-data";

export default function AdminProductsPage() {
  return (
    <AdminShell active="/admin/products">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">จัดการสินค้า</h1>
          <p className="mt-1 text-sm text-zinc-500">เพิ่ม แก้ไข ลบ หรือเปิด/ปิดการแสดงผลสินค้า</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          + เพิ่มสินค้าใหม่
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-400">
                <th className="px-5 py-3 font-medium">สินค้า</th>
                <th className="px-5 py-3 font-medium">หมวดหมู่</th>
                <th className="px-5 py-3 font-medium">ราคา/วัน</th>
                <th className="px-5 py-3 font-medium">สถานะสต็อก</th>
                <th className="px-5 py-3 font-medium">แสดงผล</th>
                <th className="px-5 py-3 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-50 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-lg">
                        {product.image}
                      </span>
                      <div>
                        <p className="font-medium text-zinc-800">{product.name}</p>
                        <p className="text-xs text-zinc-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-600 capitalize">{product.category}</td>
                  <td className="px-5 py-3 font-medium text-zinc-800">
                    ฿{product.pricePerDay.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.available
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.available ? "พร้อมเช่า" : "ไม่ว่าง"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <ToggleSwitch checked={product.published} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3 text-sm">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="font-medium text-orange-600 hover:underline"
                      >
                        แก้ไข
                      </Link>
                      <button type="button" className="font-medium text-red-500 hover:underline">
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition ${
        checked ? "bg-orange-500" : "bg-zinc-200"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </span>
  );
}
