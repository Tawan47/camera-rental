import AdminShell from "@/app/admin/components/admin-shell";
import SettingsForm from "@/app/admin/settings/settings-form";
import { getSettings } from "@/app/lib/settings";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <AdminShell active="/admin/settings">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">ตั้งค่าเว็บไซต์</h1>
        <p className="mt-1 text-sm text-zinc-500">
          แก้ไขข้อมูลร้านค้า หน้าแรก และหัวข้อต่างๆ ที่แสดงบนหน้าเว็บไซต์
        </p>
      </div>
      <div className="max-w-3xl">
        <SettingsForm settings={settings} />
      </div>
    </AdminShell>
  );
}
