"use client";

import { useState } from "react";

export function PublishControl({ websiteId, publishedDraftRevision, draftRevision }: { websiteId: string; publishedDraftRevision: number | null; draftRevision: number }) {
  const [status, setStatus] = useState<"idle" | "publishing" | "unpublishing">("idle");
  const [message, setMessage] = useState("");
  const published = publishedDraftRevision !== null;
  const hasChanges = !published || draftRevision !== publishedDraftRevision;

  async function publish() {
    setStatus("publishing");
    setMessage("");
    const response = await fetch(`/api/websites/${websiteId}/publish`, { method: "POST" });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) setMessage(data.error ?? "Unable to publish.");
    else window.location.reload();
    setStatus("idle");
  }

  async function unpublish() {
    if (!window.confirm("Unpublish this website? The current published version will no longer be available for public rendering.")) return;
    setStatus("unpublishing");
    setMessage("");
    const response = await fetch(`/api/websites/${websiteId}/publish`, { method: "DELETE" });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) setMessage(data.error ?? "Unable to unpublish.");
    else window.location.reload();
    setStatus("idle");
  }

  return (
    <div className="flex items-center gap-2">
      {message && <span className="hidden text-xs text-red-600 sm:inline">{message}</span>}
      <button type="button" onClick={publish} disabled={status !== "idle" || !hasChanges} className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-3.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {status === "publishing" ? "Publishing…" : published ? "Publish changes" : "Publish"}
      </button>
      {published && <button type="button" onClick={unpublish} disabled={status !== "idle"} className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50">Unpublish</button>}
    </div>
  );
}
