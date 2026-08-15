import { apiFetch } from "@/app/lib/api-client";
import type { Inquiry, InquiryStats } from "@/app/lib/types";

export async function getInquiryStats(): Promise<InquiryStats> {
  return apiFetch<InquiryStats>("/inquiries/stats", { auth: true });
}

export async function getRecentInquiries(limit = 5): Promise<Inquiry[]> {
  return apiFetch<Inquiry[]>(`/inquiries?limit=${limit}`, { auth: true });
}
