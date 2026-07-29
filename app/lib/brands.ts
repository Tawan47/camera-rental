import { apiFetch, ApiError } from "@/app/lib/api-client";
import type { Brand } from "@/app/lib/types";

export async function getBrands(): Promise<Brand[]> {
  return apiFetch<Brand[]>("/brands");
}

export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    return await apiFetch<Brand>(`/brands/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}
