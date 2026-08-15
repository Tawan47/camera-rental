"use server";

import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/app/lib/api-client";
import { createSession } from "@/app/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return { error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" };
  }

  try {
    const { accessToken } = await apiFetch<{ accessToken: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    await createSession(accessToken);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
    }
    return { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
  }

  redirect("/admin/dashboard");
}
