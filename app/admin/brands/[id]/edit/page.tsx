import { notFound } from "next/navigation";
import AdminShell from "@/app/admin/components/admin-shell";
import BrandForm from "@/app/admin/brands/brand-form";
import { getBrandById } from "@/app/lib/brands";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await getBrandById(id);

  if (!brand) {
    notFound();
  }

  return (
    <AdminShell active="/admin/brands">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">แก้ไขยี่ห้อ</h1>
        <p className="mt-1 text-sm text-zinc-500">{brand.name}</p>
      </div>
      <div className="max-w-2xl">
        <BrandForm brand={brand} />
      </div>
    </AdminShell>
  );
}
