"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api-client";

function revalidateBrandPaths() {
  revalidatePath("/admin/brands");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createBrand(formData: FormData) {
  const data = {
    id: formData.get("id"),
    name: formData.get("name"),
    logo: formData.get("logo"),
  };
  await apiFetch("/brands", { method: "POST", body: JSON.stringify(data) });
  revalidateBrandPaths();
  redirect("/admin/brands");
}

export async function updateBrand(id: string, formData: FormData) {
  const data = {
    name: formData.get("name"),
    logo: formData.get("logo"),
  };
  await apiFetch(`/brands/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  revalidateBrandPaths();
  redirect("/admin/brands");
}

export async function deleteBrand(id: string) {
  await apiFetch(`/brands/${id}`, { method: "DELETE" });
  revalidateBrandPaths();
}
