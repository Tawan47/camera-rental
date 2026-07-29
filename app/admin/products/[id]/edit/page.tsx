import { notFound } from "next/navigation";
import AdminShell from "@/app/admin/components/admin-shell";
import ProductForm from "@/app/admin/products/product-form";
import { getProductById } from "@/app/lib/products";
import { getBrands } from "@/app/lib/brands";
import { getCategories } from "@/app/lib/categories";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, brands, categories] = await Promise.all([
    getProductById(id),
    getBrands(),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell active="/admin/products">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">แก้ไขสินค้า</h1>
        <p className="mt-1 text-sm text-zinc-500">{product.name}</p>
      </div>
      <div className="max-w-3xl">
        <ProductForm product={product} brands={brands} categories={categories} />
      </div>
    </AdminShell>
  );
}
