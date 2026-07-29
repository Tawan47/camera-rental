import { notFound } from "next/navigation";
import AdminShell from "@/app/admin/components/admin-shell";
import BundleForm from "@/app/admin/bundles/bundle-form";
import { getBundleById } from "@/app/lib/bundles";
import { getBrands } from "@/app/lib/brands";
import { getCategories } from "@/app/lib/categories";
import { getProducts } from "@/app/lib/products";

export default async function EditBundlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [bundle, brands, categories, products] = await Promise.all([
    getBundleById(id),
    getBrands(),
    getCategories(),
    getProducts(),
  ]);

  if (!bundle) {
    notFound();
  }

  return (
    <AdminShell active="/admin/bundles">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">แก้ไขเซ็ต</h1>
        <p className="mt-1 text-sm text-zinc-500">{bundle.name}</p>
      </div>
      <div className="max-w-3xl">
        <BundleForm bundle={bundle} brands={brands} categories={categories} products={products} />
      </div>
    </AdminShell>
  );
}
