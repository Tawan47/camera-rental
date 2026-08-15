import AdminShell from "@/app/admin/components/admin-shell";
import { StaggerGrid, StaggerItem } from "@/app/components/motion/stagger-grid";
import { getProducts } from "@/app/lib/products";
import { getCategories } from "@/app/lib/categories";
import { getBrands } from "@/app/lib/brands";
import { getInquiryStats, getRecentInquiries } from "@/app/lib/inquiries";

export default async function AdminDashboardPage() {
  const [products, categories, brands, stats, recentInquiries] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getInquiryStats(),
    getRecentInquiries(5),
  ]);

  const statCards = [
    { label: "สินค้าทั้งหมด", value: products.length, icon: "📷", color: "bg-sky-50 text-sky-600" },
    { label: "หมวดหมู่", value: categories.length, icon: "🗂️", color: "bg-blue-50 text-blue-600" },
    { label: "ยี่ห้อ", value: brands.length, icon: "🏷️", color: "bg-purple-50 text-purple-600" },
    { label: "คำขอติดต่อ 7 วันล่าสุด", value: stats.last7Days, icon: "📩", color: "bg-green-50 text-green-600" },
  ];

  return (
    <AdminShell active="/admin/dashboard">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">ภาพรวมร้านเช่ากล้องของคุณ</p>
      </div>

      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StaggerItem
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">{card.label}</span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${card.color}`}>
                {card.icon}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-900">{card.value}</p>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {stats.topProducts.length > 0 && (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900">สินค้าที่ถูกสอบถามมากที่สุด</h2>
          <ul className="mt-3 divide-y divide-zinc-100">
            {stats.topProducts.map((p) => (
              <li key={p.productId} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-zinc-700">{p.name}</span>
                <span className="font-medium text-zinc-900">{p.count} ครั้ง</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="font-semibold text-zinc-900">คำขอติดต่อล่าสุด</h2>
          <span className="text-xs text-zinc-400">แสดง {recentInquiries.length} รายการล่าสุด</span>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-zinc-400">ยังไม่มีคำขอติดต่อเข้ามา</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-400">
                  <th className="px-5 py-3 font-medium">ลูกค้า</th>
                  <th className="px-5 py-3 font-medium">เบอร์โทร</th>
                  <th className="px-5 py-3 font-medium">สินค้า/เซ็ต</th>
                  <th className="px-5 py-3 font-medium">วันที่ต้องการเช่า</th>
                  <th className="px-5 py-3 font-medium">ส่งเมื่อ</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-zinc-50 transition duration-200 last:border-0 hover:bg-zinc-50"
                  >
                    <td className="px-5 py-3 font-medium text-zinc-800">{inquiry.name}</td>
                    <td className="px-5 py-3 text-zinc-600">{inquiry.phone}</td>
                    <td className="px-5 py-3 text-zinc-600">
                      {inquiry.product?.name ?? inquiry.bundle?.name ?? "-"}
                    </td>
                    <td className="px-5 py-3 text-zinc-600">
                      {new Date(inquiry.pickupDate).toLocaleDateString("th-TH")} –{" "}
                      {new Date(inquiry.returnDate).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-5 py-3 text-zinc-600">
                      {new Date(inquiry.createdAt).toLocaleDateString("th-TH")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
