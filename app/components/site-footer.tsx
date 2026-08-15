import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/app/lib/settings";

const menuLinks = [
  { href: "/products", label: "สินค้าทั้งหมด" },
  { href: "/#categories", label: "หมวดหมู่" },
  { href: "/#brands", label: "ยี่ห้อ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default async function SiteFooter() {
  const settings = await getSettings();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 md:gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <Image
              src={settings.logoImage}
              alt={settings.shopName}
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="tracking-tight">{settings.shopName}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{settings.footerTagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">เมนู</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition duration-200 hover:text-sky-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">ช่องทางติดต่อ</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
            <li>
              <a
                href={`https://instagram.com/${settings.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-200 hover:text-sky-600"
              >
                Instagram: {settings.instagramHandle}
              </a>
            </li>
            <li>
              <a href={`tel:${settings.contactPhone}`} className="transition duration-200 hover:text-sky-600">
                โทร: {settings.contactPhone}
              </a>{" "}
              ({settings.contactPerson})
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
