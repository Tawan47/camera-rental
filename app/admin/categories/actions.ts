"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api-client";

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createCategory(formData: FormData) {
  const data = {
    id: formData.get("id"),
    name: formData.get("name"),
    icon: formData.get("icon"),
  };
  await apiFetch("/categories", { method: "POST", body: JSON.stringify(data), auth: true });
  revalidateCategoryPaths();
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const data = {
    name: formData.get("name"),
    icon: formData.get("icon"),
  };
  await apiFetch(`/categories/${id}`, { method: "PATCH", body: JSON.stringify(data), auth: true });
  revalidateCategoryPaths();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await apiFetch(`/categories/${id}`, { method: "DELETE", auth: true });
  revalidateCategoryPaths();
}
