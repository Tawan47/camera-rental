import { apiFetch, ApiError } from "@/app/lib/api-client";
import type { Category } from "@/app/lib/types";

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    return await apiFetch<Category>(`/categories/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}
