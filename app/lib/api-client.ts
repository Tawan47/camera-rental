const API_URL = process.env.API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { skipAuthRedirect?: boolean; auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const needsAuth = Boolean(init?.auth);

  if (needsAuth) {
    const { getSessionToken } = await import("@/app/lib/session");
    const token = await getSessionToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...headers, ...init?.headers },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401 && needsAuth && !init?.skipAuthRedirect) {
      const { deleteSession } = await import("@/app/lib/session");
      const { redirect } = await import("next/navigation");
      await deleteSession();
      redirect("/admin/login");
    }
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.message ?? `API request failed: ${res.status}`, body);
  }

  const text = await res.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text);
}
