"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/app/components/product-card";
import { brands, categories, type Product } from "@/app/lib/mock-data";

export default function ProductBrowser({
  products,
  initialCategory,
  initialBrand,
}: {
  products: Product[];
  initialCategory?: string;
  initialBrand?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [brand, setBrand] = useState(initialBrand ?? "all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.published);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (brand !== "all") {
      result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, query, category, brand, sort]);

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
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-zinc-700">หมวดหมู่</span>
          <div className="space-y-1">
            <FilterOption
              label="ทั้งหมด"
              active={category === "all"}
              onClick={() => setCategory("all")}
            />
            {categories.map((c) => (
              <FilterOption
                key={c.id}
                label={`${c.icon} ${c.name}`}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-zinc-700">ยี่ห้อ</span>
          <div className="space-y-1">
            <FilterOption
              label="ทั้งหมด"
              active={brand === "all"}
              onClick={() => setBrand("all")}
            />
            {brands.map((b) => (
              <FilterOption
                key={b.id}
                label={b.name}
                active={brand === b.id}
                onClick={() => setBrand(b.id)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            พบ <span className="font-semibold text-zinc-900">{filtered.length}</span> รายการ
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="popular">เรียงตาม: ยอดนิยม</option>
            <option value="price-asc">ราคา: ต่ำ - สูง</option>
            <option value="price-desc">ราคา: สูง - ต่ำ</option>
            <option value="rating">คะแนนรีวิว</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center text-zinc-400">
            ไม่พบสินค้าที่ตรงกับเงื่อนไข ลองปรับตัวกรองใหม่
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${
        active
          ? "bg-orange-50 font-medium text-orange-700"
          : "text-zinc-600 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );
}
