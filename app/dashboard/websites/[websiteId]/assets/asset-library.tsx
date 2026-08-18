"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

type Asset = {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  createdAt: string;
};

function formatSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AssetLibrary({ websiteId }: { websiteId: string }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();

  async function loadAssets() {
    setLoading(true);
    const response = await fetch(`/api/websites/${websiteId}/assets`, { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { assets: Asset[] };
      setAssets(data.assets);
    } else {
      setMessage("Unable to load assets.");
    }
    setLoading(false);
  }

  useEffect(() => { void loadAssets(); }, [websiteId]);

  function upload(file: File) {
    setMessage("");
    const formData = new FormData();
    formData.set("file", file);
    startUpload(async () => {
      const response = await fetch(`/api/websites/${websiteId}/assets`, { method: "POST", body: formData });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "Upload failed.");
        return;
      }
      await loadAssets();
    });
  }

  async function remove(asset: Asset) {
    if (!window.confirm(`Delete ${asset.filename}?`)) return;
    setDeletingId(asset.id);
    setMessage("");
    const response = await fetch(`/api/websites/${websiteId}/assets/${asset.id}`, { method: "DELETE" });
    if (response.ok) setAssets((current) => current.filter((item) => item.id !== asset.id));
    else setMessage("Unable to delete this asset.");
    setDeletingId(null);
  }

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold">Upload an image</h2>
            <p className="mt-1 text-sm text-slate-500">JPEG, PNG or WebP · maximum 10 MB</p>
          </div>
          <label className={`inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 ${uploading ? "pointer-events-none opacity-60" : ""}`}>
            {uploading ? "Uploading…" : "Choose image"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.currentTarget.value = ""; }} />
          </label>
        </div>
      </div>

      {message && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Your images</h2>
          <span className="text-xs text-slate-500">{assets.length} {assets.length === 1 ? "asset" : "assets"}</span>
        </div>
        {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Loading assets…</div> : assets.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="text-sm font-medium text-slate-700">No images yet</p><p className="mt-1 text-sm text-slate-500">Upload your first image to start building your media library.</p></div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{assets.map((asset) => <article key={asset.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="relative aspect-[4/3] bg-slate-100"><Image src={`/api/websites/${websiteId}/assets/${asset.id}`} alt={asset.filename} fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /></div><div className="p-3.5"><p className="truncate text-sm font-medium text-slate-900">{asset.filename}</p><p className="mt-1 text-xs text-slate-500">{formatSize(asset.size)} · {asset.contentType.replace("image/", "")}</p><button type="button" onClick={() => remove(asset)} disabled={deletingId === asset.id} className="mt-3 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50">{deletingId === asset.id ? "Deleting…" : "Delete"}</button></div></article>)}</div>}
      </div>
    </div>
  );
}
