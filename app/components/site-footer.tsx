import { getSettings } from "@/app/lib/settings";

export default async function SiteFooter() {
  const settings = await getSettings();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logoImage} alt={settings.shopName} className="h-8 w-8 rounded-lg object-cover" />
            <span className="tracking-tight">{settings.shopName}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{settings.footerTagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">เมนู</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>สินค้าทั้งหมด</li>
            <li>หมวดหมู่</li>
            <li>ยี่ห้อ</li>
            <li>ติดต่อเรา</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">ช่องทางติดต่อ</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>Instagram: @{settings.instagramHandle}</li>
            <li>
              โทร: {settings.contactPhone} ({settings.contactPerson})
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">เวลาทำการ</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>{settings.businessHoursLine1}</li>
            <li>{settings.businessHoursLine2}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
