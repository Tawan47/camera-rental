"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton({ confirmMessage }: { confirmMessage: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      className="font-medium text-red-500 transition duration-200 hover:underline disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}
