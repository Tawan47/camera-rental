import AdminShell from "@/app/admin/components/admin-shell";
import { recentBookings, stats } from "@/app/lib/mock-data";

const statCards = [
  { label: "สินค้าทั้งหมด", value: stats.totalProducts, icon: "📷", color: "bg-orange-50 text-orange-600" },
  { label: "หมวดหมู่", value: stats.totalCategories, icon: "🗂️", color: "bg-blue-50 text-blue-600" },
  { label: "ยี่ห้อ", value: stats.totalBrands, icon: "🏷️", color: "bg-purple-50 text-purple-600" },
  { label: "การจองเดือนนี้", value: stats.monthlyBookings, icon: "📅", color: "bg-green-50 text-green-600" },
];

const statusStyles: Record<string, string> = {
  รอยืนยัน: "bg-amber-50 text-amber-700",
  ยืนยันแล้ว: "bg-blue-50 text-blue-700",
  เสร็จสิ้น: "bg-green-50 text-green-700",
  ยกเลิก: "bg-red-50 text-red-700",
};

export default function AdminDashboardPage() {
  return (
    <AdminShell active="/admin/dashboard">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">ภาพรวมร้านเช่ากล้องของคุณ</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">{card.label}</span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${card.color}`}>
                {card.icon}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="font-semibold text-zinc-900">การจองล่าสุด</h2>
          <span className="text-xs text-zinc-400">แสดง {recentBookings.length} รายการล่าสุด</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-400">
                <th className="px-5 py-3 font-medium">รหัส</th>
                <th className="px-5 py-3 font-medium">ลูกค้า</th>
                <th className="px-5 py-3 font-medium">สินค้า</th>
                <th className="px-5 py-3 font-medium">ช่องทาง</th>
                <th className="px-5 py-3 font-medium">วันที่</th>
                <th className="px-5 py-3 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-zinc-50 last:border-0">
                  <td className="px-5 py-3 font-medium text-zinc-800">{booking.id}</td>
                  <td className="px-5 py-3 text-zinc-600">{booking.customer}</td>
                  <td className="px-5 py-3 text-zinc-600">{booking.product}</td>
                  <td className="px-5 py-3 text-zinc-600">{booking.channel}</td>
                  <td className="px-5 py-3 text-zinc-600">{booking.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
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
