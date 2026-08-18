"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

type Section = { id: string; type: string; visible: boolean; content: Record<string, unknown> };
type Page = { id: string; slug: string; title: string; sections: Section[] };
type Website = { id: string; name: string; pages: Page[] };

function text(value: unknown) { return typeof value === "string" ? value : ""; }

function fieldsFor(type: string) {
  if (type === "hero") return ["eyebrow", "title", "description"];
  if (type === "about" || type === "services" || type === "cta" || type === "contact") return ["title", "description"];
  return ["title", "description"];
}

export function Editor({ initialWebsite }: { initialWebsite: Website }) {
  const [website, setWebsite] = useState(initialWebsite);
  const [pageId, setPageId] = useState(initialWebsite.pages[0]?.id ?? "");
  const [sectionId, setSectionId] = useState(initialWebsite.pages[0]?.sections[0]?.id ?? "");
  const [saving, startSaving] = useTransition();
  const page = website.pages.find((item) => item.id === pageId) ?? website.pages[0];
  const section = page?.sections.find((item) => item.id === sectionId) ?? page?.sections[0];

  const previewHref = useMemo(() => `/dashboard/websites/${website.id}/preview${page ? `?page=${encodeURIComponent(page.slug)}` : ""}`, [website.id, page]);

  function selectPage(id: string) {
    const next = website.pages.find((item) => item.id === id);
    setPageId(id);
    setSectionId(next?.sections[0]?.id ?? "");
  }

  function updateLocal(key: string, value: string) {
    if (!page || !section) return;
    setWebsite((current) => ({
      ...current,
      pages: current.pages.map((item) => item.id !== page.id ? item : {
        ...item,
        sections: item.sections.map((candidate) => candidate.id !== section.id ? candidate : { ...candidate, content: { ...candidate.content, [key]: value } }),
      }),
    }));
  }

  function save() {
    if (!section) return;
    const currentSection = section;
    startSaving(async () => {
      const response = await fetch(`/api/websites/${website.id}/sections/${currentSection.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: currentSection.content }),
      });
      if (!response.ok) window.alert("Unable to save this section.");
    });
  }

  return (
    <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_320px_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-64px)] lg:border-b-0 lg:border-r">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Pages</p>
        <div className="mt-3 space-y-1">
          {website.pages.map((item) => <button key={item.id} onClick={() => selectPage(item.id)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${item.id === page?.id ? "bg-blue-50 font-medium text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>{item.title}</button>)}
        </div>
        <Link href={previewHref} className="mt-6 flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50">Open preview</Link>
      </aside>

      <aside className="border-b border-slate-200 bg-slate-50 p-4 lg:min-h-[calc(100vh-64px)] lg:border-b-0 lg:border-r">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Sections</p>
        <div className="mt-3 space-y-2">
          {page?.sections.map((item) => <button key={item.id} onClick={() => setSectionId(item.id)} className={`w-full rounded-xl border px-3.5 py-3 text-left transition ${item.id === section?.id ? "border-blue-200 bg-white shadow-sm" : "border-transparent bg-white/70 hover:border-slate-200"}`}><span className="block text-sm font-medium capitalize text-slate-900">{item.type}</span><span className="mt-1 block text-xs text-slate-500">{item.visible ? "Visible" : "Hidden"}</span></button>)}
        </div>
      </aside>

      <section className="min-w-0 bg-white p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div><p className="text-xs font-medium uppercase tracking-wider text-slate-400">Editing</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">{section?.type ?? "Section"}</h1><p className="mt-1 text-sm text-slate-500">Update content without changing the website structure.</p></div>
            <button onClick={save} disabled={saving || !section} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
          </div>
          {section ? <div className="mt-6 space-y-5">{fieldsFor(section.type).map((key) => <label key={key} className="block"><span className="mb-2 block text-sm font-medium capitalize text-slate-800">{key}</span>{key === "description" ? <textarea value={text(section.content[key])} onChange={(event) => updateLocal(key, event.target.value)} rows={5} className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /> : <input value={text(section.content[key])} onChange={(event) => updateLocal(key, event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50" />}</label>)}</div> : <div className="mt-12 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Select a section to edit.</div>}
        </div>
      </section>
    </div>
  );
}
