"use client";

import { useRef, useState } from "react";
import { isImagePath } from "@/app/lib/image";

export default function ProductImageField({
  defaultValue,
  alt,
}: {
  defaultValue?: string;
  alt: string;
}) {
  const [image, setImage] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "อัปโหลดไม่สำเร็จ");
      }
      const data = await res.json();
      setImage(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-4xl transition duration-200 hover:border-sky-300">
        {image ? (
          isImagePath(image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={alt} className="h-full w-full object-cover" />
          ) : (
            image
          )
        ) : (
          "🖼️"
        )}
      </div>
      <div className="flex-1 space-y-2">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">รูป (emoji หรือ URL)</label>
        <input
          type="text"
          name="image"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="🎞️"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-50 disabled:opacity-50"
          >
            {uploading ? "กำลังอัปโหลด..." : "เลือกรูปจากเครื่อง"}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
