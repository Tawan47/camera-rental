"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api-client";

export async function updateSettings(formData: FormData) {
  const data = {
    shopName: formData.get("shopName"),
    logoImage: formData.get("logoImage"),
    instagramHandle: formData.get("instagramHandle"),
    contactPhone: formData.get("contactPhone"),
    contactPerson: formData.get("contactPerson"),
    footerTagline: formData.get("footerTagline"),
    businessHoursLine1: formData.get("businessHoursLine1"),
    businessHoursLine2: formData.get("businessHoursLine2"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),

    heroEyebrow: formData.get("heroEyebrow"),
    heroTitleLine1: formData.get("heroTitleLine1"),
    heroTitleLine2: formData.get("heroTitleLine2") ?? "",
    heroSubheading: formData.get("heroSubheading"),
    heroSearchPlaceholder: formData.get("heroSearchPlaceholder"),
    popularSearchLabel: formData.get("popularSearchLabel"),
    popularSearchTags: String(formData.get("popularSearchTags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),

    categoriesHeading: formData.get("categoriesHeading"),
    categoriesSubheading: formData.get("categoriesSubheading"),
    brandsHeading: formData.get("brandsHeading"),
    brandsSubheading: formData.get("brandsSubheading"),
    featuredHeading: formData.get("featuredHeading"),
    featuredSubheading: formData.get("featuredSubheading"),
  };

  await apiFetch("/settings", { method: "PATCH", body: JSON.stringify(data), auth: true });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
