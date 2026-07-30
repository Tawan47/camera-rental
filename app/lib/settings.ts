import { cache } from "react";
import { apiFetch } from "@/app/lib/api-client";
import type { SiteSettings } from "@/app/lib/types";

export const getSettings = cache(async (): Promise<SiteSettings> => {
  return apiFetch<SiteSettings>("/settings");
});
