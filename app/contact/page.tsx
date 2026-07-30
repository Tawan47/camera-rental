import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { getProductById, getPublishedProducts } from "@/app/lib/products";
import { getBundleById, getPublishedBundles } from "@/app/lib/bundles";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;
  const [preselectedProduct, products, bundles] = await Promise.all([
    productId ? getProductById(productId) : Promise.resolve(null),
    getPublishedProducts(),
    getPublishedBundles(),
  ]);
  const preselectedBundle =
    !preselectedProduct && productId ? await getBundleById(productId) : null;
  const preselected = preselectedProduct ?? preselectedBundle;

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
          <form className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
            {preselected && (
              <div className="flex animate-fade-in-up items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
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
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option value="" disabled>
                  เลือกสินค้า
                </option>
                <optgroup label="สินค้าเดี่ยว">
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="เซ็ตเช่า">
                  {bundles.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
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
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.01] hover:bg-sky-600 active:scale-[0.99]"
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
        className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      />
    </div>
  );
}
