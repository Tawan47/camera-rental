"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/login/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">ชื่อผู้ใช้</label>
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">รหัสผ่าน</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="block w-full rounded-xl bg-sky-500 px-6 py-2.5 text-center text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
