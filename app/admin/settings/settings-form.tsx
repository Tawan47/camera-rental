import { updateSettings } from "@/app/admin/settings/actions";
import type { SiteSettings } from "@/app/lib/types";
import SubmitButton from "@/app/admin/components/submit-button";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <form action={updateSettings} className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">ข้อมูลร้านค้า / ติดต่อ</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>ชื่อร้าน</label>
            <input type="text" name="shopName" required defaultValue={settings.shopName} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>รูปโลโก้ (path)</label>
            <input type="text" name="logoImage" required defaultValue={settings.logoImage} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Instagram (ไม่ต้องใส่ @)</label>
            <input
              type="text"
              name="instagramHandle"
              required
              defaultValue={settings.instagramHandle}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>เบอร์โทร</label>
            <input type="text" name="contactPhone" required defaultValue={settings.contactPhone} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ชื่อผู้ติดต่อ</label>
            <input
              type="text"
              name="contactPerson"
              required
              defaultValue={settings.contactPerson}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>คำอธิบายร้าน (footer)</label>
            <textarea
              name="footerTagline"
              required
              rows={2}
              defaultValue={settings.footerTagline}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>เวลาทำการ บรรทัด 1</label>
            <input
              type="text"
              name="businessHoursLine1"
              required
              defaultValue={settings.businessHoursLine1}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>เวลาทำการ บรรทัด 2</label>
            <input
              type="text"
              name="businessHoursLine2"
              required
              defaultValue={settings.businessHoursLine2}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>SEO: Meta Title</label>
            <input type="text" name="metaTitle" required defaultValue={settings.metaTitle} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO: Meta Description</label>
            <input
              type="text"
              name="metaDescription"
              required
              defaultValue={settings.metaDescription}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">หน้าแรก - Hero</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>ป้ายข้อความด้านบน (eyebrow)</label>
            <input type="text" name="heroEyebrow" required defaultValue={settings.heroEyebrow} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>หัวข้อหลัก บรรทัดที่ 1</label>
            <input
              type="text"
              name="heroTitleLine1"
              required
              defaultValue={settings.heroTitleLine1}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>หัวข้อหลัก บรรทัดที่ 2 (ถ้ามี)</label>
            <input type="text" name="heroTitleLine2" defaultValue={settings.heroTitleLine2} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>คำอธิบายใต้หัวข้อ</label>
            <textarea
              name="heroSubheading"
              required
              rows={2}
              defaultValue={settings.heroSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>ข้อความช่องค้นหา (placeholder)</label>
            <input
              type="text"
              name="heroSearchPlaceholder"
              required
              defaultValue={settings.heroSearchPlaceholder}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>ป้ายกำกับค้นหายอดนิยม</label>
            <input
              type="text"
              name="popularSearchLabel"
              required
              defaultValue={settings.popularSearchLabel}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>คำค้นหายอดนิยม (คั่นด้วยจุลภาค ,)</label>
            <input
              type="text"
              name="popularSearchTags"
              required
              defaultValue={settings.popularSearchTags.join(", ")}
              placeholder="Sony A7 IV, Canon R6, GoPro, DJI Air 3"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">หัวข้อหมวดหมู่ / ยี่ห้อ / สินค้าแนะนำ</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>หัวข้อ: หมวดหมู่</label>
            <input
              type="text"
              name="categoriesHeading"
              required
              defaultValue={settings.categoriesHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>คำอธิบาย: หมวดหมู่</label>
            <input
              type="text"
              name="categoriesSubheading"
              required
              defaultValue={settings.categoriesSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>หัวข้อ: ยี่ห้อ</label>
            <input type="text" name="brandsHeading" required defaultValue={settings.brandsHeading} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>คำอธิบาย: ยี่ห้อ</label>
            <input
              type="text"
              name="brandsSubheading"
              required
              defaultValue={settings.brandsSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>หัวข้อ: สินค้าแนะนำ</label>
            <input
              type="text"
              name="featuredHeading"
              required
              defaultValue={settings.featuredHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>คำอธิบาย: สินค้าแนะนำ</label>
            <input
              type="text"
              name="featuredSubheading"
              required
              defaultValue={settings.featuredSubheading}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton>บันทึกการตั้งค่า</SubmitButton>
      </div>
    </form>
  );
}
