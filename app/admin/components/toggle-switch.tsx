"use client";

import { useFormStatus } from "react-dom";

export default function ToggleSwitch({ checked }: { checked: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="toggle published"
      className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 transition duration-200 disabled:opacity-50 ${
        checked ? "bg-sky-500" : "bg-zinc-200"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transition duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
