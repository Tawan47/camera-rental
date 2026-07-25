import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import ProductBrowser from "@/app/products/product-browser";
import { products } from "@/app/lib/mock-data";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-zinc-900">รายการสินค้าทั้งหมด</h1>
            <p className="mt-1 text-sm text-zinc-500">ค้นหา เลือกหมวดหมู่ หรือเลือกยี่ห้อที่ต้องการ</p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <ProductBrowser
            products={products}
            initialCategory={params.category}
            initialBrand={params.brand}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
