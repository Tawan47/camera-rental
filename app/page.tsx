import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import ProductCard from "@/app/components/product-card";
import { getBrands } from "@/app/lib/brands";
import { getCategories } from "@/app/lib/categories";
import { getPublishedProducts } from "@/app/lib/products";
import { getSettings } from "@/app/lib/settings";

export default async function Home() {
  const [brands, categories, products, settings] = await Promise.all([
    getBrands(),
    getCategories(),
    getPublishedProducts(),
    getSettings(),
  ]);
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-zinc-200 bg-gradient-to-b from-sky-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                {settings.heroEyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                {settings.heroTitleLine1}
                {settings.heroTitleLine2 && (
                  <>
                    <br className="hidden sm:block" /> {settings.heroTitleLine2}
                  </>
                )}
              </h1>
              <p className="mt-4 text-base text-zinc-600 sm:text-lg">{settings.heroSubheading}</p>
            </div>

            {/* Search bar */}
            <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row">
              <div className="flex flex-1 items-center gap-2 px-2">
                <span className="text-zinc-400">🔍</span>
                <input
                  type="text"
                  placeholder={settings.heroSearchPlaceholder}
                  className="w-full border-none py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
              <Link
                href="/products"
                className="flex items-center justify-center rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                ค้นหา
              </Link>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500">
              <span>{settings.popularSearchLabel}</span>
              {settings.popularSearchTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{settings.categoriesHeading}</h2>
              <p className="mt-1 text-sm text-zinc-500">{settings.categoriesSubheading}</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-sky-600 hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-5 text-center transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium text-zinc-800">{cat.name}</span>
                <span className="text-xs text-zinc-400">{cat.productCount} รายการ</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="border-y border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{settings.brandsHeading}</h2>
              <p className="mt-1 text-sm text-zinc-500">{settings.brandsSubheading}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/products?brand=${brand.id}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-zinc-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <span className="text-base font-bold tracking-tight text-zinc-800">
                    {brand.logo}
                  </span>
                  <span className="text-xs text-zinc-400">{brand.productCount} รายการ</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{settings.featuredHeading}</h2>
              <p className="mt-1 text-sm text-zinc-500">{settings.featuredSubheading}</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-sky-600 hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
              ขั้นตอนการเช่า
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { step: "1", title: "เลือกสินค้า", desc: "ค้นหาหรือเลือกดูตามหมวดหมู่ / ยี่ห้อ" },
                { step: "2", title: "กดปุ่ม “จอง”", desc: "ติดต่อผ่าน LINE OA หรือกรอกฟอร์ม" },
                { step: "3", title: "รับสินค้า", desc: "ทีมงานติดต่อกลับเพื่อยืนยันและจัดส่ง" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
