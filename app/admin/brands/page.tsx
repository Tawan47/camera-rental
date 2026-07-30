import Link from "next/link";
import AdminShell from "@/app/admin/components/admin-shell";
import { getBrands } from "@/app/lib/brands";
import { deleteBrand } from "@/app/admin/brands/actions";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <AdminShell active="/admin/brands">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">จัดการยี่ห้อ</h1>
          <p className="mt-1 text-sm text-zinc-500">เพิ่มหรือแก้ไขยี่ห้อสินค้า</p>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
        >
          + เพิ่มยี่ห้อ
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-sm font-bold text-zinc-700">
              {brand.logo.slice(0, 2)}
            </span>
            <div className="flex-1">
              <p className="font-medium text-zinc-900">{brand.name}</p>
              <p className="text-xs text-zinc-400">{brand.productCount} รายการ</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href={`/admin/brands/${brand.id}/edit`}
                className="font-medium text-sky-600 transition duration-200 hover:underline"
              >
                แก้ไข
              </Link>
              <form action={deleteBrand.bind(null, brand.id)}>
                <button
                  type="submit"
                  className="font-medium text-red-500 transition duration-200 hover:underline"
                >
                  ลบ
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
