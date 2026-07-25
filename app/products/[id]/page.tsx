import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import ProductCard from "@/app/components/product-card";
import { getProductById, products } from "@/app/lib/mock-data";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/" className="hover:text-orange-600">หน้าแรก</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-orange-600">สินค้าทั้งหมด</Link>
            <span>/</span>
            <span className="text-zinc-700">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="flex aspect-square items-center justify-center rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-50 text-[10rem]">
              {product.image}
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium uppercase tracking-wide text-orange-600">
                {product.brand}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <span className="flex items-center gap-1 text-amber-500">
                  ★ <span className="text-zinc-700">{product.rating}</span>
                </span>
                <span className="text-zinc-300">·</span>
                <span>{product.reviewCount} รีวิว</span>
                <span className="text-zinc-300">·</span>
                <span className={product.available ? "text-green-600" : "text-red-500"}>
                  {product.available ? "พร้อมให้เช่า" : "ไม่ว่างในขณะนี้"}
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-zinc-600">{product.description}</p>

              <div className="mt-6 flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div>
                  <span className="text-3xl font-bold text-zinc-900">
                    ฿{product.pricePerDay.toLocaleString()}
                  </span>
                  <span className="ml-1 text-zinc-500">/ วัน</span>
                </div>
                <span className="ml-auto text-sm text-zinc-500">
                  มัดจำ ฿{product.deposit.toLocaleString()}
                </span>
              </div>

              {/* Booking CTA */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-zinc-700">กดปุ่ม “จอง” เพื่อติดต่อร้าน</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    aria-disabled={!product.available}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition ${
                      product.available
                        ? "bg-[#06C755] hover:brightness-95"
                        : "cursor-not-allowed bg-zinc-300"
                    }`}
                  >
                    จองผ่าน LINE OA
                  </a>
                  <Link
                    href={`/contact?product=${product.id}`}
                    aria-disabled={!product.available}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                      product.available
                        ? "border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                        : "pointer-events-none cursor-not-allowed border-zinc-200 text-zinc-300"
                    }`}
                  >
                    จองผ่านฟอร์มติดต่อ
                  </Link>
                </div>
              </div>

              {/* Specs */}
              <div className="mt-8">
                <h2 className="font-semibold text-zinc-900">สเปกสินค้า</h2>
                <dl className="mt-3 divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between px-4 py-2.5 text-sm">
                      <dt className="text-zinc-500">{spec.label}</dt>
                      <dd className="font-medium text-zinc-800">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Includes */}
              <div className="mt-6">
                <h2 className="font-semibold text-zinc-900">อุปกรณ์ที่ให้มาพร้อมกัน</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-zinc-900">สินค้าใกล้เคียง</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
