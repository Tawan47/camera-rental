"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api-client";

function bundleFormToJson(formData: FormData) {
  const productIds = formData.getAll("itemProductId");
  const quantities = formData.getAll("itemQuantity");
  const notes = formData.getAll("itemNote");

  const items = productIds
    .map((productId, i) => ({
      productId: String(productId),
      quantity: Number(quantities[i] ?? 1),
      note: notes[i] ? String(notes[i]) : undefined,
    }))
    .filter((item) => item.productId.trim().length > 0);

  return {
    name: formData.get("name"),
    brandId: formData.get("brandId") || undefined,
    categoryId: formData.get("categoryId") || undefined,
    pricePerDay: formData.get("pricePerDay"),
    deposit: formData.get("deposit"),
    image: formData.get("image"),
    description: formData.get("description"),
    available: formData.get("available") === "on",
    published: formData.get("published") === "on",
    items,
  };
}

function revalidateBundlePaths(id?: string) {
  revalidatePath("/admin/bundles");
  revalidatePath("/products");
  revalidatePath("/");
  if (id) revalidatePath(`/products/${id}`);
}

export async function createBundle(formData: FormData) {
  const data = bundleFormToJson(formData);
  await apiFetch("/bundles", { method: "POST", body: JSON.stringify(data), auth: true });
  revalidateBundlePaths();
  redirect("/admin/bundles");
}

export async function updateBundle(id: string, formData: FormData) {
  const data = bundleFormToJson(formData);
  await apiFetch(`/bundles/${id}`, { method: "PATCH", body: JSON.stringify(data), auth: true });
  revalidateBundlePaths(id);
  redirect("/admin/bundles");
}

export async function deleteBundle(id: string) {
  await apiFetch(`/bundles/${id}`, { method: "DELETE", auth: true });
  revalidateBundlePaths(id);
}

export async function toggleBundlePublished(id: string, currentValue: boolean) {
  await apiFetch(`/bundles/${id}/toggle-published`, {
    method: "PATCH",
    body: JSON.stringify({ currentValue }),
    auth: true,
  });
  revalidateBundlePaths(id);
}
