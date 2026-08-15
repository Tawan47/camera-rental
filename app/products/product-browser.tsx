"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/app/components/product-card";
import BundleCard from "@/app/components/bundle-card";
import type { Bundle, Category, Product } from "@/app/lib/types";

export default function ProductBrowser({
  products,
  bundles,
  categories,
  initialCategory,
  initialQuery,
}: {
  products: Product[];
  bundles: Bundle[];
  categories: Category[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [mode, setMode] = useState<"products" | "bundles">("products");
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let result = products;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, query, category, sort]);

  const filteredBundles = useMemo(() => {
    let result = bundles;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (b) => b.name.toLowerCase().includes(q) || (b.brand ?? "").toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [bundles, query, sort]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      {/* Filters sidebar */}
      <aside className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">ค้นหา</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ชื่อสินค้า, ยี่ห้อ..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {mode === "products" && (
          <>
            <div>
              <span className="mb-2 block text-sm font-medium text-zinc-700">หมวดหมู่</span>
              <div className="space-y-1">
                <FilterOption
                  label="ทั้งหมด"
                  active={category === "all"}
                  onClick={() => setCategory("all")}
                />
                {categories
                  .filter((c) => c.id !== "bundle-set")
                  .map((c) => (
                    <FilterOption
                      key={c.id}
                      label={c.name}
                      active={category === c.id}
                      onClick={() => setCategory(c.id)}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Results */}
      <div>
        <div className="mb-4 flex rounded-xl border border-zinc-200 bg-zinc-50 p-1">
          <button
            type="button"
            onClick={() => setMode("products")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
              mode === "products" ? "bg-white text-sky-700 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            สินค้าเดี่ยว
          </button>
          <button
            type="button"
            onClick={() => setMode("bundles")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
              mode === "bundles" ? "bg-white text-sky-700 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            เซ็ตเช่า
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            พบ{" "}
            <span className="font-semibold text-zinc-900">
              {mode === "products" ? filtered.length : filteredBundles.length}
            </span>{" "}
            รายการ
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            <option value="popular">เรียงตาม: ยอดนิยม</option>
            <option value="price-asc">ราคา: ต่ำ - สูง</option>
            <option value="price-desc">ราคา: สูง - ต่ำ</option>
            <option value="rating">คะแนนรีวิว</option>
          </select>
        </div>

        {mode === "products" ? (
          filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center text-zinc-400">
              ไม่พบสินค้าที่ตรงกับเงื่อนไข ลองปรับตัวกรองใหม่
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )
        ) : filteredBundles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center text-zinc-400">
            ไม่พบเซ็ตเช่าที่ตรงกับเงื่อนไข ลองปรับการค้นหาใหม่
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredBundles.map((bundle) => (
                <motion.div
                  key={bundle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <BundleCard bundle={bundle} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition duration-200 ${
        active
          ? "bg-sky-50 font-medium text-sky-700"
          : "text-zinc-600 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );
}
