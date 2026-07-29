import { apiFetch, ApiError } from "@/app/lib/api-client";
import type { Bundle } from "@/app/lib/types";

export async function getBundles(): Promise<Bundle[]> {
  return apiFetch<Bundle[]>("/bundles");
}

export async function getPublishedBundles(): Promise<Bundle[]> {
  return apiFetch<Bundle[]>("/bundles/published");
}

export async function getBundleById(id: string): Promise<Bundle | null> {
  try {
    return await apiFetch<Bundle>(`/bundles/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}
