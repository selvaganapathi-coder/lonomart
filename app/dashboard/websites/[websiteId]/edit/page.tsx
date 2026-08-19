import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Editor } from "./editor";
import { PublishControl } from "./publish-control";

export default async function WebsiteEditorPage({
  params,
}: {
  params: Promise<{ websiteId: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { websiteId } = await params;
  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId: session.user.id },
    include: {
      publication: { select: { publishedDraftRevision: true } },
      pages: {
        orderBy: { sortOrder: "asc" },
        include: { sections: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!website) notFound();

  const initialWebsite = {
    id: website.id,
    name: website.name,
    pages: website.pages.map((page) => ({
      id: page.id,
      slug: page.slug,
      title: page.title,
      sections: page.sections.map((section) => ({
        id: section.id,
        type: section.type,
        visible: section.visible,
        revision: section.revision,
        content: section.content as Record<string, unknown>,
      })),
    })),
  };

  const published = website.publication !== null;
  const hasUnpublishedChanges = !published || website.draftRevision !== website.publication?.publishedDraftRevision;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/dashboard" className="shrink-0 text-sm font-medium text-slate-500 no-underline hover:text-slate-950">← Dashboard</Link>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="truncate text-sm font-semibold">{website.name}</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{published ? "Published" : "Draft"}</span>
            {published && hasUnpublishedChanges && <span className="hidden rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 sm:inline">Unpublished changes</span>}
          </div>
          <div className="flex items-center gap-2">
            <PublishControl websiteId={website.id} publishedDraftRevision={website.publication?.publishedDraftRevision ?? null} draftRevision={website.draftRevision} />
            <Link href={`/dashboard/websites/${website.id}/assets`} className="hidden h-9 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 no-underline shadow-sm hover:bg-slate-50 sm:inline-flex">Assets</Link>
            <Link href={`/dashboard/websites/${website.id}/preview`} className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 no-underline shadow-sm hover:bg-slate-50">Preview</Link>
          </div>
        </div>
      </header>
      <Editor initialWebsite={initialWebsite} />
    </main>
  );
}
