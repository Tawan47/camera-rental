import { apiFetch } from "@/app/lib/api-client";
import type { SiteSettings } from "@/app/lib/types";

export async function getSettings(): Promise<SiteSettings> {
  return apiFetch<SiteSettings>("/settings");
}
