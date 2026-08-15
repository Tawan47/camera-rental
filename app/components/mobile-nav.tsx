"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuLinks = [
  { href: "/products", label: "สินค้าทั้งหมด" },
  { href: "/#categories", label: "หมวดหมู่" },
  { href: "/#brands", label: "ยี่ห้อ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function MobileNav({ instagramHandle }: { instagramHandle: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-y-auto border-t border-zinc-200 bg-white">
            <nav className="flex flex-col divide-y divide-zinc-100 px-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-4 text-base font-medium text-zinc-700 transition duration-200 active:text-sky-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="py-4 text-base font-medium text-zinc-500 transition duration-200 active:text-sky-600"
              >
                เข้าสู่ระบบแอดมิน
              </Link>
            </nav>
            <div className="border-t border-zinc-100 px-4 py-4">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {instagramHandle}
              </a>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
