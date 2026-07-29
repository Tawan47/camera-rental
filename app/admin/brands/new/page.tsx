import AdminShell from "@/app/admin/components/admin-shell";
import BrandForm from "@/app/admin/brands/brand-form";

export default function NewBrandPage() {
  return (
    <AdminShell active="/admin/brands">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">เพิ่มยี่ห้อใหม่</h1>
        <p className="mt-1 text-sm text-zinc-500">กรอกรายละเอียดยี่ห้อที่ต้องการเพิ่ม</p>
      </div>
      <div className="max-w-2xl">
        <BrandForm />
      </div>
    </AdminShell>
  );
}
