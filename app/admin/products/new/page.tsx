import AdminShell from "@/app/admin/components/admin-shell";
import ProductForm from "@/app/admin/products/product-form";
import { getBrands } from "@/app/lib/brands";
import { getCategories } from "@/app/lib/categories";

export default async function NewProductPage() {
  const [brands, categories] = await Promise.all([getBrands(), getCategories()]);

  return (
    <AdminShell active="/admin/products">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">เพิ่มสินค้าใหม่</h1>
        <p className="mt-1 text-sm text-zinc-500">กรอกรายละเอียดสินค้าที่ต้องการเพิ่ม</p>
      </div>
      <div className="max-w-3xl">
        <ProductForm brands={brands} categories={categories} />
      </div>
    </AdminShell>
  );
}
