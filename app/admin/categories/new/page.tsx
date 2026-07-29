import AdminShell from "@/app/admin/components/admin-shell";
import CategoryForm from "@/app/admin/categories/category-form";

export default function NewCategoryPage() {
  return (
    <AdminShell active="/admin/categories">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">เพิ่มหมวดหมู่ใหม่</h1>
        <p className="mt-1 text-sm text-zinc-500">กรอกรายละเอียดหมวดหมู่ที่ต้องการเพิ่ม</p>
      </div>
      <div className="max-w-2xl">
        <CategoryForm />
      </div>
    </AdminShell>
  );
}
