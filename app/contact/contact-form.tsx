"use client";

import { useActionState, useState } from "react";
import { submitInquiry, type SubmitInquiryState } from "@/app/contact/actions";
import type { Bundle, Product } from "@/app/lib/types";

const initialState: SubmitInquiryState = { status: "idle" };

export default function ContactForm({
  products,
  bundles,
  preselected,
}: {
  products: Product[];
  bundles: Bundle[];
  preselected: Product | Bundle | null;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const [selectedId, setSelectedId] = useState(preselected?.id ?? "");
  const selectedIsBundle = bundles.some((b) => b.id === selectedId);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <span className="text-4xl">✅</span>
        <h2 className="text-lg font-semibold text-zinc-900">ส่งข้อมูลสำเร็จแล้ว</h2>
        <p className="text-sm text-zinc-600">
          ทีมงานจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
    >
      <input type="hidden" name="isBundle" value={selectedIsBundle ? "true" : "false"} />

      {preselected && (
        <div className="flex animate-fade-in-up items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
          <span className="text-2xl">{preselected.image}</span>
          <div>
            <p className="text-sm text-zinc-500">กำลังจองสินค้า</p>
            <p className="font-semibold text-zinc-900">{preselected.name}</p>
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="ชื่อ-นามสกุล" name="name" placeholder="เช่น สมชาย ใจดี" error={fieldErrors?.name} required />
        <Field
          label="เบอร์โทรศัพท์"
          name="phone"
          placeholder="0812345678"
          type="tel"
          error={fieldErrors?.phone}
          required
        />
      </div>

      <Field label="LINE ID (ถ้ามี)" name="lineId" placeholder="@your_line_id" error={fieldErrors?.lineId} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">สินค้าที่ต้องการเช่า</label>
        <select
          name="productId"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        >
          <option value="" disabled>
            เลือกสินค้า
          </option>
          <optgroup label="สินค้าเดี่ยว">
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="เซ็ตเช่า">
            {bundles.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="วันที่ต้องการรับสินค้า"
          name="pickupDate"
          type="date"
          error={fieldErrors?.pickupDate}
          required
        />
        <Field label="วันที่คืนสินค้า" name="returnDate" type="date" error={fieldErrors?.returnDate} required />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">รายละเอียดเพิ่มเติม</label>
        <textarea
          name="note"
          rows={4}
          placeholder="ระบุความต้องการเพิ่มเติม เช่น สถานที่จัดส่ง อุปกรณ์เสริมที่ต้องการ"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.01] hover:bg-sky-600 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลการจอง"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-1 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-zinc-300 focus:border-sky-500 focus:ring-sky-500"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
