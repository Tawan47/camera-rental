"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { logout } from "@/app/admin/logout-action";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/admin/products", label: "จัดการสินค้า", icon: "📷" },
  { href: "/admin/bundles", label: "เซ็ตเช่า", icon: "🎁" },
  { href: "/admin/categories", label: "หมวดหมู่", icon: "🗂️" },
  { href: "/admin/brands", label: "ยี่ห้อ", icon: "🏷️" },
  { href: "/admin/settings", label: "ตั้งค่าเว็บไซต์", icon: "⚙️" },
];

const subscribeNoop = () => () => {};

export default function AdminMobileNav({ active }: { active: string }) {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition duration-200 hover:bg-zinc-100"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col overflow-y-auto border-t border-zinc-200 bg-white">
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium transition duration-200 ${
                      isActive ? "bg-sky-50 text-sky-700" : "text-zinc-600 active:bg-zinc-50"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-zinc-200 p-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium text-zinc-500 transition duration-200 active:bg-zinc-50"
              >
                <span>↩️</span> กลับสู่หน้าเว็บไซต์
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-3 text-left text-base font-medium text-zinc-500 transition duration-200 active:bg-zinc-50"
                >
                  <span>🚪</span> ออกจากระบบ
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
