import AdminShell from "@/app/admin/components/admin-shell";
import BundleForm from "@/app/admin/bundles/bundle-form";
import { getBrands } from "@/app/lib/brands";
import { getCategories } from "@/app/lib/categories";
import { getProducts } from "@/app/lib/products";

export default async function NewBundlePage() {
  const [brands, categories, products] = await Promise.all([
    getBrands(),
    getCategories(),
    getProducts(),
  ]);

  return (
    <AdminShell active="/admin/bundles">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">เพิ่มเซ็ตใหม่</h1>
        <p className="mt-1 text-sm text-zinc-500">กรอกรายละเอียดเซ็ตเช่าที่ต้องการเพิ่ม</p>
      </div>
      <div className="max-w-3xl">
        <BundleForm brands={brands} categories={categories} products={products} />
      </div>
    </AdminShell>
  );
}
