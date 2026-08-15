import Link from "next/link";
import AdminShell from "@/app/admin/components/admin-shell";
import DeleteButton from "@/app/admin/components/delete-button";
import ToggleSwitch from "@/app/admin/components/toggle-switch";
import { getBundles } from "@/app/lib/bundles";
import { deleteBundle, toggleBundlePublished } from "@/app/admin/bundles/actions";
import { isImagePath } from "@/app/lib/image";

export default async function AdminBundlesPage() {
  const bundles = await getBundles();

  return (
    <AdminShell active="/admin/bundles">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">จัดการเซ็ตเช่า</h1>
          <p className="mt-1 text-sm text-zinc-500">เพิ่ม แก้ไข ลบ หรือเปิด/ปิดการแสดงผลเซ็ตเช่า</p>
        </div>
        <Link
          href="/admin/bundles/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
        >
          + เพิ่มเซ็ตใหม่
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-400">
                <th className="px-5 py-3 font-medium">เซ็ต</th>
                <th className="px-5 py-3 font-medium">จำนวนสินค้า</th>
                <th className="px-5 py-3 font-medium">ราคา/วัน</th>
                <th className="px-5 py-3 font-medium">สถานะสต็อก</th>
                <th className="px-5 py-3 font-medium">แสดงผล</th>
                <th className="px-5 py-3 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {bundles.map((bundle) => (
                <tr
                  key={bundle.id}
                  className="border-b border-zinc-50 transition duration-200 last:border-0 hover:bg-zinc-50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 text-lg">
                        {isImagePath(bundle.image) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={bundle.image} alt={bundle.name} className="h-full w-full object-cover" />
                        ) : (
                          bundle.image
                        )}
                      </span>
                      <div>
                        <p className="font-medium text-zinc-800">{bundle.name}</p>
                        <p className="text-xs text-zinc-400">{bundle.brand ?? "ไม่ระบุยี่ห้อ"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">{bundle.items.length} รายการ</td>
                  <td className="px-5 py-3 font-medium text-zinc-800">
                    ฿{bundle.pricePerDay.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        bundle.available
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {bundle.available ? "พร้อมเช่า" : "ไม่ว่าง"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <form action={toggleBundlePublished.bind(null, bundle.id, bundle.published)}>
                      <ToggleSwitch checked={bundle.published} />
                    </form>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3 text-sm">
                      <Link
                        href={`/admin/bundles/${bundle.id}/edit`}
                        className="font-medium text-sky-600 transition duration-200 hover:underline"
                      >
                        แก้ไข
                      </Link>
                      <form action={deleteBundle.bind(null, bundle.id)}>
                        <DeleteButton confirmMessage={`ต้องการลบ "${bundle.name}" ใช่หรือไม่?`} />
                      </form>
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
