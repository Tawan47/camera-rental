"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch({ placeholder }: { placeholder?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <span className="text-zinc-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full border-none py-2 text-sm text-zinc-900 outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
      >
        ค้นหา
      </button>
    </form>
  );
}
