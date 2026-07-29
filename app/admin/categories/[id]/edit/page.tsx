import { notFound } from "next/navigation";
import AdminShell from "@/app/admin/components/admin-shell";
import CategoryForm from "@/app/admin/categories/category-form";
import { getCategoryById } from "@/app/lib/categories";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <AdminShell active="/admin/categories">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">แก้ไขหมวดหมู่</h1>
        <p className="mt-1 text-sm text-zinc-500">{category.name}</p>
      </div>
      <div className="max-w-2xl">
        <CategoryForm category={category} />
      </div>
    </AdminShell>
  );
}
