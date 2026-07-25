import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { getProductById, products } from "@/app/lib/mock-data";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;
  const preselected = productId ? getProductById(productId) : undefined;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-zinc-900">ฟอร์มติดต่อ / จองสินค้า</h1>
            <p className="mt-1 text-sm text-zinc-500">
              กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <form className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            {preselected && (
              <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
                <span className="text-2xl">{preselected.image}</span>
                <div>
                  <p className="text-sm text-zinc-500">กำลังจองสินค้า</p>
                  <p className="font-semibold text-zinc-900">{preselected.name}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="ชื่อ-นามสกุล" placeholder="เช่น สมชาย ใจดี" />
              <Field label="เบอร์โทรศัพท์" placeholder="0812345678" type="tel" />
            </div>

            <Field label="LINE ID (ถ้ามี)" placeholder="@your_line_id" />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                สินค้าที่ต้องการเช่า
              </label>
              <select
                defaultValue={preselected?.id ?? ""}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="" disabled>
                  เลือกสินค้า
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="วันที่ต้องการรับสินค้า" type="date" />
              <Field label="วันที่คืนสินค้า" type="date" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                รายละเอียดเพิ่มเติม
              </label>
              <textarea
                rows={4}
                placeholder="ระบุความต้องการเพิ่มเติม เช่น สถานที่จัดส่ง อุปกรณ์เสริมที่ต้องการ"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              ส่งข้อมูลการจอง
            </button>
            <p className="text-center text-xs text-zinc-400">
              * นี่คือฟอร์มตัวอย่าง (mock) ยังไม่มีการส่งข้อมูลจริง
            </p>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
    </div>
  );
}
