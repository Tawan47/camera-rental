"use server";

import { ApiError, apiFetch } from "@/app/lib/api-client";

export type InquiryFieldErrors = Record<string, string>;

export type SubmitInquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: InquiryFieldErrors };

type BackendValidationError = {
  code: string;
  path: (string | number)[];
  message: string;
};

export async function submitInquiry(
  _prevState: SubmitInquiryState,
  formData: FormData,
): Promise<SubmitInquiryState> {
  const productId = formData.get("productId");
  const selectedId = typeof productId === "string" && productId ? productId : null;
  const isBundle = formData.get("isBundle") === "true";

  const payload: Record<string, unknown> = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    lineId: formData.get("lineId") || undefined,
    pickupDate: formData.get("pickupDate"),
    returnDate: formData.get("returnDate"),
    note: formData.get("note") || undefined,
  };
  if (selectedId) {
    if (isBundle) {
      payload.bundleId = selectedId;
    } else {
      payload.productId = selectedId;
    }
  }

  try {
    await apiFetch("/inquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { status: "success" };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 429) {
        return { status: "error", message: "ส่งข้อมูลบ่อยเกินไป กรุณาลองใหม่อีกครั้งภายหลัง" };
      }
      if (err.status === 400) {
        const errors = (err.body as { errors?: BackendValidationError[] } | undefined)?.errors;
        const fieldErrors: InquiryFieldErrors = {};
        for (const fieldErr of errors ?? []) {
          const key = fieldErr.path?.[0];
          if (typeof key === "string" && !fieldErrors[key]) {
            fieldErrors[key] = fieldErr.message;
          }
        }
        return {
          status: "error",
          message: "กรุณาตรวจสอบข้อมูลที่กรอก",
          fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined,
        };
      }
      if (err.status === 404) {
        return { status: "error", message: "ไม่พบสินค้าที่เลือก กรุณาเลือกใหม่อีกครั้ง" };
      }
    }
    return { status: "error", message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
  }
}
