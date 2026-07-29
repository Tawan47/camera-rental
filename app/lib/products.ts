import { apiFetch, ApiError } from "@/app/lib/api-client";
import type { Product } from "@/app/lib/types";

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export async function getPublishedProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products/published");
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 3): Promise<Product[]> {
  const params = new URLSearchParams({ categoryId, excludeId, limit: String(limit) });
  return apiFetch<Product[]>(`/products/related?${params}`);
}
