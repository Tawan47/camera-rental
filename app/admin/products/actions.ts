"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api-client";

function productFormToJson(formData: FormData) {
  return {
    name: formData.get("name"),
    brandId: formData.get("brandId"),
    categoryId: formData.get("categoryId"),
    pricePerDay: formData.get("pricePerDay"),
    deposit: formData.get("deposit"),
    image: formData.get("image"),
    description: formData.get("description"),
    available: formData.get("available") === "on",
    published: formData.get("published") === "on",
  };
}

function revalidateProductPaths(id?: string) {
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  if (id) revalidatePath(`/products/${id}`);
}

export async function createProduct(formData: FormData) {
  const data = productFormToJson(formData);
  await apiFetch("/products", { method: "POST", body: JSON.stringify(data) });
  revalidateProductPaths();
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = productFormToJson(formData);
  await apiFetch(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  revalidateProductPaths(id);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await apiFetch(`/products/${id}`, { method: "DELETE" });
  revalidateProductPaths(id);
}

export async function toggleProductPublished(id: string, currentValue: boolean) {
  await apiFetch(`/products/${id}/toggle-published`, {
    method: "PATCH",
    body: JSON.stringify({ currentValue }),
  });
  revalidateProductPaths(id);
}
