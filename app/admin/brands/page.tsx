import AdminShell from "@/app/admin/components/admin-shell";
import { brands } from "@/app/lib/mock-data";

export default function AdminBrandsPage() {
  return (
    <AdminShell active="/admin/brands">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">จัดการยี่ห้อ</h1>
          <p className="mt-1 text-sm text-zinc-500">เพิ่มหรือแก้ไขยี่ห้อสินค้า</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          + เพิ่มยี่ห้อ
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-sm font-bold text-zinc-700">
              {brand.logo.slice(0, 2)}
            </span>
            <div className="flex-1">
              <p className="font-medium text-zinc-900">{brand.name}</p>
              <p className="text-xs text-zinc-400">{brand.productCount} รายการ</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <button type="button" className="font-medium text-orange-600 hover:underline">
                แก้ไข
              </button>
              <button type="button" className="font-medium text-red-500 hover:underline">
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
