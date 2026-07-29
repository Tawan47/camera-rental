import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import ProductCard from "@/app/components/product-card";
import { getProductById, getRelatedProducts } from "@/app/lib/products";
import { getBundleById } from "@/app/lib/bundles";
import { isImagePath } from "@/app/lib/image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  const bundle = product ? null : await getBundleById(id);

  if (!product && !bundle) {
    notFound();
  }

  const listing = product ?? bundle!;
  const isBundle = !product;
  const related = product ? await getRelatedProducts(product.category, product.id) : [];

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/" className="hover:text-sky-600">หน้าแรก</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-600">สินค้าทั้งหมด</Link>
            <span>/</span>
            <span className="text-zinc-700">{listing.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-white text-[10rem]">
              {isImagePath(listing.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={listing.image} alt={listing.name} className="h-full w-full object-contain p-4" />
              ) : (
                listing.image
              )}
              {isBundle && (
                <span className="absolute left-4 top-4 rounded-full bg-sky-500 px-3 py-1 text-sm font-semibold text-white">
                  SET
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium uppercase tracking-wide text-sky-600">
                {isBundle ? (bundle!.brand ?? "เซ็ตครบชุด") : product!.brand}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
                {listing.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <span className="flex items-center gap-1 text-amber-500">
                  ★ <span className="text-zinc-700">{listing.rating}</span>
                </span>
                <span className="text-zinc-300">·</span>
                <span>{listing.reviewCount} รีวิว</span>
                <span className="text-zinc-300">·</span>
                <span className={listing.available ? "text-green-600" : "text-red-500"}>
                  {listing.available ? "พร้อมให้เช่า" : "ไม่ว่างในขณะนี้"}
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-zinc-600">{listing.description}</p>

              <div className="mt-6 flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div>
                  <span className="text-3xl font-bold text-zinc-900">
                    ฿{listing.pricePerDay.toLocaleString()}
                  </span>
                  <span className="ml-1 text-zinc-500">/ วัน</span>
                </div>
                <span className="ml-auto text-sm text-zinc-500">
                  มัดจำ ฿{listing.deposit.toLocaleString()}
                </span>
              </div>

              {/* Booking CTA */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-zinc-700">กดปุ่ม “จอง” เพื่อติดต่อร้าน</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    aria-disabled={!listing.available}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition ${
                      listing.available
                        ? "bg-[#06C755] hover:brightness-95"
                        : "cursor-not-allowed bg-zinc-300"
                    }`}
                  >
                    จองผ่าน LINE OA
                  </a>
                  <Link
                    href={`/contact?product=${listing.id}`}
                    aria-disabled={!listing.available}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                      listing.available
                        ? "border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                        : "pointer-events-none cursor-not-allowed border-zinc-200 text-zinc-300"
                    }`}
                  >
                    จองผ่านฟอร์มติดต่อ
                  </Link>
                </div>
              </div>

              {isBundle ? (
                /* Bundle items */
                <div className="mt-8">
                  <h2 className="font-semibold text-zinc-900">รายการที่รวมอยู่ในเซ็ตนี้</h2>
                  <ul className="mt-3 divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                    {bundle!.items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                      >
                        <div>
                          <Link
                            href={`/products/${item.productId}`}
                            className="font-medium text-zinc-800 hover:text-sky-600"
                          >
                            {item.productName}
                          </Link>
                          {item.note && (
                            <span className="ml-2 text-xs text-zinc-400">({item.note})</span>
                          )}
                        </div>
                        {item.quantity > 1 && (
                          <span className="text-zinc-500">x{item.quantity}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  {/* Specs */}
                  <div className="mt-8">
                    <h2 className="font-semibold text-zinc-900">สเปกสินค้า</h2>
                    <dl className="mt-3 divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                      {product!.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between px-4 py-2.5 text-sm">
                          <dt className="text-zinc-500">{spec.label}</dt>
                          <dd className="font-medium text-zinc-800">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Includes */}
                  {product!.includes.length > 0 && (
                    <div className="mt-6">
                      <h2 className="font-semibold text-zinc-900">อุปกรณ์ที่ให้มาพร้อมกัน</h2>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {product!.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                            <span className="text-green-500">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Related products */}
          {!isBundle && related.length > 0 && (
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
