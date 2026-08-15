import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import ContactForm from "@/app/contact/contact-form";
import { getProductById, getPublishedProducts } from "@/app/lib/products";
import { getBundleById, getPublishedBundles } from "@/app/lib/bundles";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;
  const [preselectedProduct, products, bundles] = await Promise.all([
    productId ? getProductById(productId) : Promise.resolve(null),
    getPublishedProducts(),
    getPublishedBundles(),
  ]);
  const preselectedBundle =
    !preselectedProduct && productId ? await getBundleById(productId) : null;
  const preselected = preselectedProduct ?? preselectedBundle;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-zinc-900">ฟอร์มติดต่อ / จองสินค้า</h1>
            <p className="mt-1 text-sm text-zinc-500">
              กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <ContactForm products={products} bundles={bundles} preselected={preselected} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
